import { Timestamp } from "firebase/firestore";

export type UserRole = "siswa" | "staf" | "tutor" | "super_admin";

export interface UserProfile {
  id: string; // Sama dengan uid akun Firebase Authentication
  nama: string;
  email: string;
  noHp?: string;
  noHpOrangTua?: string;
  role: UserRole;
  aktif: boolean;
  dibuatPada: Timestamp;
}

export type JenjangProgram = "SMP" | "SMA";

export interface Program {
  id: string;
  nama: string;
  jenjang: JenjangProgram;
  jumlahPertemuan: number;
  harga: number; // Dalam Rupiah
  aktif: boolean;
}

export type StatusPendaftaran = "menunggu" | "aktif" | "ditolak";

export interface Pendaftaran {
  id: string;
  siswaId: string; // uid siswa
  programId: string; // ID dokumen program
  status: StatusPendaftaran;
  catatanStaf?: string;
  dibuatPada: Timestamp;
}

export interface Kelas {
  id: string;
  nama: string;
  programId: string;
  tutorId: string; // uid tutor
  siswaIds: string[]; // array of uid siswa
  hari: string;
  jam: string;
  tempat: string;
}

export interface Pertemuan {
  id: string;
  kelasId: string;
  tanggal: string; // format YYYY-MM-DD
  topik: string;
  materiUrl?: string;
  hadirIds: string[]; // array of uid siswa yang hadir
}

export interface Tugas {
  id: string;
  kelasId: string;
  judul: string;
  deskripsi: string;
  batasWaktu: Timestamp;
}

export interface Pengumpulan {
  id: string;
  tugasId: string;
  siswaId: string;
  kelasId: string;
  tautan: string;
  dikumpulkanPada: Timestamp;
  nilai?: number; // 0 - 100
  komentar?: string;
}

// Status tugas dihitung secara dinamis di klien
export type StatusTugasSiswa = "belum_dikumpulkan" | "dikumpulkan" | "dinilai" | "terlambat";
