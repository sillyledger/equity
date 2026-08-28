import { Fragment } from "react";
import { sanitizePostHtml, stripHtml } from "@/lib/html";

/**
 * Post bodies are raw HTML from Ryoka OS's TipTap editor
 * (editor.getHTML()) — p, h1-h4, a, ul, ol, li, blockquote, strong, em,
 * code, pre, img, hr, br. Sanitized against an explicit allowlist, then
 * rendered directly; anything outside the allowlist is dropped rather
 * than rejected, so sanitizing itself effectively cannot throw. The
 * try/catch is defense-in-depth in case DOMPurify/jsdom itself misbehaves
 * on some input — a post must never fail to render.
 */
export function PostBody({ body, slug }: { body: string; slug: string }) {
  try {
    const clean = sanitizePostHtml(body);
    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
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
    <>
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
    </>
  );
}
