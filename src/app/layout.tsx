import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Codeverse Hub",
  description: "The Codeverse Hub's Website",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="glow-frame" />
        {children}
      </body>
    </html>
  );
}
