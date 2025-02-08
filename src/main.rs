use clipboard::{ClipboardContext, ClipboardProvider};
use tokio::time::{sleep, Duration};
use warp::Filter;
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
                    if contents != last_clipboard {
                        println!("Clipboard content changed: {}", contents);
                        *clipboard_content_clone.write().unwrap() = contents.clone(); // Clone the contents before storing
                        last_clipboard = contents.clone(); // Clone the contents before using
                    }
                }
                Err(e) => eprintln!("Failed to read clipboard: {}", e),
            }
            sleep(Duration::from_secs(1)).await; // Check clipboard every second
        }
    });

    // Create a route for serving the clipboard content
    let clipboard_route = warp::path("clipboard")
        .map(move || {
            let contents = clipboard_content.read().unwrap(); // Read the clipboard content
            warp::reply::json(&*contents) // Return the clipboard content as JSON
        });

    // Start the warp server
    warp::serve(clipboard_route)
        .run(([127, 0, 0, 1], 3030)) // Local server at http://127.0.0.1:3030
        .await;
}
