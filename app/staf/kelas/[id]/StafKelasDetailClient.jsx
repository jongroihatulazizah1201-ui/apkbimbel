"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserPlus, Users, Clock, MapPin, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { mockKelas, mockUsers, mockPendaftaran } from "@/lib/mockData";

export default function StafKelasDetailClient({ id }) {
  const kelas = mockKelas.find((k) => k.id === id);
  const [siswaList, setSiswaList] = useState(kelas?.siswaList || []);
  const [showModal, setShowModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  if (!kelas) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="panel p-8 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm">
          <h1 className="text-2xl font-extrabold text-[#1F2937] mb-2">Kelas tidak ditemukan</h1>
          <p className="text-sm text-[#5A6B78] mb-6">
            Rombongan belajar dengan ID &ldquo;{id}&rdquo; tidak terdaftar di sistem Langkah Juara.
          </p>
          <Link href="/staf/kelas" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Kelola Kelas
          </Link>
        </div>
      </div>
    );
  }

  const eligibleCandidates = mockUsers.filter(
    (u) => u.role === "siswa" && !siswaList.some((s) => s.id === u.id)
  );

  const handleToggleSelect = (toggleId) => {
    if (selectedIds.includes(toggleId)) {
      setSelectedIds(selectedIds.filter((item) => item !== toggleId));
    } else {
      setSelectedIds([...selectedIds, toggleId]);
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/staf/kelas" className="text-xs text-primary font-bold hover:underline mb-4 inline-flex items-center gap-1.5 transition">
        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Daftar Kelola Kelas
      </Link>

      {/* Header Kelas Sesuai PRD 4.9 */}
      <div className="panel mb-8 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{kelas.nama}</h1>
              <span className="badge badge-active font-semibold">{kelas.programNama}</span>
            </div>
            <p className="text-sm text-slate-600 mt-2">
              Tutor Pengampu: <strong className="text-slate-900">{kelas.tutorNama}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs bg-slate-50 border border-slate-200/80 px-4 py-3 rounded-xl font-medium text-slate-700">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" /> {kelas.hari}, {kelas.jam}
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" /> {kelas.tempat}
            </span>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Daftar Siswa di Kelas */}
      <div className="panel p-0 border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Siswa Terdaftar di Kelas Ini ({siswaList.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Siswa yang terdaftar akan melihat kelas ini di menu "Kelas Saya".</p>
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="btn-primary text-xs py-2 px-4 shadow-sm"
          >
            <UserPlus className="w-4 h-4" /> Tambah Siswa
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                <th className="py-3.5 px-5">Nama Siswa</th>
                <th className="py-3.5 px-4">Email Siswa</th>
                <th className="py-3.5 px-4">Nomor HP</th>
                <th className="py-3.5 px-4">HP Orang Tua</th>
                <th className="py-3.5 px-5 text-center">Status Pendaftaran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {siswaList.map((siswa) => {
                const userObj = mockUsers.find((u) => u.id === siswa.id || u.nama === siswa.nama);
                const avatarUrl = userObj?.avatar || "/avatars/default_user.svg";

                return (
                  <tr key={siswa.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-5 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                          <Image src={avatarUrl} alt={siswa.nama} fill className="object-cover" />
                        </div>
                        <span>{siswa.nama}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs font-mono">{siswa.email}</td>
                    <td className="py-3.5 px-4 text-slate-600 tabular-nums text-xs">081345678901</td>
                    <td className="py-3.5 px-4 text-slate-600 tabular-nums text-xs">081398765432</td>
                    <td className="py-3.5 px-5 text-center">
                      <span className="badge badge-active text-[10px] font-bold">Aktif</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Siswa */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="panel max-w-lg w-full shadow-2xl border border-slate-200/90 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Tambah Siswa ke {kelas.nama}</h3>
            <p className="text-xs text-slate-500 mb-4">
              Pilih siswa aktif yang akan dimasukkan ke rombongan belajar kelas ini.
            </p>

            <div className="border border-slate-200 rounded-xl max-h-60 overflow-y-auto divide-y divide-slate-100 mb-6">
              {eligibleCandidates.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  Semua siswa aktif sudah dimasukkan ke kelas ini.
                </div>
              ) : (
                eligibleCandidates.map((cand) => (
                  <label
                    key={cand.id}
                    className="flex items-center gap-3 p-3.5 hover:bg-slate-50 cursor-pointer transition text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(cand.id)}
                      onChange={() => handleToggleSelect(cand.id)}
                      className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                    />
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                      <Image
                        src={cand.avatar || "/avatars/default_user.svg"}
                        alt={cand.nama}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{cand.nama}</div>
                      <div className="text-xs text-slate-500">{cand.email}</div>
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
                className="btn-primary text-xs py-2 px-4 disabled:opacity-50 shadow-sm"
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
