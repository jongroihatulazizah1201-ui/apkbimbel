# DAFTAR FITUR APLIKASI
## Portal Belajar Langkah Juara (Versi 1.0)

Dokumen ini merangkum daftar seluruh fitur fungsional, non-fungsional, serta batasan sistem yang diuraikan dalam **PRD Portal Belajar Langkah Juara**.

---

### 1. Autentikasi & Manajemen Sesi (Semua Pengguna & Pengunjung)

- **1.1. Registrasi Akun Siswa Baru**
  - Pendaftaran mandiri menggunakan Email dan Kata Sandi (minimal 6 karakter).
  - Pendaftaran mandiri sekali klik menggunakan Akun Google (Google Sign-In).
  - Penugasan peran (*role*) otomatis sebagai **`siswa`** dan status akun **`aktif: true`** untuk semua akun baru.
  - Pembuatan dokumen profil otomatis di koleksi `users` saat pendaftaran berhasil.
- **1.2. Masuk / Login Sistem**
  - Masuk menggunakan kombinasi Email & Kata Sandi.
  - Masuk menggunakan Akun Google (Google Sign-In).
  - Deteksi otomatis akun baru saat pengguna login pertama kali via Google tanpa menimpa profil yang sudah ada.
  - Pengalihan (*redirect*) otomatis sesuai peran:
    - Siswa $\to$ `/beranda`
    - Staf $\to$ `/staf`
    - Tutor $\to$ `/tutor`
    - Super Admin $\to$ `/admin`
  - Validasi status akun aktif (menolak login jika akun dinonaktifkan dengan pesan informatif: *"Akun Anda dinonaktifkan. Hubungi staf Langkah Juara"*).
- **1.3. Penjagaan Sesi (*Session Persistence*)**
  - Sesi login tetap tersimpan saat peramban dimuat ulang (*page refresh*).
  - *Loading state* saat pembacaan sesi dan peran pengguna untuk mencegah kedipan atau redirect keliru.
  - Pengalihan kembali ke halaman tujuan awal (*return URL redirect*) setelah berhasil masuk.
  - Penolakan akses ke halaman `/masuk` atau `/daftar` bagi pengguna yang sudah memiliki sesi aktif.
- **1.4. Keluar / Logout**
  - Fitur keluar dari aplikasi yang membersihkan sesi pengguna dan mengembalikan ke halaman `/masuk`.

---

### 2. Modul Profil (Semua Peran)

- **2.1. Tampilan Data Profil (`/profil`)**
  - Menampilkan informasi akun: Nama, Email, Nomor HP, Nomor HP Orang Tua, dan Peran (*Role*).
- **2.2. Perbaruan Data Mandiri**
  - Peran **Siswa**: Dapat memperbarui Nama, Nomor HP, dan Nomor HP Orang Tua.
  - Peran **Staf, Tutor, Super Admin**: Dapat memperbarui Nama dan Nomor HP.
  - Validasi Nomor HP: Wajib berupa angka, panjang 10–13 digit, dan diawali `08`.
  - Proteksi: Alamat email dan peran (*role*) terkunci dan tidak dapat diubah dari halaman profil.

---

### 3. Modul Siswa

- **3.1. Beranda Siswa (`/beranda`)**
  - Kartu informasi **Kelas Berikutnya**: Menampilkan nama kelas, jadwal hari, jam, dan tempat/tautan tatap muka terdekat.
  - Kartu **Tugas Belum Dikumpulkan**: Daftar tugas aktif yang belum dikumpulkan, diurutkan dari batas waktu terdekat.
  - Keadaan Khusus (*Empty State*): Pesan informatif jika belum memiliki kelas terdaftar disertai tombol *Call to Action* (CTA) **"Lihat Program"**.
  - Navigasi langsung ke rincian kelas atau detail tugas melalui klik kartu.
- **3.2. Katalog & Pendaftaran Program (`/program`)**
  - Menampilkan katalog kartu program bimbingan aktif (Nama, Jenjang SMP/SMA, Jumlah Pertemuan, dan Harga dalam Rupiah).
  - Pengajuan Pendaftaran Program: Siswa dapat mengajukan pendaftaran program aktif dengan sekali klik.
  - Daftar **"Pendaftaran Saya"**: Menampilkan riwayat pengajuan dengan indikator status:
    - `Menunggu` (Kuning)
    - `Aktif` (Hijau)
    - `Ditolak` (Merah, dilengkapi catatan alasan dari staf)
  - Validasi Pendaftaran: Mencegah pengajuan ulang pada program yang sama jika status sebelumnya masih `menunggu` atau `aktif`. Pendaftaran yang `ditolak` dapat diajukan kembali.
- **3.3. Kelas Saya (`/kelas` & `/kelas/[id]`)**
  - Daftar seluruh kelas yang diikuti oleh siswa bersangkutan.
  - Rincian Informasi Kelas: Nama kelas, tutor pengampu, hari, jam, dan ruang/tautan belajar daring.
  - Daftar Sesi Pertemuan: Rekap tanggal pertemuan, topik bahasan, dan tautan materi eksternal (Google Drive / bahan ajar).
  - Daftar Tugas Kelas: Rekap judul tugas, batas waktu pengumpulan (*deadline*), dan status tugas.
- **3.4. Pengumpulan & Pantauan Tugas (`/tugas/[id]`)**
  - Informasi lengkap tugas: Judul, deskripsi materi tugas, dan batas waktu pengumpulan.
  - Kolom pengumpulan jawaban berupa tautan eksternal (wajib berformat URL dengan awalan `https://`).
  - Pengubahan Tautan Jawaban: Tautan dapat diganti/diperbarui selama belum melewati batas waktu dan belum dinilai oleh tutor.
  - Perhitungan Status Tugas Dinamis:
    - *Belum dikumpulkan* (belum mengirim tautan & belum jatuh tempo)
    - *Dikumpulkan* (sudah mengirim tautan & menunggu penilaian tutor)
    - *Dinilai* (nilai dan umpan balik telah diisi oleh tutor)
    - *Terlambat* (batas waktu lewat tanpa ada pengiriman tautan)
  - Transparansi Penilaian: Siswa melihat nilai numerik (skala 0–100) dan catatan komentar langsung dari tutor.

---

### 4. Modul Staf Administrasi

- **4.1. Dasbor Staf (`/staf`)**
  - Ringkasan metrik: Jumlah pendaftaran yang berstatus `menunggu`.
  - Jadwal Kelas Hari Ini: Daftar kelas yang memiliki jadwal aktif pada hari berjalan (disertai jam, tutor pengampu, dan ruang).
  - Tautan interaktif: Klik pada angka pendaftaran menunggu langsung membuka daftar pendaftaran dengan filter otomatis.
- **4.2. Manajemen Pendaftaran Siswa (`/staf/pendaftaran`)**
  - Tabel rekap pendaftaran: Nama Siswa, Program, Tanggal Pengajuan, dan Status.
  - Penyaringan Status (*Filter Tab/Dropdown*): Pilihan `Semua`, `Menunggu`, `Aktif`, dan `Ditolak`.
  - Sinkronisasi Parameter URL: Filter tersimpan di query string peramban (misal: `/staf/pendaftaran?status=menunggu`).
  - Verifikasi Pembayaran Manual:
    - Aksi **Setujui**: Mengubah status pendaftaran menjadi `aktif` setelah bukti pembayaran dicek offline.
    - Aksi **Tolak**: Mengubah status menjadi `ditolak` dengan input wajib **Catatan Staf** (alasan penolakan).
- **4.3. Kelola Kelas (`/staf/kelas` & `/staf/kelas/[id]`)**
  - Daftar seluruh kelas bimbingan belajar: Nama Kelas, Program Terkait, Tutor Pengajar, Jadwal (Hari & Jam), dan Jumlah Siswa Terdaftar.
  - Formulir **Buat Kelas Baru**: Input Nama Kelas, Pemilihan Program, Pemilihan Tutor (berdasarkan pengguna ber-role `tutor`), Hari, Jam, dan Tempat/Tautan.
  - Penambahan Siswa ke Kelas (**Tambah Siswa**):
    - Modal/daftar pemilihan siswa yang otomatis menyaring hanya siswa dengan status pendaftaran `aktif` pada program kelas tersebut.
    - Seleksi jamak (checkbox) untuk mendaftarkan siswa ke kelas sekaligus.
- **4.4. Basis Data Siswa (`/staf/siswa`)**
  - Tampilan rekap data siswa (*Read-Only*): Nama, Email, Nomor HP Orang Tua, dan Program Aktif.
  - Pencarian Cepat (*Search Bar*): Pencarian siswa secara instan berdasarkan nama.
  - Akses kontak darurat/orang tua untuk keperluan komunikasi staf.

---

### 5. Modul Tutor

- **5.1. Dasbor Tutor (`/tutor`)**
  - Kartu **Kelas Hari Ini**: Daftar kelas yang diampu tutor yang jadwalnya jatuh pada hari berjalan.
  - Kartu **Semua Kelas Saya**: Rekap seluruh kelas yang ditugaskan kepada tutor tersebut.
  - Isolasi Akses: Tutor hanya dapat melihat kelas di mana `tutorId` sesuai dengan UID akunnya.
- **5.2. Manajemen Kelas yang Diajar (`/tutor/kelas/[id]`)**
  - Rincian kelas, daftar siswa terdaftar, riwayat pertemuan, dan daftar tugas.
  - Pembuatan Pertemuan Kelas (**Buat Pertemuan**):
    - Input Tanggal Pertemuan (format `YYYY-MM-DD`).
    - Input Topik Bahasan.
    - Input Tautan Materi (opsional, jika diisi wajib berawalan `https://`).
  - Pencatatan Presensi Siswa:
    - Daftar hadir siswa dalam bentuk centang (*checkbox*).
    - Penyimpanan daftar UID siswa yang hadir ke dalam array `hadirIds`.
  - Akses Cepat Pembuatan Tugas Kelas (**Buat Tugas**).
- **5.3. Manajemen Tugas & Penilaian (`/tutor/tugas/[id]`)**
  - Pembuatan Tugas Baru: Input Judul Tugas, Deskripsi Instruksi Tugas, dan Batas Waktu (*Deadline*).
  - Rekap Pengumpulan Tugas: Tabel daftar seluruh siswa di kelas beserta status pengumpulan, waktu pengiriman, tautan jawaban, nilai, dan komentar.
  - Input Penilaian Siswa:
    - Formulir pemberian nilai angka bilangan bulat (0 hingga 100).
    - Kolom umpan balik / komentar evaluasi belajar.
    - Pembaruan status pengumpulan siswa secara otomatis menjadi `Dinilai`.

---

### 6. Modul Super Admin (Pemilik Bimbel)

- **6.1. Hak Akses Penuh (*Super Admin Universal Access*)**
  - Memiliki akses membaca dan mengelola seluruh modul yang ada pada peran Siswa, Staf, dan Tutor.
- **6.2. Dasbor Eksekutif Pemilik (`/admin`)**
  - Kartu Metrik Utama Bisnis:
    - **Siswa Aktif**: Total siswa yang memiliki minimal satu pendaftaran berstatus `aktif`.
    - **Pendaftaran Bulan Ini**: Akumulasi seluruh pengajuan pendaftaran pada bulan kalender berjalan.
    - **Rata-rata Kehadiran**: Persentase agregat kehadiran siswa di seluruh pertemuan pada bulan berjalan.
  - Navigasi langsung ke laporan melalui klik kartu ringkasan.
- **6.3. Kelola Pengguna (`/admin/pengguna` & `/admin/pengguna/[id]`)**
  - Tabel Daftar Pengguna: Nama, Email, Peran (*Role*), dan Status Keaktifan Akun.
  - Fitur Pencarian & Filter: Pencarian nama pengguna dan penyaringan berdasarkan peran (`siswa`, `staf`, `tutor`, `super_admin`).
  - Pengubahan Peran Pengguna: Memberikan hak akses staf, tutor, atau super admin kepada pengguna terdaftar.
  - Manajemen Status Akun: Mengaktifkan atau menonaktifkan akun pengguna (*soft-deactivation* tanpa menghapus histori data).
  - Proteksi Khusus Super Admin: Mencegah Super Admin menurunkan perannya sendiri atau menonaktifkan akunnya sendiri secara tidak sengaja.
- **6.4. Manajemen Program Bimbingan (`/admin/program`)**
  - Tabel Daftar Program: Nama Program, Jenjang (SMP/SMA), Jumlah Pertemuan, Harga Kursus, dan Status Aktif.
  - Formulir **Tambah Program Baru**: Input Nama, Jenjang, Jumlah Pertemuan (> 0), dan Biaya Pendaftaran (> 0).
  - Penonaktifan Program: Fitur menonaktifkan program (agar tidak muncul di katalog pendaftaran siswa baru) tanpa menghapus program yang sudah digunakan oleh kelas berjalan.
- **6.5. Laporan Rekapitulasi Bulanan (`/admin/laporan`)**
  - Filter Periode Bulan: Pilihan bulan kalender yang tersimpan di parameter URL peramban.
  - Tabel 1: **Rekap Siswa Aktif per Program** (distribusi siswa di setiap paket belajar).
  - Tabel 2: **Tingkat Kehadiran per Kelas** (rata-rata persentase presensi hadir siswa di tiap kelas).
  - Tabel 3: **Aktivitas & Beban Kerja Tutor** (jumlah kelas yang diampu dan total pertemuan tatap muka yang telah diselenggarakan dalam bulan tersebut).

---

### 7. Fitur Keamanan, Integritas Data & Arsitektur Sistem

- **7.1. Keamanan Dua Lapis (Two-Layer Security Architecture)**
  - **Lapis Navigasi (Route Guards):**
    - Pengecekan otorisasi sebelum merender halaman.
    - Pengunjung tanpa sesi diarahkan ke halaman `/masuk`.
    - Pengguna yang mencoba mengakses rute di luar wewenangnya dialihkan ke halaman bersahabat **Akses Ditolak** dengan tombol kembali.
  - **Lapis Basis Data (Firestore Security Rules):**
    - Pemeriksaan hak akses mutlak pada setiap kueri baca/tulis langsung di server database Firestore.
    - Siswa hanya berhak membaca/menulis data milik UID-nya sendiri.
    - Tutor hanya berhak mengelola kelas, pertemuan, dan pengumpulan tugas yang mencantumkan `tutorId`-nya.
    - Staf hanya berhak mengelola pendaftaran dan kelas, serta dilarang memanipulasi nilai atau presensi.
    - Penguncian field krusial: Field `role` dan `aktif` hanya boleh ditulis oleh Super Admin.
- **7.2. Ketahanan Sesi & Deep-linking**
  - Dukungan bookmark dan refresh pada seluruh URL halaman dinamis (misal: `/kelas/[id]`, `/tugas/[id]`, `/admin/pengguna/[id]`).
  - Halaman penanganan kesalahan **404 Not Found** ramah pengguna untuk rute yang tidak terdaftar.
- **7.3. Standar UI/UX 4-State**
  - Penanganan konsisten pada setiap komponen data:
    1. **Memuat (*Loading State*)**: Indikator visual loading/skeleton yang jelas.
    2. **Berhasil (*Success State*)**: Konten data disajikan rapi dalam panel putih.
    3. **Kosong (*Empty State*)**: Ilustrasi/pesan informatif disertai tombol tindakan saat data belum ada.
    4. **Gagal (*Error State*)**: Pesan kesalahan tanpa kode teknis rumit disertai tombol **"Coba Lagi"**.

---

### 8. Batas Ruang Lingkup Sistem (Out-of-Scope / Tidak Termasuk di v1)

Berdasarkan kesepakatan PRD Bab 9, fitur-fitur di bawah ini **tidak diimplementasikan pada versi 1.0**:
1. *Payment Gateway* / Pembayaran Online (pembayaran tetap diverifikasi tunai/manual oleh staf).
2. Akun & Portal Khusus Orang Tua (komunikasi dilakukan via nomor HP orang tua yang tercatat).
3. Pemutar Video Pembelajaran Internal & Kuis Otomatis (menggunakan tautan materi eksternal & tugas dinilai manual oleh tutor).
4. Pembuatan & Ekspor Dokumen Rapor PDF.
5. Integrasi Notifikasi Otomatis via WhatsApp API atau Email Broadcast.
6. Modul Perhitungan & Penggajian Tutor.
7. Ekspor Laporan ke format Excel (.xlsx) atau PDF (rekapitulasi dibaca langsung melalui layar antarmuka).
8. Aplikasi Seluler Native Android/iOS (antarmuka web sepenuhnya responsif untuk peramban ponsel).
9. Deteksi Bentrok Jadwal Otomatis antar ruang atau antar kelas.
