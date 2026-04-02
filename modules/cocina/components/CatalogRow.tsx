'use client';

import React from 'react';
import { Edit3, Eye, TrendingDown, TrendingUp } from 'lucide-react';
import { BaseCategory } from '../types/chef';

interface CatalogRowProps {
  nombre: string;
  categoria: BaseCategory;
  costo: number;
  precioVenta: number;
  margen: number;
  onEdit: () => void; // Esta función abrirá el modal
}

export const CatalogRow = ({ nombre, categoria, costo, precioVenta, margen, onEdit }: CatalogRowProps) => {
  const isLowMargin = margen < 70;

  return (
    <tr className="group border-b border-[#f0ede8] hover:bg-[#f6f3ee]/50 transition-colors cursor-pointer" onClick={onEdit}>
      <td className="py-5 pl-8">
        <div className="flex flex-col">
          <span className="font-headline text-lg text-[#1a3d2e] italic">{nombre}</span>
          <span className="text-[9px] uppercase tracking-widest text-[#434843]/50 font-bold">{categoria}</span>
        </div>
      </td>
      <td className="py-5 font-body text-sm text-[#1a3d2e] font-medium">${costo.toFixed(2)}</td>
      <td className="py-5 font-body text-sm text-[#1a3d2e] font-medium">${precioVenta.toFixed(2)}</td>
      <td className="py-5">
        <div className={`flex items-center gap-2 font-bold text-sm ${isLowMargin ? 'text-red-600' : 'text-[#4a5d4e]'}`}>
          {margen}%
          {isLowMargin ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
        </div>
      </td>
      <td className="py-5 pr-8 text-right">
        <div className="flex justify-end gap-2">
          {/* Botón para ver/editar que activa el modal */}
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Evita que se dispare el click de la fila
              onEdit();
            }}
            className="p-2 bg-[#f6f3ee] text-[#1a3d2e] rounded-full hover:bg-[#1a3d2e] hover:text-white transition-all shadow-sm"
          >
            <Eye size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};