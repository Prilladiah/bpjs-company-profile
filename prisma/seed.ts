import { PrismaClient, GaleriKategori, KerjasamaKategori, LayananKategori } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ---------------- Admin ----------------
  const passwordHash = await bcrypt.hash("Yogyakarta@BPJS00", 10);
  await prisma.admin.upsert({
  where: { username: "bpjsyogyakarta" },
  update: {
    username: "bpjsyogyakarta",
    password: passwordHash,
    name: "Administrator BPJS Yogyakarta",
    role: "SUPERADMIN",
  },
  create: {
    username: "bpjsyogyakarta",
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
      email: "kacab.yogyakarta@bpjsketenagakerjaan.go.id",
      jamKerja: "Senin - Jumat : 08.00 - 15.30",
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
      kode: "JHT",
      nama: "Jaminan Hari Tua (JHT)",
      deskripsi:
        "Jaminan Hari Tua (JHT) adalah program perlindungan sosial dari BPJS Ketenagakerjaan berupa uang tunai. Dana ini berasal dari akumulasi iuran dan hasil pengembangannya, yang dibayarkan sekaligus saat peserta memasuki usia pensiun (56 tahun), mengalami cacat total tetap, atau meninggal dunia.",
      icon: "piggy-bank",
      kriteriaJudul: "Kriteria Pengajuan Klaim",
      kriteriaKonten: `<ul>
        <li>Usia Pensiun 56 Tahun</li>
        <li>Usia Pensiun Perjanjian Kerja Bersama (PKB) Perusahaan</li>
        <li>Perjanjian Kerja Waktu Tertentu (PKWT)</li>
        <li>Berhenti usaha Bukan Penerima Upah (BPU)</li>
        <li>Mengundurkan diri</li>
        <li>Pemutusan Hubungan Kerja (PHK)</li>
        <li>Meninggalkan Indonesia untuk selama-lamanya</li>
        <li>Cacat total tetap</li>
        <li>Meninggal dunia</li>
        <li>Klaim Sebagian Jaminan Hari Tua (JHT) 10%</li>
        <li>Klaim Sebagian Jaminan Hari Tua (JHT) 30%</li>
        <li>Klaim Jaminan Hari Tua (JHT) PMI</li>
      </ul>`,
    },
    {
      kode: "JKM",
      nama: "Jaminan Kematian (JKM)",
      deskripsi:
        "Jaminan Kematian (JKM) adalah program perlindungan dari BPJS Ketenagakerjaan yang memberikan santunan uang tunai kepada ahli waris jika peserta meninggal dunia bukan akibat kecelakaan kerja.",
      icon: "users",
      kriteriaJudul: "Dokumen Klaim",
      kriteriaKonten: `<ul>
        <li>Kartu peserta BPJS Ketenagakerjaan</li>
        <li>Fotokopi E-KTP tenaga kerja dan ahli waris</li>
        <li>Akta kematian</li>
        <li>Fotokopi Kartu Keluarga</li>
        <li>Surat Keterangan ahli waris dari pejabat yang berwenang</li>
        <li>Buku Nikah (apabila ahli waris merupakan istri/suami sah peserta)</li>
        <li>Dokumen pendukung lainnya apabila diperlukan</li>
      </ul>`,
    },
    {
      kode: "JKK",
      nama: "Jaminan Kecelakaan Kerja (JKK)",
      deskripsi:
        "Jaminan Kecelakaan Kerja (JKK) adalah perlindungan berupa pelayanan kesehatan dan santunan uang tunai dari BPJS Ketenagakerjaan bagi pekerja yang mengalami kecelakaan saat bekerja, dalam perjalanan berangkat atau pulang kerja, perjalanan dinas, atau menderita penyakit akibat lingkungan kerja.",
      icon: "shield-plus",
      kriteriaJudul: "Dokumen Klaim",
      kriteriaKonten: `<ul>
        <li>Kartu peserta BPJS Ketenagakerjaan</li>
        <li>Fotokopi E-KTP tenaga kerja dan ahli waris</li>
        <li>Akta kematian</li>
        <li>Fotokopi Kartu Keluarga</li>
        <li>Surat Keterangan ahli waris dari pejabat yang berwenang</li>
        <li>Buku Nikah (apabila ahli waris merupakan istri/suami sah peserta)</li>
        <li>Dokumen pendukung lainnya apabila diperlukan</li>
      </ul>`,
    },
    {
      kode: "JP",
      nama: "Jaminan Pensiun (JP)",
      deskripsi:
        "Jaminan Pensiun (JP) adalah program BPJS Ketenagakerjaan yang memberi uang tunai bulanan demi menjaga hidup layak di masa tua, saat cacat tetap, atau bagi ahli waris. Iurannya sebesar 3% dari upah (2% pemberi kerja, 1% pekerja). Batas usia pensiun saat ini adalah 59 tahun.",
      icon: "user-check",
      kriteriaJudul: "Kriteria Pengajuan Klaim",
      kriteriaKonten: `<p>Peserta yang memenuhi ketentuan dapat mengajukan klaim melalui Layanan Klaim Di Kantor Cabang BPJAMSOSTEK dengan kondisi penerima manfaat, di antaranya:</p>
      <ul>
        <li>Mencapai Usia Pensiun; dan</li>
        <li>Mengalami Cacat Total Tetap</li>
      </ul>
      <p>Pengajuan dapat dilakukan dengan mengunggah dokumen ke dalam portal layanan klaim berbasis website atau elektronik.</p>`,
    },
    {
      kode: "JKP",
      nama: "Jaminan Kehilangan Pekerjaan (JKP)",
      deskripsi:
        "Jaminan Kehilangan Pekerjaan (JKP) adalah program BPJS Ketenagakerjaan yang memberi manfaat uang tunai, akses informasi pasar kerja, dan pelatihan kerja bagi peserta yang mengalami pemutusan hubungan kerja (PHK).",
      icon: "briefcase",
      kriteriaJudul: "Kriteria Peserta Penerima Jaminan Kehilangan Pekerjaan (JKP)",
      kriteriaKonten: `<ul>
        <li>Peserta yang mengalami PHK baik untuk hubungan kerja berdasarkan perjanjian kerja waktu tidak tertentu maupun perjanjian kerja waktu tertentu (PP No. 37 Tahun 2021 Pasal 19 ayat 1) Pemutusan hubungan kerja yang dikecualikan sebagai berikut:
          <ol>
            <li>mengundurkan diri</li>
            <li>cacat total tetap</li>
            <li>pensiun atau</li>
            <li>meninggal dunia</li>
          </ol>
        </li>
        <li>Peserta memiliki masa iur paling sedikit 12 bulan dalam 24 bulan.</li>
        <li>Peserta berkeinginan bekerja kembali.</li>
      </ul>`,
    },
  ];

  for (let i = 0; i < programUtama.length; i++) {
    const p = programUtama[i];
    await prisma.layanan.upsert({
      where: { kode: p.kode },
      update: {
        nama: p.nama,
        deskripsi: p.deskripsi,
        icon: p.icon,
        kriteriaJudul: p.kriteriaJudul,
        kriteriaKonten: p.kriteriaKonten,
      },
      create: {
        kode: p.kode,
        nama: p.nama,
        deskripsi: p.deskripsi,
        icon: p.icon,
        kategori: LayananKategori.PROGRAM_UTAMA,
        urutan: i + 1,
        kriteriaJudul: p.kriteriaJudul,
        kriteriaKonten: p.kriteriaKonten,
      },
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
  // ---------------- Berita ----------------
  await prisma.berita.deleteMany();
  await prisma.berita.createMany({
    data: [
      {
        keterangan: "BPJS Ketenagakerjaan Yogyakarta dan PT SGM dorong MLT perumahan pekerja",
        tanggal: new Date("2026-08-07"),
        link: "https://jogja.antaranews.com/berita/846797/bpjs-ketenagakerjaan-yogyakarta-dan-pt-sgm-dorong-mlt-perumahan-pekerja",
        foto: "/images/berita1.png",
        isPublished: true,
      },
      {
        keterangan: "Pekerja Lebih Sejahtera, BPJS Ketenagakerjaan Jogja Perkuat Kolaborasi",
        tanggal: new Date("2026-08-07"),
        link: "https://news.harianjogja.com/r-1266436/pekerja-lebih-sejahtera-bpjs-ketenagakerjaan-jogja-perkuat-kolaborasi",
        foto: "/images/berita1.png",
        isPublished: true,
      },
      {
        keterangan: "BPJS Ketenagakerjaan gandeng Tepo Seliro lindungi pelaku usaha Jogja",
        tanggal: new Date("2026-08-08"),
        link: "https://jogja.antaranews.com/berita/846907/bpjs-ketenagakerjaan-gandeng-tepo-seliro-lindungi-pelaku-usaha-jogja",
        foto: "/images/berita3.png",
        isPublished: true,
      },
      {
        keterangan: "Gandeng Komunitas Malioboro, BPJS Ketenagakerjaan Perluas Perlindungan",
        tanggal: new Date("2026-08-08"),
        link: "https://jogjapolitan.harianjogja.com/r-1266833/gandeng-komunitas-malioboro-bpjs-ketenagakerjaan-perluas-perlindungan",
        foto: "/images/berita3.png",
        isPublished: true,
      },
      {
        keterangan: "Diterjunkan ke Masyarakat, Mahasiswa KKN UII Dilindungi BPJS Ketenagakerjaan",
        tanggal: new Date("2026-08-11"),
        link: "https://www.krjogja.com/kampus/1247485848/diterjunkan-ke-masyarakat-mahasiswa-kkn-uii-dilindungi-bpjs-ketenagakerjaan",
        foto: "/images/berita5.png",
        isPublished: true,
      },
      {
        keterangan: "3.174 Mahasiswa UII KKN, Semua Dapat Perlindungan BPJS Ketenagakerjaan",
        tanggal: new Date("2026-08-11"),
        link: "https://news.harianjogja.com/r-1266931/3174-mahasiswa-uii-kkn-semua-dapat-perlindungan-bpjs-ketenagakerjaan",
        foto: "/images/berita5.png",
        isPublished: true,
      },
      {
        keterangan: "BPJS Ketenagakerjaan lindungi 3.174 mahasiswa KKN UII Yogyakarta",
        tanggal: new Date("2026-08-11"),
        link: "https://jogja.antaranews.com/berita/847492/bpjs-ketenagakerjaan-lindungi-3174-mahasiswa-kkn-uii-yogyakarta",
        foto: "/images/berita5.png",
        isPublished: true,
      },
      {
        keterangan: "Dari Persoalan Lingkungan, Tumbuh Sebuah Gerakan yang Memberi Manfaat Bagi Masyarakat",
        tanggal: new Date("2026-08-13"),
        link: "https://www.krjogja.com/bantul/1247488779/dari-persoalan-lingkungan-tumbuh-sebuah-gerakan-yang-memberi-manfaat-bagi-masyarakat",
        foto: "/images/beritabpjs.jpg",
        isPublished: true,
      },
      {
        keterangan: "Olah Sampah Jadi Energi, Pekerja GO-SARI Kini Dilindungi BPJamsostek",
        tanggal: new Date("2026-08-15"),
        link: "https://jogjapolitan.harianjogja.com/r-1267376/olah-sampah-jadi-energi-pekerja-go-sari-kini-dilindungi-bpjamsostek",
        foto: "/images/beritabpjs.jpg",
        isPublished: true,
      },
    ],
  });

  // ---------------- Galeri ----------------
  await prisma.galeri.deleteMany();

  const galeriData: {
    kategori: GaleriKategori;
    keterangan: string;
    foto: string;
  }[] = [
    // Kinerja Utama
    { kategori: "KINERJA_UTAMA", keterangan: "BPJAMSOSTEK: Sebanyak 66.000 pekerja informal DIY aktif sebagai peserta", foto: "/images/kinerja1.png" },
    { kategori: "KINERJA_UTAMA", keterangan: "Cakupan BPJS Ketenagakerjaan di Sleman mencapai 34,53 persen", foto: "/images/kinerja2.png" },
    { kategori: "KINERJA_UTAMA", keterangan: "BPJS Ketenagakerjaan Dorong Kemandirian Ahli Waris Lewat Rekso Waris", foto: "/images/kinerja3..jpg" },
    { kategori: "KINERJA_UTAMA", keterangan: "BPJS Ketenagakerjaan CSR Perusahaan Lindungi Pekerja Rentan di DIY", foto: "/images/kinerja4.png" },
    { kategori: "KINERJA_UTAMA", keterangan: "Sosialisasi BPJS Kesehatan dan BPJS Ketenagakerjaan 2025", foto: "/images/kinerja5.jpg" },
    { kategori: "KINERJA_UTAMA", keterangan: "BPJS Ketenagakerjaan dorong penerima manfaat kembali berdaya melalui PEKA", foto: "/images/kinerja6.png" },

    // Capaian
    { kategori: "CAPAIAN", keterangan: "Tahun 2023, BPJS Ketenagakerjaan Kantor Cabang Yogyakarta Bayarkan Manfaat Peserta Rp. 766,12 Miliar", foto: "/images/capaian1.png" },
    { kategori: "CAPAIAN", keterangan: "Sepanjang 2025, BPJS Ketenagakerjaan Salurkan Klaim Rp1,19 Triliun kepada 113 Ribu Peserta di DIY", foto: "/images/capaian2.png" },
    { kategori: "CAPAIAN", keterangan: "Klaim BPJS Ketenagakerjaan DIY Tembus Ratusan Miliar, JHT Dominan", foto: "/images/capaian3.jpg" },
    { kategori: "CAPAIAN", keterangan: "Regional Cakupan BPJS Ketenagakerjaan Pemkot Yogyakarta, Rujukan Bandung Barat", foto: "/images/capaian4.jpeg" },
    { kategori: "CAPAIAN", keterangan: "Sinergi BPJS Ketenagakerjaan dan KONI DIY, Wujudkan Atlet Berprestasi dan Terlindungi", foto: "/images/capaian5.png" },
    { kategori: "CAPAIAN", keterangan: "BPJS Ketenagakerjaan lindungi 3.174 mahasiswa KKN UII Yogyakarta", foto: "/images/capaian6.png" },

    // Aktivitas
    { kategori: "AKTIVITAS", keterangan: "BPJS Ketenagakerjaan Teken Kerja Sama Dengan Kemendes DI Yogyakarta", foto: "/images/aktivitas1.jpg" },
    { kategori: "AKTIVITAS", keterangan: "BPJS Ketenagakerjaan dan Kejati DIY teken PKS, Perkuat sinergi perlindungan pekerja", foto: "/images/aktivitas2.png" },
    { kategori: "AKTIVITAS", keterangan: "BPJS Ketenagakerjaan sosialisasikan Program Bersama SBSI DIY", foto: "/images/aktivitas3.png" },
    { kategori: "AKTIVITAS", keterangan: "BPJS Ketenagakerjaan-Pemda DIY kerja sama kepesertaan tenaga bantu DIY", foto: "/images/aktivitas4.png" },
    { kategori: "AKTIVITAS", keterangan: "Sosialisasi Perlindungan untuk Pekerja Pariwisata DIY", foto: "/images/aktivitas5.jpg" },
    { kategori: "AKTIVITAS", keterangan: "Bank BPD DIY Mudahkan Pembayaran Iuran BPJS Ketenagakerjaan", foto: "/images/aktivitas6.jpg" },
  ];

  await prisma.galeri.createMany({
    data: galeriData.map((g, i) => ({ ...g, urutan: i + 1 })),
  });

  // ---------------- Kerjasama ----------------
  await prisma.kerjasama.deleteMany();
  const kerjasamaData: {
    kategori: KerjasamaKategori;
    judul: string;
    poinAwal: string[];
    poinAkhir: string[];
  }[] = [
  ];
  await prisma.kerjasama.createMany({
    data: kerjasamaData.map((k, i) => ({ ...k, foto: `/images/beritabpjs.jpg`, urutan: i + 1 })),
  });

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
