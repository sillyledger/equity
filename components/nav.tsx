import Link from "next/link";

const LINKS = [
  { href: "/", label: "Journal", key: "journal" },
  { href: "/archive", label: "Archive", key: "archive" },
  { href: "/about", label: "About", key: "about" },
] as const;

export function Nav({ current }: { current: (typeof LINKS)[number]["key"] }) {
  return (
    <nav className="nav" aria-label="Primary">
      {LINKS.map((link) => (
        <Link key={link.key} href={link.href} className={link.key === current ? "cur" : ""}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
