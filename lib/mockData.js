export const mockPrograms = [
  {
    id: "prog-1",
    nama: "Intensif UTBK",
    jenjang: "SMA",
    jumlahPertemuan: 32,
    harga: 1500000,
    aktif: true,
    deskripsi: "Persiapan lengkap SNBT & Ujian Mandiri PTN dengan simulasi berkala dan drilling soal.",
    gambar: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    mentor: "Kak Dimas",
    rating: "4.9",
    tag: "Terfavorit"
  },
  {
    id: "prog-2",
    nama: "Matematika SMP",
    jenjang: "SMP",
    jumlahPertemuan: 24,
    harga: 850000,
    aktif: true,
    deskripsi: "Penguatan konsep dasar matematika, aljabar, geometri, dan persiapan ujian sekolah.",
    gambar: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    mentor: "Kak Nadia",
    rating: "4.8",
    tag: "Populer"
  },
  {
    id: "prog-3",
    nama: "Bahasa Inggris SMA",
    jenjang: "SMA",
    jumlahPertemuan: 20,
    harga: 950000,
    aktif: true,
    deskripsi: "Grammar mastery, reading comprehension, dan vocabulary builder intensif.",
    gambar: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
    mentor: "Kak Fira",
    rating: "4.9",
    tag: "Intensif"
  },
  {
    id: "prog-4",
    nama: "IPA Terpadu SMP",
    jenjang: "SMP",
    jumlahPertemuan: 18,
    harga: 750000,
    aktif: false,
    deskripsi: "Eksplorasi konsep fisika & biologi SMP (Kelas non-aktif).",
    gambar: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
    mentor: "Kak Dimas",
    rating: "4.7",
    tag: "Segera Hadir"
  }
];

export const mockUsers = [
  {
    id: "user-1",
    nama: "Raka Pratama",
    email: "raka@gmail.com",
    noHp: "081345678901",
    noHpOrangTua: "081398765432",
    role: "siswa",
    aktif: true,
    dibuatPada: "10 Oktober 2026",
    programAktif: "Intensif UTBK",
    avatar: "/avatars/raka.jpg"
  },
  {
    id: "user-2",
    nama: "Salsa Nabilla",
    email: "salsa@gmail.com",
    noHp: "081234567890",
    noHpOrangTua: "081298765432",
    role: "siswa",
    aktif: true,
    dibuatPada: "12 Oktober 2026",
    programAktif: "Matematika SMP",
    avatar: "/avatars/salsa.jpg"
  },
  {
    id: "user-3",
    nama: "Kak Fira",
    email: "fira@langkahjuara.id",
    noHp: "081123456789",
    role: "staf",
    aktif: true,
    dibuatPada: "1 September 2026",
    avatar: "/avatars/kak_fira.jpg"
  },
  {
    id: "user-4",
    nama: "Kak Dimas",
    email: "dimas@langkahjuara.id",
    noHp: "081134567890",
    role: "tutor",
    aktif: true,
    dibuatPada: "1 September 2026",
    avatar: "/avatars/kak_dimas.jpg"
  },
  {
    id: "user-5",
    nama: "Kak Nadia",
    email: "nadia@langkahjuara.id",
    noHp: "081145678901",
    role: "tutor",
    aktif: true,
    dibuatPada: "5 September 2026",
    avatar: "/avatars/nadia.jpg"
  },
  {
    id: "user-6",
    nama: "Pak Arif",
    email: "arif.bimbel@langkahjuara.id",
    noHp: "081122334455",
    role: "super_admin",
    aktif: true,
    dibuatPada: "1 Januari 2026",
    avatar: "/avatars/default_user.svg"
  }
];

export const mockPendaftaran = [
  {
    id: "pend-1",
    siswaId: "user-1",
    siswaNama: "Raka Pratama",
    programId: "prog-1",
    programNama: "Intensif UTBK",
    status: "menunggu",
    catatanStaf: "",
    dibuatPada: "15 Oktober 2026"
  },
  {
    id: "pend-2",
    siswaId: "user-2",
    siswaNama: "Salsa Nabilla",
    programId: "prog-2",
    programNama: "Matematika SMP",
    status: "aktif",
    catatanStaf: "Pembayaran terverifikasi lunas di kantor",
    dibuatPada: "12 Oktober 2026"
  },
  {
    id: "pend-3",
    siswaId: "user-7",
    siswaNama: "Budi Santoso",
    programId: "prog-3",
    programNama: "Bahasa Inggris SMA",
    status: "ditolak",
    catatanStaf: "Bukti transfer tidak terbaca, silakan datang langsung ke kantor",
    dibuatPada: "08 Oktober 2026"
  },
  {
    id: "pend-4",
    siswaId: "user-8",
    siswaNama: "Anisa Rahma",
    programId: "prog-1",
    programNama: "Intensif UTBK",
    status: "menunggu",
    catatanStaf: "",
    dibuatPada: "15 Oktober 2026"
  }
];

export const mockKelas = [
  {
    id: "kelas-1",
    nama: "Intensif UTBK A",
    programId: "prog-1",
    programNama: "Intensif UTBK",
    tutorId: "user-4",
    tutorNama: "Kak Dimas",
    tutorAvatar: "/avatars/kak_dimas.jpg",
    gambar: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    hari: "Selasa",
    jam: "16.00 WITA",
    tempat: "Ruang 2",
    siswaList: [
      { id: "user-1", nama: "Raka Pratama", email: "raka@gmail.com", avatar: "/avatars/raka.jpg" },
      { id: "user-8", nama: "Anisa Rahma", email: "anisa@gmail.com", avatar: "/avatars/salsa.jpg" },
      { id: "user-9", nama: "Farhan Maulana", email: "farhan@gmail.com", avatar: "/avatars/default_user.svg" }
    ],
    pertemuan: [
      {
        id: "pert-1",
        tanggal: "2026-10-06",
        topik: "Persiapan dan Trik Penalaran Umum SNBT",
        materiUrl: "https://drive.google.com/file/d/materi-utbk-1/view",
        hadirSiswa: ["user-1", "user-8", "user-9"]
      },
      {
        id: "pert-2",
        tanggal: "2026-10-13",
        topik: "Analisis Logika dan Pola Gambar",
        materiUrl: "https://drive.google.com/file/d/materi-utbk-2/view",
        hadirSiswa: ["user-1", "user-9"]
      }
    ],
    tugasList: [
      {
        id: "tugas-1",
        judul: "Latihan Penalaran Umum 3",
        deskripsi: "Selesaikan 20 soal penalaran analitik di Google Drive dan tempelkan link lembar jawaban Anda.",
        batasWaktu: "20 Oktober 2026, 23.59 WITA",
        status: "dikumpulkan",
        submissions: [
          {
            siswaId: "user-1",
            siswaNama: "Raka Pratama",
            tautan: "https://drive.google.com/file/d/jawaban-raka-utbk/view",
            dikumpulkanPada: "16 Oktober 2026, 14.30 WITA",
            nilai: 85,
            komentar: "Pengerjaan rapi dan logika analisis nomor 15 sangat tepat!"
          },
          {
            siswaId: "user-8",
            siswaNama: "Anisa Rahma",
            tautan: "https://drive.google.com/file/d/jawaban-anisa/view",
            dikumpulkanPada: "16 Oktober 2026, 16.00 WITA",
            nilai: null,
            komentar: ""
          }
        ]
      }
    ]
  },
  {
    id: "kelas-2",
    nama: "Matematika SMP B",
    programId: "prog-2",
    programNama: "Matematika SMP",
    tutorId: "user-5",
    tutorNama: "Kak Nadia",
    tutorAvatar: "/avatars/nadia.jpg",
    gambar: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    hari: "Kamis",
    jam: "15.30 WITA",
    tempat: "Ruang 1",
    siswaList: [
      { id: "user-2", nama: "Salsa Nabilla", email: "salsa@gmail.com", avatar: "/avatars/salsa.jpg" },
      { id: "user-10", nama: "Reza Mahendra", email: "reza@gmail.com", avatar: "/avatars/default_user.svg" }
    ],
    pertemuan: [
      {
        id: "pert-3",
        tanggal: "2026-10-08",
        topik: "Persamaan Linear Satu Variabel",
        materiUrl: "https://drive.google.com/file/d/materi-plsv-smp/view",
        hadirSiswa: ["user-2", "user-10"]
      }
    ],
    tugasList: [
      {
        id: "tugas-2",
        judul: "Latihan Aljabar & SPLDV",
        deskripsi: "Kerjakan 10 soal cerita pemecahan sistem persamaan linear dua variabel dan lampirkan link dokumen jawaban Anda.",
        batasWaktu: "24 Oktober 2026, 23.59 WITA",
        status: "dikumpulkan",
        submissions: [
          {
            siswaId: "user-2",
            siswaNama: "Salsa Nabilla",
            tautan: "https://drive.google.com/file/d/jawaban-salsa-aljabar/view",
            dikumpulkanPada: "15 Oktober 2026, 17.00 WITA",
            nilai: 92,
            komentar: "Sangat teliti dan metode eliminasi disajikan dengan rapi!"
          }
        ]
      }
    ]
  }
];
