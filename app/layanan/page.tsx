import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

async function getData() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "settings" } });
  return { settings };
}

// Tinggal ganti "src" di bawah ini dengan path gambar yang kamu mau.
// Taruh SEMUA file gambar Program Unggulan di satu folder: public/images/unggulan/
// "scale"   = kontrol besar-kecil gambar (1 = normal, >1 diperbesar, <1 diperkecil)
// "offsetY" = kontrol naik/turun gambar dalam px (negatif = naik, positif = turun)
// Ubah angkanya lalu cek hasilnya di browser, ulangi sampai semua sejajar & sama besar.
const PROGRAM_UNGGULAN = [
  {
    no: 1,
    src: "/images/1PUL.png",
    judul: "G54-GERAKAN 50.400",
    desc: "Perluasan perlindungan pekerja melalui iuran terjangkau.",
    scale: 1.8,
    offsetY: 0,
  },
  {
    no: 2,
    src: "/images/2PUL.png",
    judul: "OPTIMALISASI MLT PERUMAHAN",
    desc: "Memperluas akses layanan manfaat tambahan bagi peserta.",
    scale: 1,
    offsetY: 4,
  },
  {
    no: 3,
    src: "/images/3PUL.png",
    judul: "SRAWUNG UNTUK MELINDUNGI",
    desc: "Pendekatan komunitas dan engagement untuk memperluas kepesertaan.",
    scale: 1.9,
    offsetY: 0,
  },
  {
    no: 4,
    src: "/images/4PUL.png",
    judul: "DIGITALISASI LAYANAN",
    desc: "Optimalisasi JMO dan kanal digital untuk kemudahan peserta.",
    scale: 1.9,
    offsetY: 0,
  },
  {
    no: 5,
    src: "/images/5PUL.png",
    judul: "PROGRAM SEJAHTERAKAN PEKERJA SEKITAR (SERTAKAN)",
    desc: "Memberikan perlindungan kepada pekerja di sekitar wilayah kerja untuk kesejahteraan bersama.",
    scale: 1.9,
    offsetY: -1,
  },
];

// Program Utama BPJS (5 program) — taruh gambar di: public/images/program-utama/
const PROGRAM_UTAMA = [
  {
    no: 1,
    src: "/images/JKK.png",
    judul: "Jaminan Kecelakaan Kerja (JKK)",
    desc: "Memberikan perlindungan dan biaya pengobatan atas risiko kecelakaan kerja atau penyakit akibat kerja.",
  },
  {
    no: 2,
    src: "/images/JKM.png",
    judul: "Jaminan Kematian (JKM)",
    desc: "Memberikan santunan dan manfaat uang tunai kepada ahli waris ketika peserta meninggal dunia bukan karena kecelakaan kerja.",
  },
  {
    no: 3,
    src: "/images/JHT.png",
    judul: "Jaminan Hari Tua (JHT)",
    desc: "Program tabungan jangka panjang di mana uang tunai akan dibayarkan sekaligus saat peserta memasuki usia pensiun, mengalami cacat total, atau meninggal dunia.",
  },
  {
    no: 4,
    src: "/images/JP.png",
    judul: "Jaminan Pensiun (JP)",
    desc: "Program berkala yang bertujuan mempertahankan derajat kehidupan yang layak saat peserta memasuki usia pensiun atau mengalami cacat total.",
  },
  {
    no: 5,
    src: "/images/JKP.png",
    judul: "Jaminan Kehilangan Pekerjaan (JKP)",
    desc: "Memberikan manfaat berupa uang tunai, akses informasi pasar kerja, dan pelatihan kerja bagi pekerja yang mengalami pemutusan hubungan kerja (PHK).",
  },
];

// Layanan BPJS (4 layanan) — taruh gambar di: public/images/layanan/
const LAYANAN_BPJS = [
  {
    no: 1,
    src: "/images/1layanan.png",
    judul: "Aplikasi JMO (Jamsostek Mobile)",
    desc: "Digunakan untuk klaim saldo JHT di bawah batas tertentu, cek saldo, dan pendaftaran mandiri dengan proses pencairan dalam hitungan menit.",
  },
  {
    no: 2,
    src: "/images/2layanan.png",
    judul: "Lapak Asik (Online)",
    desc: "Layanan klaim online melalui website resmi Cara Klaim BPJS Ketenagakerjaan bagi peserta yang memenuhi syarat dokumen.",
  },
  {
    no: 3,
    src: "/images/3layanan.jpg",
    judul: "Kantor Cabang",
    desc: "Datang langsung ke kantor cabang terdekat untuk layanan tatap muka pada hari kerja (Senin–Jumat pukul 09.00–15.00 WIB).",
  },
  {
    no: 4,
    src: "/images/4layanan.png",
    judul: "Call Center / Layanan Masyarakat",
    desc: "Hubungi nomor 175 untuk informasi dan pengaduan.",
  },
];

export default async function LayananPage() {
  const { settings } = await getData();

  return (
    <>
      <Navbar />
      <main className="bg-brand-blue-light/30">
        {/* Program Unggulan */}
        <section className="mx-auto max-w-6xl px-4 py-12 text-center md:px-8">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Program Unggulan &amp; Layanan BPJS
          </h2>
          <div className="mb-8 mt-6 flex items-center justify-center gap-2">
            <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" /> {/* garis biru kiri */}
            <div className="h-2 w-2 rounded-full bg-[#68B545]" /> {/* bulat hijau tengah */}
            <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" /> {/* garis biru kanan */}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Bergerak Melampaui Layanan, Menciptakan Dampak.
          </p>

          {/*
            Pakai flex-wrap + justify-center (bukan grid) supaya 5 kartu
            selalu berada di tengah, termasuk baris terakhir yang tidak penuh.
            Lebar kartu diatur lewat calc():
            - mobile : 2 kartu per baris
            - sm     : 3 kartu per baris
            - md     : 5 kartu per baris (1 baris penuh)
            Kalau mau kartu lebih lebar di desktop, ubah md:w-[calc(20%-0.8rem)].
          */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {PROGRAM_UNGGULAN.map((p) => (
              <div
                key={p.no}
                className="flex w-[calc(50%-0.5rem)] flex-col items-center rounded-xl border-2 border-brand-blue/30 bg-white p-4 text-center shadow-sm transition hover:border-brand-blue hover:shadow-md sm:w-[calc(33.333%-0.667rem)] md:w-[calc(20%-0.8rem)]"
              >
                {/*
                  Kotak ikon dikunci ukuran TETAP (h-20 w-20) supaya semua gambar
                  tampil dengan bobot visual yang sama.
                  Ganti "h-20 w-20" kalau mau ubah ukuran kotak ikon.
                */}
                <div className="mb-3 flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={p.judul}
                    className="h-full w-full object-contain"
                    style={{
                      transform: `scale(${p.scale ?? 1}) translateY(${p.offsetY ?? 0}px)`,
                    }}
                  />
                </div>

                {/*
                  Badge nomor: aspect-square + shrink-0 memastikan lingkaran selalu
                  bulat sempurna di semua ukuran layar.
                */}
                <span className="mb-2 flex aspect-square h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-bold leading-none text-white">
                  {p.no}
                </span>

                <p className="text-xs font-bold text-gray-800">{p.judul}</p>
                {p.desc && (
                  <p className="mt-1 text-[11px] text-gray-500">{p.desc}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Program Utama */}
        <section className="mx-auto max-w-5xl px-4 pb-12 md:px-8">
          <h2 className="section-title mx-auto mb-8 block w-fit text-center">
            Program Utama BPJS Yogyakarta
          </h2>
          <div className="mb-8 mt-4 flex items-center justify-center gap-2">
            <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" /> {/* garis biru kiri */}
            <div className="h-2 w-2 rounded-full bg-[#68B545]" /> {/* bulat hijau tengah */}
            <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" /> {/* garis biru kanan */}
          </div>
          <div className="space-y-4 rounded-xl bg-brand-blue-light p-6">
            {PROGRAM_UTAMA.map((l) => (
              <div
                key={l.no}
                className="flex items-start gap-4 rounded-lg bg-white p-4 shadow-card"
              >
                <div className="flex h-[80px] w-[80px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={l.src}
                    alt={l.judul}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{l.judul}:</h3>
                  <p className="mt-1 text-sm text-gray-600">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Layanan Tambahan */}
        <section className="mx-auto max-w-5xl px-4 pb-16 md:px-8">
          <h2 className="section-title mx-auto mb-8 block w-fit text-center">
            Layanan BPJS Yogyakarta
          </h2>
          <div className="mb-8 mt-4 flex items-center justify-center gap-2">
            <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" /> {/* garis biru kiri */}
            <div className="h-2 w-2 rounded-full bg-[#68B545]" /> {/* bulat hijau tengah */}
            <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" /> {/* garis biru kanan */}
          </div>
          <div className="space-y-4 rounded-xl bg-brand-blue-light p-6">
            {LAYANAN_BPJS.map((l) => (
              <div
                key={l.no}
                className="flex items-start gap-4 rounded-lg bg-white p-4 shadow-card"
              >
                <div className="flex h-[80px] w-[80px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={l.src}
                    alt={l.judul}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{l.judul}:</h3>
                  <p className="mt-1 text-sm text-gray-600">{l.desc}</p>
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