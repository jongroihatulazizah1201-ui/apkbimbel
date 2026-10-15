import Link from "next/link";

export default function DaftarPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="panel" style={{ maxWidth: "420px", width: "100%" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px", color: "var(--foreground)" }}>
          Daftar Siswa Baru
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "24px" }}>
          Bergabung bersama Langkah Juara
        </p>

        <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Nama Lengkap*</label>
            <input type="text" placeholder="Contoh: Salsa Nabilla" style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Email*</label>
            <input type="email" placeholder="nama@email.com" style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Kata Sandi*</label>
            <input type="password" placeholder="Minimal 6 karakter" style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }} />
          </div>
          <button type="button" className="btn-primary" style={{ marginTop: "8px" }}>
            Daftar Sekarang
          </button>
        </form>

        <div style={{ margin: "20px 0", textAlign: "center", position: "relative" }}>
          <hr style={{ border: "0", borderTop: "1px solid var(--border)" }} />
          <span style={{ position: "relative", top: "-10px", background: "var(--panel)", padding: "0 12px", color: "var(--text-muted)", fontSize: "12px" }}>
            atau
          </span>
        </div>

        <button type="button" className="btn-secondary" style={{ width: "100%" }}>
          Daftar dengan Google
        </button>

        <p style={{ marginTop: "24px", textAlign: "center", fontSize: "13px", color: "var(--text-muted)" }}>
          Sudah punya akun? <Link href="/masuk" style={{ color: "var(--primary)", fontWeight: "600" }}>Masuk</Link>
        </p>
      </div>
    </div>
  );
}
