import type { Metadata } from "next";
import { Fraunces, Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

// Typography. Two display serifs coexist by design (auditoria-ux-ui/HANDOFF_UI §1.2 +
// prototype): Fraunces drives the paper "direction A" surfaces (landing/onboarding —
// Ola 1), Instrument Serif is kept for the nocturnal "direction B" climax (teaser/
// constellation — Ola 3). Body is Hanken Grotesk. All self-hosted at build time by
// next/font (no runtime Google request) — satisfies UI-SPEC A14 privacy. Exposed as CSS
// custom properties consumed by --font-display (default) / --font-display-fraunces
// (.dm-paper override) / --font-sans in globals.css.
const displayFraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-display-fraunces",
  display: "swap",
});

const displaySerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display-serif",
  display: "swap",
});

const bodySans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DescubreMe",
  description:
    "Plataforma de autoconocimiento profundo con rigor psicometrico para adultos LATAM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-CO"
      className={`${displayFraunces.variable} ${displaySerif.variable} ${bodySans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
