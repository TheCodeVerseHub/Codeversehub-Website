import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ContentPageMeta {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContentPageNavItem {
  href: string;
  label: string;
}

const contentDirectory = path.join(process.cwd(), "content", "pages");

/** Compact labels used in the docs sidebar for known pages. */
const shortLabels: Record<string, string> = {
  rules: "Rules",
  faq: "FAQ",
  "server-info": "Server Info",
  "how-to-ask": "How to Ask",
  "how-to-help": "How to Help",
  join: "Join Guide",
  contributing: "Contributing",
  "hall-of-fame": "Hall of Fame",
  "moderation-guide": "Moderation Guide",
  "code-of-conduct": "Code of Conduct",
  "privacy-policy": "Privacy Policy",
  "terms-of-service": "Terms of Service",
  "security-notice": "Security Notice",
  "staff-roles": "Staff Roles",
  tags: "Tags Reference",
  resources: "Learning Resources",
  acknowledgements: "Acknowledgements",
};

/** Reads every markdown page in content/pages, sorted by title. */
export function getAllContentPages(): ContentPageMeta[] {
  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data } = matter(
        fs.readFileSync(path.join(contentDirectory, file), "utf8"),
      );
      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        icon: data.icon || "",
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Navigation list for the docs sidebar, derived from content/pages so it
 * always includes every page. Known pages get compact labels; any new page
 * falls back to its frontmatter title.
 */
export function getContentPageNav(): ContentPageNavItem[] {
  return getAllContentPages().map((page) => ({
    href: `/pages/${page.slug}`,
    label: shortLabels[page.slug] ?? page.title,
  }));
}
