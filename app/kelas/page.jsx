import Link from "next/link";
import { Clock, MapPin, User, ArrowRight, Layers, Users, Calendar } from "lucide-react";
import { mockKelas } from "@/lib/mockData";

export default function KelasSayaDaftarPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Halaman Sesuai PRD 4.4 & 5.1 */}
      <div className="mb-8">
        <div className="text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-1">
          Jadwal Belajar
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">Kelas Saya</h1>
        <p className="text-sm text-[#5A6B78] mt-1">Daftar kelas tatap muka yang sedang Anda ikuti di Langkah Juara Makassar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockKelas.map((kelas) => (
          <div 
            key={kelas.id} 
            className="panel p-0 overflow-hidden flex flex-col justify-between"
          >
            {/* Gambar Cover Kelas */}
            <div className="relative h-44 bg-stone-100 overflow-hidden">
              <img
                src={kelas.gambar || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"}
                alt={kelas.nama}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="badge bg-[#15A66A] text-white font-semibold">
                  {kelas.programNama}
                </span>
                <span className="badge bg-white text-[#1F2937] border border-[#E5E7EB] tabular-nums">
                  {kelas.siswaList.length} Siswa
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <h2 className="text-lg font-bold leading-tight">{kelas.nama}</h2>
              </div>
            </div>

            {/* Isi Detail Kartu (PRD 4.4: Nama Kelas, Tutor, Hari, Jam, Tempat) */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Informasi Tutor */}
                <div className="flex items-center gap-3 p-3 bg-[#F7F5F2] rounded-lg border border-[#E5E7EB] mb-4">
                  <img
                    src={kelas.tutorAvatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"}
                    alt={kelas.tutorNama}
                    className="w-9 h-9 rounded-full object-cover border border-[#E5E7EB]"
                  />
                  <div>
                    <span className="text-[11px] text-[#5A6B78] block">Tutor Pengampu:</span>
                    <strong className="text-sm font-bold text-[#1F2937]">{kelas.tutorNama}</strong>
                  </div>
                </div>

                {/* Jadwal dan Tempat */}
                <div className="space-y-2 text-xs text-[#1F2937] mb-6">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>Jadwal: <strong>{kelas.hari}</strong>, pukul <strong className="tabular-nums">{kelas.jam}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>Tempat: <strong>{kelas.tempat}</strong></span>
                  </div>
                </div>
              </div>

              <Link 
                href={`/kelas/${kelas.id}`} 
                className="btn-primary w-full justify-between"
              >
                <span>Buka Rincian Kelas, Materi & Tugas</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
