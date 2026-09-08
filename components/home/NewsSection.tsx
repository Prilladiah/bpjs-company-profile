"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Berita } from "@/types";
import { formatTanggalIndonesia } from "@/lib/utils";

function normalizeLink(link?: string | null) {
  if (!link) return "#";
  return /^https?:\/\//i.test(link) ? link : `https://${link}`;
}

// Data sementara — tampil hanya kalau belum cukup data "Berita" di database.
// Begitu admin menambahkan/lengkapi data lewat halaman Kelola Berita,
// data asli akan otomatis menggantikan data contoh ini.
const DEMO_BERITA: Berita[] = [
  {
    id: "demo-1",
    keterangan: "BPJS Ketenagakerjaan Yogyakarta dan PT SGM dorong MLT perumahan pekerja",
    tanggal: "2026-08-07",
    link: "https://jogja.antaranews.com/berita/846797/bpjs-ketenagakerjaan-yogyakarta-dan-pt-sgm-dorong-mlt-perumahan-pekerja",
    foto: "/images/berita1.png",
  },
  {
    id: "demo-2",
    keterangan: "Pekerja Lebih Sejahtera, BPJS Ketenagakerjaan Jogja Perkuat Kolaborasi",
    tanggal: "2026-08-07",
    link: "https://news.harianjogja.com/r-1266436/pekerja-lebih-sejahtera-bpjs-ketenagakerjaan-jogja-perkuat-kolaborasi",
    foto: "/images/berita1.png",
  },
  {
    id: "demo-3",
    keterangan: "BPJS Ketenagakerjaan gandeng Tepo Seliro lindungi pelaku usaha Jogja",
    tanggal: "2026-08-08",
    link: "https://jogja.antaranews.com/berita/846907/bpjs-ketenagakerjaan-gandeng-tepo-seliro-lindungi-pelaku-usaha-jogja",
    foto: "/images/berita3.png",
  },
  {
    id: "demo-4",
    keterangan: "Gandeng Komunitas Malioboro, BPJS Ketenagakerjaan Perluas Perlindungan",
    tanggal: "2026-08-08",
    link: "https://jogjapolitan.harianjogja.com/r-1266833/gandeng-komunitas-malioboro-bpjs-ketenagakerjaan-perluas-perlindungan",
    foto: "/images/berita3.png",
  },
  {
    id: "demo-5",
    keterangan: "Diterjunkan ke Masyarakat, Mahasiswa KKN UII Dilindungi BPJS Ketenagakerjaan",
    tanggal: "2026-08-11",
    link: "https://www.krjogja.com/kampus/1247485848/diterjunkan-ke-masyarakat-mahasiswa-kkn-uii-dilindungi-bpjs-ketenagakerjaan",
    foto: "/images/berita5.png",
  },
  {
    id: "demo-6",
    keterangan: "3.174 Mahasiswa UII KKN, Semua Dapat Perlindungan BPJS Ketenagakerjaan",
    tanggal: "2026-08-11",
    link: "https://news.harianjogja.com/r-1266931/3174-mahasiswa-uii-kkn-semua-dapat-perlindungan-bpjs-ketenagakerjaan",
    foto: "/images/berita5.png",
  },
  {
    id: "demo-7",
    keterangan: "BPJS Ketenagakerjaan lindungi 3.174 mahasiswa KKN UII Yogyakarta",
    tanggal: "2026-08-11",
    link: "https://jogja.antaranews.com/berita/847492/bpjs-ketenagakerjaan-lindungi-3174-mahasiswa-kkn-uii-yogyakarta",
    foto: "/images/berita5.png",
  },
  {
    id: "demo-8",
    keterangan: "Dari Persoalan Lingkungan, Tumbuh Sebuah Gerakan yang Memberi Manfaat Bagi Masyarakat",
    tanggal: "2026-08-13",
    link: "https://www.krjogja.com/bantul/1247488779/dari-persoalan-lingkungan-tumbuh-sebuah-gerakan-yang-memberi-manfaat-bagi-masyarakat",
    foto: "/images/beritabpjs.jpg",
  },
  {
    id: "demo-9",
    keterangan: "Olah Sampah Jadi Energi, Pekerja GO-SARI Kini Dilindungi BPJamsostek",
    tanggal : "2026-08-15",
    link: "https://jogjapolitan.harianjogja.com/r-1267376/olah-sampah-jadi-energi-pekerja-go-sari-kini-dilindungi-bpjamsostek",
    foto: "/images/beritabpjs.jpg",
  },
] as unknown as Berita[];

export default function NewsSection({ items }: { items: Berita[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sourceItems = items.length > 0 ? items : DEMO_BERITA;

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: dir * 600,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#EEF3F8] py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-black">
              Berita &amp; Kegiatan
            </h2>

            <div className="mt-2 flex items-center gap-2">
              <div className="h-[3px] w-20 rounded-full bg-[#0057A8]" />
              <div className="h-2 w-2 rounded-full bg-[#68B545]" />
              <div className="h-[3px] w-20 rounded-full bg-[#0057A8]" />
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {sourceItems.map((item) => (
              <article
                key={item.id}
                className="w-[260px] min-h-[360px] flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <a
                  href={normalizeLink(item.link)}
                  target={item.link && item.link.trim() !== "" ? "_blank" : undefined}
                  rel={item.link ? "noopener noreferrer" : undefined}
                  className="block h-full"
                  onClick={(e) => {
                    if (!item.link || item.link.trim() === "") {
                      e.preventDefault();
                    }
                  }}
                >
                  {/* Foto */}
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={item.foto || "/images/beritabpjs.jpg"}
                      alt={item.keterangan}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Konten */}
                  <div className="flex h-[calc(100%-160px)] flex-col p-4">
                    <h3 className="text-sm font-semibold leading-6 text-gray-900">
                      {item.keterangan}
                    </h3>

                    <p className="mt-3 text-xs text-gray-500">
                      {formatTanggalIndonesia(item.tanggal)}
                    </p>

                    <div className="mt-auto border-t border-gray-100 pt-3">
                      <Image
                        src="/images/logobpjs.png"
                        alt="BPJS Ketenagakerjaan"
                        width={110}
                        height={30}
                        className="h-7 w-auto object-contain"
                      />
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>

          {/* Tombol Panah */}
          {sourceItems.length > 1 && (
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => scroll(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition hover:border-[#0057A8] hover:text-[#0057A8]"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={() => scroll(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition hover:border-[#0057A8] hover:text-[#0057A8]"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}