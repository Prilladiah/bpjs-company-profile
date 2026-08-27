import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BPJS Ketenagakerjaan | Kantor Cabang Yogyakarta",
  description:
    "Website resmi BPJS Ketenagakerjaan Kantor Cabang Yogyakarta - Melindungi, Melayani, dan Menyejahterakan Pekerja Indonesia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-white font-sans antialiased">{children}</body>
    </html>
  );
}
