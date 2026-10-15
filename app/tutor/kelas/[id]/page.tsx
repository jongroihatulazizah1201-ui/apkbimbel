export default async function KelasYangDiajarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div style={{ padding: "30px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Kelas yang Diajar</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>ID Kelas: {id}</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button type="button" className="btn-primary" style={{ fontSize: "13px" }}>
            + Buat Pertemuan
          </button>
          <button type="button" className="btn-secondary" style={{ fontSize: "13px" }}>
            + Buat Tugas
          </button>
        </div>
      </div>

      {/* Rekap Pertemuan & Presensi */}
      <div className="panel" style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>Pertemuan & Presensi</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Buat pertemuan baru untuk membagikan tautan materi dan mengisi checklist kehadiran siswa.
        </p>
      </div>
    </div>
  );
}
