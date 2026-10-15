import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function AksesDitolakPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="panel max-w-md w-full text-center shadow-md border-t-4 border-t-status-rejected">
        <div className="w-14 h-14 bg-red-100 text-status-rejected rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-app-text mb-2">Akses Ditolak</h1>
        <p className="text-xs text-app-muted leading-relaxed mb-6">
          Anda tidak memiliki wewenang untuk membuka halaman ini. Silakan kembali ke dasbor sesuai peran akun Anda.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2 text-xs">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda Portal
        </Link>
      </div>
    </div>
  );
}
