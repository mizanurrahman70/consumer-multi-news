import { YouTubeEmbed } from "@/components/video/YouTubeEmbed";
import { SECTION_IDS } from "@/config/navigation";
import {
  FACEBOOK_IFRAME_ALLOW,
  FACEBOOK_LANDSCAPE_SIZE,
  facebookVideoPluginUrl,
} from "@/lib/utils/social-embeds";
import { extractYouTubeId } from "@/lib/utils/youtube";
import { getLiveStream } from "@/services/settings.service";

/**
 * Red "LIVE" block above the hero. Shown only while an editor has
 * Strapi → Live Stream → "isLive" switched on.
 */
export async function LiveSection() {
  const live = await getLiveStream();
  if (!live.isLive || !live.url) return null;

  const youtubeId = live.platform === "youtube" ? extractYouTubeId(live.url) : null;
  const title = live.title || "Multiply News live";

  return (
    <section id={SECTION_IDS.live} aria-label="Live now" className="mt-6 scroll-mt-40 rounded-card bg-ink p-4 text-canvas md:p-5">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex items-center gap-2 rounded-pill bg-brand px-3 py-1 font-display text-body-sm font-bold tracking-[0.06em]">
          <span className="size-2 animate-pulse rounded-full bg-canvas" aria-hidden="true" />
          LIVE
        </span>
        <h2 className="text-lead font-semibold">{title}</h2>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-media bg-media-deep">
        {youtubeId ? (
          <YouTubeEmbed youtubeId={youtubeId} title={title} />
        ) : (
          <iframe
            src={facebookVideoPluginUrl(live.url, FACEBOOK_LANDSCAPE_SIZE)}
            title={title}
            allow={FACEBOOK_IFRAME_ALLOW}
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        )}
      </div>
    </section>
  );
}
