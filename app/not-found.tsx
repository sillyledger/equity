import Link from "next/link";

export default function NotFound() {
  return (
    <div className="hero">
      <div className="wm rs">
        404<b>.</b>
      </div>
      <p className="sub">
        Nothing here. <Link href="/">Back home</Link>.
      </p>
    </div>
  );
}
