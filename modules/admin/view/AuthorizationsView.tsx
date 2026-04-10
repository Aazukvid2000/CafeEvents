'use client';
import React, { useState } from 'react';
import { ClipboardCheck, Search, ChevronRight, Clock } from 'lucide-react';
import { ProposalReview } from '../components/ProposalDetail';
import { Proposal } from '../types/autorizacion';

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'PROP-101',
    tipo: 'PRODUCTO',
    nombre: 'Salmón Rosé a la Leña',
    chef: 'Chef Mario V.',
    costoProduccion: 145,
    precioSugerido: 380,
    margenSugerido: 61.8,
    detalles: [
      { insumo: 'Salmón fresco 200g', cantidad: 1, costoUnitario: 110, subtotal: 110 },
      { insumo: 'Especias y Leña', cantidad: 1, costoUnitario: 35, subtotal: 35 }
    ],
    estado: 'PENDIENTE',
    fechaEnvio: '2026-04-04'
  },
  {
    id: 'PROP-102',
    tipo: 'MENU_EVENTO',
    nombre: 'Banquete Empresarial Platino',
    chef: 'Chef Elena R.',
    costoProduccion: 450,
    precioSugerido: 1200,
    margenSugerido: 62.5,
    detalles: [
      { insumo: 'Menú 3 Tiempos', cantidad: 1, costoUnitario: 400, subtotal: 400 },
      { insumo: 'Servicio Loza Especial', cantidad: 1, costoUnitario: 50, subtotal: 50 }
    ],
    estado: 'PENDIENTE',
    fechaEnvio: '2026-04-03'
  }
];

export const AuthorizationsView = () => {
  const [selectedProp, setSelectedProp] = useState<Proposal | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);

  const handleDecision = (id: string, decision: 'AUTORIZAR' | 'RECHAZAR', finalPrice: number, comment: string) => {
    console.log(`Auditoría: Propuesta ${id} - Estado: ${decision} - Precio: ${finalPrice} - Comentario: ${comment}`);
    setProposals(prev => prev.filter(p => p.id !== id));
    setSelectedProp(null);
  };

  if (selectedProp) {
    return <ProposalReview proposal={selectedProp} onBack={() => setSelectedProp(null)} onAction={handleDecision} />;
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#334537]/10 pb-8">
        <div>
          <span className="label-caps text-[#C5A059] mb-2 block uppercase tracking-widest text-[10px] font-black italic">Validación de Margen y Costos</span>
          <h1 className="serif-display text-5xl md:text-6xl text-[#1a3d2e]">Autorizaciones</h1>
        </div>
        <div className="flex items-center gap-3 bg-[#f6f3ee] px-6 py-3 rounded-full text-[#1a3d2e]">
          <Clock size={16} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">{proposals.length} Pendientes</span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {proposals.map((prop) => (
          <button 
            key={prop.id}
            onClick={() => setSelectedProp(prop)}
            className="w-full bg-white border border-[#1a3d2e]/5 p-8 rounded-[2.5rem] flex flex-col sm:flex-row justify-between items-center group hover:shadow-2xl transition-all duration-500"
          >
            <div className="flex items-center gap-8 text-left">
              <div className={`p-5 rounded-[1.5rem] ${prop.tipo === 'MENU_EVENTO' ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'bg-[#1a3d2e]/5 text-[#1a3d2e]'}`}>
                <ClipboardCheck size={28} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase opacity-40 mb-1 tracking-widest">{prop.tipo} • ID: {prop.id}</p>
                <h3 className="font-headline text-3xl italic text-[#1a3d2e] group-hover:text-[#C5A059] transition-colors">{prop.nombre}</h3>
                <p className="text-xs text-[#434843]/60 italic font-medium">Propuesta enviada por {prop.chef}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-12 mt-6 sm:mt-0">
              <div className="text-right">
                <p className="text-[9px] font-black uppercase opacity-40 mb-1">Margen Sugerido</p>
                <p className="font-headline text-3xl text-[#1a3d2e]">{prop.margenSugerido}%</p>
              </div>
              <ChevronRight className="text-[#1a3d2e]/20 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};