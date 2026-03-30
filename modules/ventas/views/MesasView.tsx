// src/modules/ventas/views/MesasView.tsx
import { MESAS_MOCK } from '../mocks/mesas.mock';
import { MesaCard } from '../components/MesaCard';

interface Props {
  onSelectMesa: (id: number) => void;
  onParaLlevar: () => void; // Nueva prop para el Flujo S3 
}

export const MesasView = ({ onSelectMesa, onParaLlevar }: Props) => {
  return (
    <div className="p-10 bg-gray-300 min-h-screen">
      <header className="border-b-4 border-gray-900 mb-8 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Panel de Mesas</h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase">Seleccione mesa o - Para Llevar [Paso 1]</p>
        </div>
        
        {/* Botón para Flujo S3: Para Llevar  */}
        <button 
          onClick={onParaLlevar}
          className="bg-gray-900 text-white px-6 py-3 font-black text-sm hover:bg-gray-700 border-2 border-gray-900 transition-all uppercase tracking-widest"
        >
          + Orden Para Llevar (S3)
        </button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {MESAS_MOCK.map((mesa) => (
          <MesaCard key={mesa.id} mesa={mesa} onClick={onSelectMesa} />
        ))}
      </div>
    </div>
  );
};