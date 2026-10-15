import Link from "next/link";

export default function KelolaPenggunaAdminPage() {
  return (
    <div style={{ padding: "30px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Kelola Pengguna</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Atur peran dan status aktif akun pengguna</p>
      </header>

      <div className="panel">
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <input type="text" placeholder="Cari nama atau email..." style={{ width: "100%", maxWidth: "320px", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }} />
          <select style={{ padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px", background: "white" }}>
            <option value="">Semua Peran</option>
            <option value="siswa">Siswa</option>
            <option value="staf">Staf</option>
            <option value="tutor">Tutor</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
              <th style={{ padding: "12px 8px" }}>Nama</th>
              <th style={{ padding: "12px 8px" }}>Email</th>
              <th style={{ padding: "12px 8px" }}>Peran</th>
              <th style={{ padding: "12px 8px" }}>Status</th>
              <th style={{ padding: "12px 8px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
              <td style={{ padding: "12px 8px", fontWeight: "600" }}>Kak Dimas</td>
              <td style={{ padding: "12px 8px" }}>dimas@langkahjuara.id</td>
              <td style={{ padding: "12px 8px" }}><span className="badge badge-active">tutor</span></td>
              <td style={{ padding: "12px 8px" }}><span style={{ color: "var(--status-active)", fontWeight: "600" }}>Aktif</span></td>
              <td style={{ padding: "12px 8px" }}>
                <Link href="/admin/pengguna/demo-id" className="btn-secondary" style={{ fontSize: "12px", padding: "6px 10px" }}>
                  Ubah Peran / Status
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
