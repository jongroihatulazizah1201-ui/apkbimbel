import Link from "next/link";
import { Users, UserPlus, Award, BarChart3, BookOpen, ArrowRight, ShieldCheck, Calendar } from "lucide-react";
import { mockUsers, mockPendaftaran, mockPrograms } from "@/lib/mockData";

export default function DasborSuperAdminPage() {
  const totalStudents = mockUsers.filter((u) => u.role === "siswa").length;
  const activeRegistrations = mockPendaftaran.filter((p) => p.status === "aktif").length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Super Admin */}
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Hak Akses Pemilik Bimbel</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-app-text mt-1">Dasbor Eksekutif Super Admin</h1>
        <p className="text-sm text-app-muted">Selamat datang, Pak Arif. Pantau performa bisnis dan operasional bimbingan belajar.</p>
      </div>

      {/* 3 Kartu Metrik Utama Bisnis (PRD 4.14) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Siswa Aktif */}
        <Link
          href="/admin/laporan"
          className="panel border-t-4 border-t-primary flex flex-col justify-between hover:shadow-md transition group"
        >
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Total Siswa Aktif</span>
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="text-4xl font-extrabold text-app-text tabular-nums my-3 group-hover:text-primary transition">
              58 <span className="text-sm font-normal text-app-muted">siswa</span>
            </div>
            <p className="text-xs text-app-muted">Siswa yang memiliki minimal satu status pendaftaran program aktif.</p>
          </div>
          <div className="text-xs font-semibold text-primary mt-4 flex items-center gap-1">
            Lihat Analisis di Laporan <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Pendaftaran Bulan Ini */}
        <Link
          href="/admin/laporan"
          className="panel border-t-4 border-t-status-pending flex flex-col justify-between hover:shadow-md transition group"
        >
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-status-pending uppercase tracking-wider">Pendaftaran Bulan Ini</span>
              <UserPlus className="w-4 h-4 text-status-pending" />
            </div>
            <div className="text-4xl font-extrabold text-status-pending tabular-nums my-3">
              14 <span className="text-sm font-normal text-app-muted">pengajuan</span>
            </div>
            <p className="text-xs text-app-muted">Total pengajuan pendaftaran program pada bulan berjalan (Oktober 2026).</p>
          </div>
          <div className="text-xs font-semibold text-status-pending mt-4 flex items-center gap-1">
            Lihat Rekap Pendaftaran <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Rata-rata Kehadiran */}
        <Link
          href="/admin/laporan"
          className="panel border-t-4 border-t-status-active flex flex-col justify-between hover:shadow-md transition group"
        >
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-status-active uppercase tracking-wider">Rata-rata Kehadiran</span>
              <Award className="w-4 h-4 text-status-active" />
            </div>
            <div className="text-4xl font-extrabold text-status-active tabular-nums my-3">
              92.4%
            </div>
            <p className="text-xs text-app-muted">Persentase agregat presensi hadir dari seluruh sesi pertemuan kelas.</p>
          </div>
          <div className="text-xs font-semibold text-status-active mt-4 flex items-center gap-1">
            Lihat Presensi Kelas <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* Navigasi Modul Super Admin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="panel flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-app-text mb-1">Kelola Pengguna</h3>
            <p className="text-xs text-app-muted mb-4">
              Ubah peran akun menjadi Staf, Tutor, atau Super Admin, dan nonaktifkan akun yang berhenti.
            </p>
          </div>
          <Link href="/admin/pengguna" className="btn-secondary text-xs w-full justify-between">
            <span>Buka Kelola Pengguna</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="panel flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-primary flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-app-text mb-1">Kelola Program Bimbel</h3>
            <p className="text-xs text-app-muted mb-4">
              Tambah paket belajar baru, atur jenjang SMP/SMA, jumlah pertemuan, harga, dan status aktif.
            </p>
          </div>
          <Link href="/admin/program" className="btn-secondary text-xs w-full justify-between">
            <span>Atur Program Belajar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="panel flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-app-text mb-1">Laporan Rekapitulasi</h3>
            <p className="text-xs text-app-muted mb-4">
              Tinjau 3 tabel laporan bulanan: siswa per program, persentase kehadiran, dan beban kerja tutor.
            </p>
          </div>
          <Link href="/admin/laporan" className="btn-primary text-xs w-full justify-between">
            <span>Buka Laporan Bulanan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
