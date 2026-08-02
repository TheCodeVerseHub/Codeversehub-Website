"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/pages", label: "Docs" },
];

const moreLinks = [
  { href: "/case-studies", label: "Case Studies" },
  { href: "/team", label: "Team" },
  { href: "/contributing", label: "Contributing" },
  { href: "/pages/faq", label: "FAQ" },
  { href: "/pages/rules", label: "Rules" },
  { href: "/ban-appeal", label: "Ban Appeal" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-md border-b border-[#1a1a1a]"
          : "bg-transparent"
      }`}
    >
      <div className="section-container flex h-14 md:h-15 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <Image
            src="/logo.png"
            alt="The CodeVerse Hub"
            width={20}
            height={20}
            className="object-contain"
            priority
          />
          <span className="font-heading text-sm font-semibold tracking-tight text-white group-hover:text-white transition-colors duration-200">
            CodeVerse Hub
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center h-8 px-3 text-[0.8125rem] font-medium transition-colors duration-150 ${
                  isActive
                    ? "text-white"
                    : "text-[#666666] hover:text-[#afafaf]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* More dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setMoreOpen(false);
                }
              }}
              className={`flex items-center h-8 gap-1 px-3 text-[0.8125rem] font-medium transition-colors duration-150 ${
                moreOpen ? "text-white" : "text-[#666666] hover:text-[#afafaf]"
              }`}
            >
              More
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-150 ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 border border-[#1a1a1a] bg-[#090909] py-1 z-[60]">
                {moreLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block px-3.5 py-1.5 text-[0.8125rem] text-[#666666] hover:text-[#afafaf] hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="https://discord.gg/3xKFvKhuGR"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-8 px-4 text-xs"
          >
            Join Discord
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-8 h-8"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-4 h-4 text-[#afafaf]" />
          ) : (
            <Menu className="w-4 h-4 text-[#afafaf]" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-200 ease-in-out ${
          mobileOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-[#1a1a1a] bg-[#050505] px-5 pb-4 pt-2 space-y-0.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`block w-full px-3 py-2 text-[0.8125rem] font-medium transition-colors duration-150 ${
                  isActive
                    ? "text-white"
                    : "text-[#666666] hover:text-[#afafaf]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 pb-1 px-3 text-[0.625rem] font-medium tracking-wider text-[#666666] uppercase">
            More
          </div>
          {moreLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block w-full px-3 py-2 text-[0.8125rem] font-medium text-[#666666] hover:text-[#afafaf] transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 mt-2 border-t border-[#1a1a1a]">
            <a
              href="https://discord.gg/3xKFvKhuGR"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full h-10 text-xs"
            >
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
