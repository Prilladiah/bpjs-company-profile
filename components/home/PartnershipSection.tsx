import type { Kerjasama } from "@/types";
import { KERJASAMA_KATEGORI_LABEL } from "@/lib/utils";

export default function PartnershipSection({ items }: { items: Kerjasama[] }) {
  const grouped = items.reduce<Record<string, Kerjasama[]>>((acc, item) => {
    (acc[item.kategori] ||= []).push(item);
    return acc;
  }, {});

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h2 className="section-title mb-8">Kerjasama Kami</h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {Object.entries(grouped).map(([kategori, list]) => (
          <div key={kategori} className="card-surface p-5">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-blue">
              {KERJASAMA_KATEGORI_LABEL[kategori] ?? kategori}
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
              {list.map((item) => (
                <li key={item.id}>
                  <span className="font-medium text-gray-800">{item.namaPerusahaan}</span>
                  {item.deskripsi && (
                    <p className="mt-0.5 whitespace-pre-line text-xs text-gray-500">{item.deskripsi}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {Object.keys(grouped).map((kategori) => (
          <span
            key={kategori}
            className="rounded-full border border-brand-blue px-4 py-1.5 text-xs font-semibold text-brand-blue"
          >
            {KERJASAMA_KATEGORI_LABEL[kategori] ?? kategori}
          </span>
        ))}
      </div>
    </section>
  );
}
