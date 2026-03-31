// src/app/layout.tsx
import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({ 
  subsets: ["latin"], 
  variable: "--font-newsreader",
  weight: "variable", 
  style: ['normal', 'italic'],
  display: 'swap',
});

const manrope = Manrope({ 
  subsets: ["latin"], 
  variable: "--font-manrope",
  weight: "variable",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Café Events | Sistema de Gestión",
  description: "Plataforma integral de cafetería y eventos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="light">
      {/* Aquí centralizamos las variables de fuente y clases base */}
      <body className={`${newsreader.variable} ${manrope.variable} font-body subpixel-antialiased`}>
        {children}
      </body>
    </html>
  );
}