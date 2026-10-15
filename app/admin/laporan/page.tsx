export default function LaporanAdminPage() {
  return (
    <div style={{ padding: "30px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Laporan Rekapitulasi Bulanan</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Rekap siswa aktif, kehadiran, dan aktivitas kelas per tutor</p>
      </header>

      {/* Pilihan Periode Bulan */}
      <div className="panel" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <label style={{ fontSize: "14px", fontWeight: "600" }}>Pilih Periode:</label>
          <input type="month" defaultValue="2026-10" style={{ padding: "8px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }} />
        </div>
      </div>

      {/* 3 Tabel Rekapitulasi */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Tabel 1: Siswa Aktif per Program */}
        <div className="panel">
          <h2 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "16px" }}>1. Siswa Aktif per Program</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
                <th style={{ padding: "10px 8px" }}>Program</th>
                <th style={{ padding: "10px 8px" }}>Jenjang</th>
                <th style={{ padding: "10px 8px" }}>Jumlah Siswa Aktif</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                <td style={{ padding: "10px 8px", fontWeight: "600" }}>Intensif UTBK</td>
                <td style={{ padding: "10px 8px" }}>SMA</td>
                <td style={{ padding: "10px 8px" }} className="tabular-nums">35 Siswa</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                <td style={{ padding: "10px 8px", fontWeight: "600" }}>Matematika SMP</td>
                <td style={{ padding: "10px 8px" }}>SMP</td>
                <td style={{ padding: "10px 8px" }} className="tabular-nums">23 Siswa</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tabel 2: Kehadiran per Kelas */}
        <div className="panel">
          <h2 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "16px" }}>2. Tingkat Kehadiran per Kelas</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
                <th style={{ padding: "10px 8px" }}>Nama Kelas</th>
                <th style={{ padding: "10px 8px" }}>Tutor</th>
                <th style={{ padding: "10px 8px" }}>Rata-rata Kehadiran</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                <td style={{ padding: "10px 8px", fontWeight: "600" }}>Intensif UTBK A</td>
                <td style={{ padding: "10px 8px" }}>Kak Dimas</td>
                <td style={{ padding: "10px 8px" }} className="tabular-nums"><span style={{ color: "var(--status-active)", fontWeight: "600" }}>94%</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tabel 3: Jumlah Kelas per Tutor */}
        <div className="panel">
          <h2 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "16px" }}>3. Jumlah Kelas & Pertemuan per Tutor</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
                <th style={{ padding: "10px 8px" }}>Nama Tutor</th>
                <th style={{ padding: "10px 8px" }}>Kelas yang Diampu</th>
                <th style={{ padding: "10px 8px" }}>Total Pertemuan Terlaksana</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                <td style={{ padding: "10px 8px", fontWeight: "600" }}>Kak Dimas</td>
                <td style={{ padding: "10px 8px" }} className="tabular-nums">3 Kelas</td>
                <td style={{ padding: "10px 8px" }} className="tabular-nums">12 Pertemuan</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
