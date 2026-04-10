'use client';
import { DetallePedido } from '../types/pedido';
import { PedidoItem } from './PedidoItem';
import { ReceiptText, ShoppingBag, Terminal } from 'lucide-react';

interface Props {
  detalles: DetallePedido[];
  onRemoveItem: (id: number) => void;
  onUpdateQty: (id: number, qty: number) => void;
  onUpdateNota: (id: number, nota: string) => void;
}

export const PedidoList = ({ detalles, onRemoveItem, onUpdateQty, onUpdateNota }: Props) => {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden h-full">
      
      {/* HEADER: Color exacto #1a241d con borde interno sutil */}
      <div className="h-28 bg-[#1a241d] px-8 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center">
            <ReceiptText size={18} className="text-[#ffdea5]" />
          </div>
          <div>
            <h2 className="font-headline text-lg text-white font-bold uppercase tracking-[0.2em]">
              Comanda Digital
            </h2>
          </div>
        </div>
        <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest border-l border-white/10 pl-4">
          Modo Edición
        </span>
      </div>

      {/* CUERPO: Fondo de contraste para que resalten los items */}
      <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar bg-white">
        {detalles.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-20 grayscale">
            <ShoppingBag size={48} strokeWidth={1} className="text-[#1a241d] mb-4" />
            <p className="font-headline text-2xl text-[#1a241d] italic">Ticket Vacío</p>
          </div>
        ) : (
          <div className="space-y-3">
            {detalles.map((detalle) => (
              <div key={detalle.productoId} className="animate-in fade-in slide-in-from-right-4 duration-300">
                <PedidoItem 
                  detalle={detalle} 
                  onRemove={onRemoveItem}
                  onUpdateQty={onUpdateQty}
                  onUpdateNota={onUpdateNota}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RESUMEN DE CARGA: Texto en #1a241d */}
      {detalles.length > 0 && (
        <div className="px-8 py-4 bg-white border-t border-[#1a241d]/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-[#1a241d]/30" />
            <span className="text-[10px] font-black text-[#1a241d]/40 uppercase tracking-widest">Resumen de Carga</span>
          </div>
          <span className="text-[11px] font-bold text-white bg-[#1a241d] px-3 py-1">
            {detalles.reduce((acc, curr) => acc + curr.cantidad, 0)} UNIDADES
          </span>
        </div>
      )}
    </div>
  );
};