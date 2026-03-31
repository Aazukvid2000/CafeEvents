'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Tipado para los productos
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'bebida' | 'comida' | 'postre';
}

const MENU_DATA: Product[] = [
  // BEBIDAS
  { id: 1, name: 'Flat White Etíope', price: 85, description: 'Notas de bergamota y té negro. Servido con leche orgánica de pastoreo a 65°C.', image: '/images/ui/bebida1.jpg', category: 'bebida' },
  { id: 2, name: 'V60 Geisha Panameño', price: 165, description: 'Proceso natural. Perfil floral intenso con retrogusto a jazmín y durazno blanco.', image: '/images/ui/bebida2.jpg', category: 'bebida' },
  { id: 3, name: 'Cold Brew Infusionado', price: 95, description: 'Extracción en frío de 18 horas con toques sutiles de romero fresco y piel de naranja.', image: '/images/ui/bebida3.jpg', category: 'bebida' },
  // COMIDA
  { id: 4, name: 'Tostada de Aguacate & Eneldo', price: 210, description: 'Pan de centeno fermentado, crema de aguacate hass, huevos pochados orgánicos y aceite de eneldo.', image: '/images/ui/comida1.jpg', category: 'comida' },
  { id: 5, name: 'Huevos Benedict Nórdicos', price: 245, description: 'Muffin inglés casero, salmón curado en casa con cítricos, salsa holandesa al azafrán y brotes.', image: '/images/ui/comida2.jpg', category: 'comida' },
  // POSTRES
  { id: 6, name: 'Croissant de Pistacho Sicilia', price: 115, description: 'Masa madre de 72 horas, relleno de crema pura de pistacho de Bronte y pétalos de sal.', image: '/images/ui/postre1.jpg', category: 'postre' },
  { id: 7, name: 'Tartaleta de Frutos', price: 98, description: 'Base sablé de almendras y selección de frutos rojos de estación.', image: '/images/ui/postre2.jpg', category: 'postre' },
  { id: 8, name: 'Pain au Chocolat', price: 88, description: 'Doble barra de chocolate 70% cacao Valrhona.', image: '/images/ui/postre3.jpg', category: 'postre' },
];

export default function MenuPage() {
  const formatPrice = (price: number) => `$${price}.00`;

  return (
    <div className="bg-[#fcf9f4] min-h-screen">
      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 pt-16 mb-24 text-center md:text-left">
        <span className="inline-block text-[#C5A059] font-label tracking-[0.2em] uppercase text-xs mb-4 font-bold">
          Experiencia Sensorial
        </span>
        <h1 className="font-headline text-6xl md:text-8xl text-[#334537] tracking-tight leading-none mb-8">
          La Carta de <span className="italic font-light">Temporada</span>
        </h1>
        <p className="max-w-xl text-[#5f5e5e] text-lg leading-relaxed font-body">
          Una curaduría de granos de origen, procesos artesanales y el equilibrio perfecto entre la tradición europea y el vanguardismo culinario mexicano.
        </p>
      </header>

      {/* 01. BEBIDAS */}
      <section className="mb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-[#e5e2dd] pb-6">
          <h2 className="font-headline text-4xl text-[#334537] tracking-wide flex flex-col">
            <span className="text-5xl text-[#D9D1C5] mb-2">01</span>
            <span className="text-5xl">Bebidas</span>
          </h2>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <p className="font-label text-sm text-[#737872] tracking-widest uppercase font-bold">Cafetería de Especialidad</p>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-[#e5e2dd] flex items-center justify-center hover:bg-[#f0ede8] transition-all"><ArrowLeft size={16} /></button>
              <button className="w-10 h-10 rounded-full border border-[#e5e2dd] flex items-center justify-center hover:bg-[#f0ede8] transition-all"><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {MENU_DATA.filter(p => p.category === 'bebida').map(item => (
            <div key={item.id} className="flex flex-col group">
              <div className="relative overflow-hidden rounded-[2.5rem] mb-8 aspect-[4/5] bg-[#f0ede8] shadow-sm">
                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="font-headline text-2xl text-[#334537]">{item.name}</h3>
                <span className="font-body text-[#4a5d4e] text-sm font-bold">{formatPrice(item.price)}</span>
              </div>
              <p className="text-[#5f5e5e] font-body text-sm opacity-80 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 02. COMIDA */}
      <section className="mb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-[#e5e2dd] pb-6">
          <h2 className="font-headline text-4xl text-[#334537] tracking-wide flex flex-col">
            <span className="text-5xl text-[#D9D1C5] mb-2">02</span>
            <span className="text-5xl">Comida</span>
          </h2>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <p className="font-label text-sm text-[#737872] tracking-widest uppercase font-bold">Brunch & Gastronomía</p>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-[#e5e2dd] flex items-center justify-center hover:bg-[#f0ede8] transition-all"><ArrowLeft size={16} /></button>
              <button className="w-10 h-10 rounded-full border border-[#e5e2dd] flex items-center justify-center hover:bg-[#f0ede8] transition-all"><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
        
        <div className="flex overflow-x-auto no-scrollbar gap-10 px-6 md:px-12 pb-8 snap-x snap-mandatory">
          {MENU_DATA.filter(p => p.category === 'comida').map(item => (
            <div key={item.id} className="min-w-[320px] md:min-w-[550px] snap-start flex flex-col md:flex-row gap-6 p-4 rounded-[2.5rem] bg-[#f6f3ee]">
              <div className="md:w-1/2 aspect-square relative overflow-hidden rounded-2xl">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center py-4 pr-4">
                <h3 className="font-headline text-3xl text-[#334537] mb-4 leading-tight">{item.name}</h3>
                <p className="text-[#5f5e5e] font-body text-sm mb-6 opacity-80">{item.description}</p>
                <span className="font-headline text-2xl text-[#4a5d4e]">{formatPrice(item.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03. POSTRES */}
      <section className="mb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-[#e5e2dd] pb-6">
          <h2 className="font-headline text-4xl text-[#334537] tracking-wide flex flex-col">
            <span className="text-5xl text-[#D9D1C5] mb-2">03</span>
            <span className="text-5xl">Postres</span>
          </h2>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <p className="font-label text-sm text-[#737872] tracking-widest uppercase font-bold">Repostería Artesanal</p>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-[#e5e2dd] flex items-center justify-center hover:bg-[#f0ede8] transition-all"><ArrowLeft size={16} /></button>
              <button className="w-10 h-10 rounded-full border border-[#e5e2dd] flex items-center justify-center hover:bg-[#f0ede8] transition-all"><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 pb-16">
          {/* Item Destacado (Croissant) */}
          <div className="md:col-span-8 relative rounded-[2rem] overflow-hidden bg-[#ebe8e3] group min-h-[450px]">
            <Image src={MENU_DATA[5].image} alt={MENU_DATA[5].name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-2/3 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl">
              <h3 className="font-headline text-3xl text-[#334537] mb-2">{MENU_DATA[5].name}</h3>
              <p className="text-[#5f5e5e] font-body text-sm mb-4 leading-relaxed">{MENU_DATA[5].description}</p>
              <span className="font-headline text-xl text-[#334537] font-bold">{formatPrice(MENU_DATA[5].price)}</span>
            </div>
          </div>

          {/* Otros Postres */}
          <div className="md:col-span-4 flex flex-col gap-8">
            {MENU_DATA.filter(p => p.id === 7 || p.id === 8).map(item => (
              <div key={item.id} className="bg-[#f6f3ee] p-6 rounded-[2rem] flex flex-col flex-grow">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden mb-6">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-headline text-xl text-[#334537]">{item.name}</h3>
                  <span className="font-body text-[#4a5d4e] text-sm font-bold">{formatPrice(item.price)}</span>
                </div>
                <p className="text-[#5f5e5e] font-body text-sm opacity-80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}