import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";

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
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-app-bg text-app-text antialiased" suppressHydrationWarning>
        <AuthProvider>
          <div className="min-h-screen flex flex-col lg:flex-row bg-[#F7F5F2]">
            <Navbar />
            <div className="flex-1 flex flex-col min-w-0">
              <main className="flex-1 pb-16">{children}</main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
