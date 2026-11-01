import { YOUTUBE_IFRAME_ALLOW, youtubeEmbedUrl } from "@/lib/utils/youtube";

interface YouTubeEmbedProps {
  youtubeId: string;
  title: string;
  autoplay?: boolean;
}

/** YouTube iframe that fills its (relatively positioned) parent. */
export function YouTubeEmbed({ youtubeId, title, autoplay = false }: YouTubeEmbedProps) {
  return (
    <iframe
      src={youtubeEmbedUrl(youtubeId, { autoplay })}
      title={title}
      allow={YOUTUBE_IFRAME_ALLOW}
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="absolute inset-0 size-full border-0"
    />
  );
}
