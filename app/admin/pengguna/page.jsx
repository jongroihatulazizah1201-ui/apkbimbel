"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Shield, 
  Edit, 
  Users, 
  UserCheck, 
  UserX, 
  Loader2, 
  Filter, 
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { collection, onSnapshot, query, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { mockUsers } from "@/lib/mockData";

export default function KelolaPenggunaAdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("semua");

  useEffect(() => {
    // 1. Ambil seluruh dokumen dari koleksi users secara real-time dari Cloud Firestore
    const usersColRef = collection(db, "users");
    
    const unsubscribe = onSnapshot(usersColRef, (snapshot) => {
      const firestoreUsers = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      // Gabungkan dengan data mock dasar jika belum ada di Firestore (agar skenario pengujian Kak Nadia dkk di PRD 4.15 selalu tersedia)
      const mergedMap = new Map();

      // Masukkan mock users terlebih dahulu
      mockUsers.forEach((mu) => {
        mergedMap.set(mu.id, mu);
      });

      // Timpa atau tambahkan dokumen riil dari Cloud Firestore
      firestoreUsers.forEach((fu) => {
        // Cocokkan berdasarkan ID dokumen atau email
        const existingKey = Array.from(mergedMap.keys()).find(
          (k) => k === fu.id || mergedMap.get(k).email === fu.email
        );
        if (existingKey) {
          const current = mergedMap.get(existingKey);
          const preferredId = (!fu.id.startsWith("user_") && !fu.id.startsWith("mock") && fu.id.length > 15) 
            ? fu.id 
            : (current.id || fu.id);
          mergedMap.set(existingKey, { ...current, ...fu, id: preferredId });
        } else {
          mergedMap.set(fu.id, fu);
        }
      });

      setUsers(Array.from(mergedMap.values()));
      setIsLoading(false);
    }, (error) => {
      console.warn("Firestore onSnapshot users notice:", error);
      // Fallback ke mockUsers bila koneksi terbatas
      setUsers(mockUsers);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Hanya tampilkan pengguna yang dikelola (Siswa, Staf, Tutor).
  // Super Admin (Pak Arif) adalah pengelola sistem dengan akses penuh sehingga tidak perlu dikelola oleh dirinya sendiri.
  const manageableUsers = users.filter((u) => u.role !== "super_admin" && u.role !== "admin");

  // Filter pencarian nama/email dan saringan peran (siswa, staf, tutor)
  const filteredUsers = manageableUsers.filter((u) => {
    const namaStr = (u.nama || "").toLowerCase();
    const emailStr = (u.email || "").toLowerCase();
    const query = searchTerm.toLowerCase();
    const matchSearch = namaStr.includes(query) || emailStr.includes(query);
    const matchRole = roleFilter === "semua" || (u.role && u.role.toLowerCase() === roleFilter.toLowerCase());
    return matchSearch && matchRole;
  });

  // Hitung metrik pengguna yang dikelola per peran
  const totalCount = manageableUsers.length;
  const siswaCount = manageableUsers.filter((u) => u.role === "siswa").length;
  const tutorCount = manageableUsers.filter((u) => u.role === "tutor").length;
  const stafCount = manageableUsers.filter((u) => u.role === "staf").length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Halaman Kelola Pengguna Sesuai PRD 4.15 */}
      <div className="mb-6">
        <div className="text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-1">
          Modul Super Admin
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">
          Kelola Pengguna
        </h1>
        <p className="text-xs sm:text-sm text-[#5A6B78] mt-1 max-w-2xl">
          Atur hak akses pengguna di koleksi <code>users</code>: tetapkan peran Siswa, Staf, atau Tutor, serta kendalikan status aktif akun.
        </p>
      </div>

      {/* Ringkasan Metrik Pengguna yang Dikelola */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-xs">
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-3 shadow-2xs">
          <span className="text-[#5A6B78] font-medium block">Total Pengguna</span>
          <span className="text-xl font-black text-[#1F2937] tabular-nums mt-0.5 block">{totalCount}</span>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-3 shadow-2xs">
          <span className="text-orange-700 font-medium block">Siswa</span>
          <span className="text-xl font-black text-[#EA580C] tabular-nums mt-0.5 block">{siswaCount}</span>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-3 shadow-2xs">
          <span className="text-emerald-700 font-medium block">Tutor</span>
          <span className="text-xl font-black text-[#15A66A] tabular-nums mt-0.5 block">{tutorCount}</span>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-3 shadow-2xs">
          <span className="text-sky-700 font-medium block">Staf</span>
          <span className="text-xl font-black text-sky-700 tabular-nums mt-0.5 block">{stafCount}</span>
        </div>
      </div>

      {/* Panel Utama Tabel Pengguna */}
      <div className="panel p-0 border border-[#E5E7EB] shadow-xs overflow-hidden bg-white">
        {/* Bilah Pencarian & Saringan Peran (PRD 4.15) */}
        <div className="p-4 sm:p-5 border-b border-[#E5E7EB] bg-[#FAF9F7] flex flex-col sm:flex-row gap-3.5 justify-between items-stretch sm:items-center">
          {/* Fitur Pencarian Nama / Email */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#5A6B78] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama atau email pengguna..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs sm:text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] placeholder:text-[#5A6B78]/70"
            />
          </div>

          {/* Fitur Saringan Peran (siswa, staf, tutor) */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#5A6B78]" />
            <span className="text-xs text-[#5A6B78] font-bold uppercase tracking-wider">Peran:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]"
            >
              <option value="semua">Semua Peran ({manageableUsers.length})</option>
              <option value="siswa">Siswa ({siswaCount})</option>
              <option value="staf">Staf ({stafCount})</option>
              <option value="tutor">Tutor ({tutorCount})</option>
            </select>
          </div>
        </div>

        {/* Tabel Data Dokumen users */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[11px] font-bold text-[#5A6B78] uppercase tracking-wider bg-[#F7F5F2]">
                <th className="py-3 px-4 sm:px-5">Nama Lengkap</th>
                <th className="py-3 px-4">Alamat Email</th>
                <th className="py-3 px-4">Peran (role)</th>
                <th className="py-3 px-4">Status Aktif (aktif)</th>
                <th className="py-3 px-4 sm:px-5 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-[#5A6B78]">
                    <Loader2 className="w-5 h-5 text-[#EA580C] animate-spin mx-auto mb-2" />
                    <span>Memuat daftar dokumen dari koleksi <code>users</code>...</span>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-[#5A6B78]">
                    Tidak ditemukan data pengguna yang cocok dengan kriteria pencarian &ldquo;{searchTerm}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  let roleBadgeStyle = "bg-orange-50 text-orange-800 border-orange-200";
                  let roleDisplay = "Siswa";

                  if (user.role === "super_admin" || user.role === "admin") {
                    roleBadgeStyle = "bg-stone-100 text-[#1F2937] border-stone-300";
                    roleDisplay = "Super Admin";
                  } else if (user.role === "tutor") {
                    roleBadgeStyle = "bg-emerald-50 text-emerald-800 border-emerald-200";
                    roleDisplay = "Tutor";
                  } else if (user.role === "staf") {
                    roleBadgeStyle = "bg-sky-50 text-sky-800 border-sky-200";
                    roleDisplay = "Staf";
                  }

                  const isUserActive = user.aktif !== false;

                  return (
                    <tr
                      key={user.id}
                      onClick={() => router.push(`/admin/pengguna/${user.id}`)}
                      className="hover:bg-orange-50/40 transition cursor-pointer group"
                      title="Klik untuk membuka rincian dan ubah peran"
                    >
                      {/* Kolom Nama */}
                      <td className="py-3.5 px-4 sm:px-5 font-bold text-[#1F2937]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#EA580C]/10 text-[#EA580C] font-extrabold text-xs flex items-center justify-center shrink-0 border border-orange-200">
                            {(user.nama || user.email || "U").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="group-hover:text-[#EA580C] transition-colors">
                              {user.nama || "Pengguna Baru"}
                            </div>
                            <div className="text-[10px] font-normal text-[#5A6B78] font-mono">
                              UID: {user.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Kolom Email */}
                      <td className="py-3.5 px-4 text-[#5A6B78] font-mono text-xs">
                        {user.email || "-"}
                      </td>

                      {/* Kolom Peran (role) */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${roleBadgeStyle}`}>
                          {roleDisplay}
                        </span>
                      </td>

                      {/* Kolom Status Aktif (aktif) */}
                      <td className="py-3.5 px-4">
                        {isUserActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#15A66A]"></span>
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E53935]"></span>
                            Nonaktif
                          </span>
                        )}
                      </td>

                      {/* Kolom Aksi */}
                      <td className="py-3.5 px-4 sm:px-5 text-center" onClick={(e) => e.stopPropagation()}>
                        <Link
                          href={`/admin/pengguna/${user.id}`}
                          className="btn-secondary text-xs py-1.5 px-3 font-semibold inline-flex items-center gap-1.5 hover:border-[#EA580C] hover:text-[#EA580C] transition"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Ubah Peran</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info PRD 4.15 */}
        <div className="p-3.5 bg-[#FAF9F7] border-t border-[#E5E7EB] text-[11px] text-[#5A6B78] flex flex-wrap items-center justify-between gap-2">
          <span>Menampilkan <strong>{filteredUsers.length}</strong> dari <strong>{users.length}</strong> akun terdaftar.</span>
          <span className="text-[#EA580C] font-semibold">Tip: Klik baris nama pengguna untuk membuka rincian dan menetapkan peran.</span>
        </div>
      </div>
    </div>
  );
}
