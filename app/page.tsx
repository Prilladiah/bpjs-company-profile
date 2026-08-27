import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import NewsSection from "@/components/home/NewsSection";
import PartnershipSection from "@/components/home/PartnershipSection";
import LocationMap from "@/components/home/LocationMap";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

async function getData() {
  const [berita, kerjasama, settings] = await Promise.all([
    prisma.berita.findMany({
      where: { isPublished: true },
      orderBy: { tanggal: "desc" },
      take: 4,
    }),
    prisma.kerjasama.findMany({ orderBy: { urutan: "asc" } }),
    prisma.siteSettings.findUnique({ where: { id: "settings" } }),
  ]);
  return { berita, kerjasama, settings };
}

export default async function HomePage() {
  const { berita, kerjasama, settings } = await getData();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutPreview />
        <NewsSection items={JSON.parse(JSON.stringify(berita))} />
        <PartnershipSection items={JSON.parse(JSON.stringify(kerjasama))} />
        <LocationMap />
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
