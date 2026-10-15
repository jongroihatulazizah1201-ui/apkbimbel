export default function PendaftaranStafPage() {
  return (
    <div style={{ padding: "30px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Pendaftaran Siswa</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Verifikasi bukti pembayaran pendaftaran bimbel</p>
      </header>

      <div className="panel">
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <button type="button" className="btn-primary" style={{ padding: "6px 14px", fontSize: "13px" }}>Semua</button>
          <button type="button" className="btn-secondary" style={{ padding: "6px 14px", fontSize: "13px" }}>Menunggu (4)</button>
          <button type="button" className="btn-secondary" style={{ padding: "6px 14px", fontSize: "13px" }}>Aktif</button>
          <button type="button" className="btn-secondary" style={{ padding: "6px 14px", fontSize: "13px" }}>Ditolak</button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
              <th style={{ padding: "12px 8px" }}>Nama Siswa</th>
              <th style={{ padding: "12px 8px" }}>Program</th>
              <th style={{ padding: "12px 8px" }}>Tanggal</th>
              <th style={{ padding: "12px 8px" }}>Status</th>
              <th style={{ padding: "12px 8px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
              <td style={{ padding: "12px 8px", fontWeight: "600" }}>Raka Pratama</td>
              <td style={{ padding: "12px 8px" }}>Intensif UTBK</td>
              <td style={{ padding: "12px 8px" }} className="tabular-nums">15/10/2026</td>
              <td style={{ padding: "12px 8px" }}><span className="badge badge-pending">Menunggu</span></td>
              <td style={{ padding: "12px 8px" }}>
                <button type="button" className="btn-primary" style={{ fontSize: "12px", padding: "6px 10px", marginRight: "6px" }}>Setujui</button>
                <button type="button" className="btn-secondary" style={{ fontSize: "12px", padding: "6px 10px" }}>Tolak</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
