import { category, subcategory } from "../helpers";

export const web = category(
  "web",
  "Web Development",
  "HTML, CSS, and the frameworks that build the modern web — from fundamentals to full-stack.",
  [
    subcategory("html", "HTML", [
      {
        title: "MDN — HTML",
        description:
          "The definitive HTML reference and guides, maintained by Mozilla.",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["mdn", "reference", "semantic html"],
      },
      {
        title: "HTML Living Standard",
        description:
          "The official WHATWG spec that defines the HTML language itself.",
        url: "https://html.spec.whatwg.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["spec", "whatwg", "standard"],
      },
      {
        title: "web.dev — Learn HTML",
        description:
          "Google's structured HTML course covering semantics, forms, and best practices.",
        url: "https://web.dev/learn/html",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["google", "course", "best practices"],
      },
      {
        title: "W3C HTML validator",
        description:
          "The official markup validation service — check any page or snippet.",
        url: "https://validator.w3.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["validator", "tool", "w3c"],
      },
      {
        title: "HTML.com",
        description:
          "A friendly reference and tutorial site for HTML tags and attributes.",
        url: "https://html.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["tutorial", "reference", "tags"],
      },
    ]),
    subcategory("css", "CSS", [
      {
        title: "MDN — CSS",
        description:
          "The definitive CSS reference with guides on layout, colors, and animation.",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["mdn", "reference", "stylesheets"],
      },
      {
        title: "web.dev — Learn CSS",
        description:
          "Google's free course covering CSS from selectors to modern layout.",
        url: "https://web.dev/learn/css",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["google", "course", "layout"],
      },
      {
        title: "CSS-Tricks",
        description:
          "Long-running articles, guides, and tricks for CSS and front-end development.",
        url: "https://css-tricks.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["articles", "guides", "frontend"],
      },
      {
        title: "Flexbox Froggy",
        description:
          "A cute interactive game for learning CSS flexbox.",
        url: "https://flexboxfroggy.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["game", "flexbox", "interactive"],
      },
      {
        title: "CSS Grid Garden",
        description:
          "An interactive game that teaches CSS Grid through gardening puzzles.",
        url: "https://cssgridgarden.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["game", "grid", "interactive"],
      },
      {
        title: "CSS Battle",
        description:
          "A daily competitive game where you recreate targets with the smallest CSS.",
        url: "https://cssbattle.dev/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["game", "challenge", "competitive"],
      },
      {
        title: "Can I Use",
        description:
          "Check browser support for any CSS (and JS) feature before you ship.",
        url: "https://caniuse.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["browser support", "tool", "compatibility"],
      },
    ]),
    subcategory("react", "React", [
      {
        title: "React Docs (react.dev)",
        description:
          "The official React documentation with interactive examples and deep guides.",
        url: "https://react.dev/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["docs", "official", "reference"],
      },
      {
        title: "React — Learn",
        description:
          "The official learning path covering state, effects, and component design.",
        url: "https://react.dev/learn",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["tutorial", "learn", "official"],
      },
      {
        title: "React Reference",
        description:
          "The complete API reference for hooks, components, and APIs.",
        url: "https://react.dev/reference/react",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["hooks", "api", "reference"],
      },
      {
        title: "Patterns.dev",
        description:
          "Modern React and JavaScript design patterns, rendered beautifully.",
        url: "https://www.patterns.dev/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["patterns", "architecture", "performance"],
      },
      {
        title: "React TypeScript Cheatsheet",
        description:
          "Practical, community-maintained patterns for using React with TypeScript.",
        url: "https://react-typescript-cheatsheet.netlify.app/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Cheat Sheet",
        tags: ["typescript", "cheatsheet", "patterns"],
      },
      {
        title: "Epic React",
        description:
          "Kent C. Dodds' comprehensive paid course taking you from React basics to mastery.",
        url: "https://www.epicreact.dev/",
        difficulty: "Intermediate",
        access: "Paid",
        badge: "Video Course",
        tags: ["kent c dodds", "course", "advanced"],
      },
    ]),
    subcategory("nextjs", "Next.js", [
      {
        title: "Next.js Documentation",
        description:
          "The official docs for the React framework — App Router, data fetching, and more.",
        url: "https://nextjs.org/docs",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["docs", "app router", "official"],
      },
      {
        title: "Next.js Learn",
        description:
          "The official interactive course — build a full-stack dashboard app step by step.",
        url: "https://nextjs.org/learn",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["course", "tutorial", "full stack"],
      },
      {
        title: "Next.js App Router reference",
        description:
          "API reference for file conventions, routing, and rendering in the App Router.",
        url: "https://nextjs.org/docs/app",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["app router", "reference", "api"],
      },
      {
        title: "Vercel Documentation",
        description:
          "Deployment and platform docs from the company behind Next.js.",
        url: "https://vercel.com/docs",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["vercel", "deployment", "serverless"],
      },
      {
        title: "Next.js — GitHub repository",
        description:
          "The source code, discussions, and release notes for Next.js itself.",
        url: "https://github.com/vercel/next.js",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source", "source code"],
      },
    ]),
    subcategory("vue", "Vue", [
      {
        title: "Vue.js Official Docs",
        description:
          "The official Vue documentation — progressive framework guides and API.",
        url: "https://vuejs.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["vue", "docs", "official"],
      },
      {
        title: "Vue — Interactive Tutorial",
        description:
          "Learn Vue 3 hands-on with the official in-browser tutorial.",
        url: "https://vuejs.org/tutorial/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["tutorial", "interactive", "vue 3"],
      },
      {
        title: "Vue Router Documentation",
        description:
          "Official docs for client-side routing in Vue applications.",
        url: "https://router.vuejs.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["router", "spa", "official"],
      },
      {
        title: "Pinia Documentation",
        description:
          "The official state management library for Vue, with guides and API.",
        url: "https://pinia.vuejs.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["state", "store", "official"],
      },
      {
        title: "Awesome Vue",
        description:
          "A curated list of Vue components, libraries, and learning resources.",
        url: "https://github.com/vuejs/awesome-vue",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["awesome list", "libraries", "components"],
      },
      {
        title: "Vue School",
        description:
          "Screencasts and courses for Vue and the ecosystem around it.",
        url: "https://vueschool.io/",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Video Course",
        tags: ["courses", "screencasts", "video"],
      },
    ]),
    subcategory("angular", "Angular", [
      {
        title: "Angular Documentation",
        description:
          "The official Angular docs — components, signals, routing, and testing.",
        url: "https://angular.dev/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["angular", "docs", "official"],
      },
      {
        title: "Angular Tutorials",
        description:
          "Official interactive tutorials that build an Angular app step by step.",
        url: "https://angular.dev/tutorials",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["tutorial", "interactive", "beginner"],
      },
      {
        title: "Angular — GitHub repository",
        description:
          "Source code, issues, and contribution docs for the Angular framework.",
        url: "https://github.com/angular/angular",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source", "source code"],
      },
      {
        title: "Angular University",
        description:
          "In-depth paid courses on Angular, RxJS, and related tooling.",
        url: "https://angular-university.io/",
        difficulty: "Intermediate",
        access: "Paid",
        badge: "Video Course",
        tags: ["courses", "rxjs", "advanced"],
      },
      {
        title: "Angular Blog",
        description:
          "Official announcements, version notes, and deep dives from the Angular team.",
        url: "https://blog.angular.dev/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["blog", "news", "official"],
      },
    ]),
    subcategory("svelte", "Svelte", [
      {
        title: "Svelte Official Docs",
        description:
          "The official Svelte documentation — a compiler-based approach to UI.",
        url: "https://svelte.dev/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["svelte", "docs", "official"],
      },
      {
        title: "Svelte Tutorial (learn.svelte.dev)",
        description:
          "The interactive official tutorial for Svelte and SvelteKit.",
        url: "https://learn.svelte.dev/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["tutorial", "interactive", "sveltekit"],
      },
      {
        title: "SvelteKit Documentation",
        description:
          "Official docs for the SvelteKit application framework.",
        url: "https://svelte.dev/docs/kit",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["sveltekit", "framework", "official"],
      },
      {
        title: "Svelte — GitHub repository",
        description:
          "The source code and community discussions for Svelte.",
        url: "https://github.com/sveltejs/svelte",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source"],
      },
      {
        title: "Svelte Society",
        description:
          "Community events, talks, and resources for the Svelte ecosystem.",
        url: "https://sveltesociety.dev/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["community", "events", "recipes"],
      },
    ]),
    subcategory("nodejs", "Node.js", [
      {
        title: "Node.js — official learning hub",
        description:
          "Official Node.js guides covering the runtime, modules, and core concepts.",
        url: "https://nodejs.org/en/learn",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["node", "guides", "official"],
      },
      {
        title: "Node.js API Reference",
        description:
          "The complete official documentation for the Node.js standard library.",
        url: "https://nodejs.org/docs/latest/api/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["api", "reference", "modules"],
      },
      {
        title: "Node.js Best Practices",
        description:
          "A comprehensive, community-maintained guide to production-grade Node.js.",
        url: "https://github.com/goldbergyoni/nodebestpractices",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Cheat Sheet",
        tags: ["best practices", "production", "github"],
      },
      {
        title: "NodeSchool",
        description:
          "Open-source interactive workshops that teach Node.js fundamentals.",
        url: "https://nodeschool.io/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["workshops", "interactive", "exercises"],
      },
      {
        title: "Node.js — GitHub repository",
        description:
          "The source code and contribution guides for the Node.js runtime.",
        url: "https://github.com/nodejs/node",
        difficulty: "Advanced",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source", "runtime"],
      },
    ]),
    subcategory("express", "Express", [
      {
        title: "Express Documentation",
        description:
          "The official docs for the minimal Node.js web framework.",
        url: "https://expressjs.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["express", "docs", "web framework"],
      },
      {
        title: "Express — Getting Started",
        description:
          "The official starter guide: installation, hello world, and basic routing.",
        url: "https://expressjs.com/en/starter/installing.html",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["getting started", "routing", "beginner"],
      },
      {
        title: "Express — Guide",
        description:
          "In-depth guides on routing, middleware, error handling, and best practices.",
        url: "https://expressjs.com/en/guide/routing.html",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["guide", "middleware", "routing"],
      },
      {
        title: "Express — GitHub repository",
        description:
          "Source code, releases, and issue tracker for Express.",
        url: "https://github.com/expressjs/express",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source"],
      },
      {
        title: "Express middleware resources",
        description:
          "The official catalogue of middleware modules maintained by the Express team.",
        url: "https://expressjs.com/en/resources/middleware.html",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["middleware", "ecosystem", "list"],
      },
    ]),
    subcategory("tailwind", "Tailwind CSS", [
      {
        title: "Tailwind CSS Documentation",
        description:
          "The official docs for the utility-first CSS framework.",
        url: "https://tailwindcss.com/docs",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["tailwind", "docs", "utility css"],
      },
      {
        title: "Tailwind — Installation guide",
        description:
          "Official setup guides for every framework and build tool.",
        url: "https://tailwindcss.com/docs/installation",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["installation", "vite", "nextjs"],
      },
      {
        title: "Tailwind Play",
        description:
          "An official in-browser playground to prototype UI with Tailwind.",
        url: "https://play.tailwindcss.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["playground", "prototype", "tool"],
      },
      {
        title: "Tailwind UI",
        description:
          "Official paid component library — battle-tested UI built with Tailwind.",
        url: "https://tailwindui.com/",
        difficulty: "Intermediate",
        access: "Paid",
        badge: "Official",
        tags: ["components", "templates", "paid"],
      },
      {
        title: "Tailwind CSS Blog",
        description:
          "Official announcements, version notes, and framework insights.",
        url: "https://tailwindcss.com/blog",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["blog", "news", "official"],
      },
    ]),
  ],
);
