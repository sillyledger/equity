import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { PostEntry } from "@/components/post-entry";
import { getArchive, getPostBySlug, getAdjacent } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getArchive();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.published_at ?? undefined,
    },
  };
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const { prev, next } = await getAdjacent(slug);

  return (
    <>
      <PostEntry post={post} prev={prev} next={next} />
      <div className="col">
        <Footer />
      </div>
    </>
  );
}
