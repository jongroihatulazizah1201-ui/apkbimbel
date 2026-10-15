"use client";

import { useState } from "react";
import { User, Mail, Phone, Shield, Save, CheckCircle2, AlertCircle } from "lucide-react";

export default function ProfilPenggunaPage() {
  const [role, setRole] = useState("siswa"); // simulasi preview peran
  const [nama, setNama] = useState("Raka Pratama");
  const [email] = useState("raka@gmail.com");
  const [noHp, setNoHp] = useState("081345678901");
  const [noHpOrangTua, setNoHpOrangTua] = useState("081398765432");
  const [feedback, setFeedback] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    // Validasi format nomor HP (10 - 13 digit, diawali 08)
    const phoneRegex = /^08\d{8,11}$/;

    if (!phoneRegex.test(noHp)) {
      setFeedback({
        type: "error",
        msg: "Nomor HP harus berupa angka 10 sampai 13 digit dan diawali dengan 08."
      });
      return;
    }

    if (role === "siswa" && noHpOrangTua && !phoneRegex.test(noHpOrangTua)) {
      setFeedback({
        type: "error",
        msg: "Nomor HP orang tua harus berupa angka 10 sampai 13 digit dan diawali dengan 08."
      });
      return;
    }

    setFeedback({
      type: "success",
      msg: "Data profil berhasil diperbarui!"
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Pengaturan Akun</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-app-text mt-1">Profil Pengguna</h1>
        <p className="text-sm text-app-muted">Kelola data identitas dan kontak Anda di Portal Belajar Langkah Juara</p>
      </div>

      {/* Role Switcher Demo for Profile */}
      <div className="bg-white p-3 rounded-lg border border-app-border text-xs flex items-center justify-between gap-3 mb-6">
        <span className="font-semibold text-app-muted">Simulasi Tampilan Peran:</span>
        <div className="flex gap-1.5">
          <button
            onClick={() => { setRole("siswa"); setNama("Raka Pratama"); }}
            className={`px-2.5 py-1 rounded font-medium ${role === 'siswa' ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            Siswa
          </button>
          <button
            onClick={() => { setRole("staf"); setNama("Kak Fira"); }}
            className={`px-2.5 py-1 rounded font-medium ${role === 'staf' ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            Staf
          </button>
          <button
            onClick={() => { setRole("tutor"); setNama("Kak Dimas"); }}
            className={`px-2.5 py-1 rounded font-medium ${role === 'tutor' ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            Tutor
          </button>
        </div>
      </div>

      <div className="panel shadow-sm">
        {feedback && (
          <div
            className={`mb-6 p-3.5 rounded-lg text-xs flex items-center gap-2 ${
              feedback.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{feedback.msg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          {/* Peran Akun (Terkunci) */}
          <div>
            <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-primary" /> Peran Akun (Terkunci)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                disabled
                value={role.toUpperCase()}
                className="w-full px-3.5 py-2.5 bg-gray-100 border border-app-border rounded-md text-sm text-gray-600 font-semibold cursor-not-allowed"
              />
              <span className="badge badge-active whitespace-nowrap capitalize">Aktif</span>
            </div>
            <p className="text-[11px] text-app-muted mt-1">Peran akun hanya dapat diubah oleh Super Admin.</p>
          </div>

          {/* Email Akun (Terkunci) */}
          <div>
            <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-primary" /> Alamat Email (Terkunci)
            </label>
            <input
              type="email"
              disabled
              value={email}
              className="w-full px-3.5 py-2.5 bg-gray-100 border border-app-border rounded-md text-sm text-gray-600 cursor-not-allowed"
            />
            <p className="text-[11px] text-app-muted mt-1">Email login terikat dengan akun Firebase Authentication.</p>
          </div>

          {/* Nama Lengkap */}
          <div>
            <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary" /> Nama Lengkap*
            </label>
            <input
              type="text"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-app-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Nomor HP */}
          <div>
            <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-primary" /> Nomor HP (WhatsApp)*
            </label>
            <input
              type="tel"
              required
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full px-3.5 py-2.5 bg-white border border-app-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary tabular-nums"
            />
            <p className="text-[11px] text-app-muted mt-1">Format: 10-13 digit angka diawali 08 (misal: 081234567890).</p>
          </div>

          {/* Khusus Peran Siswa: Nomor HP Orang Tua */}
          {role === "siswa" && (
            <div>
              <label className="block text-xs font-semibold text-app-text uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-primary" /> Nomor HP Orang Tua (Khusus Siswa)
              </label>
              <input
                type="tel"
                value={noHpOrangTua}
                onChange={(e) => setNoHpOrangTua(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full px-3.5 py-2.5 bg-white border border-app-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary tabular-nums"
              />
              <p className="text-[11px] text-app-muted mt-1">Digunakan oleh staf untuk komunikasi kehadiran dan perkembangan belajar.</p>
            </div>
          )}

          <div className="pt-2">
            <button type="submit" className="btn-primary">
              <Save className="w-4 h-4" /> Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
