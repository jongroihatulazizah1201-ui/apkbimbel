"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Users, Clock, MapPin, Layers, CheckCircle2 } from "lucide-react";
import { mockKelas, mockPrograms, mockUsers } from "@/lib/mockData";

export default function KelolaKelasStafPage() {
  const [kelasList, setKelasList] = useState(mockKelas);
  const [showModal, setShowModal] = useState(false);
  const [namaKelas, setNamaKelas] = useState("");
  const [programId, setProgramId] = useState(mockPrograms[0].id);
  const [tutorId, setTutorId] = useState("user-4");
  const [hari, setHari] = useState("Selasa");
  const [jam, setJam] = useState("16.00 WITA");
  const [tempat, setTempat] = useState("Ruang 2");
  const [successMsg, setSuccessMsg] = useState("");

  const tutors = mockUsers.filter((u) => u.role === "tutor");

  const handleCreateClass = (e) => {
    e.preventDefault();
    const selectedProgram = mockPrograms.find((p) => p.id === programId);
    const selectedTutor = tutors.find((t) => t.id === tutorId);

    const newClass = {
      id: `kelas-${Date.now()}`,
      nama: namaKelas,
      programId: programId,
      programNama: selectedProgram ? selectedProgram.nama : "",
      tutorId: tutorId,
      tutorNama: selectedTutor ? selectedTutor.nama : "",
      hari,
      jam,
      tempat,
      siswaList: [],
      pertemuan: [],
      tugasList: []
    };

    setKelasList([...kelasList, newClass]);
    setShowModal(false);
    setNamaKelas("");
    setSuccessMsg(`Kelas "${namaKelas}" berhasil dibuat! Silakan tambahkan siswa aktif.`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] tracking-tight">Kelola Kelas Bimbingan</h1>
          <p className="text-sm text-[#5A6B78] mt-1">Susun rombongan belajar, tentukan tutor pengampu, dan atur jadwal kelas.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="btn-primary self-start md:self-auto shadow-md"
        >
          <Plus className="w-4 h-4" /> Buat Kelas Baru
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Tabel Kelas Sesuai PRD 4.9 */}
      <div className="panel overflow-hidden p-0 border border-slate-200/90 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                <th className="py-3.5 px-5">Nama Kelas</th>
                <th className="py-3.5 px-4">Program</th>
                <th className="py-3.5 px-4">Tutor Pengampu</th>
                <th className="py-3.5 px-4">Hari & Jam</th>
                <th className="py-3.5 px-4">Ruang / Tempat</th>
                <th className="py-3.5 px-4">Jumlah Siswa</th>
                <th className="py-3.5 px-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {kelasList.map((k) => {
                const tutorUser = tutors.find((t) => t.id === k.tutorId);
                const tutorAvatar = tutorUser?.avatar || "/avatars/kak_dimas.jpg";

                return (
                  <tr key={k.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-5 font-bold text-slate-900 tracking-tight">{k.nama}</td>
                    <td className="py-4 px-4">
                      <span className="badge badge-active text-[11px] font-semibold">{k.programNama}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-200 shrink-0">
                          <Image src={tutorAvatar} alt={k.tutorNama} fill className="object-cover" />
                        </div>
                        <span className="font-semibold text-slate-800 text-xs">{k.tutorNama}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 tabular-nums text-xs">
                      <span className="font-medium text-slate-800">{k.hari}</span>, {k.jam}
                    </td>
                    <td className="py-4 px-4 text-slate-600 text-xs">
                      <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                        <MapPin className="w-3 h-3 text-primary" /> {k.tempat}
                      </span>
                    </td>
                    <td className="py-4 px-4 tabular-nums font-bold text-primary text-xs">
                      {k.siswaList.length} Siswa
                    </td>
                    <td className="py-4 px-5 text-center">
                      <Link
                        href={`/staf/kelas/${k.id}`}
                        className="btn-secondary text-xs py-1.5 px-3 font-semibold hover:border-primary/50"
                      >
                        Rincian & Tambah Siswa
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog Buat Kelas */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="panel max-w-lg w-full shadow-2xl border border-slate-200/90 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Buat Kelas Baru</h3>
            <p className="text-xs text-slate-500 mb-6">Lengkapi data kelas dan jadwal bimbingan belajar</p>

            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Kelas*
                </label>
                <input
                  type="text"
                  required
                  value={namaKelas}
                  onChange={(e) => setNamaKelas(e.target.value)}
                  placeholder="Contoh: Intensif UTBK A"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Program*
                  </label>
                  <select
                    value={programId}
                    onChange={(e) => setProgramId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {mockPrograms.filter(p => p.aktif).map((p) => (
                      <option key={p.id} value={p.id}>{p.nama} ({p.jenjang})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tutor Pengajar*
                  </label>
                  <select
                    value={tutorId}
                    onChange={(e) => setTutorId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {tutors.map((t) => (
                      <option key={t.id} value={t.id}>{t.nama}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Hari*
                  </label>
                  <input
                    type="text"
                    required
                    value={hari}
                    onChange={(e) => setHari(e.target.value)}
                    placeholder="Selasa"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Jam*
                  </label>
                  <input
                    type="text"
                    required
                    value={jam}
                    onChange={(e) => setJam(e.target.value)}
                    placeholder="16.00 WITA"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tempat*
                  </label>
                  <input
                    type="text"
                    required
                    value={tempat}
                    onChange={(e) => setTempat(e.target.value)}
                    placeholder="Ruang 2"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary text-xs py-2 px-4 shadow-sm">
                  Simpan Kelas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

