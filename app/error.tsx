"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Nav current="home" />

      <div className="hero">
        <div className="wm rs">
          Oops<b>.</b>
        </div>
        <p className="sub">
          Something went wrong loading this page.{" "}
          <button type="button" onClick={() => reset()} className="link-action">
            Try again
          </button>{" "}
          or head <Link href="/">back home</Link>.
        </p>
      </div>
    </>
  );
}
