import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="es-CO">
      <body>{children}</body>
    </html>
  );
}
