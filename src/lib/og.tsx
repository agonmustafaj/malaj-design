import { portrait } from "@/data/projects";
import { site } from "@/data/site";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const mark =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="530 0 670 748"><polygon fill="#ffffff" points="686.53 385.3 686.53 .89 895.05 139.15 1105.77 0 1104.84 106.75 945.74 217.55 945.74 513.1 756.47 639.99 676.37 584.87 844.58 466.89 845.07 223.71 784.28 183.13 784.64 437.25 622.69 547.12 536.93 486.8 686.53 385.3"/><polyline fill="none" stroke="#ffffff" stroke-width="18" points="897.03 734.48 1113.84 590.34 1113.86 301.12 1188.65 253.09 1190.3 134.97 1017.06 248.79 1016.12 539.74 810.86 673.92 811.23 674.17"/></svg>`,
  );

async function coverDataUrl(
  publicPath: string,
  width: number,
  height: number,
  focus: "attention" | "centre" | "portrait",
) {
  const file = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  const source = await readFile(file);
  const base = sharp(source, { failOn: "none" }).rotate();

  if (focus === "portrait") {
    const meta = await base.metadata();
    const sourceWidth = meta.width ?? width;
    const sourceHeight = meta.height ?? height;
    const targetRatio = width / height;
    let cropWidth = sourceWidth;
    let cropHeight = Math.round(sourceWidth / targetRatio);
    if (cropHeight > sourceHeight) {
      cropHeight = sourceHeight;
      cropWidth = Math.round(sourceHeight * targetRatio);
    }
    const left = Math.max(0, Math.round((sourceWidth - cropWidth) / 2));
    const top = Math.max(0, Math.round((sourceHeight - cropHeight) * 0.12));
    const buffer = await base
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(width, height)
      .jpeg({ quality: 82 })
      .toBuffer();
    return `data:image/jpeg;base64,${buffer.toString("base64")}`;
  }

  const buffer = await base
    .resize(width, height, { fit: "cover", position: focus })
    .jpeg({ quality: 82 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

export async function siteOgImage() {
  const photo = await coverDataUrl(portrait.src, 760, 860, "portrait");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#111111",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            width: 620,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={mark} width={34} height={38} alt="" />
            <div style={{ display: "flex", marginLeft: 16, fontSize: 18, letterSpacing: 4 }}>MALAJ DESIGN</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 84, lineHeight: 0.9, letterSpacing: -3 }}>Andi Malaj</div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 30, color: "#d0d0d0" }}>{site.role}</div>
            <div style={{ display: "flex", marginTop: 22, width: 84, height: 6, background: "#1c59d1" }} />
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#a3a3a3" }}>Prishtina. Brands, posters, digital.</div>
        </div>
        <div style={{ width: 580, height: "100%", display: "flex", overflow: "hidden" }}>
          <img src={photo} width={580} height={630} alt="" style={{ objectFit: "cover" }} />
        </div>
      </div>
    ),
    { ...ogSize },
  );
}

export async function projectOgImage(project: {
  title: string;
  category: string;
  number: string;
  image: string;
}) {
  const [photo, work] = await Promise.all([
    coverDataUrl(portrait.src, 520, 860, "portrait"),
    coverDataUrl(project.image, 1100, 860, "centre"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0d0d0d",
          color: "#ffffff",
        }}
      >
        <div style={{ width: 340, height: "100%", display: "flex", position: "relative" }}>
          <img src={photo} width={340} height={630} alt="" style={{ objectFit: "cover" }} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 176,
              background: "#0d0d0d",
              display: "flex",
              alignItems: "center",
              padding: "0 28px",
            }}
          >
            <img src={mark} width={28} height={32} alt="" />
            <div style={{ display: "flex", marginLeft: 12, fontSize: 16, letterSpacing: 2 }}>ANDI MALAJ</div>
          </div>
        </div>
        <div style={{ width: 860, height: "100%", display: "flex", position: "relative" }}>
          <img src={work} width={860} height={630} alt="" style={{ objectFit: "cover" }} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 176,
              background: "#111111",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 40px",
            }}
          >
            <div style={{ display: "flex", fontSize: 16, letterSpacing: 3, color: "#8eb0ff" }}>
              {project.number} / {project.category.toUpperCase()}
            </div>
            <div style={{ display: "flex", marginTop: 8, fontSize: 48, lineHeight: 1, letterSpacing: -1.5 }}>
              {project.title}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
