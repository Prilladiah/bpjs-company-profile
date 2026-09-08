import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { GALERI_KATEGORI_LABEL } from "@/lib/utils";
import type { GaleriKategori } from "@/types";

export const revalidate = 60;

const VALID_KATEGORI: GaleriKategori[] = ["KINERJA_UTAMA", "CAPAIAN", "AKTIVITAS"];

async function getData(kategori: GaleriKategori) {
  const [galeri, settings] = await Promise.all([
    prisma.galeri.findMany({
      where: { kategori },
      orderBy: { urutan: "asc" },
    }),
    prisma.siteSettings.findUnique({ where: { id: "settings" } }),
  ]);
  return { galeri, settings };
}

export default async function GaleriKategoriPage({
  params,
}: {
  params: Promise<{ kategori: string }>;
}) {
  const { kategori: slug } = await params;
  const kategoriUpper = slug.toUpperCase() as GaleriKategori;

  if (!VALID_KATEGORI.includes(kategoriUpper)) {
    notFound();
  }

  const { galeri, settings } = await getData(kategoriUpper);

  return (
    <>
      <Navbar />
      <main className="bg-brand-blue-light/30">
        {/* Tombol back kecil, di bawah header, rata kiri */}
        <div className="mx-auto max-w-6xl px-8 pt-6 md:px-8">
          <Link
            href="/galeri"
            className="inline-flex items-center rounded-md p-2 text-gray-600 transition hover:bg-white hover:text-brand-blue"
          >
            <ArrowLeft size={30} strokeWidth={3} />
          </Link>
        </div>

        <section className="mx-auto max-w-6xl px-4 py-6 text-center md:px-8">
          <h1 className="section-title mx-auto block w-fit">
            {GALERI_KATEGORI_LABEL[kategoriUpper]}
          </h1>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8">
          {galeri.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada foto di kategori ini.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {galeri.map((item) => (
                <figure key={item.id} className="card-surface overflow-hidden">
                  <div className="relative h-56 w-full bg-gray-100">
                    <Image src={item.foto} alt={item.keterangan} fill className="object-cover" />
                  </div>
                  <figcaption className="bg-gray-50 p-3 text-sm leading-relaxed text-gray-600">
                    {item.keterangan}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}