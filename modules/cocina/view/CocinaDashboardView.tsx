// src/modules/cocina/views/CocinaDashboardView.tsx
'use client';
import { useState } from 'react';
import { PropuestaCard } from '../components/PropuestaCard';
import { PropuestaView } from './PropuestaView'; // El formulario que hicimos antes
import { MIS_PROPUESTAS_MOCK } from '../mocks/propuesta.mock';

export const CocinaDashboardView = () => {
  const [isCreating, setIsCreating] = useState(false);

  // Si el chef le da a "Crear", mostramos la vista de propuesta/receta
  if (isCreating) {
    return <PropuestaView onBack={() => setIsCreating(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-400 p-8 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER CHEF */}
        <header className="bg-gray-900 text-white p-6 border-4 border-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">I+D Cocina (Chef)</h1>
            <p className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Gestión de Recetas y Nuevos Productos</p>
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-white text-black px-8 py-3 font-black text-xs uppercase hover:bg-yellow-400 border-2 border-black transition-all"
          >
            + Proponer Nuevo Producto
          </button>
        </header>

        {/* ESTADÍSTICAS RÁPIDAS (Grises industriales) */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-300 border-4 border-gray-900 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
            <p className="text-[10px] font-black uppercase">Pendientes</p>
            <p className="text-3xl font-black">01</p>
          </div>
          <div className="bg-gray-300 border-4 border-gray-900 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
            <p className="text-[10px] font-black uppercase text-green-700">Aprobadas</p>
            <p className="text-3xl font-black text-green-700">12</p>
          </div>
          <div className="bg-gray-300 border-4 border-gray-900 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
            <p className="text-[10px] font-black uppercase text-red-700">Rechazadas</p>
            <p className="text-3xl font-black text-red-700">03</p>
          </div>
        </div>

        {/* LISTADO DE PROPUESTAS */}
        <section className="space-y-4">
          <h2 className="text-sm font-black uppercase border-b-4 border-gray-900 pb-1 italic">Historial de Propuestas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MIS_PROPUESTAS_MOCK.map((p) => (
              <PropuestaCard key={p.id} propuesta={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};