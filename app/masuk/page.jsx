"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, CheckCircle2, Star, AlertCircle, Loader2 } from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ensureUserProfile, getRoleRedirectPath } from "@/lib/auth";
import { useAuth } from "@/components/AuthProvider";

export default function MasukPage() {
  const router = useRouter();
  const { user: authUser, userProfile: authProfile, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Pengguna yang sudah masuk lalu membuka /masuk langsung diarahkan ke halaman perannya masing-masing
  useEffect(() => {
    if (!authLoading && authUser) {
      const targetRole = authProfile?.role || "siswa";
      const targetPath = getRoleRedirectPath(targetRole);
      router.replace(targetPath);
    }
  }, [authUser, authProfile, authLoading, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      let loggedUser = null;
      try {
        const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
        loggedUser = userCred.user;
      } catch (authErr) {
        console.warn("Auth check notice:", authErr);
        if (authErr.code === "auth/invalid-credential" || authErr.code === "auth/user-not-found") {
          setErrorMessage("Email atau kata sandi tidak cocok. Silakan periksa kembali atau daftar akun siswa baru.");
          setIsSubmitting(false);
          return;
        } else if (authErr.code === "auth/wrong-password") {
          setErrorMessage("Kata sandi salah. Silakan coba lagi.");
          setIsSubmitting(false);
          return;
        }
      }

      // Setelah pengguna berhasil masuk: cek dokumen users/{uid}. Bila belum ada, buat dokumen sesuai PRD 7.1 dan role "siswa". Bila sudah ada, jangan diubah. Jangan simpan kata sandi.
      if (loggedUser) {
        const profileResult = await ensureUserProfile(loggedUser, { email: email.trim() });
        const userRole = profileResult?.data?.role || "siswa";
        const targetPath = getRoleRedirectPath(userRole);
        router.push(targetPath);
        return;
      }

      router.push("/beranda");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Gagal masuk: " + (err.message || "Terjadi kendala jaringan."));
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Setelah pengguna berhasil masuk via Google: cek dokumen users/{uid}. Bila belum ada, buat dokumen sesuai PRD 7.1 dan role "siswa". Bila sudah ada, jangan diubah.
      const profileResult = await ensureUserProfile(user);
      const userRole = profileResult?.data?.role || "siswa";
      const targetPath = getRoleRedirectPath(userRole);
      router.push(targetPath);
    } catch (err) {
      console.error("Google sign in error:", err);
      if (err.code !== "auth/popup-closed-by-user") {
        setErrorMessage("Gagal masuk via Google: " + (err.message || "Silakan coba lagi."));
      }
      setIsSubmitting(false);
    }
  };

  // Tampilkan layar pengalihan bila pengguna sudah aktif dalam sesi login
  if (!authLoading && authUser) {
    const userRole = authProfile?.role || "siswa";
    const targetPath = getRoleRedirectPath(userRole);
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 bg-[#F7F5F2]">
        <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm text-center max-w-md w-full">
          <Loader2 className="w-8 h-8 animate-spin text-[#EA580C] mx-auto mb-4" />
          <h2 className="text-lg font-bold text-[#1F2937]">Mengarahkan ke Portal...</h2>
          <p className="text-xs text-[#5A6B78] mt-1.5 leading-relaxed">
            Anda telah masuk sebagai <strong className="text-[#1F2937] capitalize">{userRole.replace("_", " ")}</strong>. Sedang mengarahkan ke <span className="font-mono text-[#EA580C]">{targetPath}</span>...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 sm:py-12 bg-[#F7F5F2]">
      <div className="max-w-5xl w-full bg-white rounded-3xl border border-[#E5E7EB] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* Kolom Kiri: Formulir Masuk (Nixtio Minimalist Auth Style) */}
        <div className="lg:col-span-7 p-6 sm:p-10 xl:p-12 flex flex-col justify-between bg-white">
          {/* Header Identitas Brand */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#EA580C] text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                  LJ
                </div>
                <span className="font-extrabold text-[#1F2937] text-sm tracking-tight">
                  Langkah Juara <span className="text-[#EA580C] font-semibold text-xs ml-0.5">Makassar</span>
                </span>
              </Link>
              <Link href="/" className="text-xs font-semibold text-[#5A6B78] hover:text-[#EA580C] transition">
                Kembali ke Beranda
              </Link>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">
                Selamat Datang Kembali
              </h1>
              <p className="text-xs sm:text-sm text-[#5A6B78] mt-1.5">
                Masuk ke akun Anda untuk mengakses jadwal bimbingan dan materi belajar.
              </p>
            </div>

            {/* Opsi Masuk dengan Google */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleGoogleLogin}
              className="w-full py-2.5 px-4 bg-white hover:bg-[#F7F5F2] border border-[#E5E7EB] rounded-xl flex items-center justify-center gap-3 text-xs font-semibold text-[#1F2937] transition shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Masuk dengan Akun Google
            </button>

            {/* Pemisah Garis Halus */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-[#5A6B78] text-[11px] font-medium uppercase tracking-wider">
                  atau gunakan email
                </span>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3.5 bg-[#FDF2F2] border border-[#FECACA] text-[#E53935] text-xs rounded-xl flex items-start gap-2.5 font-medium leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}


            {/* Formulir Input */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
                  Alamat Email*
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-3.5 py-2.5 bg-[#F7F5F2]/40 hover:bg-white focus:bg-white border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#1F2937] placeholder-[#5A6B78]/60 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition font-medium"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider">
                    Kata Sandi*
                  </label>
                  <button
                    type="button"
                    onClick={() => setErrorMessage("Untuk reset sandi, hubungi admin bimbel di nomor kontak resmi.")}
                    className="text-[11px] text-[#5A6B78] hover:text-[#EA580C] transition"
                  >
                    Lupa sandi?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3.5 pr-10 py-2.5 bg-[#F7F5F2]/40 hover:bg-white focus:bg-white border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#1F2937] placeholder-[#5A6B78]/60 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6B78] hover:text-[#1F2937] p-1 transition"
                    aria-label="Tampilkan sandi"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#5A6B78]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#E5E7EB] text-[#EA580C] focus:ring-[#EA580C]"
                  />
                  <span>Ingat saya di perangkat ini</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memverifikasi Akun...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Portal Belajar</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Link */}
          <div className="pt-6 border-t border-[#E5E7EB] mt-6 text-center text-xs text-[#5A6B78]">
            Belum memiliki akun siswa?{" "}
            <Link href="/daftar" className="text-[#EA580C] font-bold hover:underline ml-0.5">
              Daftar siswa baru sekarang
            </Link>
          </div>
        </div>

        {/* Kolom Kanan: Showcase Visual Nixtio-Style (Foto & Floating Testimonial Card) */}
        <div className="hidden lg:flex lg:col-span-5 p-4 bg-[#F7F5F2] flex-col">
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-stone-900 flex flex-col justify-between p-7 text-white">
            {/* Foto Belajar Realistis */}
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
              alt="Sesi Belajar Langkah Juara"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            {/* Overlay Gradien Hangat */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-900/40"></div>

            {/* Konten Atas */}
            <div className="relative z-10">
              <span className="text-[11px] font-bold text-orange-300 uppercase tracking-wider block mb-1">
                Metode Belajar Terpandu
              </span>
              <h2 className="text-xl font-extrabold text-white leading-tight">
                Fasilitas Tatap Muka & Bimbingan Terfokus
              </h2>
            </div>

            {/* Floating Review/Testimonial Card (Ciri Khas Nixtio) */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl text-[#1F2937]">
              <div className="flex items-center gap-1 text-[#F59E0B] mb-2.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-xs font-bold text-[#1F2937] ml-1.5 tabular-nums">5.0</span>
              </div>

              <p className="text-xs text-[#1F2937] font-medium leading-relaxed mb-4">
                "Materi latihan UTBK di Langkah Juara sangat membantu meningkatkan skor tryout saya. Tutornya ramah dan penjelasannya mudah dipahami."
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-[#E5E7EB]">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop"
                  alt="Raka Pratama"
                  className="w-9 h-9 rounded-full object-cover border border-[#E5E7EB]"
                />
                <div>
                  <h3 className="font-bold text-xs text-[#1F2937]">Raka Pratama</h3>
                  <p className="text-[11px] text-[#5A6B78]">Siswa Intensif UTBK Makassar</p>
                </div>
              </div>
            </div>

            {/* Statistik Bawah */}
            <div className="relative z-10 grid grid-cols-2 gap-4 pt-2">
              <div>
                <div className="text-xl font-extrabold text-white tabular-nums">94%</div>
                <div className="text-[11px] text-stone-300 font-medium">Lolos PTN Favorit</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-orange-400 tabular-nums">1:8</div>
                <div className="text-[11px] text-stone-300 font-medium">Rasio Tutor Siswa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
