import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { GALERI_KATEGORI_LABEL } from "@/lib/utils";
import type { GaleriKategori } from "@/types";

export const revalidate = 60;

const KATEGORI_ORDER: GaleriKategori[] = ["KINERJA_UTAMA", "CAPAIAN", "AKTIVITAS"];
const PREVIEW_COUNT = 6;

async function getData() {
  const [galeri, settings] = await Promise.all([
    prisma.galeri.findMany({ orderBy: { urutan: "asc" } }),
    prisma.siteSettings.findUnique({ where: { id: "settings" } }),
  ]);
  return { galeri, settings };
}

export default async function GaleriPage() {
  const { galeri, settings } = await getData();

  return (
    <>
      <Navbar />
      <main className="bg-brand-blue-light/30">
        <section className="mx-auto max-w-6xl px-4 py-10 text-center md:px-8">
          <h1 className="section-title mx-auto block w-fit">Galeri BPJS Yogyakarta</h1>
        </section>

        {KATEGORI_ORDER.map((kategori) => {
          const items = galeri.filter((g) => g.kategori === kategori).slice(0, PREVIEW_COUNT);
          if (items.length === 0) return null;

          return (
            <section key={kategori} className="mx-auto max-w-6xl px-4 pb-10 md:px-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                {GALERI_KATEGORI_LABEL[kategori]}
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <figure key={item.id} className="card-surface overflow-hidden">
                    <div className="relative h-48 w-full bg-gray-100">
                      <Image src={item.foto} alt={item.keterangan} fill className="object-cover" />
                    </div>
                    <figcaption className="bg-gray-50 p-3 text-xs text-gray-600">
                      {item.keterangan}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className="mt-3 text-right">
                <a href={`/galeri/${kategori.toLowerCase()}`} className="text-sm font-semibold text-brand-blue hover:underline">
                  Selengkapnya →
                </a>
              </div>
            </section>
          );
        })}
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
