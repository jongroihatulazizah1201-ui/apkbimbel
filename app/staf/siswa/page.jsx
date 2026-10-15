"use client";

import { useState } from "react";
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
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Direktori Kontak Siswa</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-app-text mt-1">Data Siswa & Kontak Orang Tua</h1>
        <p className="text-sm text-app-muted">Informasi kontak orang tua untuk komunikasi presensi dan kehadiran belajar (Read-only)</p>
      </div>

      <div className="panel">
        {/* Search Bar */}
        <div className="mb-6 max-w-sm relative">
          <Search className="w-4 h-4 text-app-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama atau email siswa..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-app-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Tabel Data Siswa */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-app-border text-xs text-app-muted uppercase tracking-wider bg-app-bg/50">
                <th className="py-3 px-4">Nama Lengkap Siswa</th>
                <th className="py-3 px-4">Email Siswa</th>
                <th className="py-3 px-4">Nomor HP Siswa</th>
                <th className="py-3 px-4">Nomor HP Orang Tua</th>
                <th className="py-3 px-4">Program Belajar Aktif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-app-muted">
                    Tidak ditemukan data siswa dengan kata kunci "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-3.5 px-4 font-bold text-app-text">{s.nama}</td>
                    <td className="py-3.5 px-4 text-app-muted">{s.email}</td>
                    <td className="py-3.5 px-4 text-app-muted tabular-nums">
                      <a href={`https://wa.me/${s.noHp?.replace(/^0/, '62')}`} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {s.noHp}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-app-text font-semibold tabular-nums">
                      <a href={`https://wa.me/${s.noHpOrangTua?.replace(/^0/, '62')}`} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {s.noHpOrangTua}
                      </a>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="badge badge-active">{s.programAktif || "Intensif UTBK"}</span>
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
