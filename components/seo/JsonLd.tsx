/**
 * Renders a JSON-LD payload as a script tag.
 *
 * `dangerouslySetInnerHTML` is the only way to emit raw JSON inside a script —
 * React would otherwise escape it into something crawlers can't parse. Safe
 * here because every payload is built from our own constants in `lib/seo.ts`,
 * never from user input.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
