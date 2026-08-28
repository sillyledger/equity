import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="col">
      <Nav current="journal" />

      <div className="hero">
        <div className="wm rs">
          404<b>.</b>
        </div>
        <p className="sub">
          Nothing here. <Link href="/">Back to the journal</Link>.
        </p>
      </div>

      <Footer />
    </div>
  );
}
