import type { Metadata } from "next";
import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

// Direction B "Cartografía interior" typography (see auditoria-ux-ui/AUDITORIA.md).
// Display: Instrument Serif — luminous high-contrast serif for headlines.
// Body: Hanken Grotesk — warm humanist grotesque for UI/prose.
// Both self-hosted at build time by next/font (no runtime Google request) —
// satisfies UI-SPEC A14 privacy requirement. Exposed as CSS custom properties
// consumed by --font-display / --font-sans in globals.css.
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
      className={`${displaySerif.variable} ${bodySans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
