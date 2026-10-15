export default async function RincianPenggunaAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div style={{ padding: "30px 20px", maxWidth: "600px", margin: "0 auto" }}>
      <div className="panel">
        <h1 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "8px" }}>Ubah Peran & Status Pengguna</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "24px" }}>UID: {id}</p>

        <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Nama Pengguna</label>
            <input type="text" disabled defaultValue="Kak Nadia" style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px", background: "var(--border-light)" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Peran Akun*</label>
            <select defaultValue="tutor" style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px", background: "white" }}>
              <option value="siswa">Siswa</option>
              <option value="staf">Staf</option>
              <option value="tutor">Tutor</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
              <input type="checkbox" defaultChecked /> Akun Aktif (Dapat Masuk ke Portal)
            </label>
          </div>
          <button type="button" className="btn-primary" style={{ alignSelf: "flex-start", marginTop: "8px" }}>
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
