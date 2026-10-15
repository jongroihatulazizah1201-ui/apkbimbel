import Link from "next/link";

export default function KelasSayaPage() {
  return (
    <div style={{ padding: "30px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Kelas Saya</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Daftar kelas bimbingan yang Anda ikuti</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        <div className="panel">
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>Intensif UTBK A</h2>
          <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "4px" }}>Tutor: Kak Dimas</div>
          <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px" }}>Selasa, 16.00 · Ruang 2</div>
          <Link href="/kelas/demo-id" className="btn-secondary" style={{ fontSize: "13px", width: "100%" }}>
            Lihat Materi & Tugas
          </Link>
        </div>
      </div>
    </div>
  );
}
