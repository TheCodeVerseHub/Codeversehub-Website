import type { Metadata, Viewport } from "next";
import localGeist from "next/font/local";
import localFont from "next/font/local";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import SiteBackground from "@/components/SiteBackground";

const geist = localGeist({
  src: "../../public/fonts/GeistVF.woff2",
  display: "swap",
  variable: "--font-sans",
  weight: "100 900",
});

const geistPixel = localGeist({
  src: "../../public/fonts/GeistPixel-Square.woff2",
  display: "swap",
  variable: "--font-pixel",
  weight: "100 900",
});

const spaceGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/vendor/SpaceGrotesk-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/vendor/SpaceGrotesk-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/vendor/SpaceGrotesk-600.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/vendor/SpaceGrotesk-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-heading",
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "../../public/fonts/vendor/JetBrainsMono-100.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/vendor/JetBrainsMono-200.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/vendor/JetBrainsMono-300.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/vendor/JetBrainsMono-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/vendor/JetBrainsMono-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/vendor/JetBrainsMono-600.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/vendor/JetBrainsMono-700.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/vendor/JetBrainsMono-800.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-mono",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://thecodeversehub.tech";
const siteName = "The CodeVerse Hub";
const siteDescription =
  "A developer community that builds real open-source software, hosts community activities, and ships Discord bots, Linux distros, developer tools, and more.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | The CodeVerse Hub",
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "CodeVerse Hub",
    "The CodeVerse Hub",
    "programming community",
    "developer discord server",
    "coding help",
    "community activities",
    "community events",
    "coding events",
    "open source projects",
    "learn to code",
    "software engineering community",
  ],
  authors: [{ name: "The CodeVerse Hub" }],
  creator: "The CodeVerse Hub",
  publisher: "The CodeVerse Hub",
  category: "technology",
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: "/",
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteName,
    description: siteDescription,
    images: ["/logo.png"],
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
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${geist.variable} ${jetbrainsMono.variable} ${geistPixel.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        <SiteBackground />
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
