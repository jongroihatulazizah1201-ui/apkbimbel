"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Phone, Mail, User, BookOpen } from "lucide-react";
import { mockUsers } from "@/lib/mockData";

export default function DataSiswaStafPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const siswaList = mockUsers.filter((u) => u.role === "siswa");

  const filteredStudents = siswaList.filter((s) =>
    s.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] tracking-tight">Data Siswa & Kontak Orang Tua</h1>
        <p className="text-sm text-[#5A6B78] mt-1">Informasi kontak orang tua untuk komunikasi presensi dan kehadiran belajar.</p>
      </div>

      <div className="panel p-0 border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Search Bar */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-md w-full relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama atau email siswa..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Total Siswa Terdaftar: {filteredStudents.length}
          </span>
        </div>

        {/* Tabel Data Siswa Sesuai PRD 4.10 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                <th className="py-3.5 px-5">Nama Lengkap Siswa</th>
                <th className="py-3.5 px-4">Email Siswa</th>
                <th className="py-3.5 px-4">Nomor HP Siswa</th>
                <th className="py-3.5 px-4">Nomor HP Orang Tua</th>
                <th className="py-3.5 px-5">Program Belajar Aktif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-slate-500">
                    Tidak ditemukan data siswa dengan kata kunci "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-5 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                          <Image
                            src={s.avatar || "/avatars/default_user.svg"}
                            alt={s.nama}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div>{s.nama}</div>
                          <div className="text-[11px] font-normal text-slate-400 font-mono">ID: #{s.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">{s.email}</td>
                    <td className="py-3.5 px-4 text-slate-600 tabular-nums text-xs">
                      <a
                        href={`https://wa.me/${s.noHp?.replace(/^0/, '62')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold hover:bg-emerald-100 transition"
                      >
                        <Phone className="w-3 h-3 text-emerald-600" /> {s.noHp}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-bold tabular-nums text-xs">
                      <a
                        href={`https://wa.me/${s.noHpOrangTua?.replace(/^0/, '62')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-900 border border-orange-200 font-bold hover:bg-orange-100 transition"
                      >
                        <Phone className="w-3 h-3 text-primary" /> {s.noHpOrangTua}
                      </a>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="badge badge-active text-[11px] font-semibold">{s.programAktif || "Intensif UTBK"}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

