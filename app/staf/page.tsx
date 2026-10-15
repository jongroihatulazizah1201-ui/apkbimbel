import Link from "next/link";

export default function DasborStafPage() {
  return (
    <div style={{ padding: "30px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Dasbor Staf Administrasi</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Ringkasan pendaftaran dan kelas hari ini</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        <div className="panel">
          <h2 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px" }}>
            Pendaftaran Menunggu
          </h2>
          <div style={{ fontSize: "36px", fontWeight: "700", color: "var(--status-pending)", marginBottom: "16px" }}>
            4
          </div>
          <Link href="/staf/pendaftaran?status=menunggu" className="btn-secondary" style={{ fontSize: "13px" }}>
            Periksa Pendaftaran
          </Link>
        </div>

        <div className="panel">
          <h2 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px" }}>
            Kelas Hari Ini
          </h2>
          <div style={{ fontSize: "36px", fontWeight: "700", color: "var(--primary)", marginBottom: "16px" }}>
            2
          </div>
          <Link href="/staf/kelas" className="btn-secondary" style={{ fontSize: "13px" }}>
            Kelola Kelas
          </Link>
        </div>
      </div>
    </div>
  );
}
