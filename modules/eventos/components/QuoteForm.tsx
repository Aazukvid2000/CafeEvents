'use client';

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Send, Calculator, Info, Utensils, Users, Calendar } from 'lucide-react';
import { VenueSelector } from './VenueSelector';
import { VenueType } from '../types/gerente';

const CAFE_MENU = [
  { id: 'prod-01', nombre: 'Desayuno Buffet Ejecutivo', precio: 250 },
  { id: 'prod-02', nombre: 'Brunch Gourmet Alabaster', precio: 320 },
  { id: 'prod-03', nombre: 'Cena de Gala Tres Tiempos', precio: 450 },
];

interface Props {
  onBack: () => void;
}

export const QuoteForm = ({ onBack }: Props) => {
  const [resData, setResData] = useState({
    fecha: '',
    hora: '14:00',
    salon: 'CAFETERIA' as VenueType,
    pax: 20,
    platillosIds: [] as string[],
    meseros: false
  });

  const [showResult, setShowResult] = useState(false);

  const total = useMemo(() => {
    const precioPlatillos = resData.platillosIds.reduce((sum, id) => {
      const item = CAFE_MENU.find(m => m.id === id);
      return sum + (item ? item.precio : 0);
    }, 0);
    const costoMeseros = resData.meseros ? 50 : 0;
    return (precioPlatillos + costoMeseros) * resData.pax;
  }, [resData.platillosIds, resData.pax, resData.meseros]);

  const handleTogglePlatillo = (id: string) => {
    setResData(prev => ({
      ...prev,
      platillosIds: prev.platillosIds.includes(id) 
        ? prev.platillosIds.filter(i => i !== id) 
        : [...prev.platillosIds, id]
    }));
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-right duration-500">
      <header className="flex items-center gap-6">
        <button onClick={onBack} className="p-4 bg-white border border-[#1a3d2e]/10 rounded-full text-[#1a3d2e] hover:bg-[#1a3d2e] shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <h1 className="serif-display text-5xl text-[#1a3d2e]">Generar Cotización</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* LOGÍSTICA BÁSICA (Paso 2 y 4 del Flujo Normal) */}
          <section className="bg-white p-10 rounded-[3rem] border border-[#1a3d2e]/5 shadow-sm space-y-8">
            <VenueSelector 
              selected={resData.salon}
              pax={resData.pax}
              onSelect={(v) => setResData({...resData, salon: v})}
              onPaxChange={(p) => setResData({...resData, pax: p})}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#1a3d2e]/5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#434843]/60 ml-1 flex items-center gap-2">
                   <Calendar size={12}/> Fecha Tentativa *
                </label>
                <input 
                  type="date" 
                  className="w-full bg-[#f6f3ee]/50 border-none rounded-2xl p-4 text-sm outline-none"
                  onChange={(e) => setResData({...resData, fecha: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* MENÚ */}
          <section className="bg-white p-10 rounded-[3rem] border border-[#1a3d2e]/5 shadow-sm space-y-6">
            <h3 className="font-headline italic text-3xl text-[#1a3d2e] flex items-center gap-3">
              <Utensils size={24} className="text-[#C5A059]"/> Selección de Menú
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CAFE_MENU.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => handleTogglePlatillo(item.id)}
                  className={`p-5 rounded-[1.5rem] border-2 flex justify-between items-center transition-all ${
                    resData.platillosIds.includes(item.id) 
                    ? 'border-[#1a3d2e] bg-[#f6f3ee]' : 'border-[#f0ede8] opacity-60'
                  }`}
                >
                  <span className="font-bold text-[#1a3d2e] text-[10px] uppercase">{item.nombre}</span>
                  <span className="font-headline text-[#C5A059] italic text-sm">${item.precio}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* RESUMEN DE COTIZACIÓN */}
        <aside className="space-y-6">
          <div className="bg-[#1a3d2e] text-white p-10 rounded-[3rem] shadow-2xl sticky top-24 space-y-8">
            <div className="space-y-2 border-b border-white/10 pb-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Presupuesto Estimado</p>
              <p className="font-headline text-5xl italic text-[#C5A059]">${total.toLocaleString()}</p>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between text-[11px] uppercase tracking-widest opacity-60">
                 <span>Precio por Persona</span>
                 <span>${(total / (resData.pax || 1)).toFixed(2)}</span>
               </div>
               <div className="flex items-start gap-3 text-[10px] opacity-40 italic leading-relaxed">
                <Info size={14} className="shrink-0 mt-0.5" />
                <p>Este monto es informativo y no representa un bloqueo de fecha ni un contrato legal.</p>
              </div>
            </div>

            <button 
              onClick={() => setShowResult(true)}
              disabled={resData.platillosIds.length === 0 || !resData.fecha}
              className="w-full py-5 bg-[#C5A059] text-[#1a3d2e] rounded-full font-label text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-[#d4b57a] transition-all flex items-center justify-center gap-3 disabled:opacity-20"
            >
              <Calculator size={16} /> Calcular Cotización
            </button>
          </div>
        </aside>
      </div>

      {/* MODAL DE RESULTADO (Postcondición 1 y 2) */}
      {showResult && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1c1c19]/80 backdrop-blur-sm" onClick={() => setShowResult(false)} />
          <div className="relative bg-[#fcf9f4] rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl border border-[#1a3d2e]/10 animate-in zoom-in-95">
            <div className="w-20 h-20 bg-[#d3e8d5] rounded-full flex items-center justify-center mx-auto mb-6 text-[#1a3d2e]">
              <Send size={32} />
            </div>
            <h4 className="font-headline text-4xl italic text-[#1a3d2e] mb-4">Cotización Lista</h4>
            <p className="text-xs text-[#434843]/70 mb-8 italic leading-relaxed">
              El costo total para <strong>{resData.pax} personas</strong> en el <strong>{resData.salon}</strong> es de <strong>${total.toLocaleString()}</strong>.
            </p>
            <button onClick={onBack} className="w-full py-5 bg-[#1a3d2e] text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">Finalizar</button>
          </div>
        </div>
      )}
    </div>
  );
};