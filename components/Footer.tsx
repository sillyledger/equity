import { footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer>
      <div
        className="wrap"
        style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <span>{footer.note}</span>
        <span>{footer.copyright}</span>
      </div>
    </footer>
  );
}
