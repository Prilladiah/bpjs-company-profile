import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import {
  ShieldCheck,
  Users,
  PiggyBank,
  UserCheck,
  Briefcase,
  Smartphone,
  Laptop,
  Building2,
  Phone,
} from "lucide-react";

export const revalidate = 60;

const ICONS: Record<string, any> = {
  "shield-plus": ShieldCheck,
  users: Users,
  "piggy-bank": PiggyBank,
  "user-check": UserCheck,
  briefcase: Briefcase,
  smartphone: Smartphone,
  laptop: Laptop,
  building: Building2,
  phone: Phone,
};

async function getData() {
  const [programUtama, layananTambahan, settings] = await Promise.all([
    prisma.layanan.findMany({ where: { kategori: "PROGRAM_UTAMA" }, orderBy: { urutan: "asc" } }),
    prisma.layanan.findMany({ where: { kategori: "LAYANAN_TAMBAHAN" }, orderBy: { urutan: "asc" } }),
    prisma.siteSettings.findUnique({ where: { id: "settings" } }),
  ]);
  return { programUtama, layananTambahan, settings };
}

const PROGRAM_UNGGULAN = [
  { no: 1, judul: "G54-GERAKAN 50.400", desc: "Perluasan perlindungan pekerja melalui iuran terjangkau." },
  { no: 2, judul: "OPTIMALISASI MLT PERUMAHAN", desc: "Memperluas akses layanan manfaat tambahan bagi peserta." },
  { no: 3, judul: "SRAWUNG UNTUK MELINDUNGI", desc: "Pendekatan komunitas dan engagement untuk memperluas kepesertaan." },
  { no: 4, judul: "DIGITALISASI LAYANAN", desc: "Optimalisasi JMO dan kanal digital untuk kemudahan peserta." },
  { no: 5, judul: "PROGRAM SEJAHTERAKAN PEKERJA SEKITAR (SERTAKAN)", desc: "Memberikan perlindungan kepada pekerja di sekitar wilayah kerja untuk kesejahteraan bersama." },
  { no: 6, judul: "GARWA SURGA", desc: "" },
];

export default async function LayananPage() {
  const { programUtama, layananTambahan, settings } = await getData();

  return (
    <>
      <Navbar />
      <main className="bg-brand-blue-light/30">
        {/* Program Unggulan */}
        <section className="mx-auto max-w-6xl px-4 py-12 text-center md:px-8">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Program Unggulan &amp; Layanan BPJS</h1>
          <p className="mt-1 text-sm text-gray-500">Bergerak Melampaui Layanan, Menciptakan Dampak.</p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {PROGRAM_UNGGULAN.map((p) => (
              <div key={p.no} className="card-surface flex flex-col items-center p-4 text-center">
                <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
                  {p.no}
                </span>
                <p className="text-xs font-bold text-gray-800">{p.judul}</p>
                {p.desc && <p className="mt-1 text-[11px] text-gray-500">{p.desc}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Program Utama */}
        <section className="mx-auto max-w-5xl px-4 pb-12 md:px-8">
          <h2 className="section-title mx-auto mb-8 block w-fit text-center">Program Utama BPJS Yogyakarta</h2>
          <div className="space-y-4 rounded-xl bg-brand-blue-light p-6">
            {programUtama.map((l) => {
              const Icon = ICONS[l.icon ?? ""] ?? ShieldCheck;
              return (
                <div key={l.id} className="flex gap-4 rounded-lg bg-white p-4 shadow-card">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border-2 border-brand-blue text-brand-blue">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-800">{l.nama}:</h3>
                    <p className="mt-1 text-sm text-gray-600">{l.deskripsi}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Layanan Tambahan */}
        <section className="mx-auto max-w-5xl px-4 pb-16 md:px-8">
          <h2 className="section-title mx-auto mb-8 block w-fit text-center">Layanan BPJS Yogyakarta</h2>
          <div className="space-y-4 rounded-xl bg-brand-blue-light p-6">
            {layananTambahan.map((l) => {
              const Icon = ICONS[l.icon ?? ""] ?? Smartphone;
              return (
                <div key={l.id} className="flex gap-4 rounded-lg bg-white p-4 shadow-card">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-brand-blue text-white">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-800">{l.nama}:</h3>
                    <p className="mt-1 text-sm text-gray-600">{l.deskripsi}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
