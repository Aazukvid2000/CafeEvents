// src/app/dashboard/cajero/page.tsx
'use client';
import { useState } from 'react';
import { MesasView } from '@/modules/ventas/views/MesasView';
import { PagoView } from '@/modules/ventas/views/PagoView';
import { CorteView } from '@/modules/ventas/views/CorteView'; // Nueva Vista
import { ConfirmModal } from '@/modules/ventas/components/ConfirmModal';
import { PEDIDOS_MOSTRADOR_MOCK } from '@/modules/ventas/mocks/pedido.mock';
import { MESAS_MOCK } from '@/modules/ventas/mocks/mesas.mock';

export default function CajeroDashboard() {
  const [mesaId, setMesaId] = useState<number | null>(null);
  const [pedidoId, setPedidoId] = useState<number | null>(null);
  const [viewActive, setViewActive] = useState(false);
  const [isCorteActive, setIsCorteActive] = useState(false); // Estado para el Corte
  const [searchId, setSearchId] = useState('');

  const [modalMode, setModalMode] = useState<'NONE' | 'MESA_VACIA' | 'BUSQUEDA_FALLIDA'>('NONE');

  const handleSelectMesa = (id: number) => {
    const mesa = MESAS_MOCK.find(m => m.id === id);
    if (mesa?.disponible) {
      setModalMode('MESA_VACIA');
      return;
    }
    setMesaId(id);
    setPedidoId(null);
    setViewActive(true);
  };

  const handleSelectPedidoMostrador = (id: number) => {
    setPedidoId(id);
    setMesaId(null);
    setViewActive(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const pedidoEncontrado = PEDIDOS_MOSTRADOR_MOCK.find(p => p.id === Number(searchId));
    if (pedidoEncontrado) {
      handleSelectPedidoMostrador(pedidoEncontrado.id!);
    } else if (searchId === '101') {
      handleSelectMesa(2);
    } else {
      setModalMode('BUSQUEDA_FALLIDA');
    }
  };

  const handleReset = () => {
    setMesaId(null);
    setPedidoId(null);
    setViewActive(false);
    setIsCorteActive(false);
    setSearchId('');
  };

  // RENDERIZADO CONDICIONAL DE VISTAS (Prioridad Corte > Pago > Dashboard)
  if (isCorteActive) {
    return <CorteView onBack={() => setIsCorteActive(false)} onFinish={handleReset} />;
  }

  if (viewActive) {
    return <PagoView onBack={handleReset} onFinish={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-gray-200 font-sans border-4 border-black text-black">
      <div className="p-6 space-y-8">
        
        {/* HEADER DE CAJA ACTUALIZADO */}
        <div className="bg-black text-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black uppercase italic tracking-tighter">Terminal de Caja v1.0</h1>
            <button 
              onClick={() => setIsCorteActive(true)}
              className="bg-yellow-400 text-black px-4 py-1 text-[10px] font-black uppercase border-2 border-white hover:bg-yellow-500 transition-colors"
            >
              Realizar Corte [F12]
            </button>
          </div>

          <form onSubmit={handleSearch} className="flex bg-white p-1 border-2 border-gray-600">
            <input
              type="text"
              placeholder="BUSCAR ID DE PEDIDO..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="bg-transparent text-black px-4 py-2 text-xs font-mono outline-none w-48 uppercase font-bold"
            />
            <button className="bg-black text-white px-6 py-2 text-[10px] font-black uppercase hover:bg-gray-800">
              Buscar
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-black uppercase border-b-4 border-black pb-1 italic">📍 Monitoreo de Mesas</h2>
            <MesasView onSelectMesa={handleSelectMesa} onParaLlevar={() => { }} hideAction={true} />
          </div>

          <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col h-fit">
            <h2 className="text-sm font-black uppercase border-b-2 border-black pb-2 mb-4 italic flex justify-between">
              🛍️ Pendientes Mostrador
              <span className="bg-black text-white px-2 text-[10px]">{PEDIDOS_MOSTRADOR_MOCK.length}</span>
            </h2>
            <div className="space-y-3">
              {PEDIDOS_MOSTRADOR_MOCK.map((pedido) => (
                <button 
                  key={pedido.id} 
                  onClick={() => handleSelectPedidoMostrador(pedido.id!)} 
                  className="w-full border-2 border-black p-3 text-left hover:bg-yellow-50 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-black bg-black text-white px-1">ID: #{pedido.id}</span>
                    <span className="text-xs font-mono font-black">${pedido.total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm font-black uppercase truncate">{pedido.nombreCliente}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={modalMode === 'MESA_VACIA'}
        title="Mesa sin Consumo"
        message="Esta mesa se encuentra disponible. No hay una cuenta activa para procesar el pago."
        confirmText="Entendido"
        onConfirm={() => setModalMode('NONE')}
      />

      <ConfirmModal
        isOpen={modalMode === 'BUSQUEDA_FALLIDA'}
        title="Sin Resultados"
        message={`No se encontró el ID "${searchId}" en pedidos pendientes.`}
        type="danger"
        confirmText="Reintentar"
        onConfirm={() => setModalMode('NONE')}
        onCancel={() => setModalMode('NONE')}
      />

    </div>
  );
}