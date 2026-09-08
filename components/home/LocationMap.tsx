import Image from "next/image";

export default function LocationMap() {
  // Koordinat titik pin dalam persen (%) relatif terhadap gambar peta,
  // supaya posisinya tetap pas walau gambar di-resize responsive.
  const PIN_LOCATIONS = [
    {
      nama: "BPJS Ketenagakerjaan Kulon Progo",
      top: "29.8%",
      left: "25.9%",
      url: "https://maps.app.goo.gl/YibPL5rD8k4PHdLp6",
    },
    {
      nama: "BPJS Ketenagakerjaan Sleman",
      top: "21.4%",
      left: "44.8%",
      url: "https://maps.app.goo.gl/iGbSQK5ujP35Hcps7",
    },
    {
      nama: "BPJS Ketenagakerjaan Yogyakarta",
      top: "45.3%",
      left: "44.1%",
      url: "https://maps.app.goo.gl/ZbwAsAa4BcsvoLDu5",
    },
    {
      nama: "BPJS Ketenagakerjaan Bantul",
      top: "54.0%",
      left: "33.3%",
      url: "https://maps.app.goo.gl/nCm2s49EUQXZfuEd9",
    },
    {
      nama: "BPJS Ketenagakerjaan Gunung Kidul",
      top: "51.4%",
      left: "62.4%",
      url: "https://maps.app.goo.gl/FVgVeHmoadhvqua4A",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="text-center">
        <h2 className="section-title mb-8">
          Informasi Lokasi BPJS Ketenagakerjaan Cabang Yogyakarta
        </h2>

        <div className="mt-2 mb-6 flex items-center justify-center gap-2">
          <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" />
          <div className="h-2 w-2 rounded-full bg-[#68B545]" />
          <div className="h-[2px] w-20 rounded-full bg-[#0057A8]" />
        </div>
      </div>

      <div className="card-surface p-6">
        <div className="relative mx-auto w-full max-w-4xl">
          <Image
            src="/images/peta.png"
            alt="Peta wilayah kerja BPJS Ketenagakerjaan Cabang Yogyakarta"
            width={700}
            height={550}
            className="h-auto w-full select-none rounded-lg"
            priority
          />

          {PIN_LOCATIONS.map((lokasi) => (
            <a
              key={lokasi.nama}
              href={lokasi.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buka lokasi ${lokasi.nama} di Google Maps`}
              title={lokasi.nama}
              className="group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ top: lokasi.top, left: lokasi.left }}
            >
              <span className="block h-14 w-14 cursor-pointer rounded-full transition-transform duration-200 group-hover:scale-125 group-hover:bg-white/10 group-focus-visible:scale-125" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}