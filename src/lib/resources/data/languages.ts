import { category, subcategory } from "../helpers";

export const languages = category(
  "languages",
  "Programming Languages",
  "Official docs, timeless books, and interactive playgrounds for the languages that power modern software.",
  [
    subcategory("c", "C", [
      {
        title: "cppreference — C reference",
        description:
          "The authoritative reference for the C language and standard library, maintained by the community.",
        url: "https://en.cppreference.com/w/c",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["reference", "standard library", "c11", "c17"],
      },
      {
        title: "Beej's Guide to C Programming",
        description:
          "A free, friendly, and complete guide to modern C, beloved by self-taught programmers.",
        url: "https://beej.us/guide/bgc/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Book",
        tags: ["tutorial", "pointers", "memory", "beginner"],
      },
      {
        title: "C-FAQ",
        description:
          "The classic comp.lang.c Frequently Asked Questions, answering the subtle questions every C programmer runs into.",
        url: "https://c-faq.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["faq", "gotchas", "undefined behavior"],
      },
      {
        title: "The GNU C Programming Tutorial",
        description:
          "A thorough tutorial published by the Free Software Foundation, free to read online.",
        url: "https://www.gnu.org/software/gnu-c-manual/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["tutorial", "gnu", "manual"],
      },
      {
        title: "Learn-C.org (interactive)",
        description:
          "An interactive tutorial that teaches C in your browser, with exercises on every page.",
        url: "https://www.learn-c.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["exercises", "interactive", "beginner"],
      },
      {
        title: "The C Programming Language (K&R)",
        description:
          "The seminal book by Kernighan and Ritchie — still one of the best references for the language.",
        url: "https://en.wikipedia.org/wiki/The_C_Programming_Language",
        difficulty: "Beginner",
        access: "Paid",
        badge: "Book",
        tags: ["classic", "knr", "reference"],
      },
    ]),
    subcategory("cpp", "C++", [
      {
        title: "cppreference — C++ reference",
        description:
          "The go-to online reference for the C++ standard library and language features.",
        url: "https://en.cppreference.com/w/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["reference", "stl", "standard", "templates"],
      },
      {
        title: "LearnCpp.com",
        description:
          "A complete, free, step-by-step tutorial that takes you from zero to modern C++.",
        url: "https://www.learncpp.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["tutorial", "modern cpp", "beginner"],
      },
      {
        title: "C++ Core Guidelines",
        description:
          "The official curated set of best practices for writing safe, modern C++.",
        url: "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["guidelines", "best practices", "isocpp", "modern cpp"],
      },
      {
        title: "The C++ Programming Language (4th ed.)",
        description:
          "Bjarne Stroustrup's definitive book, written by the creator of C++.",
        url: "https://www.stroustrup.com/4th.html",
        difficulty: "Intermediate",
        access: "Paid",
        badge: "Book",
        tags: ["stroustrup", "book", "reference"],
      },
      {
        title: "Compiler Explorer (Godbolt)",
        description:
          "Inspect the assembly your C++ compiles to in real time — essential for performance work.",
        url: "https://godbolt.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Interactive",
        tags: ["tool", "assembly", "performance", "compiler"],
      },
      {
        title: "The Cherno — C++ Playlist",
        description:
          "A hugely popular video series covering C++ from fundamentals to internals.",
        url: "https://www.youtube.com/@TheCherno",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["youtube", "video", "beginner", "internals"],
      },
    ]),
    subcategory("python", "Python", [
      {
        title: "Python Official Documentation",
        description:
          "The official Python documentation — tutorial, language reference, and library reference.",
        url: "https://docs.python.org/3/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["docs", "reference", "stdlib"],
      },
      {
        title: "Python Tutorial (official)",
        description:
          "The official beginner tutorial that ships with the Python documentation.",
        url: "https://docs.python.org/3/tutorial/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["tutorial", "beginner", "official"],
      },
      {
        title: "Automate the Boring Stuff with Python",
        description:
          "A free, practical book that teaches Python by automating real-world tasks.",
        url: "https://automatetheboringstuff.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Book",
        tags: ["book", "automation", "beginner", "projects"],
      },
      {
        title: "Real Python",
        description:
          "High-quality tutorials, quizzes, and deep dives covering Python at every level.",
        url: "https://realpython.com/",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Community",
        tags: ["tutorials", "articles", "best practices"],
      },
      {
        title: "The Hitchhiker's Guide to Python",
        description:
          "A community-maintained best-practices handbook for Python development.",
        url: "https://docs.python-guide.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["best practices", "handbook", "ecosystem"],
      },
      {
        title: "Fluent Python (2nd ed.)",
        description:
          "Deep dives into Python's internals, data model, and idioms — a must-read for professionals.",
        url: "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/",
        difficulty: "Advanced",
        access: "Paid",
        badge: "Book",
        tags: ["book", "internals", "idioms", "advanced"],
      },
      {
        title: "CS50P — Introduction to Programming with Python",
        description:
          "Harvard's free, self-paced introductory Python course.",
        url: "https://cs50.harvard.edu/python/2022/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["course", "harvard", "video", "beginner"],
      },
      {
        title: "Python Tutor — visualize execution",
        description:
          "Step through Python code line by line to see exactly how it executes.",
        url: "https://pythontutor.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["visualizer", "debugging", "learning"],
      },
    ]),
    subcategory("java", "Java", [
      {
        title: "The Java™ Tutorials (Oracle)",
        description:
          "Official tutorials from Oracle covering core Java, collections, concurrency, and more.",
        url: "https://docs.oracle.com/javase/tutorial/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["oracle", "tutorial", "reference"],
      },
      {
        title: "Dev.java",
        description:
          "The modern home for Java developer resources — guides, news, and learning paths from Oracle.",
        url: "https://dev.java/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["official", "guides", "learning"],
      },
      {
        title: "OpenJDK",
        description:
          "The official open-source implementation of the Java platform, with project and release info.",
        url: "https://openjdk.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["openjdk", "jdk", "source"],
      },
      {
        title: "Baeldung",
        description:
          "In-depth tutorials on Java and Spring, from beginner basics to advanced topics.",
        url: "https://www.baeldung.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["tutorials", "spring", "spring boot"],
      },
      {
        title: "Effective Java (3rd ed.)",
        description:
          "Joshua Bloch's timeless collection of best practices for writing robust Java.",
        url: "https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/",
        difficulty: "Advanced",
        access: "Paid",
        badge: "Book",
        tags: ["book", "best practices", "joshu bloch"],
      },
      {
        title: "Spring Boot Reference Documentation",
        description:
          "The official guide to building production-grade services with Spring Boot.",
        url: "https://docs.spring.io/spring-boot/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["spring boot", "backend", "docs"],
      },
    ]),
    subcategory("javascript", "JavaScript", [
      {
        title: "MDN JavaScript",
        description:
          "Mozilla's definitive JavaScript reference and guides — the standard starting point.",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["mdn", "reference", "docs"],
      },
      {
        title: "JavaScript.info",
        description:
          "A modern, thorough JavaScript tutorial that goes from basics to advanced topics.",
        url: "https://javascript.info/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["tutorial", "modern", "free"],
      },
      {
        title: "Eloquent JavaScript (3rd ed.)",
        description:
          "A modern introduction to programming through JavaScript, free to read online.",
        url: "https://eloquentjavascript.net/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Book",
        tags: ["book", "beginner", "free"],
      },
      {
        title: "You Don't Know JS (book series)",
        description:
          "Kyle Simpson's deep-dive series into the trickiest parts of JavaScript.",
        url: "https://github.com/getify/You-Dont-Know-JS",
        difficulty: "Advanced",
        access: "Free",
        badge: "Book",
        tags: ["book", "deep dive", "scope", "closures"],
      },
      {
        title: "freeCodeCamp JavaScript",
        description:
          "A free, interactive curriculum for JavaScript and algorithms and data structures.",
        url: "https://www.freecodecamp.org/learn/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["freecodecamp", "curriculum", "certification"],
      },
      {
        title: "JavaScript 30",
        description:
          "Thirty free, practical projects that build vanilla JavaScript muscle memory.",
        url: "https://javascript30.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["projects", "vanilla js", "challenge"],
      },
      {
        title: "MDN — JavaScript Guide",
        description:
          "Mozilla's in-depth guide to the JavaScript language, chapter by chapter.",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["mdn", "guide", "language"],
      },
    ]),
    subcategory("typescript", "TypeScript", [
      {
        title: "TypeScript Handbook",
        description:
          "The official handbook — the best starting point for learning TypeScript.",
        url: "https://www.typescriptlang.org/docs/handbook/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["handbook", "official", "types"],
      },
      {
        title: "TypeScript Playground",
        description:
          "Try TypeScript in your browser and watch how types and emits behave live.",
        url: "https://www.typescriptlang.org/play/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["playground", "tool", "experiment"],
      },
      {
        title: "Type Challenges",
        description:
          "Community-run challenges that train advanced TypeScript type gymnastics.",
        url: "https://github.com/type-challenges/type-challenges",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["challenges", "advanced types", "type level"],
      },
      {
        title: "Total TypeScript",
        description:
          "Matt Pocock's courses and tutorials taking you from beginner to TypeScript wizard.",
        url: "https://www.totaltypescript.com/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Video Course",
        tags: ["courses", "matt pocock", "advanced"],
      },
      {
        title: "TypeScript Deep Dive",
        description:
          "A free community book covering TypeScript's type system in depth.",
        url: "https://basarat.gitbook.io/typescript",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Book",
        tags: ["book", "free", "type system"],
      },
      {
        title: "Effective TypeScript",
        description:
          "Dan Vanderkam's 83 specific ways to improve your TypeScript, with real-world examples.",
        url: "https://effectivetypescript.com/",
        difficulty: "Advanced",
        access: "Paid",
        badge: "Book",
        tags: ["book", "best practices"],
      },
    ]),
    subcategory("rust", "Rust", [
      {
        title: "The Rust Programming Language (The Book)",
        description:
          "The official Rust book — the definitive starting point for learning Rust.",
        url: "https://doc.rust-lang.org/book/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["book", "official", "beginner"],
      },
      {
        title: "Rust By Example",
        description:
          "Learn Rust through annotated examples you can run right in the browser.",
        url: "https://doc.rust-lang.org/rust-by-example/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["examples", "interactive", "official"],
      },
      {
        title: "Rustlings",
        description:
          "Small, curated exercises that get you reading and writing Rust quickly.",
        url: "https://github.com/rust-lang/rustlings",
        difficulty: "Beginner",
        access: "Free",
        badge: "Practice",
        tags: ["exercises", "cli", "beginner"],
      },
      {
        title: "The Rustonomicon",
        description:
          "The dark arts of unsafe Rust — advanced memory and concurrency patterns.",
        url: "https://doc.rust-lang.org/nomicon/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["unsafe", "advanced", "memory"],
      },
      {
        title: "Asynchronous Programming in Rust",
        description:
          "The official async/await guide covering Futures, Tokio, and async patterns.",
        url: "https://rust-lang.github.io/async-book/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["async", "tokio", "official"],
      },
      {
        title: "Comprehensive Rust (Google)",
        description:
          "Google's free multi-day Rust course covering everything from bare metal to async.",
        url: "https://google.github.io/comprehensive-rust/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Video Course",
        tags: ["google", "course", "android"],
      },
      {
        title: "Awesome Rust",
        description:
          "A curated list of Rust libraries, tools, and learning resources.",
        url: "https://github.com/rust-unofficial/awesome-rust",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["awesome list", "libraries", "tools"],
      },
    ]),
    subcategory("go", "Go", [
      {
        title: "A Tour of Go",
        description:
          "The official interactive introduction to Go, straight in your browser.",
        url: "https://go.dev/tour/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["tour", "interactive", "official"],
      },
      {
        title: "Go Documentation",
        description:
          "Official docs, tutorials, and references for the Go language.",
        url: "https://go.dev/doc/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["docs", "official", "guides"],
      },
      {
        title: "Effective Go",
        description:
          "The official guidelines for writing clear, idiomatic Go.",
        url: "https://go.dev/doc/effective_go",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["idiomatic", "best practices", "official"],
      },
      {
        title: "Go by Example",
        description:
          "Hands-on Go introduction using annotated, runnable example programs.",
        url: "https://gobyexample.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["examples", "beginner"],
      },
      {
        title: "The Go Programming Language (gopl.io)",
        description:
          "The canonical book by Donovan and Kernighan, with the source available online.",
        url: "https://www.gopl.io/",
        difficulty: "Intermediate",
        access: "Paid",
        badge: "Book",
        tags: ["book", "canonical", "kernighan"],
      },
      {
        title: "pkg.go.dev",
        description:
          "The official package index and documentation browser for the Go ecosystem.",
        url: "https://pkg.go.dev/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["packages", "module index", "docs"],
      },
    ]),
    subcategory("kotlin", "Kotlin", [
      {
        title: "Kotlin Documentation",
        description:
          "The official Kotlin docs — language reference, guides, and multiplatform resources.",
        url: "https://kotlinlang.org/docs/home.html",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["docs", "official", "reference"],
      },
      {
        title: "Kotlin Playground",
        description:
          "Run and share Kotlin code in your browser, no setup required.",
        url: "https://play.kotlinlang.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["playground", "interactive"],
      },
      {
        title: "Kotlin Coroutines Guide",
        description:
          "The official guide to structured concurrency with coroutines.",
        url: "https://kotlinlang.org/docs/coroutines-guide.html",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["coroutines", "concurrency", "official"],
      },
      {
        title: "Kotlin by Example",
        description:
          "Learn Kotlin syntax and idioms through commented example programs.",
        url: "https://github.com/Kotlin/kotlin-by-example",
        difficulty: "Beginner",
        access: "Free",
        badge: "Practice",
        tags: ["examples", "github", "beginner"],
      },
      {
        title: "Android Kotlin Fundamentals (codelabs)",
        description:
          "Official Google codelabs that teach Android development in Kotlin.",
        url: "https://developer.android.com/courses/android-basics-kotlin/course",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Video Course",
        tags: ["android", "codelabs", "google"],
      },
    ]),
    subcategory("swift", "Swift", [
      {
        title: "The Swift Programming Language Book",
        description:
          "Apple's official guide to the Swift language, free to read online.",
        url: "https://docs.swift.org/swift-book/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["apple", "book", "official"],
      },
      {
        title: "Swift.org Documentation",
        description:
          "Official Swift documentation including API design guidelines and getting started guides.",
        url: "https://www.swift.org/documentation/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["official", "docs", "api design"],
      },
      {
        title: "Apple Developer — Swift",
        description:
          "Apple's developer portal for Swift, Xcode, and SwiftUI resources.",
        url: "https://developer.apple.com/swift/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["apple", "xcode", "developer"],
      },
      {
        title: "Hacking with Swift",
        description:
          "A beloved free library of Swift tutorials, challenges, and projects.",
        url: "https://www.hackingwithswift.com/",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Community",
        tags: ["tutorials", "challenges", "projects"],
      },
      {
        title: "Swift Playgrounds",
        description:
          "Apple's interactive app for learning Swift and SwiftUI on iPad and Mac.",
        url: "https://www.apple.com/swift/playgrounds/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["apple", "interactive", "ipad"],
      },
    ]),
    subcategory("csharp", "C#", [
      {
        title: "C# documentation (Microsoft Learn)",
        description:
          "The official C# documentation — language reference, guides, and tutorials.",
        url: "https://learn.microsoft.com/dotnet/csharp/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["microsoft", "docs", "reference"],
      },
      {
        title: "Tour of C#",
        description:
          "Microsoft's guided tour of the C# language, ideal as a first stop.",
        url: "https://learn.microsoft.com/dotnet/csharp/tour-of-csharp/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["microsoft", "tour", "beginner"],
      },
      {
        title: ".NET — official site",
        description:
          "The official .NET home: downloads, learning paths, and platform overview.",
        url: "https://dotnet.microsoft.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: [".net", "microsoft", "runtime"],
      },
      {
        title: "C# Fundamentals for Absolute Beginners",
        description:
          "Microsoft Learn path covering C# from zero, with hands-on exercises.",
        url: "https://learn.microsoft.com/training/paths/csharp-first-steps/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["microsoft learn", "path", "beginner"],
      },
      {
        title: "Exercism — C# track",
        description:
          "Free mentored coding exercises to build real C# fluency.",
        url: "https://exercism.org/tracks/csharp",
        difficulty: "Beginner",
        access: "Free",
        badge: "Practice",
        tags: ["exercism", "exercises", "mentorship"],
      },
    ]),
    subcategory("php", "PHP", [
      {
        title: "PHP Manual",
        description:
          "The official PHP documentation — the complete language and function reference.",
        url: "https://www.php.net/manual/en/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["manual", "reference", "official"],
      },
      {
        title: "PHP: The Right Way",
        description:
          "A community-maintained best-practices guide for modern PHP development.",
        url: "https://phptherightway.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["best practices", "community", "modern"],
      },
      {
        title: "Laravel Documentation",
        description:
          "Official docs for Laravel, the most popular PHP framework.",
        url: "https://laravel.com/docs",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["laravel", "framework", "docs"],
      },
      {
        title: "PHP-FIG Standards (PSR)",
        description:
          "The PHP Framework Interop Group standards that define interoperable PHP code.",
        url: "https://www.php-fig.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["psr", "standards", "interop"],
      },
      {
        title: "Awesome PHP",
        description:
          "A curated list of quality PHP libraries, resources, and tools.",
        url: "https://github.com/ziadoz/awesome-php",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["awesome list", "libraries", "tools"],
      },
      {
        title: "Laracasts",
        description:
          "High-quality screencasts for PHP and Laravel at every level.",
        url: "https://laracasts.com/",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Video Course",
        tags: ["screencasts", "laravel", "video"],
      },
    ]),
  ],
);
