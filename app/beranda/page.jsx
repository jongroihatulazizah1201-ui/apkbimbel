"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, MapPin, ArrowRight, BookOpen, Layers } from "lucide-react";
import { mockKelas, mockUsers } from "@/lib/mockData";

export default function BerandaSiswaPage() {
  const [hasClass, setHasClass] = useState(true);

  // Ambil data mock kelas berikutnya (PRD 4.2)
  const nextClass = mockKelas[0];
  const pendingTask = nextClass.tugasList[0];
  const tutorData = mockUsers.find(u => u.id === nextClass.tutorId) || { avatar: nextClass.tutorAvatar };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Panel Sambutan Bersih Sesuai PRD 5.1 & Tema Terang */}
      <div className="panel bg-white border border-[#E5E7EB] mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F2937]">
              Semangat Belajar, Raka!
            </h1>
            <p className="text-sm text-[#5A6B78] mt-1 leading-relaxed">
              Jadwal tatap muka berikutnya sudah siap. Pastikan materi sudah dibaca dan tugas diselesaikan sebelum sesi belajar dimulai.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
              <div className="bg-[#F7F5F2] border border-[#E5E7EB] px-3 py-1.5 rounded-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#15A66A]"></span>
                <span className="text-[#5A6B78]">Program Aktif: <strong className="text-[#1F2937]">Intensif UTBK</strong></span>
              </div>
              <div className="bg-[#F7F5F2] border border-[#E5E7EB] px-3 py-1.5 rounded-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
                <span className="text-[#5A6B78]">Presensi: <strong className="text-[#1F2937] tabular-nums">100% Hadir</strong></span>
              </div>
            </div>
          </div>

          {/* Pengalih Keadaan Tampilan (PRD 4.2 Simulasi Siswa Baru vs Terdaftar) */}
          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 pt-2 md:pt-0">
            <span className="text-xs text-[#5A6B78] font-medium">Uji Tampilan PRD 4.2:</span>
            <div className="flex items-center gap-1 bg-[#F7F5F2] p-1 rounded-lg border border-[#E5E7EB]">
              <button
                onClick={() => setHasClass(true)}
                className={`px-3 py-1 rounded text-xs font-semibold transition ${
                  hasClass 
                    ? 'bg-[#EA580C] text-white shadow-sm' 
                    : 'text-[#5A6B78] hover:text-[#1F2937]'
                }`}
              >
                Ada Kelas & Tugas
              </button>
              <button
                onClick={() => setHasClass(false)}
                className={`px-3 py-1 rounded text-xs font-semibold transition ${
                  !hasClass 
                    ? 'bg-[#EA580C] text-white shadow-sm' 
                    : 'text-[#5A6B78] hover:text-[#1F2937]'
                }`}
              >
                Belum Terdaftar
              </button>
            </div>
          </div>
        </div>
      </div>

      {!hasClass ? (
        /* Keadaan Kosong (PRD 4.2): Anda belum terdaftar di kelas mana pun */
        <div className="panel text-center py-16 max-w-lg mx-auto bg-white border border-[#E5E7EB] shadow-sm">
          <div className="w-14 h-14 bg-[#FFF7ED] text-[#EA580C] border border-orange-200 rounded-xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#1F2937] mb-2">Anda Belum Terdaftar di Kelas Mana Pun</h2>
          <p className="text-sm text-[#5A6B78] mb-6 leading-relaxed max-w-sm mx-auto">
            Daftarkan diri Anda ke salah satu program bimbingan belajar kami untuk mendapatkan jadwal belajar tatap muka dan akses materi.
          </p>
          <Link href="/program" className="btn-primary">
            Lihat Program <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      ) : (
        /* Keadaan Aktif: Kelas Berikutnya & Tugas Belum Dikumpulkan */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kartu 1: Kelas Berikutnya (PRD 4.2) */}
          <div className="panel p-0 overflow-hidden flex flex-col justify-between">
            {/* Header Gambar & Ringkasan */}
            <div className="relative h-44 bg-stone-100 overflow-hidden">
              <img
                src={nextClass.gambar || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"}
                alt={nextClass.nama}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="badge bg-white text-[#EA580C] font-bold border border-[#E5E7EB] shadow-sm">
                  {nextClass.programNama}
                </span>
                <span className="badge bg-[#15A66A] text-white">
                  Tatap Muka
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <div className="text-xs text-orange-300 font-semibold mb-0.5">
                  Sesi Tatap Muka Terdekat
                </div>
                <h2 className="text-lg font-bold leading-tight">{nextClass.nama}</h2>
              </div>
            </div>

            {/* Isi Detail Kartu */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Informasi Tutor */}
                <div className="flex items-center gap-3 p-3 bg-[#F7F5F2] rounded-lg border border-[#E5E7EB] mb-4">
                  <img
                    src={tutorData.avatar || nextClass.tutorAvatar}
                    alt={nextClass.tutorNama}
                    className="w-9 h-9 rounded-full object-cover border border-[#E5E7EB]"
                  />
                  <div>
                    <span className="text-[11px] text-[#5A6B78] block">Tutor Pengampu:</span>
                    <strong className="text-sm font-bold text-[#1F2937]">{nextClass.tutorNama}</strong>
                  </div>
                </div>

                {/* Jadwal dan Tempat (PRD 4.2) */}
                <div className="space-y-2.5 text-sm text-[#1F2937] mb-6">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>Jadwal: <strong>{nextClass.hari}</strong>, pukul <strong className="tabular-nums">{nextClass.jam}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>Tempat: <strong>{nextClass.tempat}</strong></span>
                  </div>
                </div>
              </div>

              <Link 
                href={`/kelas/${nextClass.id}`} 
                className="btn-secondary w-full justify-between"
              >
                <span>Buka Rincian Kelas & Materi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Kartu 2: Tugas Belum Dikumpulkan (PRD 4.2) */}
          <div className="panel flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
                  Perlu Dikerjakan
                </div>
                {/* PRD 5.2: Warna Status Belum Dikumpulkan: #6B7280 */}
                <span className="badge badge-unsubmitted">
                  Belum dikumpulkan
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#1F2937] mb-2">
                {pendingTask.judul}
              </h2>

              <p className="text-xs text-[#5A6B78] leading-relaxed mb-6">
                {pendingTask.deskripsi}
              </p>

              {/* Kotak Batas Waktu */}
              <div className="bg-[#FFFBEB] border border-[#FDE68A] p-4 rounded-lg mb-6">
                <div className="text-xs text-[#B45309] font-medium mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Batas Waktu Pengumpulan:</span>
                </div>
                <div className="text-sm font-bold text-[#92400E] tabular-nums">
                  {pendingTask.batasWaktu}
                </div>
              </div>
            </div>

            <Link 
              href={`/tugas/${pendingTask.id}`} 
              className="btn-primary w-full justify-between"
            >
              <span>Kumpulkan Jawaban</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
