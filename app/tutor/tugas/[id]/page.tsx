export default async function TugasDanNilaiTutorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div style={{ padding: "30px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Pengumpulan Tugas & Penilaian</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>ID Tugas: {id}</p>
      </header>

      <div className="panel">
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
              <th style={{ padding: "12px 8px" }}>Nama Siswa</th>
              <th style={{ padding: "12px 8px" }}>Status</th>
              <th style={{ padding: "12px 8px" }}>Waktu Kumpul</th>
              <th style={{ padding: "12px 8px" }}>Tautan Jawaban</th>
              <th style={{ padding: "12px 8px" }}>Nilai (0-100)</th>
              <th style={{ padding: "12px 8px" }}>Komentar</th>
              <th style={{ padding: "12px 8px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
              <td style={{ padding: "12px 8px", fontWeight: "600" }}>Raka Pratama</td>
              <td style={{ padding: "12px 8px" }}><span className="badge badge-active">Dinilai</span></td>
              <td style={{ padding: "12px 8px" }} className="tabular-nums">16/10 14.30</td>
              <td style={{ padding: "12px 8px" }}>
                <a href="#" style={{ color: "var(--primary)", textDecoration: "underline" }} target="_blank">Lihat Drive</a>
              </td>
              <td style={{ padding: "12px 8px" }} className="tabular-nums">
                <input type="number" defaultValue="85" style={{ width: "60px", padding: "4px 8px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }} />
              </td>
              <td style={{ padding: "12px 8px" }}>
                <input type="text" defaultValue="Pengerjaan sudah baik" style={{ width: "160px", padding: "4px 8px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }} />
              </td>
              <td style={{ padding: "12px 8px" }}>
                <button type="button" className="btn-primary" style={{ fontSize: "12px", padding: "6px 10px" }}>Simpan</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
