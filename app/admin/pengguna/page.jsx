"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, UserCheck, UserX, Shield, Edit, Users } from "lucide-react";
import { mockUsers } from "@/lib/mockData";

export default function KelolaPenggunaAdminPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("semua");

  const filteredUsers = users.filter((u) => {
    const matchSearch = u.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === "semua" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Manajemen Otorisasi</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-app-text mt-1">Kelola Pengguna & Peran</h1>
        <p className="text-sm text-app-muted">Ubah hak akses peran akun dan atur status keaktifan akun pengguna</p>
      </div>

      <div className="panel">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-app-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama atau email..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-app-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-app-muted font-medium">Filter Peran:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-app-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="semua">Semua Peran ({users.length})</option>
              <option value="siswa">Siswa</option>
              <option value="staf">Staf</option>
              <option value="tutor">Tutor</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
        </div>

        {/* Tabel Pengguna */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-app-border text-xs text-app-muted uppercase tracking-wider bg-app-bg/50">
                <th className="py-3 px-4">Nama Lengkap</th>
                <th className="py-3 px-4">Alamat Email</th>
                <th className="py-3 px-4">Peran (Role)</th>
                <th className="py-3 px-4">Status Akun</th>
                <th className="py-3 px-4 text-center">Aksi Otoritas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-app-muted">
                    Tidak ditemukan data pengguna yang cocok.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  let roleBadge = "bg-gray-100 text-gray-700";
                  if (user.role === "super_admin") roleBadge = "bg-purple-100 text-purple-700";
                  else if (user.role === "tutor") roleBadge = "bg-emerald-100 text-emerald-700";
                  else if (user.role === "staf") roleBadge = "bg-blue-100 text-blue-700";
                  else if (user.role === "siswa") roleBadge = "bg-orange-100 text-primary";

                  return (
                    <tr key={user.id} className="hover:bg-gray-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-app-text">{user.nama}</td>
                      <td className="py-3.5 px-4 text-app-muted">{user.email}</td>
                      <td className="py-3.5 px-4">
                        <span className={`badge uppercase text-[10px] font-bold ${roleBadge}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {user.aktif ? (
                          <span className="badge badge-active text-[10px]">Aktif</span>
                        ) : (
                          <span className="badge badge-rejected text-[10px]">Nonaktif</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <Link
                          href={`/admin/pengguna/${user.id}`}
                          className="btn-secondary text-xs py-1.5 px-3 inline-flex items-center gap-1.5"
                        >
                          <Edit className="w-3.5 h-3.5 text-primary" /> Ubah Peran
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
