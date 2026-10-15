# Rancangan Arsitektur & Spesifikasi Akses
## Portal Belajar Langkah Juara

Dokumen ini memuat matriks akses pengguna dan peta rute (*route map*) sistem Portal Belajar Langkah Juara berdasarkan dokumen PRD (*Product Requirements Document*).

---

## 1. Matriks Akses Pengguna

Matriks ini mendefinisikan hak akses fitur untuk 5 tipe pengguna: Pengunjung dan 4 peran terotentikasi (*Siswa*, *Staf*, *Tutor*, dan *Super Admin*).

| Fitur (subbab PRD) | Pengunjung | Siswa | Staf | Tutor | Super Admin |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **4.1 Daftar dan Masuk** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **4.2 Beranda** | ✕ | ✓ milik sendiri | ✕ | ✕ | ✓ |
| **4.3 Program** | ✕ | ✓ milik sendiri | ✕ | ✕ | ✓ |
| **4.4 Kelas Saya** | ✕ | ✓ milik sendiri | ✕ | ✕ | ✓ |
| **4.5 Tugas** *(Pengumpulan & Nilai Siswa)* | ✕ | ✓ milik sendiri | ✕ | ✕ | ✓ |
| **4.6 Profil** | ✕ | ✓ milik sendiri | ✓ milik sendiri | ✓ milik sendiri | ✓ milik sendiri |
| **4.7 Dasbor Staf** | ✕ | ✕ | ✓ | ✕ | ✓ |
| **4.8 Pendaftaran** *(Verifikasi Staf)* | ✕ | ✕ | ✓ | ✕ | ✓ |
| **4.9 Kelola Kelas** | ✕ | ✕ | ✓ | ✕ | ✓ |
| **4.10 Data Siswa** | ✕ | ✕ | ✓ | ✕ | ✓ |
| **4.11 Dasbor Tutor** | ✕ | ✕ | ✕ | ✓ milik sendiri | ✓ |
| **4.12 Kelas yang Diajar** *(Pertemuan & Presensi)* | ✕ | ✕ | ✕ | ✓ milik sendiri | ✓ |
| **4.13 Tugas dan Nilai** *(Penilaian Pengumpulan)* | ✕ | ✕ | ✕ | ✓ milik sendiri | ✓ |
| **4.14 Dasbor Admin** | ✕ | ✕ | ✕ | ✕ | ✓ |
| **4.15 Kelola Pengguna** | ✕ | ✕ | ✕ | ✕ | ✓ |
| **4.16 Program (Admin)** | ✕ | ✕ | ✕ | ✕ | ✓ |
| **4.17 Laporan** | ✕ | ✕ | ✕ | ✕ | ✓ |

### Keterangan Nilai Sel:
- **`✓`** : Dapat mengakses penuh fitur tersebut.
- **`✕`** : Akses ditolak (menu tidak ditampilkan; jika URL diakses paksa, sistem menolak).
- **`✓ milik sendiri`** : Akses dibatasi secara ketat hanya pada data yang terkait dengan akun bersangkutan:
  - **Siswa**: Hanya kelas yang diikutinya, tugas di kelasnya, pengumpulan dan nilai miliknya, riwayat pendaftarannya, dan profilnya sendiri.
  - **Tutor**: Hanya kelas yang ia ajar (`tutorId == uid`), serta pertemuan, presensi, tugas, dan penilaian pada kelas tersebut.
  - **Semua Peran (Profil)**: Hanya dapat melihat dan memperbarui data profil miliknya sendiri sesuai batasan field PRD.

---

## 2. Peta Route (*Route Map*)

Peta rute ini merinci setiap halaman, alamat URL, siapa yang berhak membuka, validasi kepemilikan data (*ownership check*), serta perilaku sistem saat akses ditolak.

| Halaman | Alamat | Status *(Siapa boleh membuka)* | Cek pemilik? | Saat ditolak |
| :--- | :--- | :--- | :---: | :--- |
| **Daftar** | `/daftar` | Publik *(Pengunjung)* | Tidak | Jika sudah masuk, dialihkan ke beranda/dasbor perannya |
| **Masuk** | `/masuk` | Publik *(Pengunjung)* | Tidak | Jika sudah masuk, dialihkan ke beranda/dasbor perannya. Jika akun dinonaktifkan, tampil pesan penolakan |
| **Profil** | `/profil` | Siswa, Staf, Tutor, Super Admin | Ya *(UID sendiri)* | Belum masuk $\to$ dialihkan ke `/masuk` |
| **Beranda** | `/beranda` | Siswa, Super Admin | Ya *(Data kelas & tugas milik sendiri)* | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Program (Siswa)** | `/program` | Siswa, Super Admin | Ya *(Pendaftaran milik sendiri)* | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Kelas Saya (Daftar)** | `/kelas` | Siswa, Super Admin | Ya *(Hanya kelas yang diikuti)* | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Rincian Kelas Siswa** | `/kelas/[id]` | Siswa, Tutor, Staf, Super Admin | Ya *(Siswa terdaftar di `siswaIds`)* | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Siswa di luar kelas $\to$ tampil *"Kelas tidak ditemukan"* |
| **Tugas Siswa** | `/tugas/[id]` | Siswa, Super Admin | Ya *(Siswa di kelas tugas tersebut)* | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Siswa di luar kelas $\to$ tampil *"Tugas tidak ditemukan"* |
| **Dasbor Staf** | `/staf` | Staf, Super Admin | Tidak | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Pendaftaran (Staf)** | `/staf/pendaftaran` | Staf, Super Admin | Tidak | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Kelola Kelas (Daftar)** | `/staf/kelas` | Staf, Super Admin | Tidak | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Rincian Kelas Staf** | `/staf/kelas/[id]` | Staf, Super Admin | Tidak | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Data Siswa** | `/staf/siswa` | Staf, Super Admin | Tidak *(Read-only)* | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Dasbor Tutor** | `/tutor` | Tutor, Super Admin | Ya *(Hanya kelas dengan `tutorId == UID`)* | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Kelas yang Diajar** | `/tutor/kelas/[id]` | Tutor, Super Admin | Ya *(Hanya tutor pengampu kelas tersebut)* | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Tutor lain / peran lain $\to$ tampil *Akses Ditolak* |
| **Tugas dan Nilai** | `/tutor/tugas/[id]` | Tutor, Super Admin | Ya *(Hanya tutor pengampu kelas tugas tersebut)* | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Tutor lain / peran lain $\to$ tampil *Akses Ditolak* |
| **Dasbor Admin** | `/admin` | Super Admin | Tidak | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Kelola Pengguna** | `/admin/pengguna` | Super Admin | Tidak | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Rincian Pengguna** | `/admin/pengguna/[id]` | Super Admin | Tidak | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Program (Admin)** | `/admin/program` | Super Admin | Tidak | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Laporan** | `/admin/laporan` | Super Admin | Tidak | Belum masuk $\to$ dialihkan ke `/masuk`.<br>Peran lain $\to$ tampil *Akses Ditolak* |
| **Halaman 404** | `*` *(Rute tak dikenal)* | Semua Pengguna | Tidak | Menampilkan halaman 404 dengan pesan ramah & tombol kembali |

---

## 3. Ketentuan Penjagaan Sistem (Security & Route Guard)

1. **Dual-Layer Protection**:
   - **Frontend**: *Route Guard* di level layout / middleware memeriksa status login dan peran pengguna sebelum konten halaman dirender. Pengunjung tanpa login diarahkan ke `/masuk?redirect=<target_url>`.
   - **Backend / Database**: *Firestore Security Rules* memverifikasi UID, kepemilikan dokumen (`siswaId`, `tutorId`, `siswaIds`), dan role pengguna untuk setiap operasi baca/tulis data.
2. **Pesan Penolakan Bersahabat**:
   - Halaman penolakan menjelaskan alasan penolakan secara jelas dan manusiawi tanpa kode teknis rumit, serta menyediakan tombol aksi kembali ke beranda peran masing-masing.
3. **Penyimpanan State di URL**:
   - Filter status pendaftaran (`/staf/pendaftaran?status=menunggu`) dan filter bulan laporan (`/admin/laporan?bulan=2026-10`) tersimpan di parameter URL peramban untuk mendukung penyegaran halaman (*refresh*) dan *deep-linking*.
