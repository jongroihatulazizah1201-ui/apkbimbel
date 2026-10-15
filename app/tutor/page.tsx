import Link from "next/link";

export default function DasborTutorPage() {
  return (
    <div style={{ padding: "30px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Dasbor Tutor</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Kelola jadwal mengajar, presensi, dan penilaian tugas</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        <div className="panel">
          <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px", color: "var(--primary)" }}>
            Kelas Hari Ini
          </h2>
          <div style={{ fontSize: "15px", fontWeight: "600" }}>Intensif UTBK A</div>
          <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "16px" }}>16.00 WITA · Ruang 2</p>
          <Link href="/tutor/kelas/demo-id" className="btn-secondary" style={{ fontSize: "13px" }}>
            Buka Kelas & Presensi
          </Link>
        </div>

        <div className="panel">
          <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px", color: "var(--primary)" }}>
            Semua Kelas Saya
          </h2>
          <div style={{ fontSize: "36px", fontWeight: "700", color: "var(--foreground)", marginBottom: "16px" }}>
            2
          </div>
          <Link href="/tutor/kelas/demo-id" className="btn-secondary" style={{ fontSize: "13px" }}>
            Daftar Kelas yang Diajar
          </Link>
        </div>
      </div>
    </div>
  );
}
