import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Developer Resources | The Codeverse Hub",
  description:
    "500+ hand-curated developer resources — programming languages, web & mobile development, databases, DevOps, cloud, AI/ML, cybersecurity, system design, and more. Official docs, courses, books, and practice platforms from The Codeverse Hub community.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Developer Resources | The Codeverse Hub",
    description:
      "500+ hand-curated developer resources across every topic — official docs, courses, books, and practice platforms from The Codeverse Hub community.",
    url: "/resources",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Resources | The Codeverse Hub",
    description:
      "500+ curated coding resources for all levels, from The Codeverse Hub.",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
