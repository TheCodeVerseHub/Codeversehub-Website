import { category, subcategory } from "../helpers";

export const security = category(
  "security",
  "Cybersecurity",
  "Web security, cryptography, reverse engineering, and hands-on practice platforms.",
  [
    subcategory("web-security", "Web Security", [
      {
        title: "PortSwigger — Web Security Academy",
        description:
          "The best free, interactive web security training — includes a vulnerable lab for every topic.",
        url: "https://portswigger.net/web-security",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Interactive",
        tags: ["burp suite", "labs", "vulnerabilities"],
      },
      {
        title: "MDN — Web Security",
        description:
          "Mozilla's guide to securing websites and understanding browser security.",
        url: "https://developer.mozilla.org/en-US/docs/Web/Security",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["mdn", "basics", "browser"],
      },
      {
        title: "MDN — Content Security Policy",
        description:
          "The definitive reference for CSP headers and how to deploy them.",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["csp", "headers", "xss"],
      },
      {
        title: "OWASP Top 10",
        description:
          "The canonical list of the most critical web application security risks.",
        url: "https://owasp.org/www-project-top-ten/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["owasp", "risks", "checklist"],
      },
      {
        title: "Google — Web Fundamentals Security",
        description:
          "Google's guidance on keeping your web apps safe.",
        url: "https://developers.google.com/web/fundamentals/security",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["google", "best practices", "fundamentals"],
      },
    ]),
    subcategory("owasp", "OWASP", [
      {
        title: "OWASP Foundation",
        description:
          "The non-profit home of open-source security tools and knowledge.",
        url: "https://owasp.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["owasp", "community", "open source"],
      },
      {
        title: "OWASP Cheat Sheet Series",
        description:
          "Concise, authoritative checklists for nearly every security topic.",
        url: "https://cheatsheetseries.owasp.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Cheat Sheet",
        tags: ["cheatsheets", "checklists", "best practices"],
      },
      {
        title: "OWASP Web Security Testing Guide",
        description:
          "The industry-standard guide to penetration testing web applications.",
        url: "https://owasp.org/www-project-web-security-testing-guide/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Book",
        tags: ["wstg", "pentesting", "testing guide"],
      },
      {
        title: "OWASP ZAP",
        description:
          "The open-source web app scanner — essential for finding vulnerabilities.",
        url: "https://www.zaproxy.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["zap", "scanner", "tool"],
      },
      {
        title: "OWASP Juice Shop",
        description:
          "A deliberately vulnerable web app for practicing real exploitation.",
        url: "https://owasp.org/www-project-juice-shop/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["juice shop", "vulnerable app", "practice"],
      },
    ]),
    subcategory("cryptography", "Cryptography", [
      {
        title: "Cryptopals",
        description:
          "The classic set of hands-on cryptography challenges — learn by breaking crypto.",
        url: "https://cryptopals.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["challenges", "crypto", "hands on"],
      },
      {
        title: "Crypto 101",
        description:
          "A free, friendly introduction to cryptography for programmers.",
        url: "https://www.crypto101.io/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Book",
        tags: ["intro", "free", "book"],
      },
      {
        title: "Cryptography I — Stanford (Coursera)",
        description:
          "Dan Boneh's renowned university course on cryptographic foundations.",
        url: "https://www.coursera.org/learn/crypto",
        difficulty: "Advanced",
        access: "Freemium",
        badge: "Video Course",
        tags: ["stanford", "dan boneh", "course"],
      },
      {
        title: "A Graduate Course in Applied Cryptography",
        description:
          "The free textbook by Boneh and Shoup — the modern reference for applied crypto.",
        url: "https://toc.cryptobook.us/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Book",
        tags: ["textbook", "applied crypto", "free"],
      },
      {
        title: "CryptoHack",
        description:
          "Interactive cryptography challenges that gamify learning.",
        url: "https://cryptohack.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Interactive",
        tags: ["challenges", "gamified", "interactive"],
      },
    ]),
    subcategory("reverse-engineering", "Reverse Engineering", [
      {
        title: "crackmes.one",
        description:
          "A free community platform for practicing reverse engineering on crackmes.",
        url: "https://crackmes.one/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["crackmes", "practice", "community"],
      },
      {
        title: "Reverse Engineering for Beginners (free book)",
        description:
          "Dennis Yurichev's comprehensive free book covering x86/x64, ARM, and tooling.",
        url: "https://beginners.re/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Book",
        tags: ["book", "x86", "free"],
      },
      {
        title: "Ghidra",
        description:
          "The NSA's free, open-source software reverse engineering suite.",
        url: "https://ghidra-sre.org/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Practice",
        tags: ["ghidra", "disassembler", "tool"],
      },
      {
        title: "Awesome Reverse Engineering",
        description:
          "A curated list of RE tools, books, and resources.",
        url: "https://github.com/wtsxDev/reverse-engineering",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["awesome list", "tools", "resources"],
      },
      {
        title: "Begin RE (begin.re)",
        description:
          "A modern, hands-on introductory course to reverse engineering.",
        url: "https://www.begin.re/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["beginner", "course", "hands on"],
      },
    ]),
    subcategory("malware", "Malware Analysis", [
      {
        title: "Practical Malware Analysis",
        description:
          "The definitive book on analyzing malicious software — with labs.",
        url: "https://www.practicalmalwareanalysis.com/",
        difficulty: "Advanced",
        access: "Paid",
        badge: "Book",
        tags: ["book", "labs", "definitive"],
      },
      {
        title: "The Zoo (malware samples)",
        description:
          "An open-source repository of live malware for analysis practice.",
        url: "https://github.com/ytisf/theZoo",
        difficulty: "Advanced",
        access: "Free",
        badge: "Practice",
        tags: ["samples", "github", "analysis"],
      },
      {
        title: "ANY.RUN",
        description:
          "An interactive malware sandbox that lets you analyze samples in the browser.",
        url: "https://any.run/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Interactive",
        tags: ["sandbox", "analysis", "tool"],
      },
      {
        title: "Malware Unicorn — Workshops",
        description:
          "Free workshops on RE and malware analysis fundamentals.",
        url: "https://malwareunicorn.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Video Course",
        tags: ["workshops", "free", "fundamentals"],
      },
      {
        title: "VirusTotal",
        description:
          "The standard multi-engine scanner for checking files and URLs.",
        url: "https://www.virustotal.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["scanner", "tool", "threat intel"],
      },
    ]),
    subcategory("ctf", "CTF Practice", [
      {
        title: "CTFtime",
        description:
          "The calendar and scoreboard for CTF competitions worldwide.",
        url: "https://ctftime.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["events", "calendar", "scoreboard"],
      },
      {
        title: "picoCTF",
        description:
          "Carnegie Mellon's free, beginner-friendly CTF platform.",
        url: "https://picoctf.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Practice",
        tags: ["carnegie mellon", "beginner", "free"],
      },
      {
        title: "Hack The Box",
        description:
          "Hands-on labs and machines for offensive security practice.",
        url: "https://www.hackthebox.com/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Practice",
        tags: ["labs", "machines", "offensive"],
      },
      {
        title: "TryHackMe",
        description:
          "Guided, gamified rooms that teach security fundamentals hands-on.",
        url: "https://tryhackme.com/",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Interactive",
        tags: ["rooms", "guided", "beginner"],
      },
      {
        title: "OverTheWire — Wargames",
        description:
          "Classic wargames that teach security concepts through levels.",
        url: "https://overthewire.org/wargames/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["wargames", "levels", "classic"],
      },
      {
        title: "Awesome CTF",
        description:
          "A curated list of CTF frameworks, tools, and resources.",
        url: "https://github.com/apsdehal/awesome-ctf",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["awesome list", "tools", "frameworks"],
      },
    ]),
  ],
);
