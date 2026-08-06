import { category, subcategory } from "../helpers";

export const linux = category(
  "linux",
  "Linux",
  "Learn the OS that runs the world — from your first distro to the kernel itself.",
  [
    subcategory("getting-started", "Getting Started", [
      {
        title: "Linux Journey",
        description:
          "A free, gamified journey that teaches Linux from total beginner upward.",
        url: "https://linuxjourney.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["linux", "beginner", "gamified"],
      },
      {
        title: "LinuxCommand.org",
        description:
          "A classic, friendly introduction to the Linux command line.",
        url: "https://www.linuxcommand.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Book",
        tags: ["command line", "beginner", "classic"],
      },
      {
        title: "Ubuntu — Command line for beginners",
        description:
          "Official Ubuntu tutorials that make the terminal approachable.",
        url: "https://ubuntu.com/tutorials/command-line-for-beginners",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["ubuntu", "terminal", "tutorial"],
      },
      {
        title: "DistroWatch",
        description:
          "The definitive directory of Linux distributions, with news and reviews.",
        url: "https://distrowatch.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["distros", "directory", "news"],
      },
    ]),
    subcategory("advanced", "Advanced & Admin", [
      {
        title: "Arch Wiki",
        description:
          "Widely considered the best Linux documentation on the internet, distro-agnostic.",
        url: "https://wiki.archlinux.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["arch", "wiki", "reference"],
      },
      {
        title: "Gentoo Wiki",
        description:
          "Deep, precise documentation on Linux internals from the Gentoo project.",
        url: "https://wiki.gentoo.org/wiki/Main_Page",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["gentoo", "wiki", "advanced"],
      },
      {
        title: "The Linux Kernel documentation",
        description:
          "Official documentation for the Linux kernel — the definitive reference.",
        url: "https://docs.kernel.org/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Official",
        tags: ["kernel", "docs", "official"],
      },
      {
        title: "Unix & Linux Stack Exchange",
        description:
          "The highest-quality Q&A community for Unix and Linux problems.",
        url: "https://unix.stackexchange.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["qa", "community", "unix"],
      },
    ]),
  ],
);
