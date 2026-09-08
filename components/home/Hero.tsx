import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[340px] w-full overflow-hidden sm:h-[520px] md:h-[660px]">
        <Image
          src="/images/selamatdatang.png"
          alt="Kantor BPJS Ketenagakerjaan Yogyakarta"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
        <div className="absolute bottom-8 left-5 right-5 sm:bottom-16 sm:left-8 sm:right-auto md:bottom-24 md:left-10">
          <h1 className="text-3xl font-extrabold leading-tight text-white drop-shadow-md sm:text-4xl md:text-5xl">
            Selamat Datang
          </h1>
        </div>
      </div>
    </section>
  );
}