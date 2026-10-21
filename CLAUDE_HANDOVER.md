# Handover Brief: Radial Tool Pro (Modern UI & Interaction)

## 1. Overview & Repo
- **Repository**: [https://github.com/zh6xk/radial-tool-pro](https://github.com/zh6xk/radial-tool-pro)
- **Goal**: Build an ultra-modern, fluid, transparent Radial Context Menu and Launcher for Windows using React 18, Tailwind CSS, Framer Motion, Lucide Icons, and Electron.
- **Brand**: 100% original naming as **Radial Tool Pro** (no external framework names).

---

## 2. Current Architecture & Tech Stack
- **Desktop Host**: Electron 33 (`electron/main.js`, `electron/preload.js`)
- **Frontend**: React 18 + Vite 5 + TypeScript (`src/App.tsx`, `src/main.tsx`)
- **Styling**: Tailwind CSS (`tailwind.config.js`, `src/index.css`)
- **Animations**: Framer Motion 11
- **Icons**: Lucide React

---

## 3. What Was Built & What Went Wrong (The Current Screenshot Issue)
1. **The Issue in the Screenshot**:
   - The user launched `Radial Tool Pro.exe`.
   - Instead of a sleek floating HUD overlay that opens on demand (e.g., hold mouse trigger XBUTTON or hotkey) centered at the mouse cursor with transparent background, it launched as a large static window with a rectangular dark/dim backdrop covering the screen (`w-screen h-screen bg-black/40 backdrop-blur-md`).
   - The radial wheel itself looks like five big square cards in a circle instead of continuous organic circular sectors/slices.
   - The window doesn't close on click outside or on item selection, and there is no global mouse hook (XBUTTON1/XBUTTON2 hold-aim-release) wired into Electron yet.

---

## 4. Key Improvements Needed from Claude
1. **Windowing & Transparency**:
   - Make the Electron window completely transparent, click-through outside the wheel, or properly hide/show on trigger.
   - Spawn the wheel centered at the mouse cursor position, not fixed in screen center.
2. **Visual Aesthetics (True Circular Slices vs Floating Tiles)**:
   - Make the radial menu visually stunning: sleek circular sectors with subtle gaps, continuous SVG/Canvas radial pie slices, glowing neon borders on hover, fluid spring physics.
3. **Trigger & Interaction**:
   - Global mouse hook or hotkey to summon the wheel.
   - "Hold-Aim-Release" interaction: Hold trigger button -> move towards sector -> release to execute.
   - Cancel when mouse remains in center hub (`✕ BATAL`).
4. **Clean Code & Build**:
   - Keep code modular. Ensure `npm run build` and `electron-builder` succeed cleanly.
