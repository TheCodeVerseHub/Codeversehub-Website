# Contributing to CodeVerse Hub

First off, **thank you** for taking the time to contribute, this project and the wider CodeVerse Hub ecosystem are powered by the community.

This file is a short, repo-level guide. For the full, always-up-to-date documentation, see the website page:

➡️  https://codeversehub.dev/pages/contributing (or `/pages/contributing` in the docs section of this site)

---

## Quick Start

1. **Fork** this repository
2. **Clone** your fork
3. Create a new branch:
   ```bash
   git checkout -b feat/short-description
   ```
4. Install dependencies and run the dev server:
   ```bash
   npm install
   npm run dev
   ```
5. Make your changes and run checks:
   ```bash
   npm run lint
   # optionally: npm run build
   ```
6. Commit with a [Conventional Commit](https://www.conventionalcommits.org/) style message, e.g.:
   ```bash
   git commit -m "feat: improve hero layout for landing page"
   ```
7. Push your branch and open a **Pull Request** against `master`.

---

## What to Work On

Some ideas specific to this repo:

- Landing page improvements (UX, accessibility, responsiveness)
- Content pages (FAQ, rules, resources, server info, etc.)
- Components (animations, terminal widget, cards, stats, etc.)
- Performance and bundle-size optimisations
- Linting / configuration / DX improvements

Check the **Issues** tab for `good first issue` and `help wanted` labels.

---

## Code Style

- This is a **Next.js + TypeScript + Tailwind** project
- Prefer functional React components and hooks
- Keep components focused; split large ones when it improves clarity
- Use `npm run lint` to catch style and TypeScript issues
- Follow existing patterns before introducing new ones

---

## Commit & PR Guidelines

- Use small, focused commits
- PR titles should roughly follow the same convention as commits
- A PR should do **one logical thing** , avoid drive‑by changes
- Include screenshots or gifs for visual/UI changes
- Link any related issues in the PR description

---

## Community & Support

- Join the Discord: https://discord.gg/3xKFvKhuGR
- Ask questions in `#contributing` or the relevant project channel
- Please also read the **Code of Conduct** in `content/pages/code-of-conduct.md`

We&apos;re excited to see what you build 🚀
