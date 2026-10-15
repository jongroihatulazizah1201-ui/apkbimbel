import Link from "next/link";

export default function BerandaPage() {
  return (
    <div style={{ padding: "30px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Beranda Siswa</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Selamat datang di Portal Belajar Langkah Juara</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {/* Kartu Kelas Berikutnya */}
        <div className="panel">
          <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", color: "var(--primary)" }}>
            Kelas Berikutnya
          </h2>
          <div style={{ fontSize: "15px", fontWeight: "600", marginBottom: "4px" }}>Intensif UTBK A</div>
          <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "16px" }}>
            Selasa, 16.00 WITA · Ruang 2
          </p>
          <Link href="/kelas" className="btn-secondary" style={{ fontSize: "13px", padding: "8px 14px" }}>
            Buka Kelas Saya
          </Link>
        </div>

        {/* Kartu Tugas Belum Dikumpulkan */}
        <div className="panel">
          <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", color: "var(--primary)" }}>
            Tugas Belum Dikumpulkan
          </h2>
          <div style={{ fontSize: "14px", marginBottom: "8px" }}>
            <div style={{ fontWeight: "600" }}>Latihan Penalaran Umum 3</div>
            <div style={{ fontSize: "12px", color: "var(--status-pending)" }}>Batas: Besok, 23.59 WITA</div>
          </div>
          <Link href="/kelas" className="btn-secondary" style={{ fontSize: "13px", padding: "8px 14px" }}>
            Lihat Semua Tugas
          </Link>
        </div>
      </div>
    </div>
  );
}
