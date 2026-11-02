"use client";

import { BlocksRenderer, type BlocksContent as StrapiBlocks } from "@strapi/blocks-react-renderer";

import { cn } from "@/lib/utils/cn";
import { isExternalUrl } from "@/lib/utils/links";
import type { BlocksContent } from "@/types/cms";

const HEADING_CLASSES: Record<number, string> = {
  1: "text-hero font-bold",
  2: "text-callout font-bold",
  3: "heading-card",
  4: "text-lead font-bold",
  5: "text-body font-bold",
  6: "text-body font-bold",
};

interface RichTextProps {
  content: BlocksContent;
  className?: string;
}

/** Renders Strapi "Blocks" rich text with the site's typography tokens. */
export function RichText({ content, className }: RichTextProps) {
  return (
    <div className={cn("flex flex-col gap-4 text-body", className)}>
      <BlocksRenderer
        content={content as unknown as StrapiBlocks}
        blocks={{
          paragraph: ({ children }) => <p>{children}</p>,
          heading: ({ children, level }) => {
            const Tag = `h${level}` as const;
            return <Tag className={cn("mt-2", HEADING_CLASSES[level])}>{children}</Tag>;
          },
          list: ({ children, format }) =>
            format === "ordered" ? (
              <ol className="list-decimal pl-6">{children}</ol>
            ) : (
              <ul className="list-disc pl-6">{children}</ul>
            ),
          quote: ({ children }) => <blockquote className="border-l-4 border-brand pl-4 text-muted italic">{children}</blockquote>,
          code: ({ plainText }) => (
            <pre className="overflow-x-auto rounded-media bg-surface p-4 text-meta">
              <code>{plainText}</code>
            </pre>
          ),
          link: ({ children, url }) => (
            <a
              href={url}
              className="font-semibold text-brand underline"
              {...(isExternalUrl(url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {children}
            </a>
          ),
          image: ({ image }) => (
            // eslint-disable-next-line @next/next/no-img-element -- CMS images have arbitrary hosts and sizes.
            <img
              src={image.url}
              alt={image.alternativeText ?? ""}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="h-auto max-w-full rounded-media"
            />
          ),
        }}
      />
    </div>
  );
}
