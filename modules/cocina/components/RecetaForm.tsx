// src/modules/cocina/components/RecetaForm.tsx
import { PropuestaProducto, Ingrediente } from '../types/receta';

interface Props {
  propuesta: PropuestaProducto;
  onUpdate: (data: Partial<PropuestaProducto>) => void;
  onAddIngrediente: (ing: Ingrediente) => void;
  onRemoveIngrediente: (index: number) => void;
}

export const RecetaForm = ({ propuesta, onUpdate, onAddIngrediente, onRemoveIngrediente }: Props) => {
  return (
    <div className="bg-gray-100 border-4 border-gray-900 p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-6">
      <h2 className="text-2xl font-black uppercase italic border-b-4 border-gray-900 pb-2">Nueva Propuesta</h2>
      
      {/* Datos Generales */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-[10px] font-black uppercase text-gray-600">Nombre del Platillo</label>
          <input 
            className="border-2 border-gray-900 p-2 font-bold uppercase focus:bg-gray-300 outline-none"
            value={propuesta.nombre}
            onChange={(e) => onUpdate({ nombre: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] font-black uppercase text-gray-600">Precio Sugerido</label>
          <input 
            type="number"
            className="border-2 border-gray-900 p-2 font-mono font-bold focus:bg-gray-300 outline-none"
            value={propuesta.precioSugerido}
            onChange={(e) => onUpdate({ precioSugerido: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Gestión de Ingredientes */}
      <div className="bg-gray-300 p-4 border-2 border-gray-900">
        <h3 className="text-xs font-black uppercase mb-4 italic">Ingredientes y Porciones</h3>
        <ul className="space-y-2 mb-4">
          {propuesta.ingredientes.map((ing, idx) => (
            <li key={idx} className="bg-white border-2 border-gray-900 p-2 flex justify-between items-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-xs font-bold uppercase">{ing.nombre} - {ing.cantidad} {ing.unidadMedida}</span>
              <button 
                onClick={() => onRemoveIngrediente(idx)}
                className="text-[9px] bg-red-600 text-white px-2 py-1 font-black uppercase"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
        <button 
          onClick={() => onAddIngrediente({ nombre: 'Nuevo', cantidad: 0, unidadMedida: 'GR' })}
          className="w-full bg-gray-900 text-white py-2 text-[10px] font-black uppercase hover:bg-gray-700"
        >
          + Agregar Ingrediente
        </button>
      </div>

      {/* Instrucciones */}
      <div className="flex flex-col">
        <label className="text-[10px] font-black uppercase text-gray-600">Instrucciones de Preparación</label>
        <textarea 
          className="border-2 border-gray-900 p-2 h-24 font-bold focus:bg-gray-300 outline-none"
          value={propuesta.instrucciones}
          onChange={(e) => onUpdate({ instrucciones: e.target.value })}
        />
      </div>
    </div>
  );
};