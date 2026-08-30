import { createClient } from "@supabase/supabase-js";

/**
 * This site does not own the `plays` table's schema — Ryoka OS does, and
 * will write to it directly the same way it writes `posts`. Only `id`
 * and `label` are treated as guaranteed; every other field is typed
 * nullable/defaulted and normalized below, same reasoning as lib/posts.ts.
 */
export interface Play {
  id: string;
  label: string;
  /** e.g. "Domain flip" — shown in the featured row only. */
  category: string | null;
  /** The quote/description — only used when featured. */
  note: string | null;
  /** Signed: negative = loss, positive = gain, null = not started. */
  amountCents: number | null;
  status: "up" | "down" | "flat";
  isFeatured: boolean;
  isOpen: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

/** Shape of a raw row as it comes back from Supabase — nothing on it can be trusted. */
type RawPlayRow = Record<string, unknown>;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const TARGET_SITE = "equity.tw";

/**
 * lib/plays.ts is the only file that talks to the `plays` table. Same
 * shared-table pattern as lib/posts.ts: Ryoka OS writes, this site only
 * reads, and every read is scoped to this site and to open plays.
 */
function client() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set");
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asStatus(value: unknown): Play["status"] {
  return value === "up" || value === "down" ? value : "flat";
}

/**
 * Turns a raw, untrusted Supabase row into a Play with safe defaults on
 * every field. Returns null if the row is missing what nothing can be
 * rendered without — an id and a label.
 */
function normalizePlay(row: RawPlayRow): Play | null {
  const id = asString(row.id);
  const label = asString(row.label);
  if (!id || !label) return null;

  return {
    id,
    label,
    category: asString(row.category),
    note: asString(row.note),
    amountCents: asNumber(row.amount_cents),
    status: asStatus(row.status),
    isFeatured: row.is_featured === true,
    isOpen: row.is_open !== false,
    createdAt: asString(row.created_at),
    updatedAt: asString(row.updated_at),
  };
}

function normalizePlays(rows: RawPlayRow[] | null): Play[] {
  if (!rows) return [];
  const plays: Play[] = [];
  for (const row of rows) {
    const play = normalizePlay(row);
    if (play) plays.push(play);
    else console.error("[plays] dropped a row with no usable id/label", row);
  }
  return plays;
}

/**
 * Every exported reader below degrades to a safe empty result ([] or
 * null) on any failure, same reasoning as lib/posts.ts — a Supabase hiccup
 * shouldn't take the homepage down, but it's still logged loudly.
 */

export async function getFeaturedPlay(): Promise<Play | null> {
  try {
    const { data, error } = await client()
      .from("plays")
      .select("*")
      .eq("target_site", TARGET_SITE)
      .eq("is_open", true)
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data ? normalizePlay(data) : null;
  } catch (error) {
    console.error("[plays] getFeaturedPlay failed", error);
    return null;
  }
}

export async function getOpenPlays(): Promise<Play[]> {
  try {
    const { data, error } = await client()
      .from("plays")
      .select("*")
      .eq("target_site", TARGET_SITE)
      .eq("is_open", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return normalizePlays(data);
  } catch (error) {
    console.error("[plays] getOpenPlays failed", error);
    return [];
  }
}

/** Sums amount_cents across a list of plays, treating "not started" (null) as 0. */
export function sumAmountCents(plays: Play[]): number {
  return plays.reduce((total, play) => total + (play.amountCents ?? 0), 0);
}
