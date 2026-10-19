"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, ExternalLink, Save, CheckCircle2, Plus, Clock, ArrowLeft, AlertCircle, FileCheck2 } from "lucide-react";
import { mockKelas, mockUsers } from "@/lib/mockData";

export default function TutorTugasDetailClient({ id }) {
  const kelas = mockKelas.find((k) => k.tugasList.some((t) => t.id === id));
  const initialTask = kelas?.tugasList.find((t) => t.id === id);

  const [tugas, setTugas] = useState(initialTask || {});
  const [submissions, setSubmissions] = useState(initialTask?.submissions || []);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Form Buat Tugas Baru
  const [judulBaru, setJudulBaru] = useState("");
  const [deskripsiBaru, setDeskripsiBaru] = useState("");
  const [batasWaktuBaru, setBatasWaktuBaru] = useState("2026-10-25 23:59 WITA");

  // State untuk form edit nilai per siswa
  const [scores, setScores] = useState(
    (initialTask?.submissions || []).reduce((acc, sub) => {
      acc[sub.siswaId] = {
        nilai: sub.nilai !== null ? sub.nilai : "",
        komentar: sub.komentar || ""
      };
      return acc;
    }, {})
  );

  if (!kelas || !initialTask) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="panel p-8 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm">
          <h1 className="text-2xl font-extrabold text-[#1F2937] mb-2">Tugas tidak ditemukan</h1>
          <p className="text-sm text-[#5A6B78] mb-6">
            Tugas pembelajaran dengan ID &ldquo;{id}&rdquo; tidak terdaftar di sistem.
          </p>
          <Link href="/tutor/tugas" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Tugas & Nilai
          </Link>
        </div>
      </div>
    );
  }

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
      <Link href="/tutor" className="text-xs text-primary font-bold hover:underline mb-4 inline-flex items-center gap-1.5 transition">
        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dasbor Tutor
      </Link>

      {/* Header Evaluasi Tugas */}
      <div className="panel mb-8 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{tugas.judul}</h1>
              <span className="badge badge-active font-semibold">{kelas.nama}</span>
            </div>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">{tugas.deskripsi}</p>
            <div className="text-xs text-slate-600 mt-3 inline-flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg tabular-nums font-medium">
              <Clock className="w-3.5 h-3.5 text-primary" /> Batas Waktu: <strong className="text-slate-900">{tugas.batasWaktu}</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="btn-primary text-xs py-2 px-4 shadow-sm self-start md:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" /> Buat Tugas Baru
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2 shadow-sm animate-in fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">{errorMsg}</span>
        </div>
      )}

      {/* Tabel Pengumpulan Tugas Siswa */}
      <div className="panel p-0 border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" /> Rekap Pengumpulan & Penilaian Tugas
          </h2>
          <span className="text-xs text-slate-500 font-medium tabular-nums bg-slate-50 px-3 py-1 rounded-lg border border-slate-200/70">
            {submissions.filter((s) => s.nilai !== null).length} dari {submissions.length} siswa telah dinilai
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                <th className="py-3.5 px-5">Nama Siswa</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Waktu Kumpul</th>
                <th className="py-3.5 px-4">Tautan Jawaban</th>
                <th className="py-3.5 px-4">Nilai (0-100)*</th>
                <th className="py-3.5 px-4">Komentar Evaluasi</th>
                <th className="py-3.5 px-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.map((sub) => {
                const currentScore = scores[sub.siswaId] || { nilai: "", komentar: "" };
                const isGraded = sub.nilai !== null;
                const student = mockUsers.find((u) => u.id === sub.siswaId || u.nama === sub.siswaNama);
                const avatarUrl = student?.avatar || "/avatars/default_user.svg";

                return (
                  <tr key={sub.siswaId} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-5 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                          <Image src={avatarUrl} alt={sub.siswaNama} fill className="object-cover" />
                        </div>
                        <span>{sub.siswaNama}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {isGraded ? (
                        <span className="badge badge-active text-[10px] font-bold">Dinilai</span>
                      ) : (
                        <span className="badge badge-pending text-[10px] font-bold">Dikumpulkan</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 tabular-nums">{sub.dikumpulkanPada}</td>
                    <td className="py-3.5 px-4">
                      <a
                        href={sub.tautan}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline text-xs inline-flex items-center gap-1 font-bold"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Buka Drive
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
                        className="w-20 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-black tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <input
                        type="text"
                        value={currentScore.komentar}
                        onChange={(e) => handleScoreChange(sub.siswaId, "komentar", e.target.value)}
                        placeholder="Tulis umpan balik..."
                        className="w-full min-w-[200px] px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-700 placeholder:text-slate-400"
                      />
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <button
                        type="button"
                        onClick={() => handleSaveGrade(sub.siswaId)}
                        className="btn-primary text-xs py-1.5 px-3.5 whitespace-nowrap shadow-sm"
                      >
                        <Save className="w-3.5 h-3.5" /> Simpan
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="panel max-w-lg w-full shadow-2xl border border-slate-200/90 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Buat Tugas Kelas Baru</h3>
            <p className="text-xs text-slate-500 mb-4">Kelas: <strong className="text-slate-800">{kelas.nama}</strong></p>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Judul Tugas*
                </label>
                <input
                  type="text"
                  required
                  value={judulBaru}
                  onChange={(e) => setJudulBaru(e.target.value)}
                  placeholder="Contoh: Latihan Penalaran Umum 4"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Deskripsi Instruksi Tugas*
                </label>
                <textarea
                  required
                  rows={3}
                  value={deskripsiBaru}
                  onChange={(e) => setDeskripsiBaru(e.target.value)}
                  placeholder="Instruksi pengerjaan tugas bagi siswa..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Batas Waktu Pengumpulan (Deadline)*
                </label>
                <input
                  type="text"
                  required
                  value={batasWaktuBaru}
                  onChange={(e) => setBatasWaktuBaru(e.target.value)}
                  placeholder="Contoh: 28 Oktober 2026, 23.59 WITA"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary text-xs py-2 px-4 shadow-sm">
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
