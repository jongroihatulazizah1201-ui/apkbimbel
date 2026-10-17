import { db } from "../lib/firebase.js";
import { doc, setDoc, Timestamp } from "firebase/firestore";

async function seedFirestore() {
  console.log("Memulai pengisian seed data Cloud Firestore untuk proyek apkbimbel...");

  const now = Timestamp.now();
  const pastDate = Timestamp.fromDate(new Date("2026-10-01T08:00:00Z"));
  const deadlineUtbk = Timestamp.fromDate(new Date("2026-10-25T23:59:00Z"));
  const deadlineMat = Timestamp.fromDate(new Date("2026-10-28T23:59:00Z"));
  const submittedUtbk = Timestamp.fromDate(new Date("2026-10-10T14:30:00Z"));
  const submittedMat = Timestamp.fromDate(new Date("2026-10-11T10:15:00Z"));

  // 1. users (PRD 7.1: nama, email, noHp, noHpOrangTua, role, aktif, dibuatPada)
  const users = [
    {
      id: "user_superadmin_arif",
      nama: "Pak Arif",
      email: "superadmin@langkahjuara.id",
      noHp: "081122334455",
      noHpOrangTua: "",
      role: "super_admin",
      aktif: true,
      dibuatPada: pastDate,
    },
    {
      id: "user_staf_fira",
      nama: "Kak Fira",
      email: "fira.staf@langkahjuara.id",
      noHp: "081234567890",
      noHpOrangTua: "",
      role: "staf",
      aktif: true,
      dibuatPada: pastDate,
    },
    {
      id: "user_tutor_dimas",
      nama: "Kak Dimas",
      email: "dimas.tutor@langkahjuara.id",
      noHp: "081345678901",
      noHpOrangTua: "",
      role: "tutor",
      aktif: true,
      dibuatPada: pastDate,
    },
    {
      id: "user_tutor_nadia",
      nama: "Kak Nadia",
      email: "nadia.tutor@langkahjuara.id",
      noHp: "081456789012",
      noHpOrangTua: "",
      role: "tutor",
      aktif: true,
      dibuatPada: pastDate,
    },
    {
      id: "user_siswa_raka",
      nama: "Raka",
      email: "raka.siswa@langkahjuara.id",
      noHp: "081234567891",
      noHpOrangTua: "081298765431",
      role: "siswa",
      aktif: true,
      dibuatPada: pastDate,
    },
    {
      id: "user_siswa_salsa",
      nama: "Salsa",
      email: "salsa.siswa@langkahjuara.id",
      noHp: "081234567892",
      noHpOrangTua: "081298765432",
      role: "siswa",
      aktif: true,
      dibuatPada: pastDate,
    },
  ];

  console.log("Mengisi koleksi 'users'...");
  for (const u of users) {
    const { id, ...data } = u;
    await setDoc(doc(db, "users", id), data);
    console.log(` - users/${id} (${data.nama} - ${data.role})`);
  }

  // 2. program (PRD 7.1: nama, jenjang, jumlahPertemuan, harga, aktif)
  const programs = [
    {
      id: "prog_utbk",
      nama: "Intensif UTBK",
      jenjang: "SMA",
      jumlahPertemuan: 16,
      harga: 1500000,
      aktif: true,
    },
    {
      id: "prog_mat_smp",
      nama: "Matematika SMP",
      jenjang: "SMP",
      jumlahPertemuan: 12,
      harga: 800000,
      aktif: true,
    },
    {
      id: "prog_ipa_smp",
      nama: "IPA Terpadu SMP",
      jenjang: "SMP",
      jumlahPertemuan: 12,
      harga: 850000,
      aktif: true,
    },
  ];

  console.log("Mengisi koleksi 'program'...");
  for (const p of programs) {
    const { id, ...data } = p;
    await setDoc(doc(db, "program", id), data);
    console.log(` - program/${id} (${data.nama})`);
  }

  // 3. pendaftaran (PRD 7.1: siswaId, programId, status, catatanStaf, dibuatPada)
  const pendaftaran = [
    {
      id: "pend_raka_utbk",
      siswaId: "user_siswa_raka",
      programId: "prog_utbk",
      status: "aktif",
      catatanStaf: "",
      dibuatPada: pastDate,
    },
    {
      id: "pend_salsa_mat",
      siswaId: "user_siswa_salsa",
      programId: "prog_mat_smp",
      status: "aktif",
      catatanStaf: "",
      dibuatPada: pastDate,
    },
    {
      id: "pend_raka_ipa",
      siswaId: "user_siswa_raka",
      programId: "prog_ipa_smp",
      status: "menunggu",
      catatanStaf: "",
      dibuatPada: now,
    },
  ];

  console.log("Mengisi koleksi 'pendaftaran'...");
  for (const p of pendaftaran) {
    const { id, ...data } = p;
    await setDoc(doc(db, "pendaftaran", id), data);
    console.log(` - pendaftaran/${id} (${data.status})`);
  }

  // 4. kelas (PRD 7.1: nama, programId, tutorId, siswaIds, hari, jam, tempat)
  const kelas = [
    {
      id: "kelas_utbk_a",
      nama: "Intensif UTBK A",
      programId: "prog_utbk",
      tutorId: "user_tutor_dimas",
      siswaIds: ["user_siswa_raka"],
      hari: "Senin & Rabu",
      jam: "16.00 - 17.30",
      tempat: "Ruang 1",
    },
    {
      id: "kelas_mat_smp_b",
      nama: "Matematika SMP B",
      programId: "prog_mat_smp",
      tutorId: "user_tutor_nadia",
      siswaIds: ["user_siswa_salsa"],
      hari: "Selasa & Kamis",
      jam: "16.00 - 17.30",
      tempat: "Ruang 2",
    },
  ];

  console.log("Mengisi koleksi 'kelas'...");
  for (const k of kelas) {
    const { id, ...data } = k;
    await setDoc(doc(db, "kelas", id), data);
    console.log(` - kelas/${id} (${data.nama})`);
  }

  // 5. pertemuan (PRD 7.1: kelasId, tanggal, topik, materiUrl, hadirIds)
  const pertemuan = [
    {
      id: "pert_utbk_01",
      kelasId: "kelas_utbk_a",
      tanggal: "2026-10-05",
      topik: "Penalaran Umum & Logika",
      materiUrl: "https://drive.google.com/materi-utbk-1",
      hadirIds: ["user_siswa_raka"],
    },
    {
      id: "pert_utbk_02",
      kelasId: "kelas_utbk_a",
      tanggal: "2026-10-07",
      topik: "Literasi Bahasa Indonesia",
      materiUrl: "https://drive.google.com/materi-utbk-2",
      hadirIds: ["user_siswa_raka"],
    },
    {
      id: "pert_mat_01",
      kelasId: "kelas_mat_smp_b",
      tanggal: "2026-10-06",
      topik: "Aljabar dan Persamaan Linier",
      materiUrl: "https://drive.google.com/materi-mat-aljabar",
      hadirIds: ["user_siswa_salsa"],
    },
  ];

  console.log("Mengisi koleksi 'pertemuan'...");
  for (const pt of pertemuan) {
    const { id, ...data } = pt;
    await setDoc(doc(db, "pertemuan", id), data);
    console.log(` - pertemuan/${id} (${data.topik})`);
  }

  // 6. tugas (PRD 7.1: kelasId, judul, deskripsi, batasWaktu)
  const tugas = [
    {
      id: "tugas_utbk_01",
      kelasId: "kelas_utbk_a",
      judul: "Latihan Soal Penalaran Umum Set 1",
      deskripsi: "Kerjakan 20 soal penalaran logika di lembar jawaban online.",
      batasWaktu: deadlineUtbk,
    },
    {
      id: "tugas_mat_01",
      kelasId: "kelas_mat_smp_b",
      judul: "PR Aljabar Dasar No. 1-10",
      deskripsi: "Tuliskan langkah pengerjaan di buku latihan lalu unggah tautan foto/PDF.",
      batasWaktu: deadlineMat,
    },
  ];

  console.log("Mengisi koleksi 'tugas'...");
  for (const t of tugas) {
    const { id, ...data } = t;
    await setDoc(doc(db, "tugas", id), data);
    console.log(` - tugas/${id} (${data.judul})`);
  }

  // 7. pengumpulan (PRD 7.1: tugasId, siswaId, kelasId, tautan, dikumpulkanPada, nilai, komentar)
  const pengumpulan = [
    {
      id: "kumpul_raka_utbk_01",
      tugasId: "tugas_utbk_01",
      siswaId: "user_siswa_raka",
      kelasId: "kelas_utbk_a",
      tautan: "https://docs.google.com/document/d/jawaban-raka-utbk",
      dikumpulkanPada: submittedUtbk,
      nilai: 85,
      komentar: "Bagus, teliti di bagian analisis diagram logika.",
    },
    {
      id: "kumpul_salsa_mat_01",
      tugasId: "tugas_mat_01",
      siswaId: "user_siswa_salsa",
      kelasId: "kelas_mat_smp_b",
      tautan: "https://docs.google.com/document/d/jawaban-salsa-aljabar",
      dikumpulkanPada: submittedMat,
      nilai: 90,
      komentar: "Langkah pengerjaan sangat rapi dan tepat.",
    },
  ];

  console.log("Mengisi koleksi 'pengumpulan'...");
  for (const k of pengumpulan) {
    const { id, ...data } = k;
    await setDoc(doc(db, "pengumpulan", id), data);
    console.log(` - pengumpulan/${id} (Nilai: ${data.nilai})`);
  }

  console.log("\n[SUKSES] Berhasil mengisi seluruh seed data untuk 7 koleksi PRD 7.1!");
  process.exit(0);
}

seedFirestore().catch((err) => {
  console.error("[GAGAL] Gagal mengisi seed data:", err);
  process.exit(1);
});
