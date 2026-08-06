import { category, subcategory } from "../helpers";

export const devops = category(
  "devops",
  "DevOps",
  "Containers, orchestration, CI/CD, and the Linux/Bash skills that run modern infrastructure.",
  [
    subcategory("docker", "Docker", [
      {
        title: "Docker Documentation",
        description:
          "The official Docker docs — concepts, CLI, and best practices.",
        url: "https://docs.docker.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["docker", "docs", "official"],
      },
      {
        title: "Docker — Get Started",
        description:
          "The official hands-on tutorial for building and running your first container.",
        url: "https://docs.docker.com/get-started/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["tutorial", "containers", "beginner"],
      },
      {
        title: "Docker Compose Documentation",
        description:
          "Official docs for defining and running multi-container applications.",
        url: "https://docs.docker.com/compose/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["compose", "multi-container", "official"],
      },
      {
        title: "Play with Docker",
        description:
          "A free browser playground for experimenting with Docker — no install needed.",
        url: "https://labs.play-with-docker.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["playground", "interactive", "beginner"],
      },
      {
        title: "Docker — Getting Started tutorial (GitHub)",
        description:
          "The official sample app used to learn Docker fundamentals.",
        url: "https://github.com/docker/getting-started",
        difficulty: "Beginner",
        access: "Free",
        badge: "Practice",
        tags: ["github", "sample app", "tutorial"],
      },
    ]),
    subcategory("kubernetes", "Kubernetes", [
      {
        title: "Kubernetes Documentation",
        description:
          "The official Kubernetes docs — concepts, tasks, and reference.",
        url: "https://kubernetes.io/docs/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["kubernetes", "docs", "official"],
      },
      {
        title: "Kubernetes Basics tutorial",
        description:
          "The official interactive tutorial covering pods, services, and deployments.",
        url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["tutorial", "basics", "interactive"],
      },
      {
        title: "Kubernetes Concepts",
        description:
          "Official deep dives into the core objects: workloads, networking, and storage.",
        url: "https://kubernetes.io/docs/concepts/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["concepts", "workloads", "networking"],
      },
      {
        title: "Kubernetes — GitHub repository",
        description:
          "The open-source Kubernetes source code and community project.",
        url: "https://github.com/kubernetes/kubernetes",
        difficulty: "Advanced",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source", "source"],
      },
      {
        title: "Kubernetes the Hard Way",
        description:
          "Kelsey Hightower's classic guide to bootstrapping Kubernetes from scratch.",
        url: "https://github.com/kelseyhightower/kubernetes-the-hard-way",
        difficulty: "Advanced",
        access: "Free",
        badge: "Practice",
        tags: ["github", "advanced", "from scratch"],
      },
      {
        title: "CNCF — Cloud Native Computing Foundation",
        description:
          "The home of Kubernetes and the cloud-native landscape and projects.",
        url: "https://www.cncf.io/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["cncf", "landscape", "community"],
      },
    ]),
    subcategory("github-actions", "GitHub Actions", [
      {
        title: "GitHub Actions Documentation",
        description:
          "The official docs for automating workflows directly in GitHub.",
        url: "https://docs.github.com/actions",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["github", "ci", "official"],
      },
      {
        title: "Learn GitHub Actions",
        description:
          "The official guide that explains workflows, events, and expressions.",
        url: "https://docs.github.com/actions/learn-github-actions",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["learn", "workflows", "official"],
      },
      {
        title: "GitHub Actions — Workflow syntax",
        description:
          "The complete reference for workflow YAML syntax.",
        url: "https://docs.github.com/actions/reference/workflow-syntax-for-github-actions",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["syntax", "yaml", "reference"],
      },
      {
        title: "GitHub Marketplace — Actions",
        description:
          "Browse and publish reusable actions used across GitHub.",
        url: "https://github.com/marketplace/actions",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["marketplace", "actions", "ecosystem"],
      },
      {
        title: "Awesome Actions",
        description:
          "A curated list of GitHub Actions for every use case.",
        url: "https://github.com/sdras/awesome-actions",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Cheat Sheet",
        tags: ["awesome list", "actions", "recipes"],
      },
    ]),
    subcategory("cicd", "CI/CD", [
      {
        title: "GitLab CI/CD Documentation",
        description:
          "Official docs for GitLab's built-in CI/CD pipelines.",
        url: "https://docs.gitlab.com/ee/ci/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["gitlab", "pipelines", "official"],
      },
      {
        title: "Jenkins User Documentation",
        description:
          "The official docs for the most widely used open-source automation server.",
        url: "https://www.jenkins.io/doc/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["jenkins", "pipelines", "official"],
      },
      {
        title: "CircleCI Documentation",
        description:
          "Official docs for CircleCI's hosted CI/CD platform.",
        url: "https://circleci.com/docs/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["circleci", "cloud ci", "official"],
      },
      {
        title: "What is CI/CD? — Red Hat",
        description:
          "A clear, timeless explainer of continuous integration and delivery.",
        url: "https://www.redhat.com/en/topics/devops/what-is-ci-cd",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["explainer", "concepts", "devops"],
      },
    ]),
    subcategory("nginx", "Nginx", [
      {
        title: "nginx.org — Documentation",
        description:
          "The official documentation for the open-source nginx web server.",
        url: "https://nginx.org/en/docs/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["nginx", "docs", "official"],
      },
      {
        title: "nginx — Beginner's Guide",
        description:
          "The official starter guide to nginx configuration and concepts.",
        url: "https://nginx.org/en/docs/beginners_guide.html",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["guide", "config", "beginner"],
      },
      {
        title: "NGINX Wiki",
        description:
          "The community wiki with configuration examples and common recipes.",
        url: "https://www.nginx.com/resources/wiki/start/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["wiki", "recipes", "config"],
      },
      {
        title: "NGINX Plus Documentation",
        description:
          "Full configuration reference including modules and directives.",
        url: "https://docs.nginx.com/nginx/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["reference", "directives", "modules"],
      },
    ]),
    subcategory("linux", "Linux", [
      {
        title: "The Linux Documentation Project",
        description:
          "Classic free guides and HOWTOs covering Linux administration.",
        url: "https://tldp.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["howto", "guides", "classic"],
      },
      {
        title: "man7.org — Linux man pages",
        description:
          "The canonical online manual pages for Linux system interfaces.",
        url: "https://man7.org/linux/man-pages/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["man pages", "reference", "syscalls"],
      },
      {
        title: "The Linux Kernel documentation",
        description:
          "Official documentation for the Linux kernel itself.",
        url: "https://www.kernel.org/doc/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Official",
        tags: ["kernel", "docs", "official"],
      },
      {
        title: "Linux Foundation Training",
        description:
          "Professional courses and certifications for Linux system administration.",
        url: "https://training.linuxfoundation.org/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Video Course",
        tags: ["training", "certification", "linux foundation"],
      },
      {
        title: "Brendan Gregg — Linux Performance",
        description:
          "The definitive resource for Linux performance analysis and tuning.",
        url: "https://www.brendangregg.com/linuxperf.html",
        difficulty: "Advanced",
        access: "Free",
        badge: "Cheat Sheet",
        tags: ["performance", "tuning", "observability"],
      },
    ]),
    subcategory("bash", "Bash", [
      {
        title: "GNU Bash Manual",
        description:
          "The official manual for the Bash shell.",
        url: "https://www.gnu.org/software/bash/manual/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["bash", "manual", "official"],
      },
      {
        title: "The Bash Guide (mywiki.wooledge)",
        description:
          "The most respected community guide to writing robust Bash.",
        url: "https://mywiki.wooledge.org/BashGuide",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["guide", "best practices", "shell"],
      },
      {
        title: "Pure Bash Bible",
        description:
          "A community-collected set of tricks for writing pure, robust Bash.",
        url: "https://github.com/dylanaraps/pure-bash-bible",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Cheat Sheet",
        tags: ["github", "tricks", "pure bash"],
      },
      {
        title: "ShellCheck",
        description:
          "A linter that finds bugs and pitfalls in your shell scripts.",
        url: "https://www.shellcheck.net/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Interactive",
        tags: ["linter", "tool", "static analysis"],
      },
      {
        title: "Explain Shell",
        description:
          "Paste any shell command to get an explanation of every part.",
        url: "https://explainshell.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["tool", "explainer", "commands"],
      },
      {
        title: "The Bash Handbook",
        description:
          "A concise, community-written handbook of Bash essentials.",
        url: "https://github.com/denysdovhan/bash-handbook",
        difficulty: "Beginner",
        access: "Free",
        badge: "Book",
        tags: ["handbook", "beginner", "github"],
      },
    ]),
  ],
);
