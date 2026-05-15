# 🌊 Vibe Water — Premium Interactive Website

> "Just water with a vibe." — A $50K-level React + Three.js brand website.

---

## ⚡ Quick Start

```bash
# 1. Install all dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# http://localhost:5173
```

---

## 📁 Project Structure

```
vibe-water/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── text-roll.tsx        ← Hover letter roll animation
│   │   │   └── spotlight.tsx        ← Mouse spotlight effect
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      ← 3D can + mouse parallax + GSAP
│   │   │   ├── BenefitsSection.tsx  ← Spotlight cards + scroll reveals
│   │   │   ├── FlavorsSection.tsx   ← 3D carousel (React Three Fiber)
│   │   │   ├── StorySection.tsx     ← Cinematic parallax + marquee
│   │   │   └── FooterSection.tsx    ← Giant bg text + magnetic CTAs
│   │   ├── VibeCan.tsx              ← 3D can (Three.js cylinder + canvas texture)
│   │   ├── AnimatedText.tsx         ← Word-by-word spring animation
│   │   ├── Magnet.tsx               ← Magnetic button wrapper
│   │   └── Nav.tsx                  ← Fixed nav + TextRoll + mobile menu
│   ├── data/
│   │   └── products.ts              ← 3 product variants
│   ├── lib/
│   │   └── utils.ts                 ← cn() helper
│   ├── App.tsx                      ← Lenis + GSAP ScrollTrigger setup
│   ├── index.css                    ← Global styles + design tokens
│   └── main.tsx                     ← Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 🛠 Tech Stack

| Library | Purpose |
|---|---|
| React 18 + Vite + TypeScript | Core framework |
| Tailwind CSS | Utility styling |
| Framer Motion | UI micro-animations |
| Three.js + React Three Fiber | 3D can rendering |
| @react-three/drei | Three.js helpers (Stars, Environment) |
| GSAP + ScrollTrigger | Cinematic scroll sequences |
| Lenis | Buttery smooth scrolling |
| Kanit (Google Fonts) | Brand typography |

---

## 🎨 Design Tokens

```css
--vibe-red:  #C0392B   /* Can top gradient */
--vibe-blue: #2980B9   /* Can bottom gradient */
--vibe-cyan: #00D4FF   /* Electric accent */
--vibe-gold: #F39C12   /* Warm accent */
--vibe-dark: #0C0C0C   /* Background */
```

---

## 🌟 Features

- **3D Can** — React Three Fiber cylinder with canvas-painted label texture, condensation drops, studio lighting
- **Mouse Parallax** — Hero can tilts with mouse movement using Framer Motion
- **Lenis Smooth Scroll** — Synced with GSAP ScrollTrigger for butter-smooth cinematic sequences
- **Scroll Reveals** — Every section animates in via GSAP (no abrupt pop-ins)
- **3D Flavor Carousel** — 3 cans rotating, hover glow rings, active scale
- **Magnetic Buttons** — Elastic spring magnet effect on all CTAs
- **TextRoll Nav** — Letter-by-letter roll hover on all navigation links
- **Spotlight Cards** — Mouse-tracked radial glow on benefits cards
- **Film Grain** — Subtle noise overlay on hero + story sections
- **Marquee Strips** — Continuous scrolling brand messaging
- **Mobile Responsive** — Hamburger menu, stacked layouts, touch-friendly

---

## 🚀 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Deploy the `dist/` folder to:
- **Vercel** — `vercel --prod`
- **Netlify** — drag & drop `dist/`
- **Cloudflare Pages** — connect GitHub repo

---

## 🔧 Customization

### Add a new flavor
Edit `src/data/products.ts`:
```ts
{ id: 4, name: 'Citrus', tagline: 'Squeeze the vibe', colorTop: '#F39C12', colorBottom: '#27AE60', ... }
```

### Change can colors
Update `colorTop` / `colorBottom` in `products.ts` — the 3D canvas texture auto-regenerates.

### Add real product photos
Replace the Canvas in `HeroSection.tsx` with an `<img>` tag pointing to your Shopify CDN or S3 URL.

---

Built with 💧 in Miami.
