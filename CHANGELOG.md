# Changelog

All notable changes to the **CodeVerse Hub** website are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Ban appeal form at `/ban-appeal` that submits to `/api/ban-appeal` and delivers appeals to a Discord channel via webhook
- Animated terminal window component with typewriter effect and language switcher (Python / TypeScript / Rust)
- `Features` section 8-card grid covering community offerings (help desk, code reviews, OSS hub, etc.)
- `TechMarquee` component dual-row infinite scrolling marquee of 28+ languages and frameworks
- Interactive language-tab buttons in terminal header with visible labels and proper hit areas
- Subtle grid overlay texture on hero background
- Social proof strip in hero (active daily · 10+ OSS projects · Free forever)

### Changed
- **Hero section** replaced TextPressure title widget with a bold 3-line headline and Discord CTA button
- **About section** rewrote copy with developer-specific language (2am debugging, OSS contributions, 50+ countries)
- **JoinCTA section** redesigned as a full card with Discord server icon, member avatar row, and gradient CTA
- Marquee animations added to `globals.css` with hover-pause behaviour
- Contributing guide expanded with commit conventions, PR template, code style rules, and full workflow

### Fixed
- Language switcher buttons were `8×8px` increased to pill-shaped labelled tabs with sufficient touch target

---

## [0.3.0] 2026-02-XX

### Added
- `/pages/[slug]` dynamic route with sidebar navigation (`DocSidebar`)
- `Resources` page at `/resources`
- Markdown content pages: contributing, code-of-conduct, FAQ, rules, privacy policy, moderation guide, and more
- `FlowingMenu` component for the Projects section
- `GradientBlinds` animated background shader
- `FuzzyText` and `GradientText` typography utilities
- Announcements data feed (`data/announcements.json`)
- Formspree contact form integration

### Changed
- Footer redesigned with navigation links and branding
- Navbar updated with responsive mobile menu

---

## [0.2.0] 2025-12-XX

### Added
- `Stats` section with animated count-up numbers using `IntersectionObserver`
- `Projects` section powered by `FlowingMenu`
- `ContactSection` with contact method cards and form
- `JoinCTA` call-to-action section

### Changed
- Global font switched to **Neue Montreal** (woff2) across all weights
- Tailwind CSS v4 configuration migrated to `@theme inline`

---

## [0.1.0] 2025-11-XX

### Added
- Initial Next.js 15 project scaffold with Turbopack
- `Navbar`, `Footer`, and hero layout
- `TextPressure` interactive typography component
- Tailwind CSS v4 + shadcn/ui setup
- `tsconfig`, `eslint.config`, `postcss.config` baseline configuration
- GitHub repository initialised under [TheCodeVerseHub](https://github.com/TheCodeVerseHub)
