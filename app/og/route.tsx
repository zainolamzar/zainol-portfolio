/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const avatarPath = "profiles/1756409019286.jpg"
  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/${avatarPath}?width=300&height=300&quality=80`

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: "linear-gradient(135deg, #FF813F 0%, #000b1f 100%)",
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          padding: "40px",
        }}
      >
        {/* Supabase Avatar */}
        <img
          src={avatarUrl}
          width="160"
          height="160"
          style={{
            borderRadius: "50%",
            border: "6px solid white",
            marginBottom: "40px",
          }}
        />

        {/* Name */}
        <div style={{ fontWeight: "bold", fontSize: 70 }}>Zainol Amzar</div>

        {/* Subtitle */}
        <div style={{ fontSize: 40, marginTop: "10px" }}>
          Full Stack Developer | Malaysia
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
