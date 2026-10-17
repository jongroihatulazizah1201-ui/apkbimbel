"use client";

import Link from "next/link";
import { ClipboardCheck, Clock, Award, Users, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { mockKelas } from "@/lib/mockData";

export default function DaftarTugasDanNilaiTutorPage() {
  // Ambil seluruh tugas dari seluruh kelas
  const allTasks = mockKelas.flatMap((k) =>
    k.tugasList.map((t) => ({
      ...t,
      kelasId: k.id,
      kelasNama: k.nama,
      programNama: k.programNama,
      totalSiswa: k.siswaList.length,
      gradedCount: t.submissions.filter((s) => s.nilai !== null).length,
      submittedCount: t.submissions.length,
    }))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-1">
            Modul Tutor · PRD 4.13
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] tracking-tight">
            Tugas dan Penilaian
          </h1>
          <p className="text-sm text-[#5A6B78] mt-1">
            Pantau pengumpulan lembar kerja siswa, evaluasi jawaban, dan berikan nilai serta umpan balik.
          </p>
        </div>

        <Link
          href={`/tutor/kelas/${mockKelas[0]?.id || "kelas-1"}`}
          className="btn-primary text-xs font-semibold py-2.5 px-4 self-start md:self-auto shadow-sm"
        >
          <ClipboardCheck className="w-4 h-4 mr-1.5" /> Buat Tugas di Kelas
        </Link>
      </div>

      {allTasks.length === 0 ? (
        <div className="panel text-center py-12 bg-white border border-[#E5E7EB] rounded-2xl">
          <p className="text-sm text-[#5A6B78]">Belum ada tugas yang dibuat di rombel Anda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {allTasks.map((t) => (
            <div
              key={t.id}
              className="panel bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm hover:border-[#EA580C] transition flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="badge bg-[#FFF7ED] text-[#EA580C] font-bold border border-orange-200">
                    {t.kelasNama}
                  </span>
                  <span className="badge bg-[#E8F8F0] text-[#15A66A] font-semibold">
                    {t.programNama}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#1F2937]">{t.judul}</h2>
                <p className="text-xs text-[#5A6B78] max-w-2xl leading-relaxed">
                  {t.deskripsi}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#5A6B78] pt-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Batas Waktu: <strong className="text-[#1F2937] tabular-nums">{t.batasWaktu}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#15A66A]" />
                    <span>Dikumpulkan: <strong className="text-[#1F2937] tabular-nums">{t.submittedCount} / {t.totalSiswa} Siswa</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Dinilai: <strong className="text-[#1F2937] tabular-nums">{t.gradedCount} Siswa</strong></span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <Link
                  href={`/tutor/tugas/${t.id}`}
                  className="btn-primary text-xs font-bold py-2.5 px-4 shadow-sm"
                >
                  <span>Periksa & Beri Nilai</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
