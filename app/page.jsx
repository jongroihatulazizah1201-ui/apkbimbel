import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Users, ShieldCheck, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-orange-50 border border-primary/20 rounded-2xl p-8 md:p-12 shadow-sm mb-12">
        <div className="inline-flex items-center gap-2 bg-primary-light text-primary font-semibold text-xs px-3.5 py-1.5 rounded-full mb-6 border border-primary/20">
          <GraduationCap className="w-4 h-4" />
          Bimbingan Belajar Langkah Juara Makassar
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-app-text tracking-tight mb-4 leading-tight">
          Portal Belajar <span className="text-primary">Langkah Juara</span>
        </h1>
        <p className="text-app-muted text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
          Satu tempat terintegrasi untuk pendaftaran program, jadwal kelas tatap muka, materi belajar, dan pengumpulan tugas bagi siswa SMP dan SMA.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/beranda" className="btn-primary shadow-md hover:shadow-lg transition">
            Buka Portal Belajar Siswa <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/masuk" className="btn-secondary">
            Halaman Masuk (/masuk)
          </Link>
          <Link href="/daftar" className="btn-secondary">
            Daftar Siswa Baru (/daftar)
          </Link>
        </div>
      </div>

      {/* Role Navigation Cards (Tanpa Login & Tanpa Penjagaan Halaman) */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-app-text">Jelajahi Modul Berdasarkan Peran</h2>
            <p className="text-sm text-app-muted">Aplikasi disetel tanpa penjagaan login agar Anda dapat langsung meninjau seluruh halaman pada Bab 4</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Siswa Card */}
          <div className="panel hover:border-primary/40 transition-all hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-primary flex items-center justify-center font-bold mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-app-text mb-1">Peran Siswa</h3>
              <p className="text-xs text-app-muted mb-4">Mendaftar program, mengikuti kelas, membuka materi, dan mengumpulkan tugas.</p>
              <ul className="text-xs space-y-2 mb-6 text-gray-600">
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /beranda (Beranda Siswa)</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /program (Katalog Program)</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /kelas (Kelas Saya)</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /tugas/demo-id (Detail Tugas)</li>
              </ul>
            </div>
            <Link href="/beranda" className="btn-primary text-xs w-full">
              Masuk Beranda Siswa
            </Link>
          </div>

          {/* Staf Card */}
          <div className="panel hover:border-primary/40 transition-all hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-app-text mb-1">Peran Staf</h3>
              <p className="text-xs text-app-muted mb-4">Memeriksa pendaftaran, menyusun kelas, jadwal, dan kontak siswa.</p>
              <ul className="text-xs space-y-2 mb-6 text-gray-600">
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /staf (Dasbor Staf)</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /staf/pendaftaran (Pendaftaran)</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /staf/kelas (Kelola Kelas)</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /staf/siswa (Data Siswa)</li>
              </ul>
            </div>
            <Link href="/staf" className="btn-primary text-xs w-full bg-blue-600 hover:bg-blue-700">
              Masuk Dasbor Staf
            </Link>
          </div>

          {/* Tutor Card */}
          <div className="panel hover:border-primary/40 transition-all hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-status-active flex items-center justify-center font-bold mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-app-text mb-1">Peran Tutor</h3>
              <p className="text-xs text-app-muted mb-4">Membuat pertemuan, mengisi presensi, memberi tugas dan nilai.</p>
              <ul className="text-xs space-y-2 mb-6 text-gray-600">
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /tutor (Dasbor Tutor)</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /tutor/kelas/demo-id (Kelas Diajar)</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /tutor/tugas/demo-id (Tugas & Nilai)</li>
              </ul>
            </div>
            <Link href="/tutor" className="btn-primary text-xs w-full bg-emerald-600 hover:bg-emerald-700">
              Masuk Dasbor Tutor
            </Link>
          </div>

          {/* Super Admin Card */}
          <div className="panel hover:border-primary/40 transition-all hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-app-text mb-1">Super Admin</h3>
              <p className="text-xs text-app-muted mb-4">Membuka semua halaman, kelola pengguna, program bimbel, dan laporan bulanan.</p>
              <ul className="text-xs space-y-2 mb-6 text-gray-600">
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /admin (Dasbor Eksekutif)</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /admin/pengguna (Kelola Akun)</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /admin/program (Atur Program)</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-status-active" /> /admin/laporan (Rekap Laporan)</li>
              </ul>
            </div>
            <Link href="/admin" className="btn-primary text-xs w-full bg-purple-600 hover:bg-purple-700">
              Masuk Dasbor Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
