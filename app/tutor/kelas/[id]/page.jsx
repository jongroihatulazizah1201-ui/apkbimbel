"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Plus, CheckSquare, ExternalLink, CheckCircle2, Clock, Users, ArrowLeft, AlertCircle } from "lucide-react";
import { mockKelas } from "@/lib/mockData";

export default function KelasYangDiajarTutorDetailPage() {
  const kelas = mockKelas[0]; // Intensif UTBK A
  const [pertemuanList, setPertemuanList] = useState(kelas.pertemuan);
  const [showPertemuanModal, setShowPertemuanModal] = useState(false);
  const [showTugasModal, setShowTugasModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Form Buat Pertemuan
  const [tanggal, setTanggal] = useState("2026-10-20");
  const [topik, setTopik] = useState("");
  const [materiUrl, setMateriUrl] = useState("");

  // Presensi State untuk pertemuan aktif
  const [activePertemuanId, setActivePertemuanId] = useState(pertemuanList[0]?.id);
  const [hadirIds, setHadirIds] = useState(pertemuanList[0]?.hadirSiswa || []);

  const handleToggleHadir = (studentId) => {
    if (hadirIds.includes(studentId)) {
      setHadirIds(hadirIds.filter((id) => id !== studentId));
    } else {
      setHadirIds([...hadirIds, studentId]);
    }
  };

  const handleSavePresensi = () => {
    setPertemuanList(
      pertemuanList.map((p) => (p.id === activePertemuanId ? { ...p, hadirSiswa: hadirIds } : p))
    );
    setSuccessMsg(`Presensi pertemuan berhasil disimpan! (${hadirIds.length} dari ${kelas.siswaList.length} siswa hadir).`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleCreatePertemuan = (e) => {
    e.preventDefault();
    if (materiUrl && !materiUrl.startsWith("https://")) {
      setErrorMsg("Tautan materi bila diisi wajib diawali https:// (misal Google Drive).");
      return;
    }
    setErrorMsg("");

    const newPert = {
      id: `pert-${Date.now()}`,
      tanggal,
      topik,
      materiUrl: materiUrl || "",
      hadirSiswa: []
    };

    setPertemuanList([...pertemuanList, newPert]);
    setShowPertemuanModal(false);
    setTopik("");
    setMateriUrl("");
    setSuccessMsg("Pertemuan baru berhasil dibuat dan materi dapat diakses oleh siswa!");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/tutor" className="text-xs text-primary font-semibold hover:underline mb-4 inline-flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dasbor Tutor
      </Link>

      {/* Header Kelas Tutor */}
      <div className="panel mb-8 border-t-4 border-t-primary">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-app-text">{kelas.nama}</h1>
              <span className="badge badge-active">{kelas.programNama}</span>
            </div>
            <p className="text-sm text-app-muted mt-1">
              Jadwal Mengajar: {kelas.hari}, <strong className="tabular-nums text-app-text">{kelas.jam}</strong> · Ruang: <strong className="text-app-text">{kelas.tempat}</strong>
            </p>
          </div>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setShowPertemuanModal(true)}
              className="btn-primary text-xs py-2 px-3.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Buat Pertemuan
            </button>
            <Link
              href={`/tutor/tugas/${kelas.tugasList[0]?.id || 'demo-id'}`}
              className="btn-secondary text-xs py-2 px-3.5 shadow-sm"
            >
              Kelola Tugas & Nilai
            </Link>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Daftar Pertemuan & Materi */}
        <div className="lg:col-span-2 space-y-6">
          <div className="panel">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-app-text flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Daftar Sesi Pertemuan ({pertemuanList.length})
              </h2>
            </div>

            <div className="space-y-4">
              {pertemuanList.map((pert, idx) => (
                <div
                  key={pert.id}
                  onClick={() => {
                    setActivePertemuanId(pert.id);
                    setHadirIds(pert.hadirSiswa || []);
                  }}
                  className={`p-4 rounded-xl border transition cursor-pointer ${
                    activePertemuanId === pert.id
                      ? "border-primary bg-primary-light/30 shadow-sm"
                      : "border-app-border bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-primary uppercase">Pertemuan {idx + 1}</span>
                    <span className="text-xs text-app-muted tabular-nums">{pert.tanggal}</span>
                  </div>
                  <h3 className="font-bold text-base text-app-text mb-2">{pert.topik}</h3>
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-app-border/50 text-xs">
                    {pert.materiUrl ? (
                      <a
                        href={pert.materiUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-primary hover:underline flex items-center gap-1 font-semibold"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Buka Materi (Drive)
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">Materi belum ada</span>
                    )}

                    <span className="text-app-muted font-medium tabular-nums">
                      Hadir: <strong className="text-status-active">{pert.hadirSiswa?.length || 0}</strong> / {kelas.siswaList.length} siswa
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Lembar Presensi Siswa untuk Pertemuan Aktif */}
        <div>
          <div className="panel sticky top-24">
            <h2 className="text-base font-bold text-app-text mb-1 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-primary" /> Isi Presensi Siswa
            </h2>
            <p className="text-xs text-app-muted mb-4">Centang siswa yang hadir pada pertemuan yang dipilih.</p>

            <div className="border border-app-border rounded-lg divide-y divide-gray-100 max-h-72 overflow-y-auto mb-4">
              {kelas.siswaList.map((siswa) => {
                const isHadir = hadirIds.includes(siswa.id);
                return (
                  <label
                    key={siswa.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer text-sm"
                  >
                    <div>
                      <div className="font-semibold text-app-text">{siswa.nama}</div>
                      <div className="text-[11px] text-app-muted">{siswa.email}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isHadir}
                      onChange={() => handleToggleHadir(siswa.id)}
                      className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                  </label>
                );
              })}
            </div>

            <div className="flex justify-between items-center mb-4 text-xs text-app-muted">
              <span>Total Hadir: <strong className="text-status-active">{hadirIds.length}</strong></span>
              <span>Total Siswa: <strong className="text-app-text">{kelas.siswaList.length}</strong></span>
            </div>

            <button
              type="button"
              onClick={handleSavePresensi}
              className="btn-primary w-full justify-center text-xs py-2.5 shadow-sm"
            >
              Simpan Presensi Pertemuan
            </button>
          </div>
        </div>
      </div>

      {/* Modal Buat Pertemuan */}
      {showPertemuanModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="panel max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-app-text mb-1">Buat Pertemuan Baru</h3>
            <p className="text-xs text-app-muted mb-4">Kelas: {kelas.nama}</p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreatePertemuan} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5">
                  Tanggal Pertemuan* (YYYY-MM-DD)
                </label>
                <input
                  type="date"
                  required
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-app-border rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5">
                  Topik Bahasan Pembelajaran*
                </label>
                <input
                  type="text"
                  required
                  value={topik}
                  onChange={(e) => setTopik(e.target.value)}
                  placeholder="Contoh: Pembahasan Soal Logika Proposisi"
                  className="w-full px-3.5 py-2 bg-white border border-app-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5">
                  Tautan Materi (Opsional, Google Drive)
                </label>
                <input
                  type="url"
                  value={materiUrl}
                  onChange={(e) => setMateriUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3.5 py-2 bg-white border border-app-border rounded-md text-sm"
                />
                <p className="text-[11px] text-app-muted mt-1">Bila diisi, tautan wajib berawalan https://.</p>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-app-border">
                <button
                  type="button"
                  onClick={() => setShowPertemuanModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary text-xs py-2 px-4">
                  Simpan Pertemuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
