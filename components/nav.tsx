"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Mark } from "@/components/mark";
import { NAV_LINKS, isActiveNavLink } from "@/lib/nav-links";
import { TRACKING_SINCE } from "@/lib/site";

/** Rendered once, in app/layout.tsx, so it appears on every page, including ones that don't exist yet. */
export function Nav() {
  const pathname = usePathname();
  return (
    <header className="nav-row">
      <Mark />
      <div className="nav-right">
        <nav className="nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={isActiveNavLink(pathname, link.href) ? "cur" : ""}>
              {link.label}
            </Link>
          ))}
        </nav>
        <span className="badge">
          <span className="badge-dot" aria-hidden="true" />
          Tracking since {TRACKING_SINCE}
        </span>
      </div>
    </header>
  );
}
