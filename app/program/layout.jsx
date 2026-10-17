import SiswaRouteGuard from "@/components/SiswaRouteGuard";

export const metadata = {
  title: "Katalog & Pendaftaran Program | Langkah Juara",
  description: "Daftar program bimbingan belajar dan status pendaftaran siswa",
};

export default function ProgramLayout({ children }) {
  return <SiswaRouteGuard>{children}</SiswaRouteGuard>;
}
