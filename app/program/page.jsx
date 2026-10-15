"use client";

import { useState } from "react";
import { BookOpen, Check, AlertCircle, Clock, CheckCircle2, XCircle } from "lucide-react";
import { mockPrograms, mockPendaftaran } from "@/lib/mockData";

export default function ProgramSiswaPage() {
  const [pendaftaranList, setPendaftaranList] = useState(mockPendaftaran);
  const [notifMessage, setNotifMessage] = useState("");

  const handleAjukan = (program) => {
    // Cek apakah pendaftaran untuk program ini sudah ada dan aktif/menunggu
    const existing = pendaftaranList.find(
      (p) => p.programId === program.id && (p.status === "menunggu" || p.status === "aktif")
    );

    if (existing) {
      setNotifMessage(`Anda sudah memiliki pendaftaran dengan status "${existing.status}" untuk program ${program.nama}.`);
      return;
    }

    const newPend = {
      id: `pend-${Date.now()}`,
      siswaId: "user-1",
      siswaNama: "Raka Pratama",
      programId: program.id,
      programNama: program.nama,
      status: "menunggu",
      catatanStaf: "",
      dibuatPada: "Hari ini"
    };

    setPendaftaranList([newPend, ...pendaftaranList]);
    setNotifMessage(`Pendaftaran terkirim untuk ${program.nama}. Selesaikan pembayaran di kantor Langkah Juara.`);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Katalog Belajar</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-app-text mt-1">Pilihan Program Bimbingan</h1>
        <p className="text-sm text-app-muted">Pilih paket program bimbingan belajar terbaik untuk jenjang SMP dan SMA</p>
      </div>

      {notifMessage && (
        <div className="mb-8 p-4 bg-orange-50 border border-primary/30 rounded-xl text-primary text-sm flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-0.5">Pemberitahuan Pendaftaran</div>
            <div className="text-xs text-app-text">{notifMessage}</div>
          </div>
        </div>
      )}

      {/* Grid Program Aktif */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {mockPrograms.filter(p => p.aktif).map((prog) => {
          const isPendingOrActive = pendaftaranList.some(
            (p) => p.programId === prog.id && (p.status === "menunggu" || p.status === "aktif")
          );

          return (
            <div key={prog.id} className="panel flex flex-col justify-between border-t-4 border-t-primary hover:shadow-md transition">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className={`badge ${prog.jenjang === 'SMA' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    Jenjang {prog.jenjang}
                  </span>
                  <span className="text-xs text-app-muted font-medium tabular-nums">{prog.jumlahPertemuan} Pertemuan</span>
                </div>

                <h3 className="text-lg font-bold text-app-text mb-1">{prog.nama}</h3>
                <p className="text-xs text-app-muted mb-4 leading-relaxed">{prog.deskripsi}</p>

                <div className="my-4 pt-4 border-t border-app-border">
                  <div className="text-xs text-app-muted mb-1">Biaya Program:</div>
                  <div className="text-2xl font-bold text-primary tabular-nums tracking-tight">
                    {formatRupiah(prog.harga)}
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={isPendingOrActive}
                onClick={() => handleAjukan(prog)}
                className={`w-full py-2.5 rounded-md text-sm font-semibold transition flex items-center justify-center gap-2 ${
                  isPendingOrActive
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {isPendingOrActive ? (
                  <>
                    <Check className="w-4 h-4" /> Telah Diajukan
                  </>
                ) : (
                  "Ajukan Pendaftaran"
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bagian Pendaftaran Saya */}
      <div className="panel">
        <h2 className="text-lg font-bold text-app-text mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" /> Pendaftaran Saya
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-app-border text-xs text-app-muted uppercase tracking-wider">
                <th className="py-3 px-4">Nama Program</th>
                <th className="py-3 px-4">Tanggal Pengajuan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Catatan Staf</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendaftaranList.map((item) => {
                let badgeClass = "badge-pending";
                let statusLabel = "Menunggu";
                let StatusIcon = Clock;

                if (item.status === "aktif") {
                  badgeClass = "badge-active";
                  statusLabel = "Aktif";
                  StatusIcon = CheckCircle2;
                } else if (item.status === "ditolak") {
                  badgeClass = "badge-rejected";
                  statusLabel = "Ditolak";
                  StatusIcon = XCircle;
                }

                return (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-3.5 px-4 font-semibold text-app-text">{item.programNama}</td>
                    <td className="py-3.5 px-4 text-app-muted tabular-nums">{item.dibuatPada}</td>
                    <td className="py-3.5 px-4">
                      <span className={`badge ${badgeClass} gap-1.5`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-app-muted">
                      {item.catatanStaf ? (
                        <span className="text-status-rejected font-medium">{item.catatanStaf}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
