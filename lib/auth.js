import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase.js";

/**
 * Memeriksa dan memastikan dokumen users/{uid} di Cloud Firestore sesuai PRD 7.1.
 * 
 * Aturan (sesuai instruksi):
 * 1. Setelah pengguna berhasil masuk dengan cara apa pun, cek dokumen users/{uid}.
 * 2. Bila belum ada, buat dokumen dengan field sesuai PRD 7.1 yaitu:
 *    - nama (string)
 *    - email (string)
 *    - noHp (string, boleh kosong)
 *    - noHpOrangTua (string, boleh kosong)
 *    - role bernilai "siswa"
 *    - aktif bernilai true
 *    - dibuatPada menggunakan timestamp server
 * 3. Bila sudah ada, JANGAN DIUBAH SAMA SEKALI agar data tidak tertimpa.
 * 4. JANGAN PERNAH MENYIMPAN kata sandi di dokumen ini.
 * 
 * @param {object} user - Objek pengguna Firebase Auth ({ uid, email, displayName, phoneNumber, ... })
 * @param {object} [additionalData] - Data input formulir opsional (nama, noHp, noHpOrangTua)
 * @returns {Promise<{exists: boolean, data: object}>}
 */
export async function ensureUserProfile(user, additionalData = {}) {
  if (!user || !user.uid) {
    return null;
  }

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  // Bila dokumen sudah ada, JANGAN DIUBAH SAMA SEKALI agar data tidak tertimpa!
  if (snap.exists()) {
    return {
      exists: true,
      data: { id: snap.id, ...snap.data() },
    };
  }

  // Bila belum ada, buat dokumen dengan field sesuai PRD 7.1:
  // nama, email, noHp (string, boleh kosong), noHpOrangTua (string, boleh kosong),
  // role bernilai "siswa", aktif bernilai true, dan dibuatPada menggunakan timestamp server.
  // Jangan pernah menyimpan kata sandi di dokumen ini.
  const rawNama = additionalData.nama || user.displayName || user.email?.split("@")[0] || "Siswa";
  const newProfile = {
    nama: String(rawNama).trim(),
    email: String(user.email || additionalData.email || "").trim().toLowerCase(),
    noHp: String(additionalData.noHp || user.phoneNumber || "").trim(),
    noHpOrangTua: String(additionalData.noHpOrangTua || "").trim(),
    role: "siswa",
    aktif: true,
    dibuatPada: serverTimestamp(),
  };

  // Garansi keamanan: pastikan kata sandi tidak pernah disimpan
  delete newProfile.password;
  delete newProfile.kataSandi;

  await setDoc(userRef, newProfile);

  return {
    exists: false,
    data: { id: user.uid, ...newProfile },
  };
}

/**
 * Mengambil data dokumen profil users/{uid} langsung dari Firestore.
 * 
 * @param {string} uid 
 * @returns {Promise<object|null>}
 */
export async function getUserProfile(uid) {
  if (!uid) return null;
  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
  } catch (err) {
    console.warn("getUserProfile error:", err);
  }
  return null;
}

/**
 * Menentukan rute pengalihan berdasarkan peran (role) pengguna sesuai PRD:
 * - "siswa"       -> /beranda
 * - "staf"        -> /staf
 * - "tutor"       -> /tutor
 * - "super_admin" -> /admin
 * 
 * @param {string} role 
 * @returns {string} Rute halaman tujuan
 */
export function getRoleRedirectPath(role) {
  const normalized = String(role || "").trim().toLowerCase();
  switch (normalized) {
    case "super_admin":
    case "admin":
      return "/admin";
    case "staf":
      return "/staf";
    case "tutor":
      return "/tutor";
    case "siswa":
    default:
      return "/beranda";
  }
}
