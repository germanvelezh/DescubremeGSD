import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter Variable, self-hosted at build time by next/font (no runtime Google
// request) — satisfies UI-SPEC A14 privacy requirement. Exposed as the
// `--font-inter` custom property consumed by `--font-sans` in globals.css.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="es-CO" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
