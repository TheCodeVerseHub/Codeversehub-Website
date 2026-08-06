import { category, subcategory } from "../helpers";

export const databases = category(
  "databases",
  "Databases",
  "Relational and NoSQL databases — official docs, interactive courses, and practical guides.",
  [
    subcategory("postgresql", "PostgreSQL", [
      {
        title: "PostgreSQL Documentation",
        description:
          "The official, exhaustive documentation for PostgreSQL.",
        url: "https://www.postgresql.org/docs/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["postgres", "docs", "official"],
      },
      {
        title: "PostgreSQL Tutorial (official)",
        description:
          "The official tutorial that introduces SQL and core PostgreSQL features.",
        url: "https://www.postgresql.org/docs/current/tutorial.html",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["tutorial", "sql", "beginner"],
      },
      {
        title: "PostgreSQL Tutorial (postgresqltutorial.com)",
        description:
          "A practical site with hundreds of examples for SQL and administration.",
        url: "https://www.postgresqltutorial.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["tutorial", "sql", "examples"],
      },
      {
        title: "PostgreSQL Exercises",
        description:
          "Interactive SQL exercises designed to build real PostgreSQL fluency.",
        url: "https://pgexercises.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Practice",
        tags: ["exercises", "sql", "interactive"],
      },
      {
        title: "Awesome PostgreSQL",
        description:
          "A curated list of PostgreSQL libraries, tools, and resources.",
        url: "https://github.com/dhamaniasad/awesome-postgres",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["awesome list", "tools", "libraries"],
      },
    ]),
    subcategory("mysql", "MySQL", [
      {
        title: "MySQL Documentation",
        description:
          "The official documentation hub for MySQL products and services.",
        url: "https://dev.mysql.com/doc/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["mysql", "docs", "official"],
      },
      {
        title: "MySQL Reference Manual",
        description:
          "The complete official reference for MySQL SQL syntax and administration.",
        url: "https://dev.mysql.com/doc/refman/en/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["reference", "sql", "official"],
      },
      {
        title: "MySQL Tutorial (official)",
        description:
          "The official tutorial that walks through common MySQL tasks.",
        url: "https://dev.mysql.com/doc/refman/en/tutorial.html",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["tutorial", "beginner", "official"],
      },
      {
        title: "MySQLTutorial.org",
        description:
          "Clear, practical MySQL lessons with runnable examples.",
        url: "https://www.mysqltutorial.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["tutorial", "sql", "examples"],
      },
      {
        title: "MySQL Community Edition",
        description:
          "The official, freely available open-source MySQL distribution.",
        url: "https://www.mysql.com/products/community/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["download", "open source", "official"],
      },
    ]),
    subcategory("mongodb", "MongoDB", [
      {
        title: "MongoDB Documentation",
        description:
          "The official docs for MongoDB — the document database.",
        url: "https://www.mongodb.com/docs/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["mongodb", "docs", "official"],
      },
      {
        title: "MongoDB Manual",
        description:
          "The complete reference for the MongoDB server, CRUD, and aggregation.",
        url: "https://www.mongodb.com/docs/manual/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["manual", "aggregation", "crud"],
      },
      {
        title: "MongoDB University",
        description:
          "Free official courses and certifications for MongoDB and data modeling.",
        url: "https://www.mongodb.com/university",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["university", "courses", "certification"],
      },
      {
        title: "MongoDB — GitHub repository",
        description:
          "The open-source MongoDB database server source code.",
        url: "https://github.com/mongodb/mongo",
        difficulty: "Advanced",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source", "server"],
      },
      {
        title: "MongoDB Drivers documentation",
        description:
          "Official docs for the official MongoDB drivers in every major language.",
        url: "https://www.mongodb.com/docs/drivers/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["drivers", "sdk", "languages"],
      },
    ]),
    subcategory("redis", "Redis", [
      {
        title: "Redis Documentation",
        description:
          "The official Redis docs — data structures, caching, and persistence.",
        url: "https://redis.io/docs/latest/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["redis", "docs", "official"],
      },
      {
        title: "Redis Commands reference",
        description:
          "The complete official reference for every Redis command.",
        url: "https://redis.io/docs/latest/commands/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["commands", "reference", "official"],
      },
      {
        title: "Redis University",
        description:
          "Free official courses on Redis fundamentals, data structures, and more.",
        url: "https://redis.io/university/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["university", "courses", "official"],
      },
      {
        title: "Redis — Data types & patterns",
        description:
          "The official deep dive into Redis data structures and when to use each.",
        url: "https://redis.io/docs/latest/develop/data-types/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["data types", "patterns", "official"],
      },
      {
        title: "Redis — GitHub repository",
        description:
          "The open-source Redis server source code.",
        url: "https://github.com/redis/redis",
        difficulty: "Advanced",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source", "server"],
      },
    ]),
    subcategory("sqlite", "SQLite", [
      {
        title: "SQLite Documentation",
        description:
          "The official documentation for the world's most widely deployed database.",
        url: "https://www.sqlite.org/docs.html",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["sqlite", "docs", "official"],
      },
      {
        title: "SQLite — SQL Language Reference",
        description:
          "The official grammar and syntax reference for SQLite's SQL dialect.",
        url: "https://www.sqlite.org/lang.html",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["sql", "reference", "syntax"],
      },
      {
        title: "SQLite — Quick Start",
        description:
          "The official five-minute introduction to creating and querying a database.",
        url: "https://www.sqlite.org/quickstart.html",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["quickstart", "beginner", "cli"],
      },
      {
        title: "When to Use SQLite",
        description:
          "The official guidance on where SQLite fits — and where it doesn't.",
        url: "https://www.sqlite.org/whentouse.html",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["guidance", "architecture", "article"],
      },
      {
        title: "SQLite Tutorial (sqlitetutorial.net)",
        description:
          "A practical tutorial site covering SQLite from install to advanced SQL.",
        url: "https://www.sqlitetutorial.net/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["tutorial", "sql", "examples"],
      },
    ]),
  ],
);
