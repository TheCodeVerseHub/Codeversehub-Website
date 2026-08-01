"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { LINKS } from "@/lib/constants";

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

type LinkCategory = {
  title: string;
  links: FooterLink[];
};

const categories: LinkCategory[] = [
  {
    title: "Community",
    links: [
      { name: "About", href: "/about" },
      { name: "Team", href: "/team" },
      { name: "Join Discord", href: LINKS.DISCORD, external: true },
      { name: "Code of Conduct", href: "/pages/code-of-conduct" },
      { name: "Rules", href: "/pages/rules" },
      { name: "Staff Roles", href: "/pages/staff-roles" },
      { name: "Hall of Fame", href: "/pages/hall-of-fame" },
    ],
  },
  {
    title: "Projects",
    links: [
      { name: "All Projects", href: "/projects" },
      { name: "GitHub Organization", href: LINKS.GITHUB_ORG, external: true },
      { name: "Tags Reference", href: "/pages/tags" },
      { name: "Acknowledgements", href: "/pages/acknowledgements" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Learning Resources", href: "/resources" },
      { name: "Resource Pages", href: "/pages/resources" },
      { name: "FAQ", href: "/pages/faq" },
      { name: "How to Ask", href: "/pages/how-to-ask" },
      { name: "How to Help", href: "/pages/how-to-help" },
      { name: "Server Info", href: "/pages/server-info" },
      { name: "Join Guide", href: "/pages/join" },
      { name: "Moderation Guide", href: "/pages/moderation-guide" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { name: "Documentation Hub", href: "/pages" },
      { name: "Contributing Guide", href: "/contributing" },
      { name: "Contribution Docs", href: "/pages/contributing" },
      { name: "Privacy Policy", href: "/pages/privacy-policy" },
      { name: "Security Notice", href: "/pages/security-notice" },
      { name: "Ban Appeal", href: "/ban-appeal" },
    ],
  },
];

const socialLinks: { name: string; href: string; icon: React.ReactNode }[] = [
  {
    name: "GitHub",
    href: LINKS.GITHUB_ORG,
    icon: <Github className="w-4 h-4" />,
  },
  {
    name: "Discord",
    href: LINKS.DISCORD,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: "Reddit",
    href: LINKS.REDDIT,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z" />
      </svg>
    ),
  },
  {
    name: "Matrix",
    href: LINKS.MATRIX,
    icon: (
      <span className="font-mono text-xs font-bold tracking-tight leading-none">
        [m]
      </span>
    ),
  },
  {
    name: "Fluxer",
    href: LINKS.FLUXER,
    icon: (
      <span className="font-mono text-xs font-bold tracking-tight leading-none">
        {'{F}'}
      </span>
    ),
  },
  {
    name: "Instagram",
    href: LINKS.INSTAGRAM,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: LINKS.EMAIL,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="mt-3.5 space-y-2" role="list">
      {links.map((link) => (
        <li key={link.name}>
          {link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1 text-[0.8125rem] text-[#666666] hover:text-[#afafaf] transition-colors duration-150 focus-visible:outline-1 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              <span>{link.name}</span>
              <ExternalLink className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-150" />
            </a>
          ) : (
            <Link
              href={link.href}
              className="text-[0.8125rem] text-[#666666] hover:text-[#afafaf] transition-colors duration-150 focus-visible:outline-1 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              {link.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#050505]">
      <div className="section-container py-14 md:py-18">
        {/* Top section: Brand + Link categories */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group focus-visible:outline-1 focus-visible:outline-white focus-visible:outline-offset-2">
              <Image
                src="/logo.png"
                alt="The CodeVerse Hub"
                width={24}
                height={24}
                className="object-contain shrink-0"
              />
              <span className="font-heading text-sm font-semibold text-white group-hover:text-white transition-colors duration-200">
                The CodeVerse Hub
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-[0.8125rem] text-[#666666] leading-relaxed">
              A developer community that builds real open-source software.
              Write code, review PRs, and ship together.
            </p>

            {/* Social links inline with brand */}
            <nav className="mt-5 flex items-center gap-2.5" aria-label="Social media links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 text-[#666666] hover:text-[#22d3ee] hover:bg-[rgba(34,211,238,0.05)] transition-all duration-150 focus-visible:outline-1 focus-visible:outline-white focus-visible:outline-offset-2"
                  aria-label={link.name}
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </nav>
          </div>

          {/* Link category columns */}
          {categories.map((category) => (
            <div key={category.title} className="lg:col-span-1">
              <h4 className="text-[0.625rem] text-[#666666] font-semibold tracking-widest uppercase font-mono">
                {category.title}
              </h4>
              <nav aria-label={`${category.title} links`}>
                <LinkList links={category.links} />
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[#1a1a1a] pt-6 sm:flex-row sm:items-center">
          <p className="text-[0.75rem] text-[#666666]">
            &copy; {new Date().getFullYear()} The CodeVerse Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[0.75rem] text-[#666666]">
            <Link
              href="/pages/privacy-policy"
              className="hover:text-[#afafaf] transition-colors duration-150 focus-visible:outline-1 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Privacy
            </Link>
            <Link
              href="/pages/security-notice"
              className="hover:text-[#afafaf] transition-colors duration-150 focus-visible:outline-1 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Security
            </Link>
            <Link
              href="/ban-appeal"
              className="hover:text-[#afafaf] transition-colors duration-150 focus-visible:outline-1 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Ban Appeal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
