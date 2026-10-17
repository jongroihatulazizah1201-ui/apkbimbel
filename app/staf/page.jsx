"use client";

import Link from "next/link";
import { ClipboardCheck, Calendar, ArrowRight, Clock, MapPin, User } from "lucide-react";
import { mockKelas, mockPendaftaran } from "@/lib/mockData";
import { useAuth } from "@/components/AuthProvider";

export default function DasborStafPage() {
  const { user, userProfile } = useAuth();
  const userEmail = String(userProfile?.email || user?.email || "").toLowerCase();
  const displayName = 
    userProfile?.nama || 
    (userEmail.includes("fira") ? "Kak Fira" : 
     user?.displayName || 
     user?.email?.split("@")[0] || 
     "Staf Administrasi");
  const avatarUrl = userProfile?.avatar || user?.photoURL || "/avatars/default_user.svg";
  const pendingCount = mockPendaftaran.filter((p) => p.status === "menunggu").length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Panel Staf Administrasi */}
      <div className="panel bg-white border border-[#E5E7EB] mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#E5E7EB] shrink-0">
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#15A66A] border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] tracking-tight">
                Selamat Datang, {displayName}!
              </h1>
              <p className="text-xs sm:text-sm text-[#5A6B78] mt-1 max-w-xl">
                Dasbor Staf Administrasi · Pantau verifikasi pendaftaran masuk, koordinasi jadwal kelas, dan data siswa.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
            <Link href="/staf/pendaftaran" className="btn-primary text-xs py-2 px-3.5">
              <ClipboardCheck className="w-4 h-4" /> Verifikasi Pendaftaran
            </Link>
            <Link href="/staf/siswa" className="btn-secondary text-xs py-2 px-3.5">
              Data Siswa
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Kartu Metrik Operasional (PRD 4.7) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Kartu Pendaftaran Menunggu */}
        <div className="panel flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
                Verifikasi Pembayaran
              </span>
              <span className="badge badge-pending">Perlu Ditindaklanjuti</span>
            </div>
            <h2 className="text-base font-bold text-[#1F2937]">Pendaftaran Menunggu</h2>
            <div className="text-4xl font-extrabold text-[#F59E0B] tabular-nums my-3">
              {pendingCount} <span className="text-sm font-normal text-[#5A6B78]">siswa</span>
            </div>
            <p className="text-xs text-[#5A6B78] leading-relaxed mb-6">
              Pendaftaran program baru yang menunggu pencocokan pembayaran di kantor Langkah Juara.
            </p>
          </div>
          <Link
            href="/staf/pendaftaran?status=menunggu"
            className="btn-primary w-full justify-between"
          >
            <span>Buka Pendaftaran Menunggu ({pendingCount})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Kartu Kelas Hari Ini */}
        <div className="panel flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                Jadwal Tatap Muka
              </span>
              <span className="badge badge-active">Hari Ini</span>
            </div>
            <h2 className="text-base font-bold text-[#1F2937]">Kelas Hari Ini</h2>
            <div className="text-4xl font-extrabold text-[#EA580C] tabular-nums my-3">
              {mockKelas.length} <span className="text-sm font-normal text-[#5A6B78]">sesi kelas</span>
            </div>
            <p className="text-xs text-[#5A6B78] leading-relaxed mb-6">
              Daftar sesi belajar yang dijadwalkan berlangsung di ruang bimbingan hari ini.
            </p>
          </div>
          <Link href="/staf/kelas" className="btn-secondary w-full justify-between">
            <span>Kelola Seluruh Kelas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Rincian Jadwal Kelas Hari Ini */}
      <div className="panel">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E7EB]">
          <h2 className="text-base font-bold text-[#1F2937] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#EA580C]" /> Rincian Kelas Hari Ini
          </h2>
          <span className="text-xs text-[#5A6B78] tabular-nums">
            {mockKelas.length} Sesi Terjadwal
          </span>
        </div>

        <div className="divide-y divide-[#E5E7EB]">
          {mockKelas.map((kelas) => (
            <div key={kelas.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-bold text-sm text-[#1F2937]">{kelas.nama}</h3>
                  <span className="badge badge-active text-[11px]">{kelas.programNama}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#5A6B78] mt-1.5">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#EA580C]" /> Tutor: <strong className="text-[#1F2937] font-semibold">{kelas.tutorNama}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#EA580C]" /> <span className="tabular-nums">{kelas.hari}, {kelas.jam}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#EA580C]" /> {kelas.tempat}
                  </span>
                </div>
              </div>

              <Link href={`/staf/kelas/${kelas.id}`} className="btn-secondary text-xs self-start md:self-auto py-1.5 px-3 shrink-0">
                Rincian Kelas & Siswa
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
