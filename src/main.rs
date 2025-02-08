use clipboard::{ClipboardContext, ClipboardProvider};
use tokio::time::{sleep, Duration};
use warp::Filter;
use regex::Regex;
use std::sync::{Arc, RwLock};

#[tokio::main]
async fn main() {
    // Create an Arc to store clipboard content, wrapped in RwLock for thread-safe mutation.
    let clipboard_content = Arc::new(RwLock::new(String::new()));

    // Start the clipboard listener in the background
    let clipboard_content_clone = Arc::clone(&clipboard_content);
    tokio::spawn(async move {
        let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
        let mut last_clipboard = String::new();

        loop {
            match ctx.get_contents() {
                Ok(contents) => {
                    // If clipboard content changes, we check for a barcode
                    if contents != last_clipboard {
                        let re = Regex::new(r"\b\d{13}\b").unwrap(); // Regular expression for 13-digit barcode
                        if let Some(captures) = re.find(&*contents) { // Borrow contents as a &str
                            // Barcode detected, print message in console
                            println!("Barcode changed: {}", captures.as_str());
                            *clipboard_content_clone.write().unwrap() = captures.as_str().to_string(); // Store the barcode
                        }
                        last_clipboard = contents; // Update last_clipboard after checking
                    }
                }
                Err(e) => eprintln!("Failed to read clipboard: {}", e),
            }
            sleep(Duration::from_secs(1)).await; // Check clipboard every second
        }
    });

    // Create a route for serving the barcode content
    let barcode_route = warp::path("barcode")
        .map(move || {
            let contents = clipboard_content.read().unwrap(); // Read the clipboard content

            // If barcode exists, return it, otherwise return default barcode
            warp::reply::json(&*contents) // Return the barcode or default (empty) barcode
        });

    // Start the warp server
    warp::serve(barcode_route)
        .run(([127, 0, 0, 1], 3030)) // Local server at http://127.0.0.1:3030
        .await;
}
