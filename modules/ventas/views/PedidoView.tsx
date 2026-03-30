// src/modules/ventas/views/PedidoView.tsx
import { useState } from 'react';
import { PRODUCTOS_MOCK } from '../mocks/productos.mock';
import { MESAS_MOCK } from '../mocks/mesas.mock';
import { PEDIDO_ACTIVO_MOCK } from '../mocks/pedido.mock';
import { ProductCard } from '../components/ProductCard';
import { PedidoList } from '../components/PedidoList';
import { OrderSummary } from '../components/OrderSummary';
import { usePedido } from '../hooks/usePedido';

interface Props {
  mesaId: number | null;
  onBack: () => void;
}

export const PedidoView = ({ mesaId, onBack }: Props) => {
  const mesaInfo = MESAS_MOCK.find(m => m.id === mesaId);
  const initialPedido = (mesaId === 2) ? PEDIDO_ACTIVO_MOCK : undefined;

  const { 
    detalles, 
    agregarProducto, 
    eliminarProducto, 
    actualizarNota, 
    actualizarCantidad, 
    anularPedido,
    total, 
    enviarPedido 
  } = usePedido(mesaId || 0, 1, initialPedido);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [nombreCliente, setNombreCliente] = useState('');
  
  // --- NUEVO ESTADO PARA CONFIRMACIÓN ---
  const [mostrarExito, setMostrarExito] = useState(false);

  const categorias = ['Todas', ...new Set(PRODUCTOS_MOCK.map(p => p.categoria))];

  // Manejador para Enviar Pedido (Confirmación Visual)
  const handleConfirmarPedido = () => {
    enviarPedido(); // Lógica de tu hook
    setMostrarExito(true);
    
    // Auto-cerrar y volver después de 2 segundos (opcional)
    setTimeout(() => {
      setMostrarExito(false);
      onBack();
    }, 2000);
  };

  const handleAnular = () => {
    if (window.confirm("¿Está seguro de anular el pedido? Se descartarán todos los ítems.")) {
      anularPedido();
      onBack();
    }
  };

  return (
    <div className="relative flex h-screen bg-gray-300 overflow-hidden font-sans border-4 border-gray-900 text-gray-900">
      
      {/* --- MODAL DE CONFIRMACIÓN (OVERLAY) --- */}
      {mostrarExito && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-white border-4 border-gray-900 p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-black uppercase italic italic mb-2">¡Pedido Enviado!</h2>
            <p className="font-mono text-sm uppercase mb-4">La comanda ha sido enviada a cocina.</p>
            <button 
              onClick={onBack}
              className="bg-gray-900 text-white px-6 py-2 font-black uppercase text-xs hover:bg-gray-700"
            >
              Volver a Mesas
            </button>
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="w-2/3 flex flex-col border-r-4 border-gray-800 bg-white">
        <nav className="p-4 bg-gray-900 text-white flex justify-between items-center">
          <button onClick={onBack} className="text-[10px] font-black border border-white px-3 py-1 hover:bg-white hover:text-black uppercase">
            ← Volver
          </button>
          <div className="text-right">
            <span className="font-black text-xl italic uppercase block">
              {mesaId ? `Mesa ${mesaId}` : "Pedido Para Llevar"}
            </span>
          </div>
        </nav>

        {/* Categorías e Input de Cliente se mantienen igual... */}
        <div className="flex bg-gray-100 border-b-2 border-gray-800 overflow-x-auto">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaSeleccionada(cat)}
              className={`px-6 py-3 text-[10px] font-black uppercase border-r border-gray-800 
                ${categoriaSeleccionada === cat ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 overflow-y-auto grid grid-cols-2 xl:grid-cols-3 gap-4 bg-gray-50">
          {PRODUCTOS_MOCK
            .filter(p => categoriaSeleccionada === 'Todas' || p.categoria === categoriaSeleccionada)
            .map(prod => (
              <ProductCard key={prod.id} producto={prod} onAdd={agregarProducto} />
            ))}
        </div>
      </div>

      {/* LATERAL DERECHO: LISTA Y RESUMEN */}
      <div className="w-1/3 flex flex-col bg-white shadow-2xl">
        <PedidoList 
          detalles={detalles} 
          onRemoveItem={eliminarProducto}
          onUpdateQty={actualizarCantidad}
          onUpdateNota={actualizarNota}
        />

        <OrderSummary 
          total={total} 
          onConfirm={handleConfirmarPedido} // Usamos la nueva función con confirmación
          onCancel={handleAnular}
          disabled={detalles.length === 0 || (!mesaId && !nombreCliente)} 
        />
      </div>
    </div>
  );
};