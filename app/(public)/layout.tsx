// src/app/(public)/layout.tsx
import Link from "next/link";
import { Lock, Share2, Camera } from "lucide-react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f4] text-[#1c1c19]">
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-[#fcf9f4]/70 backdrop-blur-xl border-b border-[#334537]/5">
        <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
          <Link href="/" className="font-headline text-2xl font-semibold tracking-[0.05em] text-[#334537]">
            Café Events
          </Link>
          
          <div className="hidden md:flex items-center gap-12">
            <Link href="/menu" className="text-[#334537] border-b border-[#334537] pb-1 font-label font-medium text-sm uppercase tracking-[0.2em] transition-all">
              Menu
            </Link>
            <Link href="/eventos" className="text-[#334537]/60 font-label font-medium text-sm uppercase tracking-[0.2em] hover:text-[#334537] transition-all">
              Eventos
            </Link>
          </div>

          <Link href="/login" className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#334537] text-white font-label text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#4a5d4e] transition-all shadow-sm">
            <Lock size={14} />
            Acceso staff
          </Link>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="pt-20 flex-grow">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="w-full rounded-t-[3rem] mt-8 bg-[#f6f3ee]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-12 py-20 max-w-screen-2xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="font-headline text-xl italic text-[#334537]">Café Events</div>
            <div className="space-y-4 font-label text-sm tracking-wide leading-relaxed text-[#334537]/70">
              <p>Via della Conciliazione, 4<br/>00193 Roma RM, Italy</p>
              <p>+39 06 6988 1234</p>
              <p className="mt-4 italic font-headline text-base">© 2024 Café Events. El escenario perfecto.</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-label font-bold text-xs uppercase tracking-[0.2em] text-[#334537]">Navegación</h4>
            <ul className="space-y-4 font-label text-sm tracking-wide text-[#334537]/70">
              <li><Link href="#" className="hover:text-[#334537] transition-all underline underline-offset-4">Journal</Link></li>
              <li><Link href="/menu" className="hover:text-[#334537] transition-all">Menu</Link></li>
              <li><Link href="/eventos" className="hover:text-[#334537] transition-all">Eventos</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-label font-bold text-xs uppercase tracking-[0.2em] text-[#334537]">Social</h4>
            <div className="flex gap-6">
              <Link href="#" className="text-[#334537]/70 hover:text-[#334537] transition-all"><Share2 size={24} /></Link>
              <Link href="#" className="text-[#334537]/70 hover:text-[#334537] transition-all"><Camera size={24} /></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}