import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import CaraKlaimClient from "./CaraKlaimClient";

export const revalidate = 60;

async function getData() {
  const [layanan, langkah, settings] = await Promise.all([
    prisma.layanan.findMany({
      where: { kategori: "PROGRAM_UTAMA" },
      include: { kriteria: { orderBy: { urutan: "asc" } } },
      orderBy: { urutan: "asc" },
    }),
    prisma.langkahKlaim.findMany({ orderBy: { urutan: "asc" } }),
    prisma.siteSettings.findUnique({ where: { id: "settings" } }),
  ]);
  return { layanan, langkah, settings };
}

export default async function CaraKlaimPage() {
  const { layanan, langkah, settings } = await getData();

  return (
    <>
      <Navbar />
      <main className="bg-brand-blue-light/30">
        <CaraKlaimClient layanan={JSON.parse(JSON.stringify(layanan))} langkah={JSON.parse(JSON.stringify(langkah))} />
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
