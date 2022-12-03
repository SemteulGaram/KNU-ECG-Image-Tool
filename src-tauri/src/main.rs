// Disable debug command prompt in windows
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

// use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn main() {
  // Build a custom window menu
  // let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  // let close = CustomMenuItem::new("close".to_string(), "Close");
  // let submenu: Submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
  // let menu = Menu::new().add_native_item(MenuItem::EnterFullScreen).add_submenu(submenu);

  tauri::Builder::default()
    // .menu(menu)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
