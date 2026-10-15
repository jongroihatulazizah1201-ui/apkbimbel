export default function KelolaProgramAdminPage() {
  return (
    <div style={{ padding: "30px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Kelola Program Bimbingan</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Tambah dan atur paket program bimbel aktif</p>
        </div>
        <button type="button" className="btn-primary">
          + Tambah Program Baru
        </button>
      </div>

      <div className="panel">
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
              <th style={{ padding: "12px 8px" }}>Nama Program</th>
              <th style={{ padding: "12px 8px" }}>Jenjang</th>
              <th style={{ padding: "12px 8px" }}>Pertemuan</th>
              <th style={{ padding: "12px 8px" }}>Harga</th>
              <th style={{ padding: "12px 8px" }}>Status</th>
              <th style={{ padding: "12px 8px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
              <td style={{ padding: "12px 8px", fontWeight: "600" }}>Intensif UTBK</td>
              <td style={{ padding: "12px 8px" }}>SMA</td>
              <td style={{ padding: "12px 8px" }} className="tabular-nums">32</td>
              <td style={{ padding: "12px 8px" }} className="tabular-nums">Rp 1.500.000</td>
              <td style={{ padding: "12px 8px" }}><span style={{ color: "var(--status-active)", fontWeight: "600" }}>Aktif</span></td>
              <td style={{ padding: "12px 8px" }}>
                <button type="button" className="btn-secondary" style={{ fontSize: "12px", padding: "6px 10px" }}>Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
