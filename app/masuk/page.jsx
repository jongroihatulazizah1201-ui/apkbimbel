"use client";

import Link from "next/link";
import { useState } from "react";
import { LogIn, ArrowRight } from "lucide-react";

export default function MasukPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setNotification("Sistem disetel tanpa penjagaan login. Silakan pilih rute peran langsung dari menu di bilah atas.");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="panel max-w-md w-full shadow-md border-app-border">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center font-bold text-2xl mx-auto mb-3">
            LJ
          </div>
          <h1 className="text-2xl font-bold text-app-text">Masuk ke Akun Anda</h1>
          <p className="text-sm text-app-muted mt-1">Portal Belajar Langkah Juara Makassar</p>
        </div>

        {notification && (
          <div className="mb-6 p-3.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg">
            {notification}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5">
              Email*
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-3.5 py-2.5 bg-white border border-app-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-app-text uppercase tracking-wider">
                Kata Sandi*
              </label>
              <span className="text-[11px] text-app-muted">Min. 6 karakter</span>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-white border border-app-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <button type="submit" className="btn-primary w-full py-2.5 shadow-sm">
            <LogIn className="w-4 h-4" /> Masuk
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-app-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-app-muted">atau masuk dengan</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setNotification("Login Google disimulasikan aktif. Gunakan menu peran di atas untuk menjelajah.")}
          className="btn-secondary w-full py-2.5 flex items-center justify-center gap-3 text-sm font-semibold"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Masuk dengan Google
        </button>

        <p className="mt-8 text-center text-xs text-app-muted">
          Belum punya akun?{" "}
          <Link href="/daftar" className="text-primary font-semibold hover:underline">
            Daftar siswa baru di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
