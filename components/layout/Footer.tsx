import type { SiteSettings } from "@/types";

const DEFAULT_SETTINGS: SiteSettings = {
  alamat: "Jl. Urip Sumoharjo No.106, Klitren, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55222",
  kontak: "175",
  email: "kacab.yogyakarta@bpjsketenagakerjaan.go.id",
  jamKerja: "Senin - Jumat : 08.00 - 15.00",
  namaKantor: "BPJS Ketenagakerjaan Kantor Cabang Yogyakarta",
  logoUrl: null,
  instagramUrl: "https://www.instagram.com/dulureworker.yk/",
};

export default function Footer({ settings = DEFAULT_SETTINGS }: { settings?: SiteSettings }) {
  return (
    <footer className="relative overflow-hidden bg-brand-blue text-white">
      <div className="pointer-events-none absolute bottom-0 right-0 h-full w-1/3 opacity-90">
        <svg viewBox="0 0 300 300" className="h-full w-full" preserveAspectRatio="xMaxYMax slice">
          <path d="M300 300C220 300 260 180 300 100V300Z" fill="#4CAF50" />
          <path d="M300 300C240 300 280 220 300 160V300Z" fill="#C6D62E" />
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-7xl justify-end px-4 pt-6 md:px-8">
        <a href="https://www.instagram.com/dulureworker.yk/" target="_blank" rel="noopener noreferrer" aria-label="Kunjungi Instagram kami" className="flex aspect-square h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/10 transition hover:bg-white/20">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 flex-shrink-0 text-white">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-12 pt-4 md:grid-cols-4 md:px-8">
        <div className="flex items-start">
          <img
            src={settings.logoUrl || "/images/logobulatbpjs.png"}
            alt="Logo BPJS Ketenagakerjaan"
            width={100}
            height={100}
            className="h-[100px] w-[100px] object-contain"
          />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-bold text-brand-lime">Alamat</h3>
          <p className="text-sm leading-relaxed text-gray-100">{settings.alamat}</p>
        </div>

        <div>
        <h3 className="mb-2 text-lg font-bold text-brand-lime">Contact</h3>
          <a
            href={`tel:${settings.kontak}`}
            className="text-sm text-gray-100 underline decoration-gray-400 underline-offset-2 transition hover:text-white"
          >
            {settings.kontak}
          </a>
          <h3 className="mb-2 mt-4 text-lg font-bold text-brand-lime">Email</h3>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${settings.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-100 underline decoration-gray-400 underline-offset-2 transition hover:text-white"
          >
          {settings.email}
        </a>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-bold text-brand-lime">Jam Kerja Layanan</h3>
          <p className="text-sm text-gray-100">{settings.jamKerja}</p>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-4 text-center text-xs text-gray-300">
        &copy; {new Date().getFullYear()} {settings.namaKantor}. All rights reserved.
      </div>
    </footer>
  );
}