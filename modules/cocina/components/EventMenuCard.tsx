// src/modules/cocina/components/EventMenuCard.tsx
import { Edit3, Eye, Users } from 'lucide-react';
import { EventMenuProposal } from '../types/chef';

interface Props {
  menu: EventMenuProposal;
  onView: (menu: EventMenuProposal) => void;
}

export const EventMenuCard = ({ menu, onView }: Props) => {
  return (
    <div className="bg-white rounded-[2rem] p-8 border border-[#1a3d2e]/5 shadow-sm hover:shadow-xl transition-all group relative">
      <div className="flex justify-between items-start mb-6">
        <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest 
          ${menu.estado === 'Autorizado' ? 'bg-[#d3e8d5] text-[#1a3d2e]' : 'bg-[#ffdea5] text-[#5d4201]'}`}>
          {menu.estado}
        </span>
        
        {/* BOTÓN DE EDICIÓN / VER */}
        <button 
          onClick={() => onView(menu)}
          className="p-3 bg-[#f6f3ee] text-[#1a3d2e] rounded-full hover:bg-[#1a3d2e] hover:text-white transition-all shadow-sm"
        >
          <Edit3 size={18} strokeWidth={1.5} />
        </button>
      </div>

      <div className="space-y-2 mb-8">
        <h3 className="font-headline italic text-3xl text-[#1a3d2e] leading-none">{menu.nombre}</h3>
        <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">{menu.tipoEvento}</p>
      </div>

      <div className="flex justify-between items-end border-t border-[#1a3d2e]/5 pt-6">
        <div className="flex items-center gap-2 text-[#434843]/60">
          <Users size={16} />
          <span className="text-xs font-bold">{menu.paxMinimo}-{menu.paxMaximo} PAX</span>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-black uppercase text-[#434843]/30">Precio Sugerido</p>
          <p className="font-headline text-2xl text-[#1a3d2e]">${menu.precioSugeridoPorPax}</p>
        </div>
      </div>
    </div>
  );
};