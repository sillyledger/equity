import { Fragment } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

/**
 * Post bodies are written in Ryoka OS as plain markdown or plain text, not
 * guaranteed-valid MDX — a stray `<redacted>`, a comparison like `x < y`,
 * an email autolink `<a@b.com>`, or a sentence starting with "export" is
 * all it takes for @mdx-js/mdx's JSX/ESM parsing to throw. A post must
 * never 500, so this renders in three tiers, each a safe fallback for the
 * one before it:
 *
 *  1. Full MDX — handles anything actually written as MDX/JSX.
 *  2. `format: "md"` — same compiler, but disables JSX/import/export
 *     parsing and falls back to plain CommonMark, so stray angle
 *     brackets and braces are just text. This is what real Ryoka OS
 *     content needs almost all of the time.
 *  3. Escaped plain text, split into paragraphs on blank lines — pure
 *     string handling, cannot throw, used only if both compilers reject
 *     the content outright.
 */
export async function PostBody({ body, slug }: { body: string; slug: string }) {
  try {
    return await MDXRemote({ source: body });
  } catch (mdxError) {
    console.error(`[post-body] MDX compile failed for slug="${slug}", falling back to markdown`, mdxError);
  }

  try {
    return await MDXRemote({ source: body, options: { mdxOptions: { format: "md" } } });
  } catch (markdownError) {
    console.error(
      `[post-body] markdown compile failed for slug="${slug}", falling back to plain text`,
      markdownError,
    );
  }

  return <PlainText text={body} />;
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
