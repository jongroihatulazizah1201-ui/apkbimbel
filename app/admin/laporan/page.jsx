"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { BarChart3, Calendar, Users, Award, BookOpen, Layers } from "lucide-react";
import { mockPrograms, mockKelas, mockPendaftaran, mockUsers } from "@/lib/mockData";

function LaporanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialMonth = searchParams.get("bulan") || "2026-10";

  const [bulan, setBulan] = useState(initialMonth);

  useEffect(() => {
    const b = searchParams.get("bulan");
    if (b) setBulan(b);
  }, [searchParams]);

  const handleMonthChange = (e) => {
    const val = e.target.value;
    setBulan(val);
    router.push(`/admin/laporan?bulan=${val}`);
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
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] tracking-tight">Laporan Bulanan Bimbel</h1>
          <p className="text-sm text-[#5A6B78] mt-1">Rekap siswa aktif per program, persentase kehadiran per kelas, dan beban mengajar tutor.</p>
        </div>

        {/* Pilihan Periode Bulan (Tersimpan di URL) */}
        <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl border border-slate-200/90 shadow-sm self-start md:self-auto">
          <Calendar className="w-4 h-4 text-primary" />
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Periode:</label>
          <input
            type="month"
            value={bulan}
            onChange={handleMonthChange}
            className="text-xs font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-8">
        {/* Tabel 1: Siswa Aktif per Program */}
        <div className="panel p-0 border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-5 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> 1. Rekap Siswa Aktif per Program
            </h2>
            <span className="text-xs text-slate-500 font-medium">Periode: <strong className="text-slate-800">{bulan}</strong></span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                  <th className="py-3.5 px-5">Nama Program</th>
                  <th className="py-3.5 px-4">Jenjang</th>
                  <th className="py-3.5 px-4">Biaya Kursus</th>
                  <th className="py-3.5 px-4">Jumlah Siswa Terdaftar</th>
                  <th className="py-3.5 px-5">Status Program</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockPrograms.map((prog) => {
                  const studentCount = prog.id === "prog-1" ? 35 : prog.id === "prog-2" ? 23 : 0;
                  const cover = prog.gambar || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80";

                  return (
                    <tr key={prog.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-5 font-bold text-slate-900">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-8 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                            <Image src={cover} alt={prog.nama} fill className="object-cover" />
                          </div>
                          <span>{prog.nama}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`badge ${prog.jenjang === 'SMA' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'} text-[10px] font-bold`}>
                          {prog.jenjang}
                        </span>
                      </td>
                      <td className="py-4 px-4 tabular-nums text-slate-600 text-xs font-semibold">
                        {formatRupiah(prog.harga)}
                      </td>
                      <td className="py-4 px-4 font-black text-primary tabular-nums text-sm">
                        {studentCount} <span className="text-xs font-semibold text-slate-500">Siswa Aktif</span>
                      </td>
                      <td className="py-4 px-5">
                        {prog.aktif ? (
                          <span className="badge badge-active text-[10px] font-bold">Aktif</span>
                        ) : (
                          <span className="badge badge-unsubmitted text-[10px] font-bold">Nonaktif</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel 2: Kehadiran per Kelas */}
        <div className="panel p-0 border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-5 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" /> 2. Tingkat Kehadiran per Kelas
            </h2>
            <span className="text-xs text-slate-500 font-medium">Periode: <strong className="text-slate-800">{bulan}</strong></span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                  <th className="py-3.5 px-5">Nama Kelas</th>
                  <th className="py-3.5 px-4">Program</th>
                  <th className="py-3.5 px-4">Tutor Pengampu</th>
                  <th className="py-3.5 px-4">Total Pertemuan</th>
                  <th className="py-3.5 px-5">Rata-rata Presensi Hadir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockKelas.map((k) => {
                  const rate = k.id === "kelas-1" ? "94.2%" : "90.5%";
                  return (
                    <tr key={k.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-5 font-bold text-slate-900">{k.nama}</td>
                      <td className="py-4 px-4">
                        <span className="badge badge-active text-[10px] font-semibold">{k.programNama}</span>
                      </td>
                      <td className="py-4 px-4 text-slate-800 font-semibold text-xs">{k.tutorNama}</td>
                      <td className="py-4 px-4 tabular-nums text-slate-600 text-xs font-medium">{k.pertemuan.length} Sesi Terlaksana</td>
                      <td className="py-4 px-5">
                        <span className="text-emerald-700 font-black tabular-nums text-base">{rate}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel 3: Jumlah Kelas & Pertemuan per Tutor */}
        <div className="panel p-0 border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-5 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#EA580C]" /> 3. Beban Aktivitas Kelas per Tutor
            </h2>
            <span className="text-xs text-slate-500 font-medium">Periode: <strong className="text-slate-800">{bulan}</strong></span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                  <th className="py-3.5 px-5">Nama Tutor</th>
                  <th className="py-3.5 px-4">Email Tutor</th>
                  <th className="py-3.5 px-4">Jumlah Kelas Diampu</th>
                  <th className="py-3.5 px-5">Jumlah Pertemuan Terlaksana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-5 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        <Image
                          src="/avatars/kak_dimas.jpg"
                          alt="Kak Dimas"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>Kak Dimas</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-mono text-xs">dimas@langkahjuara.id</td>
                  <td className="py-4 px-4 font-bold text-slate-900 tabular-nums text-xs">2 Rombongan Belajar</td>
                  <td className="py-4 px-5 text-primary font-black tabular-nums text-sm">8 Sesi Pertemuan</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-5 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        <Image
                          src="/avatars/nadia.jpg"
                          alt="Kak Nadia"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>Kak Nadia</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-mono text-xs">nadia@langkahjuara.id</td>
                  <td className="py-4 px-4 font-bold text-slate-900 tabular-nums text-xs">1 Rombongan Belajar</td>
                  <td className="py-4 px-5 text-primary font-black tabular-nums text-sm">4 Sesi Pertemuan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LaporanAdminPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-16 text-center text-sm text-slate-500">Memuat laporan...</div>}>
      <LaporanContent />
    </Suspense>
  );
}

