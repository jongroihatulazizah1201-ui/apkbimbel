"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Check, AlertCircle, Clock, CheckCircle2, XCircle, Users, ArrowRight, LogIn } from "lucide-react";
import { mockPrograms, mockPendaftaran } from "@/lib/mockData";
import { useAuth } from "@/components/AuthProvider";

export default function ProgramSiswaPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [pendaftaranList, setPendaftaranList] = useState(mockPendaftaran);
  const [notifMessage, setNotifMessage] = useState("");

  const handleAjukan = (program) => {
    // Jika belum masuk (tamu), arahkan ke halaman masuk agar bisa mendaftar
    if (!user) {
      router.push("/masuk");
      return;
    }

    // PRD 4.3: Siswa tidak bisa mengajukan program yang sama bila pendaftarannya masih menunggu atau aktif
    const existing = pendaftaranList.find(
      (p) => p.programId === program.id && (p.status === "menunggu" || p.status === "aktif")
    );

    if (existing) {
      setNotifMessage(`Anda sudah memiliki pendaftaran dengan status "${existing.status}" untuk program ${program.nama}.`);
      return;
    }

    const newPend = {
      id: `pend-${Date.now()}`,
      siswaId: user.uid || "user-1",
      siswaNama: user.displayName || user.email?.split("@")[0] || "Siswa",
      programId: program.id,
      programNama: program.nama,
      status: "menunggu",
      catatanStaf: "",
      dibuatPada: "Hari ini"
    };

    setPendaftaranList([newPend, ...pendaftaranList]);
    setNotifMessage(`Pendaftaran terkirim. Selesaikan pembayaran di kantor Langkah Juara.`);
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
      {/* Header Halaman (PRD 5.1 & Tema Terang) */}
      <div className="mb-8">
        <div className="text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-1">
          Katalog Akademik
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">Pilihan Program Bimbingan</h1>
        <p className="text-sm text-[#5A6B78] mt-1">Pilih paket bimbingan belajar tatap muka terbaik untuk jenjang SMP dan SMA di Makassar.</p>
      </div>

      {notifMessage && (
        <div className="mb-6 p-4 bg-[#FFF7ED] border border-orange-200 rounded-lg text-[#EA580C] text-sm flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-[#EA580C] mt-0.5" />
          <div>
            <div className="font-bold text-[#1F2937] mb-0.5">Pemberitahuan Pendaftaran</div>
            <div className="text-xs text-[#5A6B78]">{notifMessage}</div>
          </div>
        </div>
      )}

      {/* Grid Program Aktif (PRD 4.3: Nama, Jenjang, Jumlah Pertemuan, Harga) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {mockPrograms.filter(p => p.aktif).map((prog) => {
          const isPendingOrActive = pendaftaranList.some(
            (p) => p.programId === prog.id && (p.status === "menunggu" || p.status === "aktif")
          );

          return (
            <div 
              key={prog.id} 
              className="panel flex flex-col justify-between"
            >
              <div>
                {/* Gambar Program */}
                <div className="relative h-44 rounded-lg overflow-hidden mb-4 bg-stone-100">
                  <img
                    src={prog.gambar || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"}
                    alt={prog.nama}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white text-[#1F2937] font-bold text-xs px-2.5 py-1 rounded shadow-sm border border-[#E5E7EB]">
                    Jenjang {prog.jenjang}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-black/70 text-white text-xs px-2.5 py-1 rounded flex items-center gap-1.5 tabular-nums">
                    <Clock className="w-3.5 h-3.5 text-white" />
                    <span>{prog.jumlahPertemuan} Pertemuan Tatap Muka</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#1F2937] mb-1.5">
                  {prog.nama}
                </h3>
                <p className="text-xs text-[#5A6B78] leading-relaxed mb-4">
                  {prog.deskripsi}
                </p>

                <div className="mb-4 pt-3 border-t border-[#E5E7EB]">
                  <div className="text-[11px] text-[#5A6B78] font-medium mb-0.5">Biaya Program:</div>
                  <div className="text-xl font-black text-[#1F2937] tabular-nums">
                    {formatRupiah(prog.harga)}
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={Boolean(user && isPendingOrActive)}
                onClick={() => handleAjukan(prog)}
                className={`w-full py-2.5 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                  user && isPendingOrActive
                    ? 'bg-stone-100 text-[#5A6B78] border border-[#E5E7EB] cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {user && isPendingOrActive ? (
                  <>
                    <Check className="w-4 h-4 text-[#15A66A]" /> Pendaftaran Sedang Diproses
                  </>
                ) : !user ? (
                  <>
                    Ajukan Pendaftaran <ArrowRight className="w-3.5 h-3.5" />
                  </>
                ) : (
                  "Ajukan Pendaftaran"
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bagian Pendaftaran Saya (Tampil bila akun telah masuk) */}
      {user ? (
        <div className="panel">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5E7EB]">
            <div>
              <h2 className="text-base font-bold text-[#1F2937] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#EA580C]" /> Pendaftaran Saya
              </h2>
              <p className="text-xs text-[#5A6B78] mt-0.5">Daftar pengajuan pendaftaran program bimbingan belajar</p>
            </div>
            <span className="text-xs text-[#5A6B78] tabular-nums">
              Total: {pendaftaranList.length} Pengajuan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F7F5F2] text-[#5A6B78] uppercase tracking-wider font-semibold border-b border-[#E5E7EB]">
                  <th className="py-2.5 px-3">Nama Program</th>
                  <th className="py-2.5 px-3">Tanggal Pengajuan</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Catatan Staf</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
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
                    <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3 px-3 font-semibold text-[#1F2937]">{item.programNama}</td>
                      <td className="py-3 px-3 text-[#5A6B78] tabular-nums">{item.dibuatPada}</td>
                      <td className="py-3 px-3">
                        <span className={`badge ${badgeClass} text-xs font-semibold`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusLabel}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#5A6B78]">
                        {item.catatanStaf ? (
                          <span className="text-[#E53935] font-medium bg-[#FDF2F2] px-2 py-0.5 rounded border border-[#FECACA]">
                            {item.catatanStaf}
                          </span>
                        ) : (
                          <span className="text-[#5A6B78] italic">Menunggu verifikasi pembayaran di kantor</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="panel text-center py-10 bg-white border border-[#E5E7EB] shadow-xs rounded-2xl">
          <div className="w-12 h-12 bg-[#FFF7ED] text-[#EA580C] rounded-xl flex items-center justify-center mx-auto mb-3 border border-orange-200">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#1F2937] mb-1">Tertarik Bergabung dengan Langkah Juara?</h3>
          <p className="text-xs text-[#5A6B78] max-w-md mx-auto mb-5 leading-relaxed">
            Masuk atau buat akun siswa baru untuk langsung mengajukan pendaftaran program belajar dan memantau status persetujuan staf.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/masuk" className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-1.5">
              <LogIn className="w-4 h-4" /> Masuk Akun
            </Link>
            <Link href="/daftar" className="btn-secondary text-xs py-2 px-5">
              Daftar Siswa Baru
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
