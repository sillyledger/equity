import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "a",
  "ul",
  "ol",
  "li",
  "blockquote",
  "strong",
  "em",
  "code",
  "pre",
  "img",
  "hr",
  "br",
];
const ALLOWED_ATTR = ["href", "src", "alt", "class", "target", "rel"];

/** Ryoka OS (TipTap) saves post content as raw HTML. This is the only allowlist. */
export function sanitizePostHtml(html: string): string {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
}

/** Strips all markup, for excerpts and any other plain-text-only display of editor content. */
export function stripHtml(html: string): string {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
}
