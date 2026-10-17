"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  BookOpen, 
  GraduationCap, 
  User, 
  Users, 
  ClipboardCheck, 
  Layers, 
  BarChart3, 
  Home, 
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  SlidersHorizontal,
  LogOut,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const formatRoleLabel = (role) => {
  if (!role || role === "publik") return "Tamu";
  switch (role.toLowerCase()) {
    case "super_admin":
    case "admin":
      return "Super Admin";
    case "staf":
      return "Staf Administrasi";
    case "tutor":
      return "Tutor Pengajar";
    case "siswa":
    default:
      return "Siswa";
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, userProfile, loading, logout } = useAuth();

  // Pada halaman masuk atau pendaftaran, sidebar tidak perlu ditampilkan agar fokus penuh
  if (pathname === "/masuk" || pathname === "/daftar") {
    return null;
  }

  // Pemetaan cepat akun bawaan sistem untuk mencegah flicker/salah peran saat profil asinkron masih diambil
  const userEmail = String(userProfile?.email || user?.email || "").trim().toLowerCase();
  const isKnownPakArif = 
    userEmail === "arif.bimbel@langkahjuara.id" || 
    userEmail === "arif@langkahjuara.id" || 
    userEmail === "superadmin@langkahjuara.id" ||
    userEmail.includes("superadmin") ||
    userEmail.includes("super_admin");
  const isKnownKakFira = userEmail === "fira.staf@langkahjuara.id" || userEmail === "fira@langkahjuara.id" || userEmail.includes("staf");
  const isKnownKakDimas = userEmail === "dimas.tutor@langkahjuara.id" || userEmail === "dimas@langkahjuara.id" || userEmail.includes("dimas");
  const isKnownKakNadia = userEmail === "nadia.tutor@langkahjuara.id" || userEmail === "nadia@langkahjuara.id" || userEmail.includes("nadia");

  const effectiveRole = userProfile?.role || (
    isKnownPakArif ? "super_admin" :
    isKnownKakFira ? "staf" :
    (isKnownKakDimas || isKnownKakNadia) ? "tutor" :
    null
  );

  const isSuperAdmin = Boolean(
    user && (String(effectiveRole || "").trim().toLowerCase() === "super_admin" || isKnownPakArif)
  );

  // Status loading profil jika sesi auth/profil sedang dimuat dan bukan akun cepat
  const isPendingAuthOrProfile = Boolean(loading && !userProfile && !effectiveRole);

  // Deteksi peran aktif untuk navigasi modul
  let currentRole = "publik";
  if (user) {
    if (pathname.startsWith("/staf")) currentRole = "staf";
    else if (pathname.startsWith("/tutor")) currentRole = "tutor";
    else if (pathname.startsWith("/admin")) currentRole = "admin";
    else if (pathname === "/") currentRole = "publik";
    else {
      // Pada rute siswa (/beranda, /kelas, /tugas, /program)
      if (isSuperAdmin) {
        currentRole = "siswa"; // Super Admin dapat menjelajahi modul siswa
      } else {
        currentRole = effectiveRole || "siswa";
      }
    }
  }

  const navLinks = {
    publik: [
      { href: "/", label: "Beranda Utama", icon: Home },
      { href: "/program", label: "Katalog Program", icon: BookOpen },
    ],
    siswa: [
      { href: "/beranda", label: "Beranda Siswa", icon: Home },
      { href: "/program", label: "Katalog Program", icon: BookOpen },
      { href: "/kelas", label: "Kelas Saya", icon: Layers },
      { href: "/tugas", label: "Tugas Belajar", icon: ClipboardCheck },
      { href: "/profil", label: "Profil Akun", icon: User },
    ],
    staf: [
      { href: "/staf", label: "Dasbor Staf", icon: Home },
      { href: "/staf/pendaftaran", label: "Pendaftaran Siswa", icon: ClipboardCheck },
      { href: "/staf/kelas", label: "Kelola Jadwal & Kelas", icon: Layers },
      { href: "/staf/siswa", label: "Basis Data Siswa", icon: Users },
      { href: "/profil", label: "Profil Akun", icon: User },
    ],
    tutor: [
      { href: "/tutor", label: "Dasbor Tutor", icon: Home },
      { href: "/tutor/kelas", label: "Kelas yang Diajar", icon: Layers },
      { href: "/tutor/tugas", label: "Tugas & Penilaian", icon: ClipboardCheck },
      { href: "/profil", label: "Profil Akun", icon: User },
    ],
    admin: [
      { href: "/admin", label: "Dasbor Admin", icon: Home },
      { href: "/admin/pengguna", label: "Kelola Pengguna", icon: Users },
      { href: "/admin/program", label: "Program (Admin)", icon: BookOpen },
      { href: "/admin/laporan", label: "Laporan Bimbel", icon: BarChart3 },
      { href: "/profil", label: "Profil Akun", icon: User },
    ],
  };

  const activeLinks = navLinks[currentRole] || navLinks.publik;

  const roleAvatars = {
    siswa: "/avatars/default_user.svg",
    staf: "/avatars/default_user.svg",
    tutor: "/avatars/default_user.svg",
    admin: "/avatars/default_user.svg",
    super_admin: "/avatars/default_user.svg",
    publik: "/avatars/default_user.svg"
  };

  // Nama tampilan: Utamakan nama profil asli di Firestore, akun cepat, baru fallback displayName
  let displayName = userProfile?.nama;
  if (!displayName) {
    if (isKnownPakArif) displayName = "Pak Arif";
    else if (isKnownKakFira) displayName = "Kak Fira";
    else if (isKnownKakDimas) displayName = "Kak Dimas";
    else if (isKnownKakNadia) displayName = "Kak Nadia";
    else if (user?.displayName) displayName = user.displayName;
    else if (user?.email) displayName = user.email.split("@")[0];
    else displayName = null;
  }

  // Label peran di kartu profil: Super Admin SELALU tampil sebagai Super Admin
  const displayRoleLabel = formatRoleLabel(
    isSuperAdmin ? "super_admin" : (effectiveRole || currentRole)
  );

  // Foto profil: Utamakan avatar kustom di userProfile, user.photoURL, atau simbol avatar bawaan
  const displayAvatar = 
    userProfile?.avatar || 
    user?.photoURL || 
    roleAvatars[isSuperAdmin ? "super_admin" : (effectiveRole || currentRole)] || 
    "/avatars/default_user.svg";

  // Isi navigasi yang dipakai baik di desktop sidebar maupun mobile drawer
  const renderNavContent = (onLinkClick) => (
    <div className="flex flex-col h-full min-h-0 justify-between">
      {/* 1. Header Identitas Brand (shrink-0) */}
      <div className="p-3.5 px-4 border-b border-[#E5E7EB] shrink-0 bg-white">
        <Link href="/" onClick={onLinkClick} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#EA580C] flex items-center justify-center text-white font-black text-sm shadow-xs shrink-0">
            LJ
          </div>
          <div className="min-w-0">
            <span className="font-bold text-xs tracking-tight text-[#1F2937] group-hover:text-[#EA580C] transition-colors block leading-tight">
              LANGKAH JUARA
            </span>
            <span className="text-[10px] text-[#5A6B78] font-medium tracking-wide block truncate">
              Bimbel Prestasi Makassar
            </span>
          </div>
        </Link>
      </div>

      {/* 2. Menu Navigasi Modul (flex-1 min-h-0 overflow-y-auto) */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-2 space-y-3 sidebar-scroll">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] px-2 mb-1 block">
            Menu Navigasi {isPendingAuthOrProfile ? "" : `(${formatRoleLabel(currentRole)})`}
          </span>
          <nav className="space-y-0.5">
            {activeLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onLinkClick}
                  className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition group ${
                    isActive
                      ? "bg-[#FFF7ED] text-[#EA580C] border border-orange-200/80 font-bold shadow-2xs"
                      : "text-[#5A6B78] hover:text-[#1F2937] hover:bg-[#F7F5F2]"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-[#EA580C]" : "text-[#5A6B78] group-hover:text-[#1F2937]"}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bagian Inspeksi Peran khusus Super Admin */}
        {isSuperAdmin && (
          <div className="pt-2.5 border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between px-2 mb-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                <SlidersHorizontal className="w-3 h-3 text-[#5A6B78]" />
                <span>Inspeksi Peran</span>
              </div>
              <span className="text-[9px] font-bold bg-[#F7F5F2] text-[#5A6B78] border border-[#E5E7EB] px-1 py-0.5 rounded">
                Admin
              </span>
            </div>

            <div className="space-y-0.5">
              <Link
                href="/admin"
                onClick={onLinkClick}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition group ${
                  pathname.startsWith("/admin")
                    ? "bg-[#FFF7ED] text-[#EA580C] border border-orange-200/80 font-bold"
                    : "text-[#5A6B78] hover:text-[#1F2937] hover:bg-[#F7F5F2]"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <ShieldCheck className={`w-3.5 h-3.5 shrink-0 ${pathname.startsWith("/admin") ? "text-[#EA580C]" : "text-[#1F2937]"}`} />
                  <span className="truncate">Dasbor Super Admin</span>
                </div>
                {pathname.startsWith("/admin") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] shrink-0"></span>
                )}
              </Link>

              <Link
                href="/staf"
                onClick={onLinkClick}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition group ${
                  pathname.startsWith("/staf")
                    ? "bg-[#FFF7ED] text-[#EA580C] border border-orange-200/80 font-bold"
                    : "text-[#5A6B78] hover:text-[#1F2937] hover:bg-[#F7F5F2]"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <ClipboardCheck className={`w-3.5 h-3.5 shrink-0 ${pathname.startsWith("/staf") ? "text-[#EA580C]" : "text-[#1F2937]"}`} />
                  <span className="truncate">Modul Staf Administrasi</span>
                </div>
                {pathname.startsWith("/staf") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] shrink-0"></span>
                )}
              </Link>

              <Link
                href="/tutor"
                onClick={onLinkClick}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition group ${
                  pathname.startsWith("/tutor")
                    ? "bg-[#FFF7ED] text-[#EA580C] border border-orange-200/80 font-bold"
                    : "text-[#5A6B78] hover:text-[#1F2937] hover:bg-[#F7F5F2]"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <GraduationCap className={`w-3.5 h-3.5 shrink-0 ${pathname.startsWith("/tutor") ? "text-[#EA580C]" : "text-[#1F2937]"}`} />
                  <span className="truncate">Modul Tutor Pengajar</span>
                </div>
                {pathname.startsWith("/tutor") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] shrink-0"></span>
                )}
              </Link>

              <Link
                href="/beranda"
                onClick={onLinkClick}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition group ${
                  (!pathname.startsWith("/admin") && !pathname.startsWith("/staf") && !pathname.startsWith("/tutor") && pathname !== "/masuk" && pathname !== "/daftar")
                    ? "bg-[#FFF7ED] text-[#EA580C] border border-orange-200/80 font-bold"
                    : "text-[#5A6B78] hover:text-[#1F2937] hover:bg-[#F7F5F2]"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <BookOpen className={`w-3.5 h-3.5 shrink-0 ${(!pathname.startsWith("/admin") && !pathname.startsWith("/staf") && !pathname.startsWith("/tutor") && pathname !== "/masuk" && pathname !== "/daftar") ? "text-[#EA580C]" : "text-[#1F2937]"}`} />
                  <span className="truncate">Portal Siswa</span>
                </div>
                {(!pathname.startsWith("/admin") && !pathname.startsWith("/staf") && !pathname.startsWith("/tutor") && pathname !== "/masuk" && pathname !== "/daftar") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] shrink-0"></span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 3. Bagian Bawah: Profil Pengguna & Keluar (shrink-0 mt-auto) */}
      <div className="p-3 border-t border-[#E5E7EB] bg-[#F7F5F2]/60 shrink-0 mt-auto">
        {isPendingAuthOrProfile ? (
          <div className="flex items-center gap-2.5 p-1.5 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-[#E5E7EB] shrink-0" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="h-3 w-20 bg-[#E5E7EB] rounded" />
              <div className="h-2 w-12 bg-[#E5E7EB] rounded" />
            </div>
          </div>
        ) : user ? (
          <div className="space-y-1.5">
            <Link
              href="/profil"
              onClick={onLinkClick}
              className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#E5E7EB] transition group"
              title="Buka Profil Pengguna"
            >
              <div className="relative shrink-0">
                <img
                  src={displayAvatar}
                  alt={displayName || "Profil"}
                  className="w-8 h-8 rounded-full object-cover border border-[#E5E7EB]"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#15A66A] border-2 border-white rounded-full"></span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#1F2937] truncate group-hover:text-[#EA580C] transition-colors leading-tight">
                  {displayName}
                </p>
                <span className="inline-block text-[10px] font-semibold text-[#EA580C] uppercase tracking-wider leading-none mt-0.5">
                  {displayRoleLabel}
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => {
                if (onLinkClick) onLinkClick();
                setShowLogoutConfirm(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-1.5 px-3 text-xs font-semibold text-[#5A6B78] hover:text-[#DC2626] hover:bg-red-50 border border-[#E5E7EB] hover:border-red-200 rounded-lg transition cursor-pointer"
              title="Keluar dari sesi ini"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar Sesi</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <Link
              href="/masuk"
              onClick={onLinkClick}
              className="w-full py-1.5 text-center text-xs font-semibold text-[#1F2937] bg-white border border-[#E5E7EB] rounded-lg hover:border-[#EA580C] transition"
            >
              Masuk Akun
            </Link>
            <Link
              href="/daftar"
              onClick={onLinkClick}
              className="w-full py-1.5 text-center text-xs font-bold text-white bg-[#EA580C] hover:bg-orange-700 rounded-lg shadow-2xs transition"
            >
              Daftar Siswa Baru
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Left Sidebar (Visible on lg screens and up) */}
      <aside className="hidden lg:flex w-64 xl:w-72 shrink-0 bg-white border-r border-[#E5E7EB] h-screen sticky top-0 flex-col z-30 shadow-xs select-none">
        <div className="h-1 bg-[#EA580C] w-full shrink-0"></div>
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {renderNavContent()}
        </div>
      </aside>

      {/* 2. Mobile Top Header Bar (Visible on mobile screens) */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-xs">
        <div className="h-1 bg-[#EA580C] w-full"></div>
        <div className="px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EA580C] flex items-center justify-center text-white font-black text-sm shadow-xs">
              LJ
            </div>
            <div>
              <span className="font-bold text-xs tracking-tight text-[#1F2937] block leading-tight">
                LANGKAH JUARA
              </span>
              <span className="text-[10px] text-[#5A6B78] font-medium block">
                Bimbel Prestasi Makassar
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg text-[#5A6B78] hover:text-[#1F2937] hover:bg-[#F7F5F2] border border-[#E5E7EB] transition cursor-pointer"
            aria-label="Buka Menu Navigasi"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 3. Mobile Off-Canvas Drawer (Slides in from the left) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop Blur/Dim */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl z-50 flex flex-col min-h-0 overflow-hidden animate-in slide-in-from-left duration-200">
            {/* Tombol Tutup di pojok kanan atas drawer */}
            <div className="absolute top-3 right-3 z-10">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-[#5A6B78] hover:text-[#1F2937] hover:bg-[#F7F5F2] border border-[#E5E7EB] transition"
                aria-label="Tutup Menu Navigasi"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {renderNavContent(() => setMobileMenuOpen(false))}
          </div>
        </div>
      )}

      {/* 4. Modal Konfirmasi Keluar Sesi */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
            onClick={() => !isLoggingOut && setShowLogoutConfirm(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] max-w-sm w-full p-5 sm:p-6 z-10 animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-[#1F2937] leading-tight">
                  Konfirmasi Keluar Sesi
                </h3>
                <p className="text-xs text-[#5A6B78] mt-1 leading-relaxed">
                  Apakah Anda yakin ingin keluar dari akun ini? Sesi Anda akan diakhiri dan dialihkan kembali ke halaman masuk.
                </p>
              </div>
            </div>

            {user && (
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F7F5F2] border border-[#E5E7EB] mb-5">
                <img
                  src={displayAvatar}
                  alt={displayName || "Profil"}
                  className="w-9 h-9 rounded-full object-cover border border-[#E5E7EB] bg-white"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#1F2937] truncate leading-tight">
                    {displayName}
                  </p>
                  <span className="text-[10px] font-semibold text-[#EA580C] uppercase tracking-wider block mt-0.5">
                    {displayRoleLabel}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-[#5A6B78] hover:text-[#1F2937] hover:bg-[#F7F5F2] border border-[#E5E7EB] rounded-lg transition cursor-pointer disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={async () => {
                  try {
                    setIsLoggingOut(true);
                    await logout();
                    if (typeof window !== "undefined") {
                      window.location.href = "/masuk";
                    }
                  } catch (err) {
                    console.error("Logout error:", err);
                    if (typeof window !== "undefined") {
                      window.location.href = "/masuk";
                    }
                  }
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-2xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Mengeluarkan...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Ya, Keluar Sesi</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
