# 💓 KNU ECG Image Tool
<p align="center">
<img alt="Main Logo" src="public/app-icon.png" width="128" />
<h3 align="center">ECG image viewer + classification simplifier tool</h3>
</p>


## 1. How to build
```PowerShell
# Follow the instructions below
# https://tauri.app/v1/guides/getting-started/prerequisites
git clone https://github.com/SemteulGaram/KNU-ECG-Image-Tool.git
cd KNU-ECG-Image-Tool
npm install

# Hot reload development mode
npm run dev:tauri

# Build executable for current device architecture
# (Maintainer only) set TAURI_PRIVATE_KEY and TAURI_KEY_PASSWORD env variable for generate updater artifacts.
npm run build:tauri

# More build options
npm run build:tauri:windows:x86_64
# Require i686 tool chain for rust (rustup target add i686-pc-windows-msvc)
npm run build:tauri:windows:i686
# Require Visual Studio Installer > Individual Components > MSVC v143 - VS 2022 C++ ARM64 build tools (Latest)
# Require aarch64 tool chain for rust (rustup target add aarch64-pc-windows-msvc)
npm run build:tauri:windows:aarch64

# Apple (not tested)
npm run build:tauri:apple:aarch64
npm run build:tauri:apple:x86_64
npm run build:tauri:apple:universal
```
## 2. Using stack
- npm
- Typescript
- Tauri 1.2
- Next.js 13
- Emotion.js
- Tailwind CSS
- Zustand
- eslint (Prettier)

## 3. Maintainer memo
- Update step
  - Version update both `package.json`, `src-tauri/tauri.conf.json`
  - Set priv env key
  - Run build script
  - Update `updater.json` with hash
  - git push
  - Upload Release
