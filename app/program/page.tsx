export default function ProgramPage() {
  return (
    <div style={{ padding: "30px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Pilihan Program Bimbingan</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Pilih program dan ajukan pendaftaran Anda</p>
      </header>

      {/* Program Aktif */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        <div className="panel">
          <span className="badge badge-active" style={{ marginBottom: "12px" }}>SMA</span>
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "6px" }}>Intensif UTBK</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "16px" }}>
            32 Pertemuan · Persiapan SNBT & Ujian Masuk PTN
          </p>
          <div className="tabular-nums" style={{ fontSize: "20px", fontWeight: "700", color: "var(--primary)", marginBottom: "16px" }}>
            Rp 1.500.000
          </div>
          <button type="button" className="btn-primary" style={{ width: "100%" }}>
            Ajukan Pendaftaran
          </button>
        </div>
      </div>

      {/* Pendaftaran Saya */}
      <div className="panel">
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>Pendaftaran Saya</h2>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
          <div>
            <div style={{ fontWeight: "600" }}>Intensif UTBK</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Diajukan: 15 Oktober 2026</div>
          </div>
          <span className="badge badge-pending">Menunggu</span>
        </div>
      </div>
    </div>
  );
}
