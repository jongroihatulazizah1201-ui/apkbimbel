import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Portal Belajar Langkah Juara",
  description: "Aplikasi Pendaftaran, Kelas, dan Tugas Bimbingan Belajar Langkah Juara di Makassar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="min-h-screen bg-app-bg text-app-text flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 pb-16">{children}</main>
      </body>
    </html>
  );
}
