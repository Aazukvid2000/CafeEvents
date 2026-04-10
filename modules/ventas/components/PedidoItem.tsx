// src/modules/ventas/components/PedidoItem.tsx
import { DetallePedido } from '../types/pedido';
import { Minus, Plus, Trash2, MessageSquareText } from 'lucide-react';

interface Props {
  detalle: DetallePedido;
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, qty: number) => void; 
  onUpdateNota: (id: number, nota: string) => void; 
}

export const PedidoItem = ({ detalle, onRemove, onUpdateQty, onUpdateNota }: Props) => {
  
  // Manejador seguro para restar cantidad
  const handleDecrease = () => {
    if (detalle.cantidad > 1) {
      onUpdateQty(detalle.productoId, detalle.cantidad - 1);
    }
  };

  return (
    <div className="group flex flex-col bg-white p-4 rounded-2xl border border-[#c3c8c1]/20 shadow-sm hover:border-[#334537]/30 transition-all duration-300">
      
      {/* LÍNEA PRINCIPAL: NOMBRE Y PRECIO */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1">
          <span className="font-headline text-lg text-[#334537] italic font-medium leading-tight">
            {detalle.producto?.nombre}
          </span>
          <span className="text-[10px] text-[#434843]/50 font-bold uppercase tracking-widest">
            Precio Unitario: ${detalle.producto?.precio}
          </span>
        </div>
        <span className="font-headline text-xl text-[#334537] font-light">
          ${detalle.subtotal}
        </span>
      </div>

      {/* CONTROLES OPERATIVOS */}
      <div className="flex items-center justify-between gap-4">
        
        {/* Selector de Cantidad Refinado */}
        <div className="flex items-center bg-[#f6f3ee] rounded-full p-1 border border-[#c3c8c1]/10 shadow-inner">
          <button 
            onClick={handleDecrease}
            disabled={detalle.cantidad <= 1}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#334537] hover:bg-white hover:shadow-sm disabled:opacity-20 transition-all"
          >
            <Minus size={14} />
          </button>
          
          <span className="px-4 font-headline text-lg text-[#334537] italic min-w-[40px] text-center">
            {detalle.cantidad}
          </span>
          
          <button 
            onClick={() => onUpdateQty(detalle.productoId, detalle.cantidad + 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#334537] hover:bg-white hover:shadow-sm transition-all"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Botón de Eliminar con Icono */}
        <button 
          onClick={() => onRemove(detalle.productoId)}
          className="p-2 text-[#ba1a1a]/40 hover:text-[#ba1a1a] hover:bg-[#ba1a1a]/5 rounded-full transition-all"
          title="Eliminar producto"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* ÁREA DE NOTAS: Estilo Input Invisible */}
      <div className="mt-4 relative group/input">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#334537]/20 group-focus-within/input:text-[#334537]/60 transition-colors">
          <MessageSquareText size={12} />
        </div>
        <input 
          type="text"
          placeholder="Añadir nota especial (término, alergias)..."
          value={detalle.observaciones || ""}
          onChange={(e) => onUpdateNota(detalle.productoId, e.target.value)}
          className="w-full bg-transparent border-b border-[#c3c8c1]/20 focus:border-[#334537]/40 py-2 pl-5 text-[11px] font-body text-[#434843] italic outline-none placeholder:text-[#434843]/30 transition-all"
        />
      </div>

      {/* Decoración sutil de item activo */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#334537] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};