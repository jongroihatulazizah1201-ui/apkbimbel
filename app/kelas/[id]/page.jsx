import Link from "next/link";
import { Clock, MapPin, User, FileText, ExternalLink, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { mockKelas } from "@/lib/mockData";

export default async function RincianKelasSiswaPage({ params }) {
  const { id } = await params;

  // Temukan kelas atau gunakan kelas default untuk simulasi demo
  const kelas = mockKelas.find((k) => k.id === id) || mockKelas[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Rincian Kelas */}
      <div className="mb-8">
        <Link href="/kelas" className="text-xs text-primary font-semibold hover:underline mb-2 inline-block">
          ← Kembali ke Kelas Saya
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-extrabold text-app-text">{kelas.nama}</h1>
              <span className="badge badge-active">{kelas.programNama}</span>
            </div>
            <p className="text-sm text-app-muted mt-1">Tutor Pengampu: <strong>{kelas.tutorNama}</strong></p>
          </div>

          <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-app-border text-xs">
            <div className="flex items-center gap-1.5 text-app-text">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{kelas.hari}, <strong className="tabular-nums">{kelas.jam}</strong></span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5 text-app-text">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{kelas.tempat}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri (2/3): Pertemuan & Materi */}
        <div className="lg:col-span-2 space-y-6">
          <div className="panel">
            <h2 className="text-lg font-bold text-app-text mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" /> Daftar Sesi Pertemuan
            </h2>

            {kelas.pertemuan.length === 0 ? (
              <p className="text-sm text-app-muted py-6 text-center">Belum ada pertemuan yang dijadwalkan.</p>
            ) : (
              <div className="space-y-4">
                {kelas.pertemuan.map((pert, idx) => (
                  <div key={pert.id} className="p-4 rounded-lg bg-app-bg border border-app-border/60">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-primary uppercase">Pertemuan {idx + 1}</span>
                      <span className="text-xs text-app-muted tabular-nums">{pert.tanggal}</span>
                    </div>
                    <h3 className="font-semibold text-app-text text-base mb-3">{pert.topik}</h3>
                    {pert.materiUrl ? (
                      <a
                        href={pert.materiUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary text-xs inline-flex items-center gap-1.5 bg-white py-1.5 px-3"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-primary" />
                        Buka Materi Pembelajaran (Google Drive)
                      </a>
                    ) : (
                      <span className="text-xs text-app-muted italic">Materi belum diunggah</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan (1/3): Tugas Kelas */}
        <div>
          <div className="panel">
            <h2 className="text-lg font-bold text-app-text mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Tugas Kelas
            </h2>

            {kelas.tugasList.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-8 h-8 text-status-active mx-auto mb-2" />
                <p className="text-sm text-app-muted">Tidak ada tugas aktif.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {kelas.tugasList.map((tugas) => (
                  <div key={tugas.id} className="p-3.5 rounded-lg border border-app-border bg-white hover:border-primary/40 transition">
                    <div className="flex justify-between items-start mb-1.5">
                      <h4 className="font-semibold text-sm text-app-text">{tugas.judul}</h4>
                      <span className="badge badge-pending text-[10px]">Dikumpulkan</span>
                    </div>
                    <p className="text-xs text-app-muted mb-3 line-clamp-2">{tugas.deskripsi}</p>
                    <div className="text-[11px] text-app-muted mb-3 tabular-nums">
                      Batas: {tugas.batasWaktu}
                    </div>
                    <Link href={`/tugas/${tugas.id}`} className="btn-secondary w-full text-xs py-1.5 text-center block">
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
