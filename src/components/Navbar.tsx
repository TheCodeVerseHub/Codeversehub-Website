"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("--:--");
  const [date, setDate] = useState("—");
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

    return () => {
      window.clearInterval(clockTimer);
      window.removeEventListener("scroll", onScroll);
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
