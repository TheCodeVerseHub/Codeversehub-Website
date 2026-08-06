import { category, subcategory } from "../helpers";

export const career = category(
  "career",
  "Career & System Design",
  "Competitive programming, system design, open source, and the skills that land jobs.",
  [
    subcategory("competitive-programming", "Competitive Programming", [
      {
        title: "Codeforces",
        description:
          "The most popular competitive programming platform — contests and problem sets.",
        url: "https://codeforces.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["contests", "rating", "problems"],
      },
      {
        title: "AtCoder",
        description:
          "A top-tier Japanese contest platform with well-crafted problems.",
        url: "https://atcoder.jp/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["contests", "abc", "arc"],
      },
      {
        title: "Competitive Programming Algorithms (cp-algorithms)",
        description:
          "The definitive reference for competitive programming algorithms and data structures.",
        url: "https://cp-algorithms.com/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["algorithms", "reference", "advanced"],
      },
      {
        title: "USACO Guide",
        description:
          "A structured curriculum that prepares you for competitive programming contests.",
        url: "https://usaco.guide/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["usaco", "curriculum", "structured"],
      },
      {
        title: "CSES Problem Set",
        description:
          "A classic problem set covering the full range of competitive programming topics.",
        url: "https://cses.fi/problemset/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["problems", "practice", "finland"],
      },
      {
        title: "KACTL — KTH Competitive Programming Library",
        description:
          "The battle-tested reference implementation library from KTH Royal Institute of Technology.",
        url: "https://github.com/kth-competitive-programming/kactl",
        difficulty: "Advanced",
        access: "Free",
        badge: "Cheat Sheet",
        tags: ["kactl", "reference", "github"],
      },
      {
        title: "CodeChef",
        description:
          "A major contest platform with monthly challenges and learning tracks.",
        url: "https://www.codechef.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Practice",
        tags: ["contests", "learning", "beginner"],
      },
    ]),
    subcategory("open-source", "Open Source", [
      {
        title: "Open Source Guides",
        description:
          "GitHub's official guides on starting and contributing to open source.",
        url: "https://opensource.guide/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["guides", "contribution", "github"],
      },
      {
        title: "First Contributions",
        description:
          "A hands-on tutorial that walks you through your very first pull request.",
        url: "https://github.com/firstcontributions/first-contributions",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["first pr", "tutorial", "github"],
      },
      {
        title: "Good First Issue",
        description:
          "Find beginner-friendly issues across thousands of open-source projects.",
        url: "https://goodfirstissue.dev/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["issues", "beginner friendly", "discovery"],
      },
      {
        title: "Up For Grabs",
        description:
          "A directory of projects with tasks specifically for new contributors.",
        url: "https://up-for-grabs.net/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["projects", "starter tasks", "discovery"],
      },
      {
        title: "Open Source Initiative",
        description:
          "The steward of the Open Source Definition and the licenses behind it.",
        url: "https://opensource.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["osi", "definition", "community"],
      },
      {
        title: "Choose a License",
        description:
          "A friendly guide to picking the right license for your project.",
        url: "https://choosealicense.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["licenses", "guide", "tool"],
      },
      {
        title: "The Awesome List",
        description:
          "The original curated list of curated lists — every topic imaginable.",
        url: "https://github.com/sindresorhus/awesome",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["awesome", "curated", "lists"],
      },
    ]),
    subcategory("git-github", "Git & GitHub", [
      {
        title: "Git — official documentation",
        description:
          "The official Git docs — reference, guides, and everything in between.",
        url: "https://git-scm.com/doc",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["git", "docs", "official"],
      },
      {
        title: "Pro Git (book)",
        description:
          "The official, free book on Git — the definitive reference.",
        url: "https://git-scm.com/book/en/v2",
        difficulty: "Beginner",
        access: "Free",
        badge: "Book",
        tags: ["book", "free", "official"],
      },
      {
        title: "GitHub Skills",
        description:
          "Interactive, official courses that teach GitHub workflows hands-on.",
        url: "https://skills.github.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["github", "courses", "interactive"],
      },
      {
        title: "Learn Git Branching",
        description:
          "A visual, interactive game for mastering Git branches and merges.",
        url: "https://learngitbranching.js.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["interactive", "branches", "game"],
      },
      {
        title: "Oh My Git!",
        description:
          "An open-source card game that teaches Git mechanics playfully.",
        url: "https://ohmygit.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["game", "card game", "learning"],
      },
      {
        title: "Atlassian — Git Tutorials",
        description:
          "Clear, well-illustrated Git tutorials from Atlassian.",
        url: "https://www.atlassian.com/git/tutorials",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["tutorials", "visual", "atlassian"],
      },
      {
        title: "gitignore.io",
        description:
          "Generate .gitignore files for your stack in seconds.",
        url: "https://www.toptal.com/developers/gitignore",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["gitignore", "tool", "generator"],
      },
    ]),
    subcategory("system-design", "System Design", [
      {
        title: "System Design Primer",
        description:
          "The legendary open-source primer with annotated diagrams and interview prep.",
        url: "https://github.com/donnemartin/system-design-primer",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Book",
        tags: ["github", "primer", "interviews"],
      },
      {
        title: "System Design — Karan Pratap Singh",
        description:
          "A beautifully structured, open-source course on system design.",
        url: "https://github.com/karanpratapsingh/system-design",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Book",
        tags: ["github", "course", "architecture"],
      },
      {
        title: "ByteByteGo",
        description:
          "High-quality system design courses and the famous illustrated newsletter.",
        url: "https://bytebytego.com/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Video Course",
        tags: ["bytebytego", "courses", "newsletter"],
      },
      {
        title: "High Scalability",
        description:
          "Post-mortems and architectural breakdowns of the world's biggest sites.",
        url: "https://highscalability.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["case studies", "architecture", "articles"],
      },
      {
        title: "System Design Roadmap (roadmap.sh)",
        description:
          "A structured, visual roadmap for learning system design.",
        url: "https://roadmap.sh/system-design",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["roadmap", "visual", "learning path"],
      },
      {
        title: "The Site Reliability Workbook (Google SRE)",
        description:
          "Google's free SRE books — operational and design wisdom from scale.",
        url: "https://sre.google/books/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Book",
        tags: ["sre", "google", "free book"],
      },
      {
        title: "Designing Data-Intensive Applications",
        description:
          "Martin Kleppmann's essential book on how data systems really work.",
        url: "https://dataintensive.net/",
        difficulty: "Advanced",
        access: "Paid",
        badge: "Book",
        tags: ["ddia", "data systems", "essential"],
      },
    ]),
    subcategory("low-level-design", "Low Level Design", [
      {
        title: "Refactoring Guru — Design Patterns",
        description:
          "The clearest, best-illustrated explanations of design patterns online.",
        url: "https://refactoring.guru/design-patterns",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["patterns", "examples", "free"],
      },
      {
        title: "Design Patterns for Humans",
        description:
          "An ultra-simple, human-friendly explanation of classic design patterns.",
        url: "https://github.com/kamranahmedse/design-patterns-for-humans",
        difficulty: "Beginner",
        access: "Free",
        badge: "Book",
        tags: ["github", "simple", "patterns"],
      },
      {
        title: "Java Design Patterns (iluwatar)",
        description:
          "A massive, community-maintained catalogue of patterns with real code.",
        url: "https://github.com/iluwatar/java-design-patterns",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["github", "java", "catalogue"],
      },
      {
        title: "SOLID Principles (Wikipedia)",
        description:
          "A solid reference for the five principles of object-oriented design.",
        url: "https://en.wikipedia.org/wiki/SOLID",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["solid", "oop", "principles"],
      },
      {
        title: "SourceMaking — Design Patterns",
        description:
          "Classic pattern and refactoring catalogues with motivation and examples.",
        url: "https://sourcemaking.com/design_patterns",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["patterns", "refactoring", "catalogue"],
      },
      {
        title: "Game Programming Patterns",
        description:
          "Robert Nystrom's free, beautifully written book on software patterns.",
        url: "https://gameprogrammingpatterns.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Book",
        tags: ["robert nystrom", "book", "free"],
      },
    ]),
    subcategory("high-level-design", "High Level Design", [
      {
        title: "System Design 101 (ByteByteGo)",
        description:
          "ByteByteGo's open-source, visual introduction to high-level system design.",
        url: "https://github.com/ByteByteGoHq/system-design-101",
        difficulty: "Beginner",
        access: "Free",
        badge: "Book",
        tags: ["github", "visual", "bytebytego"],
      },
      {
        title: "Grokking the System Design Interview",
        description:
          "The classic paid course for mastering high-level design interviews.",
        url: "https://www.educative.io/courses/grokking-the-system-design-interview",
        difficulty: "Advanced",
        access: "Paid",
        badge: "Video Course",
        tags: ["educative", "interviews", "course"],
      },
      {
        title: "ByteByteGo — YouTube",
        description:
          "Short, illustrated videos explaining large-scale system design.",
        url: "https://www.youtube.com/@ByteByteGo",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Video Course",
        tags: ["youtube", "videos", "illustrated"],
      },
      {
        title: "Awesome System Design",
        description:
          "A curated list of system design resources, articles, and mock interviews.",
        url: "https://github.com/madd86/awesome-system-design",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["awesome list", "resources", "interviews"],
      },
      {
        title: "Systems Design for Interviews (freeCodeCamp)",
        description:
          "A free, comprehensive written guide to high-level design fundamentals.",
        url: "https://www.freecodecamp.org/news/systems-design-for-interviews/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["freecodecamp", "article", "fundamentals"],
      },
    ]),
    subcategory("interview-prep", "Interview Preparation", [
      {
        title: "Tech Interview Handbook",
        description:
          "The best free resource for acing coding interviews — strategies, study plans, and questions.",
        url: "https://www.techinterviewhandbook.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Book",
        tags: ["handbook", "study plan", "free"],
      },
      {
        title: "NeetCode",
        description:
          "Curated coding problem roadmaps and courses for interview prep.",
        url: "https://neetcode.io/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Practice",
        tags: ["neetcode", "problems", "roadmap"],
      },
      {
        title: "Cracking the Coding Interview",
        description:
          "The classic book that organizes everything you need to prepare.",
        url: "https://www.crackingthecodinginterview.com/",
        difficulty: "Intermediate",
        access: "Paid",
        badge: "Book",
        tags: ["ctci", "book", "classic"],
      },
      {
        title: "Pramp",
        description:
          "Free, peer-to-peer mock interviews that simulate the real thing.",
        url: "https://www.pramp.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["mock interviews", "peers", "practice"],
      },
      {
        title: "interviewing.io",
        description:
          "Anonymous mock interviews with engineers from top companies.",
        url: "https://interviewing.io/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Practice",
        tags: ["mock interviews", "anonymous", "top companies"],
      },
      {
        title: "Interviews (kdn251)",
        description:
          "The classic community collection of interview questions and solutions.",
        url: "https://github.com/kdn251/interviews",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Cheat Sheet",
        tags: ["github", "questions", "cheatsheet"],
      },
    ]),
    subcategory("resume", "Resume Building", [
      {
        title: "r/EngineeringResumes wiki",
        description:
          "The community-vetted guide to writing resumes that pass screening.",
        url: "https://www.reddit.com/r/EngineeringResumes/wiki/index",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["reddit", "guide", "templates"],
      },
      {
        title: "Zety Resume Builder",
        description:
          "A polished resume builder with templates and writing tips.",
        url: "https://zety.com/resume-builder",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Interactive",
        tags: ["builder", "templates", "tool"],
      },
      {
        title: "FlowCV",
        description:
          "A free, modern resume builder with clean, ATS-friendly templates.",
        url: "https://www.flowcv.com/",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Interactive",
        tags: ["builder", "free", "tool"],
      },
      {
        title: "Overleaf — CV templates",
        description:
          "LaTeX CV templates, including classic engineering resume formats.",
        url: "https://www.overleaf.com/latex/templates/tagged/cv",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["latex", "templates", "overleaf"],
      },
      {
        title: "Resume Worded",
        description:
          "Get instant, AI-powered feedback on how your resume scores.",
        url: "https://www.resumeworded.com/",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Interactive",
        tags: ["feedback", "scoring", "tool"],
      },
      {
        title: "Jobscan",
        description:
          "Match your resume against job descriptions to beat ATS filters.",
        url: "https://www.jobscan.co/",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Interactive",
        tags: ["ats", "matching", "tool"],
      },
    ]),
    subcategory("portfolio", "Portfolio Building", [
      {
        title: "GitHub Pages",
        description:
          "Free hosting for static portfolios straight from your repositories.",
        url: "https://pages.github.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["github", "hosting", "static site"],
      },
      {
        title: "Netlify",
        description:
          "Free hosting with continuous deployment for portfolio sites.",
        url: "https://www.netlify.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["hosting", "deploy", "free"],
      },
      {
        title: "Vercel Templates",
        description:
          "Production-ready templates for portfolio and landing page projects.",
        url: "https://vercel.com/templates",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["vercel", "templates", "starters"],
      },
      {
        title: "Portfolio Ideas (Evavic44)",
        description:
          "A curated collection of developer portfolio sites for inspiration.",
        url: "https://github.com/Evavic44/portfolio-ideas",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["github", "inspiration", "examples"],
      },
      {
        title: "Developer Portfolios (emmabostian)",
        description:
          "A running list of developer portfolios to study and learn from.",
        url: "https://github.com/emmabostian/developer-portfolios",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["github", "list", "inspiration"],
      },
    ]),
    subcategory("freelancing", "Freelancing", [
      {
        title: "Upwork",
        description:
          "The largest marketplace for freelance developers and designers.",
        url: "https://www.upwork.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["marketplace", "clients", "freelance"],
      },
      {
        title: "Fiverr",
        description:
          "A popular platform for selling services, from quick tasks to full projects.",
        url: "https://www.fiverr.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["marketplace", "gigs", "freelance"],
      },
      {
        title: "Toptal",
        description:
          "An exclusive network connecting top developers with premium clients.",
        url: "https://www.toptal.com/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Community",
        tags: ["premium", "network", "screening"],
      },
      {
        title: "Indie Hackers",
        description:
          "Stories and strategies from independent developers building businesses.",
        url: "https://www.indiehackers.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["indie", "stories", "community"],
      },
      {
        title: "Double Your Freelancing",
        description:
          "Brennan Dunn's classic advice on raising rates and finding better clients.",
        url: "https://doubleyourfreelancing.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["rates", "pricing", "advice"],
      },
      {
        title: "r/freelance",
        description:
          "A candid community forum for freelancing wins, pitfalls, and advice.",
        url: "https://www.reddit.com/r/freelance/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["reddit", "community", "advice"],
      },
    ]),
    subcategory("startup", "Startup Resources", [
      {
        title: "Y Combinator — Startup School",
        description:
          "Free, structured courses and advice from the world's most famous accelerator.",
        url: "https://www.startupschool.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["y combinator", "course", "free"],
      },
      {
        title: "YC Library",
        description:
          "Hundreds of talks and essays from YC founders and partners.",
        url: "https://www.ycombinator.com/library",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["yc", "talks", "essays"],
      },
      {
        title: "Paul Graham — Essays",
        description:
          "The timeless essays on startups, startups, and startups by PG.",
        url: "https://www.paulgraham.com/articles.html",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["paul graham", "essays", "startups"],
      },
      {
        title: "Stripe Atlas",
        description:
          "Form a company, open a bank account, and start doing business globally.",
        url: "https://stripe.com/atlas",
        difficulty: "Intermediate",
        access: "Paid",
        badge: "Official",
        tags: ["stripe", "incorporation", "banking"],
      },
      {
        title: "Getting Real (37signals)",
        description:
          "The timeless free book from 37signals on building software products pragmatically.",
        url: "https://basecamp.com/gettingreal",
        difficulty: "Beginner",
        access: "Free",
        badge: "Book",
        tags: ["basecamp", "book", "37signals"],
      },
      {
        title: "First Round Review",
        description:
          "Deep, practitioner-written articles from the VC firm behind tech leaders.",
        url: "https://review.firstround.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["first round", "articles", "management"],
      },
    ]),
  ],
);
