import Image from "next/image";
import { MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

// Foto struktur organisasi sementara — tampil hanya kalau admin belum
// mengunggah file struktur organisasi lewat halaman admin. Begitu admin
// upload lewat halaman admin, data asli (strukturFile.fileUrl) otomatis
// menggantikan foto contoh ini.
const DEMO_STRUKTUR_URL = "/images/strukturorganisasi.png";

// Data Timeline — tetap (fixed), tidak diambil dari database / tidak bisa
// diubah lewat halaman admin.
const TIMELINE_DATA = [
  { id: "t1", tanggal: "5 Desember 1977", judul: "Perum ASTEK (Asuransi Sosial Tenaga Kerja)" },
  { id: "t2", tanggal: "1995", judul: "PT Jamsostek (Persero)" },
  { id: "t3", tanggal: "1 Januari 2014", judul: "BPJS Ketenagakerjaan Yogyakarta" },
];

// Data Visi & Misi — tetap (fixed), tidak diambil dari database / tidak
// bisa diubah lewat halaman admin.
const VISI_MISI_DATA = {
  visi: "Mewujudkan Jaminan Sosial Ketenagakerjaan yang Terpercaya, Berkelanjutan dan Menyejahterakan Seluruh Pekerja Indonesia",
  misi: [
    "Melindungi, Melayani & Menyejahterakan Pekerja dan Keluarga",
    "Memberikan rasa Aman, Mudah & Nyaman untuk Meningkatkan Produktivitas dan Daya Saing Peserta",
    "Memberikan Kontribusi dalam Pembangunan dan Perekonomian Bangsa dengan Tata Kelola Baik",
  ],
};

async function getData() {
  const [sejarah, strukturFile, settings] = await Promise.all([
    prisma.sejarah.findFirst(),
    prisma.strukturOrganisasiFile.findUnique({ where: { id: "struktur" } }),
    prisma.siteSettings.findUnique({ where: { id: "settings" } }),
  ]);
  return { sejarah, strukturFile, settings };
}

export default async function TentangKamiPage() {
  const { sejarah, strukturFile, settings } = await getData();

  // Kalau admin belum upload struktur organisasi, pakai foto contoh di atas.
  const strukturUrl = strukturFile?.fileUrl || DEMO_STRUKTUR_URL;
  const strukturIsPdf = strukturFile?.fileUrl ? strukturFile.fileType === "pdf" : false;

  return (
    <>
      <Navbar />
      <main className="bg-brand-blue-light/40">
        {/* Sejarah */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-8">
        <h2 className="section-title mx-auto mb-4 block w-fit">Sejarah Singkat</h2>
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" />   {/* garis biru kiri */}
          <div className="h-2 w-2 rounded-full bg-[#68B545]" />         {/* bulat hijau tengah */}
          <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" />   {/* garis biru kanan */}
        </div>
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <p className="italic text-gray-600">
            &ldquo;{sejarah?.isi ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}&rdquo;
          </p>
          <div className="relative h-56 w-full overflow-hidden rounded-lg shadow-card">
            <Image src="/images/sejarah.jpg" alt="Kantor BPJS Ketenagakerjaan" fill className="object-cover" />
          </div>
        </div>
      </section>

        {/* Timeline */}
        <section className="mx-auto max-w-5xl px-4 pb-12 md:px-8">
          <h2 className="section-title mx-auto mb-4 block w-fit">Timeline</h2>
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" />   {/* garis biru kiri */}
            <div className="h-2 w-2 rounded-full bg-[#68B545]" />         {/* bulat hijau tengah */}
            <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" />   {/* garis biru kanan */}
          </div>

          <div className="rounded-xl bg-brand-blue-light p-8">
            <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
              <div className="absolute left-0 right-0 top-[46px] hidden h-0.5 bg-brand-blue md:block" />
              {TIMELINE_DATA.map((t) => (
                <div key={t.id} className="relative text-center">
                  <p className="mb-3 font-bold text-gray-800">{t.tanggal}</p>
                  <span className="relative z-10 mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-white shadow">
                    <MapPin size={16} />
                  </span>
                  <p className="mt-3 text-sm text-gray-600">{t.judul}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="mx-auto max-w-5xl px-4 pb-12 md:px-8">
          <h2 className="section-title mx-auto mb-4 block w-fit">Visi &amp; Misi</h2>
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" />   {/* garis biru kiri */}
            <div className="h-2 w-2 rounded-full bg-[#68B545]" />         {/* bulat hijau tengah */}
            <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" />   {/* garis biru kanan */}
          </div>
          <div className="rounded-xl bg-green-50 p-6 md:p-8">
            <h3 className="mb-2 font-bold text-gray-800">Visi</h3>
            <p className="mb-6 rounded-lg bg-green-100 p-4 text-sm text-gray-700">{VISI_MISI_DATA.visi}</p>
            <h3 className="mb-2 font-bold text-gray-800">Misi</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
              {VISI_MISI_DATA.misi.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
        </section>

        {/* Struktur Organisasi */}
        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8">
          <h2 className="section-title mx-auto mb-4 block w-fit text-center">
            Struktur Organisasi BPJS Ketenagakerjaan Yogyakarta
          </h2>
          <div className="mb-8 flex items-center justify-center gap-2">
            <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" />   {/* garis biru kiri */}
            <div className="h-2 w-2 rounded-full bg-[#68B545]" />         {/* bulat hijau tengah */}
            <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" />   {/* garis biru kanan */}
          </div>
          <div className="card-surface p-4 text-center sm:p-6">
            {strukturIsPdf ? (
              <a
                href={strukturUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-blue underline"
              >
                Lihat Struktur Organisasi (PDF)
              </a>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={strukturUrl}
                alt="Struktur Organisasi BPJS Ketenagakerjaan Yogyakarta"
                className="mx-auto h-auto w-full max-w-full rounded-lg"
              />
            )}
          </div>
        </section>
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}