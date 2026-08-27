"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Users,
  PiggyBank,
  UserCheck,
  Briefcase,
  ListChecks,
  FileText,
  FileStack,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Layanan } from "@/types";

const ICONS: Record<string, any> = {
  "shield-plus": ShieldCheck,
  users: Users,
  "piggy-bank": PiggyBank,
  "user-check": UserCheck,
  briefcase: Briefcase,
  "list-checks": ListChecks,
  "file-text": FileText,
  "file-stack": FileStack,
  "file-check": FileCheck,
};

interface LangkahKlaim {
  id: string;
  judul: string;
  icon: string | null;
}

export default function CaraKlaimClient({
  layanan,
  langkah,
}: {
  layanan: Layanan[];
  langkah: LangkahKlaim[];
}) {
  const [activeId, setActiveId] = useState(layanan[0]?.id);
  const active = layanan.find((l) => l.id === activeId) ?? layanan[0];

  return (
    <>
      {/* Jenis Klaim tabs */}
      <section className="mx-auto max-w-5xl px-4 py-12 text-center md:px-8">
        <h2 className="section-title mx-auto mb-8 block w-fit">Jenis Klaim</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {layanan.map((l) => {
            const Icon = ICONS[l.icon ?? ""] ?? ShieldCheck;
            const isActive = l.id === active?.id;
            return (
              <button
                key={l.id}
                onClick={() => setActiveId(l.id)}
                className={cn(
                  "card-surface flex flex-col items-center gap-2 p-4 text-center transition",
                  isActive ? "border-brand-green ring-2 ring-brand-green/40" : "hover:border-brand-blue"
                )}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-current text-brand-blue">
                  <Icon size={20} />
                </span>
                <span className="text-sm font-semibold text-gray-800">{l.nama.replace(/\s*\(.*\)/, "")}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Cara Klaim steps */}
      <section className="mx-auto max-w-5xl px-4 pb-12 md:px-8">
        <h2 className="section-title mx-auto mb-8 block w-fit text-center">Cara Klaim</h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {langkah.map((step, i) => {
            const Icon = ICONS[step.icon ?? ""] ?? FileText;
            return (
              <div key={step.id} className="flex items-center gap-3">
                <div className="card-surface flex w-28 flex-col items-center gap-2 p-4 text-center">
                  <Icon className="text-brand-blue" size={26} />
                  <span className="text-xs font-medium text-gray-700">{step.judul}</span>
                </div>
                {i < langkah.length - 1 && <ArrowRight className="text-brand-blue" size={20} />}
              </div>
            );
          })}
        </div>
      </section>

      {/* Detail selected layanan */}
      {active && (
        <section className="mx-auto max-w-5xl px-4 pb-16 md:px-8">
          <h3 className="mb-3 text-xl font-bold text-gray-900">{active.nama}</h3>
          <div className="mb-8 rounded-lg bg-brand-blue-light p-5 text-sm text-gray-700">
            {active.deskripsi}
          </div>

          {active.kriteria && active.kriteria.length > 0 && (
            <>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Kriteria Pengajuan Klaim</h3>
              <ul className="list-disc space-y-1 rounded-lg bg-brand-blue-light p-5 pl-10 text-sm text-gray-700">
                {active.kriteria.map((k) => (
                  <li key={k.id}>{k.teks}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}
    </>
  );
}
