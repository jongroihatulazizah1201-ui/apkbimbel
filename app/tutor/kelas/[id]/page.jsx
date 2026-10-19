import { mockKelas } from "@/lib/mockData";
import TutorKelasDetailClient from "./TutorKelasDetailClient";

export function generateStaticParams() {
  return mockKelas.map((k) => ({ id: k.id }));
}

export default async function KelasYangDiajarTutorDetailPage({ params }) {
  const { id } = await params;
  return <TutorKelasDetailClient id={id} />;
}
