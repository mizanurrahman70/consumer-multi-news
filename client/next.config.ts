import type { NextConfig } from "next";

/** Images uploaded to Strapi are served from its host (or the upload provider's CDN). */
function strapiImagePattern(): URL[] {
  const strapiUrl = process.env.STRAPI_URL;
  if (!strapiUrl) return [];
  return [new URL("/uploads/**", strapiUrl)];
}

const strapiHost = process.env.STRAPI_URL ? new URL(process.env.STRAPI_URL).hostname : "";
const isLocalStrapi = ["localhost", "127.0.0.1"].includes(strapiHost);

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // YouTube thumbnails + Strapi uploads. Add a CDN host here if Strapi uses Cloudinary/S3.
    remotePatterns: [new URL("https://i.ytimg.com/vi/**"), ...strapiImagePattern()],
    // Next.js refuses to optimize images from local IPs. Allow it only when Strapi itself runs
    // on localhost (dev, or both apps on one server); remotePatterns still limits it to /uploads/.
    dangerouslyAllowLocalIP: isLocalStrapi,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
