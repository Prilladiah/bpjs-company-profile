import Link from "next/link";
import { ShieldCheck, TrendingUp, Sprout, Star } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, label: "Coverage", color: "bg-brand-green" },
  { icon: TrendingUp, label: "Acquisition", color: "bg-brand-blue" },
  { icon: Sprout, label: "Sustainability", color: "bg-brand-green" },
  { icon: Star, label: "Service Excellent", color: "bg-brand-blue" },
];

export default function AboutPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-12 md:px-8">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="section-title mb-2">Tentang Kami</h2>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-[3px] w-20 rounded-full bg-[#0057A8]" />
            <div className="h-2 w-2 rounded-full bg-[#68B545]" />
            <div className="h-[3px] w-20 rounded-full bg-[#0057A8]" />
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Ketahui lebih banyak tentang kami
          </p>
          <Link href="/tentang-kami" className="btn-primary mt-4">
            Selengkapnya →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {ITEMS.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-4 sm:py-5"
            >
              <span
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${color} text-white`}
              >
                <Icon size={20} />
              </span>
              <span className="break-words font-semibold text-gray-800">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}