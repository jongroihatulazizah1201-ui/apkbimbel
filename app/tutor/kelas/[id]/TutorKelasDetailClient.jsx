"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Plus, CheckSquare, ExternalLink, CheckCircle2, Clock, Users, ArrowLeft, AlertCircle, Sparkles, BookOpen } from "lucide-react";
import { mockKelas, mockUsers } from "@/lib/mockData";

export default function TutorKelasDetailClient({ id }) {
  const kelas = mockKelas.find((k) => k.id === id);
  const [pertemuanList, setPertemuanList] = useState(kelas?.pertemuan || []);
  const [showPertemuanModal, setShowPertemuanModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Form Buat Pertemuan
  const [tanggal, setTanggal] = useState("2026-10-20");
  const [topik, setTopik] = useState("");
  const [materiUrl, setMateriUrl] = useState("");

  // Presensi State untuk pertemuan aktif
  const [activePertemuanId, setActivePertemuanId] = useState(kelas?.pertemuan?.[0]?.id);
  const [hadirIds, setHadirIds] = useState(kelas?.pertemuan?.[0]?.hadirSiswa || []);

  if (!kelas) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="panel p-8 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm">
          <h1 className="text-2xl font-extrabold text-[#1F2937] mb-2">Kelas tidak ditemukan</h1>
          <p className="text-sm text-[#5A6B78] mb-6">
            Kelas dengan ID &ldquo;{id}&rdquo; tidak terdaftar dalam penugasan mengajar Anda.
          </p>
          <Link href="/tutor/kelas" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Kelas yang Diajar
          </Link>
        </div>
      </div>
    );
  }

  const handleToggleHadir = (studentId) => {
    if (hadirIds.includes(studentId)) {
      setHadirIds(hadirIds.filter((item) => item !== studentId));
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
      <Link href="/tutor" className="text-xs text-primary font-bold hover:underline mb-4 inline-flex items-center gap-1.5 transition">
        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dasbor Tutor
      </Link>

      {/* Header Kelas Tutor */}
      <div className="panel mb-8 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{kelas.nama}</h1>
              <span className="badge badge-active font-semibold">{kelas.programNama}</span>
            </div>
            <p className="text-sm text-slate-600 mt-2">
              Jadwal Mengajar: <strong className="text-slate-900">{kelas.hari}</strong>, <span className="tabular-nums font-semibold text-slate-900">{kelas.jam}</span> · Ruang: <strong className="text-slate-900">{kelas.tempat}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowPertemuanModal(true)}
              className="btn-primary text-xs py-2 px-3.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Buat Pertemuan
            </button>
            <Link
              href={kelas.tugasList[0]?.id ? `/tutor/tugas/${kelas.tugasList[0].id}` : "/tutor/tugas"}
              className="btn-secondary text-xs py-2 px-3.5 font-semibold"
            >
              Kelola Tugas & Nilai
            </Link>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Daftar Pertemuan & Materi */}
        <div className="lg:col-span-2 space-y-6">
          <div className="panel border border-slate-200/90">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Daftar Sesi Pertemuan ({pertemuanList.length})
              </h2>
              <span className="text-xs text-slate-500 font-medium">Klik sesi untuk input presensi</span>
            </div>

            <div className="space-y-4">
              {pertemuanList.map((pert, idx) => {
                const isActive = activePertemuanId === pert.id;
                return (
                  <div
                    key={pert.id}
                    onClick={() => {
                      setActivePertemuanId(pert.id);
                      setHadirIds(pert.hadirSiswa || []);
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? "border-primary bg-orange-50/40 shadow-md ring-2 ring-primary/20"
                        : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">Pertemuan {idx + 1}</span>
                      <span className="text-xs text-slate-500 tabular-nums font-medium">{pert.tanggal}</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mb-3">{pert.topik}</h3>
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs">
                      {pert.materiUrl ? (
                        <a
                          href={pert.materiUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-primary hover:underline flex items-center gap-1.5 font-bold"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Buka Materi (Google Drive)
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">Materi belum diunggah</span>
                      )}

                      <span className="text-slate-500 font-medium tabular-nums">
                        Hadir: <strong className="text-emerald-700 font-bold">{pert.hadirSiswa?.length || 0}</strong> / {kelas.siswaList.length} siswa
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Lembar Presensi Siswa untuk Pertemuan Aktif */}
        <div>
          <div className="panel sticky top-24 border border-slate-200/90 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-primary" /> Presensi Siswa Sesi
            </h2>
            <p className="text-xs text-slate-500 mb-4">Centang siswa yang hadir pada pertemuan yang sedang aktif.</p>

            <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 max-h-80 overflow-y-auto mb-4">
              {kelas.siswaList.map((siswa) => {
                const isHadir = hadirIds.includes(siswa.id);
                const userObj = mockUsers.find((u) => u.id === siswa.id || u.nama === siswa.nama);
                const avatarUrl = userObj?.avatar || "/avatars/default_user.svg";

                return (
                  <label
                    key={siswa.id}
                    className="flex items-center justify-between p-3 hover:bg-slate-50 cursor-pointer transition text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        <Image src={avatarUrl} alt={siswa.nama} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{siswa.nama}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{siswa.email}</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isHadir}
                      onChange={() => handleToggleHadir(siswa.id)}
                      className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                    />
                  </label>
                );
              })}
            </div>

            <div className="flex justify-between items-center mb-4 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-medium">
              <span>Total Hadir: <strong className="text-emerald-700 font-bold">{hadirIds.length}</strong></span>
              <span>Total Siswa: <strong className="text-slate-900 font-bold">{kelas.siswaList.length}</strong></span>
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="panel max-w-md w-full shadow-2xl border border-slate-200/90 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Buat Pertemuan Baru</h3>
            <p className="text-xs text-slate-500 mb-4">Kelas: <strong className="text-slate-800">{kelas.nama}</strong></p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreatePertemuan} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tanggal Pertemuan* (YYYY-MM-DD)
                </label>
                <input
                  type="date"
                  required
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Topik Bahasan Pembelajaran*
                </label>
                <input
                  type="text"
                  required
                  value={topik}
                  onChange={(e) => setTopik(e.target.value)}
                  placeholder="Contoh: Pembahasan Soal Logika Proposisi"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tautan Materi (Opsional, Google Drive)
                </label>
                <input
                  type="url"
                  value={materiUrl}
                  onChange={(e) => setMateriUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm"
                />
                <p className="text-[11px] text-slate-500 mt-1">Bila diisi, tautan wajib berawalan https://.</p>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPertemuanModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary text-xs py-2 px-4 shadow-sm">
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
