export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatMonthYear(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatReadTime(minutes: number | null): string {
  const value = minutes && minutes > 0 ? minutes : 1;
  return `${value} min read`;
}

/** Formats a signed cents value as an unsigned dollar string, e.g. -34000 -> "$340". Sign is the caller's job. */
export function formatDollars(cents: number): string {
  const dollars = Math.round(Math.abs(cents) / 100);
  return `$${dollars.toLocaleString("en-US")}`;
}
