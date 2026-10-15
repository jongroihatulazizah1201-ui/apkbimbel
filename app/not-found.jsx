import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="panel max-w-md w-full text-center shadow-md">
        <div className="text-6xl font-black text-primary mb-2">404</div>
        <h1 className="text-xl font-bold text-app-text mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-xs text-app-muted leading-relaxed mb-6">
          Alamat yang Anda tuju tidak dikenal atau telah dipindahkan. Silakan kembali ke beranda portal bimbingan belajar.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2 text-xs">
          <Home className="w-4 h-4" /> Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
}
