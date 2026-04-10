import React from 'react';
import { ProposalStatus } from '../types/chef';
import { Clock, DollarSign, PieChart } from 'lucide-react';

interface ProposalCardProps {
  nombre: string;
  categoria: string;
  costo: number;
  precioSugerido: number;
  estado: ProposalStatus;
  fecha: string;
}

export const ProposalCard = ({ nombre, categoria, costo, precioSugerido, estado, fecha }: ProposalCardProps) => {
  const statusColors = {
    'Borrador': 'bg-gray-100 text-gray-600',
    'Pendiente de Autorización': 'bg-[#ffdea5] text-[#5d4201]',
    'Autorizado': 'bg-[#d3e8d5] text-[#0e1f13]',
    'Rechazado': 'bg-red-100 text-red-700'
  };

  return (
    <div className="group bg-white border border-[#e5e2dd] rounded-[2rem] p-6 hover:shadow-xl transition-all duration-500">
      <div className="flex justify-between items-start mb-6">
        <span className={`text-[9px] uppercase tracking-tighter font-bold px-3 py-1 rounded-full ${statusColors[estado]}`}>
          {estado}
        </span>
        <span className="text-[10px] text-[#5f5e5e] flex items-center gap-1">
          <Clock size={12} /> {new Date(fecha).toLocaleDateString()}
        </span>
      </div>

      <h3 className="font-headline text-2xl text-[#334537] mb-1 italic">{nombre}</h3>
      <p className="text-[10px] uppercase tracking-widest text-[#4a5d4e] mb-6 font-bold">{categoria}</p>

      <div className="grid grid-cols-2 gap-4 py-4 border-t border-[#f0ede8]">
        <div className="space-y-1">
          <p className="text-[9px] text-[#5f5e5e] uppercase tracking-widest">Costo Prod.</p>
          <p className="font-body font-bold text-[#334537] flex items-center gap-1">
            <DollarSign size={14} /> {costo.toFixed(2)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[9px] text-[#5f5e5e] uppercase tracking-widest">P. Sugerido</p>
          <p className="font-body font-bold text-[#4a5d4e] flex items-center gap-1">
            <DollarSign size={14} /> {precioSugerido.toFixed(2)}
          </p>
        </div>
      </div>

      <button className="w-full mt-4 py-3 rounded-full border border-[#334537] text-[#334537] text-[10px] uppercase tracking-widest font-bold group-hover:bg-[#334537] group-hover:text-white transition-all">
        Editar Propuesta
      </button>
    </div>
  );
};