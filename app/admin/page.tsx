import Link from "next/link";

export default function DasborAdminPage() {
  return (
    <div style={{ padding: "30px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Dasbor Eksekutif Pemilik</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Ringkasan metrik performa Bimbingan Belajar Langkah Juara</p>
      </header>

      {/* Tiga Metrik Utama */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        <div className="panel">
          <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "8px" }}>Siswa Aktif</div>
          <div style={{ fontSize: "36px", fontWeight: "700", color: "var(--primary)" }}>58</div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>Minimal 1 pendaftaran aktif</div>
        </div>

        <div className="panel">
          <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "8px" }}>Pendaftaran Bulan Ini</div>
          <div style={{ fontSize: "36px", fontWeight: "700", color: "var(--status-pending)" }}>14</div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>Bulan berjalan (Oktober)</div>
        </div>

        <div className="panel">
          <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "8px" }}>Rata-rata Kehadiran</div>
          <div style={{ fontSize: "36px", fontWeight: "700", color: "var(--status-active)" }}>92%</div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>Presensi semua kelas berjalan</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <Link href="/admin/laporan" className="btn-primary">
          Buka Laporan Bulanan
        </Link>
        <Link href="/admin/pengguna" className="btn-secondary">
          Kelola Pengguna
        </Link>
        <Link href="/admin/program" className="btn-secondary">
          Kelola Program
        </Link>
      </div>
    </div>
  );
}
