# Design Direction: Muhamad Azis Hakiki // Portfolio Software Engineer

> Dokumen acuan visual dan sistem desain portofolio web developer sesuai kaidah Swiss Grid dan pedoman anti-slop.

## 1. Identitas & Karakter Desain
- **Nama Developer:** Muhamad Azis Hakiki
- **Spesialisasi:** Full-Stack Web Developer (Laravel & Modern Web Stack)
- **Domisili:** Bogor, Jawa Barat, Indonesia
- **Gaya Desain:** Clean Technical / Swiss Grid
- **Foto Profil Resmi:** `assets/foto.png` (Disediakan langsung oleh pemilik portofolio, ditampilkan pada lembar spesifikasi teknis dan header).
- **Filosofi Visual:** Mengedepankan struktur tata kelola data yang presisi, tipografi tegas berhirarki rasional, garis pembatas arsitektural (hairline borders), dan fungsionalitas tanpa ornamen berlebihan. Menolak estetika artifisial seperti gradasi neon ungu-biru, bayangan mengambang berlebihan, kartu 3-kolom yang monoton, serta klaim statistik fiktif.

## 2. Dial Liveliness (Part 3 Anti-Slop)
- **ENERGY: 2 (Balanced):** Tegas, percaya diri, berfokus pada kapabilitas arsitektur teknis dan keandalan sistem tanpa gimmick berlebihan.
- **RHYTHM: 2 (Consistent with Structural Variety):** Variasi komposisi editorial split di hero dengan foto profil resmi, bento asimetris pada tech stack, dan tata letak 2-kolom teknis dengan modal arsitektur untuk proyek.
- **MOTION: 1 (Calm & Purposeful):** Transisi halus dan cepat (150ms-200ms) untuk hover, filter tab, dan pembukaan modal teknis. Mendukung `prefers-reduced-motion`.

## 3. Palet Warna (Technical High-Contrast)
- **Neutral Base:**
  - Background Utama: `#FFFFFF` (Pure White)
  - Background Sekunder / Panel: `#F8FAFC` (Slate 50) & `#F1F5F9` (Slate 100)
  - Hairline Border: `#E2E8F0` (Slate 200) & `#CBD5E1` (Slate 300)
- **Typography Colors:**
  - Teks Utama / Heading: `#0F172A` (Navy Gelap / Slate 900): Rasio kontras > 14:1 terhadap putih (WCAG AAA)
  - Teks Sekunder / Body: `#334155` (Slate 700) & `#475569` (Slate 600): Rasio kontras > 5.5:1 terhadap putih (WCAG AA)
  - Teks Monospace / Metadata: `#64748B` (Slate 500)
- **Aksen Primer & Sekunder:**
  - Aksen Primer (Laravel Crimson): `#DC2626` (Red 600) / `#B91C1C` (Red 700 untuk kontras teks)
  - Aksen Sekunder (Technical Blue): `#0284C7` (Sky 600) / `#0369A1` (Sky 700)
  - Status Success: `#16A34A` (Green 600)

## 4. Tipografi
- **Headings (Display / Judul):** Space Grotesk (Alternatif: Plus Jakarta Sans): Geometris, kokoh, berkarakter teknikal modern.
- **Body Text (Konten Bacaan):** Inter: Netral, legibilitas tinggi pada berbagai ukuran layar.
- **Metadata & Badges:** JetBrains Mono: Presisi teknis, digunakan untuk kode indeks `[01]`, status server, file path, dan nama stack.

## 5. Komponen & Hirarki
- **Foto Profil Developer:** Terbingkai rapi dalam lembar spesifikasi teknis hero dengan rasio aspek terjaga, `fetchpriority="high"`, dan badge metadata terstruktur.
- **Radius:** Terkendali dan fungsional (`rounded-sm` 2px / `rounded-md` 6px), menghindari bentuk kapsul berlebihan pada seluruh kartu.
- **Elevation / Shadow:** Minim, mengutamakan garis pembatas (border 1px `#E2E8F0`) untuk membedakan kontainer data.
- **Rasio Media:** 16:10 untuk wireframe dan preview tampilan aplikasi.

## 6. Purpose Test Rationale (R-31)
- *Mengapa menyertakan foto developer pada lembar spesifikasi?* Memberikan verifikasi identitas personal yang otentik dan profesional sebagai software engineer tanpa memutus ritme tata letak Swiss Grid.
- *Mengapa menambahkan Face Recognition pada sistem presensi?* Menjawab kebutuhan riil pencegahan kecurangan absensi konvensional melalui integrasi biometrik modern berbasis web.
- *Mengapa latar belakang putih dan slate?* Memastikan kejelasan visual tinggi seperti lembar kerja teknik dan dokumentasi software formal.
- *Mengapa aksen merah crimson?* Representasi identitas ekosistem Laravel yang menjadi keahlian spesialisasi utama developer.
- *Mengapa tipografi monospace pada metadata?* Memberikan pembeda visual langsung antara narasi fungsional dan entitas teknis/arsitektur.
