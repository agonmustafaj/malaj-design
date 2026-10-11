import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.studio,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F5F3EE",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: site.email,
  telephone: "+38349588161",
  url: site.url,
  description: site.description,
  worksFor: {
    "@type": "Organization",
    name: site.studio,
  },
  address: {
    "@type": "Place",
    name: "Prishtina, Kosovo",
  },
  knowsAbout: [
    "Brand Identity",
    "Poster Design",
    "Mascot Design",
    "Typography",
    "Stationery",
    "Cover Design",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg font-sans text-ink">
        <Providers>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <div id="top" />
          <Navbar />
          <CustomCursor />
          {children}
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
