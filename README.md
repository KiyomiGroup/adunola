# Adunola Babadiya — Multi-World Portfolio

A premium, dark-luxury design portfolio with a multi-world system. Built with HTML + CSS + Vanilla JS. GitHub Pages ready.

---

## 📁 File Structure

```
/
├── index.html              ← Main site (Product Design homepage)
├── styles.css              ← Global design system
├── script.js               ← All interactions & transitions
│
├── worlds/
│   ├── uiux.html           ← UI/UX Design World
│   ├── graphic.html        ← Graphic Design World
│   ├── nocode.html         ← No-Code / Development World
│   └── vibe-lab.html       ← Vibe Lab (experimental)
│
├── case-studies/
│   ├── project-1.html      ← Vitsetech Mobile Redesign
│   ├── project-2.html      ← Lifemap Naija Wellness App
│   └── project-3.html      ← Safari City Game UI Redesign
│
└── assets/
    ├── images/             ← Add project screenshots here
    └── icons/              ← Add custom icons here
```

---

## 🧪 Local Preview

### Option 1: Direct open (quickest)
Simply double-click `index.html` — it will open in your browser.

> ⚠️ Note: Some browsers may block relative file navigation due to local security policies. Use Option 2 for full functionality.

### Option 2: VS Code Live Server (recommended)
1. Open the portfolio folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **"Open with Live Server"**
4. Your site opens at `http://127.0.0.1:5500`

### Option 3: Python local server
```bash
cd /path/to/portfolio
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

---

## 🎬 How the Site Works

### Flow
1. User lands on **index.html** — the Product Design homepage
2. They scroll through the hero, case studies, services, and experience sections
3. They notice **"Explore System ⊕"** in the navigation or the CTA section
4. Clicking it opens the **System Map overlay** — a full-screen node diagram
5. Each node represents a world; clicking navigates to that world

### System Map
- Triggered by: nav button or CTA button on homepage
- Shows 5 nodes: Adunola (center), UI/UX, Graphic, No-Code, Vibe Lab
- Click any node → navigates to that world with a fade transition
- Press **Escape** or click **✕ Close** to dismiss
- Available on every page via the nav

### Page Transitions
All navigation uses the `navigateTo(url)` function in `script.js` which:
1. Fades in the overlay (`.page-overlay`)
2. After 400ms, navigates to the URL
3. On page load, fades the overlay back out

### Worlds
Each world (`worlds/*.html`) is a standalone mini-site with:
- Its own accent color (CSS variable `--world-accent`)
- Its own hero, content sections, and footer
- The same system map available in the nav
- "← Back to Main" always accessible

---

## 🚀 GitHub Pages Deployment

1. Create a new GitHub repo named: `adunolababadiya` (or any name)
2. Upload all files maintaining the same folder structure
3. Go to **Settings → Pages**
4. Set:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Your site goes live at: `https://[yourusername].github.io/[reponame]/`

### Quick deploy with GitHub CLI:
```bash
git init
git add .
git commit -m "Initial portfolio deploy"
git remote add origin https://github.com/yourusername/adunolababadiya.git
git push -u origin main
```

---

## 🎨 Design System

- **Background:** `#0a0a09` (near-black warm)
- **Accent:** `#c8a96e` (warm gold)
- **Typography:** Cormorant Garamond (display) + DM Mono (body)
- **World Accents:** Blue (`uiux`), Terracotta (`graphic`), Green (`nocode`), Lavender (`vibe`)

---

## ✉️ Contact Info Used
- Email: Adunoladiya@gmail.com
- WhatsApp: +234 708 844 8530
- Twitter: @Nolagraphics_
- YouTube: NolaDesigns

---

## 📝 Adding Real Project Images

To replace the placeholder gradient backgrounds with real project screenshots:

1. Add images to `/assets/images/`
2. In the relevant HTML, replace `.card-img-placeholder` with:
```html
<img src="../assets/images/your-project-image.jpg" alt="Project name" />
```

---

*Built by Adunola Babadiya · 2025*
