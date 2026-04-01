'use client';
import { CreditCard, ArrowRight, XCircle } from 'lucide-react';

interface Props {
  total: number;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
}

export const OrderSummary = ({ total, onConfirm, onCancel, disabled }: Props) => {
  return (
    <div className="bg-white p-8 border-t border-[#1a241d]/10 animate-in fade-in duration-500">
      
      {/* DESGLOSE: Más compacto y elegante */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex justify-between items-center text-[#434843]/50">
          <div className="flex items-center gap-2">
            <CreditCard size={12} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Monto Neto</span>
          </div>
          <span className="font-body text-xs font-medium">${(total / 1.16).toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-[#f6f3ee] text-[#434843]/50">
          <span className="text-[9px] font-bold uppercase tracking-widest">Impuestos (16%)</span>
          <span className="font-body text-xs font-medium">${(total - (total / 1.16)).toFixed(2)}</span>
        </div>

        {/* TOTAL: Redimensionado para armonía visual */}
        <div className="flex justify-between items-end pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a241d]">Total Comanda</span>
            <span className="text-[8px] text-[#434843]/40 font-bold uppercase tracking-tighter">MXN - Pesos Mexicanos</span>
          </div>
          <span className="font-headline text-3xl text-[#1a241d] font-medium tracking-tight">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
      
      {/* ACCIONES: Botones con altura reducida para mejor proporción */}
      <div className="grid grid-cols-6 gap-3">
        <button 
          onClick={onCancel}
          className="col-span-1 h-14 flex items-center justify-center bg-[#fcf9f4] text-[#ba1a1a] border border-[#ba1a1a]/10 hover:bg-[#ffdad6] transition-all active:scale-90"
          title="Anular pedido"
        >
          <XCircle size={20} />
        </button>

        <button 
          onClick={onConfirm}
          disabled={disabled}
          className={`col-span-5 h-14 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] transition-all
            ${disabled 
              ? 'bg-[#ebe8e3] text-[#c3c8c1] cursor-not-allowed shadow-none' 
              : 'bg-[#1a241d] text-white hover:bg-[#263329] active:scale-[0.98] shadow-lg shadow-[#1a241d]/10'
            }`}
        >
          <span>Confirmar Pedido</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};