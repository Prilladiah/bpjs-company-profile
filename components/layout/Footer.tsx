import type { SiteSettings } from "@/types";

const DEFAULT_SETTINGS: SiteSettings = {
  alamat: "Jl. Urip Sumoharjo No.106, Klitren, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55222",
  kontak: "(0274) 000000",
  email: "info@bpjsketenagakerjaan-yogyakarta.go.id",
  jamKerja: "Senin - Jumat : 08.00 - 15.00",
  namaKantor: "BPJS Ketenagakerjaan Kantor Cabang Yogyakarta",
  logoUrl: null,
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

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="flex items-start">
          <svg width="70" height="70" viewBox="0 0 40 40" fill="none">
            <path d="M8 28c4-10 12-18 24-20-2 12-10 20-24 20z" fill="#4CAF50" />
            <path d="M4 32c6-8 14-14 24-16-4 10-14 16-24 16z" fill="#ffffff" />
            <path d="M2 34c5-6 12-10 20-12-3 8-11 12-20 12z" fill="#C6D62E" />
          </svg>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-bold text-brand-lime">Alamat</h3>
          <p className="text-sm leading-relaxed text-gray-100">{settings.alamat}</p>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-bold text-brand-lime">Contact</h3>
          <p className="text-sm text-gray-100">{settings.kontak}</p>
          <h3 className="mb-2 mt-4 text-lg font-bold text-brand-lime">Email</h3>
          <p className="text-sm text-gray-100">{settings.email}</p>
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
