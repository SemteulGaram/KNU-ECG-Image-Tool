// Lazy @tauri module load for context crash in Next.js ssr progress
// https://github.com/tauri-apps/tauri/discussions/5271#discussioncomment-3716246

// Lazy load @tauri module
let tauri: typeof import('@tauri-apps/api') | undefined;
export const getTauriModule = (): typeof import('@tauri-apps/api') => {
  if (!tauri) {
    return (tauri = require('@tauri-apps/api'));
  } else {
    return tauri;
  }
};
