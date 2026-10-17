import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AksesDitolakPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="panel max-w-md w-full text-center shadow-sm border border-[#E5E7EB] rounded-2xl p-8">
        <h1 className="text-2xl font-extrabold text-[#1F2937] mb-2 tracking-tight">Akses Ditolak</h1>
        <p className="text-sm text-[#5A6B78] leading-relaxed mb-6 font-normal">
          Anda tidak memiliki wewenang untuk membuka halaman ini. Silakan kembali ke dasbor sesuai peran akun Anda.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2 text-xs py-2.5 px-5">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda Portal
        </Link>
      </div>
    </div>
  );
}
