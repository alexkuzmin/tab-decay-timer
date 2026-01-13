# Tab Decay Timer

A Chrome extension that shows how long tabs have been inactive using color-coded badges (10 second display). Configure auto-close times per page or globally.

## Features

### Visual Indicators
- **Color-coded decay levels:**
  - 🟢 Green (0-5 min): Fresh
  - 🟡 Yellow (5-30 min): Warm
  - 🟠 Orange (30-60 min): Stale
  - 🔴 Red (60+ min): Decayed

- Badge appears for 10 seconds when you switch to a previously inactive tab
- Shows time in seconds (s), minutes (m), hours (h), or days (d)

### Settings
- **Per-page settings:** Override auto-close time for specific websites
- **Global settings:** Set default auto-close time for all tabs
- **Badge filters:** Show/hide specific badge colors
- Auto-close options: Never, 1h, 6h, 12h, 1d, 2d, 7d

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `tab-decay-timer` folder

## License

MIT
