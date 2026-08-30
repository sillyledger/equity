export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/ledger", label: "Ledger" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

export function isActiveNavLink(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
