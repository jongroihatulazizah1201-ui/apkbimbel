"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, ExternalLink, Save, CheckCircle2, Plus, Clock, ArrowLeft, AlertCircle } from "lucide-react";
import { mockKelas } from "@/lib/mockData";

export default function TugasDanNilaiTutorDetailPage() {
  const kelas = mockKelas[0];
  const initialTask = kelas.tugasList[0];

  const [tugas, setTugas] = useState(initialTask);
  const [submissions, setSubmissions] = useState(initialTask.submissions);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Form Buat Tugas Baru
  const [judulBaru, setJudulBaru] = useState("");
  const [deskripsiBaru, setDeskripsiBaru] = useState("");
  const [batasWaktuBaru, setBatasWaktuBaru] = useState("2026-10-25 23:59 WITA");

  // State untuk form edit nilai per siswa
  const [scores, setScores] = useState(
    initialTask.submissions.reduce((acc, sub) => {
      acc[sub.siswaId] = {
        nilai: sub.nilai !== null ? sub.nilai : "",
        komentar: sub.komentar || ""
      };
      return acc;
    }, {})
  );

  const handleScoreChange = (siswaId, field, value) => {
    setScores({
      ...scores,
      [siswaId]: {
        ...scores[siswaId],
        [field]: value
      }
    });
  };

  const handleSaveGrade = (siswaId) => {
    const studentScore = scores[siswaId];
    const num = parseInt(studentScore.nilai, 10);

    if (isNaN(num) || num < 0 || num > 100) {
      setErrorMsg("Nilai harus berupa angka bilangan bulat antara 0 sampai 100.");
      return;
    }
    setErrorMsg("");

    setSubmissions(
      submissions.map((sub) =>
        sub.siswaId === siswaId
          ? { ...sub, nilai: num, komentar: studentScore.komentar }
          : sub
      )
    );

    setSuccessMsg("Nilai dan komentar evaluasi tugas berhasil disimpan!");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    setTugas({
      ...tugas,
      judul: judulBaru,
      deskripsi: deskripsiBaru,
      batasWaktu: batasWaktuBaru
    });
    setShowCreateModal(false);
    setJudulBaru("");
    setDeskripsiBaru("");
    setSuccessMsg(`Tugas baru "${judulBaru}" berhasil dipublikasikan ke siswa!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/tutor" className="text-xs text-primary font-semibold hover:underline mb-4 inline-flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dasbor Tutor
      </Link>

      {/* Header Evaluasi Tugas */}
      <div className="panel mb-8 border-t-4 border-t-primary">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-app-text">{tugas.judul}</h1>
              <span className="badge badge-active">{kelas.nama}</span>
            </div>
            <p className="text-xs text-app-muted mt-1 max-w-2xl">{tugas.deskripsi}</p>
            <div className="text-xs text-app-muted mt-2 flex items-center gap-1.5 tabular-nums">
              <Clock className="w-3.5 h-3.5 text-primary" /> Batas Waktu: <strong className="text-app-text">{tugas.batasWaktu}</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="btn-primary text-xs py-2 px-3.5 shadow-sm self-start md:self-auto"
          >
            <Plus className="w-4 h-4" /> Buat Tugas Baru
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2 shadow-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tabel Pengumpulan Tugas Siswa */}
      <div className="panel overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-app-text flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" /> Rekap Pengumpulan & Penilaian Tugas
          </h2>
          <span className="text-xs text-app-muted font-medium tabular-nums">
            {submissions.filter(s => s.nilai !== null).length} dari {submissions.length} siswa telah dinilai
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-app-border text-xs text-app-muted uppercase tracking-wider bg-app-bg/50">
                <th className="py-3 px-4">Nama Siswa</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Waktu Kumpul</th>
                <th className="py-3 px-4">Tautan Jawaban</th>
                <th className="py-3 px-4">Nilai (0-100)*</th>
                <th className="py-3 px-4">Komentar Evaluasi</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submissions.map((sub) => {
                const currentScore = scores[sub.siswaId] || { nilai: "", komentar: "" };
                const isGraded = sub.nilai !== null;

                return (
                  <tr key={sub.siswaId} className="hover:bg-gray-50/70 transition">
                    <td className="py-3.5 px-4 font-bold text-app-text">{sub.siswaNama}</td>
                    <td className="py-3.5 px-4">
                      {isGraded ? (
                        <span className="badge badge-active text-[10px]">Dinilai</span>
                      ) : (
                        <span className="badge badge-pending text-[10px]">Dikumpulkan</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-app-muted tabular-nums">{sub.dikumpulkanPada}</td>
                    <td className="py-3.5 px-4">
                      <a
                        href={sub.tautan}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline text-xs flex items-center gap-1 font-semibold"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Buka Jawaban (Drive)
                      </a>
                    </td>
                    <td className="py-3.5 px-4">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={currentScore.nilai}
                        onChange={(e) => handleScoreChange(sub.siswaId, "nilai", e.target.value)}
                        placeholder="0-100"
                        className="w-20 px-2.5 py-1.5 bg-white border border-app-border rounded-md text-sm font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <input
                        type="text"
                        value={currentScore.komentar}
                        onChange={(e) => handleScoreChange(sub.siswaId, "komentar", e.target.value)}
                        placeholder="Tulis umpan balik..."
                        className="w-full min-w-[200px] px-2.5 py-1.5 bg-white border border-app-border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleSaveGrade(sub.siswaId)}
                        className="btn-primary text-xs py-1.5 px-3 whitespace-nowrap shadow-sm"
                      >
                        <Save className="w-3.5 h-3.5" /> Simpan Nilai
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Buat Tugas Baru */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="panel max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-app-text mb-1">Buat Tugas Kelas Baru</h3>
            <p className="text-xs text-app-muted mb-4">Kelas: {kelas.nama}</p>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5">
                  Judul Tugas*
                </label>
                <input
                  type="text"
                  required
                  value={judulBaru}
                  onChange={(e) => setJudulBaru(e.target.value)}
                  placeholder="Contoh: Latihan Penalaran Umum 4"
                  className="w-full px-3.5 py-2 bg-white border border-app-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5">
                  Deskripsi Instruksi Tugas*
                </label>
                <textarea
                  required
                  rows={3}
                  value={deskripsiBaru}
                  onChange={(e) => setDeskripsiBaru(e.target.value)}
                  placeholder="Instruksi pengerjaan tugas bagi siswa..."
                  className="w-full px-3.5 py-2 bg-white border border-app-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5">
                  Batas Waktu Pengumpulan (Deadline)*
                </label>
                <input
                  type="text"
                  required
                  value={batasWaktuBaru}
                  onChange={(e) => setBatasWaktuBaru(e.target.value)}
                  placeholder="Contoh: 28 Oktober 2026, 23.59 WITA"
                  className="w-full px-3.5 py-2 bg-white border border-app-border rounded-md text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-app-border">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary text-xs py-2 px-4">
                  Terbitkan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
