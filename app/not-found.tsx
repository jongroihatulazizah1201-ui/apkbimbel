import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="panel" style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: "64px", fontWeight: "700", color: "var(--primary)", marginBottom: "8px" }}>404</h1>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px", color: "var(--foreground)" }}>
          Halaman Tidak Ditemukan
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: "1.5", marginBottom: "24px" }}>
          Alamat yang Anda tuju tidak dikenal atau telah dipindahkan.
        </p>
        <Link href="/" className="btn-primary">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
