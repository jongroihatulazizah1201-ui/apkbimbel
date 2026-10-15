"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, Users, Clock, MapPin, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { mockKelas, mockUsers, mockPendaftaran } from "@/lib/mockData";

export default function RincianKelasStafDetailPage() {
  const kelas = mockKelas[0]; // Intensif UTBK A
  const [siswaList, setSiswaList] = useState(kelas.siswaList);
  const [showModal, setShowModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  // Ambil siswa yang memiliki pendaftaran aktif untuk program ini, tapi belum ada di kelas ini
  const activeEnrolledStudentIds = mockPendaftaran
    .filter((p) => p.programId === kelas.programId && p.status === "aktif")
    .map((p) => p.siswaId);

  const eligibleCandidates = mockUsers.filter(
    (u) => u.role === "siswa" && !siswaList.some((s) => s.id === u.id)
  );

  const handleToggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleAddStudents = () => {
    const toAdd = eligibleCandidates.filter((u) => selectedIds.includes(u.id));
    setSiswaList([...siswaList, ...toAdd]);
    setShowModal(false);
    setSelectedIds([]);
    setSuccessMsg(`${toAdd.length} siswa berhasil dimasukkan ke kelas ${kelas.nama}!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/staf/kelas" className="text-xs text-primary font-semibold hover:underline mb-4 inline-flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Daftar Kelola Kelas
      </Link>

      {/* Header Kelas */}
      <div className="panel mb-8 border-t-4 border-t-primary">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-app-text">{kelas.nama}</h1>
              <span className="badge badge-active">{kelas.programNama}</span>
            </div>
            <p className="text-sm text-app-muted mt-1">Tutor Pengajar: <strong className="text-app-text">{kelas.tutorNama}</strong></p>
          </div>

          <div className="flex items-center gap-4 text-xs bg-app-bg px-4 py-2.5 rounded-lg">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" /> {kelas.hari}, {kelas.jam}</span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> {kelas.tempat}</span>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Daftar Siswa di Kelas */}
      <div className="panel">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-app-text flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Siswa Terdaftar di Kelas Ini ({siswaList.length})
            </h2>
            <p className="text-xs text-app-muted">Siswa yang terdaftar akan melihat kelas ini di menu "Kelas Saya".</p>
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="btn-primary text-xs py-2 px-3.5 shadow-sm"
          >
            <UserPlus className="w-4 h-4" /> Tambah Siswa
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-app-border text-xs text-app-muted uppercase tracking-wider bg-app-bg/50">
                <th className="py-3 px-4">Nama Siswa</th>
                <th className="py-3 px-4">Email Siswa</th>
                <th className="py-3 px-4">Nomor HP</th>
                <th className="py-3 px-4">HP Orang Tua</th>
                <th className="py-3 px-4 text-center">Status Pendaftaran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {siswaList.map((siswa) => (
                <tr key={siswa.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3 px-4 font-semibold text-app-text">{siswa.nama}</td>
                  <td className="py-3 px-4 text-app-muted">{siswa.email}</td>
                  <td className="py-3 px-4 text-app-muted tabular-nums">081345678901</td>
                  <td className="py-3 px-4 text-app-muted tabular-nums">081398765432</td>
                  <td className="py-3 px-4 text-center"><span className="badge badge-active text-[10px]">Aktif</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Siswa */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="panel max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-app-text mb-1">Tambah Siswa ke {kelas.nama}</h3>
            <p className="text-xs text-app-muted mb-4">
              Hanya menampilkan siswa yang memiliki status pendaftaran aktif pada program {kelas.programNama}.
            </p>

            <div className="border border-app-border rounded-lg max-h-60 overflow-y-auto divide-y divide-gray-100 mb-6">
              {eligibleCandidates.length === 0 ? (
                <div className="p-6 text-center text-xs text-app-muted">
                  Semua siswa aktif sudah dimasukkan ke kelas ini.
                </div>
              ) : (
                eligibleCandidates.map((cand) => (
                  <label
                    key={cand.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(cand.id)}
                      onChange={() => handleToggleSelect(cand.id)}
                      className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                    <div>
                      <div className="font-semibold text-app-text">{cand.nama}</div>
                      <div className="text-xs text-app-muted">{cand.email}</div>
                    </div>
                  </label>
                ))
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn-secondary text-xs py-2 px-4"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={selectedIds.length === 0}
                onClick={handleAddStudents}
                className="btn-primary text-xs py-2 px-4 disabled:opacity-50"
              >
                Tambahkan ({selectedIds.length}) Siswa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
