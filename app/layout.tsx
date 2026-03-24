import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biblioteca - CRUD de Libros",
  description: "Sistema de gestión de libros con Next.js y MySQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-slate-800 border-t border-slate-700 py-8 px-4 mt-16">
          <div className="max-w-7xl mx-auto text-center text-slate-400">
            <p>&copy; 2026 Biblioteca Digital. Proyecto CRUD con Next.js, Prisma y MySQL.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
