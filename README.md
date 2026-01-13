# Tab Decay Timer

A simple Chrome extension that shows how long your tabs have been inactive using color-coded badges.

## Features

- **Color-coded decay levels:**
  - 🟢 Green (0-5 min): Fresh
  - 🟡 Yellow (5-30 min): Warm
  - 🟠 Orange (30-60 min): Stale
  - 🔴 Red (60+ min): Decayed

- Shows time in minutes (m) or hours (h)
- Updates automatically every minute
- No configuration needed

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `tab-decay-timer` folder
5. Done! The extension will start showing age badges on all tabs

## How it Works

The extension uses Chrome's `tabs.lastAccessed` API to track when each tab was last active. A background service worker updates the badge every minute to show the current age.

## File Structure

```
tab-decay-timer/
├── manifest.json       # Extension configuration
├── background.js       # Core logic
├── icon.png           # Extension icon (optional)
└── README.md          # This file
```

## Customization

To adjust the time thresholds, edit the `THRESHOLDS` object in [background.js](background.js):

```javascript
const THRESHOLDS = {
  FRESH: 5 * 60 * 1000,      // 5 minutes
  WARM: 30 * 60 * 1000,      // 30 minutes
  STALE: 60 * 60 * 1000,     // 1 hour
  DECAYED: 2 * 60 * 60 * 1000 // 2 hours
};
```

To change colors, edit the `COLORS` object in [background.js](background.js).

## License

MIT
