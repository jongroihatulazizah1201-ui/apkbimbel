import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Users, ShieldCheck, CheckCircle2 } from "lucide-react";
import { mockUsers } from "@/lib/mockData";

export default function HomePage() {
  const tutors = mockUsers.filter(u => u.role === "tutor");

  return (
    <div className="bg-[#F7F5F2]">
      {/* Hero Section Bersih Sesuai PRD 5.1 & Tema Terang */}
      <section className="border-b border-[#E5E7EB] bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Kolom Kiri: Informasi Utama & Tombol Aksi */}
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold text-[#EA580C] mb-3">
                Bimbingan Belajar Langkah Juara Makassar
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1F2937] leading-[1.15] mb-5">
                Fokus. Disiplin. <br />
                <span className="text-[#EA580C]">Raih Prestasi Juara.</span>
              </h1>

              <p className="text-[#5A6B78] text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
                Portal belajar terintegrasi untuk siswa SMP & SMA. Akses jadwal kelas tatap muka, unduh materi terstruktur, dan konsultasi langsung dengan tutor terbaik di Makassar.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link 
                  href="/beranda" 
                  className="btn-primary"
                >
                  Buka Beranda Siswa <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link 
                  href="/program" 
                  className="btn-secondary"
                >
                  Katalog Program
                </Link>
                <Link 
                  href="/masuk" 
                  className="text-xs font-semibold text-[#5A6B78] hover:text-[#EA580C] px-3 py-2 transition"
                >
                  Halaman Masuk (/masuk)
                </Link>
              </div>

              {/* Baris Ringkasan Metrik */}
              <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-[#E5E7EB] max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tabular-nums">60+</div>
                  <div className="text-xs text-[#5A6B78] font-medium mt-0.5">Siswa Aktif</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tabular-nums">5</div>
                  <div className="text-xs text-[#5A6B78] font-medium mt-0.5">Tutor Berpengalaman</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#EA580C] tabular-nums">100%</div>
                  <div className="text-xs text-[#5A6B78] font-medium mt-0.5">Materi Terbimbing</div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Foto Dokumentasi Asli */}
            <div className="lg:col-span-5">
              <div className="panel p-3 bg-white border border-[#E5E7EB] shadow-sm">
                <div className="relative rounded-lg overflow-hidden h-[340px] sm:h-[380px] bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
                    alt="Siswa Langkah Juara Belajar Bersama"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-[#E5E7EB] px-3 py-1 rounded text-xs font-semibold text-[#1F2937]">
                    Sesi Tatap Muka Makassar
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm border border-[#E5E7EB] p-3 rounded">
                    <p className="text-[11px] font-bold text-[#EA580C] uppercase tracking-wider mb-0.5">Metode Belajar Terstruktur</p>
                    <p className="text-xs text-[#1F2937] font-medium leading-snug">Kelompok kecil berfokus pada pendalaman materi dan pemecahan soal ujian.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutor Profile Section */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-1">
            Tenaga Pengajar
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">Tutor Langkah Juara</h2>
          <p className="text-[#5A6B78] text-sm mt-1">
            Belajar langsung bersama pengajar yang berdedikasi tinggi dan berpengalaman di bidangnya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div key={tutor.id} className="panel text-center flex flex-col items-center">
              <div className="relative mb-3">
                <img
                  src={tutor.avatar}
                  alt={tutor.nama}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#E5E7EB]"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#15A66A] border-2 border-white rounded-full"></span>
              </div>
              <h3 className="font-bold text-base text-[#1F2937]">{tutor.nama}</h3>
              <p className="text-xs text-[#EA580C] font-semibold mb-1 uppercase tracking-wide">Tutor Langkah Juara</p>
              <p className="text-xs text-[#5A6B78] mb-3 tabular-nums">{tutor.noHp} • {tutor.email}</p>
              <div className="w-full pt-3 border-t border-[#E5E7EB] flex items-center justify-center">
                <span className="badge badge-active text-[11px]">Tutor Aktif</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigasi Modul Sesuai Bab 4 PRD */}
      <section className="py-14 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-[#1F2937] tracking-tight">
              Akses Cepat Modul Berdasarkan Peran
            </h2>
            <p className="text-sm text-[#5A6B78] mt-2">
              Pilih portal peran di bawah ini untuk mengakses ruang belajar, administrasi bimbingan, atau manajemen pengajaran.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Siswa */}
            <div className="panel flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center font-bold mb-3 border border-orange-200">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#1F2937] mb-1">Peran Siswa</h3>
                <p className="text-xs text-[#5A6B78] mb-4">Melihat jadwal kelas, mengunduh materi, dan mengumpulkan tugas.</p>
                <div className="space-y-1.5 mb-5 text-xs text-[#5A6B78]">
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#15A66A]" /> /beranda (Dasbor)</div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#15A66A]" /> /program (Katalog)</div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#15A66A]" /> /kelas (Kelas Saya)</div>
                </div>
              </div>
              <Link href="/beranda" className="btn-primary text-xs w-full py-2">
                Halaman Siswa
              </Link>
            </div>

            {/* Staf */}
            <div className="panel flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold mb-3 border border-blue-200">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#1F2937] mb-1">Peran Staf</h3>
                <p className="text-xs text-[#5A6B78] mb-4">Verifikasi pendaftaran masuk, mengelola jadwal kelas, dan data siswa.</p>
                <div className="space-y-1.5 mb-5 text-xs text-[#5A6B78]">
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#15A66A]" /> /staf (Dasbor Staf)</div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#15A66A]" /> /staf/pendaftaran</div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#15A66A]" /> /staf/kelas</div>
                </div>
              </div>
              <Link href="/staf" className="btn-secondary text-xs w-full py-2">
                Halaman Staf
              </Link>
            </div>

            {/* Tutor */}
            <div className="panel flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] text-[#15A66A] flex items-center justify-center font-bold mb-3 border border-emerald-200">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#1F2937] mb-1">Peran Tutor</h3>
                <p className="text-xs text-[#5A6B78] mb-4">Mengisi presensi siswa, membuat tugas, dan memberikan nilai evaluasi.</p>
                <div className="space-y-1.5 mb-5 text-xs text-[#5A6B78]">
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#15A66A]" /> /tutor (Dasbor Tutor)</div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#15A66A]" /> /tutor/kelas (Kelas Diajar)</div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#15A66A]" /> /tutor/tugas (Tugas & Nilai)</div>
                </div>
              </div>
              <Link href="/tutor" className="btn-secondary text-xs w-full py-2">
                Halaman Tutor
              </Link>
            </div>

            {/* Super Admin */}
            <div className="panel flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#F7F5F2] text-[#1F2937] flex items-center justify-center font-bold mb-3 border border-[#E5E7EB]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#1F2937] mb-1">Super Admin</h3>
                <p className="text-xs text-[#5A6B78] mb-4">Pengelolaan akun pengguna, master program belajar, dan laporan bimbel.</p>
                <div className="space-y-1.5 mb-5 text-xs text-[#5A6B78]">
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#15A66A]" /> /admin (Dasbor Admin)</div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#15A66A]" /> /admin/pengguna</div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#15A66A]" /> /admin/laporan</div>
                </div>
              </div>
              <Link href="/admin" className="btn-secondary text-xs w-full py-2">
                Halaman Admin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
