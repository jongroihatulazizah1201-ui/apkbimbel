export default function DataSiswaStafPage() {
  return (
    <div style={{ padding: "30px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Data Siswa</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Daftar kontak siswa dan orang tua (Read-only)</p>
      </header>

      <div className="panel">
        <div style={{ marginBottom: "20px" }}>
          <input type="text" placeholder="Cari nama siswa..." style={{ width: "100%", maxWidth: "320px", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }} />
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
              <th style={{ padding: "12px 8px" }}>Nama Siswa</th>
              <th style={{ padding: "12px 8px" }}>Email</th>
              <th style={{ padding: "12px 8px" }}>HP Orang Tua</th>
              <th style={{ padding: "12px 8px" }}>Program Aktif</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
              <td style={{ padding: "12px 8px", fontWeight: "600" }}>Salsa Nabilla</td>
              <td style={{ padding: "12px 8px" }}>salsa@gmail.com</td>
              <td style={{ padding: "12px 8px" }} className="tabular-nums">081234567890</td>
              <td style={{ padding: "12px 8px" }}>Matematika SMP</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
