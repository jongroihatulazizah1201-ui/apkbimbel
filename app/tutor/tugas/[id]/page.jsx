import { mockKelas } from "@/lib/mockData";
import TutorTugasDetailClient from "./TutorTugasDetailClient";

export function generateStaticParams() {
  return mockKelas.flatMap((k) => k.tugasList.map((t) => ({ id: t.id })));
}

export default async function TugasDanNilaiTutorDetailPage({ params }) {
  const { id } = await params;
  return <TutorTugasDetailClient id={id} />;
}
