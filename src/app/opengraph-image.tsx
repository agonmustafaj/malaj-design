import { ogContentType, ogSize, siteOgImage } from "@/lib/og";

export const alt = "Malaj Design | Andi Malaj, Graphic Designer";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return siteOgImage();
}
