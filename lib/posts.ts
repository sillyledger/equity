import { createClient } from "@supabase/supabase-js";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  status: "draft" | "published";
  published_at: string | null;
  read_minutes: number | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const TARGET_SITE = "equity.tw";

/**
 * lib/posts.ts is the only file that talks to Supabase. The `posts` table
 * is shared across multiple sites (Ryoka OS publishes to it directly), so
 * every read is scoped to this site's rows and to published status —
 * drafts and other sites' posts are invisible here by design, not a gap
 * to work around.
 */
function client() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set");
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, next: { revalidate: 60 } }),
    },
  });
}

export async function getLatestPosts(limit: number): Promise<Post[]> {
  const { data, error } = await client()
    .from("posts")
    .select("*")
    .eq("target_site", TARGET_SITE)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function getArchive(): Promise<Post[]> {
  const { data, error } = await client()
    .from("posts")
    .select("*")
    .eq("target_site", TARGET_SITE)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await client()
    .from("posts")
    .select("*")
    .eq("target_site", TARGET_SITE)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getAdjacent(
  slug: string,
): Promise<{ prev: Post | null; next: Post | null }> {
  const posts = await getArchive();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: posts[idx + 1] ?? null,
    next: posts[idx - 1] ?? null,
  };
}
