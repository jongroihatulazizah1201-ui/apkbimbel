export default function ProfilPage() {
  return (
    <div style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto" }}>
      <div className="panel">
        <h1 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "8px" }}>Profil Pengguna</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "24px" }}>
          Informasi data akun di Langkah Juara
        </p>

        <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Nama Lengkap</label>
            <input type="text" defaultValue="Pengguna Langkah Juara" style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Email (Terkunci)</label>
            <input type="email" disabled defaultValue="pengguna@email.com" style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px", background: "var(--border-light)" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Nomor HP</label>
            <input type="text" placeholder="08xxxxxxxxxx" style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Nomor HP Orang Tua (Khusus Siswa)</label>
            <input type="text" placeholder="08xxxxxxxxxx" style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }} />
          </div>
          <button type="button" className="btn-primary" style={{ alignSelf: "flex-start", marginTop: "8px" }}>
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
