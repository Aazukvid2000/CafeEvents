// src/modules/ventas/views/PedidoView.tsx
import { useState } from 'react';
import { PRODUCTOS_MOCK } from '../mocks/productos.mock';
import { MESAS_MOCK } from '../mocks/mesas.mock';
import { PEDIDO_ACTIVO_MOCK } from '../mocks/pedido.mock';
import { ProductCard } from '../components/ProductCard';
import { PedidoList } from '../components/PedidoList';
import { OrderSummary } from '../components/OrderSummary';
import { ConfirmModal } from '../components/ConfirmModal'; // Tu componente personalizado
import { usePedido } from '../hooks/usePedido';

interface Props {
  mesaId: number | null;
  onBack: () => void;
}

export const PedidoView = ({ mesaId, onBack }: Props) => {
  const initialPedido = (mesaId === 2) ? PEDIDO_ACTIVO_MOCK : undefined;

  const { 
    detalles, agregarProducto, eliminarProducto, actualizarNota, 
    actualizarCantidad, anularPedido, total, enviarPedido 
  } = usePedido(mesaId || 0, 1, initialPedido);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [nombreCliente, setNombreCliente] = useState('');
  
  // ESTADO PARA CONTROLAR QUÉ MODAL MOSTRAR
  const [modalOpen, setModalOpen] = useState<'NONE' | 'CONFIRM_ENVIO' | 'CONFIRM_ANULAR' | 'SUCCESS' | 'ERROR_LLEVAR'>('NONE');

  const categorias = ['Todas', ...new Set(PRODUCTOS_MOCK.map(p => p.categoria))];

  // Acción: Confirmar Envío (Paso 8)
  const handlePreConfirmar = () => {
    // Validación S3: Nombre obligatorio para llevar
    if (!mesaId && !nombreCliente.trim()) {
      setModalOpen('ERROR_LLEVAR');
      return;
    }
    setModalOpen('CONFIRM_ENVIO');
  };

  const onConfirmarEnvio = () => {
    enviarPedido();
    setModalOpen('SUCCESS');
  };

  const onConfirmarAnulacion = () => {
    anularPedido();
    onBack();
  };

  return (
    <div className="flex h-screen bg-gray-300 overflow-hidden font-sans border-4 border-gray-900 text-gray-900">
      
      <div className="w-2/3 flex flex-col border-r-4 border-gray-800 bg-white">
        <nav className="p-4 bg-gray-900 text-white flex justify-between items-center">
          <button onClick={() => setModalOpen('CONFIRM_ANULAR')} className="text-[10px] font-black border border-white px-3 py-1 uppercase hover:bg-white hover:text-black">
            ← ANULAR / VOLVER
          </button>
          <div className="text-right">
            <span className="font-black text-xl italic uppercase block leading-none">
              {mesaId ? `Mesa ${mesaId}` : "Orden Para Llevar (S3)"}
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
              className="w-full p-3 border-4 border-gray-800 bg-white font-mono text-sm focus:bg-yellow-50 outline-none uppercase font-bold"
              placeholder="CAMPO OBLIGATORIO"
            />
          </div>
        )}

        <div className="flex bg-gray-100 border-b-2 border-gray-800 overflow-x-auto">
          {categorias.map(cat => (
            <button key={cat} onClick={() => setCategoriaSeleccionada(cat)}
              className={`px-6 py-3 text-[10px] font-black uppercase border-r border-gray-800 transition-colors
                ${categoriaSeleccionada === cat ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 hover:bg-gray-200'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 overflow-y-auto grid grid-cols-2 xl:grid-cols-3 gap-4 bg-gray-50">
          {PRODUCTOS_MOCK.filter(p => categoriaSeleccionada === 'Todas' || p.categoria === categoriaSeleccionada).map(prod => (
            <ProductCard key={prod.id} producto={prod} onAdd={agregarProducto} />
          ))}
        </div>
      </div>

      <div className="w-1/3 flex flex-col bg-white shadow-2xl">
        <PedidoList 
          detalles={detalles} 
          onRemoveItem={eliminarProducto} 
          onUpdateQty={actualizarCantidad} 
          onUpdateNota={actualizarNota} 
        />
        
        <OrderSummary 
          total={total} 
          onConfirm={handlePreConfirmar} 
          onCancel={() => setModalOpen('CONFIRM_ANULAR')} 
          disabled={detalles.length === 0} 
        />
      </div>

      {/* --- MODALES PRESENTABLES (SIN ALERT/CONFIRM DE SISTEMA) --- */}

      {/* Confirmar Envío a Cocina */}
      <ConfirmModal 
        isOpen={modalOpen === 'CONFIRM_ENVIO'}
        title="Enviar a Cocina"
        message="¿Desea enviar esta comanda digital a la cocina? [Paso 8]"
        onConfirm={onConfirmarEnvio}
        onCancel={() => setModalOpen('NONE')}
      />

      {/* Confirmar Anulación */}
      <ConfirmModal 
        isOpen={modalOpen === 'CONFIRM_ANULAR'}
        title="Anular Pedido"
        message="¿Está seguro? Se borrarán todos los productos seleccionados. [S2]"
        type="danger"
        confirmText="Sí, Anular"
        onConfirm={onConfirmarAnulacion}
        onCancel={() => setModalOpen('NONE')}
      />

      {/* Éxito al Enviar */}
      <ConfirmModal 
        isOpen={modalOpen === 'SUCCESS'}
        title="¡Éxito!"
        message="El pedido ha sido enviado exitosamente a cocina. [Paso 9]"
        confirmText="Entendido"
        onConfirm={() => { setModalOpen('NONE'); onBack(); }}
        onCancel={() => { setModalOpen('NONE'); onBack(); }}
      />

      {/* Error: Nombre faltante en S3 */}
      <ConfirmModal 
        isOpen={modalOpen === 'ERROR_LLEVAR'}
        title="Faltan Datos"
        message="Para órdenes 'Para Llevar' el nombre del cliente es obligatorio. [S3]"
        type="danger"
        confirmText="Regresar"
        onConfirm={() => setModalOpen('NONE')}
        onCancel={() => setModalOpen('NONE')}
      />

    </div>
  );
};