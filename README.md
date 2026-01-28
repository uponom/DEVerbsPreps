# DEVerbsPreps - Deutsche Verben mit Präposition
Interactive trainer for German verbs with prepositions. The app shows a verb, offers preposition choices, and reinforces learning with weighted repetition, examples, and progress tracking.

## Features
- Multiple interface languages: EN, UA, RU.
- Akkusativ/Dativ case tags for each verb-preposition pair.
- Weighted practice: incorrect answers appear more often.
- Progress bar and penalty points to track mastery.
- Example sentences with optional speech playback.
- Light/dark theme toggle.
- PWA support with offline caching.
- Verb list modal with translations for the current UI language.
- Verb info card with multilingual translations and optional speech playback.
- Persistent settings (language, theme, auto-speech, filters) via localStorage.
- Example preposition replacement handles case-insensitive matches and common preposition-article contractions.

## Quick start
This is a static app with no build step. Choose the simplest option that fits your use case.

1. Hosted version (fastest): https://uponom.github.io/DEVerbsPreps/
2. Open locally (no server): double-click `index.html` and it will open in your browser.
3. Local server (best for PWA behavior and correct paths):
   - Start a server in the parent directory.
   - Open the app at `/DEVerbsPreps/`.

```bash
cd /mnt/c/Git
python3 -m http.server 8000
```
Then open `http://localhost:8000/DEVerbsPreps/`.

## PWA notes
- The Service Worker caches key assets on install.
- To publish a new version, bump both:
  - `APP_VERSION` in `index.html`.
  - `CACHE_VERSION` in `service-worker.js`.
- Speech synthesis works on secure contexts (HTTPS) or localhost.
- QR code generation uses a local `qrcode.min.js` file (no network calls).
  - SHA-256: `c541ef06327885a8415bca8df6071e14189b4855336def4f36db54bde8484f36`

## Project structure
- `index.html` - UI, styles, and app logic.
- `service-worker.js` - offline cache and update flow.
- `qrcode.min.js` - local QR code generator.
- `manifest.json` and `site.webmanifest` - PWA metadata.
- `icon-*.png`, `favicon*.png`, `apple-touch-icon.png` - app icons.
- `screenshot-*.png` - store listing screenshots.

## Data
The verb/preposition data and examples live in the `data` array inside `index.html`. Each entry includes:
- `verb`, `correct` (preposition), and `case`.
- `translations` for the supported languages.
- `example` sentence.
- `probability` used for weighted repetition.

## How it works
1. The app picks a verb/preposition pair using weighted random selection based on `probability`.
2. It shows the translation, the verb, the grammatical case badge, and buttons with all available prepositions.
3. When you answer:
   - Correct answers reduce the item’s `probability`, making it appear less often.
   - Wrong answers increase the `probability`, making it appear more often.
4. The correct answer and an example sentence are displayed after each attempt; optional speech can play the answer and example.
5. Progress is calculated as the percentage of items with `probability === 1`. Penalty points show per‑item and total repetition weight.
6. When progress reaches 100%, a completion modal is shown and the test can be restarted.

## License
Not specified.
