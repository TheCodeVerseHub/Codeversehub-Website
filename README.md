# The Codeverse Hub Website

The official website for [The Codeverse Hub](https://thecodeversehub.tech) -> a community-driven open-source organization.

Built with [Next.js](https://nextjs.org) 16, Tailwind CSS v4, and TypeScript.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage -> hero, features, tech stack, about, stats, projects, contact |
| `/about` | Organization mission, vision, and values |
| `/projects` | All open-source repositories categorized by type, with GitHub stats |
| `/team` | Maintainers and top contributors |
| `/contributing` | Guide for new open-source contributors |
| `/resources` | Curated learning resources by language |
| `/pages` | Documentation index |
| `/pages/[slug]` | Markdown-rendered content pages |
| `/ban-appeal` | Discord ban appeal form |

## Features

- **GitHub Integration** -> Real-time repository data, contributor stats, and organization metrics via the GitHub API
- **RSS Feed** -> `/feed.xml` for project update notifications
- **Sitemap** -> Auto-generated `/sitemap.xml`
- **SEO** -> Structured data (JSON-LD), Open Graph, Twitter Cards, metadata
- **Performance** -> Static generation with ISR, optimized fonts, WebGL shader backgrounds

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Site URL (default: `https://thecodeversehub.tech`) |
| `DISCORD_BAN_APPEAL_WEBHOOK_URL` | Discord webhook for ban appeal submissions |

## Deployment

Configured for Netlify via `netlify.toml`. The `@netlify/plugin-nextjs` handles Next.js on Netlify's edge infrastructure.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Typography:** Neue Montreal + JetBrains Mono
- **Animations:** motion (framer-motion), GSAP, OGL (WebGL)
- **Content:** Markdown with gray-matter + remark
- **Data:** GitHub REST API (cached at 10-minute intervals)

## License

GPL-3.0 -> see [LICENSE](LICENSE).
