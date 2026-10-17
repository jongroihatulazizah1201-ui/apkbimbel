"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Send, Award, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { mockKelas } from "@/lib/mockData";

export default function TugasSiswaDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;

  const kelas = mockKelas.find((k) => k.tugasList.some((t) => t.id === id));
  const task = kelas?.tugasList.find((t) => t.id === id);

  const [submissionState, setSubmissionState] = useState(task?.status || "belum");
  const [tautan, setTautan] = useState("https://drive.google.com/file/d/jawaban-raka-utbk/view");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!kelas || !task) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="panel p-8 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm">
          <h1 className="text-2xl font-extrabold text-[#1F2937] mb-2">Tugas tidak ditemukan</h1>
          <p className="text-sm text-[#5A6B78] mb-6">
            Tugas pembelajaran dengan ID &ldquo;{id}&rdquo; tidak terdaftar di sistem.
          </p>
          <Link href="/tugas" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Tugas
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tautan.startsWith("https://")) {
      setErrorMsg("Tautan jawaban wajib diawali dengan https:// (misal Google Drive).");
      return;
    }
    setErrorMsg("");
    setSubmissionState("dikumpulkan");
    setSuccessMsg("Tautan tugas berhasil dikumpulkan! Menunggu penilaian tutor.");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href={`/kelas/${kelas.id}`} className="text-xs text-[#EA580C] font-semibold hover:underline mb-4 inline-flex items-center gap-1.5 transition">
        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke {kelas.nama}
      </Link>

      <div className="panel space-y-6">
        {/* Header Judul & Status Badge (PRD 5.2) */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">Kelas: {kelas.nama}</span>
            <h1 className="text-2xl font-extrabold text-[#1F2937] tracking-tight mt-1">{task.judul}</h1>
          </div>
          <div>
            {submissionState === "belum" && <span className="badge badge-unsubmitted">Belum dikumpulkan</span>}
            {submissionState === "dikumpulkan" && <span className="badge badge-pending">Dikumpulkan</span>}
            {submissionState === "dinilai" && <span className="badge badge-active">Dinilai</span>}
            {submissionState === "terlambat" && <span className="badge badge-rejected">Terlambat</span>}
          </div>
        </div>

        {/* Deskripsi & Batas Waktu */}
        <div className="bg-[#F7F5F2] border border-[#E5E7EB] p-4 rounded-lg space-y-3">
          <p className="text-xs text-[#1F2937] leading-relaxed">
            {task.deskripsi}
          </p>
          <div className="flex items-center gap-2 text-xs text-[#5A6B78] border-t border-[#E5E7EB] pt-2.5">
            <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Batas Waktu: <strong className="text-[#1F2937] tabular-nums">{task.batasWaktu}</strong></span>
          </div>
        </div>

        {/* Hasil Penilaian jika status dinilai (PRD 4.5: Nilai dan Komentar) */}
        {submissionState === "dinilai" && (
          <div className="bg-[#E8F8F0] border border-[#B6ECD5] rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#15A66A] font-extrabold text-base">
                <Award className="w-5 h-5 text-[#15A66A]" /> Hasil Penilaian Tutor
              </div>
              <div className="text-3xl font-black text-[#15A66A] tabular-nums">
                85 <span className="text-sm font-normal text-[#15A66A]">/ 100</span>
              </div>
            </div>
            <div className="border-t border-[#B6ECD5] pt-3">
              <div className="flex items-center gap-2 text-xs text-[#15A66A] font-bold mb-1.5">
                <div className="relative w-5 h-5 rounded-full overflow-hidden border border-[#B6ECD5] shrink-0">
                  <Image
                    src="/avatars/kak_dimas.jpg"
                    alt="Kak Dimas Tutor"
                    fill
                    className="object-cover"
                  />
                </div>
                <span>Umpan Balik Tutor:</span>
              </div>
              <p className="text-xs text-[#1F2937] bg-white border border-[#B6ECD5] p-3 rounded-lg leading-relaxed italic">
                “Pengerjaan tugas sudah sangat terstruktur dan logika analisis pada penalaran deduktif di nomor 15 sangat tepat. Pertahankan!”
              </p>
            </div>
          </div>
        )}

        {/* Form Pengumpulan Tautan Jawaban */}
        <div className="pt-2">
          <h3 className="text-sm font-bold text-[#1F2937] mb-2">Pengumpulan Jawaban Siswa</h3>

          {successMsg && (
            <div className="mb-4 p-3 bg-[#E8F8F0] border border-[#B6ECD5] text-[#15A66A] text-xs rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 p-3 bg-[#FDF2F2] border border-[#FECACA] text-[#E53935] text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
                Tautan Jawaban (Google Drive)*
              </label>
              <input
                type="url"
                required
                disabled={submissionState === "dinilai" || submissionState === "terlambat"}
                value={tautan}
                onChange={(e) => setTautan(e.target.value)}
                placeholder="https://drive.google.com/file/d/..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#5A6B78]/60 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] disabled:bg-stone-100 disabled:text-[#5A6B78]"
              />
              <p className="text-[11px] text-[#5A6B78] mt-1">
                Wajib diawali dengan https://. Pastikan hak akses Google Drive disetel untuk dapat dilihat oleh tutor.
              </p>
            </div>

            {submissionState !== "dinilai" && submissionState !== "terlambat" && (
              <button type="submit" className="btn-primary">
                <Send className="w-4 h-4" />
                {submissionState === "dikumpulkan" ? "Perbarui Tautan Jawaban" : "Kumpulkan Tugas"}
              </button>
            )}

            {submissionState === "dinilai" && (
              <div className="text-xs text-[#5A6B78] italic">
                *Tugas yang sudah dinilai oleh tutor tidak dapat diubah kembali.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
