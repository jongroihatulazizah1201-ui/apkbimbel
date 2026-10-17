"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  User, 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Lock, 
  Clock, 
  Mail, 
  Phone, 
  ShieldAlert,
  GraduationCap,
  Sparkles
} from "lucide-react";
import { doc, getDoc, updateDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";
import { mockUsers } from "@/lib/mockData";

export default function RincianPenggunaAdminDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;
  const router = useRouter();
  const { user: authUser, userProfile: authProfile } = useAuth();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("siswa");
  const [aktif, setAktif] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Ambil data pengguna dari Cloud Firestore users/{id}
  useEffect(() => {
    let isMounted = true;

    async function fetchUserData() {
      if (!id) return;
      try {
        const userRef = doc(db, "users", id);
        const snap = await getDoc(userRef);

        if (snap.exists() && isMounted) {
          const data = snap.data();
          setUserData({ id: snap.id, ...data });
          setRole(data.role || "siswa");
          setAktif(data.aktif !== false);
          setLoading(false);
          return;
        }

        // Jika tidak ada di Firestore (misalnya data uji awal seperti Kak Nadia atau Raka), cek di mockUsers
        const fallback = mockUsers.find((u) => u.id === id);
        if (fallback && isMounted) {
          setUserData(fallback);
          setRole(fallback.role || "siswa");
          setAktif(fallback.aktif !== false);
          setLoading(false);
          return;
        }

        // Pengguna baru umum
        if (isMounted) {
          const defaultNew = {
            id,
            nama: id === "4Ql6SyZyZyS4srPlBrn1VLubPi02" ? "Pak Arif" : `Pengguna (${id})`,
            email: id === "4Ql6SyZyZyS4srPlBrn1VLubPi02" ? "arif@langkahjuara.id" : "pengguna@langkahjuara.id",
            role: id === "4Ql6SyZyZyS4srPlBrn1VLubPi02" ? "super_admin" : "siswa",
            aktif: true,
          };
          setUserData(defaultNew);
          setRole(defaultNew.role);
          setAktif(defaultNew.aktif);
          setLoading(false);
        }
      } catch (err) {
        console.warn("Fetch user detail notice:", err);
        const fallback = mockUsers.find((u) => u.id === id);
        if (fallback && isMounted) {
          setUserData(fallback);
          setRole(fallback.role || "siswa");
          setAktif(fallback.aktif !== false);
        }
        if (isMounted) setLoading(false);
      }
    }

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Validasi Keamanan (PRD 4.15):
  // Super Admin tidak dapat menurunkan peran atau menonaktifkan akunnya sendiri.
  const isSelf = Boolean(
    (authUser && authUser.uid === id) ||
    (authProfile && authProfile.email && userData && authProfile.email.toLowerCase() === userData.email?.toLowerCase()) ||
    (authProfile && (authProfile.role === "super_admin" || authProfile.role === "admin") && (id === "4Ql6SyZyZyS4srPlBrn1VLubPi02" || id === "tBuB7BlwlmOZ7ZvmLAQlRNDH7OX2" || id === "user_superadmin_arif" || id === "user-6"))
  );

  const handleSave = async (e) => {
    e.preventDefault();
    setFeedback(null);
    setIsSaving(true);

    // 1. Validasi Keamanan: Cegah Self-Demotion & Self-Deactivation
    if (isSelf) {
      if (role !== "super_admin" || !aktif) {
        setFeedback({
          type: "error",
          msg: "Validasi Keamanan: Super Admin tidak dapat menurunkan peran atau menonaktifkan akunnya sendiri."
        });
        setIsSaving(false);
        return;
      }
    }

    // 2. Validasi Nilai Peran Sesuai PRD 4.15 (siswa, staf, tutor, super_admin)
    const allowedRoles = ["siswa", "staf", "tutor", "super_admin"];
    if (!allowedRoles.includes(role)) {
      setFeedback({
        type: "error",
        msg: "Peran harus berupa salah satu dari: siswa, staf, tutor, atau super_admin."
      });
      setIsSaving(false);
      return;
    }

    try {
      // 3. Simpan pembaruan role dan status aktif ke Cloud Firestore users/{id}
      const userRef = doc(db, "users", id);
      await setDoc(userRef, {
        nama: userData?.nama || "Pengguna",
        email: userData?.email || "",
        noHp: userData?.noHp || "",
        noHpOrangTua: userData?.noHpOrangTua || "",
        role: role,
        aktif: Boolean(aktif),
        diperbaruiPada: serverTimestamp(),
      }, { merge: true });

      // Update state lokal
      setUserData((prev) => ({
        ...prev,
        role: role,
        aktif: Boolean(aktif)
      }));

      // Pesan sukses informatif sesuai alur PRD 4.15
      let successText = `Peran ${userData?.nama || "pengguna"} berhasil diperbarui menjadi "${role}" dengan status ${aktif ? "Aktif" : "Nonaktif"}!`;
      if (role === "tutor") {
        successText += ` Saat ${userData?.nama || "pengguna"} masuk kembali, sistem otomatis mengarahkannya ke /tutor.`;
      } else if (!aktif) {
        successText += ` Akun ini tidak bisa masuk ke portal lagi, namun data historisnya tetap tersimpan.`;
      }

      setFeedback({
        type: "success",
        msg: successText
      });
    } catch (err) {
      console.error("Gagal memperbarui pengguna di Firestore:", err);
      setFeedback({
        type: "error",
        msg: "Gagal menyimpan perubahan ke Cloud Firestore: " + (err.message || "Periksa koneksi jaringan.")
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <Loader2 className="w-8 h-8 text-[#EA580C] animate-spin mx-auto mb-3" />
        <p className="text-xs text-[#5A6B78] font-medium">Memuat data pengguna dari Cloud Firestore...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="panel p-8 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm">
          <h1 className="text-2xl font-extrabold text-[#1F2937] mb-2">Pengguna Tidak Ditemukan</h1>
          <p className="text-sm text-[#5A6B78] mb-6">
            Dokumen pengguna dengan ID &ldquo;{id}&rdquo; tidak terdaftar di koleksi <code>users</code>.
          </p>
          <Link href="/admin/pengguna" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Kelola Pengguna
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Tautan Navigasi Kembali */}
      <Link 
        href="/admin/pengguna" 
        className="text-xs text-[#EA580C] font-bold hover:underline mb-4 inline-flex items-center gap-1.5 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Kelola Pengguna
      </Link>

      <div className="panel border border-[#E5E7EB] shadow-xs bg-white rounded-2xl p-6 sm:p-8">
        {/* Header Rincian Pengguna */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-[#EA580C]/10 text-[#EA580C] font-black text-xl flex items-center justify-center shrink-0 border border-orange-200">
              {(userData.nama || userData.email || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1F2937] tracking-tight">
                Rincian & Ubah Peran Pengguna
              </h1>
              <p className="text-xs text-[#5A6B78] mt-0.5 font-mono">
                UID Dokumen: <span className="font-semibold text-[#1F2937]">{id}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#5A6B78]">Peran Saat Ini:</span>
            <span className="badge badge-active text-xs uppercase font-extrabold">
              {userData.role || "siswa"}
            </span>
          </div>
        </div>

        {/* Notifikasi Umpan Balik */}
        {feedback && (
          <div className={`mb-6 p-4 rounded-xl text-xs flex items-start gap-2.5 shadow-xs animate-in fade-in ${
            feedback.type === "success" 
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800" 
              : "bg-red-50 border border-red-200 text-red-800"
          }`}>
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-[#15A66A] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5" />
            )}
            <span className="font-medium leading-relaxed">{feedback.msg}</span>
          </div>
        )}

        {/* Peringatan Proteksi Akun Sendiri Sesuai PRD 4.15 */}
        {isSelf && (
          <div className="mb-6 p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs flex items-start gap-3">
            <Lock className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block">Proteksi Akun Sendiri (PRD 4.15):</strong>
              <span className="leading-relaxed block mt-0.5">
                Anda sedang membuka akun Super Admin Anda sendiri. Sistem secara otomatis mengunci opsi penurunan peran dan penonaktifan akun demi mencegah penguncian sistem.
              </span>
            </div>
          </div>
        )}

        {/* Formulir Ubah Peran & Status */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Baris Informasi Profil (Read-Only) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#FAF9F7] border border-[#E5E7EB] text-xs">
            <div>
              <span className="text-[#5A6B78] font-medium block">Nama Lengkap</span>
              <strong className="text-[#1F2937] text-sm font-bold block mt-0.5">
                {userData.nama || "-"}
              </strong>
            </div>

            <div>
              <span className="text-[#5A6B78] font-medium block">Alamat Email</span>
              <strong className="text-[#1F2937] text-sm font-mono block mt-0.5">
                {userData.email || "-"}
              </strong>
            </div>

            <div>
              <span className="text-[#5A6B78] font-medium block">Nomor HP Pengguna</span>
              <span className="text-[#1F2937] font-semibold tabular-nums block mt-0.5">
                {userData.noHp || "(belum diisi)"}
              </span>
            </div>

            <div>
              <span className="text-[#5A6B78] font-medium block">Nomor HP Orang Tua</span>
              <span className="text-[#1F2937] font-semibold tabular-nums block mt-0.5">
                {userData.noHpOrangTua || "(tidak ada)"}
              </span>
            </div>
          </div>

          {/* Pemilihan Peran Baru Sesuai PRD 4.15 */}
          <div>
            <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#EA580C]" /> Tetapkan Peran Akun*
              </span>
              {isSelf && (
                <span className="text-[10px] text-purple-700 font-bold normal-case bg-purple-100 px-2 py-0.5 rounded">
                  Terkunci (Akun Sendiri)
                </span>
              )}
            </label>

            <select
              value={role}
              disabled={isSelf || isSaving}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full px-3.5 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs sm:text-sm font-semibold text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] ${
                isSelf ? "bg-[#F7F5F2] cursor-not-allowed text-[#5A6B78]" : ""
              }`}
            >
              <option value="siswa">Siswa (Akses: Beranda, Program, Kelas Saya, Tugas)</option>
              <option value="staf">Staf (Akses: Pendaftaran, Kelola Kelas, Data Siswa)</option>
              <option value="tutor">Tutor (Akses: Kelas yang Diajar, Presensi, Tugas & Nilai)</option>
              <option value="super_admin">Super Admin (Hak Akses Penuh ke Seluruh Modul)</option>
            </select>
            <p className="text-[11px] text-[#5A6B78] mt-1.5 leading-relaxed">
              Sesuai PRD 4.15: Pilihan peran valid hanya <code>siswa</code>, <code>staf</code>, <code>tutor</code>, atau <code>super_admin</code>. Ketika peran diubah ke tutor, pengguna akan otomatis diarahkan ke dasbor tutor saat login kembali.
            </p>
          </div>

          {/* Pengaturan Status Aktif Sesuai PRD 4.15 */}
          <div>
            <label className={`flex items-start gap-3.5 p-4 rounded-xl border transition ${
              aktif 
                ? "bg-emerald-50/50 border-emerald-200" 
                : "bg-red-50/50 border-red-200"
            } ${isSelf ? "cursor-not-allowed opacity-90" : "cursor-pointer"}`}>
              <input
                type="checkbox"
                checked={aktif}
                disabled={isSelf || isSaving}
                onChange={(e) => setAktif(e.target.checked)}
                className="w-4 h-4 text-[#EA580C] rounded border-gray-300 focus:ring-[#EA580C] mt-0.5"
              />
              <div className="flex-1">
                <span className="font-bold text-xs sm:text-sm text-[#1F2937] flex items-center gap-2">
                  <span>Status Akun Aktif (Dapat Masuk ke Portal)</span>
                  {aktif ? (
                    <span className="badge badge-active text-[10px]">Aktif</span>
                  ) : (
                    <span className="badge badge-rejected text-[10px]">Nonaktif</span>
                  )}
                </span>
                <span className="text-xs text-[#5A6B78] block mt-1 leading-relaxed">
                  {aktif ? (
                    "Pengguna diizinkan masuk dan menggunakan seluruh fitur sesuai perannya."
                  ) : (
                    "Untuk tutor yang berhenti atau siswa nonaktif: akun tidak dapat masuk lagi, namun seluruh data historis pendaftaran, presensi, dan nilai tetap tersimpan rapi di database."
                  )}
                </span>
              </div>
            </label>
          </div>

          {/* Tombol Aksi */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
            <Link 
              href="/admin/pengguna" 
              className="btn-secondary text-xs py-2 px-4"
            >
              Kembali
            </Link>

            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary text-xs py-2.5 px-5 shadow-xs inline-flex items-center gap-2 font-semibold"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan ke Firestore...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
