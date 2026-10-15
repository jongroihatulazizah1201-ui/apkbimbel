import Link from "next/link";
import { ClipboardCheck, Calendar, ArrowRight, Clock, MapPin, User, AlertCircle } from "lucide-react";
import { mockKelas, mockPendaftaran } from "@/lib/mockData";

export default function DasborStafPage() {
  const pendingCount = mockPendaftaran.filter((p) => p.status === "menunggu").length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Staf */}
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Modul Operasional Bimbel</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-app-text mt-1">Dasbor Staf Administrasi</h1>
        <p className="text-sm text-app-muted">Selamat bertugas, Kak Fira. Pantau pendaftaran masuk dan jadwal kelas hari ini.</p>
      </div>

      {/* Grid Kartu Metrik */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Kartu Pendaftaran Menunggu */}
        <div className="panel border-l-4 border-l-status-pending flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-status-pending uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Verifikasi Pembayaran
              </span>
              <span className="badge badge-pending">Perlu Ditindaklanjuti</span>
            </div>
            <h2 className="text-base font-semibold text-app-text">Pendaftaran Menunggu</h2>
            <div className="text-4xl font-extrabold text-status-pending tabular-nums my-4">
              {pendingCount} <span className="text-base font-normal text-app-muted">siswa</span>
            </div>
            <p className="text-xs text-app-muted mb-4">
              Pendaftaran program baru yang menunggu pencocokan bukti bayar offline di kantor.
            </p>
          </div>
          <Link
            href="/staf/pendaftaran?status=menunggu"
            className="btn-primary w-full justify-between bg-amber-600 hover:bg-amber-700"
          >
            <span>Buka Pendaftaran Menunggu ({pendingCount})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Kartu Kelas Hari Ini */}
        <div className="panel border-l-4 border-l-primary flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Jadwal Tatap Muka
              </span>
              <span className="badge badge-active">Hari Ini</span>
            </div>
            <h2 className="text-base font-semibold text-app-text">Kelas Hari Ini</h2>
            <div className="text-4xl font-extrabold text-primary tabular-nums my-4">
              {mockKelas.length} <span className="text-base font-normal text-app-muted">sesi kelas</span>
            </div>
            <p className="text-xs text-app-muted mb-4">
              Daftar sesi belajar yang dijadwalkan berlangsung di ruang bimbingan hari ini.
            </p>
          </div>
          <Link href="/staf/kelas" className="btn-secondary w-full justify-between">
            <span>Kelola Seluruh Kelas & Siswa</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Rincian Jadwal Kelas Hari Ini */}
      <div className="panel">
        <h2 className="text-lg font-bold text-app-text mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" /> Rincian Kelas Hari Ini
        </h2>

        <div className="divide-y divide-gray-100">
          {mockKelas.map((kelas) => (
            <div key={kelas.id} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-bold text-base text-app-text">{kelas.nama}</h3>
                  <span className="badge badge-active text-[11px]">{kelas.programNama}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-app-muted mt-1.5">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-primary" /> Tutor: {kelas.tutorNama}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" /> {kelas.hari}, {kelas.jam}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" /> {kelas.tempat}</span>
                </div>
              </div>

              <Link href={`/staf/kelas/${kelas.id}`} className="btn-secondary text-xs self-start md:self-auto py-1.5">
                Rincian Kelas & Siswa
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
