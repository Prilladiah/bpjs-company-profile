import Link from "next/link";
import Image from "next/image";
import type { Berita } from "@/types";
import { formatTanggalIndonesia } from "@/lib/utils";

export default function NewsSection({ items }: { items: Berita[] }) {
  return (
    <section className="bg-brand-blue-light py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="section-title">Berita &amp; Kegiatan</h2>
          <Link href="/galeri" className="text-sm font-semibold text-brand-blue hover:underline">
            Selengkapnya →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article key={item.id} className="card-surface overflow-hidden">
              <div className="relative h-40 w-full bg-gray-100">
                {item.foto ? (
                  <Image src={item.foto} alt={item.keterangan} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">
                    Tidak ada foto
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="line-clamp-3 text-sm font-medium text-gray-800">{item.keterangan}</p>
                <p className="mt-2 text-xs text-gray-500">{formatTanggalIndonesia(item.tanggal)}</p>
                <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-white">
                    B
                  </span>
                  <span className="text-[11px] leading-tight text-gray-500">
                    BPJS Ketenagakerjaan
                    <br />
                    Yogyakarta
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
