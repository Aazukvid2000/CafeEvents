// src/modules/ventas/components/ProductCard.tsx
import { Producto } from '../types/producto';

interface Props {
  producto: Producto;
  onAdd: (p: Producto) => void;
}

export const ProductCard = ({ producto, onAdd }: Props) => {
  return (
    <div className="border border-gray-800 p-3 bg-white flex flex-col justify-between">
      <div>
        <p className="font-bold uppercase text-sm">{producto.nombre}</p>
        <p className="text-xs text-gray-600 italic line-clamp-2">{producto.descripcion}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-mono font-bold">${producto.precio}</span>
        <button 
          onClick={() => onAdd(producto)}
          disabled={!producto.disponible}
          className={`px-3 py-1 border border-gray-800 text-xs font-bold 
            ${producto.disponible ? 'bg-gray-800 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          {producto.disponible ? 'AÑADIR' : 'SIN STOCK'}
        </button>
      </div>
    </div>
  );
};