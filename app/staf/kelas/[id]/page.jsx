import { mockKelas } from "@/lib/mockData";
import StafKelasDetailClient from "./StafKelasDetailClient";

export function generateStaticParams() {
  return mockKelas.map((k) => ({ id: k.id }));
}

export default async function RincianKelasStafDetailPage({ params }) {
  const { id } = await params;
  return <StafKelasDetailClient id={id} />;
}
