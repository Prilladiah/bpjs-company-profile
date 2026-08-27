export default function LocationMap() {
  const WILAYAH = [
    { nama: "Kab. Kulon Progo", kecamatan: 12, kelurahan: 87, color: "#8BC34A" },
    { nama: "Kab. Sleman", kecamatan: 17, kelurahan: 86, color: "#CDDC39" },
    { nama: "Kota Yogyakarta", kecamatan: 14, kelurahan: 45, color: "#FF7043" },
    { nama: "Kab. Bantul", kecamatan: 17, kelurahan: 75, color: "#42A5F5" },
    { nama: "Kab. Gunung Kidul", kecamatan: 18, kelurahan: 144, color: "#26A69A" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h2 className="section-title mb-8">
        Informasi Lokasi BPJS Ketenagakerjaan Cabang Yogyakarta
      </h2>

      <div className="card-surface grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-lg bg-gray-50 p-6">
          <p className="text-center text-sm text-gray-400">
            [ Peta wilayah kerja DIY — render peta interaktif di sini ]
          </p>
        </div>
        <ul className="space-y-3">
          {WILAYAH.map((w) => (
            <li key={w.nama} className="flex items-center gap-3 text-sm">
              <span className="h-3 w-3 flex-shrink-0 rounded-sm" style={{ backgroundColor: w.color }} />
              <span className="font-semibold text-gray-800">{w.nama}</span>
              <span className="ml-auto text-gray-500">
                {w.kecamatan} Kecamatan · {w.kelurahan} Kelurahan
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
