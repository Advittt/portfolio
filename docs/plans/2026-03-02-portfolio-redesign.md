# Portfolio Redesign - Design Document

## Overview

Refactor Advit Ahuja's portfolio from a basic static multi-page site into a bold, kinetic, technically-sharp single-page portfolio with separate Contact and Blog pages.

## Design Direction

**Aesthetic:** Bold & Kinetic + Technical & Sharp. Scroll animations, geometric patterns, dramatic typography, animated reveals. An AI and ML software engineer's portfolio that feels engineered.

## Color System

- `#0d0d0d` - Deep black base
- `#1a1a1a` - Surface/card color
- `#ff6600` - Primary orange (kept from original)
- `#ff8533` - Light orange for gradients/accents
- `#e0e0e0` - Primary text
- `#888888` - Secondary text
- `rgba(255, 102, 0, 0.15)` - Orange glow for depth effects

## Typography

- Display/headings: Plus Jakarta Sans (geometric, warm, clean descenders — replaced Syne due to glyph clipping issues)
- Body: Outfit (clean modern sans-serif)
- Monospace accents for tech tags: JetBrains Mono

## Site Structure

### Single-page index.html
1. Hero (full viewport)
2. About Me
3. Work Experience
4. Projects
5. Download CTAs
6. Footer

### Separate pages
- contact.html
- blog.html (future)

## Navigation

- Sticky top bar with scroll-spy (highlights active section)
- Nav links: About, Experience, Projects, Contact, Blog
- Right side: Two compact ghost/outlined download buttons (Resume, Portfolio) always visible
- 3px orange scroll-progress bar fixed at very top of viewport

## Section 1: Hero

- Full viewport height
- Large display font (Plus Jakarta Sans) for name "Advit Ahuja"
- Animated canvas background: geometric grid with connected nodes/lines, constellation/network pattern in dark grey with orange accent nodes
- Tagline types itself out with blinking cursor
- Pulsing scroll-down chevron at bottom

## Section 2: About Me

- Geometric divider transition from hero
- Centered content, ~900px max-width
- Section heading with horizontal orange line accent
- Bio text (condensed to 2 strong paragraphs)
- Skills as animated pill tags, staggering in on scroll:
  - Languages: Python, Java, C#, Svelte, TypeScript, JavaScript, Dart, SQL
  - ML/AI: Machine Learning, NLP, Computer Vision, Data Analysis
  - Tools: Flutter, GraphQL, Jupyter, Android Studio, Figma
- Education: compact block (University of Manchester, BSc Hons CS, 2:1)
- Achievements: subtle highlighted items (GDSC Co-Lead, Reply Challenge, Harvard MOOC)
- Animation: fade + slide up on scroll, skill tags stagger with bounce

## Section 3: Work Experience

- Vertical timeline with thin orange center line
- Three nodes, cards alternating left/right on desktop, stacked on mobile
- Each card shows: company, role, dates, 1-line summary
- Click to expand: full bullet points, screenshot/image, tech tags as pills
- Roles (most recent first):
  1. ServiceMob (Oct 2025 - Present)
     - Lead AI Software Engineer (Mar 2026 - Present)
     - AI Software Engineer Intern (Oct 2025 - Feb 2026)
     - Enterprise RAG pipeline with LangChain, end-to-end MVP launch, lead engineer of 2 devs
     - Tags: RAG, LangChain, Python, LLMs, NLP, Prisma, SQL
  2. RE:JOIN - Software Engineer, Mobile App Dev (Aug 2023 - Apr 2024)
     - Revamped mobile app, real-time chat (20+ users, 40% engagement), reusability +30%
     - Tags: Flutter, Dart, GraphQL, Figma
  3. Dixterz Peri Peri - Website Designer (Aug 2022)
     - Responsive website, UI design, client delivery
     - Tags: HTML, CSS, Web Design
- Animations: timeline line draws downward on scroll, cards slide in from sides, smooth expand/collapse

## Section 4: Projects

- 2x2 grid on desktop, single column on mobile
- Cards: image top, dark overlay on hover reveals full brightness, title, description, tech tags
- Hover: lift + orange glow border
- Four projects:
  1. ML for Particle Accelerator (Dissertation) — 90% accuracy, presented to UKRI
  2. DNN for Vision Recognition — CNN on CIFAR-100, 14% accuracy increase
  3. Visual Computing - Horizon Detection — OpenCV with C++
  4. NLU - Evidence Detection — 5,927 pairs, outperformed baselines by 5-8%

## Section 5: Download CTAs

- Divider line
- Two large CTA buttons: Download Portfolio, Download Resume
- Ghost/outlined style, orange border, fill on hover

## Footer

- Minimal: name, copyright 2026, icon links (GitHub, LinkedIn, Email)
- Thin orange top border

## Animations & Interactions

- Intersection Observer for all scroll-triggered animations
- Staggered timing across elements
- Hero: canvas geometric animation (fixed, full-page), typewriter effect
- Background: constellation canvas is position:fixed covering entire page. A `.canvas-fade` overlay darkens progressively as user scrolls (transparent at top → near-opaque by ~2500px scroll depth). Driven by JS scroll listener updating rgba opacity.
- About: fade-up, skill tag stagger with bounce
- Experience: timeline draw, card slide-in, expand/collapse
- Projects: card fade-in, hover effects
- Scroll progress bar: 3px orange line at top of viewport

## Technical Approach

- Pure HTML, CSS, JavaScript (no frameworks, keeping it simple for GitHub Pages)
- Google Fonts for Plus Jakarta Sans + Outfit + JetBrains Mono
- CSS custom properties for theming
- CSS animations + JS Intersection Observer for scroll triggers
- Canvas API for full-page constellation background with scroll-driven fade overlay
- Responsive: mobile-first with breakpoints at 600px and 900px

## Files to Modify/Create

- `index.html` - Complete rewrite (single-page with all sections)
- `style.css` - Complete rewrite (new design system)
- `contact.html` - Restyle to match new design
- `script.js` - New file for animations, canvas, scroll handling
- `assets/` - Will need work experience screenshots (user to provide)
