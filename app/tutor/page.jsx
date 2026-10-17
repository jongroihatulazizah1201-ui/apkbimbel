import Link from "next/link";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { mockKelas, mockUsers } from "@/lib/mockData";

export default function DasborTutorPage() {
  // Simulasi tutor Kak Dimas (user-4)
  const myClasses = mockKelas;
  const todayClass = myClasses[0];
  const tutorInfo = mockUsers.find(u => u.id === "user-4") || { 
    nama: "Kak Dimas", 
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop" 
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Panel Tutor Sesuai PRD 5.1 & Tema Terang */}
      <div className="panel bg-white border border-[#E5E7EB] mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={tutorInfo.avatar}
                alt={tutorInfo.nama}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#E5E7EB]"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#15A66A] border-2 border-white rounded-full"></span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">
                Dasbor Tutor
              </h1>
              <p className="text-xs sm:text-sm text-[#5A6B78] mt-1">
                Selamat mengajar, <strong>{tutorInfo.nama}</strong>. Kelola sesi tatap muka, tautan materi, presensi, dan penilaian tugas siswa.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`/tutor/kelas/${todayClass.id}`}
              className="btn-primary text-xs font-semibold py-2 px-3.5"
            >
              <Calendar className="w-4 h-4 mr-1.5" /> Buat Pertemuan Baru
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Metrik Tutor (PRD 4.11 - 4.13) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Kartu Kelas Hari Ini */}
        <div className="panel flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                Jadwal Mengajar Hari Ini
              </span>
              <span className="badge badge-active text-xs">{todayClass.hari}</span>
            </div>
            <h2 className="text-xl font-bold text-[#1F2937] mt-1">{todayClass.nama}</h2>
            
            <div className="bg-[#F7F5F2] p-4 rounded-lg border border-[#E5E7EB] space-y-2 my-4 text-xs text-[#1F2937]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#EA580C]" />
                <span>Pukul: <strong className="tabular-nums">{todayClass.jam}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#EA580C]" />
                <span>Lokasi: <strong>{todayClass.tempat}</strong></span>
              </div>
            </div>
          </div>
          <Link
            href={`/tutor/kelas/${todayClass.id}`}
            className="btn-primary w-full justify-between"
          >
            <span>Buka Kelas, Pertemuan & Presensi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Kartu Beban Mengajar */}
        <div className="panel flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-[#15A66A] uppercase tracking-wider">
                Beban Mengajar Aktif
              </span>
              <span className="badge badge-active text-xs">TA 2026</span>
            </div>
            <h2 className="text-base font-bold text-[#1F2937]">Total Rombongan Belajar</h2>
            <div className="text-3xl font-black text-[#15A66A] tabular-nums my-2">
              {myClasses.length} <span className="text-sm font-normal text-[#5A6B78]">kelas</span>
            </div>
            <p className="text-xs text-[#5A6B78] mb-4 leading-relaxed">
              Total siswa yang Anda bina: <strong className="text-[#1F2937] tabular-nums">{myClasses.reduce((acc, curr) => acc + curr.siswaList.length, 0)} Siswa</strong>.
            </p>
          </div>
          <Link
            href="/tutor/tugas"
            className="btn-secondary w-full justify-between"
          >
            <span>Periksa Tugas & Beri Nilai</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Daftar Kelas yang Diajar */}
      <div className="panel">
        <h2 className="text-base font-bold text-[#1F2937] mb-4">Daftar Kelas yang Diajar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myClasses.map((k) => (
            <div key={k.id} className="p-4 rounded-lg border border-[#E5E7EB] bg-[#F7F5F2] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-sm text-[#1F2937]">{k.nama}</h3>
                  <span className="badge badge-active text-[10px]">{k.programNama}</span>
                </div>
                <div className="text-xs text-[#5A6B78] space-y-1 mb-4">
                  <div>Jadwal: <strong className="text-[#1F2937]">{k.hari}</strong>, <span className="tabular-nums font-semibold text-[#1F2937]">{k.jam}</span></div>
                  <div>Tempat: <span className="font-medium text-[#1F2937]">{k.tempat}</span></div>
                  <div>Siswa: <span className="font-semibold text-[#EA580C] tabular-nums">{k.siswaList.length} orang</span></div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/tutor/kelas/${k.id}`} className="btn-primary text-xs py-1.5 px-3 flex-1 text-center font-semibold">
                  Pertemuan & Presensi
                </Link>
                <Link href={k.tugasList[0]?.id ? `/tutor/tugas/${k.tugasList[0].id}` : "/tutor/tugas"} className="btn-secondary text-xs py-1.5 px-3 font-semibold">
                  Tugas ({k.tugasList.length})
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
