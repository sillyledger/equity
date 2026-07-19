import { nav } from "@/lib/content";

export default function Nav() {
  return (
    <nav>
      <div className="wrap">
        <div className="brand">{nav.brand}</div>
        <div className="navlinks">
          {nav.links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <a className="btn-dark" href={nav.cta.href}>
          {nav.cta.label}
        </a>
      </div>
    </nav>
  );
}
