import Link from "next/link";

export default function KelolaKelasStafPage() {
  return (
    <div style={{ padding: "30px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Kelola Kelas</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Atur jadwal, tutor, dan penempatan siswa</p>
        </div>
        <button type="button" className="btn-primary">
          + Buat Kelas Baru
        </button>
      </div>

      <div className="panel">
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
              <th style={{ padding: "12px 8px" }}>Nama Kelas</th>
              <th style={{ padding: "12px 8px" }}>Program</th>
              <th style={{ padding: "12px 8px" }}>Tutor</th>
              <th style={{ padding: "12px 8px" }}>Hari & Jam</th>
              <th style={{ padding: "12px 8px" }}>Jumlah Siswa</th>
              <th style={{ padding: "12px 8px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
              <td style={{ padding: "12px 8px", fontWeight: "600" }}>Intensif UTBK A</td>
              <td style={{ padding: "12px 8px" }}>Intensif UTBK</td>
              <td style={{ padding: "12px 8px" }}>Kak Dimas</td>
              <td style={{ padding: "12px 8px" }}>Selasa, 16.00</td>
              <td style={{ padding: "12px 8px" }}>12 Siswa</td>
              <td style={{ padding: "12px 8px" }}>
                <Link href="/staf/kelas/demo-id" className="btn-secondary" style={{ fontSize: "12px", padding: "6px 10px" }}>
                  Rincian & Tambah Siswa
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
