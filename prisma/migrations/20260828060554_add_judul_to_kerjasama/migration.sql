-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPERADMIN', 'ADMIN');

-- CreateEnum
CREATE TYPE "GaleriKategori" AS ENUM ('KINERJA_UTAMA', 'CAPAIAN', 'AKTIVITAS');

-- CreateEnum
CREATE TYPE "KerjasamaKategori" AS ENUM ('PEMERINTAH_DAERAH', 'DUNIA_USAHA', 'PERGURUAN_TINGGI', 'KOMUNITAS_PEKERJA', 'MEDIA_DAN_DIGITAL');

-- CreateEnum
CREATE TYPE "LayananKategori" AS ENUM ('PROGRAM_UTAMA', 'PROGRAM_UNGGULAN', 'LAYANAN_TAMBAHAN');

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "berita" (
    "id" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "link" TEXT,
    "foto" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galeri" (
    "id" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "kategori" "GaleriKategori" NOT NULL,
    "foto" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "galeri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kerjasama" (
    "id" TEXT NOT NULL,
    "kategori" "KerjasamaKategori" NOT NULL,
    "judul" TEXT NOT NULL,
    "foto" TEXT,
    "poinAwal" TEXT[],
    "poinAkhir" TEXT[],
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kerjasama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kerjasama_logo" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "link" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "kerjasama_logo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kerjasama_testimoni" (
    "id" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "nama" TEXT,
    "jabatan" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "kerjasama_testimoni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "struktur_organisasi_file" (
    "id" TEXT NOT NULL DEFAULT 'struktur',
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL DEFAULT 'image',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "struktur_organisasi_file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "layanan" (
    "id" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "icon" TEXT,
    "kategori" "LayananKategori" NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "layanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kriteria_klaim" (
    "id" TEXT NOT NULL,
    "layananId" TEXT NOT NULL,
    "teks" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "kriteria_klaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "langkah_klaim" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "icon" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "langkah_klaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sejarah" (
    "id" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "foto" TEXT,

    CONSTRAINT "sejarah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_item" (
    "id" TEXT NOT NULL,
    "tanggal" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "timeline_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visi_misi" (
    "id" TEXT NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" TEXT[],

    CONSTRAINT "visi_misi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL DEFAULT 'settings',
    "alamat" TEXT NOT NULL,
    "kontak" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "jamKerja" TEXT NOT NULL,
    "namaKantor" TEXT NOT NULL DEFAULT 'BPJS Ketenagakerjaan Kantor Cabang Yogyakarta',
    "logoUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");

-- CreateIndex
CREATE INDEX "berita_tanggal_idx" ON "berita"("tanggal");

-- CreateIndex
CREATE INDEX "galeri_kategori_idx" ON "galeri"("kategori");

-- CreateIndex
CREATE UNIQUE INDEX "kerjasama_kategori_key" ON "kerjasama"("kategori");

-- CreateIndex
CREATE UNIQUE INDEX "layanan_kode_key" ON "layanan"("kode");

-- CreateIndex
CREATE INDEX "layanan_kategori_idx" ON "layanan"("kategori");

-- CreateIndex
CREATE INDEX "kriteria_klaim_layananId_idx" ON "kriteria_klaim"("layananId");

-- AddForeignKey
ALTER TABLE "kriteria_klaim" ADD CONSTRAINT "kriteria_klaim_layananId_fkey" FOREIGN KEY ("layananId") REFERENCES "layanan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
