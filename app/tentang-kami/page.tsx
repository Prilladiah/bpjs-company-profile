import Image from "next/image";
import { MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

async function getData() {
  const [sejarah, timeline, visiMisi, struktur, settings] = await Promise.all([
    prisma.sejarah.findFirst(),
    prisma.timelineItem.findMany({ orderBy: { urutan: "asc" } }),
    prisma.visiMisi.findFirst(),
    prisma.strukturOrganisasi.findMany({
      where: { parentId: null },
      include: { children: { orderBy: { urutan: "asc" } } },
      orderBy: { urutan: "asc" },
    }),
    prisma.siteSettings.findUnique({ where: { id: "settings" } }),
  ]);
  return { sejarah, timeline, visiMisi, struktur, settings };
}

export default async function TentangKamiPage() {
  const { sejarah, timeline, visiMisi, struktur, settings } = await getData();

  return (
    <>
      <Navbar />
      <main className="bg-brand-blue-light/40">
        {/* Sejarah */}
        <section className="mx-auto max-w-5xl px-4 py-12 md:px-8">
          <h2 className="section-title mx-auto mb-8 block w-fit">Sejarah Singkat</h2>
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <p className="italic text-gray-600">
              &ldquo;{sejarah?.isi ?? "Sejarah singkat belum diisi."}&rdquo;
            </p>
            <div className="relative h-56 w-full overflow-hidden rounded-lg shadow-card">
              <Image src="/images/kantor-bpjs.jpg" alt="Kantor BPJS Ketenagakerjaan" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mx-auto max-w-5xl px-4 pb-12 md:px-8">
          <h2 className="section-title mx-auto mb-10 block w-fit">TIMELINE</h2>
          <div className="relative rounded-xl bg-brand-blue-light p-8">
            <div className="absolute left-8 right-8 top-[52px] hidden h-0.5 bg-brand-blue md:block" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {timeline.map((t) => (
                <div key={t.id} className="text-center">
                  <MapPin className="mx-auto mb-2 text-brand-blue" />
                  <p className="font-bold text-gray-800">{t.tanggal}</p>
                  <p className="mt-1 text-sm text-gray-600">{t.judul}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="mx-auto max-w-5xl px-4 pb-12 md:px-8">
          <h2 className="section-title mx-auto mb-8 block w-fit">Visi &amp; Misi</h2>
          <div className="rounded-xl bg-green-50 p-6 md:p-8">
            <h3 className="mb-2 font-bold text-gray-800">Visi</h3>
            <p className="mb-6 rounded-lg bg-green-100 p-4 text-sm text-gray-700">{visiMisi?.visi}</p>
            <h3 className="mb-2 font-bold text-gray-800">Misi</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
              {visiMisi?.misi.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
        </section>

        {/* Struktur Organisasi */}
        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8">
          <h2 className="section-title mx-auto mb-8 block w-fit text-center">
            Struktur Organisasi BPJS Ketenagakerjaan Yogyakarta
          </h2>
          <div className="card-surface overflow-x-auto p-6">
            {struktur.map((kepala) => (
              <div key={kepala.id} className="flex min-w-[700px] flex-col items-center">
                <div className="rounded-md bg-brand-blue px-6 py-3 text-center text-sm font-bold text-white">
                  {kepala.jabatan.toUpperCase()}
                  <div className="text-xs font-normal">{kepala.nama}</div>
                </div>
                <div className="h-8 w-0.5 bg-gray-300" />
                <div className="flex flex-wrap justify-center gap-4">
                  {kepala.children?.map((c) => (
                    <div
                      key={c.id}
                      className="w-40 rounded-md bg-gray-100 px-3 py-2 text-center text-xs font-semibold text-gray-700"
                    >
                      {c.jabatan}
                      <div className="mt-1 font-normal text-gray-500">{c.nama}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
