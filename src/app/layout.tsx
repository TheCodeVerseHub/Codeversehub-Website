import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodeversehub.tech";
const siteName = "The Codeverse Hub";
const siteDescription =
  "CodeVerse Hub is a Discord community built for programmers — code reviews, open source projects, 24/7 help, resources, and people who get it.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | The Codeverse Hub",
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "CodeVerse Hub",
    "The Codeverse Hub",
    "programming community",
    "developer discord server",
    "coding help",
    "open source projects",
    "learn to code",
    "software engineering community",
  ],
  authors: [{ name: "The Codeverse Hub" }],
  creator: "The Codeverse Hub",
  publisher: "The Codeverse Hub",
  category: "technology",
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: "/",
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: siteName,
    description: siteDescription,
    creator: "@TheCodeverseHub",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      "https://discord.gg/3xKFvKhuGR",
      "https://github.com/TheCodeVerseHub",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
