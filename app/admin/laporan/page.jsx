"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Laporan */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Rekapitulasi Operasional</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-app-text mt-1">Laporan Bulanan Bimbel</h1>
          <p className="text-sm text-app-muted">Rekap siswa aktif per program, persentase kehadiran per kelas, dan beban mengajar tutor</p>
        </div>

        {/* Pilihan Periode Bulan (Tersimpan di URL) */}
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-app-border shadow-sm">
          <Calendar className="w-4 h-4 text-primary" />
          <label className="text-xs font-semibold text-app-text">Periode Bulan:</label>
          <input
            type="month"
            value={bulan}
            onChange={handleMonthChange}
            className="text-xs font-bold text-primary bg-transparent focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-8">
        {/* Tabel 1: Siswa Aktif per Program */}
        <div className="panel overflow-hidden border-t-4 border-t-primary">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-app-text flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> 1. Rekap Siswa Aktif per Program
            </h2>
            <span className="text-xs text-app-muted">Periode: {bulan}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-app-border text-xs text-app-muted uppercase tracking-wider bg-app-bg/50">
                  <th className="py-3 px-4">Nama Program</th>
                  <th className="py-3 px-4">Jenjang</th>
                  <th className="py-3 px-4">Biaya Kursus</th>
                  <th className="py-3 px-4">Jumlah Siswa Terdaftar</th>
                  <th className="py-3 px-4">Status Program</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockPrograms.map((prog) => {
                  const studentCount = prog.id === "prog-1" ? 35 : prog.id === "prog-2" ? 23 : 0;
                  return (
                    <tr key={prog.id} className="hover:bg-gray-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-app-text">{prog.nama}</td>
                      <td className="py-3.5 px-4">
                        <span className="badge bg-gray-100 text-gray-700 text-[10px]">{prog.jenjang}</span>
                      </td>
                      <td className="py-3.5 px-4 tabular-nums text-app-muted">
                        Rp {prog.harga.toLocaleString("id-ID")}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-primary tabular-nums">
                        {studentCount} <span className="text-xs font-normal text-app-muted">Siswa Aktif</span>
                      </td>
                      <td className="py-3.5 px-4">
                        {prog.aktif ? (
                          <span className="badge badge-active text-[10px]">Aktif</span>
                        ) : (
                          <span className="badge badge-unsubmitted text-[10px]">Nonaktif</span>
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
        <div className="panel overflow-hidden border-t-4 border-t-status-active">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-app-text flex items-center gap-2">
              <Award className="w-5 h-5 text-status-active" /> 2. Tingkat Kehadiran per Kelas
            </h2>
            <span className="text-xs text-app-muted">Periode: {bulan}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-app-border text-xs text-app-muted uppercase tracking-wider bg-app-bg/50">
                  <th className="py-3 px-4">Nama Kelas</th>
                  <th className="py-3 px-4">Program</th>
                  <th className="py-3 px-4">Tutor Pengampu</th>
                  <th className="py-3 px-4">Total Pertemuan</th>
                  <th className="py-3 px-4">Rata-rata Presensi Hadir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockKelas.map((k) => {
                  const rate = k.id === "kelas-1" ? "94.2%" : "90.5%";
                  return (
                    <tr key={k.id} className="hover:bg-gray-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-app-text">{k.nama}</td>
                      <td className="py-3.5 px-4"><span className="badge badge-active text-[10px]">{k.programNama}</span></td>
                      <td className="py-3.5 px-4 text-app-text font-medium">{k.tutorNama}</td>
                      <td className="py-3.5 px-4 tabular-nums text-app-muted">{k.pertemuan.length} Sesi Terlaksana</td>
                      <td className="py-3.5 px-4">
                        <span className="text-status-active font-extrabold tabular-nums text-base">{rate}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel 3: Jumlah Kelas & Pertemuan per Tutor */}
        <div className="panel overflow-hidden border-t-4 border-t-purple-600">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-app-text flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" /> 3. Beban Aktivitas Kelas per Tutor
            </h2>
            <span className="text-xs text-app-muted">Periode: {bulan}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-app-border text-xs text-app-muted uppercase tracking-wider bg-app-bg/50">
                  <th className="py-3 px-4">Nama Tutor</th>
                  <th className="py-3 px-4">Email Tutor</th>
                  <th className="py-3 px-4">Jumlah Kelas Diampu</th>
                  <th className="py-3 px-4">Jumlah Pertemuan Terlaksana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4 font-bold text-app-text">Kak Dimas</td>
                  <td className="py-3.5 px-4 text-app-muted">dimas@langkahjuara.id</td>
                  <td className="py-3.5 px-4 font-semibold text-app-text tabular-nums">2 Rombongan Belajar</td>
                  <td className="py-3.5 px-4 text-primary font-bold tabular-nums">8 Sesi Pertemuan</td>
                </tr>
                <tr className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4 font-bold text-app-text">Kak Nadia</td>
                  <td className="py-3.5 px-4 text-app-muted">nadia@langkahjuara.id</td>
                  <td className="py-3.5 px-4 font-semibold text-app-text tabular-nums">1 Rombongan Belajar</td>
                  <td className="py-3.5 px-4 text-primary font-bold tabular-nums">4 Sesi Pertemuan</td>
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
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-16 text-center text-sm text-app-muted">Memuat laporan...</div>}>
      <LaporanContent />
    </Suspense>
  );
}
