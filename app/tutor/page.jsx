import Link from "next/link";
import { BookOpen, Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { mockKelas } from "@/lib/mockData";

export default function DasborTutorPage() {
  // Simulasi tutor Kak Dimas (user-4)
  const myClasses = mockKelas;
  const todayClass = myClasses[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Tutor */}
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Portal Pengajar</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-app-text mt-1">Dasbor Tutor</h1>
        <p className="text-sm text-app-muted">Selamat mengajar, Kak Dimas. Kelola sesi tatap muka, materi, dan evaluasi tugas siswa.</p>
      </div>

      {/* Grid Metrik Tutor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Kartu Kelas Hari Ini */}
        <div className="panel border-l-4 border-l-primary flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Jadwal Mengajar Hari Ini
              </span>
              <span className="badge badge-active">{todayClass.hari}</span>
            </div>
            <h2 className="text-xl font-bold text-app-text mt-1">{todayClass.nama}</h2>
            <div className="bg-app-bg p-3.5 rounded-lg space-y-1.5 my-4 text-xs">
              <div className="flex items-center gap-2 text-app-text">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Pukul: <strong className="tabular-nums">{todayClass.jam}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-app-text">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>Ruang: <strong>{todayClass.tempat}</strong></span>
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

        {/* Kartu Semua Kelas Saya */}
        <div className="panel border-l-4 border-l-emerald-600 flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Beban Mengajar
              </span>
              <span className="badge badge-active">Semester Berjalan</span>
            </div>
            <h2 className="text-base font-semibold text-app-text">Semua Kelas yang Saya Ajar</h2>
            <div className="text-4xl font-extrabold text-emerald-600 tabular-nums my-4">
              {myClasses.length} <span className="text-base font-normal text-app-muted">rombongan belajar</span>
            </div>
            <p className="text-xs text-app-muted mb-4">
              Total siswa yang Anda ampu: <strong>{myClasses.reduce((acc, curr) => acc + curr.siswaList.length, 0)} Siswa</strong>.
            </p>
          </div>
          <Link
            href={`/tutor/tugas/${todayClass.tugasList[0]?.id || 'demo-id'}`}
            className="btn-secondary w-full justify-between"
          >
            <span>Periksa Tugas & Beri Nilai</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Daftar Kelas yang Diajar */}
      <div className="panel">
        <h2 className="text-lg font-bold text-app-text mb-4">Daftar Kelas yang Diajar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myClasses.map((k) => (
            <div key={k.id} className="p-4 rounded-xl border border-app-border bg-app-bg/50 hover:bg-white transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-base text-app-text">{k.nama}</h3>
                  <span className="badge badge-active text-[10px]">{k.programNama}</span>
                </div>
                <div className="text-xs text-app-muted space-y-1 mb-4">
                  <div>Jadwal: {k.hari}, <span className="tabular-nums font-medium text-app-text">{k.jam}</span></div>
                  <div>Tempat: <span className="font-medium text-app-text">{k.tempat}</span></div>
                  <div>Jumlah Siswa: <span className="font-bold text-primary tabular-nums">{k.siswaList.length} orang</span></div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/tutor/kelas/${k.id}`} className="btn-primary text-xs py-1.5 px-3 flex-1 text-center">
                  Pertemuan & Presensi
                </Link>
                <Link href={`/tutor/tugas/${k.tugasList[0]?.id || 'demo-id'}`} className="btn-secondary text-xs py-1.5 px-3">
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
