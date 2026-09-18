# RexaCloud Website — AI Build Prompt

> Paste this entire prompt into any AI coding assistant (Claude, Gemini, ChatGPT, Cursor, etc.) to rebuild or extend the RexaCloud website.

---

## Prompt

Build a **premium, production-ready hosting website** for a brand called **"RexaCloud"** — a game server & cloud hosting company targeting Indian gamers and developers.

### Brand Identity
- **Brand Name:** RexaCloud
- **Tagline:** "Power Your World With RexaCloud"
- **Target Market:** Indian gamers, Minecraft communities, content creators, developers
- **Tone:** Bold, energetic, trustworthy, gamer-friendly
- **Logo:** ⚡ lightning bolt icon + "RexaCloud" wordmark in gradient

### Design System
Use **vanilla HTML, CSS, and JavaScript** (no frameworks). Design inspired by:
- **LordCloud.in** — Deep cyberpunk dark theme, neon glow effects
- **EnderCloud.in** — Clean dark panels, game hosting cards
- **IndiCloud.oriko.lk** — Interactive starfield background, glassmorphic navbar, amber accents
- **MatrixNetwork.in** — Isometric server graphics, performance stats, pricing table

**Color Palette:**
- Background: `#050510` (deep space black)
- Primary: `#7c3aed` → `#a855f7` (violet/purple)
- Accent: `#f59e0b` (amber/gold)
- Highlight: `#06b6d4` (cyan)
- Text Primary: `#f1f5f9`
- Text Secondary: `#94a3b8`
- Card Background: `rgba(255,255,255,0.04)`

**Typography:** Import `Inter` and `Space Grotesk` from Google Fonts.

**Effects:**
- Animated `<canvas>` starfield (moving particles + connecting lines, purple tint)
- Glassmorphic navbar (backdrop-filter: blur on scroll)
- Glow effects on buttons (purple glow, amber glow)
- Scroll reveal animation (Intersection Observer)
- Card hover tilt effect
- Button ripple effect
- Gradient text using `background-clip: text`

---

### Website Sections (in order)

1. **Announcement Bar** (full-width gradient strip at top)
   - Text: "🎉 Grand Launch Offer: 30% OFF all plans | Use code REXA30"
   - Animated gradient background
   - Close button (×)

2. **Sticky Glassmorphic Navbar**
   - Logo: ⚡ + "RexaCloud" (gradient text)
   - Nav links: Games, Services (dropdown: Game Servers, VPS, Web), Pricing, Features, FAQ, Discord
   - CTAs: Login (ghost) + Get Started (purple gradient pill)
   - Hamburger menu for mobile (slide-in full-screen overlay)
   - On scroll: becomes frosted glass with border

3. **Hero Section** (split layout)
   - Left col: Badge pill ("Now Serving 1,200+ Active Servers" with pulse dot), H1 headline, description, dual CTAs (Start Hosting amber + Browse Games outline), 4 stat pills (99.9% Uptime, <25ms Latency, 1,200+ Servers, 24/7 Support)
   - Right col: Custom SVG/isometric server rack illustration with glowing LEDs that animate (opacity pulse), + 3 floating glassmorphic info cards that float up/down (Server Online 12ms, NVMe SSD 7000MB/s, DDoS Protected)
   - Background: radial glow orbs (purple left, cyan right)
   - Canvas starfield fixed behind everything

4. **Stats Bar** (4-column grid card)
   - 99.9% Uptime · <25ms Latency · 1Tbps+ DDoS · 24/7 Support
   - Each with icon, large gradient number, description
   - Glassmorphic container with shared border

5. **Games Section** (3×2 grid of game cards)
   - Games: Minecraft (⛏️), ARK (🦕), Rust (🪓), CS2 (🎯), Valheim (⚔️), Terraria (🌳)
   - Each card has: colored gradient bg top panel with large emoji, game name, short description, price (From ₹XX/mo), Popular/New/Hot badge
   - Hover: translateY(-6px) + card tilt via mousemove + purple border glow
   - "View All Games →" link below grid

6. **Features Section** (3×2 grid)
   - DDoS Protection (🛡️ red), NVMe SSD (⚡ purple), Global CDN (🌐 cyan), Instant Deploy (🚀 green), Free Panel (🎛️ amber), 24/7 Support (🎧 blue)
   - Each card with colored icon box, title, description
   - Hover: subtle lift + top gradient accent line

7. **Performance Section** (2-column layout)
   - Left: Heading, description, 4 animated progress bars (Network Uptime 99.9%, NVMe Speed, DDoS, Support Response)
   - Right: "Network Map" card showing 6 server locations (Mumbai 12ms, Delhi 15ms, Bangalore 18ms, Singapore 42ms, Tokyo 80ms, Frankfurt 110ms) in a 3×2 grid with flag emojis and ping color-coded green/amber

8. **Pricing Section**
   - Monthly/Annual toggle (saves 20%) — toggle switches prices with smooth transition
   - Game Server Plans: Starter (₹99/mo), Pro (₹249/mo — featured/highlighted), Elite (₹499/mo)
   - Each card: name, description, giant price number, feature list with ✓/✗, CTA button

9. **Testimonials** (3-col grid)
   - 3 customer review cards with: 5 stars, italic quote, avatar initial circle, name, role
   - Glassmorphic cards with large decorative quote mark

10. **FAQ Accordion** (max-width 760px centered)
    - 6 questions about deployment speed, payment methods, upgrades, refund policy, DDoS, panel
    - Smooth max-height transition, +/× icon rotates on open

11. **CTA Banner** (centered, full-width with radial glow bg)
    - "Join 1,200+ Happy Gamers on RexaCloud"
    - "Use code REXA30 for 30% off"
    - Start Hosting (amber) + Join Discord (indigo #5865F2) buttons

12. **Footer** (4-col grid)
    - Brand col: logo, tagline, social icons (Discord, Twitter, Instagram, YouTube)
    - Services: Game Servers, VPS, Web Hosting, Discord Bots
    - Company: About, Blog, Careers, Status
    - Support: Discord, Ticket, Knowledgebase, Privacy, Terms
    - Bottom bar: copyright + payment badges (UPI, Razorpay, Paytm, Visa, Mastercard)

---

### JavaScript Requirements

```javascript
// 1. Canvas Starfield
// - 160 particles moving slowly, wrap at edges
// - Purple connecting lines for particles within 120px
// - Particles are small white/lavender dots

// 2. Navbar scroll effect
// - Toggle .scrolled class (glass background) after 60px scroll

// 3. Mobile hamburger
// - Toggle full-screen nav overlay, animate hamburger to X

// 4. Scroll reveal
// - IntersectionObserver on [data-reveal] elements
// - Fade in + translateY(30px → 0) with staggered delays via [data-reveal-delay="N"]

// 5. Pricing toggle
// - Change price-amount textContent between data-monthly and data-annual values
// - Smooth scale/opacity transition on number change

// 6. FAQ accordion
// - Click to toggle .open class
// - Animate max-height 0 → scrollHeight
// - Only one open at a time

// 7. Performance bars
// - Bars start at width:0, animate to data-width% when section comes into view

// 8. Card tilt effect
// - On mousemove over .game-card, apply rotateX/rotateY based on cursor position
// - Reset on mouseleave

// 9. Button ripple
// - On click, inject span with scale animation at cursor position
```

---

### Responsive Breakpoints

- **≤1024px:** Hero becomes 1 column (hide right SVG visual), footer 2-col
- **≤768px:** Show hamburger, hide nav links; all grids go 1-col except stats (2-col), games (2-col)
- **≤480px:** Games grid 1-col, hero CTA stack vertically, footer 1-col

---

### SEO Requirements

```html
<title>RexaCloud — Premium Game & Cloud Hosting</title>
<meta name="description" content="RexaCloud offers premium game server hosting, VPS, and web hosting with 99.9% uptime, DDoS protection, and 24/7 support. Start from ₹89/mo." />
<meta name="keywords" content="game hosting, minecraft hosting, VPS hosting, web hosting India, game server, RexaCloud" />
<meta property="og:title" content="RexaCloud — Premium Game & Cloud Hosting" />
```

---

### File Structure

```
/REXACLOUD/
├── index.html   ← Main homepage
├── styles.css   ← Full design system
└── script.js    ← All interactivity
```

---

**Output:** Three complete files (`index.html`, `styles.css`, `script.js`) with all sections functional, responsive, and visually stunning. Every section should have scroll reveal, each button should have hover glow + ripple, and the starfield must be a fixed canvas behind all content.
