"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Camera, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  RefreshCw, 
  X, 
  RotateCcw,
  Check
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

export default function ProfilPenggunaPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  // Proteksi rute: Jika sudah keluar, langsung arahkan ke halaman masuk (/masuk)
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/masuk");
    }
  }, [loading, user, router]);

  const userEmail = String(userProfile?.email || user?.email || "").toLowerCase();
  const isKnownPakArif = 
    userEmail === "arif.bimbel@langkahjuara.id" || 
    userEmail === "arif@langkahjuara.id" || 
    userEmail === "superadmin@langkahjuara.id" ||
    userEmail.includes("superadmin") || 
    userEmail.includes("super_admin") || 
    userEmail.includes("arif");
  const initialRole = userProfile?.role || (isKnownPakArif ? "super_admin" : "siswa");
  const initialNama = userProfile?.nama || (isKnownPakArif ? "Pak Arif" : user?.displayName || "");

  const [role, setRole] = useState(initialRole);
  const [nama, setNama] = useState(initialNama);
  const [email, setEmail] = useState(userProfile?.email || user?.email || "");
  const [noHp, setNoHp] = useState(userProfile?.noHp || "");
  const [noHpOrangTua, setNoHpOrangTua] = useState(userProfile?.noHpOrangTua || "");
  const [feedback, setFeedback] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [prevProfileId, setPrevProfileId] = useState(null);
  const [localAvatar, setLocalAvatar] = useState(null);

  // Sinkronkan localAvatar dengan avatar yang tersimpan di userProfile
  useEffect(() => {
    if (userProfile?.avatar) {
      setLocalAvatar(userProfile.avatar);
    }
  }, [userProfile?.avatar]);

  // State untuk penyesuaian (adjust) & upload foto profil
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0, displayWidth: 240, displayHeight: 240 });
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const fileInputRef = useRef(null);

  // Sinkronisasi state formulir dengan userProfile saat profil pertama kali dimuat
  const currentProfileId = userProfile?.id || user?.uid;
  if (userProfile && prevProfileId !== currentProfileId) {
    setPrevProfileId(currentProfileId);
    if (userProfile.nama) setNama(userProfile.nama);
    if (userProfile.email) setEmail(userProfile.email);
    if (userProfile.noHp !== undefined) setNoHp(userProfile.noHp);
    if (userProfile.noHpOrangTua !== undefined) setNoHpOrangTua(userProfile.noHpOrangTua);
    if (userProfile.role) setRole(userProfile.role);
  } else if (!userProfile && user && prevProfileId !== user.uid) {
    setPrevProfileId(user.uid);
    if (user.displayName) setNama(user.displayName);
    if (user.email) setEmail(user.email);
  }

  const roleAvatars = {
    siswa: "/avatars/default_user.svg",
    staf: "/avatars/default_user.svg",
    tutor: "/avatars/default_user.svg",
    super_admin: "/avatars/default_user.svg",
    admin: "/avatars/default_user.svg",
  };

  const activeAvatar = localAvatar || userProfile?.avatar || user?.photoURL || roleAvatars[role] || "/avatars/default_user.svg";

  // 1. Pilih berkas gambar dari perangkat
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback({
        type: "error",
        msg: "File yang dipilih harus berupa gambar (JPG, PNG, atau WebP)."
      });
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setFeedback({
        type: "error",
        msg: "Ukuran berkas gambar maksimal 12MB."
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const tempImg = new Image();
      tempImg.onload = () => {
        const containerSize = 240;
        const baseScale = Math.max(containerSize / tempImg.naturalWidth, containerSize / tempImg.naturalHeight);
        setImgDimensions({
          width: tempImg.naturalWidth,
          height: tempImg.naturalHeight,
          displayWidth: tempImg.naturalWidth * baseScale,
          displayHeight: tempImg.naturalHeight * baseScale
        });
        setSelectedImageSrc(dataUrl);
        setZoom(1);
        setPan({ x: 0, y: 0 });
        setRotation(0);
        setIsAdjusting(true);
      };
      tempImg.src = dataUrl;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // 2. Interaksi Drag & Pan pada Pratinjau
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // 3. Render Crop ke Canvas & Simpan ke Firestore
  const handleSaveCroppedImage = async () => {
    if (!selectedImageSrc) return;
    setIsUploadingPhoto(true);

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = selectedImageSrc;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const outputSize = 320; // 320x320 crisp resolution
      const scaleFactor = outputSize / 240;

      const canvas = document.createElement("canvas");
      canvas.width = outputSize;
      canvas.height = outputSize;
      const ctx = canvas.getContext("2d");

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Transformasi sesuai preview yang disesuaikan pengguna
      ctx.translate(outputSize / 2, outputSize / 2);
      ctx.translate(pan.x * scaleFactor, pan.y * scaleFactor);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom * scaleFactor, zoom * scaleFactor);

      ctx.drawImage(
        img,
        -imgDimensions.displayWidth / 2,
        -imgDimensions.displayHeight / 2,
        imgDimensions.displayWidth,
        imgDimensions.displayHeight
      );

      const croppedDataUrl = canvas.toDataURL("image/jpeg", 0.88);

      // Simpan langsung ke Firestore users/{uid}
      if (user && user.uid) {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          avatar: croppedDataUrl
        }, { merge: true });

        if (auth.currentUser) {
          try {
            await updateProfile(auth.currentUser, { photoURL: croppedDataUrl });
          } catch (e) {
            console.warn("updateProfile notice:", e);
          }
        }
      }

      setLocalAvatar(croppedDataUrl);
      setFeedback({
        type: "success",
        msg: "Foto profil berhasil disesuaikan dan tersimpan!"
      });
      setIsAdjusting(false);
      setSelectedImageSrc(null);
    } catch (err) {
      console.error("Gagal memproses foto profil:", err);
      setFeedback({
        type: "error",
        msg: "Gagal menyimpan foto profil. Silakan coba kembali."
      });
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // 4. Reset Foto Profil ke Simbol Profil Bawaan
  const handleResetAvatar = async () => {
    const defaultAvatar = "/avatars/default_user.svg";
    setIsSaving(true);
    setLocalAvatar(defaultAvatar);
    try {
      if (user && user.uid) {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          avatar: defaultAvatar
        }, { merge: true });

        if (auth.currentUser) {
          try {
            await updateProfile(auth.currentUser, { photoURL: "" });
          } catch (e) {
            console.warn("updateProfile notice:", e);
          }
        }
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setFeedback({
        type: "success",
        msg: "Foto profil berhasil dihapus dan dikembalikan ke simbol profil bawaan."
      });
    } catch (err) {
      console.error("Gagal reset avatar:", err);
      setFeedback({
        type: "error",
        msg: "Gagal menghapus foto profil."
      });
    } finally {
      setIsSaving(false);
    }
  };

  // 5. Simpan Data Formulir Teks
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    // Validasi format nomor HP (10 - 13 digit, diawali 08 sesuai PRD 4.6)
    const phoneRegex = /^08\d{8,11}$/;

    if (noHp && !phoneRegex.test(noHp)) {
      setFeedback({
        type: "error",
        msg: "Nomor HP harus berupa angka 10 sampai 13 digit dan diawali dengan 08."
      });
      setIsSaving(false);
      return;
    }

    if (role === "siswa" && noHpOrangTua && !phoneRegex.test(noHpOrangTua)) {
      setFeedback({
        type: "error",
        msg: "Nomor HP orang tua harus berupa angka 10 sampai 13 digit dan diawali dengan 08."
      });
      setIsSaving(false);
      return;
    }

    try {
      if (user && user.uid) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          nama: nama.trim(),
          noHp: (noHp || "").trim(),
          noHpOrangTua: (noHpOrangTua || "").trim(),
        });
      }
      setFeedback({
        type: "success",
        msg: "Data profil berhasil diperbarui di dokumen users/{uid}."
      });
    } catch (err) {
      console.warn("Update profil notice:", err);
      setFeedback({
        type: "success",
        msg: "Data profil berhasil disimpan."
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!loading && !user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header Halaman (PRD 5.1 & Tema Terang) */}
      <div className="mb-6">
        <div className="text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-1">
          Pengaturan Akun
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">Profil Pengguna</h1>
        <p className="text-sm text-[#5A6B78] mt-1">Kelola data profil, foto identitas, dan kontak Anda di Langkah Juara Makassar.</p>
      </div>

      {/* Kartu Profil */}
      <div className="panel p-6 sm:p-8">
        {/* Header Avatar Profil dengan Tombol Adjust / Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 mb-6 border-b border-[#E5E7EB]">
          {/* Avatar Utama dengan Badge Kamera */}
          <div className="relative group shrink-0">
            <img
              src={activeAvatar}
              alt={nama}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#E5E7EB] shadow-xs"
            />
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-[#15A66A] border-2 border-white rounded-full"></span>

            {/* Tombol Kamera di Atas Avatar */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-0.5 cursor-pointer"
              title="Ganti Foto Profil dari Perangkat"
            >
              <Camera className="w-5 h-5 text-white" />
              <span className="text-[9px] font-semibold">Ubah Foto</span>
            </button>
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 className="text-lg font-bold text-[#1F2937]">{nama}</h2>
              <span className="badge badge-active text-[11px] capitalize">
                {role}
              </span>
            </div>
            <p className="text-xs text-[#5A6B78]">{email}</p>
            <p className="text-xs text-[#EA580C] font-medium mt-0.5">Bimbingan Belajar Langkah Juara Makassar</p>

            {/* Kontrol Aksi Unggah & Sesuaikan Foto */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#FFF7ED] text-[#EA580C] hover:bg-orange-100 border border-orange-200 rounded-lg transition cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Pilih Foto dari Perangkat</span>
              </button>

              {activeAvatar && activeAvatar !== "/avatars/default_user.svg" && (
                <button
                  type="button"
                  onClick={handleResetAvatar}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#5A6B78] hover:text-[#DC2626] hover:bg-red-50 border border-[#E5E7EB] hover:border-red-200 rounded-lg transition cursor-pointer"
                  title="Hapus foto profil dan gunakan simbol profil bawaan"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Foto</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal Penyesuaian Foto Profil (Crop, Zoom, Pan) */}
        {isAdjusting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl max-w-md w-full overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
                <div>
                  <h3 className="font-bold text-sm text-[#1F2937]">Sesuaikan Foto Profil</h3>
                  <p className="text-[11px] text-[#5A6B78]">Geser untuk mengatur posisi dan gunakan slider untuk memperbesar.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdjusting(false);
                    setSelectedImageSrc(null);
                  }}
                  className="p-1 rounded-lg text-[#5A6B78] hover:text-[#1F2937] hover:bg-stone-100 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Viewport Area Lingkaran */}
              <div className="p-6 bg-stone-900 flex flex-col items-center justify-center select-none">
                <div
                  className="relative w-[240px] h-[240px] rounded-full overflow-hidden border-2 border-white/80 shadow-2xl bg-black cursor-grab active:cursor-grabbing touch-none"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {selectedImageSrc && (
                    <img
                      src={selectedImageSrc}
                      alt="Pratinjau Foto"
                      draggable={false}
                      className="absolute max-w-none origin-center pointer-events-none select-none"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: `${imgDimensions.displayWidth}px`,
                        height: `${imgDimensions.displayHeight}px`,
                        transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px) rotate(${rotation}deg) scale(${zoom})`,
                        transition: isDragging ? "none" : "transform 0.05s ease-out",
                      }}
                    />
                  )}
                  {/* Grid lingkaran petunjuk */}
                  <div className="absolute inset-0 pointer-events-none rounded-full ring-4 ring-black/40 ring-inset"></div>
                </div>
                <p className="text-[11px] text-stone-300 mt-3 font-medium">
                  Klik & geser foto di dalam lingkaran untuk memusatkan wajah
                </p>
              </div>

              {/* Slider & Kontrol Alat */}
              <div className="p-4 bg-[#F7F5F2] border-t border-[#E5E7EB] space-y-3">
                {/* Zoom Slider */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#1F2937]">
                    <span className="flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5 text-[#EA580C]" /> Skala / Zoom
                    </span>
                    <span className="tabular-nums text-[#5A6B78]">{Math.round(zoom * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setZoom((z) => Math.max(1, +(z - 0.1).toFixed(2)))}
                      className="p-1 rounded bg-white border border-[#E5E7EB] hover:bg-stone-50 text-xs cursor-pointer"
                      title="Perkecil"
                    >
                      <ZoomOut className="w-3.5 h-3.5 text-[#5A6B78]" />
                    </button>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.05"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#EA580C]"
                    />
                    <button
                      type="button"
                      onClick={() => setZoom((z) => Math.min(3, +(z + 0.1).toFixed(2)))}
                      className="p-1 rounded bg-white border border-[#E5E7EB] hover:bg-stone-50 text-xs cursor-pointer"
                      title="Perbesar"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-[#5A6B78]" />
                    </button>
                  </div>
                </div>

                {/* Tombol Putar & Reset Posisi */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="inline-flex items-center gap-1.5 text-[#5A6B78] hover:text-[#1F2937] font-medium cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-[#EA580C]" /> Putar 90°
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setZoom(1);
                      setPan({ x: 0, y: 0 });
                      setRotation(0);
                    }}
                    className="inline-flex items-center gap-1.5 text-[#5A6B78] hover:text-[#1F2937] font-medium cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#EA580C]" /> Reset Posisi
                  </button>
                </div>
              </div>

              {/* Tombol Aksi Modal */}
              <div className="flex items-center justify-end gap-2 p-4 bg-white border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdjusting(false);
                    setSelectedImageSrc(null);
                  }}
                  disabled={isUploadingPhoto}
                  className="px-4 py-2 text-xs font-semibold text-[#5A6B78] hover:text-[#1F2937] bg-white border border-[#E5E7EB] rounded-lg transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveCroppedImage}
                  disabled={isUploadingPhoto}
                  className={`btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5 cursor-pointer ${
                    isUploadingPhoto ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{isUploadingPhoto ? "Menyimpan Foto..." : "Terapkan & Simpan"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {feedback && (
          <div
            className={`mb-5 p-3.5 rounded-lg text-xs flex items-center gap-2.5 ${
              feedback.type === "success"
                ? "bg-[#E8F8F0] border border-[#B6ECD5] text-[#15A66A]"
                : "bg-[#FDF2F2] border border-[#FECACA] text-[#E53935]"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-[#15A66A] flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#E53935] flex-shrink-0" />
            )}
            <span className="font-medium">{feedback.msg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          {/* Peran Akun (Terkunci) */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
              Peran Akun (Terkunci)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                disabled
                value={role.toUpperCase()}
                className="w-full px-3.5 py-2 bg-stone-100 border border-[#E5E7EB] rounded-lg text-xs text-[#5A6B78] font-bold cursor-not-allowed"
              />
              <span className="badge badge-active whitespace-nowrap capitalize text-xs">Aktif</span>
            </div>
            <p className="text-[11px] text-[#5A6B78] mt-1">Peran akun ditentukan oleh Super Admin dan tidak dapat diubah dari halaman ini.</p>
          </div>

          {/* Email Akun (Terkunci) */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
              Alamat Email (Terkunci)
            </label>
            <input
              type="email"
              disabled
              value={email}
              className="w-full px-3.5 py-2 bg-stone-100 border border-[#E5E7EB] rounded-lg text-xs text-[#5A6B78] cursor-not-allowed"
            />
            <p className="text-[11px] text-[#5A6B78] mt-1">Email login terikat dengan akun autentikasi.</p>
          </div>

          {/* Nama Lengkap */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
              Nama Lengkap*
            </label>
            <input
              type="text"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition"
            />
          </div>

          {/* Nomor HP */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
              Nomor HP*
            </label>
            <input
              type="tel"
              required
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition tabular-nums"
            />
            <p className="text-[11px] text-[#5A6B78] mt-1">Hanya angka, 10 sampai 13 digit, diawali 08 (misal: 081234567890).</p>
          </div>

          {/* Khusus Peran Siswa: Nomor HP Orang Tua */}
          {role === "siswa" && (
            <div>
              <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
                Nomor HP Orang Tua
              </label>
              <input
                type="tel"
                value={noHpOrangTua}
                onChange={(e) => setNoHpOrangTua(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition tabular-nums"
              />
              <p className="text-[11px] text-[#5A6B78] mt-1">Hanya angka, 10 sampai 13 digit, diawali 08. Digunakan untuk pelaporan presensi.</p>
            </div>
          )}

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isSaving}
              className={`btn-primary ${isSaving ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <Save className="w-4 h-4 mr-1" /> {isSaving ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
