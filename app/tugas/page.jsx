"use client";

import Link from "next/link";
import { ClipboardCheck, Clock, Award, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { mockKelas } from "@/lib/mockData";

export default function DaftarTugasSiswaPage() {
  // Ambil semua tugas kelas yang diikuti siswa
  const tasks = mockKelas.flatMap((k) =>
    k.tugasList.map((t) => ({
      ...t,
      kelasId: k.id,
      kelasNama: k.nama,
      programNama: k.programNama,
      mySubmission: t.submissions.find((s) => s.siswaId === "user-1"),
    }))
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-1">
          Modul Siswa · PRD 4.5
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">
          Tugas Belajar Saya
        </h1>
        <p className="text-sm text-[#5A6B78] mt-1">
          Pantau batas waktu pengerjaan tugas, kumpulkan tautan lembar jawaban, dan lihat evaluasi nilai dari tutor.
        </p>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => {
          const hasSubmitted = !!task.mySubmission;
          const isGraded = hasSubmitted && task.mySubmission.nilai !== null;

          return (
            <div
              key={task.id}
              className="panel bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm hover:border-[#EA580C] transition flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="badge bg-[#FFF7ED] text-[#EA580C] font-bold border border-orange-200">
                    {task.kelasNama}
                  </span>
                  {isGraded ? (
                    <span className="badge badge-active font-semibold">Dinilai: {task.mySubmission.nilai}/100</span>
                  ) : hasSubmitted ? (
                    <span className="badge badge-pending font-semibold">Dikumpulkan</span>
                  ) : (
                    <span className="badge badge-unsubmitted font-semibold">Belum Dikumpulkan</span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-[#1F2937]">{task.judul}</h2>
                <p className="text-xs text-[#5A6B78] max-w-2xl leading-relaxed">
                  {task.deskripsi}
                </p>

                <div className="flex items-center gap-2 text-xs text-[#5A6B78] pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Batas Waktu: <strong className="text-[#1F2937] tabular-nums">{task.batasWaktu}</strong></span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <Link
                  href={`/tugas/${task.id}`}
                  className="btn-primary text-xs font-bold py-2.5 px-4 shadow-sm"
                >
                  <span>{isGraded ? "Lihat Nilai & Umpan Balik" : hasSubmitted ? "Lihat Pengumpulan" : "Kumpulkan Jawaban"}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
