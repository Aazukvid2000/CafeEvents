'use client';

import React, { useState } from 'react';
import { 
  Plus, Calculator, TrendingUp, 
  Clock, ArrowRight 
} from 'lucide-react';
import { QuoteForm } from '../components/QuoteForm';

// Definimos la interfaz para el historial para evitar any en el map
interface QuoteRecord {
  id: string;
  cliente: string;
  fecha: string;
  total: number;
  estado: 'ENVIADA' | 'ACEPTADA' | 'VENCIDA';
}

const RECENT_QUOTES: QuoteRecord[] = [
  { id: 'COT-001', cliente: 'Boda Fam. Guzmán', fecha: '2026-06-15', total: 45600, estado: 'ENVIADA' },
  { id: 'COT-002', cliente: 'Graduación ITM', fecha: '2026-07-20', total: 89000, estado: 'ACEPTADA' },
  { id: 'COT-003', cliente: 'Reunión Corporativa', fecha: '2026-05-10', total: 12500, estado: 'VENCIDA' },
];

// Interfaz para las props del StatCard
interface StatCardProps {
  icon: React.ReactNode; // Tipo correcto para iconos/componentes
  label: string;
  value: string;
  color: string;
}

export const QuotesView = () => {
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return <QuoteForm onBack={() => setIsCreating(false)} />;
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#334537]/5 pb-8">
        <div>
          <span className="label-caps text-[#C5A059] mb-2 block uppercase tracking-widest text-[10px] font-black italic">Presupuestos y Prospectos</span>
          <h1 className="serif-display text-5xl md:text-6xl text-[#1a3d2e]">Cotizaciones</h1>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-[#1a3d2e] text-white px-8 py-4 rounded-full font-label text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#263329] transition-all flex items-center gap-2 active:scale-95"
        >
          <Plus size={16} /> Nueva Cotización 
        </button>
      </header>

      {/* PANEL DE MÉTRICAS RÁPIDAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Calculator size={20}/>} label="Cotizado este mes" value="$147,200" color="bg-[#f6f3ee]" />
        <StatCard icon={<TrendingUp size={20}/>} label="Tasa de Conversión" value="42%" color="bg-[#d3e8d5]" />
        <StatCard icon={<Clock size={20}/>} label="Pendientes de Seguimiento" value="8" color="bg-[#fcf9f4]" />
      </div>

      {/* TABLA DE HISTORIAL RECIENTE */}
      <div className="bg-white rounded-[3rem] border border-[#1a3d2e]/5 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-[#1a3d2e]/5 flex justify-between items-center">
          <h3 className="font-headline italic text-2xl text-[#1a3d2e]">Historial Reciente</h3>
          <button className="text-[10px] font-black uppercase tracking-widest text-[#C5A059] hover:underline">Ver todo el archivo</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#fcf9f4] text-[9px] font-black uppercase tracking-widest text-[#434843]/40">
                <th className="px-8 py-4">ID / Prospecto</th>
                <th className="px-8 py-4">Fecha Evento</th>
                <th className="px-8 py-4">Monto Total</th>
                <th className="px-8 py-4">Estado</th>
                <th className="px-8 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a3d2e]/5">
              {RECENT_QUOTES.map((quote) => (
                <tr key={quote.id} className="hover:bg-[#f6f3ee]/30 transition-colors group">
                  <td className="px-8 py-5">
                    <p className="font-bold text-sm text-[#1a3d2e]">{quote.cliente}</p>
                    <p className="text-[10px] opacity-40 uppercase font-black">{quote.id}</p>
                  </td>
                  <td className="px-8 py-5 text-xs font-medium text-[#434843]">{quote.fecha}</td>
                  <td className="px-8 py-5 font-headline italic text-lg text-[#1a3d2e]">${quote.total.toLocaleString()}</td>
                  <td className="px-8 py-5">
                    <span className={`text-[8px] font-black uppercase px-3 py-1 rounded-full ${
                      quote.estado === 'ACEPTADA' ? 'bg-green-100 text-green-700' : 
                      quote.estado === 'VENCIDA' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {quote.estado}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 hover:bg-[#1a3d2e] hover:text-white rounded-full transition-all">
                      <ArrowRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Sub-componente corregido sin 'any'
const StatCard = ({ icon, label, value, color }: StatCardProps) => (
  <div className={`${color} p-8 rounded-[2.5rem] border border-[#1a3d2e]/5 space-y-4 shadow-sm`}>
    <div className="text-[#1a3d2e]/30">{icon}</div>
    <div>
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1a3d2e]/40 mb-1">{label}</p>
      <p className="font-headline text-3xl italic text-[#1a3d2e]">{value}</p>
    </div>
  </div>
);