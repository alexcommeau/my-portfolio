import { ImageResponse } from "next/og";
import type { BlogPost } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export const socialImageSize = {
  width: 1200,
  height: 630,
} as const;

type SocialImageContent = {
  eyebrow: string;
  title: string;
  description: string;
};

function renderSocialImage({ eyebrow, title, description }: SocialImageContent) {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: "#09090b",
        color: "#f4f4f5",
        padding: "72px 78px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 15% 15%, rgba(34, 211, 238, 0.20), transparent 34%), radial-gradient(circle at 88% 82%, rgba(251, 191, 36, 0.16), transparent 32%)",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          inset: "22px",
          border: "1px solid #27272a",
          borderRadius: "28px",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "10px",
          background: "linear-gradient(90deg, #22d3ee, #2dd4bf, #fbbf24)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 25,
          }}
        >
          <span style={{ color: "#67e8f9", fontWeight: 700 }}>{eyebrow}</span>
          <span style={{ color: "#a1a1aa", fontWeight: 700 }}>[ AC ]</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "980px" }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 52 ? 55 : 64,
              lineHeight: 1.08,
              letterSpacing: "-2px",
              fontWeight: 800,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              maxWidth: "900px",
              color: "#a1a1aa",
              fontSize: 26,
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#71717a",
            fontSize: 22,
          }}
        >
          <span>{siteConfig.author.role}</span>
          <span>alexcommeau.com/blog</span>
        </div>
      </div>
    </div>
  );
}

export function createBlogCoverImage(post: BlogPost) {
  return new ImageResponse(
    renderSocialImage({
      eyebrow: post.tag,
      title: post.title,
      description: post.excerpt,
    }),
    socialImageSize,
  );
}

export function createSiteSocialImage() {
  return new ImageResponse(
    renderSocialImage({
      eyebrow: "Portfolio & blog",
      title: siteConfig.title,
      description: siteConfig.description,
    }),
    socialImageSize,
  );
}
