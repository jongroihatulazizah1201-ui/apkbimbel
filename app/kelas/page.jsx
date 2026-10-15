import Link from "next/link";
import { Clock, MapPin, User, ArrowRight, Layers } from "lucide-react";
import { mockKelas } from "@/lib/mockData";

export default function KelasSayaDaftarPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Aktivitas Belajar</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-app-text mt-1">Kelas Saya</h1>
        <p className="text-sm text-app-muted">Daftar kelas bimbingan aktif yang sedang Anda ikuti di Langkah Juara</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockKelas.map((kelas) => (
          <div key={kelas.id} className="panel flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="badge badge-active">{kelas.programNama}</span>
                <span className="text-xs text-app-muted font-medium tabular-nums">{kelas.siswaList.length} Siswa</span>
              </div>

              <h2 className="text-xl font-bold text-app-text mb-1">{kelas.nama}</h2>
              <div className="flex items-center gap-2 text-sm text-app-muted mb-4">
                <User className="w-4 h-4 text-primary" />
                <span>Tutor: <strong className="text-app-text">{kelas.tutorNama}</strong></span>
              </div>

              <div className="bg-app-bg p-4 rounded-lg space-y-2 mb-6 text-sm">
                <div className="flex items-center gap-2.5 text-app-text">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Jadwal: {kelas.hari}, <strong className="tabular-nums">{kelas.jam}</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-app-text">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Tempat: <strong>{kelas.tempat}</strong></span>
                </div>
              </div>
            </div>

            <Link href={`/kelas/${kelas.id}`} className="btn-primary w-full justify-between">
              <span>Buka Rincian Kelas & Tugas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
