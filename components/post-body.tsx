import { Fragment } from "react";
import { sanitizePostHtml, stripHtml } from "@/lib/html";

/**
 * Post bodies are raw HTML from Ryoka OS's TipTap editor
 * (editor.getHTML()) — p, h1-h4, a, ul, ol, li, blockquote, strong, em,
 * code, pre, img, hr, br. Sanitized against an explicit allowlist, then
 * rendered directly; anything outside the allowlist is dropped rather
 * than rejected, so sanitizing itself effectively cannot throw. The
 * try/catch is defense-in-depth in case the sanitizer itself misbehaves
 * on some input — a post must never fail to render.
 *
 * This renders `.prose` itself, directly on the element that carries
 * dangerouslySetInnerHTML, rather than being wrapped in a separate
 * `.prose` div by the caller — the CSS relies on direct-child selectors
 * (`.prose > p`, etc.) to beat the global margin reset, and an extra
 * wrapper div in between silently breaks every one of those selectors.
 */
export function PostBody({ body, slug }: { body: string; slug: string }) {
  try {
    const clean = sanitizePostHtml(body);
    return <div className="prose" dangerouslySetInnerHTML={{ __html: clean }} />;
  } catch (error) {
    console.error(`[post-body] failed to sanitize HTML for slug="${slug}", falling back to plain text`, error);
    return <PlainText text={stripHtml(body)} />;
  }
}

function PlainText({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="prose">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>
          {paragraph.split("\n").map((line, j, lines) => (
            <Fragment key={j}>
              {line}
              {j < lines.length - 1 && <br />}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}
