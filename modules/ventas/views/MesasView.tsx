// src/modules/ventas/views/MesasView.tsx
import { MESAS_MOCK } from '../mocks/mesas.mock';
import { MesaCard } from '../components/MesaCard';
import { Plus } from 'lucide-react';

interface Props {
  onSelectMesa: (id: number) => void;
  onParaLlevar: () => void;
  hideAction?: boolean;
}

export const MesasView = ({ onSelectMesa, onParaLlevar, hideAction = false }: Props) => {
  // Cálculo de estadísticas rápidas para el contexto del mesero
  const totalMesas = MESAS_MOCK.length;
  const disponibles = MESAS_MOCK.filter(m => m.disponible).length;
  const enServicio = totalMesas - disponibles;

  return (
    <div className="flex flex-col gap-12 bg-transparent">
      
      {/* HEADER DE LA VISTA: Estilo Editorial */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl">
          <h1 className="font-headline text-5xl text-[#334537] font-light mb-4 italic tracking-wide">
            Plano de Mesas
          </h1>
          <p className="text-[#434843] font-body leading-relaxed text-sm">
            Gestión en tiempo real del salón principal. Monitoreo de disponibilidad y servicio activo para la optimización de la experiencia del cliente.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">

          {/* Botón de Acción Principal */}
          {!hideAction && (
            <button 
              onClick={onParaLlevar}
              className="flex items-center gap-2 bg-[#334537] text-white px-7 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#334537]/20 hover:bg-[#4a5d4e] transition-all active:scale-95"
            >
              <Plus size={14} />
              Orden para llevar
            </button>
          )}
        </div>
      </header>

      {/* GRID DE MESAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {MESAS_MOCK.map((mesa) => (
          <MesaCard 
            key={mesa.id} 
            mesa={mesa} 
            onClick={() => onSelectMesa(mesa.id)} 
          />
        ))}
      </div>
    </div>
  );
};