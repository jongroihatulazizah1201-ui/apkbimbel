"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, X, Clock, AlertCircle, CheckCircle2, MessageSquare } from "lucide-react";
import { mockPendaftaran } from "@/lib/mockData";

function PendaftaranContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialFilter = searchParams.get("status") || "semua";

  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [list, setList] = useState(mockPendaftaran);
  const [rejectingItem, setRejectingItem] = useState(null);
  const [catatanStaf, setCatatanStaf] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const status = searchParams.get("status");
    if (status) setActiveFilter(status);
  }, [searchParams]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === "semua") {
      router.push("/staf/pendaftaran");
    } else {
      router.push(`/staf/pendaftaran?status=${filter}`);
    }
  };

  const handleApprove = (id) => {
    setList(list.map((item) => (item.id === id ? { ...item, status: "aktif", catatanStaf: "Disetujui oleh Kak Fira (Staf)" } : item)));
    setSuccessMsg("Pendaftaran siswa berhasil disetujui! Status berubah menjadi Aktif.");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleOpenReject = (item) => {
    setRejectingItem(item);
    setCatatanStaf("");
    setErrorMsg("");
  };

  const handleConfirmReject = () => {
    if (!catatanStaf.trim()) {
      setErrorMsg("Catatan Staf wajib diisi saat menolak pendaftaran.");
      return;
    }

    setList(
      list.map((item) =>
        item.id === rejectingItem.id ? { ...item, status: "ditolak", catatanStaf: catatanStaf.trim() } : item
      )
    );
    setRejectingItem(null);
    setSuccessMsg(`Pendaftaran siswa ditolak dengan catatan: "${catatanStaf.trim()}".`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const filteredList = list.filter((item) => {
    if (activeFilter === "semua") return true;
    return item.status === activeFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Verifikasi Keuangan</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-app-text mt-1">Verifikasi Pendaftaran Siswa</h1>
        <p className="text-sm text-app-muted">Cocokkan bukti pembayaran offline dan tentukan status pendaftaran</p>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {["semua", "menunggu", "aktif", "ditolak"].map((status) => {
          const count = status === "semua" ? list.length : list.filter((p) => p.status === status).length;
          const isActive = activeFilter === status;

          return (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-app-muted border border-app-border hover:bg-gray-50"
              }`}
            >
              <span>{status}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tabel Pendaftaran */}
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-app-border text-xs text-app-muted uppercase tracking-wider bg-app-bg/50">
                <th className="py-3 px-4">Nama Siswa</th>
                <th className="py-3 px-4">Program Pilihan</th>
                <th className="py-3 px-4">Tanggal Diajukan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Catatan Staf</th>
                <th className="py-3 px-4 text-center">Keputusan Staf</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-app-muted text-sm">
                    Tidak ada pendaftaran untuk filter status "{activeFilter}".
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-3.5 px-4 font-semibold text-app-text">{item.siswaNama}</td>
                    <td className="py-3.5 px-4 text-app-text">{item.programNama}</td>
                    <td className="py-3.5 px-4 text-app-muted tabular-nums">{item.dibuatPada}</td>
                    <td className="py-3.5 px-4">
                      {item.status === "menunggu" && <span className="badge badge-pending">Menunggu</span>}
                      {item.status === "aktif" && <span className="badge badge-active">Aktif</span>}
                      {item.status === "ditolak" && <span className="badge badge-rejected">Ditolak</span>}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-app-muted max-w-xs">
                      {item.catatanStaf || <span className="text-gray-300">-</span>}
                    </td>
                    <td className="py-3.5 px-4">
                      {item.status === "menunggu" ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleApprove(item.id)}
                            className="btn-primary text-xs py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700"
                          >
                            <Check className="w-3.5 h-3.5" /> Setujui
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenReject(item)}
                            className="btn-secondary text-xs py-1.5 px-3 text-red-600 hover:bg-red-50 hover:border-red-200"
                          >
                            <X className="w-3.5 h-3.5" /> Tolak
                          </button>
                        </div>
                      ) : (
                        <div className="text-center text-xs text-gray-400 italic">Telah Diputuskan</div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog Penolakan Pendaftaran dengan Catatan Staf Wajib */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="panel max-w-md w-full shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-app-text mb-1">Tolak Pendaftaran Siswa</h3>
            <p className="text-xs text-app-muted mb-4">
              Siswa: <strong>{rejectingItem.siswaNama}</strong> ({rejectingItem.programNama})
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errorMsg}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5">
                Catatan Staf (Alasan Penolakan)*
              </label>
              <textarea
                required
                rows={3}
                value={catatanStaf}
                onChange={(e) => setCatatanStaf(e.target.value)}
                placeholder="Contoh: Bukti transfer tidak terbaca / pembayaran belum diterima di kantor"
                className="w-full p-3 bg-white border border-app-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <p className="text-[11px] text-app-muted mt-1">Catatan ini akan langsung tampil di menu Program milik siswa.</p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRejectingItem(null)}
                className="btn-secondary text-xs py-2 px-4"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="btn-primary text-xs py-2 px-4 bg-status-rejected hover:bg-red-700"
              >
                Konfirmasi Tolak Pendaftaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PendaftaranStafPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-16 text-center text-sm text-app-muted">Memuat pendaftaran...</div>}>
      <PendaftaranContent />
    </Suspense>
  );
}
