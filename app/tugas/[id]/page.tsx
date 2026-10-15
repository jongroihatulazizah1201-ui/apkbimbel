export default async function TugasDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div style={{ padding: "30px 20px", maxWidth: "700px", margin: "0 auto" }}>
      <div className="panel">
        <span className="badge badge-pending" style={{ marginBottom: "12px" }}>Belum dikumpulkan</span>
        <h1 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "8px" }}>Latihan Penalaran Umum 3</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>
          Kerjakan soal latihan pada link modul berikut dan kirimkan link Google Drive jawaban Anda.
        </p>

        <div style={{ marginBottom: "24px", padding: "12px", background: "var(--border-light)", borderRadius: "var(--radius-sm)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Batas Waktu:</div>
          <div style={{ fontWeight: "600", fontSize: "14px" }}>20 Oktober 2026, 23.59 WITA</div>
        </div>

        <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
              Tautan Jawaban (Google Drive)*
            </label>
            <input type="url" placeholder="https://drive.google.com/..." style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }} />
          </div>
          <button type="button" className="btn-primary" style={{ alignSelf: "flex-start" }}>
            Kumpulkan Tugas
          </button>
        </form>
      </div>
    </div>
  );
}
