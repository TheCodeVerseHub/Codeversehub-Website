import type { CaseStudy } from "./types";

/**
 * Flagship case studies for The CodeVerse Hub.
 * Content is written from the repositories' READMEs, public metadata,
 * and the community's engineering blog posts. Metrics reflect live
 * GitHub data at the time of writing.
 */
export const caseStudies: CaseStudy[] = [
  /* ════════════════════════════════════════════════════════════════
     EIGEN BOT
     ════════════════════════════════════════════════════════════════ */
  {
    slug: "eigen-bot",
    repo: "Eigen-Bot",
    category: "Discord Bot",
    title: "Eigen Bot",
    tagline:
      "A production-ready, all-in-one Discord bot for community engagement, support tickets, and powerful moderation — built with modern async Python and discord.py.",
    description:
      "Modular utility bot with thread-based support tickets, starboard, tags, elections, staff applications, and engagement games. Hybrid prefix + slash commands, aiosqlite persistence, and Docker deployment.",
    problem: [
      "Community servers outgrow a single feature. By the time The CodeVerse Hub crossed a thousand members, staff were juggling half a dozen disconnected bots: one for moderation, one for tickets, one for fun games, one for starboard. Each bot had its own permissions model, its own database, and its own failure modes.",
      "Existing all-in-one bots were either closed-source, paid, or shipped opinionated features the community couldn't extend. The team wanted a self-hosted bot they fully owned — one that could grow with the server, be reloaded without downtime, and be hardened against injection attacks.",
    ],
    goals: [
      {
        title: "Support",
        description:
          "Thread-based ticket system with persistent button panels across Bugs, Support, and Partnerships categories.",
      },
      {
        title: "Engagement",
        description:
          "Anti-grief counting game, CodeBuddy quizzes, and Daily Quest rewards that keep members active beyond one-time moderation.",
      },
      {
        title: "Moderation",
        description:
          "Role-based access control, user tracking (chowkidar), and parameterized queries to prevent SQL injection.",
      },
      {
        title: "Extensibility",
        description:
          "Cog-based architecture with hot reload, documented setup, and Dockerized deployment so maintainers can iterate live.",
      },
    ],
    architecture: [
      "┌──────────────────────────────────────────────────────────────────────────┐",
      "│                                EIGEN BOT                                 │",
      "├──────────────────────────────────────────────────────────────────────────┤",
      "│   Discord Gateway       Cog Layer         Persistence          Ops       │",
      "│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌────────────┐ │",
      "│  │Hybrid         │  │Tickets        │  │aiosqlite      │  │Docker      │ │",
      "│  │commands       │  │Starboard      │  │.db files      │  │Compose     │ │",
      "│  │?prefix + /    │  │Tags · Elect   │  │parameterized  │  │hot reload  │ │",
      "│  │slash          │  │Games · Quests │  │SQL + RBAC     │  │?reload     │ │",
      "│  └───────────────┘  └───────────────┘  └───────────────┘  └────────────┘ │",
      "│  hot reload (?reload) · Docker Compose · RBAC security                   │",
      "└──────────────────────────────────────────────────────────────────────────┘",
    ],
    systemDesign:
      "Eigen Bot is organized as a modular cog-based application around a single async event loop. Each feature lives in its own cog, exposing hybrid commands that work with both the ? prefix and native / slash commands. State is persisted per-feature in dedicated SQLite databases, accessed exclusively through parameterized queries behind a role-based access-control layer.",
    stages: [
      {
        title: "Gateway & Commands",
        description:
          "discord.py hybrid commands give members a familiar ? prefix while surfacing discoverable / slash commands. Guild-scoped syncing keeps slash updates instant during development.",
      },
      {
        title: "Cog Layer",
        description:
          "Tickets, starboard, tags, elections, staff applications, and games each live in an isolated module that can be hot-reloaded with ?reload — no restarts, no downtime during live events.",
      },
      {
        title: "Persistence",
        description:
          "aiosqlite provides async database access across dedicated .db files. All queries are parameterized, and admin actions pass through an RBAC layer before touching data.",
      },
      {
        title: "Deployment",
        description:
          "Fully containerized with Docker and Docker Compose, with environment-driven configuration (DISCORD_TOKEN, OWNER_ID, GUILD_IDS) for reproducible, single-command setup.",
      },
    ],
    features: [
      {
        title: "Support Tickets",
        description:
          "Thread-based categories (Bugs, Support, Partnerships) with persistent button panels — members open a thread with one click and staff work through it in-place.",
      },
      {
        title: "Starboard System",
        description:
          "Community-voted content is highlighted automatically with dynamic embeds, surfacing the best posts without manual curation.",
      },
      {
        title: "Tag System",
        description:
          "High-speed storage and retrieval of custom text snippets — staff paste common answers in one command instead of retyping them.",
      },
      {
        title: "Elections & Voting",
        description:
          "Democratic decision-making with weighted roles, used by the community for maintainer elections and rule polls.",
      },
      {
        title: "Staff Applications",
        description:
          "DM-based application flow with admin review channels, keeping the pipeline private and organized.",
      },
      {
        title: "Engagement Games",
        description:
          "Anti-grief counting game, CodeBuddy MCQ quizzes, and Daily Quest rewards keep the server lively between technical discussions.",
      },
    ],
    techStack: [
      {
        name: "Python 3.11+",
        description: "Core language — modern async patterns keep the bot responsive under load.",
      },
      {
        name: "discord.py",
        description: "Gateway client with hybrid commands (prefix + slash) and cog support.",
      },
      {
        name: "aiosqlite",
        description: "Async SQLite access for per-feature persistence without blocking the event loop.",
      },
      {
        name: "Docker / Compose",
        description: "Reproducible containerized deployment with env-driven configuration.",
      },
    ],
    metrics: [
      { value: "14", label: "GitHub Stars", sub: "and climbing" },
      { value: "15", label: "Forks", sub: "community forks" },
      { value: "3", label: "Ticket Categories", sub: "Bugs · Support · Partnerships" },
      { value: "2", label: "Core Maintainers", sub: "youngcoder45 · 1Frodox" },
    ],
    results:
      "Eigen Bot consolidated the community's bot sprawl into one owned codebase. Support tickets moved from ad-hoc DMs to organized threads with persistent panels, and moderation tooling (chowkidar tracking, RBAC) gave staff precision without giving them dangerous raw permissions. The bot is the reference implementation for new contributors joining the org's Discord bot cohort.",
    challenges: [
      {
        challenge:
          "Slash commands take up to an hour to sync globally, which slows live iteration on a bot used in production every day.",
        solution:
          "Hybrid commands expose both ? prefix and / slash interfaces from a single implementation, and GUILD_IDS scopes slash syncing to the development guild for near-instant updates.",
      },
      {
        challenge:
          "Six features sharing one process risks a single crash or permission bug cascading across all of them.",
        solution:
          "Each feature is isolated in its own cog with its own .db file, wrapped in a role-based access control layer. Parameterized queries eliminate the injection class of bugs entirely.",
      },
      {
        challenge:
          "Live community events can't wait for a deploy cycle when a command misbehaves.",
        solution:
          "The cog architecture ships a ?reload command, so maintainers hot-swap modules without restarting the process or dropping the gateway connection.",
      },
    ],
    highlights: [
      {
        title: "Hybrid Commands",
        description:
          "One implementation, two interfaces: ?prefix for power users, / slash for discoverability. No duplicated command logic.",
      },
      {
        title: "Security First",
        description:
          "Parameterized SQL everywhere, role-based access control on every admin path, and no raw database string interpolation.",
      },
      {
        title: "Self-Hosted Ownership",
        description:
          "No vendor lock-in, no premium tiers. The community owns the code, the data, and the deployment.",
      },
    ],
    lessons: [
      "Async I/O discipline pays off — a single blocking call in a shared cog stalls every command, so every feature must stay non-blocking.",
      "Documentation-as-code (the /docs markdown set) makes a production bot maintainable by a rotating team of contributors.",
      "Self-hosting is a feature: full control over permissions, data, and deployment turned the bot into a teaching artifact for new Discord developers.",
    ],
    links: {
      github: "https://github.com/TheCodeVerseHub/Eigen-Bot",
    },
    featured: true,
  },

  /* ════════════════════════════════════════════════════════════════
     CODEVERSEHUB WEBSITE
     ════════════════════════════════════════════════════════════════ */
  {
    slug: "codeversehub-website",
    repo: "Codeversehub-Website",
    category: "Web Platform",
    title: "The CodeVerse Hub Website",
    tagline:
      "The official home of The CodeVerse Hub — a Next.js 16 platform streaming live GitHub data, a markdown docs engine, and community workflows like ban appeals.",
    description:
      "Static-first Next.js 16 site with ISR, live GitHub repository/contributor data via the REST API (10-minute cache), markdown-rendered docs with TOC, RSS feed, sitemap, and JSON-LD structured data.",
    problem: [
      "For a community whose entire pitch is 'we build real software', a single landing page linking to Discord was not enough. The org needed a website that did what the community does: ship real, live, open-source software — starting with the site itself.",
      "The team wanted live GitHub data (repositories, contributors, organization metrics) without hitting rate limits or serving stale numbers, plus a documentation engine that non-maintainers could edit without touching React components.",
    ],
    goals: [
      {
        title: "Live GitHub Data",
        description:
          "Real-time repository listings, contributor stats, and org metrics fetched from the GitHub REST API — cached for performance.",
      },
      {
        title: "Documentation",
        description:
          "Markdown-rendered content pages under /pages/[slug] with an auto-generated table of contents and sidebar.",
      },
      {
        title: "Community Workflows",
        description:
          "A Discord ban-appeal form wired to a webhook, plus contribution guides, team pages, and an RSS feed for project updates.",
      },
      {
        title: "SEO & Performance",
        description:
          "Static generation with ISR, JSON-LD structured data, Open Graph, Twitter cards, sitemap, and optimized fonts — on Netlify's edge.",
      },
    ],
    architecture: [
      "┌──────────────────────────────────────────────────────────────────────────┐",
      "│                        THE CODEVERSE HUB WEBSITE                         │",
      "├──────────────────────────────────────────────────────────────────────────┤",
      "│  Next.js 16 App Router →       Data Layer     →        Edge / CDN        │",
      "│  ┌────────────────────┐→ ┌───────────────────┐→ ┌──────────────────────┐ │",
      "│  │Static pages        │→ │GitHub REST API    │→ │ISR revalidation      │ │",
      "│  │Docs engine         │→ │org / repos /      │→ │600s cache            │ │",
      "│  │/pages/[slug]       │→ │contributors       │→ │JSON file cache       │ │",
      "│  │Ban appeal          │→ │(GITHUB_TOKEN)     │→ │stale fallback        │ │",
      "│  └────────────────────┘→ └───────────────────┘→ └──────────────────────┘ │",
      "│  SEO: JSON-LD · Open Graph · sitemap.xml · RSS /feed.xml                 │",
      "└──────────────────────────────────────────────────────────────────────────┘",
    ],
    systemDesign:
      "The site is a static-first Next.js 16 App Router application. Pages that depend on GitHub data are rendered at request time and revalidated every 600 seconds (ISR), while a file-backed JSON cache absorbs API outages so the site never renders an empty state. Content lives as markdown in content/pages, parsed with gray-matter and remark, with a custom TOC extraction pass feeding a sticky sidebar.",
    stages: [
      {
        title: "Presentation",
        description:
          "App Router layout with Space Grotesk / JetBrains Mono typography, Tailwind CSS v4, WebGL shader backgrounds, and a loading screen for a distinctive brand feel.",
      },
      {
        title: "Content",
        description:
          "Markdown pages with gray-matter frontmatter, remark + remark-gfm rendering, and a generated table of contents with anchor scrolling.",
      },
      {
        title: "Data",
        description:
          "GitHub REST API with an optional token, 10-minute revalidation, and a JSON file cache written on each successful fetch as a stale-data fallback.",
      },
      {
        title: "Discovery",
        description:
          "Auto-generated sitemap, RSS feed (/feed.xml), JSON-LD Organization/WebSite structured data, and full Open Graph + Twitter card coverage.",
      },
    ],
    features: [
      {
        title: "Live GitHub Integration",
        description:
          "Real repository data, contributor avatars, org stats, and per-repo details — fetched server-side and cached at 10-minute intervals.",
      },
      {
        title: "Docs Engine",
        description:
          "Markdown content pages with automatic tables of contents, sidebar navigation, and icon badges — editable without touching React.",
      },
      {
        title: "Ban Appeal Workflow",
        description:
          "A server-rendered form that forwards submissions to a Discord webhook with structured embeds and local appeal logging.",
      },
      {
        title: "Resilience by Design",
        description:
          "A JSON file cache falls back to stale-but-present data when GitHub is down or rate-limited, so pages never break at runtime.",
      },
    ],
    techStack: [
      {
        name: "Next.js 16",
        description: "App Router, ISR, and server components for a static-first, fast site.",
      },
      {
        name: "TypeScript",
        description: "End-to-end typing across pages, API routes, and the GitHub data layer.",
      },
      {
        name: "Tailwind CSS v4",
        description: "Utility-first styling with shadcn/ui-style primitives and a custom design system.",
      },
      {
        name: "gray-matter + remark",
        description: "Markdown content pipeline with GFM support and TOC extraction.",
      },
      {
        name: "GitHub REST API",
        description: "Live org, repo, and contributor data with token-augmented rate limits.",
      },
      {
        name: "Netlify",
        description: "Edge deployment via @netlify/plugin-nextjs with automatic ISR support.",
      },
    ],
    metrics: [
      { value: "9+", label: "Public Routes", sub: "pages, docs, API, RSS" },
      { value: "600s", label: "ISR Revalidation", sub: "fresh data, static speed" },
      { value: "8", label: "GitHub Stars", sub: "the site itself is open source" },
      { value: "3", label: "Forks", sub: "community contributors" },
    ],
    results:
      "The website became the org's front door and its most-contributed repository. Live GitHub data replaced hand-maintained project lists, contributors appear on the team page automatically, and the markdown docs engine let staff update guides without a code review. RSS and structured data turned the site into a distribution channel for the community.",
    challenges: [
      {
        challenge:
          "GitHub's API allows only 60 unauthenticated requests per hour — a handful of pages would exhaust the budget in minutes.",
        solution:
          "A GITHUB_TOKEN raises the limit to 5,000/hr, and every fetch is wrapped in a 10-minute ISR revalidation plus a JSON file cache that serves stale data during outages.",
      },
      {
        challenge:
          "Markdown docs need tables, anchors, and a sidebar — remark-html alone renders plain HTML with no navigation.",
        solution:
          "remark-gfm renders GitHub-flavored tables, and a custom TOC extraction pass rewrites headings with ids and feeds a sticky DocSidebar.",
      },
      {
        challenge:
          "Heavy animated hero layers (WebGL shaders, spotlight, waves) risk hurting Core Web Vitals.",
        solution:
          "The site stays static-first with ISR, self-hosted optimized fonts, and progressive loading screens that hide hydration jank.",
      },
    ],
    highlights: [
      {
        title: "Cache-First Data Layer",
        description:
          "Every GitHub fetch writes a JSON cache file; the site serves it whenever the API is down, rate-limited, or slow.",
      },
      {
        title: "Editable Docs Engine",
        description:
          "Contributors update guides by editing markdown in content/pages — no React knowledge required.",
      },
      {
        title: "Own Dogfood",
        description:
          "The site lists itself as a project, streams its own repo stats, and is deployed from the org's own CI.",
      },
    ],
    lessons: [
      "A caching strategy is the difference between a data-backed site that feels static and one that breaks at runtime.",
      "Markdown as a content contract lets non-engineers maintain a developer community's documentation.",
      "Structured data (JSON-LD, sitemap, RSS) is cheap to add and turns a marketing page into a distribution channel.",
    ],
    links: {
      github: "https://github.com/TheCodeVerseHub/Codeversehub-Website",
      homepage: "https://thecodeversehub.tech",
    },
    featured: true,
  },

  /* ════════════════════════════════════════════════════════════════
     CODEVERSE LINUX
     ════════════════════════════════════════════════════════════════ */
  {
    slug: "codeverse-linux",
    repo: "CodeVerseLinuxDistro",
    category: "Linux Distribution",
    title: "CodeVerse Linux",
    tagline:
      "A community-built, Arch-based Linux distribution with a Wayland-first focus — ArchISO profile, curated configs, custom packages, and an interactive installer.",
    description:
      "Arch-based distro built with an ArchISO profile, Wayland-first curated configs (niri, waybar, rofi), a local pacman repo of custom packages, and a beginner-friendly cvh-install installer.",
    problem: [
      "Mainstream distributions ship heavy defaults tuned for nobody in particular. The CodeVerse Hub community wanted a distro shaped by their own workflow — Wayland-first, developer-oriented, and minimal — and, just as importantly, a shared project that would teach members distro engineering from the inside.",
      "Distro projects are usually opaque: they expect deep Arch knowledge just to build an ISO. The team set out to make the build path a documented learning journey, so a first-timer could go from 'what is an ISO?' to flashing their own build.",
    ],
    goals: [
      {
        title: "Build",
        description:
          "Reproducible ArchISO profile with a single build script that outputs a bootable .iso artifact.",
      },
      {
        title: "Install",
        description:
          "Interactive cvh-install installer that walks users through disk selection and setup with clear prompts.",
      },
      {
        title: "Configure",
        description:
          "Curated Wayland-first configs — niri, waybar, rofi, GRUB theme — committed to the repo as the distro's default experience.",
      },
      {
        title: "Learn",
        description:
          "Beginner-friendly documentation that starts at 'what is an ISO?' so community members can build and flash their own.",
      },
    ],
    architecture: [
      "┌──────────────────────────────────────────────────────────────────────────┐",
      "│                       CODEVERSE LINUX (CVH LINUX)                        │",
      "├──────────────────────────────────────────────────────────────────────────┤",
      "│          Source        →         Build        →          Output          │",
      "│  ┌────────────────────┐→ ┌───────────────────┐→ ┌──────────────────────┐ │",
      "│  │iso/ (ArchISO       │→ │build-iso.sh       │→ │out/ .iso             │ │",
      "│  │profile)            │→ │build-pkg.sh       │→ │artifact              │ │",
      "│  │configs/ niri       │→ │cvh-install        │→ │live environment      │ │",
      "│  │waybar · rofi       │→ │(interactive)      │→ │+ installer           │ │",
      "│  └────────────────────┘→ └───────────────────┘→ └──────────────────────┘ │",
      "│  custom packages: src/ · pkgbuild/ · repo/ (local pacman repo)           │",
      "└──────────────────────────────────────────────────────────────────────────┘",
    ],
    systemDesign:
      "The repository is structured around a classic distro pipeline: source, build, output. An ArchISO profile in iso/ declares the package set, filesystem layout, and bootloader. Build tooling in scripts/ assembles the ISO and installs custom packages built from src/ via PKGBUILDs into a local pacman repo. The output is a bootable ISO that boots into a Wayland-first desktop with curated configs, and a cvh-install installer that partitions and sets up the target disk interactively.",
    stages: [
      {
        title: "ArchISO Profile",
        description:
          "iso/ holds the packages list, airootfs overlay, and bootloader config — the declarative heart of the distribution.",
      },
      {
        title: "Build Tooling",
        description:
          "scripts/build-iso.sh assembles the ISO; scripts/build-pkg.sh builds custom packages from PKGBUILDs into the local repo.",
      },
      {
        title: "Curated Configs",
        description:
          "configs/ ships the Wayland-first default experience: niri compositor, waybar status bar, rofi launcher, and a custom GRUB theme.",
      },
      {
        title: "Installer",
        description:
          "cvh-install runs inside the live environment, interactively selecting the target disk, partitioning, and completing setup with on-screen prompts.",
      },
    ],
    features: [
      {
        title: "Wayland-First Desktop",
        description:
          "A curated niri + waybar + rofi stack tuned for a developer workflow, replacing the GNOME/KDE defaults of most distros.",
      },
      {
        title: "Interactive Installer",
        description:
          "cvh-install guides users through disk selection and setup — no command-line partitioning knowledge required.",
      },
      {
        title: "Custom Packages",
        description:
          "src/ + pkgbuild/ + repo/ maintain the distro's own software in a local pacman repository, versioned like any Arch package.",
      },
      {
        title: "Beginner-First Docs",
        description:
          "The README walks from 'what is an ISO?' through building, flashing to USB, and booting in VirtualBox or QEMU.",
      },
    ],
    techStack: [
      {
        name: "ArchISO",
        description: "The official Arch tooling for building reproducible ISO profiles.",
      },
      {
        name: "bash / shell",
        description: "Build scripts and the interactive installer logic.",
      },
      {
        name: "niri · waybar · rofi",
        description: "The Wayland-first default desktop stack shipped in configs/.",
      },
      {
        name: "GRUB",
        description: "Bootloader with a custom theme, configured in the ISO profile.",
      },
      {
        name: "pacman",
        description: "Package management, extended by a local repo of custom packages.",
      },
    ],
    metrics: [
      { value: "10", label: "GitHub Stars", sub: "community support" },
      { value: "13", label: "Forks", sub: "heavily forked by learners" },
      { value: "x86_64", label: "Architecture", sub: "one target, no ambiguity" },
      { value: "4+", label: "Curated Configs", sub: "niri · waybar · rofi · GRUB" },
    ],
    results:
      "CodeVerse Linux became the org's flagship systems project and one of its most-forked repositories. The beginner-first documentation has converted members with zero Linux packaging experience into contributors who can build, flash, and install their own distribution — exactly the 'learn by building' outcome the community exists for.",
    challenges: [
      {
        challenge:
          "ArchISO builds only run on Arch-based hosts, which excludes most contributors' daily machines.",
        solution:
          "Builds are officially supported inside VMs, and the docs dedicate a section to building within VirtualBox/QEMU Arch guests.",
      },
      {
        challenge:
          "The installer wipes the selected disk — one wrong choice and a user's data is gone.",
        solution:
          "The installer is interactive and warns explicitly at each destructive step; docs recommend VM testing until users are comfortable.",
      },
      {
        challenge:
          "Curated configs drift as upstream tools (niri, waybar) release breaking changes.",
        solution:
          "Configs are committed and versioned in the repo with the ISO, so a build always pairs a known-good config set with a known-good package set.",
      },
    ],
    highlights: [
      {
        title: "Local Pacman Repo",
        description:
          "Custom packages ship through the distro's own repository, teaching contributors real package-maintenance skills.",
      },
      {
        title: "One-Command Build",
        description:
          "./scripts/build-iso.sh turns the profile into a bootable .iso in out/ — the entire pipeline is two commands from clone to flash.",
      },
      {
        title: "Learning by Doing",
        description:
          "The README doubles as a curriculum: contributors learn ISO internals, partitioning, and boot flows by building.",
      },
    ],
    lessons: [
      "A distribution is a documentation problem as much as an engineering one — beginner docs doubled the contributor pool.",
      "Declaring everything (profile, packages, configs) in the repo makes builds reproducible and reviewable.",
      "VM-first testing turns a scary system-level project into something a first-timer can safely break and rebuild.",
    ],
    links: {
      github: "https://github.com/TheCodeVerseHub/CodeVerseLinuxDistro",
    },
    featured: true,
  },

  /* ════════════════════════════════════════════════════════════════
     ECLIPSE LINUX
     ════════════════════════════════════════════════════════════════ */
  {
    slug: "eclipse-linux",
    repo: "EclipseLinux",
    category: "Linux Distribution",
    title: "Eclipse Linux",
    tagline:
      "An experimental Void Linux (musl) distribution powered by the custom dynamod init system — Makefile-driven builds, a TUI installer, and hybrid BIOS+UEFI live ISOs.",
    description:
      "Minimal Void Linux musl-based distro with a from-scratch dynamod init system. Reproducible Makefile pipeline, SquashFS live ISO with GRUB (BIOS + UEFI), dialog-based TUI installer, and a QEMU test harness.",
    problem: [
      "Modern distros abstract away everything between kernel and userspace. For a community that wanted to understand systems deeply, mainstream distributions were too opaque — package managers, init systems, and boot flows come pre-assembled with no visible seams.",
      "Eclipse Linux started as the org's answer to that opacity: a minimal musl-based distribution where the init system is written by the community itself, and every layer of the stack is visible in the repository.",
    ],
    goals: [
      {
        title: "Custom Init",
        description:
          "Boot with dynamod, a from-scratch init system developed by the community rather than borrowed from upstream.",
      },
      {
        title: "Minimal Base",
        description:
          "Build on the Void Linux musl rootfs — a tiny, fast base with no systemd and no bloat.",
      },
      {
        title: "Reproducible Build",
        description:
          "Makefile-driven pipeline: make dynamod → make rootfs → make iso, with QEMU test targets.",
      },
      {
        title: "Usable Installer",
        description:
          "A dialog-based TUI installer that runs inside the live ISO for real hardware installs.",
      },
    ],
    architecture: [
      "┌──────────────────────────────────────────────────────────────────────────┐",
      "│                              ECLIPSE LINUX                               │",
      "├──────────────────────────────────────────────────────────────────────────┤",
      "│      Build pipeline    →         Output       →          Target          │",
      "│  ┌────────────────────┐→ ┌───────────────────┐→ ┌──────────────────────┐ │",
      "│  │dynamod init        │→ │build-rootfs.sh    │→ │.iso artifact         │ │",
      "│  │(source)            │→ │xbps in chroot     │→ │BIOS + UEFI           │ │",
      "│  │Void musl           │→ │build-iso.sh       │→ │SquashFS              │ │",
      "│  │rootfs tarball      │→ │(squashfs/xorriso) │→ │GRUB boot             │ │",
      "│  └────────────────────┘→ └───────────────────┘→ └──────────────────────┘ │",
      "│  make dynamod · make rootfs · make iso · make test-qemu                  │",
      "└──────────────────────────────────────────────────────────────────────────┘",
    ],
    systemDesign:
      "Eclipse Linux is assembled in three stages, each a make target. make dynamod builds the community's own init system unprivileged. make rootfs takes a Void Linux musl rootfs tarball, installs packages with xbps inside a chroot, and strips firmware blobs and extra locales to keep the result minimal. make iso wraps the rootfs in a SquashFS image with a GRUB bootloader supporting both BIOS and UEFI, producing a hybrid live ISO that ships a dialog-based installer.",
    stages: [
      {
        title: "Init System",
        description:
          "dynamod is built from source as a normal user — the community owns the very first process the kernel launches.",
      },
      {
        title: "Root Filesystem",
        description:
          "Void musl rootfs + xbps package set assembled in a chroot, with firmware blobs and unused locales stripped for a slim image.",
      },
      {
        title: "Live ISO",
        description:
          "SquashFS rootfs wrapped by GRUB with hybrid BIOS + UEFI support, produced by build-iso.sh with xorriso and mtools.",
      },
      {
        title: "Installer & Testing",
        description:
          "eclipse-install is a dialog-based TUI that runs inside the live environment; QEMU targets (graphical, serial, install) validate every build.",
      },
    ],
    features: [
      {
        title: "Custom dynamod Init",
        description:
          "The distro boots with an init system written by the community — a rare, deeply educational engineering exercise.",
      },
      {
        title: "Hybrid BIOS + UEFI ISO",
        description:
          "One ISO boots on legacy BIOS and modern UEFI hardware thanks to GRUB's dual-stage configuration.",
      },
      {
        title: "Makefile-Driven Builds",
        description:
          "make dynamod / rootfs / iso / test-qemu turn a messy systems pipeline into four discoverable commands.",
      },
      {
        title: "QEMU Test Harness",
        description:
          "Graphical, serial-console, and install test targets let contributors validate ISO changes without rebooting hardware.",
      },
    ],
    techStack: [
      {
        name: "Void Linux (musl)",
        description: "Minimal, dependency-light base with musl libc.",
      },
      {
        name: "dynamod",
        description: "The community's own from-scratch init system.",
      },
      {
        name: "Make",
        description: "Declarative build pipeline entrypoints.",
      },
      {
        name: "SquashFS + xorriso",
        description: "Read-only rootfs compression and hybrid ISO assembly.",
      },
      {
        name: "GRUB",
        description: "BIOS + UEFI dual-mode bootloader.",
      },
      {
        name: "dialog",
        description: "TUI installer interface inside the live environment.",
      },
    ],
    metrics: [
      { value: "17", label: "GitHub Stars", sub: "the org's most-starred repo" },
      { value: "5", label: "QEMU Targets", sub: "graphical · serial · install" },
      { value: "musl", label: "Libc", sub: "minimal by design" },
      { value: "0.1.0", label: "Version Track", sub: "experimental & evolving" },
    ],
    results:
      "Eclipse Linux is the org's most-starred repository and its boldest systems experiment. The Makefile pipeline and QEMU harness turned a notoriously fiddly process — distro ISO building — into a repeatable workflow that newcomers can run and extend. dynamod remains the community's flagship from-scratch systems achievement.",
    challenges: [
      {
        challenge:
          "The dynamod init source lives outside the repo and is gitignored, so a fresh clone won't build without it.",
        solution:
          "make dynamod is a first-class target that clones and builds the init bits locally — documented explicitly as an unprivileged step.",
      },
      {
        challenge:
          "ISO building requires sudo, mount, chroot, and loop devices — a fragile host environment.",
        solution:
          "Scripts validate every required tool (mksquashfs, xorriso, grub-mkimage, mtools…) and print package hints for Void and Arch hosts.",
      },
      {
        challenge:
          "Stripping firmware blobs and locales makes the live environment WiFi-light and breaks some GPUs.",
        solution:
          "The trade-off is documented in the README as an intentional size decision, with the exact build variables (ECLIPSE_VERSION, VOID_DATE) exposed for override.",
      },
    ],
    highlights: [
      {
        title: "From-Scratch Init",
        description:
          "The kernel's first userland process is the community's own code — an engineering milestone few projects can claim.",
      },
      {
        title: "Four-Command Build",
        description:
          "make dynamod → rootfs → iso → test-qemu is the entire development loop.",
      },
      {
        title: "Slim by Design",
        description:
          "musl base plus stripped firmware and locales keeps the live image small and honest about its trade-offs.",
      },
    ],
    lessons: [
      "Systems work rewards a good test harness — the QEMU targets made ISO iteration faster and safer than any hardware workflow.",
      "Explicit version pins (VOID_DATE, ECLIPSE_VERSION) are what turn a pipeline into something reproducible months later.",
      "Documenting trade-offs (stripped firmware) builds trust and invites the right contributions.",
    ],
    links: {
      github: "https://github.com/TheCodeVerseHub/EclipseLinux",
    },
    featured: true,
  },

  /* ════════════════════════════════════════════════════════════════
     MIKU
     ════════════════════════════════════════════════════════════════ */
  {
    slug: "miku",
    repo: "Miku",
    category: "Discord Bot",
    title: "Miku",
    tagline:
      "A cute, feature-rich Discord leveling bot with a first-principles XP formula, PostgreSQL persistence, and hybrid commands — built for modern communities.",
    description:
      "Arcane-inspired leveling bot: 15-25 XP per message with a 60s cooldown, XP = 5·level² + 50·level + 100, rank cards, paginated leaderboards, role rewards, admin level tools, and GitHub search commands.",
    problem: [
      "Engagement bots are a staple of every growing server, but the popular ones are closed-source, ad-supported, or store everything in flat files that don't survive restarts. The community wanted a leveling bot they could read, extend, and trust with real member data.",
      "The design brief was specific: a leveling system with a deliberate, documented formula, persistent storage that wouldn't lose progress, and a command surface that felt native to modern Discord.",
    ],
    goals: [
      {
        title: "Leveling",
        description:
          "A first-principles XP curve (XP = 5·level² + 50·level + 100) with 15-25 XP per message and a 60-second anti-farming cooldown.",
      },
      {
        title: "Engagement",
        description:
          "Rank cards with progress bars, paginated top-50 leaderboards with medals, and configurable role rewards per level.",
      },
      {
        title: "Persistence",
        description:
          "Async PostgreSQL via asyncpg — no flat files, no lost progress, per-guild data isolation.",
      },
      {
        title: "Extensibility",
        description:
          "Modular cog structure plus GitHub integration commands, admin level tools, and hybrid prefix + slash commands.",
      },
    ],
    architecture: [
      "┌──────────────────────────────────────────────────────────────────────────┐",
      "│                                   MIKU                                   │",
      "├──────────────────────────────────────────────────────────────────────────┤",
      "│        discord.py      →      Cog Modules     →        Data Layer        │",
      "│  ┌────────────────────┐→ ┌───────────────────┐→ ┌──────────────────────┐ │",
      "│  │hybrid commands     │→ │leveling.py        │→ │asyncpg               │ │",
      "│  │& prefix + /        │→ │help · fun         │→ │PostgreSQL            │ │",
      "│  │intents: Msg,       │→ │info · utility     │→ │user_id/guild_id      │ │",
      "│  │Members, Guilds     │→ │github.py          │→ │xp · level · msgs     │ │",
      "│  └────────────────────┘→ └───────────────────┘→ └──────────────────────┘ │",
      "│  rank_card.py → progress-bar embeds · leaderboard pagination             │",
      "└──────────────────────────────────────────────────────────────────────────┘",
    ],
    systemDesign:
      "Miku is a cog-based discord.py bot with three layers. The gateway layer subscribes to message events (with the Message Content, Server Members, and Guilds intents) and routes them to hybrid commands. The leveling core applies the XP formula, enforces per-user-per-guild cooldowns, and renders rank cards as rich embeds. All state — XP, level, message counts, role rewards — lives in PostgreSQL through asyncpg, with tables auto-created on first run and isolated per guild.",
    stages: [
      {
        title: "Gateway & Commands",
        description:
          "Hybrid commands answer both &prefix and / slash invocations; privileged intents gate which events the bot can observe.",
      },
      {
        title: "Leveling Core",
        description:
          "Randomized 15-25 XP per message with a 60-second cooldown prevents farming; level-up announcements auto-delete after 10 seconds to reduce spam.",
      },
      {
        title: "Rank & Leaderboards",
        description:
          "rank_card.py renders level, rank, message count, and progress to next level; leaderboards paginate the top 50 with medal emojis.",
      },
      {
        title: "Persistence",
        description:
          "asyncpg talks to PostgreSQL with per-guild rows keyed by user_id + guild_id — data survives restarts and never crosses servers.",
      },
    ],
    features: [
      {
        title: "XP & Leveling",
        description:
          "Arcane-style curve with documented requirements — level 10 needs 3,850 XP, level 50 needs 89,250 — and anti-farming cooldowns.",
      },
      {
        title: "Rank Cards",
        description:
          "Beautiful embeds showing rank, level, messages sent, total XP, and an animated progress bar to the next level.",
      },
      {
        title: "Role Rewards",
        description:
          "Admins bind roles to levels (addrole/removerole/rolerewards), turning level-ups into automatic perks.",
      },
      {
        title: "GitHub Integration",
        description:
          "Repo lookups, user/organization profiles, and repository/user search straight from Discord — a natural fit for a developer community.",
      },
      {
        title: "Admin Tools",
        description:
          "setlevel, addxp, resetlevel, and resetalllevels (with a CONFIRM guard) give staff full control over leaderboards.",
      },
    ],
    techStack: [
      {
        name: "Python 3.14+",
        description: "Modern runtime with packaging via pyproject.toml / uv.",
      },
      {
        name: "discord.py",
        description: "Async gateway client with hybrid commands and cog system.",
      },
      {
        name: "asyncpg",
        description: "High-performance async PostgreSQL driver.",
      },
      {
        name: "PostgreSQL",
        description: "Durable, relational storage for XP, levels, and rewards.",
      },
    ],
    metrics: [
      { value: "30+", label: "Commands", sub: "across 6 cogs" },
      { value: "15-25", label: "XP per Message", sub: "randomized, 60s cooldown" },
      { value: "89,250", label: "XP at Level 50", sub: "XP = 5·L² + 50·L + 100" },
      { value: "7", label: "Forks", sub: "community re-deployments" },
    ],
    results:
      "Miku proved that a community can ship a leveling bot with production-grade persistence instead of settling for a third-party widget. The XP formula is documented and tunable, the leaderboards drive healthy competition, and the GitHub commands turned the bot into a developer tool as much as a gamification layer.",
    challenges: [
      {
        challenge:
          "XP farming: members sending spam messages to grind levels would destroy the leaderboard's meaning.",
        solution:
          "Randomized 15-25 XP awards plus a 60-second per-user-per-guild cooldown, with bots and DMs excluded entirely.",
      },
      {
        challenge:
          "Level-up spam clutters channels in active servers.",
        solution:
          "Level-up announcements auto-delete after 10 seconds and can be confined to a dedicated setlevelchannel.",
      },
      {
        challenge:
          "Global slash commands take up to an hour to sync, delaying feature rollouts.",
        solution:
          "Hybrid commands expose the full surface via & prefix instantly, while slash sync and the applications.commands scope are documented for discoverability.",
      },
    ],
    highlights: [
      {
        title: "First-Principles Formula",
        description:
          "XP = 5·level² + 50·level + 100 is documented, tunable, and shipped with a level-requirement table — no black-box scoring.",
      },
      {
        title: "Real Database, Not Files",
        description:
          "Async PostgreSQL with auto-created tables means member progress survives restarts, deploys, and power failures.",
      },
      {
        title: "Per-Guild Isolation",
        description:
          "Leaderboards and levels never leak across servers — each guild gets its own isolated dataset.",
      },
    ],
    lessons: [
      "Gamification is a retention multiplier — the documented XP curve made the system transparent and therefore trusted.",
      "Cooldowns and randomization are the two levers that keep engagement systems fair at scale.",
      "Embedding developer tools (GitHub search) into a community bot made it useful beyond gamification.",
    ],
    links: {
      github: "https://github.com/TheCodeVerseHub/Miku",
    },
    featured: true,
  },

  /* ════════════════════════════════════════════════════════════════
     CODEVERSE COMPOSITOR
     ════════════════════════════════════════════════════════════════ */
  {
    slug: "codeverse-compositor",
    repo: "Codeverse-compositor",
    category: "Systems / Wayland",
    title: "CodeVerse Compositor",
    tagline:
      "An experimental Wayland compositor written in Rust on Smithay — a modular workspace exploring DRM, input handling, and modern Linux desktop engineering.",
    description:
      "Rust workspace on Smithay with five crates: compositor binary, window/layout management, TOML config + keybindings, IPC, and a .desktop launcher. Auto-selects Winit (nested) or DRM (real session) backends, with QEMU test scripts.",
    problem: [
      "For developers who maintain a Linux distribution, the desktop itself was the last black box. How does a window actually get drawn? How does input reach an app? How does a compositor talk to the kernel's DRM subsystem?",
      "The community wanted to answer those questions in Rust — by writing a compositor from scratch on Smithay — and to build it the way they build everything else: modularly, testably, and shaped by the community's own keybindings and theme.",
    ],
    goals: [
      {
        title: "Compositor Core",
        description:
          "A Smithay-based compositor binary with auto-selecting Winit (nested) and DRM (real session) backends.",
      },
      {
        title: "Modular Workspace",
        description:
          "Five crates — compositor, window, config, IPC, launcher — so each concern is independently testable.",
      },
      {
        title: "Configuration",
        description:
          "TOML config with keybindings and theme, shipped with a default config users can copy.",
      },
      {
        title: "Testability",
        description:
          "QEMU VM scripts, cargo test, and strict clippy (-D warnings) keep experimental code honest.",
      },
    ],
    architecture: [
      "┌──────────────────────────────────────────────────────────────────────────┐",
      "│                           CODEVERSE COMPOSITOR                           │",
      "├──────────────────────────────────────────────────────────────────────────┤",
      "│     Workspace crates   →        Backends      →          Config          │",
      "│  ┌────────────────────┐→ ┌───────────────────┐→ ┌──────────────────────┐ │",
      "│  │compositor bin      │→ │Winit (nested)     │→ │config.toml           │ │",
      "│  │window/layout       │→ │DRM (TTY)          │→ │keybindings           │ │",
      "│  │config + IPC        │→ │libinput · libseat │→ │theme                 │ │",
      "│  │launcher (.desktop) │→ │libdrm · GBM/EGL   │→ │default config        │ │",
      "│  └────────────────────┘→ └───────────────────┘→ └──────────────────────┘ │",
      "│  qemu-test.sh · deploy-to-vm.sh · cargo test --workspace                 │",
      "└──────────────────────────────────────────────────────────────────────────┘",
    ],
    systemDesign:
      "The project is a Rust workspace where every responsibility is its own crate. codeverse-compositor hosts the binary and Smithay event loop; codeverse-window owns layouts and the workspace tree; codeverse-config parses TOML into keybindings and themes; codeverse-ipc defines the inter-process protocol; and codeverse-launcher discovers applications from .desktop files. At runtime the binary auto-selects its backend — Winit for nested sessions inside an existing desktop, DRM for a real TTY session.",
    stages: [
      {
        title: "Core Compositor",
        description:
          "Smithay event loop, rendering, and output handling live in the binary crate; debug with RUST_LOG=info.",
      },
      {
        title: "Window Management",
        description:
          "codeverse-window implements layouts and a workspace tree, separating the policy (where windows go) from the protocol (how they're shown).",
      },
      {
        title: "Config & IPC",
        description:
          "codeverse-config parses ~/.config/codeverse-compositor/config.toml for keybindings and theme; codeverse-ipc types the control channel.",
      },
      {
        title: "Launcher & Testing",
        description:
          "codeverse-launcher parses .desktop entries for app discovery; qemu-test.sh and deploy-to-vm.sh validate real sessions in a VM.",
      },
    ],
    features: [
      {
        title: "Dual Backends",
        description:
          "Run nested inside any desktop (Winit) for development, or on a clean TTY (DRM) for a real compositing session — auto-selected.",
      },
      {
        title: "TOML Configuration",
        description:
          "Keybindings and theme are plain TOML with a shipped default config, so the compositor adapts to the community's workflow.",
      },
      {
        title: "Workspace Tree",
        description:
          "codeverse-window manages workspaces and layouts as a tree, keeping tiling behavior explicit and extensible.",
      },
      {
        title: "VM Test Harness",
        description:
          "qemu-test.sh boots a Linux ISO with the compositor in a shared folder, and deploy-to-vm.sh pushes builds into a running VM.",
      },
    ],
    techStack: [
      {
        name: "Rust (edition 2021)",
        description: "Memory-safe systems language for DRM and input handling.",
      },
      {
        name: "Smithay",
        description: "The Wayland compositor toolkit the project builds on.",
      },
      {
        name: "libinput · libseat",
        description: "Input handling and seat/session management.",
      },
      {
        name: "libdrm · GBM/EGL",
        description: "Kernel DRM access and GPU buffer management for rendering.",
      },
      {
        name: "TOML",
        description: "Human-friendly configuration format for keybindings and themes.",
      },
    ],
    metrics: [
      { value: "5", label: "Workspace Crates", sub: "compositor · window · config · ipc · launcher" },
      { value: "2", label: "Backends", sub: "Winit (nested) · DRM (real)" },
      { value: "3", label: "GitHub Stars", sub: "experimental but growing" },
      { value: "WIP", label: "Status", sub: "experimental, from scratch" },
    ],
    results:
      "CodeVerse Compositor is the org's frontier systems project. The crate split means contributors can land meaningful work — a config parser, a launcher, an IPC type — without touching the compositor core, which makes a notoriously intimidating codebase approachable. The QEMU harness means each milestone is verifiable without burning hardware.",
    challenges: [
      {
        challenge:
          "Smithay and the DRM stack need system libraries whose package names vary wildly between distros.",
        solution:
          "The README lists the exact libraries (libxkbcommon, libinput, libseat, libdrm + GBM/Mesa/EGL) with a note to install -dev/-devel headers on build errors.",
      },
      {
        challenge:
          "DRM sessions require device permissions, seats, and groups that differ per machine.",
        solution:
          "Nested Winit mode is the recommended starting point; DRM notes cover video/input groups and seat setup, with a qemu-test.sh path for safe iteration.",
      },
      {
        challenge:
          "A compositor's correctness is hard to verify without a real session.",
        solution:
          "QEMU scripts boot a live ISO with the binary shared into the VM, and deploy-to-vm.sh pushes iterations into a running test session.",
      },
    ],
    highlights: [
      {
        title: "Crate-Split Architecture",
        description:
          "Five crates keep compositor internals, config, IPC, and launcher independently testable and approachable.",
      },
      {
        title: "Nested-First Development",
        description:
          "Winit backend means contributors develop and debug inside their existing desktop before ever touching DRM.",
      },
      {
        title: "Strict Quality Gates",
        description:
          "cargo clippy -D warnings and cargo test --workspace are part of the contributor workflow.",
      },
    ],
    lessons: [
      "Compositor engineering demystifies the desktop — after DRM and input handling, no systems project feels out of reach.",
      "Nested mode is the right on-ramp: iterate in Winit, then test real sessions in QEMU.",
      "A modular workspace turns a monolith-scale problem into beginner-sized contributions.",
    ],
    links: {
      github: "https://github.com/TheCodeVerseHub/Codeverse-compositor",
    },
    featured: true,
  },
];

/** Repo name → case study slug map, used to link repos to their studies. */
export const caseStudyRepoSlugs: Record<string, string> = Object.fromEntries(
  caseStudies.map((cs) => [cs.repo, cs.slug]),
);
