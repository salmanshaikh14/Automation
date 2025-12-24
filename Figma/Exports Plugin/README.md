# Frame Export & Compress – Figma Plugin (v1.0)

A powerful Figma plugin to export selected frames as **PNG/JPEG**, preview estimated sizes, auto-adjust DPI to meet size limits, and export everything in **one ZIP file** — perfect for Brand and Paid Media workflows.

> Designed by **Salman Shaikh**  


---

## 🚀 Features

- 🖼 Export selected frames as **PNG or JPEG**
- 🎯 Presets:
  - **Brand.com** → below **1.5 MB**
  - **Paid Media** → below **5 MB**
  - **Custom** → user-defined target size
- 📐 **Auto DPI/Scale adjust** to fit target size
- 🔁 **Live preview auto-refresh** on any setting change
- 👁 **Preview & Estimate**
  - Shows **Estimated export size**
  - Compare **before / after compression**
- 🔍 **Fullscreen preview**
  - Click image to open fullscreen
  - Zoom in / out
  - Close with ✕ or Esc
- 🗂 **One-click ZIP export**
  - All selected frames bundled into **one ZIP**
  - ZIP name = **Figma file name**
- 🖥 Default plugin window size **1000 × 1000**
- 🏷 Footer signature with author credit

---

## 📦 Installation

1. Download the plugin ZIP and extract it.
2. Open **Figma**.
3. Go to **Plugins → Development → Import plugin from manifest…**
4. Select the `manifest.json` file.
5. Run via **Plugins → Development → Frame Export & Compress**.

---

## 🛠 How to Use

1. Select one or more **frames** in your Figma file.
2. Open the plugin.
3. Choose:
   - **Format**: PNG or JPEG  
   - **Preset**: Brand.com / Paid Media / Custom  
   - Or set a **custom target size (MB)**.
4. (Optional) Click **Preview & Estimate**:
   - Review estimated sizes.
   - Click any image to view fullscreen & zoom.
5. Click **Export & Save**:
   - Downloads a ZIP named after your Figma file  
     e.g., `Homepage_Design.zip`.
6. Unzip to get all exported images.

---

## 🎯 Presets

| Preset    | Target Size |
|-----------|-------------|
| Brand.com | < 1.5 MB    |
| Paid Media| < 5 MB      |
| Custom    | User input  |

> When a preset is selected, the custom target field is disabled.

---

## 🧠 Smart Behavior

- 🔄 Changing any parameter auto-updates the preview.
- 📐 Auto DPI keeps aspect ratio while scaling.
- ⚠ Shows an error if target size can’t be achieved.
- 🗂 ZIP export avoids browser blocking of multiple downloads.

---

## 🧩 Output

- All files exported into:
