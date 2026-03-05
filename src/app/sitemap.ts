import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodeversehub.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/pages`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/resources`,
      lastModified: new Date(),
    },
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

        return {
          url: `${siteUrl}/pages/${slug}`,
          lastModified,
        };
      });
  }

  return [...staticRoutes, ...dynamicRoutes];
}
