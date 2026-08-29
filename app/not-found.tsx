import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NotFound() {
  return (
    <>
      <Nav current="home" />

      <div className="hero">
        <div className="wm rs">
          404<b>.</b>
        </div>
        <p className="sub">
          Nothing here. <Link href="/">Back home</Link>.
        </p>
      </div>
    </>
  );
}
