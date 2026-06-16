import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE.name;

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #14276b 0%, #060e3a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>
            <span style={{ color: "#c8ceda" }}>PRIME&nbsp;HR</span>
            <span style={{ color: "#9aa7c2", marginLeft: 12, fontSize: 20, alignSelf: "center", letterSpacing: 3 }}>
              ACADEMY MALAYSIA
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#9ec0ff",
              fontSize: 22,
              fontWeight: 600,
              marginBottom: 28,
            }}
          >
            HRD Corp Accredited Training Provider
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 1000 }}>
            Transforming Talent Into Organizational Success
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#9aa7c2", fontSize: 26 }}>
          <span>HR Training · Consultancy · CHRP Certification</span>
          <span style={{ color: "#5a86d6" }}>primehracademy.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
