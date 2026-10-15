import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="panel" style={{ maxWidth: "520px", width: "100%", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "var(--primary-light)", padding: "10px 16px", borderRadius: "9999px", color: "var(--primary)", fontWeight: "600", fontSize: "14px", marginBottom: "16px" }}>
          Portal Belajar Langkah Juara
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "12px", color: "var(--foreground)" }}>
          Langkah Pasti Menuju Prestasi
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: "1.6", marginBottom: "28px" }}>
          Satu aplikasi web terintegrasi untuk pendaftaran program, jadwal kelas, materi belajar, dan pengumpulan tugas bimbingan belajar.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link href="/masuk" className="btn-primary" style={{ padding: "12px 24px", fontSize: "15px" }}>
            Masuk ke Portal
          </Link>
          <Link href="/daftar" className="btn-secondary" style={{ padding: "12px 24px", fontSize: "15px" }}>
            Daftar Siswa Baru
          </Link>
        </div>
      </div>
    </main>
  );
}
