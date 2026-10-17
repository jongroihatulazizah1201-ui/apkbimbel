import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, User, FileText, ExternalLink, Calendar, CheckCircle2, AlertCircle, ArrowLeft, BookOpen } from "lucide-react";
import { mockKelas, mockUsers } from "@/lib/mockData";

export default async function RincianKelasSiswaPage({ params }) {
  const { id } = await params;

  const kelas = mockKelas.find((k) => k.id === id);

  if (!kelas) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="panel p-8 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm">
          <h1 className="text-2xl font-extrabold text-[#1F2937] mb-2">Kelas tidak ditemukan</h1>
          <p className="text-sm text-[#5A6B78] mb-6">
            Rincian kelas dengan ID "{id}" tidak tersedia atau Anda tidak terdaftar di kelas ini.
          </p>
          <Link href="/kelas" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Kelas Saya
          </Link>
        </div>
      </div>
    );
  }

  const tutorUser = mockUsers.find((u) => u.id === kelas.tutorId || u.nama === kelas.tutorNama);
  const tutorAvatar = tutorUser?.avatar || "/avatars/kak_dimas.jpg";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Rincian Kelas */}
      <div className="mb-8">
        <Link href="/kelas" className="text-xs text-primary font-bold hover:underline mb-3 inline-flex items-center gap-1.5 transition">
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Kelas Saya
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-1">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{kelas.nama}</h1>
              <span className="badge badge-active font-semibold">{kelas.programNama}</span>
            </div>
            <div className="flex items-center gap-2.5 mt-2.5">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-200 shrink-0">
                <Image src={tutorAvatar} alt={kelas.tutorNama} fill className="object-cover" />
              </div>
              <p className="text-sm text-slate-600">
                Tutor Pengampu: <strong className="text-slate-900">{kelas.tutorNama}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-slate-200/90 text-xs shadow-sm">
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <Clock className="w-4 h-4 text-primary" />
              <span>{kelas.hari}, <strong className="tabular-nums text-slate-900">{kelas.jam}</strong></span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{kelas.tempat}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri (2/3): Pertemuan & Materi */}
        <div className="lg:col-span-2 space-y-6">
          <div className="panel border border-slate-200/90">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Daftar Sesi Pertemuan
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {kelas.pertemuan.length} Sesi Terjadwal
              </span>
            </div>

            {kelas.pertemuan.length === 0 ? (
              <p className="text-sm text-slate-500 py-10 text-center">Belum ada pertemuan yang dijadwalkan.</p>
            ) : (
              <div className="space-y-4">
                {kelas.pertemuan.map((pert, idx) => (
                  <div key={pert.id} className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-sm transition">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">Pertemuan {idx + 1}</span>
                      <span className="text-xs text-slate-500 tabular-nums font-medium">{pert.tanggal}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-3.5">{pert.topik}</h3>
                    {pert.materiUrl ? (
                      <a
                        href={pert.materiUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary text-xs inline-flex items-center gap-2 py-2 px-3.5 font-bold text-primary hover:border-primary/50"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-primary" />
                        Buka Materi Pembelajaran (Google Drive)
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Materi belum diunggah oleh tutor</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan (1/3): Tugas Kelas */}
        <div>
          <div className="panel border border-slate-200/90">
            <h2 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Tugas Kelas
            </h2>

            {kelas.tugasList.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Tidak ada tugas aktif.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {kelas.tugasList.map((tugas) => (
                  <div key={tugas.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/40 hover:shadow-sm transition">
                    <div className="flex justify-between items-start mb-1.5">
                      <h4 className="font-bold text-sm text-slate-900">{tugas.judul}</h4>
                      <span className="badge badge-pending text-[10px] font-bold">Dikumpulkan</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-3 line-clamp-2 leading-relaxed">{tugas.deskripsi}</p>
                    <div className="text-[11px] text-slate-500 mb-3 tabular-nums font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" /> Batas: {tugas.batasWaktu}
                    </div>
                    <Link href={`/tugas/${tugas.id}`} className="btn-secondary w-full text-xs py-2 text-center block font-semibold">
                      Lihat Nilai & Jawaban
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

