import { PrismaClient, GaleriKategori, KerjasamaKategori, LayananKategori } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ---------------- Admin ----------------
  const passwordHash = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: passwordHash,
      name: "Administrator BPJS Yogyakarta",
      role: "SUPERADMIN",
    },
  });

  // ---------------- Site settings ----------------
  await prisma.siteSettings.upsert({
    where: { id: "settings" },
    update: {},
    create: {
      id: "settings",
      alamat: "Jl. Urip Sumoharjo No.106, Klitren, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55222",
      kontak: "(0274) 000000",
      email: "info@bpjsketenagakerjaan-yogyakarta.go.id",
      jamKerja: "Senin - Jumat : 08.00 - 15.00",
    },
  });

  // ---------------- Sejarah & Visi Misi ----------------
  await prisma.sejarah.deleteMany();
  await prisma.sejarah.create({
    data: {
      isi: "BPJS Ketenagakerjaan Kantor Cabang Yogyakarta hadir untuk melindungi, melayani, dan menyejahterakan seluruh pekerja Indonesia melalui program jaminan sosial ketenagakerjaan.",
    },
  });

  await prisma.timelineItem.deleteMany();
  await prisma.timelineItem.createMany({
    data: [
      { tanggal: "5 Desember 1977", judul: "Perum ASTEK (Asuransi Sosial Tenaga Kerja)", urutan: 1 },
      { tanggal: "1995", judul: "PT Jamsostek (Persero)", urutan: 2 },
      { tanggal: "1 Januari 2014", judul: "BPJS Ketenagakerjaan Yogyakarta", urutan: 3 },
    ],
  });

  await prisma.visiMisi.deleteMany();
  await prisma.visiMisi.create({
    data: {
      visi: "Mewujudkan Jaminan Sosial Ketenagakerjaan yang Terpercaya, Berkelanjutan dan Menyejahterakan Seluruh Pekerja Indonesia",
      misi: [
        "Melindungi, Melayani & Menyejahterakan Pekerja dan Keluarga",
        "Memberikan rasa Aman, Mudah & Nyaman untuk Meningkatkan Produktivitas dan Daya Saing Peserta",
        "Memberikan Kontribusi dalam Pembangunan dan Perekonomian Bangsa dengan Tata Kelola Baik",
      ],
    },
  });

  // ---------------- Layanan (Program Utama) ----------------
  const programUtama = [
    {
      kode: "JKK",
      nama: "Jaminan Kecelakaan Kerja (JKK)",
      deskripsi: "Memberikan perlindungan dan biaya pengobatan atas risiko kecelakaan kerja atau penyakit akibat kerja.",
      icon: "shield-plus",
      kriteria: ["Kecelakaan saat perjalanan kerja", "Kecelakaan di tempat kerja", "Penyakit akibat kerja", "Cacat akibat kecelakaan kerja"],
    },
    {
      kode: "JKM",
      nama: "Jaminan Kematian (JKM)",
      deskripsi: "Memberikan santunan dan manfaat uang tunai kepada ahli waris ketika peserta meninggal dunia bukan karena kecelakaan kerja.",
      icon: "users",
      kriteria: ["Peserta meninggal dunia bukan karena kecelakaan kerja", "Ahli waris terdaftar", "Kepesertaan aktif"],
    },
    {
      kode: "JHT",
      nama: "Jaminan Hari Tua (JHT)",
      deskripsi: "Jaminan Hari Tua (JHT) adalah program perlindungan sosial dari BPJS Ketenagakerjaan berupa uang tunai. Dana ini berasal dari akumulasi iuran dan hasil pengembangannya, yang dibayarkan sekaligus saat peserta memasuki usia pensiun (56 tahun), mengalami cacat total tetap, atau meninggal dunia.",
      icon: "piggy-bank",
      kriteria: [
        "Usia Pensiun 56 Tahun",
        "Usia Pensiun Perjanjian Kerja Bersama (PKB) Perusahaan",
        "Perjanjian Kerja Waktu Tertentu (PKWT)",
        "Berhenti usaha Bukan Penerima Upah (BPU)",
        "Mengundurkan diri",
        "Pemutusan Hubungan Kerja (PHK)",
        "Meninggalkan Indonesia untuk selama-lamanya",
        "Cacat total tetap",
        "Meninggal dunia",
        "Klaim Sebagian Jaminan Hari Tua (JHT) 10%",
        "Klaim Sebagian Jaminan Hari Tua (JHT) 30%",
        "Klaim Jaminan Hari Tua (JHT) PMI",
      ],
    },
    {
      kode: "JP",
      nama: "Jaminan Pensiun (JP)",
      deskripsi: "Program berkala yang bertujuan mempertahankan derajat kehidupan yang layak saat peserta memasuki usia pensiun atau mengalami cacat total.",
      icon: "user-check",
      kriteria: ["Usia pensiun tercapai", "Cacat total tetap", "Peserta meninggal dunia (untuk ahli waris)", "Minimal masa iur 15 tahun"],
    },
    {
      kode: "JKP",
      nama: "Jaminan Kehilangan Pekerjaan (JKP)",
      deskripsi: "Memberikan manfaat berupa uang tunai, akses informasi pasar kerja, dan pelatihan kerja bagi pekerja yang mengalami pemutusan hubungan kerja (PHK).",
      icon: "briefcase",
      kriteria: ["Mengalami PHK", "Belum mendapat pekerjaan baru", "Kepesertaan aktif minimal 12 bulan", "Bersedia bekerja kembali"],
    },
  ];

  for (let i = 0; i < programUtama.length; i++) {
    const p = programUtama[i];
    const layanan = await prisma.layanan.upsert({
      where: { kode: p.kode },
      update: {},
      create: {
        kode: p.kode,
        nama: p.nama,
        deskripsi: p.deskripsi,
        icon: p.icon,
        kategori: LayananKategori.PROGRAM_UTAMA,
        urutan: i + 1,
      },
    });
    await prisma.kriteriaKlaim.deleteMany({ where: { layananId: layanan.id } });
    await prisma.kriteriaKlaim.createMany({
      data: p.kriteria.map((teks, idx) => ({ layananId: layanan.id, teks, urutan: idx + 1 })),
    });
  }

  // ---------------- Layanan Tambahan ----------------
  const layananTambahan = [
    { kode: "JMO", nama: "Aplikasi JMO (Jamsostek Mobile)", deskripsi: "Digunakan untuk klaim saldo JHT di bawah batas tertentu, cek saldo, dan pendaftaran mandiri dengan proses pencairan dalam hitungan menit.", icon: "smartphone" },
    { kode: "LAPAK_ASIK", nama: "Lapak Asik (Online)", deskripsi: "Layanan klaim online melalui website resmi Cara Klaim BPJS Ketenagakerjaan bagi peserta yang memenuhi syarat dokumen.", icon: "laptop" },
    { kode: "KANTOR_CABANG", nama: "Kantor Cabang", deskripsi: "Datang langsung ke kantor cabang terdekat untuk layanan tatap muka pada hari kerja (Senin - Jumat pukul 09.00-15.00 WIB).", icon: "building" },
    { kode: "CALL_CENTER", nama: "Call Center / Layanan Masyarakat", deskripsi: "Hubungi nomor 175 untuk informasi dan pengaduan.", icon: "phone" },
  ];
  for (let i = 0; i < layananTambahan.length; i++) {
    const l = layananTambahan[i];
    await prisma.layanan.upsert({
      where: { kode: l.kode },
      update: {},
      create: { ...l, kategori: LayananKategori.LAYANAN_TAMBAHAN, urutan: i + 1 },
    });
  }

  // ---------------- Langkah Klaim ----------------
  await prisma.langkahKlaim.deleteMany();
  await prisma.langkahKlaim.createMany({
    data: [
      { judul: "Persyaratan Klaim", icon: "list-checks", urutan: 1 },
      { judul: "Isi Data Diri Peserta", icon: "file-text", urutan: 2 },
      { judul: "Isi Data Diri Tambahan", icon: "file-text", urutan: 3 },
      { judul: "Unggah Dokumen", icon: "file-stack", urutan: 4 },
      { judul: "Konfirmasi Data Pengajuan", icon: "file-check", urutan: 5 },
    ],
  });

  // ---------------- Berita ----------------
  await prisma.berita.deleteMany();
  await prisma.berita.createMany({
    data: Array.from({ length: 4 }).map((_, i) => ({
      keterangan: "BPJS Ketenagakerjaan sosialisasi perlindungan pada pengemudi ojol.",
      tanggal: new Date("2026-08-18"),
      link: "https://bpjsketenagakerjaan.go.id/berita/perlindungan-pengemudi-ojol",
      foto: `/images/berita-${(i % 3) + 1}.jpg`,
    })),
  });

  // ---------------- Galeri ----------------
  await prisma.galeri.deleteMany();
  const kategoriList: GaleriKategori[] = ["KINERJA_UTAMA", "CAPAIAN", "AKTIVITAS"];
  for (const kategori of kategoriList) {
    await prisma.galeri.createMany({
      data: Array.from({ length: 6 }).map((_, i) => ({
        keterangan: "BPJS Ketenagakerjaan Yogyakarta Cairkan Klaim Rp303 Miliar Sampai Juli 2022",
        kategori,
        foto: `/images/galeri-${(i % 4) + 1}.jpg`,
        urutan: i + 1,
      })),
    });
  }

  // ---------------- Kerjasama ----------------
  await prisma.kerjasama.deleteMany();
  const kerjasamaData: { kategori: KerjasamaKategori; nama: string; deskripsi: string }[] = [
    { kategori: "PEMERINTAH_DAERAH", nama: "Pemerintah Daerah DIY", deskripsi: "Pemprov DIY/Pemkab/Pemkot, Dinas terkait, Pemerintah Kapanewon/ Kelurahan\nPerluasan kepesertaan, Perlindungan pekerja sektor informal (kelurahan/gampong)" },
    { kategori: "DUNIA_USAHA", nama: "Perusahaan BUMN/Swasta", deskripsi: "Perusahaan BUMN/Swasta, Asosiasi pengusaha\nAkurasi & pertukaran kepesertaan, CRR & relationship perusahaan, Kepatuhan jaminan sosial, Peningkatan kualitas layanan" },
    { kategori: "PERGURUAN_TINGGI", nama: "Universitas & Mahasiswa", deskripsi: "Universitas, Mahasiswa, LSM\nEdukasi jaminan sosial melalui KKN & pengabdian masyarakat, Literasi kepesertaan bagi kelompok informal" },
    { kategori: "KOMUNITAS_PEKERJA", nama: "Komunitas Pekerja & Serikat", deskripsi: "Komunitas pekerja, Ojek online, Ojek, Serikat pekerja\nSosialisasi untuk Melindungi Aktivitas pekerja BPJS, Edukasi dan pendampingan" },
    { kategori: "MEDIA_DAN_DIGITAL", nama: "Media Lokal & Digital", deskripsi: "Media lokal, Influencer/creator, Kanal digital\nLiterasi jaminan sosial, Publikasi program, Kampanye perlindungan" },
  ];
  await prisma.kerjasama.createMany({
    data: kerjasamaData.map((k, i) => ({ ...k, foto: `/images/kerjasama-${(i % 3) + 1}.jpg`, urutan: i + 1 })),
  });

  // ---------------- Struktur Organisasi ----------------
  await prisma.strukturOrganisasi.deleteMany();
  const kepala = await prisma.strukturOrganisasi.create({
    data: { nama: "Rudi Susanto", jabatan: "Kepala Kantor Cabang", urutan: 1 },
  });
  const bidang = [
    "Kepala Bidang Kepesertaan Perusahaan",
    "Kepala Bidang Kepesertaan & Kepatuhan",
    "Kepala Bidang Pelayanan",
    "Kepala Bidang Umum & SDM",
  ];
  for (let i = 0; i < bidang.length; i++) {
    await prisma.strukturOrganisasi.create({
      data: { nama: `Nama Pejabat ${i + 1}`, jabatan: bidang[i], parentId: kepala.id, urutan: i + 1 },
    });
  }

  console.log("Seed complete. Admin login -> username: admin / password: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
