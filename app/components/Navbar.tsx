"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-800 border-b border-slate-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg hover:text-slate-300 transition">
              ☕ Café Events
            </Link>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/mesero"
              className={`transition-colors ${
                pathname.startsWith("/mesero")
                  ? "text-amber-400 font-semibold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              👨‍💼 Mesero
            </Link>

            <Link
              href="/cocina"
              className={`transition-colors ${
                pathname.startsWith("/cocina")
                  ? "text-red-400 font-semibold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              👨‍🍳 Cocina
            </Link>

            <Link
              href="/caja"
              className={`transition-colors ${
                pathname.startsWith("/caja")
                  ? "text-green-400 font-semibold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              💳 Caja
            </Link>

            <Link
              href="/admin"
              className={`transition-colors ${
                pathname.startsWith("/admin")
                  ? "text-blue-400 font-semibold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              ⚙️ Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

