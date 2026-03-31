// src/modules/cocina/components/PropuestaCard.tsx
import { PropuestaProducto } from '../types/receta';

export const PropuestaCard = ({ propuesta }: { propuesta: PropuestaProducto }) => {
  const statusColors = {
    PENDIENTE: 'bg-yellow-400 text-black',
    APROBADO: 'bg-green-600 text-white',
    RECHAZADO: 'bg-red-600 text-white',
    BORRADOR: 'bg-gray-400 text-black'
  };

  return (
    <div className="bg-white border-4 border-gray-900 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[8px] font-black px-2 py-0.5 uppercase border border-gray-900 ${statusColors[propuesta.estado]}`}>
          {propuesta.estado}
        </span>
        <span className="text-[9px] font-mono font-bold text-gray-500">{propuesta.fechaCreacion}</span>
      </div>
      <h3 className="text-sm font-black uppercase italic truncate">{propuesta.nombre}</h3>
      <p className="text-[10px] text-gray-600 font-bold uppercase mb-4">{propuesta.categoria}</p>
      
      <div className="flex justify-between items-center border-t-2 border-gray-100 pt-2">
        <span className="text-[9px] font-black">COSTO: ${propuesta.costoAproximado}</span>
        <span className="text-[11px] font-black text-gray-900 italic">SUGERIDO: ${propuesta.precioSugerido}</span>
      </div>
    </div>
  );
};