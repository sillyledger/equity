import { createClient } from "@supabase/supabase-js";
import { stripHtml } from "@/lib/html";

/**
 * This site does not own the `posts` table's schema — Ryoka OS does, and
 * it writes pieter.tw and pieterborremans.com into the same table. Only
 * `id` and `slug` are treated as guaranteed; every other field is typed
 * nullable and normalized below, because a column being non-null in some
 * imagined schema is not evidence it's non-null in the row we actually get
 * back.
 */
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  /** Raw HTML from Ryoka OS's TipTap editor (editor.getHTML()) — sanitize before rendering. */
  body: string;
  status: string | null;
  published_at: string | null;
  read_minutes: number | null;
  tags: string[];
  category: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CategoryCount {
  name: string;
  count: number;
}

/** Shape of a raw row as it comes back from Supabase — nothing on it can be trusted. */
type RawPostRow = Record<string, unknown>;

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
      // No caching at all — publishes/edits in Ryoka OS should show up on
      // the next request, not after a revalidation window. This also
      // opts every route that calls into lib/posts.ts into dynamic
      // rendering automatically (Next treats a no-store fetch as a
      // dynamic API), which is the point.
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/**
 * Turns a raw, untrusted Supabase row into a Post with safe defaults on
 * every field. Returns null if the row is missing the one thing nothing
 * can be rendered without — an id and a slug — so callers can drop it
 * instead of crashing on it.
 */
function normalizePost(row: RawPostRow): Post | null {
  const id = asString(row.id);
  const slug = asString(row.slug);
  if (!id || !slug) return null;

  return {
    id,
    slug,
    title: asString(row.title) ?? "Untitled",
    excerpt: (() => {
      const raw = asString(row.excerpt);
      if (!raw) return null;
      const stripped = stripHtml(raw);
      return stripped.length > 0 ? stripped : null;
    })(),
    // Ryoka OS's editor writes HTML to `content`; `body` is kept as a
    // fallback in case a row was written under the older column name.
    body: asString(row.content) ?? asString(row.body) ?? "",
    status: asString(row.status),
    published_at: asString(row.published_at),
    read_minutes: asNumber(row.read_minutes),
    tags: asStringArray(row.tags),
    category: asString(row.category),
    created_at: asString(row.created_at),
    updated_at: asString(row.updated_at),
  };
}

function normalizePosts(rows: RawPostRow[] | null): Post[] {
  if (!rows) return [];
  const posts: Post[] = [];
  for (const row of rows) {
    const post = normalizePost(row);
    if (post) posts.push(post);
    else console.error("[posts] dropped a row with no usable id/slug", row);
  }
  return posts;
}

/**
 * Every exported reader below degrades to a safe empty result ([] or
 * null) on any failure — a dropped connection, a bad query, a schema
 * mismatch on a table this site doesn't own — instead of throwing.
 * Nothing that reads posts should be able to take the whole build or a
 * whole route down over Supabase being unavailable for a moment; the
 * failure is still logged loudly server-side so it doesn't go unnoticed.
 */

export async function getLatestPosts(limit: number): Promise<Post[]> {
  try {
    const { data, error } = await client()
      .from("posts")
      .select("*")
      .eq("target_site", TARGET_SITE)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return normalizePosts(data);
  } catch (error) {
    console.error("[posts] getLatestPosts failed", error);
    return [];
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const { data, error } = await client()
      .from("posts")
      .select("*")
      .eq("target_site", TARGET_SITE)
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error) throw error;
    return normalizePosts(data);
  } catch (error) {
    console.error("[posts] getAllPosts failed", error);
    return [];
  }
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  try {
    const { data, error } = await client()
      .from("posts")
      .select("*")
      .eq("target_site", TARGET_SITE)
      .eq("status", "published")
      .eq("category", category)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return normalizePosts(data);
  } catch (error) {
    console.error(`[posts] getPostsByCategory failed for category="${category}"`, error);
    return [];
  }
}

/** Groups already-fetched posts by category, skipping nulls, sorted by count descending. */
export function groupPostsByCategory(posts: Post[]): CategoryCount[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    if (!post.category) continue;
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}

/**
 * URL-safe slug for a category name, e.g. "Field Notes" -> "field-notes".
 * The single source of truth for category URLs — every link to
 * /blog/[category] and every match against that route's param must go
 * through this, never the raw name (which can contain spaces or
 * punctuation that don't survive a naive encode/decode round trip) and
 * never a partial fix like decoding %20 back to a literal space.
 */
export function categorySlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Reverse of categorySlug: finds the real category name a /blog/[category] slug refers to, or null if none match. */
export async function getCategoryNameBySlug(slug: string): Promise<string | null> {
  const categories = await getCategoryCounts();
  return categories.find((category) => categorySlug(category.name) === slug)?.name ?? null;
}

/**
 * Same result as groupPostsByCategory(await getAllPosts()), but selects
 * only the `category` column instead of full rows — for callers (like
 * the homepage sidebar) that need the counts but not the posts themselves.
 */
export async function getCategoryCounts(): Promise<CategoryCount[]> {
  try {
    const { data, error } = await client()
      .from("posts")
      .select("category")
      .eq("target_site", TARGET_SITE)
      .eq("status", "published");
    if (error) throw error;
    const counts = new Map<string, number>();
    for (const row of data ?? []) {
      const category = asString((row as RawPostRow).category);
      if (!category) continue;
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }
    return Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error("[posts] getCategoryCounts failed", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await client()
      .from("posts")
      .select("*")
      .eq("target_site", TARGET_SITE)
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data ? normalizePost(data) : null;
  } catch (error) {
    console.error(`[posts] getPostBySlug failed for slug="${slug}"`, error);
    return null;
  }
}

export async function getAdjacent(
  slug: string,
): Promise<{ prev: Post | null; next: Post | null }> {
  const posts = await getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: posts[idx + 1] ?? null,
    next: posts[idx - 1] ?? null,
  };
}
