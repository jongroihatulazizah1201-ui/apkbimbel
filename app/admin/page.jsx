import Link from "next/link";
import { Users, UserPlus, Award, BarChart3, BookOpen, ArrowRight, ShieldCheck, ClipboardCheck, GraduationCap } from "lucide-react";
import { mockUsers, mockPendaftaran, mockPrograms } from "@/lib/mockData";

export default function DasborSuperAdminPage() {
  const totalStudents = mockUsers.filter((u) => u.role === "siswa").length;
  const activeRegistrations = mockPendaftaran.filter((p) => p.status === "aktif").length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Panel Eksekutif Super Admin Sesuai PRD 5.1 & Tema Terang */}
      <div className="panel bg-white border border-[#E5E7EB] mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
                alt="Pak Arif - Super Admin"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#E5E7EB]"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#15A66A] border-2 border-white rounded-full"></span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">
                Dasbor Super Admin
              </h1>
              <p className="text-xs sm:text-sm text-[#5A6B78] mt-1">
                Selamat bertugas, <strong>Pak Arif</strong>. Pantau pertumbuhan siswa, presensi tatap muka, dan laporan bimbel.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin/laporan"
              className="btn-primary text-xs font-semibold py-2 px-3.5"
            >
              <BarChart3 className="w-4 h-4 mr-1.5" /> Buka Laporan
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Kartu Metrik Utama Bisnis (PRD 4.14) dengan Navigasi Spesifik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Siswa Aktif -> Menuju Laporan Tabel 1 */}
        <Link
          href="/admin/laporan"
          className="panel flex flex-col justify-between hover:border-[#EA580C] transition group"
        >
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-[#5A6B78] uppercase tracking-wider">Siswa Aktif</span>
              <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#1F2937] tabular-nums my-1 group-hover:text-[#EA580C] transition-colors">
              58 <span className="text-sm font-normal text-[#5A6B78]">siswa</span>
            </div>
            <p className="text-xs text-[#5A6B78] leading-relaxed">
              Jumlah siswa dengan minimal satu pendaftaran program berstatus aktif.
            </p>
          </div>
          <div className="text-xs font-semibold text-[#EA580C] mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
            <span>Buka Laporan Siswa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Pendaftaran Bulan Ini -> Menuju Verifikasi Pendaftaran Staf */}
        <Link
          href="/staf/pendaftaran"
          className="panel flex flex-col justify-between hover:border-[#F59E0B] transition group"
        >
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-[#5A6B78] uppercase tracking-wider">Pendaftaran Bulan Ini</span>
              <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center font-bold">
                <UserPlus className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#F59E0B] tabular-nums my-1 group-hover:text-[#D97706] transition-colors">
              14 <span className="text-sm font-normal text-[#5A6B78]">pengajuan</span>
            </div>
            <p className="text-xs text-[#5A6B78] leading-relaxed">
              Total pendaftaran baru yang masuk pada bulan berjalan. Perlu verifikasi administrasi.
            </p>
          </div>
          <div className="text-xs font-semibold text-[#F59E0B] mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
            <span>Verifikasi Pendaftaran</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Rata-rata Kehadiran -> Menuju Kelola Kelas & Presensi */}
        <Link
          href="/staf/kelas"
          className="panel flex flex-col justify-between hover:border-[#15A66A] transition group"
        >
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-[#5A6B78] uppercase tracking-wider">Rata-rata Kehadiran</span>
              <div className="w-8 h-8 rounded-lg bg-[#E8F8F0] text-[#15A66A] flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#15A66A] tabular-nums my-1 group-hover:text-emerald-700 transition-colors">
              92.4%
            </div>
            <p className="text-xs text-[#5A6B78] leading-relaxed">
              Persentase kehadiran tatap muka seluruh pertemuan sesi belajar aktif.
            </p>
          </div>
          <div className="text-xs font-semibold text-[#15A66A] mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
            <span>Tinjau Presensi Kelas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* Navigasi Modul Super Admin (PRD 4.14 - 4.17) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="panel flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#FAF5FF] text-[#9333EA] flex items-center justify-center mb-3 border border-purple-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#1F2937] mb-1">Kelola Pengguna</h3>
            <p className="text-xs text-[#5A6B78] leading-relaxed mb-5">
              Atur hak akses: tetapkan peran Siswa, Staf, Tutor, atau Super Admin, serta nonaktifkan akun pengguna.
            </p>
          </div>
          <Link href="/admin/pengguna" className="btn-secondary text-xs w-full justify-between">
            <span>Kelola Pengguna</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="panel flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center mb-3 border border-orange-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#1F2937] mb-1">Program (Admin)</h3>
            <p className="text-xs text-[#5A6B78] leading-relaxed mb-5">
              Kelola master paket bimbel, jenjang SMP/SMA, jumlah pertemuan, harga rupiah, dan status publikasi.
            </p>
          </div>
          <Link href="/admin/program" className="btn-secondary text-xs w-full justify-between">
            <span>Atur Program Belajar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="panel flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-3 border border-blue-200">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#1F2937] mb-1">Laporan</h3>
            <p className="text-xs text-[#5A6B78] leading-relaxed mb-5">
              Tinjau 3 tabel laporan: siswa aktif per program, kehadiran per kelas, dan beban pertemuan tiap tutor.
            </p>
          </div>
          <Link href="/admin/laporan" className="btn-primary text-xs w-full justify-between">
            <span>Buka Laporan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Akses Cepat Seluruh Modul Sistem (PRD 2.3 & 3.1) */}
      <div className="panel bg-[#F7F5F2] border border-[#E5E7EB]">
        <div className="mb-5">
          <h2 className="text-base font-bold text-[#1F2937] tracking-tight">
            Akses Terpadu Seluruh Modul (PRD Bab 4)
          </h2>
          <p className="text-xs text-[#5A6B78] mt-0.5">
            Sebagai Super Admin, Anda memiliki hak penuh untuk menginspeksi langsung operasional Staf, Tutor, dan Siswa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Modul Staf */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                  <ClipboardCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#1F2937]">Modul Staf</h3>
                  <span className="text-[10px] text-[#5A6B78]">Pendaftaran & Jadwal</span>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <Link href="/staf" className="flex items-center justify-between p-2 rounded bg-[#F7F5F2] hover:bg-orange-50 hover:text-[#EA580C] text-[#1F2937] font-medium transition">
                  <span>Dasbor Staf</span>
                  <ArrowRight className="w-3 h-3 text-[#5A6B78]" />
                </Link>
                <Link href="/staf/pendaftaran" className="flex items-center justify-between p-2 rounded bg-[#F7F5F2] hover:bg-orange-50 hover:text-[#EA580C] text-[#1F2937] font-medium transition">
                  <span>Verifikasi Pendaftaran</span>
                  <ArrowRight className="w-3 h-3 text-[#5A6B78]" />
                </Link>
                <Link href="/staf/kelas" className="flex items-center justify-between p-2 rounded bg-[#F7F5F2] hover:bg-orange-50 hover:text-[#EA580C] text-[#1F2937] font-medium transition">
                  <span>Kelola Jadwal & Presensi</span>
                  <ArrowRight className="w-3 h-3 text-[#5A6B78]" />
                </Link>
                <Link href="/staf/siswa" className="flex items-center justify-between p-2 rounded bg-[#F7F5F2] hover:bg-orange-50 hover:text-[#EA580C] text-[#1F2937] font-medium transition">
                  <span>Basis Data Siswa</span>
                  <ArrowRight className="w-3 h-3 text-[#5A6B78]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Modul Tutor */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#1F2937]">Modul Tutor</h3>
                  <span className="text-[10px] text-[#5A6B78]">Pengajaran & Tugas</span>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <Link href="/tutor" className="flex items-center justify-between p-2 rounded bg-[#F7F5F2] hover:bg-orange-50 hover:text-[#EA580C] text-[#1F2937] font-medium transition">
                  <span>Dasbor Tutor</span>
                  <ArrowRight className="w-3 h-3 text-[#5A6B78]" />
                </Link>
                <Link href="/tutor/kelas" className="flex items-center justify-between p-2 rounded bg-[#F7F5F2] hover:bg-orange-50 hover:text-[#EA580C] text-[#1F2937] font-medium transition">
                  <span>Daftar Kelas Diajar</span>
                  <ArrowRight className="w-3 h-3 text-[#5A6B78]" />
                </Link>
                <Link href="/tutor/tugas" className="flex items-center justify-between p-2 rounded bg-[#F7F5F2] hover:bg-orange-50 hover:text-[#EA580C] text-[#1F2937] font-medium transition">
                  <span>Evaluasi & Nilai Tugas</span>
                  <ArrowRight className="w-3 h-3 text-[#5A6B78]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Modul Siswa */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-orange-50 text-orange-700 flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#1F2937]">Modul Siswa</h3>
                  <span className="text-[10px] text-[#5A6B78]">Portal Belajar</span>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <Link href="/beranda" className="flex items-center justify-between p-2 rounded bg-[#F7F5F2] hover:bg-orange-50 hover:text-[#EA580C] text-[#1F2937] font-medium transition">
                  <span>Beranda Siswa</span>
                  <ArrowRight className="w-3 h-3 text-[#5A6B78]" />
                </Link>
                <Link href="/program" className="flex items-center justify-between p-2 rounded bg-[#F7F5F2] hover:bg-orange-50 hover:text-[#EA580C] text-[#1F2937] font-medium transition">
                  <span>Katalog Program Bimbel</span>
                  <ArrowRight className="w-3 h-3 text-[#5A6B78]" />
                </Link>
                <Link href="/kelas" className="flex items-center justify-between p-2 rounded bg-[#F7F5F2] hover:bg-orange-50 hover:text-[#EA580C] text-[#1F2937] font-medium transition">
                  <span>Kelas Saya</span>
                  <ArrowRight className="w-3 h-3 text-[#5A6B78]" />
                </Link>
                <Link href="/tugas" className="flex items-center justify-between p-2 rounded bg-[#F7F5F2] hover:bg-orange-50 hover:text-[#EA580C] text-[#1F2937] font-medium transition">
                  <span>Daftar Tugas Siswa</span>
                  <ArrowRight className="w-3 h-3 text-[#5A6B78]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
