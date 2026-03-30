// src/modules/ventas/components/PedidoList.tsx
import { DetallePedido } from '../types/pedido';
import { PedidoItem } from './PedidoItem';

interface Props {
  detalles: DetallePedido[];
  onRemoveItem: (id: number) => void;
  onUpdateQty: (id: number, qty: number) => void;
  onUpdateNota: (id: number, nota: string) => void;
}

export const PedidoList = ({ detalles, onRemoveItem, onUpdateQty, onUpdateNota }: Props) => {
  return (
    <div className="flex-1 flex flex-col bg-white border-x-2 border-gray-800 overflow-hidden">
      <div className="bg-gray-800 text-white p-2 text-[10px] font-black uppercase tracking-widest text-center">
        Resumen de Comanda Digital [Paso 4] 
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {detalles.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
            <p className="text-[10px] font-black italic uppercase">Sin productos seleccionados</p>
          </div>
        ) : (
          detalles.map((detalle) => (
            <PedidoItem 
              key={detalle.productoId} 
              detalle={detalle} 
              onRemove={onRemoveItem}
              onUpdateQty={onUpdateQty}
              onUpdateNota={onUpdateNota}
            />
          ))
        )}
      </div>
    </div>
  );
};