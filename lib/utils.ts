export function formatTanggalIndonesia(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const GALERI_KATEGORI_LABEL: Record<string, string> = {
  KINERJA_UTAMA: "Kinerja Utama",
  CAPAIAN: "Capaian",
  AKTIVITAS: "Aktivitas",
};

export const KERJASAMA_KATEGORI_LABEL: Record<string, string> = {
  PEMERINTAH_DAERAH: "Pemerintah Daerah",
  DUNIA_USAHA: "Dunia Usaha",
  PERGURUAN_TINGGI: "Perguruan Tinggi",
  KOMUNITAS_PEKERJA: "Komunitas & Pekerja",
  MEDIA_DAN_DIGITAL: "Media dan Digital",
};
