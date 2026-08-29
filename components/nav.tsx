import Link from "next/link";
import { Mark } from "@/components/mark";

const LINKS = [
  { href: "/", label: "Home", key: "home" },
  { href: "/blog", label: "Blog", key: "blog" },
  { href: "/about", label: "About", key: "about" },
] as const;

export function Nav({ current }: { current: (typeof LINKS)[number]["key"] }) {
  return (
    <div className="nav-row">
      <Mark />
      <nav className="nav" aria-label="Primary">
        {LINKS.map((link) => (
          <Link key={link.key} href={link.href} className={link.key === current ? "cur" : ""}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
