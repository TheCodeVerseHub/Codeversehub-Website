import { category, subcategory } from "../helpers";

export const productivity = category(
  "productivity",
  "Productivity",
  "Focus, note-taking, and workflow systems used by serious developers.",
  [
    subcategory("focus", "Focus & Methods", [
      {
        title: "Getting Things Done",
        description:
          "David Allen's classic methodology for capturing and organizing everything.",
        url: "https://gettingthingsdone.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Book",
        tags: ["gtd", "methodology", "organization"],
      },
      {
        title: "Todoist — Pomodoro Technique",
        description:
          "A clear explainer of the Pomodoro focus technique and how to use it.",
        url: "https://todoist.com/productivity-methods/pomodoro-technique",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["pomodoro", "focus", "explainer"],
      },
      {
        title: "Cal Newport — Deep Work",
        description:
          "The book and essays behind focused, distraction-free knowledge work.",
        url: "https://calnewport.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["deep work", "focus", "cal newport"],
      },
      {
        title: "RescueTime",
        description:
          "Automatic time tracking that shows you where your hours actually go.",
        url: "https://www.rescuetime.com/",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Interactive",
        tags: ["time tracking", "tool", "analytics"],
      },
    ]),
    subcategory("notes", "Notes & Knowledge", [
      {
        title: "Obsidian",
        description:
          "A powerful local-first note-taking app built on plain Markdown files.",
        url: "https://obsidian.md/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["notes", "markdown", "tool"],
      },
      {
        title: "Zettelkasten — overview",
        description:
          "The definitive introduction to the Zettelkasten note-taking method.",
        url: "https://zettelkasten.de/posts/overview/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["zettelkasten", "method", "notes"],
      },
      {
        title: "Notion",
        description:
          "An all-in-one workspace for notes, docs, and project management.",
        url: "https://www.notion.so/",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Interactive",
        tags: ["workspace", "docs", "tool"],
      },
      {
        title: "Second Brain (Basbosa methodology)",
        description:
          "Tiago Forte's framework for building a personal knowledge system.",
        url: "https://fortelabs.com/blog/basboverview/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["second brain", "knowledge", "method"],
      },
    ]),
  ],
);
