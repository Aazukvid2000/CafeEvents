// src/modules/ventas/components/MesaCard.tsx
import { Mesa } from '../types/mesa';
import { Users, ChevronRight, UtensilsCrossed, Hash } from 'lucide-react';

interface Props {
  mesa: Mesa;
  onClick: (id: number) => void;
}

export const MesaCard = ({ mesa, onClick }: Props) => {
  
  // ESTADO: OCUPADA / EN SERVICIO
  if (!mesa.disponible) {
    return (
      <div 
        onClick={() => onClick(mesa.id)}
        className="relative bg-[#4a5d4e] rounded-xl p-8 shadow-[0_20px_50px_rgba(51,69,55,0.15)] transition-all duration-500 cursor-pointer overflow-hidden group"
      >
        {/* Capa de textura sutil */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent group-hover:scale-110 transition-transform duration-700"></div>
        
        <div className="relative z-10 flex justify-between items-start mb-12">
          <div>
            <h3 className="font-headline text-3xl text-white font-medium tracking-widest mb-1 uppercase italic">
              MESA {mesa.numero}
            </h3>
            <div className="flex items-center gap-2 text-white/70 font-medium font-body">
              <Users size={14} />
              <span className="text-[10px] uppercase tracking-widest">Ocupada: {mesa.capacidad} Pers.</span>
            </div>
          </div>
          
          {/* BADGE DE ESTADO CON EL ID DEL PEDIDO */}
          <div className="flex flex-col items-end gap-2">
            <span className="bg-white/10 text-white text-[9px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-[0.2em] backdrop-blur-sm">
              En Servicio
            </span>
            {/* ID DEL PEDIDO: Resaltado sutilmente */}
            <div className="flex items-center gap-1 text-white/40 font-bold text-[9px] tracking-widest uppercase">
              <Hash size={10} />
              <span>Pedido #120{mesa.id}</span> 
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-end">
          <div className="space-y-1 font-body">
            <p className="text-[10px] text-white/50 uppercase tracking-widest">Sesión Activa</p>
            <p className="text-white text-sm font-semibold italic">Gestión de comanda...</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#334537] transition-all duration-500 shadow-lg">
            <UtensilsCrossed size={20} />
          </div>
        </div>
      </div>
    );
  }

  // ESTADO: DISPONIBLE
  return (
    <div 
      onClick={() => onClick(mesa.id)}
      className="group relative bg-[#fcf9f4] border border-[#334537]/10 rounded-xl p-8 shadow-[0_20px_50px_rgba(44,44,44,0.03)] hover:shadow-[0_20px_50px_rgba(44,44,44,0.08)] transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[220px]"
    >
      <div className="flex justify-between items-start mb-12">
        <div>
          <h3 className="font-headline text-3xl text-[#334537] font-medium tracking-widest mb-1 uppercase italic">
            MESA {mesa.numero}
          </h3>
          <div className="flex items-center gap-2 text-[#334537]/60 font-medium font-body">
            <Users size={14} />
            <span className="text-[10px] uppercase tracking-widest">Capacidad: {mesa.capacidad} Pers.</span>
          </div>
        </div>
        <span className="bg-[#334537]/5 text-[#334537] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.2em] border border-[#334537]/5">
          Disponible
        </span>
      </div>

      <div className="flex justify-between items-end">
        <div className="space-y-1 font-body">
          <p className="text-[10px] text-[#434843]/50 uppercase tracking-widest">Estado</p>
          <p className="text-[#334537] text-sm font-semibold italic">Libre para asignar</p>
        </div>
        <div className="w-12 h-12 rounded-full border border-[#334537]/20 flex items-center justify-center text-[#334537] group-hover:bg-[#334537] group-hover:text-white transition-all duration-500 shadow-sm">
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
};