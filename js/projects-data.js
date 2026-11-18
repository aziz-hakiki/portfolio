/**
 * Data Proyek Portofolio Muhamad Azis Hakiki
 * Full-Stack Web Developer (Laravel & Modern Web Stack)
 * 
 * Sesuai pedoman anti-slop:
 * - Bebas karakter em dash
 * - Tidak mencantumkan statistik/metrik fiktif
 * - Placeholder tautan terstandarisasi: [ISI_LINK_DEMO] dan [ISI_REPO_GITHUB]
 */

const PROJECTS_DATA = [
  {
    id: "presensi-karyawan",
    index: "01",
    title: "Sistem Presensi Karyawan (Face Recognition)",
    category: "sistem-informasi",
    categoryLabel: "Sistem Informasi & Internal",
    summary: "Aplikasi pencatatan kehadiran pegawai berbasis web dengan verifikasi biometrik pengenalan wajah (Face Recognition), validasi radius geofencing, manajemen shift dinamis, dan rekapitulasi absensi otomatis.",
    techStack: ["Laravel", "Face Recognition", "MySQL", "Tailwind CSS", "JavaScript"],
    architectureBadge: "Biometric Face Recognition & Geofencing",
    problem: "Kerentanan manipulasi presensi seperti titip absensi dan pemalsuan lokasi GPS (fake GPS), kerumitan rekapitulasi data kehadiran dengan rotasi shift beragam, serta proses birokrasi pengajuan izin/cuti manual yang lambat.",
    solution: "Mengintegrasikan verifikasi biometrik wajah (Face Recognition) melalui kamera peramban dengan pencocokan vektor deskriptor wajah dan deteksi keaslian (liveness detection). Dipadukan dengan validasi koordinat radius geofencing dan timestamp server Laravel. Mengoptimalkan skema database MySQL untuk pencatatan log presensi bervolume tinggi serta background jobs untuk rekapitulasi otomatis.",
    features: [
      "Verifikasi presensi biometrik pengenalan wajah (Face Recognition) via kamera web atau smartphone",
      "Deteksi keaslian wajah (liveness check) dan validasi radius geofencing untuk mencegah kecurangan",
      "Manajemen jadwal shift dinamis dengan kalkulasi otomatis keterlambatan dan jam lembur",
      "Modul pengajuan izin, sakit, dan cuti tahunan dilengkapi unggah bukti dokumen pendukung",
      "Dashboard admin personalia untuk monitoring kehadiran divisi real-time dan ekspor laporan XLSX/PDF"
    ],
    demoLink: "[ISI_LINK_DEMO]",
    repoLink: "[ISI_REPO_GITHUB]",
    previewType: "attendance-facerec",
    accentColor: "crimson"
  },
  {
    id: "monitoring-asrama",
    index: "02",
    title: "Sistem Monitoring Asrama",
    category: "sistem-informasi",
    categoryLabel: "Sistem Informasi & Internal",
    summary: "Aplikasi pengelolaan hunian dan fasilitas asrama, mencakup manajemen kapasitas kamar, data penghuni/peserta, pencatatan status fasilitas, serta dashboard monitoring terpusat.",
    techStack: ["Laravel", "Blade", "SQL", "Tailwind CSS"],
    architectureBadge: "Capacity Allocation & Asset Tracking",
    problem: "Pendataan penghuni yang tersebar di beberapa lembar kerja menyebabkan overkapasitas kamar, kesulitan melacak inventaris aset dan sarana yang rusak, serta lambatnya respons terhadap keluhan fasilitas dari penghuni asrama.",
    solution: "Membangun sistem terpusat berbasis Laravel Blade dengan database constraints ketat guna mencegah overbooking kamar. Menyediakan visualisasi grid kapasitas hunian, pipeline status inventaris sarana, dan ticketing internal untuk percepatan penanganan perbaikan fasilitas.",
    features: [
      "Visualisasi status hunian dan batas kapasitas tiap gedung serta kamar asrama",
      "Manajemen data induk penghuni, masa berlaku tinggal, dan penempatan kamar",
      "Pencatatan log kondisi aset kamar (kasur, meja, pendingin ruangan, sanitasi)",
      "Sistem pelaporan kendala fasilitas langsung dari penghuni ke staf pengelola",
      "Rekap histori pemeliharaan aset dan laporan pergantian peserta asrama"
    ],
    demoLink: "[ISI_LINK_DEMO]",
    repoLink: "[ISI_REPO_GITHUB]",
    previewType: "dormitory-management",
    accentColor: "sky"
  },
  {
    id: "hris-pegawai",
    index: "03",
    title: "Sistem Manajemen Pegawai (HRIS)",
    category: "sistem-informasi",
    categoryLabel: "Sistem Informasi & Internal",
    summary: "Platform administrasi data kepegawaian terintegrasi untuk mengelola profil pegawai, riwayat jabatan, struktur unit kerja, dan dokumentasi administratif.",
    techStack: ["Laravel", "PHP", "MySQL", "REST API"],
    architectureBadge: "Hierarchical Org & Audit Trail",
    problem: "Data kepegawaian terisolasi antar departemen sehingga mempersulit pemetaan jenjang karir, mutasi jabatan, pengarsipan berkas legal kepegawaian, serta integrasi pertukaran data dengan sistem internal lainnya.",
    solution: "Menerapkan struktur Service-Repository pattern pada Laravel untuk menjaga modularitas logika bisnis. Merancang relasi rekursif self-referencing untuk bagan struktur organisasi hirarkis, sistem audit logging untuk tiap perubahan data personalia, serta penyediaan RESTful API terotentikasi token.",
    features: [
      "Direktori master profil pegawai dengan riwayat pendidikan dan kompetensi",
      "Pelacakan riwayat kenaikan pangkat, mutasi divisi, dan penyesuaian gaji pokok",
      "Visualisasi bagan organisasi perusahaan interaktif berbasis hierarki struktural",
      "Penyimpanan terpusat dokumen legalitas pegawai (kontrak kerja, sertifikat, KTP)",
      "REST API endpoint terenkripsi untuk konsumsi data oleh platform pendukung"
    ],
    demoLink: "[ISI_LINK_DEMO]",
    repoLink: "[ISI_REPO_GITHUB]",
    previewType: "hris-system",
    accentColor: "crimson"
  },
  {
    id: "ecommerce-platform",
    index: "04",
    title: "Platform E-Commerce",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    summary: "Aplikasi toko online dengan katalog produk dinamis, manajemen keranjang belanja, sistem checkout, pengelolaan stok barang, serta dashboard admin untuk pemrosesan pesanan.",
    techStack: ["Laravel", "MySQL", "Tailwind CSS", "Payment/Shipping Integration"],
    architectureBadge: "Transaction Locking & Webhook Processing",
    problem: "Kerentanan ketidakcocokan inventaris (overselling) saat terjadi lonjakan transaksi simultan, alur pembayaran manual yang rawan kelalaian verifikasi, serta minimnya transparansi pelacakan nomor resi pengiriman bagi pelanggan.",
    solution: "Mengimplementasikan database transaction dengan lock pessimistic pada proses checkout untuk menjamin integritas stok barang secara atomik. Membangun webhook handler yang memverifikasi tanda tangan digital dari payment gateway secara asinkron dan modul kalkulasi tarif ekspedisi otomatis.",
    features: [
      "Katalog produk responsif dengan filter kategori multi-level, varian, dan pencarian",
      "Keranjang belanja persisten dengan proteksi integritas stok real-time",
      "Alur checkout bertingkat terintegrasi estimasi ongkos kirim ke seluruh wilayah",
      "Otomatisasi update status pesanan melalui integrasi callback payment gateway",
      "Panel admin inventaris untuk pengelolaan produk, laporan omzet, dan cetak label kirim"
    ],
    demoLink: "[ISI_LINK_DEMO]",
    repoLink: "[ISI_REPO_GITHUB]",
    previewType: "ecommerce-catalog",
    accentColor: "sky"
  },
  {
    id: "landing-page-konversi",
    index: "05",
    title: "High-Conversion Landing Page",
    category: "web-landing",
    categoryLabel: "Web & Landing Page",
    summary: "Halaman promosi produk/layanan yang dioptimalkan untuk kecepatan akses, struktur konten persuasif, formulir prospek/CTA terintegrasi WhatsApp, dan responsivitas penuh.",
    techStack: ["HTML5", "Tailwind CSS", "JavaScript", "Laravel Blade"],
    architectureBadge: "Performance First & Zero Bloat",
    problem: "Tingginya angka pentalan pengunjung (bounce rate) pada landing page promosi yang lambat memuat aset gambar, struktur konten yang tidak terarah, serta formulir kontak panjang yang diabaikan oleh calon pelanggan mobile.",
    solution: "Membangun struktur markup HTML5 semantik dan styling Tailwind CSS yang bersih tanpa pustaka berat yang memblokir render. Mengoptimalkan hirarki tipografi untuk kemudahan scanning informasi, serta menempatkan tombol CTA direct-to-WhatsApp dengan parameter teks pra-isi otomatis.",
    features: [
      "Skor kecepatan Core Web Vitals optimal dengan ukuran bundel aset minimal",
      "Hirarki visual kontras tinggi yang memandu mata pengunjung ke proposisi nilai utama",
      "Formulir kontak ringkas terintegrasi generator link pesan WhatsApp bisnis",
      "Kompatibilitas tampilan penuh di berbagai ukuran layar smartphone dan desktop",
      "Struktur markup teroptimasi Open Graph dan meta tag untuk kemudahan berbagi tautan"
    ],
    demoLink: "[ISI_LINK_DEMO]",
    repoLink: "[ISI_REPO_GITHUB]",
    previewType: "landing-page",
    accentColor: "crimson"
  },
  {
    id: "company-profile-cms",
    index: "06",
    title: "Website Company Profile",
    category: "web-landing",
    categoryLabel: "Web & Landing Page",
    summary: "Website profil perusahaan profesional dengan manajemen konten dinamis (CMS) untuk profil instansi/bisnis, daftar layanan, galeri portofolio, dan kontak terintegrasi.",
    techStack: ["Laravel", "Blade", "Tailwind CSS", "MySQL"],
    architectureBadge: "Dynamic CMS & Role-Based Security",
    problem: "Perusahaan memerlukan representasi digital resmi yang mudah diperbarui secara berkala oleh staf internal non-teknis tanpa ketergantungan konstan pada programmer dan tanpa risiko merusak layout publik.",
    solution: "Membangun Content Management System (CMS) modular menggunakan Laravel Blade dan Tailwind CSS. Dilengkapi kontrol akses berbasis peran (RBAC), sanitasi input data untuk pencegahan celah XSS, manajemen media gambar teroptimasi, serta struktur URL ramah mesin pencari (SEO friendly).",
    features: [
      "Halaman publik elegan menyajikan visi misi, jajaran layanan, dan portofolio klien",
      "Panel administrasi konten yang ramah pengguna untuk update artikel dan informasi instansi",
      "Modul galeri kegiatan dan showcase proyek dengan manajemen kategori dinamis",
      "Formulir kontak resmi dengan proteksi spam CSRF dan notifikasi email internal",
      "Struktur kode bersih dan cache query untuk performa akses yang konsisten"
    ],
    demoLink: "[ISI_LINK_DEMO]",
    repoLink: "[ISI_REPO_GITHUB]",
    previewType: "company-profile",
    accentColor: "sky"
  }
];
