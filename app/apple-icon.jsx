// Home-screen icon for iOS, which does not accept SVG favicons: the brand
// mark on an ink tile.

import { ImageResponse } from "next/og";
import { logoDataUrl } from "@/lib/logo-svg";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#000",
        }}
      >
        <img src={logoDataUrl()} width={120} height={120} alt="" />
      </div>
    ),
    size
  );
}
