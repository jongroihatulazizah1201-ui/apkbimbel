import SiswaRouteGuard from "@/components/SiswaRouteGuard";

export const metadata = {
  title: "Beranda Siswa | Langkah Juara",
  description: "Jadwal bimbingan, kelas berikutnya, dan tugas aktif siswa Bimbel Langkah Juara",
};

export default function BerandaLayout({ children }) {
  return <SiswaRouteGuard>{children}</SiswaRouteGuard>;
}
