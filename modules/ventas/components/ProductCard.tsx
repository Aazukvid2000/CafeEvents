// src/modules/ventas/components/ProductCard.tsx
import { Producto } from '../types/producto';
import { Plus, MinusCircle } from 'lucide-react';

interface Props {
  producto: Producto;
  onAdd: (p: Producto) => void;
}

export const ProductCard = ({ producto, onAdd }: Props) => {
  return (
    <div className={`group relative bg-white rounded-2xl p-6 border border-[#c3c8c1]/20 shadow-[0_10px_30px_rgba(44,44,44,0.02)] transition-all duration-500 flex flex-col justify-between h-full ${
      !producto.disponible ? 'opacity-60 grayscale' : 'hover:shadow-xl hover:border-[#334537]/20 hover:-translate-y-1'
    }`}>
      
      {/* DETALLE DEL PRODUCTO */}
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-headline text-xl text-[#334537] italic font-medium leading-tight group-hover:text-[#563d00] transition-colors">
            {producto.nombre}
          </h3>
          <span className="font-headline text-lg text-[#334537]/80 font-light">
            ${producto.precio}
          </span>
        </div>
        
        <p className="font-body text-[11px] text-[#434843]/70 leading-relaxed italic line-clamp-2">
          {producto.descripcion}
        </p>
      </div>

      {/* ACCIÓN Y ESTADO */}
      <div className="mt-8 flex justify-between items-center border-t border-[#f6f3ee] pt-4">
        {producto.disponible ? (
          <>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#334537]/40 font-bold">
              Disponible
            </span>
            <button 
              onClick={() => onAdd(producto)}
              className="bg-[#334537] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-[#334537]/20 hover:bg-[#4a5d4e] hover:scale-110 transition-all duration-300 active:scale-95"
              title="Añadir al pedido"
            >
              <Plus size={18} />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2 text-[#ba1a1a]/60">
            <MinusCircle size={14} />
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold italic">
              Agotado hoy
            </span>
          </div>
        )}
      </div>

      {/* Decoración sutil: Punto de categoría */}
      <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-[#ffdea5] opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};