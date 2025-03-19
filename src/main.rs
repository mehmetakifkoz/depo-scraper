use clipboard::{ClipboardContext, ClipboardProvider};
use tokio::time::{sleep, Duration};
use warp::Filter;
use regex::Regex;
use std::sync::{Arc, RwLock};

#[tokio::main]
async fn main() {
    // Create an Arc to store barcode content, wrapped in RwLock for thread-safe mutation.
    let barcode_content = Arc::new(RwLock::new(String::from("0000000000000")));

    // Start the clipboard listener in the background
    let barcode_content_clone = Arc::clone(&barcode_content);
    tokio::spawn(async move {
        let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
        let mut last_clipboard = String::new();

        loop {
            match ctx.get_contents() {
                Ok(contents) => {
                    if contents != last_clipboard {
                        let re = Regex::new(r"\b\d{13}\b").unwrap(); // Regular expression for 13-digit barcode
                        let barcode = re.find(&contents).map(|m| m.as_str().to_string())
                            .unwrap_or_else(|| "0000000000000".to_string()); // Default barcode if none found
                        
                        if barcode != *barcode_content_clone.read().unwrap() {
                            println!("Barcode changed: {}", barcode);
                            *barcode_content_clone.write().unwrap() = barcode;
                        }
                        last_clipboard = contents;
                    }
                }
                Err(e) => eprintln!("Failed to read clipboard: {}", e),
            }
            sleep(Duration::from_secs(1)).await;
        }
    });

    // Create a route for serving the barcode content
    let barcode_route = warp::path("barcode")
        .map(move || {
            let barcode = barcode_content.read().unwrap();
            warp::reply::json(&*barcode) // Return the barcode as JSON
        });

    // Start the warp server
    warp::serve(barcode_route)
        .run(([127, 0, 0, 1], 3030))
        .await;
}
