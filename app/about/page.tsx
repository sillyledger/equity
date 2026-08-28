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
        <p>
          Equity is a journal. Short, unpolished entries about whatever I was thinking about that
          week — habits, cities, tea, and the small confident mistakes I keep making in public.
        </p>
        <p>
          There&apos;s no editorial calendar and no theme to speak of. I write when something
          won&apos;t leave me alone, post it, and move on.
        </p>
        <p>
          Get in touch at <a href="mailto:tenkaro@icloud.com">tenkaro@icloud.com</a>, or subscribe
          via <a href="/rss.xml">RSS</a>.
        </p>
      </div>

      <Footer />
    </div>
  );
}
