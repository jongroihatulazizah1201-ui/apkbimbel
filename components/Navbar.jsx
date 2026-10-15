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
  FileText, 
  BarChart3, 
  Home, 
  Calendar,
  CheckCircle2,
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Deteksi peran aktif berdasarkan URL untuk highlight menu
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
      { href: "/tutor/kelas/demo-id", label: "Kelas yang Diajar", icon: Layers },
      { href: "/tutor/tugas/demo-id", label: "Tugas dan Nilai", icon: ClipboardCheck },
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

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-app-border shadow-sm">
      {/* Top Banner: Quick Role Switcher (Tanpa Login & Tanpa Penjagaan Halaman) */}
      <div className="bg-[#1F2937] text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-primary-light">Mode Pratinjau (Tanpa Login):</span>
          <span className="text-gray-300">Pilih peran untuk menjelajah menu:</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Link 
            href="/beranda" 
            className={`px-2.5 py-0.5 rounded text-xs font-medium transition ${currentRole === 'siswa' ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
          >
            Siswa
          </Link>
          <Link 
            href="/staf" 
            className={`px-2.5 py-0.5 rounded text-xs font-medium transition ${currentRole === 'staf' ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
          >
            Staf
          </Link>
          <Link 
            href="/tutor" 
            className={`px-2.5 py-0.5 rounded text-xs font-medium transition ${currentRole === 'tutor' ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
          >
            Tutor
          </Link>
          <Link 
            href="/admin" 
            className={`px-2.5 py-0.5 rounded text-xs font-medium transition ${currentRole === 'admin' ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
          >
            Super Admin
          </Link>
          <span className="text-gray-500">|</span>
          <Link 
            href="/masuk" 
            className={`px-2 py-0.5 rounded text-xs font-medium transition ${pathname === '/masuk' ? 'bg-primary text-white' : 'text-gray-300 hover:text-white'}`}
          >
            /masuk
          </Link>
          <Link 
            href="/daftar" 
            className={`px-2 py-0.5 rounded text-xs font-medium transition ${pathname === '/daftar' ? 'bg-primary text-white' : 'text-gray-300 hover:text-white'}`}
          >
            /daftar
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl shadow-sm">
                LJ
              </div>
              <div>
                <span className="font-bold text-lg text-app-text tracking-tight block leading-tight">
                  Langkah Juara
                </span>
                <span className="text-[11px] text-app-muted uppercase font-semibold tracking-wider block">
                  Portal Belajar
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-1 lg:space-x-2">
              {activeLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href) && item.href.length > 5);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-light text-primary font-semibold"
                        : "text-app-muted hover:text-app-text hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Profile / Status pill */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs text-app-muted font-medium bg-gray-100 px-2.5 py-1 rounded-full capitalize">
              Role: <strong className="text-app-text">{currentRole}</strong>
            </span>
            <Link
              href="/profil"
              className="w-9 h-9 rounded-full bg-primary-light text-primary font-semibold flex items-center justify-center text-sm border border-primary/20 hover:ring-2 hover:ring-primary/20 transition"
              title="Buka Profil"
            >
              {currentRole[0].toUpperCase()}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-app-muted hover:text-app-text hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-app-border bg-white px-4 pt-2 pb-4 space-y-1">
          {activeLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "bg-primary-light text-primary font-semibold"
                    : "text-app-muted hover:text-app-text hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
