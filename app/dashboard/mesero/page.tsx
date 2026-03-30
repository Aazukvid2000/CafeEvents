// src/app/dashboard/mesero/page.tsx
'use client';
import { useState } from 'react';
import { MesasView } from '@/modules/ventas/views/MesasView';
import { PedidoView } from '@/modules/ventas/views/PedidoView';
import { PEDIDOS_MOSTRADOR_MOCK } from '@/modules/ventas/mocks/pedido.mock';

export default function MeseroDashboard() {
  const [viewState, setViewState] = useState<{ 
    mesaId: number | null, 
    active: boolean,
    pedidoId?: number | null 
  }>({
    mesaId: null,
    active: false
  });

  // Función para volver al panel principal
  const handleBack = () => setViewState({ mesaId: null, active: false });

  if (!viewState.active) {
    return (
      <div className="min-h-screen bg-gray-200 p-6 flex flex-col gap-6">
        
        {/* HEADER DE BIENVENIDA */}
        <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-xl font-black uppercase italic">Panel del Mesero</h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase">Gestión de Mesas y Órdenes Rápidas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* SECCIÓN MESAS (Comedor) */}
          <div className="lg:col-span-3">
            <MesasView 
              onSelectMesa={(id) => setViewState({ mesaId: id, active: true })} 
              onParaLlevar={() => setViewState({ mesaId: null, active: true })} 
            />
          </div>

          {/* SECCIÓN ÓRDENES PENDIENTES (Mostrador) - Aquí solucionamos el problema */}
          <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col h-fit">
            <h2 className="text-xs font-black uppercase border-b-2 border-black pb-2 mb-4 italic">
              🛍️ Órdenes en Espera
            </h2>
            
            <div className="space-y-3">
              {PEDIDOS_MOSTRADOR_MOCK.map((pedido) => (
                <button
                  key={pedido.id}
                  onClick={() => setViewState({ mesaId: null, active: true, pedidoId: pedido.id })}
                  className="w-full border-2 border-black p-3 text-left hover:bg-yellow-50 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] font-black bg-black text-white px-1">#{pedido.id}</span>
                  </div>
                  <p className="text-xs font-black uppercase truncate">{pedido.nombreCliente}</p>
                  <div className="text-[8px] font-bold text-gray-400 mt-1 uppercase group-hover:text-black">
                    Editar / Cancelar →
                  </div>
                </button>
              ))}

              {PEDIDOS_MOSTRADOR_MOCK.length === 0 && (
                <p className="text-[9px] text-center text-gray-400 py-4 italic uppercase">No hay órdenes pendientes</p>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Fragmento del Dashboard
return (
  <PedidoView 
    mesaId={viewState.mesaId} 
    pedidoId={viewState.pedidoId} // PASAMOS EL ID SELECCIONADO
    onBack={handleBack} 
  />
);
}