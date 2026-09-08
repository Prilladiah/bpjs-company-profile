import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import CaraKlaimView from "@/components/home/CaraKlaimView";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function CaraKlaimPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const layanan = await prisma.layanan.findMany({
    where: { kategori: "PROGRAM_UTAMA", isActive: true },
    orderBy: { urutan: "asc" },
  });

  if (layanan.length === 0) {
    notFound();
  }

  const langkah = await prisma.langkahKlaim.findMany({
    orderBy: { urutan: "asc" },
  });

  const slugParam = params.slug?.[0] ?? null;

  const active = slugParam
    ? layanan.find((l) => slugify(l.nama) === slugParam)
    : layanan[0];

  if (!active) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <CaraKlaimView layanan={layanan} langkah={langkah} active={active} />
      <Footer />
    </>
  );
}