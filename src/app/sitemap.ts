import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { getCaseStudies } from "@/lib/case-studies";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodeversehub.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date() },
    { url: `${siteUrl}/about`, lastModified: new Date() },
    { url: `${siteUrl}/projects`, lastModified: new Date() },
    { url: `${siteUrl}/join-organization`, lastModified: new Date() },
    { url: `${siteUrl}/case-studies`, lastModified: new Date() },
    { url: `${siteUrl}/team`, lastModified: new Date() },
    { url: `${siteUrl}/contributing`, lastModified: new Date() },
    { url: `${siteUrl}/resources`, lastModified: new Date() },
    { url: `${siteUrl}/pages`, lastModified: new Date() },
    { url: `${siteUrl}/ban-appeal`, lastModified: new Date() },
    ...getCaseStudies().map((cs) => ({
      url: `${siteUrl}/case-studies/${cs.slug}`,
      lastModified: new Date(),
    })),
  ];

  const contentDirectory = path.join(process.cwd(), "content", "pages");
  let dynamicRoutes: MetadataRoute.Sitemap = [];

  if (fs.existsSync(contentDirectory)) {
    const files = fs.readdirSync(contentDirectory);
    dynamicRoutes = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(/\.md$/, "");
        const fullPath = path.join(contentDirectory, file);
        let lastModified: Date | undefined;
        try {
          const stats = fs.statSync(fullPath);
          lastModified = stats.mtime;
        } catch {
          lastModified = undefined;
        }
        return { url: `${siteUrl}/pages/${slug}`, lastModified };
      });
  }

  return [...staticRoutes, ...dynamicRoutes];
}
