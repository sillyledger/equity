import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="col">
      <Nav current="about" />

      <div className="about-body">
        <h1 className="rs">About</h1>
        <p>Content coming soon.</p>
      </div>

      <Footer />
    </div>
  );
}
