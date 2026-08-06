import { category, subcategory } from "../helpers";

export const backend = category(
  "backend",
  "Backend",
  "APIs, authentication, and the architectural patterns that power server-side systems.",
  [
    subcategory("rest", "REST APIs", [
      {
        title: "MDN — HTTP",
        description:
          "The definitive reference for HTTP methods, status codes, and headers.",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["http", "reference", "mdn"],
      },
      {
        title: "Architectural Styles and the Design of Network-based Software",
        description:
          "Roy Fielding's dissertation that originally defined REST.",
        url: "https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["fielding", "rest", "dissertation"],
      },
      {
        title: "REST API Tutorial",
        description:
          "A clear, practical introduction to REST concepts, verbs, and status codes.",
        url: "https://restfulapi.net/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["tutorial", "api design", "methods"],
      },
      {
        title: "JSON:API Specification",
        description:
          "A widely adopted specification for building APIs in JSON.",
        url: "https://jsonapi.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["spec", "json", "standards"],
      },
      {
        title: "OpenAPI Specification",
        description:
          "The official spec for describing HTTP APIs in a machine-readable format.",
        url: "https://spec.openapis.org/oas/latest.html",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["openapi", "spec", "documentation"],
      },
      {
        title: "Swagger — API documentation tools",
        description:
          "Guides and tools for designing and documenting REST APIs with OpenAPI.",
        url: "https://swagger.io/docs/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["swagger", "tools", "openapi"],
      },
    ]),
    subcategory("graphql", "GraphQL", [
      {
        title: "GraphQL — Learn",
        description:
          "The official introduction to GraphQL — queries, mutations, and schemas.",
        url: "https://graphql.org/learn/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["graphql", "learn", "official"],
      },
      {
        title: "GraphQL Specification",
        description:
          "The official specification that defines the GraphQL language.",
        url: "https://spec.graphql.org/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["spec", "standard", "official"],
      },
      {
        title: "How to GraphQL",
        description:
          "A free, full-stack tutorial covering GraphQL from frontend to backend.",
        url: "https://www.howtographql.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["tutorial", "full stack", "free"],
      },
      {
        title: "Apollo Documentation",
        description:
          "Official docs for Apollo Client and Apollo Server, the most popular GraphQL tooling.",
        url: "https://www.apollographql.com/docs/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["apollo", "client", "server"],
      },
      {
        title: "Hasura Learn",
        description:
          "Free courses on GraphQL concepts, databases, and real-time backends.",
        url: "https://hasura.io/learn/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["hasura", "courses", "backend"],
      },
    ]),
    subcategory("auth", "Authentication", [
      {
        title: "OWASP Authentication Cheat Sheet",
        description:
          "The authoritative checklist for implementing authentication securely.",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["owasp", "security", "checklist"],
      },
      {
        title: "OAuth 2.0 — oauth.net",
        description:
          "The community hub for OAuth 2.0, with specs, tutorials, and libraries.",
        url: "https://oauth.net/2/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["oauth", "authorization", "spec"],
      },
      {
        title: "The OAuth 2.0 Authorization Framework (RFC 6749)",
        description:
          "The official RFC that defines the OAuth 2.0 protocol.",
        url: "https://datatracker.ietf.org/doc/html/rfc6749",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["rfc", "oauth", "spec"],
      },
      {
        title: "JWT.io",
        description:
          "A browser-based tool to decode, verify, and experiment with JWTs.",
        url: "https://jwt.io/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Interactive",
        tags: ["jwt", "tool", "tokens"],
      },
      {
        title: "Auth0 Documentation",
        description:
          "In-depth guides on authentication and authorization, from a leading provider.",
        url: "https://auth0.com/docs",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["auth0", "guides", "sso"],
      },
      {
        title: "OpenID Connect",
        description:
          "The authentication layer built on OAuth 2.0 — spec and learning resources.",
        url: "https://openid.net/connect/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["oidc", "identity", "spec"],
      },
    ]),
    subcategory("microservices", "Microservices", [
      {
        title: "Microservices.io",
        description:
          "Chris Richardson's pattern catalogue for designing microservices.",
        url: "https://microservices.io/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["patterns", "architecture", "chris richardson"],
      },
      {
        title: "Microservices — Martin Fowler",
        description:
          "The influential article that introduced and analyzed the microservices style.",
        url: "https://martinfowler.com/articles/microservices.html",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["martin fowler", "architecture", "article"],
      },
      {
        title: ".NET Microservices Architecture",
        description:
          "A free, official Microsoft e-book on architecting microservices.",
        url: "https://learn.microsoft.com/dotnet/architecture/microservices/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Book",
        tags: ["microsoft", "e-book", "architecture"],
      },
      {
        title: "NGINX — Introduction to Microservices",
        description:
          "A thorough article series explaining microservices concepts and patterns.",
        url: "https://www.nginx.com/blog/introduction-to-microservices/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["nginx", "article", "patterns"],
      },
      {
        title: "Online Boutique (microservices demo)",
        description:
          "Google's open-source sample microservices app for cloud-native experimentation.",
        url: "https://github.com/GoogleCloudPlatform/microservices-demo",
        difficulty: "Advanced",
        access: "Free",
        badge: "Practice",
        tags: ["google", "demo app", "kubernetes"],
      },
      {
        title: "Azure Architecture Center — Microservices",
        description:
          "Microsoft's design guidance and reference architectures for microservices.",
        url: "https://learn.microsoft.com/azure/architecture/microservices/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["azure", "architecture", "patterns"],
      },
    ]),
  ],
);
