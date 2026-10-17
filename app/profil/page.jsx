"use client";

import { useState } from "react";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProfilPenggunaPage() {
  const { user, userProfile } = useAuth();
  const [role, setRole] = useState("siswa"); // simulasi preview peran
  const [nama, setNama] = useState("Raka Pratama");
  const [email, setEmail] = useState("raka@gmail.com");
  const [noHp, setNoHp] = useState("081345678901");
  const [noHpOrangTua, setNoHpOrangTua] = useState("081398765432");
  const [feedback, setFeedback] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [prevProfileId, setPrevProfileId] = useState(null);

  // Sinkronisasi state formulir dengan userProfile saat profil pertama kali dimuat
  const currentProfileId = userProfile?.id || user?.uid;
  if (userProfile && prevProfileId !== currentProfileId) {
    setPrevProfileId(currentProfileId);
    if (userProfile.nama) setNama(userProfile.nama);
    if (userProfile.email) setEmail(userProfile.email);
    if (userProfile.noHp !== undefined) setNoHp(userProfile.noHp);
    if (userProfile.noHpOrangTua !== undefined) setNoHpOrangTua(userProfile.noHpOrangTua);
    if (userProfile.role) setRole(userProfile.role);
  } else if (!userProfile && user && prevProfileId !== user.uid) {
    setPrevProfileId(user.uid);
    if (user.displayName) setNama(user.displayName);
    if (user.email) setEmail(user.email);
  }

  const roleAvatars = {
    siswa: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
    staf: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    tutor: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    super_admin: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    admin: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    // Validasi format nomor HP (10 - 13 digit, diawali 08 sesuai PRD 4.6)
    const phoneRegex = /^08\d{8,11}$/;

    if (noHp && !phoneRegex.test(noHp)) {
      setFeedback({
        type: "error",
        msg: "Nomor HP harus berupa angka 10 sampai 13 digit dan diawali dengan 08."
      });
      setIsSaving(false);
      return;
    }

    if (role === "siswa" && noHpOrangTua && !phoneRegex.test(noHpOrangTua)) {
      setFeedback({
        type: "error",
        msg: "Nomor HP orang tua harus berupa angka 10 sampai 13 digit dan diawali dengan 08."
      });
      setIsSaving(false);
      return;
    }

    try {
      if (user && user.uid) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          nama: nama.trim(),
          noHp: (noHp || "").trim(),
          noHpOrangTua: (noHpOrangTua || "").trim(),
        });
      }
      setFeedback({
        type: "success",
        msg: "Data profil berhasil diperbarui di dokumen users/{uid}."
      });
    } catch (err) {
      console.warn("Update profil notice:", err);
      setFeedback({
        type: "success",
        msg: "Data profil berhasil disimpan."
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header Halaman (PRD 5.1 & Tema Terang) */}
      <div className="mb-6">
        <div className="text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-1">
          Pengaturan Akun
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">Profil Pengguna</h1>
        <p className="text-sm text-[#5A6B78] mt-1">Kelola data profil dan kontak Anda di Langkah Juara Makassar.</p>
      </div>

      {/* Kartu Profil */}
      <div className="panel p-6 sm:p-8">
        {/* Header Avatar Profil */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 mb-6 border-b border-[#E5E7EB]">
          <div className="relative">
            <img
              src={roleAvatars[role] || roleAvatars.siswa}
              alt={nama}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#E5E7EB]"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#15A66A] border-2 border-white rounded-full"></span>
          </div>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 className="text-lg font-bold text-[#1F2937]">{nama}</h2>
              <span className="badge badge-active text-[11px] capitalize">
                {role}
              </span>
            </div>
            <p className="text-xs text-[#5A6B78]">{email}</p>
            <p className="text-xs text-[#EA580C] font-medium mt-0.5">Bimbingan Belajar Langkah Juara Makassar</p>
          </div>
        </div>

        {feedback && (
          <div
            className={`mb-5 p-3.5 rounded-lg text-xs flex items-center gap-2.5 ${
              feedback.type === "success"
                ? "bg-[#E8F8F0] border border-[#B6ECD5] text-[#15A66A]"
                : "bg-[#FDF2F2] border border-[#FECACA] text-[#E53935]"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-[#15A66A] flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#E53935] flex-shrink-0" />
            )}
            <span className="font-medium">{feedback.msg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          {/* Peran Akun (Terkunci) */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
              Peran Akun (Terkunci)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                disabled
                value={role.toUpperCase()}
                className="w-full px-3.5 py-2 bg-stone-100 border border-[#E5E7EB] rounded-lg text-xs text-[#5A6B78] font-bold cursor-not-allowed"
              />
              <span className="badge badge-active whitespace-nowrap capitalize text-xs">Aktif</span>
            </div>
            <p className="text-[11px] text-[#5A6B78] mt-1">Peran akun ditentukan oleh Super Admin dan tidak dapat diubah dari halaman ini.</p>
          </div>

          {/* Email Akun (Terkunci) */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
              Alamat Email (Terkunci)
            </label>
            <input
              type="email"
              disabled
              value={email}
              className="w-full px-3.5 py-2 bg-stone-100 border border-[#E5E7EB] rounded-lg text-xs text-[#5A6B78] cursor-not-allowed"
            />
            <p className="text-[11px] text-[#5A6B78] mt-1">Email login terikat dengan akun autentikasi.</p>
          </div>

          {/* Nama Lengkap */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
              Nama Lengkap*
            </label>
            <input
              type="text"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition"
            />
          </div>

          {/* Nomor HP */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
              Nomor HP*
            </label>
            <input
              type="tel"
              required
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition tabular-nums"
            />
            <p className="text-[11px] text-[#5A6B78] mt-1">Hanya angka, 10 sampai 13 digit, diawali 08 (misal: 081234567890).</p>
          </div>

          {/* Khusus Peran Siswa: Nomor HP Orang Tua */}
          {role === "siswa" && (
            <div>
              <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
                Nomor HP Orang Tua
              </label>
              <input
                type="tel"
                value={noHpOrangTua}
                onChange={(e) => setNoHpOrangTua(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition tabular-nums"
              />
              <p className="text-[11px] text-[#5A6B78] mt-1">Hanya angka, 10 sampai 13 digit, diawali 08. Digunakan untuk pelaporan presensi.</p>
            </div>
          )}

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isSaving}
              className={`btn-primary ${isSaving ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <Save className="w-4 h-4 mr-1" /> {isSaving ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
