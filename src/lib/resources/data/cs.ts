import { category, subcategory } from "../helpers";

export const cs = category(
  "cs",
  "Computer Science",
  "The timeless foundations — data structures, algorithms, systems, and theory.",
  [
    subcategory("ds", "Data Structures", [
      {
        title: "GeeksforGeeks — Data Structures",
        description:
          "One of the largest free collections of data structure explanations and code.",
        url: "https://www.geeksforgeeks.org/data-structures/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["dsa", "tutorials", "free"],
      },
      {
        title: "VisuAlgo",
        description:
          "Interactive visualizations of data structures and algorithms.",
        url: "https://visualgo.net/en",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["visualization", "interactive", "learning"],
      },
      {
        title: "Programiz — DSA",
        description:
          "A clean, beginner-friendly introduction to data structures with examples.",
        url: "https://www.programiz.com/dsa",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["tutorial", "beginner", "examples"],
      },
      {
        title: "Data Structure Visualizations (USFCA)",
        description:
          "University of San Francisco's classic interactive visualizations.",
        url: "https://www.cs.usfca.edu/~galles/visualization/Algorithms.html",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["usfca", "visualizations", "interactive"],
      },
      {
        title: "Hello Algo",
        description:
          "An open, animation-driven book on data structures and algorithms.",
        url: "https://www.hello-algo.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Book",
        tags: ["open book", "animations", "free"],
      },
    ]),
    subcategory("algorithms", "Algorithms", [
      {
        title: "Khan Academy — Algorithms",
        description:
          "A free, accessible introduction to algorithm design and analysis.",
        url: "https://www.khanacademy.org/computing/computer-science/algorithms",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["khan academy", "beginner", "free"],
      },
      {
        title: "MIT 6.006 — Introduction to Algorithms",
        description:
          "MIT's famous undergraduate algorithms course, free on OCW.",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Video Course",
        tags: ["mit", "ocw", "lectures"],
      },
      {
        title: "Introduction to Algorithms (CLRS)",
        description:
          "The definitive algorithms textbook — affectionately known as CLRS.",
        url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/",
        difficulty: "Advanced",
        access: "Paid",
        badge: "Book",
        tags: ["clrs", "textbook", "definitive"],
      },
      {
        title: "Algorithms Illuminated",
        description:
          "Tim Roughgarden's accessible, four-part algorithms series — parts free online.",
        url: "https://www.algorithmsilluminated.org/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Book",
        tags: ["tim roughgarden", "book", "accessible"],
      },
      {
        title: "TheAlgorithms (Python)",
        description:
          "An open-source collection of every algorithm, implemented in Python.",
        url: "https://github.com/TheAlgorithms/Python",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source", "implementations"],
      },
      {
        title: "Algorithms Specialization — Stanford",
        description:
          "Tim Roughgarden's acclaimed Stanford specialization on Coursera.",
        url: "https://www.coursera.org/specializations/algorithms",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Video Course",
        tags: ["stanford", "coursera", "specialization"],
      },
    ]),
    subcategory("os", "Operating Systems", [
      {
        title: "Operating Systems: Three Easy Pieces",
        description:
          "The free, widely loved textbook that teaches OS fundamentals with humor.",
        url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Book",
        tags: ["ostep", "textbook", "free"],
      },
      {
        title: "MIT 6.S081 — Operating System Engineering",
        description:
          "MIT's hands-on OS course built around the xv6 kernel.",
        url: "https://pdos.csail.mit.edu/6.828/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Video Course",
        tags: ["mit", "xv6", "labs"],
      },
      {
        title: "OSDev Wiki",
        description:
          "The definitive wiki for hobby OS developers, from bootloader to scheduler.",
        url: "https://wiki.osdev.org/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["osdev", "kernel", "wiki"],
      },
      {
        title: "Linux Kernel Teaching (linux-kernel-labs)",
        description:
          "Hands-on labs for understanding and modifying the Linux kernel.",
        url: "https://linux-kernel-labs.github.io/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Practice",
        tags: ["linux", "kernel", "labs"],
      },
    ]),
    subcategory("networking", "Networking", [
      {
        title: "Khan Academy — Computers and the Internet",
        description:
          "A free course covering how the internet, protocols, and networks work.",
        url: "https://www.khanacademy.org/computing/computers-and-internet",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["khan academy", "internet", "beginner"],
      },
      {
        title: "Computer Networking: A Top-Down Approach",
        description:
          "The companion site for the standard networking textbook by Kurose and Ross.",
        url: "https://gaia.cs.umass.edu/kurose_ross/index.php",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Book",
        tags: ["kurose", "textbook", "networking"],
      },
      {
        title: "Cisco Networking Academy",
        description:
          "Official networking courses and certifications from Cisco.",
        url: "https://www.netacad.com/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Video Course",
        tags: ["cisco", "courses", "certification"],
      },
      {
        title: "Subnetting Practice",
        description:
          "A free tool to drill subnetting until it becomes second nature.",
        url: "https://subnettingpractice.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["subnetting", "practice", "tool"],
      },
      {
        title: "Cloudflare — Learning the network layer",
        description:
          "Clear, timeless explainers of the network layer and protocols.",
        url: "https://www.cloudflare.com/learning/network-layer/what-is-the-network-layer/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["cloudflare", "explainers", "network layer"],
      },
    ]),
    subcategory("architecture", "Computer Architecture", [
      {
        title: "Nand2Tetris",
        description:
          "Build a complete computer from NAND gates up — the ultimate hands-on course.",
        url: "https://www.nand2tetris.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Video Course",
        tags: ["nand2tetris", "from scratch", "hardware"],
      },
      {
        title: "Princeton — Computer Architecture (Coursera)",
        description:
          "A well-regarded university-level introduction to computer architecture.",
        url: "https://www.coursera.org/learn/comparch",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Video Course",
        tags: ["princeton", "coursera", "course"],
      },
      {
        title: "MIT 6.004 — Computation Structures",
        description:
          "MIT's classic course connecting digital circuits to programming.",
        url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Video Course",
        tags: ["mit", "ocw", "digital design"],
      },
      {
        title: "Code: The Hidden Language of Computer Hardware and Software",
        description:
          "Charles Petzold's timeless, approachable guide to how computers really work.",
        url: "https://en.wikipedia.org/wiki/Code:_The_Hidden_Language_of_Computer_Hardware_and_Software",
        difficulty: "Beginner",
        access: "Paid",
        badge: "Book",
        tags: ["charles petzold", "book", "from scratch"],
      },
    ]),
    subcategory("compilers", "Compilers", [
      {
        title: "Crafting Interpreters",
        description:
          "The beloved free book that builds a complete interpreter in two languages.",
        url: "https://craftinginterpreters.com/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Book",
        tags: ["book", "interpreter", "from scratch"],
      },
      {
        title: "A Compiler Writing Journey",
        description:
          "Build a complete self-hosting compiler from scratch, step by step, in C.",
        url: "https://github.com/DoctorWkt/acwj",
        difficulty: "Advanced",
        access: "Free",
        badge: "Practice",
        tags: ["github", "from scratch", "c"],
      },
      {
        title: "Stanford CS143 — Compilers",
        description:
          "Stanford's classic compiler design course with full lecture materials.",
        url: "https://web.stanford.edu/class/cs143/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Video Course",
        tags: ["stanford", "cs143", "lectures"],
      },
      {
        title: "Compilers: Principles, Techniques, and Tools (Dragon Book)",
        description:
          "The classic compiler textbook that defined the field.",
        url: "https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools",
        difficulty: "Advanced",
        access: "Paid",
        badge: "Book",
        tags: ["dragon book", "textbook", "classic"],
      },
      {
        title: "LLVM Documentation",
        description:
          "The official docs for the LLVM compiler infrastructure.",
        url: "https://llvm.org/docs/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Official",
        tags: ["llvm", "official", "docs"],
      },
    ]),
  ],
);
