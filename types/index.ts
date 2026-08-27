export type GaleriKategori = "KINERJA_UTAMA" | "CAPAIAN" | "AKTIVITAS";

export type KerjasamaKategori =
  | "PEMERINTAH_DAERAH"
  | "DUNIA_USAHA"
  | "PERGURUAN_TINGGI"
  | "KOMUNITAS_PEKERJA"
  | "MEDIA_DAN_DIGITAL";

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

export interface Kerjasama {
  id: string;
  namaPerusahaan: string;
  kategori: KerjasamaKategori;
  deskripsi: string | null;
  foto: string | null;
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

export interface StrukturOrganisasi {
  id: string;
  nama: string;
  jabatan: string;
  foto: string | null;
  urutan: number;
  parentId: string | null;
  children?: StrukturOrganisasi[];
}

export interface SiteSettings {
  alamat: string;
  kontak: string;
  email: string;
  jamKerja: string;
  namaKantor: string;
  logoUrl: string | null;
}

export interface AdminSession {
  id: string;
  username: string;
  name: string;
  role: "SUPERADMIN" | "ADMIN";
}
