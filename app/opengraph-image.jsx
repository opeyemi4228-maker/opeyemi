// The social card shown when a link to this site is shared (LinkedIn, X,
// WhatsApp, Slack). Built at 1200×630, the size every platform expects,
// rather than reusing the 960×1280 portrait, which they crop to a strip.
// Pages with their own image (each essay) override it.

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";
import { logoDataUrl } from "@/lib/logo-svg";

export const alt = `${siteConfig.name}, mining engineer, design engineer and finance engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "public/images/hero/hero-3.jpg"));
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#000" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 728,
            padding: "64px 56px 56px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={logoDataUrl()} width={64} height={64} alt="" />
            <div style={{ fontSize: 19, letterSpacing: 4, color: "#c9a24b", textTransform: "uppercase" }}>
              Mining · Design · Finance Engineer
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 84,
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: -1,
                color: "#f7f7f5",
                textTransform: "uppercase",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>Opeyemi T.</span>
              <span>Ojurongbe</span>
            </div>
            <div
              style={{
                marginTop: 30,
                paddingLeft: 22,
                borderLeft: "3px solid #c9a24b",
                fontSize: 26,
                lineHeight: 1.35,
                color: "#d4d4d8",
                fontStyle: "italic",
              }}
            >
              Everything worth building begins with understanding what lies beneath.
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 16, letterSpacing: 2, color: "#a1a1aa", textTransform: "uppercase" }}>
            CEO, BitLayerX Technologies · CEO, Orangé Finance
          </div>
        </div>

        <div style={{ display: "flex", position: "relative", width: 472, height: 630 }}>
          <img src={portraitSrc} width={472} height={630} alt="" style={{ objectFit: "cover" }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #000 0%, rgba(0,0,0,0) 35%)",
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
