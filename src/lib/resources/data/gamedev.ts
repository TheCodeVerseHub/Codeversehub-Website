import { category, subcategory } from "../helpers";

export const gameDev = category(
  "gamedev",
  "Game Development",
  "Unity, Unreal, and Godot — official docs and trusted learning paths for building games.",
  [
    subcategory("unity", "Unity", [
      {
        title: "Unity Learn",
        description:
          "Official courses, tutorials, and pathways from the Unity team.",
        url: "https://learn.unity.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["unity", "courses", "official"],
      },
      {
        title: "Unity Manual",
        description:
          "The official Unity manual covering every engine system.",
        url: "https://docs.unity3d.com/Manual/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["unity", "manual", "docs"],
      },
      {
        title: "Unity Scripting API",
        description:
          "The complete official reference for Unity's C# scripting API.",
        url: "https://docs.unity3d.com/ScriptReference/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["unity", "csharp", "api"],
      },
      {
        title: "Catlike Coding — Unity Tutorials",
        description:
          "The gold standard for deep, well-explained Unity and shader tutorials.",
        url: "https://catlikecoding.com/unity/tutorials/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["catlike coding", "tutorials", "shaders"],
      },
      {
        title: "Brackeys (YouTube)",
        description:
          "The most beloved beginner-friendly Unity tutorial channel.",
        url: "https://www.youtube.com/@Brackeys",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["youtube", "beginner", "tutorials"],
      },
    ]),
    subcategory("unreal", "Unreal Engine", [
      {
        title: "Unreal Engine Documentation",
        description:
          "The official Unreal Engine documentation and reference.",
        url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["unreal", "docs", "epic games"],
      },
      {
        title: "Unreal Engine — Learn",
        description:
          "Official learning portal with courses, samples, and roadmaps.",
        url: "https://www.unrealengine.com/en-US/learn",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["unreal", "learn", "courses"],
      },
      {
        title: "Unreal Engine (YouTube)",
        description:
          "Official channel with live streams, tutorials, and release highlights.",
        url: "https://www.youtube.com/@UnrealEngine",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["unreal", "youtube", "official"],
      },
      {
        title: "BenUI — Unreal Articles",
        description:
          "Sharp, in-depth community articles on Unreal Engine internals.",
        url: "https://benui.ca/unreal/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Community",
        tags: ["unreal", "articles", "advanced"],
      },
    ]),
    subcategory("godot", "Godot", [
      {
        title: "Godot Documentation",
        description:
          "The official docs for the free, open-source Godot engine.",
        url: "https://docs.godotengine.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["godot", "docs", "official"],
      },
      {
        title: "Godot Engine — official site",
        description:
          "Downloads, news, and showcase for the open-source game engine.",
        url: "https://godotengine.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["godot", "download", "open source"],
      },
      {
        title: "GDQuest",
        description:
          "High-quality Godot courses, tutorials, and open-source projects.",
        url: "https://www.gdquest.com/",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Video Course",
        tags: ["gdquest", "tutorials", "courses"],
      },
      {
        title: "Godot Recipes (KidsCanCode)",
        description:
          "Community-written recipes for solving common Godot problems.",
        url: "https://kidscancode.org/godot_recipes/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["godot", "recipes", "community"],
      },
    ]),
  ],
);
