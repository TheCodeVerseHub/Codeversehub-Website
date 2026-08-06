import { category, subcategory } from "../helpers";

export const design = category(
  "design",
  "Design",
  "Figma, UI/UX principles, icons, and illustration resources for developers who design.",
  [
    subcategory("figma", "Figma", [
      {
        title: "Figma Help Center",
        description:
          "The official Figma documentation — from basics to advanced workflows.",
        url: "https://help.figma.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["figma", "docs", "official"],
      },
      {
        title: "Figma Resource Library",
        description:
          "Official guides, tips, and courses for designing in Figma.",
        url: "https://www.figma.com/resource-library/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["figma", "resources", "tutorials"],
      },
      {
        title: "Figma Community",
        description:
          "Browse and remix thousands of free templates, plugins, and design files.",
        url: "https://www.figma.com/community",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["templates", "plugins", "community"],
      },
      {
        title: "Figma Blog",
        description:
          "Official Figma insights, feature deep dives, and design tutorials.",
        url: "https://www.figma.com/blog/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["figma", "blog", "tutorials"],
      },
    ]),
    subcategory("uiux", "UI/UX", [
      {
        title: "Nielsen Norman Group",
        description:
          "The world's leading authority on user experience research and best practices.",
        url: "https://www.nngroup.com/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Community",
        tags: ["ux", "research", "articles"],
      },
      {
        title: "Laws of UX",
        description:
          "A beautifully illustrated guide to the psychological laws behind great UX.",
        url: "https://lawsofux.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["laws", "psychology", "ux"],
      },
      {
        title: "Refactoring UI",
        description:
          "The essential resource for making your interfaces look professional.",
        url: "https://www.refactoringui.com/",
        difficulty: "Intermediate",
        access: "Paid",
        badge: "Book",
        tags: ["book", "visual design", "developers"],
      },
      {
        title: "Material Design (Material 3)",
        description:
          "Google's open-source design system for building beautiful products.",
        url: "https://m3.material.io/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["material 3", "design system", "google"],
      },
      {
        title: "Smashing Magazine",
        description:
          "Long-running articles on design, UX, and front-end craft.",
        url: "https://www.smashingmagazine.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["articles", "design", "frontend"],
      },
    ]),
    subcategory("icons", "Icons", [
      {
        title: "Lucide",
        description:
          "A beautiful, open-source icon library — the icons you see on this very site.",
        url: "https://lucide.dev/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["icons", "open source", "svg"],
      },
      {
        title: "Heroicons",
        description:
          "Hand-crafted SVG icons from the makers of Tailwind CSS.",
        url: "https://heroicons.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["icons", "tailwind", "svg"],
      },
      {
        title: "Tabler Icons",
        description:
          "A huge library of free, MIT-licensed SVG icons.",
        url: "https://tabler.io/icons",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["icons", "svg", "mit"],
      },
      {
        title: "Iconify",
        description:
          "One API and component for 200,000+ icons from every major set.",
        url: "https://iconify.design/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["icons", "api", "components"],
      },
      {
        title: "Feather Icons",
        description:
          "Simply beautiful open-source icons designed on a 24px grid.",
        url: "https://feathericons.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["icons", "minimal", "open source"],
      },
    ]),
    subcategory("illustrations", "Illustrations", [
      {
        title: "unDraw",
        description:
          "Free, customizable open-source illustrations with a built-in color editor.",
        url: "https://undraw.co/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["illustrations", "free", "svg"],
      },
      {
        title: "ManyPixels Gallery",
        description:
          "Free illustrations and the paid 2,500+ icon-style gallery.",
        url: "https://www.manypixels.co/gallery",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Community",
        tags: ["illustrations", "gallery", "free"],
      },
      {
        title: "Storyset",
        description:
          "Customizable illustrations you can edit online — perfect for landing pages.",
        url: "https://storyset.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["illustrations", "customizable", "free"],
      },
      {
        title: "Freepik",
        description:
          "Millions of free and premium vectors, illustrations, and stock assets.",
        url: "https://www.freepik.com/",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Community",
        tags: ["vectors", "stock", "assets"],
      },
      {
        title: "Get Waves — SVG wave generator",
        description:
          "Generate beautiful SVG wave dividers for your designs in seconds.",
        url: "https://getwaves.io/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["waves", "svg", "tool"],
      },
      {
        title: "Open Peeps",
        description:
          "A hand-drawn library of mix-and-match people for your designs.",
        url: "https://www.openpeeps.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["people", "hand drawn", "free"],
      },
    ]),
  ],
);
