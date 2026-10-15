"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Send, ExternalLink, CheckCircle2, MessageSquare, Award, AlertCircle } from "lucide-react";

export default function TugasSiswaDetailPage() {
  const [submissionState, setSubmissionState] = useState("dinilai"); // "belum", "dikumpulkan", "dinilai", "terlambat"
  const [tautan, setTautan] = useState("https://drive.google.com/file/d/jawaban-raka-utbk/view");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/kelas/demo-id" className="text-xs text-primary font-semibold hover:underline mb-4 inline-block">
        ← Kembali ke Kelas
      </Link>

      {/* State Switcher Preview Demo */}
      <div className="bg-white p-3 rounded-lg border border-app-border text-xs flex items-center justify-between gap-3 mb-6">
        <span className="font-semibold text-app-muted">Simulasi 4 Status Tugas (PRD 4.5):</span>
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => { setSubmissionState("belum"); setSuccessMsg(""); }}
            className={`px-2.5 py-1 rounded font-medium ${submissionState === 'belum' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Belum Dikumpulkan
          </button>
          <button
            onClick={() => { setSubmissionState("dikumpulkan"); setSuccessMsg(""); }}
            className={`px-2.5 py-1 rounded font-medium ${submissionState === 'dikumpulkan' ? 'bg-status-pending text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Dikumpulkan
          </button>
          <button
            onClick={() => { setSubmissionState("dinilai"); setSuccessMsg(""); }}
            className={`px-2.5 py-1 rounded font-medium ${submissionState === 'dinilai' ? 'bg-status-active text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Dinilai (Nilai 85)
          </button>
          <button
            onClick={() => { setSubmissionState("terlambat"); setSuccessMsg(""); }}
            className={`px-2.5 py-1 rounded font-medium ${submissionState === 'terlambat' ? 'bg-status-rejected text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Terlambat
          </button>
        </div>
      </div>

      <div className="panel space-y-6">
        {/* Status Badge */}
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold text-app-muted">Kelas: Intensif UTBK A</span>
            <h1 className="text-2xl font-bold text-app-text mt-1">Latihan Penalaran Umum 3</h1>
          </div>
          <div>
            {submissionState === "belum" && <span className="badge badge-unsubmitted">Belum dikumpulkan</span>}
            {submissionState === "dikumpulkan" && <span className="badge badge-pending">Dikumpulkan</span>}
            {submissionState === "dinilai" && <span className="badge badge-active">Dinilai</span>}
            {submissionState === "terlambat" && <span className="badge badge-rejected">Terlambat</span>}
          </div>
        </div>

        {/* Deskripsi & Batas Waktu */}
        <div className="bg-app-bg p-4 rounded-lg space-y-3">
          <p className="text-sm text-app-text leading-relaxed">
            Kerjakan seluruh soal penalaran umum paket 3 pada materi modul. Cantumkan tautan Google Drive dokumen jawaban Anda dengan akses yang sudah dibuka.
          </p>
          <div className="flex items-center gap-2 text-xs text-app-muted border-t border-app-border/80 pt-3">
            <Clock className="w-4 h-4 text-primary" />
            <span>Batas Waktu Pengumpulan: <strong className="text-app-text tabular-nums">20 Oktober 2026, 23.59 WITA</strong></span>
          </div>
        </div>

        {/* Hasil Penilaian jika status dinilai */}
        {submissionState === "dinilai" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                <Award className="w-5 h-5 text-emerald-600" /> Hasil Penilaian Tutor
              </div>
              <div className="text-3xl font-extrabold text-emerald-700 tabular-nums">
                85 <span className="text-sm font-medium text-emerald-600">/ 100</span>
              </div>
            </div>
            <div className="border-t border-emerald-200/60 pt-3">
              <div className="text-xs text-emerald-800 font-semibold mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Komentar Kak Dimas:
              </div>
              <p className="text-sm text-emerald-900 bg-white/70 p-3 rounded-md">
                “Pengerjaan tugas Raka sudah sangat terstruktur dan logika analisis pada penalaran deduktif di nomor 15 sangat tepat. Pertahankan!”
              </p>
            </div>
          </div>
        )}

        {/* Form Pengumpulan Tautan */}
        <div>
          <h3 className="text-sm font-bold text-app-text mb-3">Pengumpulan Jawaban Siswa</h3>

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5">
                Tautan Jawaban (Google Drive)*
              </label>
              <input
                type="url"
                required
                disabled={submissionState === "dinilai" || submissionState === "terlambat"}
                value={tautan}
                onChange={(e) => setTautan(e.target.value)}
                placeholder="https://drive.google.com/file/d/..."
                className="w-full px-3.5 py-2.5 bg-white border border-app-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-100 disabled:text-gray-500"
              />
              <p className="text-[11px] text-app-muted mt-1.5">
                Pastikan izin berbagi tautan Google Drive disetel ke "Siapa saja yang memiliki link dapat melihat".
              </p>
            </div>

            {submissionState !== "dinilai" && submissionState !== "terlambat" && (
              <button type="submit" className="btn-primary">
                <Send className="w-4 h-4" />
                {submissionState === "dikumpulkan" ? "Perbarui Tautan Jawaban" : "Kumpulkan Tugas"}
              </button>
            )}

            {submissionState === "dinilai" && (
              <div className="text-xs text-app-muted italic">
                *Tugas yang sudah dinilai tidak dapat diubah kembali.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
