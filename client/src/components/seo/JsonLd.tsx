interface JsonLdProps {
  data: unknown;
}

/**
 * Structured data for search engines. "<" is escaped so CMS-provided text
 * can never close the script tag early.
 */
export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
