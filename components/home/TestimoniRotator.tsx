"use client";

import { useEffect, useState } from "react";
import type { KerjasamaTestimoni } from "@/types";

// Data sementara — tampil hanya kalau belum ada testimoni di database.
// Begitu admin menambahkan testimoni lewat halaman admin, data asli akan
// otomatis menggantikan data contoh ini.

const RS_INTRO =
  "BPJS Ketenagakerjaan Cabang Yogyakarta menjalin kerja sama dengan berbagai rumah sakit yang tergabung dalam jaringan Pusat Layanan Kecelakaan Kerja (PLKK) di Daerah Istimewa Yogyakarta:";

const RS_CLOSING =
  "Melalui kerja sama tersebut, peserta BPJS Ketenagakerjaan yang mengalami kecelakaan kerja maupun penyakit akibat kerja dapat memperoleh pelayanan kesehatan yang cepat, mudah, dan berkualitas, mulai dari pemeriksaan, perawatan, tindakan medis, rawat inap, hingga rehabilitasi sesuai dengan ketentuan Program Jaminan Kecelakaan Kerja (JKK).";

const RS_LIST: string[] = [
  "Charitas Hospital",
  "RS Asri Medical Center Muhammadiyah",
  "RS Bethesda Yogyakarta",
  "RS Condong Catur",
  "RS Dr. R. Soetarto",
  "RS Islam Hidayatullah",
  "RS Nur Hidayah",
  "RS Panti Nugroho",
  "RS Panti Rini",
  "RS PKU Muhammadiyah Bantul",
  "RS PKU Muhammadiyah Sleman",
  "RS PKU Muhammadiyah Wonosari",
  "RS PKU Muhammadiyah Yogyakarta",
  "RS Queen Latifa",
  "RS Rajawali Citra",
  "RS Sedayu General Hospital",
  "RSKIA PKU Muhammadiyah Kotagede",
  "RSPAU Dr. S. Hardjolukito",
  "RSU At-Turots Al-Islamy",
  "RSU Bethesda Lempuyangwangi",
  "RSU Bhayangkara Polda DIY",
  "RSU Kabupaten Sleman",
  "RSU Kharisma Paramedika",
  "RSU Mitra Paramedika Yogyakarta",
  "RSU Mitra Sehat",
  "RSU Permata Husada",
  "RSU Puri Husada",
  "RSU Queen Latifa Kulon Progo",
  "RSU Rachma Husada",
  "RSU Rizki Amalia",
  "RSU Rizki Amalia Medika",
  "RSU Santo Yusup Boro",
  "RSUD Kota Yogyakarta",
  "RSUD Nyi Ageng Serang",
  "RSUD Panembahan Senopati Bantul",
  "RSUD Prambanan",
  "RSUD Saptosari",
  "RSUD Saras Adyatma",
  "RSUD Wates",
  "RSUD Wonosari",
  "RSUP Dr. Sardjito",
  "Rumah Sakit Akademik Universitas Gadjah Mada",
  "Rumah Sakit Bethesda Wonosari",
  "Rumah Sakit Happy Land",
  "Rumah Sakit Hermina Yogya",
  "Rumah Sakit Islam Gunungkidul",
  "Rumah Sakit Islam Yogyakarta PDHI",
  "Rumah Sakit JIH Yogyakarta",
  "Rumah Sakit Khusus Bedah Ring Road Selatan",
  "Rumah Sakit Ludira Husada Tama",
  "Rumah Sakit Mata Dr. YAP",
  "Rumah Sakit Nur Rohmah",
  "Rumah Sakit Panti Rahayu",
  "Rumah Sakit Panti Rapih",
  "Rumah Sakit Paru Respira",
  "Rumah Sakit Pelita Husada",
  "Rumah Sakit PKU Muhammadiyah Gamping",
  "Rumah Sakit PKU Muhammadiyah Nanggulan",
  "Rumah Sakit Pratama Kota Yogyakarta",
  "Rumah Sakit Santa Elisabeth",
  "Rumah Sakit Siloam Yogyakarta",
  "Rumah Sakit UAD",
  "Rumah Sakit Universitas Islam Indonesia",
];

const RS_PREVIEW_COUNT = 10;

const DEMO_TESTIMONI: KerjasamaTestimoni[] = [
  {
    id: "demo-testi-1",
    isi: `${RS_INTRO}\n\n${RS_LIST.join(", ")}.\n\n${RS_CLOSING}`,
    nama: "",
    jabatan: "",
    urutan: 1,
  },
] as unknown as KerjasamaTestimoni[];

export default function TestimoniRotator({ items }: { items: KerjasamaTestimoni[] }) {
  const source = items.length > 0 ? items : DEMO_TESTIMONI;
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (source.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % source.length), 6000);
    return () => clearInterval(t);
  }, [source.length]);

  if (source.length === 0) return null;
  const current = source[index];
  const isDemo = current.id === "demo-testi-1";

  const visibleList = showAll ? RS_LIST : RS_LIST.slice(0, RS_PREVIEW_COUNT);
  const hiddenCount = RS_LIST.length - RS_PREVIEW_COUNT;

  return (
    <div className="mt-6 rounded-lg bg-gray-50 px-4 py-6 text-center sm:px-8">
      {isDemo ? (
        <>
          <p className="text-sm italic leading-relaxed text-gray-600">{RS_INTRO}</p>

          <div className="mx-auto mt-4 flex max-w-4xl flex-wrap justify-center gap-1.5">
            {visibleList.map((rs) => (
              <span
                key={rs}
                className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-gray-800 shadow-sm ring-1 ring-gray-200 sm:text-xs"
              >
                {rs}
              </span>
            ))}
          </div>

          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="mt-3 text-xs font-semibold text-brand-blue underline underline-offset-2 hover:text-brand-green"
            >
              {showAll ? "Sembunyikan" : `Lihat ${hiddenCount} rumah sakit lainnya`}
            </button>
          )}

          <p className="mx-auto mt-4 max-w-3xl text-xs italic leading-relaxed text-gray-500 sm:text-sm">
            {RS_CLOSING}
          </p>
        </>
      ) : (
        <p className="text-xs italic leading-relaxed text-gray-500 sm:text-sm">&ldquo;{current.isi}&rdquo;</p>
      )}

      {(current.nama || current.jabatan) && (
        <p className="mt-2 text-xs font-semibold text-gray-600">
          {current.nama}
          {current.nama && current.jabatan && " — "}
          {current.jabatan}
        </p>
      )}
      {source.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {source.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition ${i === index ? "bg-brand-blue" : "bg-gray-300"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}