// src/modules/ventas/views/MesasView.tsx
import { MESAS_MOCK } from '../mocks/mesas.mock';
import { MesaCard } from '../components/MesaCard';

interface Props {
  onSelectMesa: (id: number) => void;
  onParaLlevar: () => void;
  hideAction?: boolean; // NUEVA PROP: Para ocultar el botón en modo Caja
}

export const MesasView = ({ onSelectMesa, onParaLlevar, hideAction = false }: Props) => {
  return (
    <div className="bg-gray-300 p-8 border-4 border-gray-800 shadow-2xl">
      <div className="flex justify-between items-end border-b-4 border-gray-800 pb-4 mb-8">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Panel de Mesas</h1>
          <p className="text-xs font-bold uppercase text-gray-600">Seleccione mesa o - Para Llevar [Paso 1]</p>
        </div>
        
        {/* Solo se muestra si NO está en modo ocultar (Cajero) */}
        {!hideAction && (
          <button 
            onClick={onParaLlevar}
            className="bg-gray-900 text-white px-6 py-3 font-black text-xs uppercase hover:bg-gray-700 transition-colors border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            + Orden Para Llevar (S3)
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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