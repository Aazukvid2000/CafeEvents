// src/modules/ventas/views/PedidoView.tsx
import { useState, useMemo } from 'react';
import { PRODUCTOS_MOCK } from '../mocks/productos.mock';
import { PEDIDO_ACTIVO_MOCK, PEDIDOS_MOSTRADOR_MOCK } from '../mocks/pedido.mock';
import { ProductCard } from '../components/ProductCard';
import { PedidoList } from '../components/PedidoList';
import { OrderSummary } from '../components/OrderSummary';
import { ConfirmModal } from '../components/ConfirmModal';
import { usePedido } from '../hooks/usePedido';

interface Props {
  mesaId: number | null;
  pedidoId?: number | null;
  onBack: () => void;
}

export const PedidoView = ({ mesaId, pedidoId, onBack }: Props) => {
  // 1. RECUPERACIÓN DE DATOS INICIALES
  const pedidoExistente = useMemo(() => {
    return mesaId === 2 
      ? PEDIDO_ACTIVO_MOCK 
      : PEDIDOS_MOSTRADOR_MOCK.find(p => p.id === pedidoId);
  }, [mesaId, pedidoId]);

  const { 
    detalles, agregarProducto, eliminarProducto, actualizarNota, 
    actualizarCantidad, anularPedido, total, enviarPedido 
  } = usePedido(mesaId || 0, 1, pedidoExistente);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [nombreCliente, setNombreCliente] = useState(pedidoExistente?.nombreCliente || '');
  const [modalOpen, setModalOpen] = useState<'NONE' | 'CONFIRM_ENVIO' | 'CONFIRM_ANULAR' | 'SUCCESS' | 'ERROR_LLEVAR'>('NONE');

  const categorias = ['Todas', ...new Set(PRODUCTOS_MOCK.map(p => p.categoria))];

  // 2. LÓGICA DE SALIDA INTELIGENTE (PREVIENE MODAL INNECESARIO)
  const handleBackWithGuard = () => {
    // Verificamos si la cantidad de items cambió respecto al original
    const initialCount = pedidoExistente?.detalles.length || 0;
    const currentCount = detalles.length;

    // Si no hay productos nuevos y la cuenta de items es la misma que al entrar, salimos directo
    if (currentCount === 0 || (pedidoExistente && JSON.stringify(detalles) === JSON.stringify(pedidoExistente.detalles))) {
      onBack();
    } else {
      setModalOpen('CONFIRM_ANULAR');
    }
  };

  // 3. LÓGICA DE ENVÍO
  const handleConfirmEnvio = () => {
    if (!mesaId && !nombreCliente.trim()) {
      setModalOpen('ERROR_LLEVAR');
      return;
    }
    enviarPedido();
    setModalOpen('SUCCESS');
  };

  // ID para mostrar en el éxito (si es nuevo simulamos el 107)
  const displayId = pedidoExistente?.id || 107;

  return (
    <div className="flex h-screen bg-gray-300 overflow-hidden font-sans border-4 border-gray-900 text-gray-900">
      
      <div className="w-2/3 flex flex-col border-r-4 border-gray-800 bg-white">
        <nav className="p-4 bg-gray-900 text-white flex justify-between items-center">
          <button 
            onClick={handleBackWithGuard} 
            className="text-[10px] font-black border border-white px-3 py-1 uppercase hover:bg-white hover:text-black transition-all"
          >
            {detalles.length > 0 ? "← ANULAR / VOLVER" : "← VOLVER"}
          </button>
          <div className="text-right">
            <span className="font-black text-xl italic uppercase block leading-none">
              {mesaId ? `Mesa ${mesaId}` : "Orden Para Llevar"}
            </span>
            <span className="text-[9px] font-bold text-gray-400 uppercase">
              ID Pedido: {pedidoExistente?.id || '---'} {pedidoExistente ? '• EN SERVICIO' : '• NUEVO'}
            </span>
          </div>
        </nav>

        {!mesaId && (
          <div className="p-4 bg-yellow-100 border-b-4 border-gray-800">
            <label className="text-[10px] font-black block mb-1 uppercase text-gray-700">Nombre del Cliente (*)</label>
            <input 
              type="text" 
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              disabled={!!pedidoExistente}
              className={`w-full p-3 border-4 border-gray-800 font-mono text-sm outline-none uppercase font-bold
                ${pedidoExistente ? 'bg-gray-200 cursor-not-allowed' : 'bg-white focus:bg-yellow-50'}`}
              placeholder="CAMPO OBLIGATORIO"
            />
          </div>
        )}

        <div className="flex bg-gray-100 border-b-2 border-gray-800 overflow-x-auto">
          {categorias.map(cat => (
            <button key={cat} onClick={() => setCategoriaSeleccionada(cat)}
              className={`px-6 py-3 text-[10px] font-black uppercase border-r border-gray-800
                ${categoriaSeleccionada === cat ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 overflow-y-auto grid grid-cols-2 gap-4 bg-gray-50">
          {PRODUCTOS_MOCK.filter(p => categoriaSeleccionada === 'Todas' || p.categoria === categoriaSeleccionada).map(prod => (
            <ProductCard key={prod.id} producto={prod} onAdd={agregarProducto} />
          ))}
        </div>
      </div>

      <div className="w-1/3 flex flex-col bg-white shadow-2xl">
        {pedidoExistente && (
          <div className="bg-gray-800 text-white p-1 text-[9px] font-black text-center uppercase tracking-widest">
            Editando Pedido #{pedidoExistente.id}
          </div>
        )}
        <PedidoList detalles={detalles} onRemoveItem={eliminarProducto} onUpdateQty={actualizarCantidad} onUpdateNota={actualizarNota} />
        <OrderSummary total={total} onConfirm={handleConfirmEnvio} onCancel={handleBackWithGuard} disabled={detalles.length === 0} />
      </div>

      {/* MODALES CON IDENTIFICADORES */}
      <ConfirmModal 
        isOpen={modalOpen === 'CONFIRM_ENVIO'} 
        title="Enviar a Cocina" 
        message={`¿Desea enviar la comanda del pedido #${displayId} a preparación?`} 
        onConfirm={handleConfirmEnvio} 
        onCancel={() => setModalOpen('NONE')} 
      />

      <ConfirmModal 
        isOpen={modalOpen === 'CONFIRM_ANULAR'} 
        title="Descartar Cambios" 
        message="Se perderán las modificaciones no enviadas. ¿Desea salir de todos modos?" 
        type="danger" 
        confirmText="Sí, Salir"
        onConfirm={() => { anularPedido(); onBack(); }} 
        onCancel={() => setModalOpen('NONE')} 
      />

      <ConfirmModal 
        isOpen={modalOpen === 'SUCCESS'} 
        title="¡Comanda Enviada!" 
        message={`El pedido #${displayId} ha sido registrado y enviado a cocina correctamente.`} 
        confirmText="Aceptar" 
        onConfirm={() => { setModalOpen('NONE'); onBack(); }} 
        onCancel={() => { setModalOpen('NONE'); onBack(); }} 
      />

      <ConfirmModal 
        isOpen={modalOpen === 'ERROR_LLEVAR'} 
        title="Datos Faltantes" 
        message="El nombre del cliente es obligatorio para órdenes 'Para Llevar'." 
        type="danger" 
        onConfirm={() => setModalOpen('NONE')} 
        onCancel={() => setModalOpen('NONE')} 
      />
    </div>
  );
};