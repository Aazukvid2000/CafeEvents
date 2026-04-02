import React from 'react';
import { Trash2 } from 'lucide-react';

interface IngredientRowProps {
  nombre: string;
  cantidad: number;
  unidad: string;
  costoUnitario: number;
  subtotal: number;
  onRemove?: () => void;
}

export const IngredientRow = ({ nombre, cantidad, unidad, costoUnitario, subtotal, onRemove }: IngredientRowProps) => (
  <div className="flex items-center justify-between py-4 border-b border-[#f0ede8] group hover:bg-[#fcf9f4] px-4 transition-colors">
    <div className="flex-1">
      <p className="text-sm font-bold text-[#334537]">{nombre}</p>
      <p className="text-[10px] text-[#5f5e5e] uppercase tracking-widest">Costo: ${costoUnitario} / {unidad}</p>
    </div>
    <div className="flex items-center gap-8">
      <div className="text-right">
        <p className="text-sm font-body text-[#334537]">{cantidad} {unidad}</p>
      </div>
      <div className="text-right w-24">
        <p className="text-sm font-bold text-[#4a5d4e]">${subtotal.toFixed(2)}</p>
      </div>
      {onRemove && (
        <button onClick={onRemove} className="text-red-300 hover:text-red-600 transition-colors">
          <Trash2 size={16} />
        </button>
      )}
    </div>
  </div>
);