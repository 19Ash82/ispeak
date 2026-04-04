# iSpeak

> **Personal fork of [Melvynx/Parler](https://github.com/Melvynx/Parler)** (itself a fork of [cjpais/Handy](https://github.com/cjpais/Handy)).

Cross-platform desktop speech-to-text app with cloud and local transcription support.

## Features

- **Groq Whisper API** — Fast cloud transcription (~400ms), free tier available
- **Local models** — Whisper, Parakeet, Moonshine, SenseVoice for offline/private use
- **Online/offline toggle** — Groq by default, seamless fallback to local models
- **Auto language detection** — Switch between English and French without changing settings
- **Post-processing** — AI-powered text refinement via Claude, GPT, Gemini, Groq, or Apple Intelligence
- **Actions** — Bind Ctrl+1-9 during recording to apply custom prompts (email mode, formatting, etc.)
- **Microphone mute detection** — Warns you if your system mic is muted before recording
- **Global shortcuts** — Configurable hotkeys for transcribe, cancel, and post-process
- **System tray** — Background operation with recording status indicators
- **History** — Browse, copy, and reprocess past transcriptions
- **i18n** — English, French, Spanish, Vietnamese

## How It Works

1. **Press** Ctrl+U (or your configured shortcut) to start recording
2. **Speak** in English or French
3. **Release** — iSpeak sends audio to Groq Whisper API for transcription
4. **Get** transcribed text pasted directly into your active app

## Setup

### Prerequisites

- [Rust](https://rustup.rs/) (latest stable)
- [Bun](https://bun.sh/)
- Linux system dependencies:
  ```bash
  sudo apt install -y libx11-dev libxdo-dev libwebkit2gtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev libasound2-dev libevdev-dev cmake build-essential libvulkan-dev glslang-tools libgtk-layer-shell-dev xdotool
  ```

### Build & Install

```bash
bun install
mkdir -p src-tauri/resources/models
curl -o src-tauri/resources/models/silero_vad_v4.onnx https://blob.handy.computer/silero_vad_v4.onnx
bun run tauri build
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

## CLI Flags

| Flag | Description |
|------|-------------|
| `--toggle-transcription` | Toggle recording on/off on a running instance |
| `--toggle-post-process` | Toggle recording with post-processing |
| `--cancel` | Cancel current operation |
| `--start-hidden` | Launch to tray without showing window |
| `--no-tray` | Launch without system tray icon |
| `--debug` | Enable verbose logging |

## Syncing with Upstream

```bash
git fetch upstream
git merge upstream/main
# Resolve conflicts, rebuild
bun run tauri build
```

## Credits

- [cjpais/Handy](https://github.com/cjpais/Handy) — Original speech-to-text app
- [Melvynx/Parler](https://github.com/Melvynx/Parler) — Fork with model switching and post-processing
- [Groq](https://groq.com) — Fast Whisper API inference
- [Whisper.cpp](https://github.com/ggerganov/whisper.cpp) — Local speech-to-text engine

## License

MIT
