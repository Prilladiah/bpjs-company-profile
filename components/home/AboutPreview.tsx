import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-12 md:px-8">
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
    </section>
  );
}