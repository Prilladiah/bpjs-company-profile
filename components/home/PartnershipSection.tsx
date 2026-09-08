import type { Kerjasama, KerjasamaLogo, KerjasamaTestimoni } from "@/types";
import LogoCarousel from "./LogoCarousel";
import TestimoniRotator from "./TestimoniRotator";

export default function PartnershipSection({
  items,
  logos,
  testimoni,
}: {
  items: Kerjasama[];
  logos: KerjasamaLogo[];
  testimoni: KerjasamaTestimoni[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h2 className="section-title mb-2 text-center">Kerjasama Kami</h2>
      <div className="mb-8 flex items-center justify-center gap-2">
        <div className="h-[3px] w-20 rounded-full bg-[#0057A8]" />
        <div className="h-2 w-2 rounded-full bg-[#68B545]" />
        <div className="h-[3px] w-20 rounded-full bg-[#0057A8]" />
      </div>

      <LogoCarousel logos={logos} />
      <TestimoniRotator items={testimoni} />
    </section>
  );
}