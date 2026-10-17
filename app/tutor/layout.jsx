"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Loader2, ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getRoleRedirectPath } from "@/lib/auth";

/**
 * Route Guard untuk Modul Tutor Pengajar (/tutor).
 * Sesuai PRD Bab 2.3 & Bab 8:
 * - Halaman /tutor diperuntukkan bagi peran "tutor" dan "super_admin".
 * - Pengguna yang belum masuk diarahkan ke /masuk.
 * - Pengguna dengan peran siswa atau staf melihat halaman Akses Ditolak.
 * - Selama role belum selesai dibaca dari users/{uid}, tampilkan layar Memuat... dan jangan memutuskan apa pun.
 */
export default function TutorLayout({ children }) {
  const router = useRouter();
  const { user, userProfile, loading } = useAuth();

  const userEmail = String(userProfile?.email || user?.email || "").toLowerCase();
  const isSuperAdmin = 
    userEmail === "arif.bimbel@langkahjuara.id" || 
    userEmail === "arif@langkahjuara.id" || 
    userEmail === "superadmin@langkahjuara.id" ||
    userEmail.includes("superadmin") || 
    userEmail.includes("super_admin") || 
    userEmail.includes("arif");
  const isTutorEmail = userEmail.includes("dimas") || userEmail.includes("nadia");
  const currentRole = String(userProfile?.role || (isSuperAdmin ? "super_admin" : isTutorEmail ? "tutor" : "")).trim().toLowerCase();

  // Selama role belum selesai dibaca dari users/{uid}, jangan memutuskan apa pun
  const isRolePending = loading || (Boolean(user) && !currentRole);

  const isAllowed = currentRole === "tutor" || currentRole === "super_admin" || currentRole === "admin" || isSuperAdmin || isTutorEmail;

  useEffect(() => {
    // JANGAN memutuskan apa pun selama role belum selesai dibaca
    if (isRolePending) {
      return;
    }

    // 1. Pengguna yang belum masuk diarahkan ke /masuk
    if (!user) {
      router.replace("/masuk");
      return;
    }

    // 2. Jika bukan tutor atau admin, otomatis alihkan ke dasbor perannya
    if (!isAllowed) {
      const dashboardPath = getRoleRedirectPath(currentRole);
      router.replace(dashboardPath);
      return;
    }
  }, [user, currentRole, isRolePending, isAllowed, router]);

  // Selama role belum selesai dibaca dari users/{uid}, tampilkan layar Memuat... dan jangan memutuskan apa pun
  if (isRolePending) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#F7F5F2]">
        <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-xs max-w-sm w-full flex flex-col items-center">
          <Loader2 className="w-9 h-9 text-[#EA580C] animate-spin mb-4" />
          <h2 className="text-base font-bold text-[#1F2937]">Memuat...</h2>
          <p className="text-xs text-[#5A6B78] mt-1.5 leading-relaxed">
            Memverifikasi hak akses tutor dari server...
          </p>
        </div>
      </div>
    );
  }

  // Pengguna yang belum masuk diarahkan ke /masuk
  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#F7F5F2]">
        <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-xs max-w-sm w-full flex flex-col items-center">
          <Loader2 className="w-8 h-8 text-[#EA580C] animate-spin mb-3" />
          <h2 className="text-sm font-semibold text-[#1F2937]">Mengarahkan ke halaman masuk...</h2>
          <p className="text-xs text-[#5A6B78] mt-1">Silakan masuk untuk mengakses modul Tutor Pengajar.</p>
        </div>
      </div>
    );
  }

  // Peran lain melihat halaman Akses Ditolak
  if (!isAllowed) {
    const dashboardPath = getRoleRedirectPath(currentRole);
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#F7F5F2]">
        <div className="panel max-w-md w-full text-center shadow-sm border border-[#E5E7EB] rounded-2xl p-8 bg-white">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1F2937] mb-2 tracking-tight">Akses Ditolak</h1>
          <p className="text-sm text-[#5A6B78] leading-relaxed mb-6 font-normal">
            Halaman ini khusus untuk <strong>Tutor Pengajar</strong> dan <strong>Super Admin</strong>. Akun Anda memiliki peran <span className="font-semibold text-[#1F2937] capitalize">({currentRole})</span>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <Link 
              href={dashboardPath} 
              className="btn-primary inline-flex items-center gap-2 text-xs py-2.5 px-5 w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" /> Buka Dasbor {currentRole}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
