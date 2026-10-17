"use client";

import Link from "next/link";
import Image from "next/image";
import { Layers, Calendar, Clock, MapPin, Users, ArrowRight, BookOpen, Plus } from "lucide-react";
import { mockKelas } from "@/lib/mockData";

export default function DaftarKelasYangDiajarTutorPage() {
  const classes = mockKelas;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-1">
            Modul Tutor
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] tracking-tight">
            Kelas yang Diajar
          </h1>
          <p className="text-sm text-[#5A6B78] mt-1">
            Daftar seluruh rombongan belajar tatap muka yang Anda ampu di Langkah Juara.
          </p>
        </div>

        <Link
          href={`/tutor/kelas/${classes[0]?.id || "kelas-1"}`}
          className="btn-primary text-xs font-semibold py-2.5 px-4 self-start md:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Buat Pertemuan Baru
        </Link>
      </div>

      {/* Grid Kelas Yang Diajar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((k) => (
          <div
            key={k.id}
            className="panel p-0 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between hover:border-[#EA580C] transition group"
          >
            <div>
              {/* Header Cover & Badge */}
              <div className="relative h-44 bg-stone-100 overflow-hidden">
                <img
                  src={k.gambar || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"}
                  alt={k.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="badge bg-white text-[#EA580C] font-bold border border-[#E5E7EB] shadow-sm">
                    {k.programNama}
                  </span>
                  <span className="badge bg-[#15A66A] text-white">
                    {k.hari}
                  </span>
                </div>
              </div>

              {/* Rincian Kelas */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#1F2937] group-hover:text-[#EA580C] transition">
                  {k.nama}
                </h2>

                <div className="bg-[#F7F5F2] border border-[#E5E7EB] p-3.5 rounded-xl my-4 space-y-2 text-xs text-[#1F2937]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#EA580C]" />
                    <span>Jadwal: <strong className="tabular-nums">{k.hari}, {k.jam}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#EA580C]" />
                    <span>Lokasi Belajar: <strong>{k.tempat}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#15A66A]" />
                    <span>Siswa Terdaftar: <strong className="tabular-nums">{k.siswaList.length} Siswa</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#5A6B78] pt-2 border-t border-[#E5E7EB]">
                  <span>Pertemuan: <strong className="text-[#1F2937]">{k.pertemuan.length} sesi</strong></span>
                  <span>Tugas: <strong className="text-[#1F2937]">{k.tugasList.length} tugas</strong></span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/tutor/kelas/${k.id}`}
                className="btn-primary w-full justify-between text-xs py-2.5 font-bold"
              >
                <span>Kelola Pertemuan & Presensi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
