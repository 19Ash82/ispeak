# iSpeak

> **Personal fork of [Melvynx/Parler](https://github.com/Melvynx/Parler)** (itself a fork of [cjpais/Handy](https://github.com/cjpais/Handy)).
> Adds Groq Whisper API for online transcription with automatic EN/FR language detection.

## What's Different from Parler

- **Groq Whisper API** - Cloud-based transcription via Groq's free Whisper API (online-first by default)
- **Auto language detection** - Seamlessly switch between English and French without changing settings
- **Online/offline toggle** - Use Groq API when available, fall back to local models when offline
- **Renamed to iSpeak** - Personal branding with updated identifiers

## How It Works

1. **Press** Ctrl+U (or your configured shortcut) to start recording
2. **Speak** in English or French
3. **Release** and iSpeak sends audio to Groq Whisper API for transcription (~400ms)
4. **Get** transcribed text pasted directly into your active app

When Groq is unavailable (no internet, no API key), toggle to offline mode and use local Whisper/Parakeet models.

## Setup

### Prerequisites

- [Rust](https://rustup.rs/) (latest stable)
- [Bun](https://bun.sh/)
- Linux system dependencies:
  ```bash
  sudo apt install -y libx11-dev libxdo-dev libwebkit2gtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev libasound2-dev libevdev-dev cmake build-essential libvulkan-dev glslang-tools libgtk-layer-shell-dev xdotool
  ```

### Build

```bash
bun install
mkdir -p src-tauri/resources/models
curl -o src-tauri/resources/models/silero_vad_v4.onnx https://blob.handy.computer/silero_vad_v4.onnx
bun run tauri build
```

### Install (.deb)

```bash
sudo dpkg -i src-tauri/target/release/bundle/deb/iSpeak_*.deb
```

### Configure

1. Get a free API key from [console.groq.com](https://console.groq.com)
2. Open iSpeak > Advanced > paste your Groq API key
3. "Use online transcription" is ON by default

## Development

```bash
bun run tauri dev          # Dev mode with hot reload
bun run lint               # ESLint
bun run format             # Prettier + cargo fmt
```

## Syncing with Upstream

```bash
git fetch upstream
git merge upstream/main
# Resolve conflicts if any, rebuild
bun run tauri build
```

## Credits

- [cjpais/Handy](https://github.com/cjpais/Handy) - Original speech-to-text app
- [Melvynx/Parler](https://github.com/Melvynx/Parler) - Fork with conditional model switching
- [Groq](https://groq.com) - Fast Whisper API inference
- [Whisper.cpp](https://github.com/ggerganov/whisper.cpp) - Local speech-to-text engine

## License

MIT
