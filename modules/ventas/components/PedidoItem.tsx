// src/modules/ventas/components/PedidoItem.tsx
import { DetallePedido } from '../types/pedido';

interface Props {
  detalle: DetallePedido;
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, qty: number) => void; // Punto B 
  onUpdateNota: (id: number, nota: string) => void; // Punto C 
}

export const PedidoItem = ({ detalle, onRemove, onUpdateQty, onUpdateNota }: Props) => {
  return (
    <div className="flex flex-col border-b-2 border-gray-400 py-3 bg-white px-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          {/* Selector de Cantidad (Requisito B)  */}
          <div className="flex border border-gray-800">
            <button onClick={() => onUpdateQty(detalle.productoId, detalle.cantidad - 1)} className="px-2 bg-gray-200">-</button>
            <span className="px-3 font-mono font-bold border-x border-gray-800">{detalle.cantidad}</span>
            <button onClick={() => onUpdateQty(detalle.productoId, detalle.cantidad + 1)} className="px-2 bg-gray-200">+</button>
          </div>
          <span className="text-xs font-black uppercase">{detalle.producto?.nombre}</span>
        </div>
        <span className="text-sm font-mono font-bold">${detalle.subtotal}</span>
      </div>

      {/* Input de Notas Especiales (Requisito C)  */}
      <input 
        type="text"
        placeholder="Notas especiales (opcional)..."
        value={detalle.observaciones || ""}
        onChange={(e) => onUpdateNota(detalle.productoId, e.target.value)}
        className="text-[10px] w-full p-1 border border-gray-300 italic focus:border-gray-800 outline-none bg-gray-50"
      />

      <button 
        onClick={() => onRemove(detalle.productoId)}
        className="text-[9px] text-right mt-2 font-black text-gray-400 hover:text-black uppercase"
      >
        [ Eliminar ítem ]
      </button>
    </div>
  );
};