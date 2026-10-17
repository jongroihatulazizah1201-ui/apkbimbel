import SiswaRouteGuard from "@/components/SiswaRouteGuard";

export const metadata = {
  title: "Daftar & Detail Kelas Siswa | Langkah Juara",
  description: "Informasi kelas bimbingan, jadwal pertemuan, dan materi belajar siswa",
};

export default function KelasLayout({ children }) {
  return <SiswaRouteGuard>{children}</SiswaRouteGuard>;
}
