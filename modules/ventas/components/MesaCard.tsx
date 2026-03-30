// src/modules/ventas/components/MesaCard.tsx
import { Mesa } from '../types/mesa';

interface Props {
  mesa: Mesa;
  onClick: (id: number) => void;
}

export const MesaCard = ({ mesa, onClick }: Props) => {
  // Estilo basado en disponibilidad (Regla de negocio: Disponible o En servicio)
  const bgColor = mesa.disponible ? 'bg-gray-100' : 'bg-gray-400';
  const borderStyle = mesa.disponible ? 'border-gray-800' : 'border-gray-500';

  return (
    <div 
      onClick={() => onClick(mesa.id)}
      className={`p-4 border-2 ${borderStyle} ${bgColor} cursor-pointer hover:bg-gray-200 transition-colors`}
    >
      <p className="font-bold text-lg">MESA {mesa.numero}</p>
      <p className="text-sm">Capacidad: {mesa.capacidad}</p>
      <p className="text-xs mt-2 uppercase font-semibold">
        {mesa.disponible ? 'Disponible' : 'En Servicio'}
      </p>
    </div>
  );
};