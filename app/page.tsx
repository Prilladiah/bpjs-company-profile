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
  const [berita, kerjasama, kerjasamaLogo, kerjasamaTestimoni, settings] =
    await Promise.all([
      prisma.berita.findMany({
        where: { isPublished: true },
        orderBy: { tanggal: "desc" },
        take: 12,
      }),
      prisma.kerjasama.findMany({
        orderBy: { urutan: "asc" },
      }),
      prisma.kerjasamaLogo.findMany({
        orderBy: { urutan: "asc" },
      }),
      prisma.kerjasamaTestimoni.findMany({
        orderBy: { urutan: "asc" },
      }),
      prisma.siteSettings.findUnique({
        where: { id: "settings" },
      }),
    ]);

  return {
    berita,
    kerjasama,
    kerjasamaLogo,
    kerjasamaTestimoni,
    settings,
  };
}

export default async function HomePage() {
  const {
    berita,
    kerjasama,
    kerjasamaLogo,
    kerjasamaTestimoni,
    settings,
  } = await getData();

  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />

        <AboutPreview />

        <NewsSection items={JSON.parse(JSON.stringify(berita))} />

        <PartnershipSection
          items={JSON.parse(JSON.stringify(kerjasama))}
          logos={JSON.parse(JSON.stringify(kerjasamaLogo))}
          testimoni={JSON.parse(JSON.stringify(kerjasamaTestimoni))}
        />

        <LocationMap />
      </main>

      <Footer settings={settings ?? undefined} />
    </>
  );
}