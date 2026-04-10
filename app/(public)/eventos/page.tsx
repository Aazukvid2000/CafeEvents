'use client';

import Image from 'next/image';
import {
  Users,
  MessageSquare,
  UtensilsCrossed,
  Sparkles,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';

export default function EventosPage() {
  return (
    <div className="bg-[#fcf9f4] selection:bg-[#d3e8d5] selection:text-[#0e1f13] overflow-x-hidden">

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/ui/evento-hero.jpg" // 
            alt="Espacio de eventos de lujo"
            fill
            className="object-cover opacity-90 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-transparent to-[#fcf9f4]"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <span className="inline-block font-label text-sm tracking-[0.3em] uppercase mb-8 text-white/90 font-bold">
            Experiencias que curan el alma
          </span>
          <h1 className="font-headline text-6xl md:text-9xl font-light tracking-tight leading-[0.95] mb-12 text-white">
            La Arquitectura <br /> <span className="italic font-normal">de un Momento</span>
          </h1>
          <p className="font-headline text-2xl italic max-w-2xl mx-auto mb-16 leading-relaxed text-white/80">
            -La hospitalidad consiste en hacer que los invitados se sientan en casa, aun cuando el espacio sea monumental.-
          </p>
          <div className="flex justify-center">
            <a
              href="#contacto"
              className="bg-[#334537] text-white px-10 py-5 rounded-full font-label tracking-widest uppercase text-[10px] font-bold hover:bg-[#4a5d4e] transition-all duration-500 shadow-2xl shadow-black/20"
            >
              Inicie su consulta personalizada
            </a>
          </div>
        </div>
      </header>

      {/* Venues Section */}
      <section className="py-32 px-6 md:px-12 bg-[#fcf9f4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">

            {/* Venue 01: Alabaster */}
            <div className="md:col-span-7 relative group">
              <div className="aspect-[4/5] relative rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="/images/ui/salon-grande.jpg"
                  alt="Salón Alabaster"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              {/* Info Overlay Card */}
              <div className="md:absolute -bottom-12 -right-12 bg-white/80 backdrop-blur-xl p-10 rounded-xl md:max-w-md shadow-2xl shadow-black/5 mt-6 md:mt-0 border border-white/20">
                <span className="font-headline text-4xl text-[#334537]/20 mb-4 block select-none">01</span>
                <h3 className="font-headline text-4xl text-[#334537] mb-4 italic">Salón Alabaster</h3>
                <p className="font-body text-[#5f5e5e] leading-relaxed mb-6 text-sm">
                  Un lienzo de pureza arquitectónica. Diseñado para eventos de gran formato que exigen una estética de gala y una amplitud sin compromisos.
                </p>
                <div className="flex flex-wrap items-center gap-6 text-[10px] font-label uppercase tracking-widest text-[#334537] font-bold">
                  <span className="flex items-center gap-2"><Users size={14} /> Hasta 200 personas</span>
                  <span className="flex items-center gap-2"><Sparkles size={14} /> Bodas y Galas</span>
                </div>
              </div>
            </div>

            {/* Venue 02: Olive */}
            <div className="md:col-span-5 md:mt-48 relative group">
              <div className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="/images/ui/salon-pequeno.jpg"
                  alt="Refugio Olive"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="mt-10 p-2">
                <span className="font-headline text-4xl text-[#334537]/20 mb-4 block select-none">02</span>
                <h3 className="font-headline text-4xl text-[#334537] mb-4 italic">Refugio Olive</h3>
                <p className="font-body text-[#5f5e5e] leading-relaxed mb-6 text-sm">
                  La intimidad elevada al arte. Un santuario de roble y tonos tierra diseñado para la conversación profunda y la discreción absoluta.
                </p>
                <div className="flex flex-col gap-3 text-[10px] font-label uppercase tracking-widest text-[#334537] font-bold">
                  <span className="flex items-center gap-2"><Users size={14} /> Hasta 25 personas</span>
                  <span className="flex items-center gap-2"><UtensilsCrossed size={14} /> Cenas y Negocios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section className="py-32 bg-[#f6f3ee] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-headline text-5xl md:text-7xl text-[#334537] italic mb-6">Método Tailor-Made</h2>
            <div className="w-24 h-px bg-[#334537]/20 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                label: "Paso Uno",
                title: "Plática Directa",
                icon: <MessageSquare size={24} />,
                desc: "Entendemos el alma de su evento antes de trazar la primera línea. Su visión es nuestra estructura operativa."
              },
              {
                step: "02",
                label: "Paso Dos",
                title: "Menú del Chef",
                icon: <UtensilsCrossed size={24} />,
                desc: "Una propuesta gastronómica diseñada exclusivamente para sus invitados, maridando sabores con la atmósfera del recinto."
              },
              {
                step: "03",
                label: "Paso Tres",
                title: "Cuidado del Detalle",
                icon: <Sparkles size={24} />,
                desc: "Desde la acústica hasta la iluminación, nada queda al azar. Ejecución impecable para una memoria imborrable."
              }
            ].map((item) => (
              <div key={item.step} className="bg-white p-12 rounded-xl flex flex-col items-center text-center transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-[#334537]/5 flex items-center justify-center mb-8 text-[#334537]">
                  {item.icon}
                </div>
                <span className="font-label text-[10px] tracking-widest text-[#334537]/40 mb-4 uppercase font-bold">{item.label}</span>
                <h4 className="font-headline text-2xl text-[#334537] mb-4 italic">{item.title}</h4>
                <p className="font-body text-[#5f5e5e] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 md:px-12 bg-[#fcf9f4]" id="contacto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="font-headline text-5xl md:text-6xl text-[#334537] mb-12 italic leading-tight">Comencemos la planeación.</h2>
            <div className="space-y-12">
              <div className="flex gap-8 border-b border-[#c3c8c1]/20 pb-8">
                <Phone className="text-[#334537]" size={24} />
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-[#334537]/40 mb-2 font-bold">Teléfono Directo</p>
                  <p className="font-body text-xl text-[#1c1c19]">55 1234 5678</p>
                </div>
              </div>
              <div className="flex gap-8 border-b border-[#c3c8c1]/20 pb-8">
                <MapPin className="text-[#334537]" size={24} />
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-[#334537]/40 mb-2 font-bold">Ubicación</p>
                  <p className="font-body text-xl text-[#1c1c19]">Av. Reforma 123, Col. Juárez, CDMX</p>
                </div>
              </div>
              <div className="flex gap-8 border-b border-[#c3c8c1]/20 pb-8">
                <Clock className="text-[#334537]" size={24} />
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-[#334537]/40 mb-2 font-bold">Horarios de Atención</p>
                  <p className="font-body text-xl text-[#1c1c19]">
                    Lun — Vie: 09:00 — 19:00 <br />
                    Sáb: 10:00 — 14:00
                  </p>
                </div>
              </div>
            </div>
          </div>



          <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-xl overflow-hidden grayscale contrast-125 opacity-80 shadow-inner bg-[#f0ede8]">

            {/* 1. LA IMAGEN (Al fondo) */}
            <Image
              src="/images/ui/map.jpg" // Cambia esto por la ruta real de tu imagen (ej: /images/ui/mapa_roma.jpg)
              alt="Ubicación de Café Events en Roma"
              fill // Requerido para ocupar todo el contenedor relativo
              className="object-cover" // Asegura que la imagen cubra el área sin deformarse
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Opcional pero recomendado para rendimiento
            />

            {/* 2. CAPA DE SUPERPOSICIÓN (Overlay) */}
            {/* Mantenemos esta capa para dar el tono verdoso a la imagen */}
            <div className="absolute inset-0 bg-[#334537]/20 mix-blend-multiply z-10"></div>

            {/* 3. PUNTO DE UBICACIÓN (Pulse) */}
            {/* Añadimos z-20 para asegurar que esté sobre la imagen y el overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#334537] rounded-full ring-8 ring-[#334537]/20 animate-pulse z-20"></div>

            {/* 4. TEXTO DESCRIPTIVO (Opcional) */}
            {/* Lo mantenemos centrado, pero quizás quieras moverlo o quitarlo si la imagen ya es clara */}
            <div className="absolute bottom-4 left-0 w-full flex items-center justify-center font-label text-[10px] uppercase tracking-widest text-[#334537]/60 z-20">
              Vista de Ubicación Estratégica
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}