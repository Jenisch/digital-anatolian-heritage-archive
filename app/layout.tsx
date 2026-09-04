import type { Metadata } from "next";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import "./explorer.css";
import "./visual-dossier.css";

export const metadata: Metadata = {
  title: "Digital Anatolian Heritage Archive",
  description:
    "A digital humanities project exploring Anatolia's archaeological and cultural heritage through structured data, chronology, mapping, and scholarly sources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
