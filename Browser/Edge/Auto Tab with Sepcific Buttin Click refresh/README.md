# 🔘 Auto Tab with Specific Button Click Refresh

Automatically clicks a specific button on a selected tab at a custom interval.
Great for dashboards and pages that require pressing a refresh/action button.

## Features
- Select any open tab
- Click button via CSS selector
- First click after 1 second, then repeat
- Custom interval (seconds)
- Runs in background
- Start/Stop with status & errors

## Install
1. Open edge://extensions or chrome://extensions
2. Enable Developer mode
3. Click Load unpacked
4. Select this folder

## Usage
1. Open page with the button
2. Inspect button → Copy selector
3. Open extension, select tab
4. Paste selector, set interval
5. Click Start

## Notes
- Prefer stable selectors (#id or .class)
- Deep nth-child selectors may break
- Some sites block scripted clicks

MIT License
