'use client';
import React from 'react';
import { Receipt, AlertCircle, ArrowUpRight } from 'lucide-react';
import { ProviderPayment } from '../types/contador'; // Asegúrate de que apunte a tus tipos actuales

interface ProviderPaymentCardProps {
  payment: ProviderPayment;
  onEdit: () => void; // Definimos la propiedad faltante
}

export const ProviderPaymentCard = ({ payment, onEdit }: ProviderPaymentCardProps) => {
  const isMissingInvoice = payment.estado === 'Sin Factura';

  return (
    <div className={`p-6 rounded-[2rem] border-2 transition-all ${
      isMissingInvoice ? 'border-orange-100 bg-orange-50/30' : 'border-[#f0ede8] bg-white hover:border-[#1a3d2e]/20'
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-white rounded-xl shadow-sm text-[#334537]">
          <Receipt size={20} />
        </div>
        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
          isMissingInvoice ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
        }`}>
          {payment.estado}
        </span>
      </div>

      <div className="space-y-1 mb-6">
        <h4 className="font-headline italic text-xl text-[#334537]">{payment.proveedorNombre}</h4>
        <p className="text-xs text-[#5f5e5e] font-medium leading-relaxed line-clamp-1">{payment.descripcion}</p>
      </div>

      <div className="flex justify-between items-end border-t border-[#f0ede8] pt-4">
        <div>
          <p className="text-[9px] uppercase font-black text-[#434843]/40 tracking-tighter">Monto Liquidado</p>
          <p className="font-body font-bold text-[#1a3d2e] text-lg">${payment.monto.toLocaleString()}</p>
        </div>
        {/* Conectamos la acción onEdit al botón */}
        <button 
          onClick={onEdit}
          className="p-2 rounded-full bg-[#1a3d2e] text-white hover:scale-110 transition-transform active:scale-95"
        >
          <ArrowUpRight size={16} />
        </button>
      </div>

      {isMissingInvoice && (
        <div className="mt-4 flex gap-2 items-center text-[10px] text-orange-700 font-bold italic animate-pulse">
          <AlertCircle size={12} /> Requiere carga de CFDI (Plazo 48h)
        </div>
      )}
    </div>
  );
};