'use client';
import React from 'react';
import { Calendar, Clock, User, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { Reservacion } from '../types/gerente';

interface ReservationCardProps {
  reservation: Reservacion;
  onManage: (res: Reservacion) => void;
  onInvoice: (res: Reservacion) => void; // Nueva prop para facturar
}

export const ReservationCard = ({ reservation, onManage, onInvoice }: ReservationCardProps) => {
  const isPaid = reservation.estado === 'PAGADA_TOTAL';
  const isConfirmed = reservation.estado === 'CONFIRMADA' || isPaid;
  const hasMinAnticipo = reservation.anticipoPagado >= (reservation.costoTotal * 0.5);

  return (
    <div className="bg-white border border-[#e5e2dd] rounded-[2.5rem] p-8 space-y-6 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
      
      {/* Badge de Estado */}
      <div className="flex justify-between items-start">
        <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${
          isPaid 
            ? 'bg-[#d3e8d5] text-[#1a3d2e]' 
            : isConfirmed 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-orange-100 text-orange-800 animate-pulse'
        }`}>
          {isPaid ? 'Pagada Total' : isConfirmed ? 'Confirmada' : 'Pendiente Anticipo'} 
        </span>
        
        {/* BOTÓN DE FACTURA: Solo visible si está pagada */}
        {isPaid && (
          <button 
            onClick={(e) => { e.stopPropagation(); onInvoice(reservation); }}
            className="p-2 bg-[#fcf9f4] text-[#1a3d2e] rounded-xl border border-[#1a3d2e]/10 hover:bg-[#1a3d2e] hover:text-white transition-all shadow-sm group/btn"
            title="Generar Factura CFDI"
          >
            <FileText size={16} />
          </button>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-headline italic text-3xl text-[#1a3d2e] group-hover:text-[#C5A059] transition-colors">
          {reservation.cliente.nombre}
        </h3>
        <div className="flex items-center gap-4 text-[#5f5e5e] text-[10px] font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1"><Calendar size={12}/> {reservation.fechaEvento}</span>
          <span className="flex items-center gap-1"><Clock size={12}/> {reservation.horaEvento}</span>
        </div>
      </div>

      <div className="py-6 border-y border-[#f0ede8] grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-[9px] uppercase font-black text-[#434843]/40 tracking-tighter">Monto Total</p>
          <p className="font-body font-bold text-[#1a3d2e] text-lg">${reservation.costoTotal.toLocaleString()}</p>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-[9px] uppercase font-black text-[#434843]/40 tracking-tighter italic">Estatus Pago</p>
          <p className={`font-body font-bold text-lg flex items-center justify-end gap-1 ${isPaid ? 'text-[#1a3d2e]' : 'text-orange-600'}`}>
            {isPaid && <CheckCircle2 size={14} />}
            {isPaid ? 'Liquidado' : `$${reservation.anticipoPagado.toLocaleString()}`}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#5f5e5e] italic">
          <User size={14} className="opacity-40" /> {reservation.cliente.correo}
        </div>
      </div>

      <button 
        onClick={() => onManage(reservation)}
        className="w-full py-4 rounded-full bg-[#1a3d2e] text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-[#263329] transition-all shadow-lg active:scale-95"
      >
        {isPaid ? 'Detalles del Evento' : 'Gestionar Evento'} <ArrowRight size={14} />
      </button>
    </div>
  );
};