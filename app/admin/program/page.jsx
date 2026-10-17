"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, CheckCircle2, Edit, AlertCircle, ToggleLeft, ToggleRight } from "lucide-react";
import { mockPrograms } from "@/lib/mockData";

export default function ProgramAdminPage() {
  const [programs, setPrograms] = useState(mockPrograms);
  const [showModal, setShowModal] = useState(false);
  const [nama, setNama] = useState("");
  const [jenjang, setJenjang] = useState("SMA");
  const [jumlahPertemuan, setJumlahPertemuan] = useState(24);
  const [harga, setHarga] = useState(1200000);
  const [aktif, setAktif] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleToggleAktif = (id) => {
    setPrograms(
      programs.map((p) => (p.id === id ? { ...p, aktif: !p.aktif } : p))
    );
    setSuccessMsg("Status keaktifan program berhasil diperbarui!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleAddProgram = (e) => {
    e.preventDefault();
    if (jumlahPertemuan <= 0 || harga <= 0) {
      setErrorMsg("Jumlah pertemuan dan harga harus berupa angka lebih dari 0.");
      return;
    }
    setErrorMsg("");

    const newProg = {
      id: `prog-${Date.now()}`,
      nama,
      jenjang,
      jumlahPertemuan: Number(jumlahPertemuan),
      harga: Number(harga),
      aktif,
      gambar: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
      deskripsi: "Paket bimbingan belajar berkualitas terarah."
    };

    setPrograms([...programs, newProg]);
    setShowModal(false);
    setNama("");
    setSuccessMsg(`Program "${nama}" berhasil ditambahkan dan tampil di katalog siswa!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] tracking-tight">Kelola Program Bimbingan</h1>
          <p className="text-sm text-[#5A6B78] mt-1">Atur paket bimbingan belajar aktif untuk pendaftaran siswa baru.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="btn-primary self-start md:self-auto shadow-md"
        >
          <Plus className="w-4 h-4" /> Tambah Program Baru
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Tabel Program Sesuai PRD 4.16 */}
      <div className="panel p-0 border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                <th className="py-3.5 px-5">Nama Program</th>
                <th className="py-3.5 px-4">Jenjang</th>
                <th className="py-3.5 px-4">Jumlah Pertemuan</th>
                <th className="py-3.5 px-4">Harga / Biaya</th>
                <th className="py-3.5 px-4">Status Tampil</th>
                <th className="py-3.5 px-5 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {programs.map((prog) => {
                const cover = prog.gambar || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80";

                return (
                  <tr key={prog.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-5 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-9 rounded-lg overflow-hidden border border-slate-200 shrink-0 shadow-xs">
                          <Image src={cover} alt={prog.nama} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900">{prog.nama}</div>
                          <div className="text-[11px] font-normal text-slate-500 line-clamp-1">{prog.deskripsi}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`badge ${prog.jenjang === 'SMA' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'} text-[11px] font-bold`}>
                        {prog.jenjang}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 tabular-nums font-semibold text-xs">{prog.jumlahPertemuan} Pertemuan</td>
                    <td className="py-4 px-4 text-primary font-black tabular-nums text-sm">{formatRupiah(prog.harga)}</td>
                    <td className="py-4 px-4">
                      {prog.aktif ? (
                        <span className="badge badge-active text-[10px] font-bold">Aktif</span>
                      ) : (
                        <span className="badge badge-unsubmitted text-[10px] font-bold">Nonaktif</span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleAktif(prog.id)}
                        className={`btn-secondary text-xs py-1.5 px-3.5 font-bold ${prog.aktif ? 'text-red-600 hover:bg-red-50 hover:border-red-200' : 'text-emerald-700 hover:bg-emerald-50 hover:border-emerald-200'}`}
                      >
                        {prog.aktif ? "Nonaktifkan" : "Aktifkan"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Program */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="panel max-w-md w-full shadow-2xl border border-slate-200/90 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Tambah Program Baru</h3>
            <p className="text-xs text-slate-500 mb-4">Program langsung tersedia di katalog siswa jika status aktif.</p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleAddProgram} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Program*
                </label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Super Intensif Kedokteran"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Jenjang Pendidikan*
                </label>
                <select
                  value={jenjang}
                  onChange={(e) => setJenjang(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Jumlah Pertemuan*
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={jumlahPertemuan}
                    onChange={(e) => setJumlahPertemuan(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Harga (Rupiah)*
                  </label>
                  <input
                    type="number"
                    min={10000}
                    step={10000}
                    required
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm tabular-nums"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={aktif}
                    onChange={(e) => setAktif(e.target.checked)}
                    className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                  />
                  <span className="font-bold text-slate-800 text-xs">Langsung Aktifkan untuk Katalog Siswa</span>
                </label>
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
                  Simpan Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

