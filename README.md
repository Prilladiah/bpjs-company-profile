# BPJS Ketenagakerjaan Kantor Cabang Yogyakarta — Company Profile

Website company profile + panel admin, dibangun dengan **Next.js 14 (App Router)**,
**TypeScript**, **Tailwind CSS**, dan **Prisma + PostgreSQL**, mengikuti desain pada
`Desain_profile_company.zip`.

## 1. Struktur Folder

```
app/
  page.tsx                  -> Beranda
  tentang-kami/page.tsx     -> Sejarah, Timeline, Visi Misi, Struktur Organisasi
  layanan/page.tsx          -> Program Unggulan, Program Utama, Layanan Tambahan
  cara-klaim/page.tsx       -> Jenis Klaim (tab) + Cara Klaim + Kriteria
  cara-klaim/CaraKlaimClient.tsx
  galeri/page.tsx           -> Galeri per kategori
  admin/
    login/page.tsx          -> Login admin (di luar sidebar)
    (dashboard)/layout.tsx  -> Layout admin (sidebar)
    (dashboard)/berita/page.tsx
    (dashboard)/galeri/page.tsx
    (dashboard)/kerjasama/page.tsx
    (dashboard)/struktur-organisasi/page.tsx
  api/
    auth/login/route.ts     -> POST login, GET cek sesi
    auth/logout/route.ts
    berita/route.ts + [id]/route.ts
    galeri/route.ts + [id]/route.ts
    kerjasama/route.ts + [id]/route.ts
    struktur-organisasi/route.ts + [id]/route.ts
    upload/route.ts         -> upload foto (disimpan di /public/uploads)
components/
  layout/  -> Navbar, Footer
  home/    -> Hero, AboutPreview, NewsSection, PartnershipSection, LocationMap
  ui/      -> SectionTitle
  admin/   -> Sidebar, Modal
hooks/
  useAuth.ts
lib/
  prisma.ts, auth.ts, utils.ts
types/
  index.ts
prisma/
  schema.prisma, seed.ts
middleware.ts                -> Melindungi seluruh route /admin/*
```

## 2. Instalasi

```bash
npm install
cp .env.example .env
# edit .env -> isi DATABASE_URL (PostgreSQL) dan JWT_SECRET

npx prisma migrate dev --name init
npm run prisma:seed

npm run dev
```

Buka `http://localhost:3000` untuk situs publik, dan
`http://localhost:3000/admin/login` untuk panel admin.

**Akun admin default (dari seed):**
- Username: `admin`
- Password: `admin123`

> Ganti password ini setelah deploy ke production.

## 3. Skema Database (Prisma / PostgreSQL)

| Tabel                 | Fungsi                                                                 |
|------------------------|-------------------------------------------------------------------------|
| `admins`               | Akun login panel admin (`username`, `password` hash bcrypt, `role`)     |
| `berita`                | Kartu "Berita & Kegiatan" di Beranda — `keterangan`, `tanggal`, `link`, `foto` |
| `galeri`                | Foto galeri, dikelompokkan `kategori` (Kinerja Utama / Capaian / Aktivitas) |
| `kerjasama`             | Daftar mitra kerjasama, dikelompokkan `kategori` (Pemda, Dunia Usaha, dst.) |
| `struktur_organisasi`   | Struktur organisasi berbentuk pohon (self-relation `parentId`)          |
| `layanan`                | Program BPJS: JKK/JKM/JHT/JP/JKP (`PROGRAM_UTAMA`) & JMO/Lapak Asik/dst (`LAYANAN_TAMBAHAN`) |
| `kriteria_klaim`         | Daftar bullet "Kriteria Pengajuan Klaim" per `layanan`                  |
| `langkah_klaim`          | Langkah generik "Cara Klaim" (5 step: persyaratan → konfirmasi)         |
| `sejarah`                | Paragraf "Sejarah Singkat" di Tentang Kami                              |
| `timeline_item`          | Item timeline sejarah organisasi                                        |
| `visi_misi`              | Visi (teks) dan Misi (array teks)                                       |
| `site_settings`          | Data footer: alamat, kontak, email, jam kerja (singleton row)           |

Lihat detail kolom lengkap di `prisma/schema.prisma`.

### Diagram relasi singkat
- `layanan` 1—N `kriteria_klaim`
- `struktur_organisasi` self-relation (`parent` ↔ `children`) untuk org chart

## 4. Autentikasi Admin

- Login (`POST /api/auth/login`) memverifikasi `username` + `password` (bcrypt),
  lalu menerbitkan JWT yang disimpan sebagai cookie **httpOnly** (`bpjs_admin_session`).
- `middleware.ts` memverifikasi cookie tersebut untuk semua route `/admin/*`
  (kecuali `/admin/login`) dan me-redirect ke halaman login bila tidak valid.
- Logout (`POST /api/auth/logout`) menghapus cookie sesi.

## 5. Upload Foto

Form Tambah/Edit pada Berita, Galeri, dan Kerjasama memakai endpoint
`POST /api/upload` yang menyimpan file ke `public/uploads/` (untuk keperluan
development). Untuk production, ganti implementasi di `app/api/upload/route.ts`
agar mengunggah ke storage cloud (S3, Cloudinary, dsb.) dan mengembalikan
URL publiknya.

## 6. Catatan Gambar

Tempatkan foto asli sesuai daftar di `public/images/README.txt`, atau unggah
langsung lewat panel admin (otomatis tersimpan & tersambung ke database).

## 7. Build & Deploy

```bash
npm run build
npm run start
```

Pastikan environment variable `DATABASE_URL` dan `JWT_SECRET` sudah diset pada
platform hosting (Vercel/VPS/dll), dan jalankan `npx prisma migrate deploy`
saat deploy pertama kali.
