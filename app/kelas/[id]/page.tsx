export default async function RincianKelasPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div style={{ padding: "30px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Rincian Kelas</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>ID Kelas: {id}</p>
      </header>

      {/* Pertemuan & Materi */}
      <div className="panel" style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>Daftar Pertemuan</h2>
        <div style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontWeight: "600" }}>Pertemuan 1: Pengenalan Soal UTBK</div>
          <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>10 Oktober 2026</div>
        </div>
      </div>

      {/* Tugas Kelas */}
      <div className="panel">
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>Tugas Kelas</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Belum ada tugas aktif untuk kelas ini.</p>
      </div>
    </div>
  );
}
