"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle, ArrowRight, BookOpen } from "lucide-react";
import { mockKelas } from "@/lib/mockData";

export default function BerandaSiswaPage() {
  const [hasClass, setHasClass] = useState(true);

  // Ambil data mock kelas berikutnya
  const nextClass = mockKelas[0];
  const pendingTask = nextClass.tugasList[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Beranda */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Selamat Datang Kembali</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-app-text mt-1">Beranda Siswa</h1>
          <p className="text-sm text-app-muted">Pantau jadwal kelas terdekat dan tugas aktif Anda</p>
        </div>

        {/* State Switcher Preview Demo */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-app-border text-xs">
          <span className="text-app-muted">Simulasi State:</span>
          <button
            onClick={() => setHasClass(true)}
            className={`px-2.5 py-1 rounded font-medium transition ${hasClass ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Ada Kelas & Tugas
          </button>
          <button
            onClick={() => setHasClass(false)}
            className={`px-2.5 py-1 rounded font-medium transition ${!hasClass ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Belum Ada Kelas
          </button>
        </div>
      </div>

      {!hasClass ? (
        /* Empty State bila siswa belum terdaftar di kelas mana pun */
        <div className="panel text-center py-16 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-orange-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-app-text mb-2">Anda belum terdaftar di kelas mana pun</h2>
          <p className="text-sm text-app-muted mb-6 leading-relaxed">
            Daftarkan diri Anda ke salah satu program bimbingan belajar kami untuk mendapatkan jadwal belajar dan materi pembelajaran.
          </p>
          <Link href="/program" className="btn-primary">
            Lihat Program <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* State Aktif dengan Kartu Kelas & Tugas */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kartu Kelas Berikutnya */}
          <div className="panel border-t-4 border-t-primary flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Kelas Berikutnya
                </span>
                <span className="badge badge-active">{nextClass.programNama}</span>
              </div>

              <h2 className="text-xl font-bold text-app-text mb-2">{nextClass.nama}</h2>
              <p className="text-sm text-app-muted mb-6">Tutor Pengajar: <strong className="text-app-text">{nextClass.tutorNama}</strong></p>

              <div className="space-y-3 bg-app-bg p-4 rounded-lg mb-6">
                <div className="flex items-center gap-3 text-sm text-app-text">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{nextClass.hari}, <strong className="tabular-nums">{nextClass.jam}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-app-text">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Lokasi: <strong>{nextClass.tempat}</strong></span>
                </div>
              </div>
            </div>

            <Link href={`/kelas/${nextClass.id}`} className="btn-secondary w-full justify-between">
              <span>Buka Rincian Kelas & Materi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Kartu Tugas Belum Dikumpulkan */}
          <div className="panel border-t-4 border-t-status-pending flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-status-pending uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Tugas Aktif
                </span>
                <span className="badge badge-pending">Perlu Dikerjakan</span>
              </div>

              <h2 className="text-xl font-bold text-app-text mb-2">{pendingTask.judul}</h2>
              <p className="text-xs text-app-muted mb-4 line-clamp-2">{pendingTask.deskripsi}</p>

              <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-lg mb-6">
                <div className="text-xs text-amber-800 font-medium mb-1">Batas Waktu Pengumpulan:</div>
                <div className="text-sm font-bold text-amber-900 tabular-nums flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  {pendingTask.batasWaktu}
                </div>
              </div>
            </div>

            <Link href={`/tugas/${pendingTask.id}`} className="btn-primary w-full justify-between">
              <span>Kumpulkan Jawaban Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
