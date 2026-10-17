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
  LogOut
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const formatRoleLabel = (role) => {
  if (!role) return "Siswa";
  switch (role.toLowerCase()) {
    case "super_admin":
    case "admin":
      return "Super Admin";
    case "staf":
      return "Staf";
    case "tutor":
      return "Tutor";
    case "siswa":
    default:
      return "Siswa";
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userProfile, logout } = useAuth();

  // Deteksi peran aktif berdasarkan URL untuk penyorotan menu
  let currentRole = "siswa";
  if (pathname.startsWith("/staf")) currentRole = "staf";
  else if (pathname.startsWith("/tutor")) currentRole = "tutor";
  else if (pathname.startsWith("/admin")) currentRole = "admin";
  else if (pathname === "/masuk" || pathname === "/daftar" || pathname === "/") currentRole = "publik";

  const navLinks = {
    publik: [
      { href: "/masuk", label: "Masuk", icon: User },
      { href: "/daftar", label: "Daftar", icon: GraduationCap },
    ],
    siswa: [
      { href: "/beranda", label: "Beranda", icon: Home },
      { href: "/program", label: "Program", icon: BookOpen },
      { href: "/kelas", label: "Kelas Saya", icon: Layers },
      { href: "/tugas", label: "Tugas", icon: ClipboardCheck },
      { href: "/profil", label: "Profil", icon: User },
    ],
    staf: [
      { href: "/staf", label: "Dasbor Staf", icon: Home },
      { href: "/staf/pendaftaran", label: "Pendaftaran", icon: ClipboardCheck },
      { href: "/staf/kelas", label: "Kelola Kelas", icon: Layers },
      { href: "/staf/siswa", label: "Data Siswa", icon: Users },
      { href: "/profil", label: "Profil", icon: User },
    ],
    tutor: [
      { href: "/tutor", label: "Dasbor Tutor", icon: Home },
      { href: "/tutor/kelas", label: "Kelas yang Diajar", icon: Layers },
      { href: "/tutor/tugas", label: "Tugas dan Nilai", icon: ClipboardCheck },
      { href: "/profil", label: "Profil", icon: User },
    ],
    admin: [
      { href: "/admin", label: "Dasbor Admin", icon: Home },
      { href: "/admin/pengguna", label: "Kelola Pengguna", icon: Users },
      { href: "/admin/program", label: "Program (Admin)", icon: BookOpen },
      { href: "/admin/laporan", label: "Laporan", icon: BarChart3 },
      { href: "/profil", label: "Profil", icon: User },
    ],
  };

  const activeLinks = navLinks[currentRole] || navLinks.siswa;

  const roleAvatars = {
    siswa: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    staf: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    tutor: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    admin: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    super_admin: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    publik: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
  };

  // Nama dan peran yang dibaca langsung dari Firestore users/{uid}
  const displayName = userProfile?.nama || user?.displayName || user?.email?.split("@")[0] || null;
  const displayRole = userProfile?.role ? formatRoleLabel(userProfile.role) : null;

  return (
    <header className="sticky top-0 z-50 shadow-xs">
      {/* Garis Aksen Oranye Juara (#EA580C) Sesuai PRD 5.1 */}
      <div className="h-1 bg-[#EA580C] w-full"></div>

      {/* PRD 5.1: Panel Putih (#FFFFFF) untuk Navigasi Utama */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-[#EA580C] flex items-center justify-center text-white font-black text-base shadow-sm">
                  LJ
                </div>
                <div>
                  <span className="font-bold text-base tracking-tight text-[#1F2937] group-hover:text-[#EA580C] transition-colors block leading-tight">
                    LANGKAH JUARA
                  </span>
                  <span className="text-[11px] text-[#5A6B78] font-medium tracking-wide block">
                    Bimbel Prestasi Makassar
                  </span>
                </div>
              </Link>

              {/* PRD 5.1: Menu Aktif memakai Oranye Juara (#EA580C) */}
              <nav className="hidden md:flex items-center space-x-1">
                {activeLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/" && (pathname.startsWith(item.href + "/")));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-[#FFF7ED] text-[#EA580C] border border-orange-200/80"
                          : "text-[#5A6B78] hover:text-[#1F2937] hover:bg-stone-50"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#EA580C]" : "text-[#5A6B78]"}`} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Profil Pengguna & Autentikasi */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    href="/profil"
                    className="flex items-center gap-2.5 bg-[#F7F5F2] hover:bg-stone-100 border border-[#E5E7EB] hover:border-[#EA580C]/40 px-3 py-1.5 rounded-full text-xs transition group"
                    title="Buka Profil Pengguna"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#15A66A]"></span>
                    <span className="text-[#5A6B78] font-medium">
                      <strong className="text-[#1F2937] font-bold mr-1 group-hover:text-[#EA580C] transition-colors">
                        {displayName}
                      </strong>
                      <span className="text-[11px] text-[#EA580C] font-semibold uppercase">
                        ({displayRole || formatRoleLabel(currentRole)})
                      </span>
                    </span>
                    <img
                      src={user?.photoURL || roleAvatars[userProfile?.role || currentRole] || roleAvatars.siswa}
                      alt={displayName || currentRole}
                      className="w-6 h-6 rounded-full object-cover border border-[#E5E7EB]"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={logout}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6B78] hover:text-[#DC2626] bg-[#F7F5F2] hover:bg-red-50 border border-[#E5E7EB] hover:border-red-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
                    title="Keluar dari sesi akun ini"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/masuk"
                    className="text-xs font-semibold text-[#5A6B78] hover:text-[#1F2937] px-3.5 py-2 rounded-lg hover:bg-stone-100 transition"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/daftar"
                    className="text-xs font-bold text-white bg-[#EA580C] hover:bg-orange-700 px-4 py-2 rounded-lg shadow-sm transition"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>

            {/* Tombol Menu Mobile */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#5A6B78] hover:text-[#1F2937] hover:bg-stone-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E5E7EB] bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          {user ? (
            <div className="flex items-center justify-between p-3 mb-2 bg-[#F7F5F2] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <img
                  src={user?.photoURL || roleAvatars[userProfile?.role || currentRole] || roleAvatars.siswa}
                  alt={displayName || currentRole}
                  className="w-10 h-10 rounded-full object-cover border border-[#E5E7EB]"
                />
                <div>
                  <p className="text-xs text-[#5A6B78] font-medium">Pengguna Masuk:</p>
                  <p className="text-sm font-bold text-[#1F2937]">{displayName}</p>
                  <span className="inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wider text-[#EA580C] bg-orange-100/60 px-1.5 py-0.5 rounded">
                    {displayRole || formatRoleLabel(currentRole)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={logout}
                className="text-xs text-red-600 hover:text-red-700 font-semibold px-2.5 py-1.5 border border-red-200 rounded-md bg-red-50 flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Keluar
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-2 mb-2">
              <Link
                href="/masuk"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-xs font-semibold text-[#1F2937] bg-[#F7F5F2] border border-[#E5E7EB] rounded-lg"
              >
                Masuk
              </Link>
              <Link
                href="/daftar"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-xs font-bold text-white bg-[#EA580C] rounded-lg"
              >
                Daftar
              </Link>
            </div>
          )}

          {activeLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#FFF7ED] text-[#EA580C] border border-orange-200"
                    : "text-[#1F2937] hover:bg-[#F7F5F2]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#EA580C]" />
                  {item.label}
                </div>
                <ChevronRight className="w-4 h-4 text-[#5A6B78]" />
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
