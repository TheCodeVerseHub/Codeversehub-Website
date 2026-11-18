"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

/* The reference design's link labels, mapped onto the existing site's routes. */
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contributing", label: "Contribute" },
  { href: "/case-studies", label: "What we offer" },
  { href: "/resources", label: "Domains" },
  { href: "/team", label: "Community" },
];

/* Secondary pages grouped under the "More" dropdown. */
const moreLinks = [
  { href: "/pages", label: "All Pages" },
  { href: "/join-organization", label: "Join the Organization" },
  { href: "/pages/faq", label: "FAQ" },
  { href: "/pages/rules", label: "Rules" },
  { href: "/pages/code-of-conduct", label: "Code of Conduct" },
  { href: "/pages/hall-of-fame", label: "Hall of Fame" },
  { href: "/pages/moderation-guide", label: "Moderation Guide" },
  { href: "/ban-appeal", label: "Ban Appeal" },
  { href: "/pages/privacy-policy", label: "Privacy Policy" },
  { href: "/pages/security-notice", label: "Security Notice" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("--:--");
  const [date, setDate] = useState("—");
  const moreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).toLowerCase());
      setDate(d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
    };
    updateClock();
    const clockTimer = window.setInterval(updateClock, 15000);

    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onPointerDown = (event: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearInterval(clockTimer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className={`cvh-nav${scrolled ? " scrolled" : ""}${mobileOpen ? " open" : ""}`} id="nav">
      <Link href="/" className="cvh-nav-logo">
        <Image src="/logo.png" alt="" width={30} height={30} />
        <span>CodeVerse</span>
      </Link>

      <nav className="cvh-nav-links" id="navLinks">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={pathname === link.href ? "active" : undefined}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <div className={`cvh-nav-more${moreOpen ? " open" : ""}`} ref={moreRef}>
          <button
            type="button"
            className="cvh-more-btn"
            aria-expanded={moreOpen}
            aria-haspopup="true"
            onClick={() => setMoreOpen((open) => !open)}
          >
            More
            <ChevronDown className="cvh-more-chevron" aria-hidden="true" />
          </button>
          <div className="cvh-more-menu" role="menu">
            {moreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className={pathname === link.href ? "active" : undefined}
                onClick={() => {
                  setMoreOpen(false);
                  setMobileOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="cvh-nav-clock">
        <span className="muted">Local time</span>
        <b>{time}</b>
        <span className="sep" />
        <span>{date}</span>
      </div>

      <button
        className="cvh-nav-burger"
        type="button"
        aria-label="Menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
