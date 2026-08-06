import { category, subcategory } from "../helpers";

export const cloud = category(
  "cloud",
  "Cloud",
  "Official documentation and learning paths for the major cloud platforms.",
  [
    subcategory("aws", "AWS", [
      {
        title: "AWS Documentation",
        description:
          "The official documentation hub for every AWS service.",
        url: "https://docs.aws.amazon.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["aws", "docs", "official"],
      },
      {
        title: "AWS Getting Started",
        description:
          "Official guides and tutorials for common AWS workloads.",
        url: "https://aws.amazon.com/getting-started/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["getting started", "tutorials", "aws"],
      },
      {
        title: "AWS Free Tier",
        description:
          "Try AWS services free of charge for a full year and beyond.",
        url: "https://aws.amazon.com/free/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["free tier", "signup", "aws"],
      },
      {
        title: "AWS Training & Certification",
        description:
          "Official courses, labs, and certifications from AWS.",
        url: "https://aws.amazon.com/training/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Video Course",
        tags: ["training", "certification", "aws"],
      },
      {
        title: "AWS Well-Architected",
        description:
          "The official framework for designing reliable, secure, cost-efficient systems.",
        url: "https://aws.amazon.com/architecture/well-architected/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["well-architected", "best practices", "architecture"],
      },
      {
        title: "AWS Architecture Center",
        description:
          "Reference architectures and diagrams for production AWS solutions.",
        url: "https://aws.amazon.com/architecture/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["architecture", "reference", "diagrams"],
      },
    ]),
    subcategory("azure", "Azure", [
      {
        title: "Azure Documentation",
        description:
          "The official docs for Microsoft Azure services and solutions.",
        url: "https://learn.microsoft.com/azure/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["azure", "docs", "microsoft"],
      },
      {
        title: "Microsoft Learn — Azure",
        description:
          "Free, role-based learning paths and certifications for Azure.",
        url: "https://learn.microsoft.com/training/azure/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["microsoft learn", "certification", "paths"],
      },
      {
        title: "Azure Free Account",
        description:
          "Get free monthly Azure credits and free services for a year.",
        url: "https://azure.microsoft.com/en-us/free/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["free account", "credits", "azure"],
      },
      {
        title: "Azure Architecture Center",
        description:
          "Microsoft's guidance, patterns, and reference architectures for Azure.",
        url: "https://learn.microsoft.com/azure/architecture/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["architecture", "patterns", "azure"],
      },
      {
        title: "What is Azure? (cloud computing dictionary)",
        description:
          "A clear, beginner-friendly explainer of Azure and cloud computing.",
        url: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-azure",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["explainer", "beginner", "azure"],
      },
    ]),
    subcategory("gcp", "Google Cloud", [
      {
        title: "Google Cloud Documentation",
        description:
          "The official docs for Google Cloud products and services.",
        url: "https://cloud.google.com/docs",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["gcp", "docs", "google"],
      },
      {
        title: "Google Cloud Free Program",
        description:
          "Free tier and $300 of free credits to explore Google Cloud.",
        url: "https://cloud.google.com/free",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["free tier", "credits", "gcp"],
      },
      {
        title: "Google Cloud Training",
        description:
          "Official courses and certifications from Google Cloud.",
        url: "https://cloud.google.com/training",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Video Course",
        tags: ["training", "certification", "gcp"],
      },
      {
        title: "Google Cloud Architecture Center",
        description:
          "Reference architectures, best practices, and patterns for GCP.",
        url: "https://cloud.google.com/architecture",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["architecture", "patterns", "gcp"],
      },
      {
        title: "Google Cloud Skills Boost",
        description:
          "Hands-on labs and quests for learning Google Cloud by doing.",
        url: "https://www.cloudskillsboost.google/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Interactive",
        tags: ["labs", "quests", "hands on"],
      },
    ]),
    subcategory("cloudflare", "Cloudflare", [
      {
        title: "Cloudflare Developers",
        description:
          "Official docs for Cloudflare's edge platform, Workers, and services.",
        url: "https://developers.cloudflare.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["cloudflare", "docs", "official"],
      },
      {
        title: "Cloudflare Workers Documentation",
        description:
          "Official docs for building serverless applications on the edge.",
        url: "https://developers.cloudflare.com/workers/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["workers", "serverless", "edge"],
      },
      {
        title: "Cloudflare Pages",
        description:
          "Official docs for deploying JAMstack sites and full-stack apps on Cloudflare.",
        url: "https://developers.cloudflare.com/pages/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["pages", "static sites", "deploy"],
      },
      {
        title: "Cloudflare Learning Center",
        description:
          "Timeless explainers of internet and security fundamentals — DNS, CDN, TLS.",
        url: "https://www.cloudflare.com/learning/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["explainers", "networking", "security"],
      },
      {
        title: "Cloudflare Docs — Durable Objects",
        description:
          "Official docs for Cloudflare's stateful serverless primitives.",
        url: "https://developers.cloudflare.com/durable-objects/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["durable objects", "stateful", "advanced"],
      },
    ]),
  ],
);
