'use client';
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Save, Info, ShieldAlert } from 'lucide-react';
import { Proposal } from '../types/autorizacion';

interface Props {
  proposal: Proposal;
  onBack: () => void;
  onAction: (id: string, decision: 'AUTORIZAR' | 'RECHAZAR', finalPrice: number, comment: string) => void;
}

export const ProposalReview = ({ proposal, onBack, onAction }: Props) => {
  const [price, setPrice] = useState(proposal.precioSugerido);
  const [comment, setComment] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  const currentMargen = ((price - proposal.costoProduccion) / price) * 100;
  const isMargenLow = currentMargen < 60; // Ejemplo de umbral E1

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1a3d2e]/40 hover:text-[#1a3d2e] transition-colors">
        <ArrowLeft size={14} /> Volver a la lista
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* INFO GENERAL */}
          <section className="bg-white p-10 rounded-[3rem] border border-[#1a3d2e]/10 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-[10px] font-black uppercase text-[#C5A059] tracking-widest">{proposal.tipo}</span>
                <h2 className="font-headline text-4xl italic text-[#1a3d2e]">{proposal.nombre}</h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black opacity-30 uppercase">Propuesta de: {proposal.chef}</p>
                <p className="text-[10px] font-black opacity-30 uppercase">Fecha: {proposal.fechaEnvio}</p>
              </div>
            </div>

            {/* TABLA DE COSTOS (PASO 4) */}
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] font-black uppercase opacity-40 border-b border-[#1a3d2e]/5">
                  <th className="pb-4">Insumo / Receta</th>
                  <th className="pb-4">Costo Unit.</th>
                  <th className="pb-4 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="text-sm italic">
                {proposal.detalles.map((d, i) => (
                  <tr key={i} className="border-b border-[#1a3d2e]/5">
                    <td className="py-4 font-bold">{d.insumo}</td>
                    <td className="py-4">${d.costoUnitario}</td>
                    <td className="py-4 text-right font-bold">${d.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* EXCEPCIONES Y ALERTAS (E1, E2) */}
          {isMargenLow && (
            <div className="bg-[#ffdad6] p-6 rounded-[2rem] border border-[#ba1a1a]/20 flex items-center gap-4 text-[#ba1a1a]">
              <AlertTriangle size={24} />
              <div>
                <p className="text-[10px] font-black uppercase">Excepción E1: Margen Inferior al Mínimo</p>
                <p className="text-xs italic font-medium">Debe justificar en el log si decide autorizar con este margen.</p>
              </div>
            </div>
          )}
        </div>

        {/* ACCIONES FINANCIERAS (PASO 5, 6) */}
        <aside className="space-y-6">
          <div className="bg-[#1a3d2e] text-white p-10 rounded-[3rem] shadow-2xl space-y-8 sticky top-24">
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase opacity-40 tracking-widest">Costo Producción</p>
              <p className="font-headline text-4xl italic">${proposal.costoProduccion.toLocaleString()}</p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <label className="text-[9px] font-black uppercase opacity-40 tracking-widest">Ajustar Precio Final (S1)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-headline text-2xl">$</span>
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 text-center font-headline text-4xl outline-none focus:border-[#C5A059]"
                />
              </div>
              <p className="text-center text-[10px] font-black uppercase text-[#C5A059]">Margen Real: {currentMargen.toFixed(1)}%</p>
            </div>

            <div className="space-y-3">
              <textarea 
                placeholder="Comentarios obligatorios (S2 / E1)..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs italic outline-none min-h-[100px]"
              />
              <button 
                onClick={() => onAction(proposal.id, 'AUTORIZAR', price, comment)}
                className="w-full py-5 bg-[#C5A059] text-[#1a3d2e] rounded-full font-label text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl"
              >
                Autorizar {price !== proposal.precioSugerido ? 'con Modif.' : ''}
              </button>
              <button 
                onClick={() => { if(!comment) alert("Comentario obligatorio"); else onAction(proposal.id, 'RECHAZAR', price, comment)}}
                className="w-full py-4 text-[#ffdad6]/60 text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors"
              >
                Rechazar Propuesta
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};