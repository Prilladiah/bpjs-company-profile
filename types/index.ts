export type GaleriKategori = "KINERJA_UTAMA" | "CAPAIAN" | "AKTIVITAS";
export type LayananKategori = "PROGRAM_UTAMA" | "PROGRAM_UNGGULAN" | "LAYANAN_TAMBAHAN";

export interface Berita {
  id: string;
  keterangan: string;
  tanggal: string;
  link: string | null;
  foto: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Galeri {
  id: string;
  keterangan: string;
  kategori: GaleriKategori;
  foto: string;
  urutan: number;
}

// Cari interface/type `Kerjasama` di file types kamu (mis. types/index.ts)
// dan ganti isinya jadi ini:

export type KerjasamaKategori =
  | "PEMERINTAH_DAERAH"
  | "DUNIA_USAHA"
  | "PERGURUAN_TINGGI"
  | "KOMUNITAS_PEKERJA"
  | "MEDIA_DAN_DIGITAL";

export interface Kerjasama {
  id: string;
  kategori: KerjasamaKategori;
  judul: string;
  foto: string | null;
  poinAwal: string[];
  poinAkhir: string[];
  urutan: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface KerjasamaLogo {
  id: string;
  nama: string;
  logo: string;
  link: string | null;
  urutan: number;
}

export interface KerjasamaTestimoni {
  id: string;
  isi: string;
  nama: string | null;
  jabatan: string | null;
  urutan: number;
}

export interface TimelineItem {
  id: string;
  tanggal: string;
  judul: string;
  urutan: number;
}

export interface KriteriaKlaim {
  id: string;
  teks: string;
  urutan: number;
}

export interface Layanan {
  id: string;
  kode: string;
  nama: string;
  deskripsi: string;
  icon: string | null;
  kategori: LayananKategori;
  urutan: number;
  kriteria?: KriteriaKlaim[];
}

export interface StrukturOrganisasiFile {
  fileUrl: string;
  fileType: string;
  updatedAt: string;
}

export interface SiteSettings {
  alamat: string;
  kontak: string;
  email: string;
  jamKerja: string;
  namaKantor: string;
  logoUrl: string | null;
  instagramUrl?: string | null;
}

export interface AdminSession {
  id: string;
  username: string;
  name: string;
  role: "SUPERADMIN" | "ADMIN";
}

export interface Layanan {
  id: string;
  kode: string;
  nama: string;
  deskripsi: string;
  icon: string | null;
  kategori: "PROGRAM_UTAMA" | "PROGRAM_UNGGULAN" | "LAYANAN_TAMBAHAN";
  urutan: number;
  isActive: boolean;
  kriteriaJudul: string;        // <-- tambahkan ini
  kriteriaKonten: string | null; // <-- tambahkan ini
}