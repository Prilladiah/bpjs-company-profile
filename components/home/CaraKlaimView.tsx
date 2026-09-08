import Link from "next/link";
import type { ElementType } from "react";
import { ListChecks, FileText, Files, FileCheck2, ArrowRight } from "lucide-react";
import { cn, slugify } from "@/lib/utils";
import type { Layanan } from "@/types";

interface LangkahKlaim {
  id: string;
  judul: string;
  icon: string | null;
}

/**
 * ATUR GAMBAR & WARNA KHAS TIAP JENIS KLAIM DI SINI.
 *
 * "key" harus SAMA PERSIS dengan slug nama layanan di database.
 * Cara cek slug yang benar: buka halaman, klik salah satu tab,
 * lihat URL di address bar -> itu slug-nya.
 *
 * "src"   = path gambar (taruh file-nya di public/images/)
 * "color" = warna border kartu saat aktif, samakan dengan warna icon
 */
const KLAIM_VISUAL: Record<string, { src: string; color: string }> = {
  "jaminan-hari-tua-jht": {
    src: "/images/JHT.png",
    color: "border-emerald-500",
  },
  "jaminan-kematian-jkm": {
    src: "/images/JKM.png",
    color: "border-purple-500",
  },
  "jaminan-kecelakaan-kerja-jkk": {
    src: "/images/JKK.png",
    color: "border-teal-500",
  },
  "jaminan-pensiun-jp": {
    src: "/images/JP.png",
    color: "border-green-600",
  },
  "jaminan-kehilangan-pekerjaan-jkp": {
    src: "/images/JKP.png",
    color: "border-amber-500",
  },
};

const DEFAULT_VISUAL = {
  src: "/images/cara-klaim/default.png",
  color: "border-brand-blue",
};

function getVisual(nama: string) {
  return KLAIM_VISUAL[slugify(nama)] ?? DEFAULT_VISUAL;
}

/**
 * Pemetaan nama icon (dari field `icon` di database, diisi lewat seed.ts)
 * ke komponen ikon lucide-react yang dipakai di kartu "Cara Klaim".
 */
const STEP_ICONS: Record<string, ElementType> = {
  "list-checks": ListChecks,
  "file-text": FileText,
  "file-stack": Files,
  "file-check": FileCheck2,
};

function getStepIcon(icon: string | null): ElementType {
  return (icon && STEP_ICONS[icon]) || FileText;
}

export default function CaraKlaimView({
  layanan,
  langkah,
  active,
}: {
  layanan: Layanan[];
  langkah: LangkahKlaim[];
  active: Layanan;
}) {
  return (
    <>
      {/* Jenis Klaim tabs - klik = pindah halaman/URL (bukan cuma ganti state) */}
    <section className="mx-auto max-w-5xl px-4 py-12 text-center md:px-8">
      <div className="flex flex-col items-center mb-8">
        <h2 className="section-title mb-3">Jenis Klaim</h2>
        <div className="flex items-center gap-2">
          <div className="h-[3px] w-20 rounded-full bg-[#0057A8]" />
          <div className="h-2 w-2 rounded-full bg-[#68B545]" />
          <div className="h-[3px] w-20 rounded-full bg-[#0057A8]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {layanan.map((l) => {
            const isActive = l.id === active.id;
            const visual = getVisual(l.nama);
            return (
              <Link
                key={l.id}
                href={`/cara-klaim/${slugify(l.nama)}`}
                className={cn(
                  "card-surface flex flex-col items-center gap-2 border-2 p-4 text-center transition",
                  isActive
                    ? cn(visual.color, "ring-2 ring-offset-1")
                    : "border-gray-200 hover:border-brand-blue"
                )}
              >
                {/*
                  Ukuran ikon dikunci 40x40 supaya sejajar. Kalau gambarnya
                  beda-beda proporsi dan kelihatan besar/kecil sebelah, tambahkan
                  style={{ transform: "scale(x) translateY(y)" }} per item.
                */}
                <span className="flex h-10 w-10 items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={visual.src} alt={l.nama} className="h-full w-full object-contain" />
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  {l.nama.replace(/\s*\(.*\)/, "")}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Cara Klaim steps - sama untuk semua jenis klaim */}
    <section className="mx-auto max-w-5xl px-4 pb-12 md:px-8">
        <div className="flex flex-col items-center mb-8">
          <h2 className="section-title mb-3 text-center">Cara Klaim</h2>
          <div className="flex items-center gap-2">
            <div className="h-[3px] w-20 rounded-full bg-[#0057A8]" />
            <div className="h-2 w-2 rounded-full bg-[#68B545]" />
            <div className="h-[3px] w-20 rounded-full bg-[#0057A8]" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {langkah.map((step, i) => {
            const StepIcon = getStepIcon(step.icon);
            return (
              <div key={step.id} className="flex items-center gap-3">
                <div className="card-surface flex w-28 flex-col items-center gap-2 p-4 text-center">
                  <StepIcon className="text-brand-blue" size={26} />
                  <span className="text-xs font-medium text-gray-700">{step.judul}</span>
                </div>
                {i < langkah.length - 1 && <ArrowRight className="text-brand-blue" size={20} />}
              </div>
            );
          })}
        </div>
      </section>

      {/* Detail layanan aktif (berganti sesuai URL/slug) */}
      <section className="mx-auto max-w-5xl px-4 pb-16 md:px-8">
        <h3 className="mb-3 text-xl font-bold text-gray-900">{active.nama}</h3>
        <div className="mb-8 rounded-lg bg-brand-blue-light p-5 text-sm text-gray-700">
          {active.deskripsi}
        </div>

        {active.kriteriaKonten && (
          <>
            <h3 className="mb-3 text-xl font-bold text-gray-900">{active.kriteriaJudul}</h3>
            <div
              className="prose prose-sm max-w-none rounded-lg bg-brand-blue-light p-5 text-sm text-gray-700
                         [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
                         [&_ol]:mt-1 [&_p]:mb-3 last:[&_p]:mb-0 [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: active.kriteriaKonten }}
            />
          </>
        )}
      </section>
    </>
  );
}