"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, User, ArrowLeft, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { mockUsers } from "@/lib/mockData";

export default function RincianPenggunaAdminDetailPage() {
  const targetUser = mockUsers[4]; // Kak Nadia

  const [role, setRole] = useState(targetUser.role);
  const [aktif, setAktif] = useState(targetUser.aktif);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    // Proteksi self-demotion/deactivation jika user adalah super_admin utama
    if (targetUser.id === "user-6" && (role !== "super_admin" || !aktif)) {
      setErrorMsg("Super Admin tidak dapat menurunkan peran atau menonaktifkan akunnya sendiri.");
      return;
    }

    setErrorMsg("");
    setSuccessMsg(`Peran ${targetUser.nama} berhasil diubah menjadi "${role}" dengan status ${aktif ? 'Aktif' : 'Nonaktif'}!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/admin/pengguna" className="text-xs text-primary font-semibold hover:underline mb-4 inline-flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Kelola Pengguna
      </Link>

      <div className="panel shadow-sm">
        <div className="mb-6 pb-6 border-b border-app-border">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Otoritas Super Admin</span>
          <h1 className="text-2xl font-bold text-app-text mt-1">Ubah Peran & Status Pengguna</h1>
          <p className="text-xs text-app-muted mt-1">ID Dokumen: {targetUser.id}</p>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5">
              Nama Lengkap Pengguna
            </label>
            <input
              type="text"
              disabled
              value={targetUser.nama}
              className="w-full px-3.5 py-2.5 bg-gray-100 border border-app-border rounded-md text-sm text-gray-700 font-semibold cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5">
              Alamat Email (Akun Login)
            </label>
            <input
              type="email"
              disabled
              value={targetUser.email}
              className="w-full px-3.5 py-2.5 bg-gray-100 border border-app-border rounded-md text-sm text-gray-700 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-primary" /> Tetapkan Peran Baru*
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-app-border rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="siswa">Siswa (Akses Beranda, Program, Kelas Saya, Tugas)</option>
              <option value="staf">Staf (Akses Pendaftaran, Kelola Kelas, Data Siswa)</option>
              <option value="tutor">Tutor (Akses Mengajar, Presensi, Nilai Tugas)</option>
              <option value="super_admin">Super Admin (Hak Akses Penuh Seluruh Modul)</option>
            </select>
            <p className="text-[11px] text-app-muted mt-1">
              Saat pengguna masuk kembali, sistem otomatis mengarahkan ke dasbor perannya.
            </p>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-3 p-3.5 rounded-lg border border-app-border bg-app-bg/50 cursor-pointer hover:bg-gray-50 transition">
              <input
                type="checkbox"
                checked={aktif}
                onChange={(e) => setAktif(e.target.checked)}
                className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary mt-0.5"
              />
              <div>
                <span className="font-semibold text-sm text-app-text block">Akun Aktif (Dapat Masuk ke Portal)</span>
                <span className="text-xs text-app-muted block mt-0.5 leading-relaxed">
                  Bila dimatikan, akun tidak bisa masuk dengan pesan "Akun Anda dinonaktifkan", namun riwayat pendaftaran dan nilainya tetap tersimpan.
                </span>
              </div>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-app-border">
            <Link href="/admin/pengguna" className="btn-secondary text-xs py-2 px-4">
              Batal
            </Link>
            <button type="submit" className="btn-primary text-xs py-2 px-4">
              <Save className="w-4 h-4" /> Simpan Pengaturan Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
