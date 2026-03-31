import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* Hero Section: Claridad Inmediata */}
      <section className="max-w-screen-2xl mx-auto px-8">
        <div className="relative w-full h-[870px] rounded-xl overflow-hidden group shadow-2xl">
          <Image
            src="/images/ui/principal.jpg"
            alt="Café Events Interior"
            fill
            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2000ms] ease-out"
            priority
          />
          {/* Glassmorphic Card */}
          <div className="absolute bottom-12 left-12 max-w-xl bg-white/70 backdrop-blur-xl p-12 rounded-lg shadow-2xl border border-white/20">
            <span className="text-[#563d00] font-label text-xs uppercase tracking-[0.2em] mb-4 block font-bold">Cafetería & Salón de Eventos</span>
            <h1 className="font-headline text-5xl md:text-7xl text-[#334537] leading-[1.1] mb-8 italic">
              El escenario perfecto para tu próximo gran momento.
            </h1>
            <p className="text-[#434843] font-body text-lg leading-relaxed max-w-md">
              Combinamos una barra de café de especialidad con salones diseñados para eventos sociales y corporativos. Aquí, el sabor y la logística se unen en una sola experiencia.
            </p>
            <div className="mt-10 flex items-center gap-8">
              <button className="bg-[#334537] text-white px-8 py-4 rounded-full font-label text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                Reservar Espacio
              </button>
              <Link href="/menu" className="text-[#563d00] border-b border-[#563d00]/30 pb-1 font-label text-sm uppercase tracking-widest hover:border-[#563d00] transition-all font-bold">
                Ver Menú Digital
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Desglose de Servicios */}
      <section className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
        
        {/* 01 Item: El Diferenciador (Nuevo enfoque) */}
        <div className="md:col-span-4 bg-[#f6f3ee] p-12 rounded-xl flex flex-col justify-between min-h-[400px] border border-[#e5e2dd]">
          <span className="font-headline text-7xl text-[#334537]/10 select-none">01</span>
          <div>
            <h3 className="font-headline text-3xl text-[#334537] mb-4 italic">Coffee Break de Autor</h3>
            <p className="text-[#5f5e5e] font-body leading-relaxed">
              Elevamos tus reuniones con una barra de café de especialidad y repostería artesanal. No es solo un servicio, es un momento de pausa diseñado para inspirar a tus invitados.
            </p>
          </div>
        </div>

        {/* Image Center: La Experiencia */}
        <div className="md:col-span-8 relative h-[400px] rounded-xl overflow-hidden shadow-lg group">
          <Image
            src="/images/ui/cafe.jpg"
            alt="Servicio de Café"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
          />
          <div className="absolute inset-0 bg-[#334537]/20 mix-blend-multiply"></div>
          <div className="absolute bottom-8 right-8 text-white">
            <p className="font-headline italic text-2xl tracking-widest">Hospitalidad de Grado Experto</p>
          </div>
        </div>

        {/* 02 Item: Los Eventos */}
        <div className="md:col-span-12 bg-[#e5e2dd] p-12 rounded-xl flex flex-col md:flex-row items-center justify-between border border-[#c3c8c1]">
          <div className="max-w-2xl mb-8 md:mb-0">
            <span className="text-[#563d00] font-label text-xs uppercase tracking-[0.2em] mb-2 block font-bold">Planeación y Logística</span>
            <h3 className="font-headline text-4xl text-[#334537] mb-4 italic">Salones para Eventos y Banquetes</h3>
            <p className="text-[#434843] font-body">
              Contamos con espacios versátiles para bodas, conferencias y reuniones privadas. Incluimos servicio de banquetes personalizado y coordinación técnica para que tú solo te preocupes por tus invitados.
            </p>
          </div>
          <button className="w-16 h-16 rounded-full border border-[#334537]/20 flex items-center justify-center hover:bg-[#334537] hover:text-white transition-all duration-500 group">
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}