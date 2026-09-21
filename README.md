<div align="center">

<!-- Animated Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,9,5&height=200&section=header&text=✨%20PixelCraft%20Studio&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=All-in-One%20Client-Side%20Web%20Image%20Toolkit%20%26%20Photo%20Editor&descSize=16&descAlignY=55&descColor=bd99f8" width="100%" />

<!-- Animated Badges -->
<p>
  <img src="https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js&logoColor=white&labelColor=000000" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black&labelColor=20232a" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1a1a2e" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=0f172a" alt="Tailwind CSS" />
</p>

<p>
  <img src="https://img.shields.io/badge/Privacy-100%25%20Client--Side-00c853?style=flat-square&logo=shieldsdotio&logoColor=white" alt="Privacy" />
  <img src="https://img.shields.io/badge/AI%20Powered-WASM%20%2F%20ONNX-ff47ff?style=flat-square&logo=webassembly&logoColor=white" alt="AI Powered" />
  <img src="https://img.shields.io/badge/No%20Upload-Zero%20Server-ffc13c?style=flat-square&logo=lock&logoColor=black" alt="No Upload" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
</p>

<!-- Animated Typing Effect -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Mulish&weight=600&size=22&duration=3000&pause=1000&color=FF47FF&center=true&vCenter=true&multiline=true&repeat=true&width=700&height=80&lines=Enhance+%E2%80%A2+Compress+%E2%80%A2+Denoise+%E2%80%A2+Pixelate+%E2%80%A2+Remove+BG;Pro+Color+Grading+%E2%80%A2+HSL+Mixer+%E2%80%A2+Selective+Masking" alt="Typing SVG" />
</a>

<br />

<!-- Animated Divider -->
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%" />

</div>

## 🌟 Overview

**PixelCraft Studio** is a powerful, privacy-first image editing toolkit that runs **entirely in your browser**. No uploads, no servers, no data collection — just pure client-side image processing powered by Canvas API and WebAssembly AI models.

<div align="center">

```
🔒 Your photos never leave your device
⚡ 60fps real-time preview with RAF engine
🧠 WASM/ONNX neural network for AI features
🎨 Professional-grade color grading tools
```

</div>

---

## 🚀 Features

<table>
<tr>
<td width="50%">

### 🎛️ Toolkit Studio (`/studio`)

| Tool | Description |
|:---|:---|
| ✨ **Enhance** | Brightness, contrast, saturation, sharpness, warmth, exposure & vibrance |
| 📦 **Compress** | Quality slider for WebP/JPG/PNG with real-time file size readout |
| 🔇 **Denoise** | Spatial Median & Bilateral Gaussian filters for ISO grain removal |
| 🎮 **Pixelate** | 8-bit retro art with GameBoy, NES, Cyberpunk & C64 color palettes |
| ✂️ **Remove BG** | AI-powered subject segmentation with custom backdrop options |

</td>
<td width="50%">

### 🎨 Pro Color Editor (`/editor`)

| Feature | Description |
|:---|:---|
| 💡 **Light** | Exposure, contrast, highlights, shadows, whites & blacks |
| 🌈 **Color** | Temperature, tint, vibrance & saturation |
| 🎚️ **HSL Mixer** | 8-channel per-color H/S/L control |
| ✨ **Effects** | Texture, clarity, dehaze, vignette & grain |
| 🖌️ **Masking** | AI subject, radial, linear & brush masks |
| 🎭 **Presets** | One-click professional preset styles |

</td>
</tr>
</table>

---

## ⚡ Architecture

<div align="center">

```mermaid
graph LR
    A[📁 File Input] --> B[🖼️ Image Loader]
    B --> C[📐 Dual Canvas Buffer]
    C --> D[🔄 RAF Preview Loop]
    D --> E[🎨 Processing Engine]
    E --> F[📊 Histogram]
    E --> G[🖥️ Live Preview]
    G --> H[📤 Full-Res Export]

    style A fill:#ff47ff,stroke:#ff47ff,color:#000
    style E fill:#bd99f8,stroke:#bd99f8,color:#000
    style H fill:#64ed68,stroke:#64ed68,color:#000
```

</div>

**Key Design Decisions:**

- 🏎️ **60fps Preview** — Downscaled canvas (max 1200px) with `requestAnimationFrame` loop
- 🖼️ **Full-Res Export** — Processes at original resolution only on export
- 🧹 **Memory Safe** — Proper `URL.revokeObjectURL()` cleanup to avoid blob leaks
- 🧠 **WASM AI** — `@imgly/background-removal` for neural network segmentation
- 📁 **Multi-File Queue** — Thumbnail queue with file switching

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose |
|:---:|:---|
| <img src="https://img.shields.io/badge/-Next.js%2016-000?style=flat-square&logo=next.js" /> | App Router framework |
| <img src="https://img.shields.io/badge/-React%2019-61DAFB?style=flat-square&logo=react&logoColor=black" /> | UI library with hooks |
| <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" /> | Type-safe development |
| <img src="https://img.shields.io/badge/-Tailwind%20v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" /> | Utility-first CSS |
| <img src="https://img.shields.io/badge/-WebAssembly-624DE8?style=flat-square&logo=webassembly&logoColor=white" /> | AI model runtime |
| <img src="https://img.shields.io/badge/-Canvas%20API-FF6F00?style=flat-square&logo=html5&logoColor=white" /> | Image pixel processing |
| <img src="https://img.shields.io/badge/-Lucide-f67373?style=flat-square" /> | Icon system |

</div>

---

## 📦 Quick Start

```bash
# Clone the repository
git clone git@github.com:AwanSaputra3/pixelcraft.git
cd pixelcraft

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser ✨

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Mulish + Inter fonts)
│   ├── page.tsx                # Landing page with hero & feature cards
│   ├── globals.css             # Design system (glassmorphism, starry bg)
│   ├── studio/page.tsx         # 🎛️ Toolkit Studio (5 image tools)
│   └── editor/page.tsx         # 🎨 Pro Color Editor (Lightroom-style)
├── components/
│   ├── Header.tsx              # Sticky nav with sample image selector
│   ├── Dropzone.tsx            # Drag & drop + file queue
│   ├── ControlBar.tsx          # Studio tool tabs & sliders
│   ├── ImageCompare.tsx        # Before/After comparison slider
│   ├── ExportModal.tsx         # Download modal (format, quality)
│   ├── HistogramCanvas.tsx     # Live RGB histogram
│   └── lightroom/
│       ├── LightroomCanvas.tsx         # Editor canvas
│       ├── LightroomControlBar.tsx     # Full control panel
│       ├── HslMixer.tsx                # 8-channel HSL mixer
│       ├── MaskingPanel.tsx            # Selective masking tools
│       └── PresetsPanel.tsx            # Preset styles
└── lib/
    ├── enhance.ts              # Brightness, contrast, sharpness engine
    ├── compress.ts             # WebP/JPG/PNG compression
    ├── denoise.ts              # Median & Bilateral Gaussian filters
    ├── pixelate.ts             # Retro pixel art quantizer
    ├── removeBg.ts             # WASM AI background removal
    └── lightroomEngine.ts      # Pro color grading (684 lines)
```

---

## 🎨 Design System

The UI follows a **dark glassmorphism** design language:

<div align="center">

| Token | Value | Usage |
|:---|:---|:---|
| `--color-bg` | `#121212` | Primary background |
| `--color-accent` | `#ff47ff` | CTAs, brand highlights |
| `--color-secondary` | `#ffc13c` | Secondary accents |
| `--color-text` | `#ffffff` | Primary text |
| `--color-surface` | `#1c1c1c` | Cards, panels |
| `--radius` | `12px+` | Rounded corners |
| `--font` | `Mulish` | All typography |

</div>

> 📖 See [`design.md`](./design.md) for the complete design system reference.

---

## 🔐 Privacy First

<div align="center">

```
┌─────────────────────────────────────────────┐
│                                             │
│   🖥️  YOUR BROWSER                          │
│                                             │
│   ┌───────────┐    ┌──────────────────┐     │
│   │ Your Photo│───▶│ Canvas API /     │     │
│   │  (Local)  │    │ WASM Processing  │     │
│   └───────────┘    └──────────────────┘     │
│                            │                │
│                            ▼                │
│                    ┌──────────────┐          │
│                    │ Download to  │          │
│                    │  Your Device │          │
│                    └──────────────┘          │
│                                             │
│   ❌ No server uploads                       │
│   ❌ No data collection                      │
│   ❌ No third-party tracking                 │
│   ✅ 100% client-side processing             │
│                                             │
└─────────────────────────────────────────────┘
```

</div>

---

## 📝 Available Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

<!-- Animated Footer -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,9,5&height=120&section=footer&animation=twinkling" width="100%" />

<p>
  <strong>Built with 💜 by the PixelCraft Studio Team</strong>
</p>

<p>
  <img src="https://img.shields.io/badge/⭐%20Star%20this%20repo-if%20you%20like%20it!-ff47ff?style=for-the-badge" alt="Star" />
</p>

</div>
