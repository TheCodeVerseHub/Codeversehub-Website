import { category, subcategory } from "../helpers";

export const mobile = category(
  "mobile",
  "Mobile Development",
  "Build apps for iOS, Android, and beyond with Flutter, React Native, and native tooling.",
  [
    subcategory("flutter", "Flutter", [
      {
        title: "Flutter Documentation",
        description:
          "The official Flutter docs — widgets, layout, state management, and platform guides.",
        url: "https://docs.flutter.dev/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["flutter", "docs", "official"],
      },
      {
        title: "Flutter — Get Started",
        description:
          "Official setup guide to install Flutter and run your first app.",
        url: "https://docs.flutter.dev/get-started",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["install", "first app", "beginner"],
      },
      {
        title: "Flutter Cookbook",
        description:
          "Practical, copy-pasteable recipes for common Flutter tasks.",
        url: "https://docs.flutter.dev/cookbook",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["cookbook", "recipes", "widgets"],
      },
      {
        title: "Dart Documentation",
        description:
          "The official docs for the Dart language that powers Flutter.",
        url: "https://dart.dev/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["dart", "language", "official"],
      },
      {
        title: "Flutter — GitHub repository",
        description:
          "The open-source Flutter framework source and issue tracker.",
        url: "https://github.com/flutter/flutter",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source"],
      },
      {
        title: "Google Flutter Codelabs",
        description:
          "Hands-on official codelabs that teach Flutter through building apps.",
        url: "https://codelabs.developers.google.com/?cat=Flutter",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["codelabs", "google", "hands on"],
      },
    ]),
    subcategory("reactnative", "React Native", [
      {
        title: "React Native Documentation",
        description:
          "The official docs for building native mobile apps with React.",
        url: "https://reactnative.dev/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["react native", "docs", "official"],
      },
      {
        title: "React Native — Getting Started",
        description:
          "Official setup guide for the React Native CLI and workflows.",
        url: "https://reactnative.dev/docs/getting-started",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["setup", "cli", "beginner"],
      },
      {
        title: "React Native — Components & APIs",
        description:
          "Reference for the core components and APIs shipped with React Native.",
        url: "https://reactnative.dev/docs/components-and-apis",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["components", "api", "reference"],
      },
      {
        title: "Expo Documentation",
        description:
          "The official docs for Expo, the framework and platform for React Native.",
        url: "https://docs.expo.dev/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["expo", "framework", "docs"],
      },
      {
        title: "React Native — GitHub repository",
        description:
          "The open-source React Native framework source and discussions.",
        url: "https://github.com/facebook/react-native",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source", "facebook"],
      },
    ]),
    subcategory("android", "Android", [
      {
        title: "Android Developers",
        description:
          "The official home for Android development — docs, courses, and tools.",
        url: "https://developer.android.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["android", "google", "official"],
      },
      {
        title: "Android — Development guides",
        description:
          "Official guides on architecture, UI, data, and platform behavior.",
        url: "https://developer.android.com/develop",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["guides", "architecture", "google"],
      },
      {
        title: "Android Training",
        description:
          "Official learning paths covering core Android concepts and best practices.",
        url: "https://developer.android.com/training",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["training", "learning path", "google"],
      },
      {
        title: "Android Codelabs",
        description:
          "Hands-on official codelabs for Android, Compose, and Kotlin.",
        url: "https://developer.android.com/codelabs",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["codelabs", "hands on", "google"],
      },
      {
        title: "Android Jetpack",
        description:
          "Official documentation for the Jetpack library suite — Compose, Room, and more.",
        url: "https://developer.android.com/jetpack",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["jetpack", "compose", "libraries"],
      },
    ]),
    subcategory("ios", "iOS", [
      {
        title: "Apple Developer — Develop",
        description:
          "Apple's official developer portal for iOS, macOS, and visionOS.",
        url: "https://developer.apple.com/develop/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["apple", "developer", "official"],
      },
      {
        title: "Apple Developer Documentation",
        description:
          "The complete official reference for Apple's frameworks and APIs.",
        url: "https://developer.apple.com/documentation/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["documentation", "frameworks", "apple"],
      },
      {
        title: "SwiftUI Tutorials",
        description:
          "Apple's official guided tutorials for building SwiftUI apps.",
        url: "https://developer.apple.com/tutorials/swiftui",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["swiftui", "tutorials", "apple"],
      },
      {
        title: "Human Interface Guidelines",
        description:
          "Apple's official design guidance for iOS and platform experiences.",
        url: "https://developer.apple.com/design/human-interface-guidelines/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["design", "hug", "apple"],
      },
      {
        title: "Apple Developer Videos",
        description:
          "Official WWDC sessions and technical videos from Apple engineers.",
        url: "https://developer.apple.com/videos/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Video Course",
        tags: ["wwdc", "videos", "apple"],
      },
    ]),
  ],
);
