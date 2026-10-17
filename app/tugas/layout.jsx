import SiswaRouteGuard from "@/components/SiswaRouteGuard";

export const metadata = {
  title: "Tugas Siswa | Langkah Juara",
  description: "Daftar tugas, pengumpulan tugas, dan umpan balik nilai dari tutor",
};

export default function TugasLayout({ children }) {
  return <SiswaRouteGuard>{children}</SiswaRouteGuard>;
}
