import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[380px] md:h-[460px]">
        <Image
          src="/images/hero-kantor.jpg"
          alt="Kantor BPJS Ketenagakerjaan Yogyakarta"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
        <div className="absolute bottom-8 left-4 md:left-12">
          <h1 className="text-3xl font-extrabold text-white drop-shadow-md sm:text-4xl md:text-5xl">
            Selamat Datang
          </h1>
        </div>
      </div>
    </section>
  );
}
