import sanitizeHtml from "sanitize-html";

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

/**
 * Pure-JS (no jsdom) — DOMPurify's Node build pulls in jsdom, which reads
 * asset files off disk at runtime relative to its own module location.
 * That works during `next build` but breaks in Vercel's serverless
 * runtime once the traced output doesn't carry those files along, which
 * only started happening 100% of the time once every route render call
 * (formerly build-time/ISR-cached) started running per request.
 */

/** Ryoka OS (TipTap) saves post content as raw HTML. This is the only allowlist. */
export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { "*": ALLOWED_ATTR },
  });
}

/** Strips all markup, for excerpts and any other plain-text-only display of editor content. */
export function stripHtml(html: string): string {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).trim();
}
