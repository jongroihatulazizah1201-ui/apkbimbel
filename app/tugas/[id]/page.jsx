import { mockKelas } from "@/lib/mockData";
import TugasDetailClient from "./TugasDetailClient";

export function generateStaticParams() {
  return mockKelas.flatMap((k) => k.tugasList.map((t) => ({ id: t.id })));
}

export default async function TugasSiswaDetailPage({ params }) {
  const { id } = await params;
  return <TugasDetailClient id={id} />;
}
