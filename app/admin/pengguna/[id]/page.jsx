import { mockUsers } from "@/lib/mockData";
import AdminPenggunaDetailClient from "./AdminPenggunaDetailClient";

export function generateStaticParams() {
  return mockUsers.map((u) => ({ id: u.id }));
}

export default async function RincianPenggunaAdminDetailPage({ params }) {
  const { id } = await params;
  return <AdminPenggunaDetailClient id={id} />;
}
