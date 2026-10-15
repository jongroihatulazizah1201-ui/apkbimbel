import Link from "next/link";

export default function AksesDitolak() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="panel" style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>🚫</div>
        <h1 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "8px", color: "var(--status-rejected)" }}>
          Akses Ditolak
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: "1.6", marginBottom: "24px" }}>
          Anda tidak memiliki izin untuk membuka halaman ini. Silakan kembali ke dasbor sesuai peran akun Anda.
        </p>
        <Link href="/" className="btn-primary">
          Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
}
