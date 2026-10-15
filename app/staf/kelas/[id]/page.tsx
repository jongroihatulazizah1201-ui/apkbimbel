export default async function RincianKelasStafPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div style={{ padding: "30px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Rincian Kelas & Siswa</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>ID Kelas: {id}</p>
      </header>

      <div className="panel" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Siswa Terdaftar</h2>
          <button type="button" className="btn-primary" style={{ fontSize: "13px", padding: "8px 14px" }}>
            + Tambah Siswa
          </button>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Hanya siswa dengan status pendaftaran aktif pada program ini yang dapat ditambahkan.
        </p>
      </div>
    </div>
  );
}
