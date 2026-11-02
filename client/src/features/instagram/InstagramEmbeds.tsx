"use client";

import Script from "next/script";

import { INSTAGRAM_EMBED_SCRIPT, instagramPermalink } from "@/lib/utils/social-embeds";
import type { InstagramPost } from "@/types/content";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

interface InstagramEmbedsProps {
  posts: InstagramPost[];
}

/**
 * Instagram's official embeds. Each <blockquote> is a no-JS fallback link
 * that Instagram's embed.js upgrades into the real post.
 */
export function InstagramEmbeds({ posts }: InstagramEmbedsProps) {
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] items-start gap-5 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-3 max-md:overflow-x-auto max-md:px-4 max-md:pb-2">
        {posts.map((post) => {
          const permalink = instagramPermalink(post);
          return (
            <div key={post.id} className="flex min-w-0 justify-center max-md:flex-[0_0_330px] max-md:snap-center">
              <blockquote
                className="instagram-media m-0 w-full max-w-[540px] min-w-[326px] rounded-[3px] border-0 bg-canvas p-0 shadow-embed"
                data-instgrm-captioned=""
                data-instgrm-permalink={permalink}
                data-instgrm-version="14"
              >
                <a
                  href={permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block min-h-[460px] p-4 text-meta font-semibold text-brand"
                >
                  View this reel on Instagram
                </a>
              </blockquote>
            </div>
          );
        })}
      </div>

      {/* onReady also re-runs after client-side navigation back to this page. */}
      <Script src={INSTAGRAM_EMBED_SCRIPT} strategy="lazyOnload" onReady={() => window.instgrm?.Embeds.process()} />
    </>
  );
}
