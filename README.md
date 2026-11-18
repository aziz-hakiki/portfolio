# Personal Portfolio: Muhamad Azis Hakiki // Full-Stack Web Developer

Website portofolio resmi **Muhamad Azis Hakiki**, Software Engineer dan Full-Stack Web Developer dengan spesialisasi ekosistem **PHP, Laravel, dan Modern Web Stack**.

Dibangun dengan estetika **Clean Technical / Swiss Grid** yang mengedepankan legibilitas tinggi, rasio kontras maksimal, tata letak data arsitektural yang terstruktur, dan performa kilat tanpa dependensi berlebih.

---

## 1. Identitas & Informasi Kontak

- **Nama Lengkap:** Muhamad Azis Hakiki
- **Peran:** Full-Stack Web Developer (Laravel & Modern Web Stack)
- **Domisili:** Bogor, Jawa Barat, Indonesia
- **GitHub:** [https://github.com/aziz-hakiki](https://github.com/aziz-hakiki)
- **LinkedIn:** [https://www.linkedin.com/in/azis-hakiki](https://www.linkedin.com/in/azis-hakiki)
- **Email:** [mohazizhakiki@gmail.com](mailto:mohazizhakiki@gmail.com)
- **WhatsApp:** `085694997960`

---

## 2. Tech Stack & Ekosistem Utama

- **Backend & Database:** PHP 8.x, Laravel 11, Eloquent ORM, MySQL/MariaDB (Skema Relasional Normalisasi), RESTful API, Autentikasi Sanctum/Passport, Database Indexing, Transaksi ACID.
- **Frontend & Antarmuka:** HTML5 Semantik, Tailwind CSS (Utility-First), Vanilla JavaScript (ES6+), Laravel Blade Components, Desain Responsif Mobile-First (WCAG AA).
- **Deployment & Server:** Linux Administration (Rocky Linux, Ubuntu Server), Nginx Web Server, PHP-FPM, Docker Containerization, Git Flow.

---

## 3. Studi Kasus & Karya Terpilih

1. **Sistem Presensi Karyawan (Face Recognition):** Aplikasi pencatatan kehadiran berbasis web dengan verifikasi biometrik wajah, anti-spoofing liveness check, geofencing lokasi GPS, manajemen multi-shift, dan rekapitulasi data otomatis.
2. **Sistem Monitoring Asrama:** Pengelolaan kapasitas hunian kamar, database constraints pencegahan overbooking, pencatatan status sarana, dan ticketing perbaikan fasilitas.
3. **Sistem Manajemen Pegawai (HRIS):** Administrasi kepegawaian modular dengan Service-Repository pattern, relasi hirarkis struktur organisasi, audit trail logging, dan endpoint REST API.
4. **Platform E-Commerce:** Toko daring terintegrasi dengan proteksi race-condition stok menggunakan pessimistic lock, kalkulasi ongkos kirim otomatis, dan webhook pembayaran.
5. **High-Conversion Landing Page:** Halaman promosi cepat tanpa library render-blocking, hirarki informasi konversi, dan formulir prospek terhubung ke WhatsApp bisnis.
6. **Website Company Profile (CMS):** Profil perusahaan profesional berbasis Laravel CMS dengan Role-Based Access Control (RBAC), sanitasi keamanan input XSS, dan SEO-friendly.

---

## 4. Struktur Direktori Proyek

```text
portfolio/
├── assets/
│   └── foto.png           # Foto profil resmi pengembang
├── css/
│   └── styles.css         # Styling kustom Swiss Grid & aksesibilitas
├── js/
│   ├── main.js            # Interaktivitas UI (Filter, Modal, Drawer, Validasi Form)
│   └── projects-data.js   # Dataset terstruktur 6 studi kasus aplikasi
├── DESIGN.md              # Acuan sistem desain teknikal & dial liveliness
├── index.html             # Dokumen markup semantik utama
├── index.php              # Entry point untuk server web lokal (Laragon/Apache/Nginx)
├── README.md              # Dokumentasi repositori
└── .gitignore             # Aturan pengecualian berkas git
```

---

## 5. Menjalankan Proyek Secara Lokal

### Opsi A: Menggunakan Laragon (Direkomendasikan)
1. Salin atau letakkan folder ini di direktori `C:\laragon\www\portfolio`.
2. Pastikan layanan Apache/Nginx di Laragon telah aktif.
3. Buka peramban pada URL `http://localhost/portfolio/` atau `http://portfolio.test`.

### Opsi B: Menggunakan PHP Built-in Server
Jalankan perintah berikut melalui terminal:
```bash
php -S localhost:8000
```
Buka peramban di `http://localhost:8000`.

---

## 6. Lisensi & Hak Cipta
Hak Cipta (c) 2026 Muhamad Azis Hakiki. Seluruh hak cipta dilindungi.
