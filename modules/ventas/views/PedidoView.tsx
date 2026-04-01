'use client';

import { useState, useMemo } from 'react';
import { PRODUCTOS_MOCK } from '../mocks/productos.mock';
import { PEDIDO_ACTIVO_MOCK, PEDIDOS_MOSTRADOR_MOCK } from '../mocks/pedido.mock';
import { ProductCard } from '../components/ProductCard';
import { PedidoList } from '../components/PedidoList';
import { OrderSummary } from '../components/OrderSummary';
import { ConfirmModal } from '../components/ConfirmModal';
import { usePedido } from '../hooks/usePedido';
import { ArrowLeft, User, Hash, Search, X, ShoppingBag, ChevronUp } from 'lucide-react';

interface Props {
  mesaId: number | null;
  pedidoId?: number | null;
  onBack: () => void;
}

export const PedidoView = ({ mesaId, pedidoId, onBack }: Props) => {
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
  const [busqueda, setBusqueda] = useState('');
  const [nombreCliente, setNombreCliente] = useState(pedidoExistente?.nombreCliente || '');
  const [showMobileTicket, setShowMobileTicket] = useState(false);
  const [modalOpen, setModalOpen] = useState<'NONE' | 'CONFIRM_ENVIO' | 'CONFIRM_ANULAR' | 'SUCCESS' | 'ERROR_LLEVAR'>('NONE');

  const categorias = ['Todas', ...new Set(PRODUCTOS_MOCK.map(p => p.categoria))];

  const productosFiltrados = useMemo(() => {
    return PRODUCTOS_MOCK.filter(p => {
      const coincideCategoria = categoriaSeleccionada === 'Todas' || p.categoria === categoriaSeleccionada;
      const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      return coincideCategoria && coincideBusqueda;
    });
  }, [categoriaSeleccionada, busqueda]);

  const handleBackWithGuard = () => {
    const isUnchanged = pedidoExistente && JSON.stringify(detalles) === JSON.stringify(pedidoExistente.detalles);
    if (detalles.length === 0 || isUnchanged) {
      onBack();
    } else {
      setModalOpen('CONFIRM_ANULAR');
    }
  };

  const handleConfirmEnvio = () => {
    if (!mesaId && !nombreCliente.trim()) {
      setModalOpen('ERROR_LLEVAR');
      return;
    }
    enviarPedido();
    setModalOpen('SUCCESS');
  };

  const displayId = pedidoExistente?.id || 107;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col lg:flex-row h-screen w-screen bg-[#1a241d] overflow-hidden">
      
      {/* SECCIÓN IZQUIERDA: CATÁLOGO (Responsive Width) */}
      <div className={`w-full lg:w-[70%] flex flex-col bg-white overflow-hidden transition-all duration-300 ${showMobileTicket ? 'hidden lg:flex' : 'flex'}`}>
        
        {/* NAV SUPERIOR (Ajustado para móvil) */}
        <nav className="h-20 lg:h-28 bg-[#1a241d] text-white px-4 lg:px-10 flex justify-between items-center relative flex-shrink-0">
          <div className="flex flex-col gap-1 lg:gap-2 relative z-10">
            <button 
              onClick={handleBackWithGuard} 
              className="flex items-center gap-2 text-[8px] lg:text-[9px] font-black border border-white/20 px-3 py-1.5 uppercase hover:bg-white hover:text-[#1a241d] transition-all tracking-widest w-fit"
            >
              <ArrowLeft size={12} />
              <span className="hidden sm:inline">Regresar / Anular pedido</span>
            </button>
            <div className="flex items-baseline gap-2 lg:gap-3">
               <h2 className="font-headline text-2xl lg:text-4xl italic leading-tight">
                 {mesaId ? `Mesa ${mesaId}` : "Llevar"}
               </h2>
               <span className="text-[8px] lg:text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] hidden sm:block">Café Events</span>
            </div>
          </div>
          
          <div className="relative z-10 text-right bg-white/10 p-2 lg:p-4 border border-white/10">
            <div className="flex items-center justify-end gap-1 lg:gap-2 mb-0 lg:mb-1">
              <Hash size={10} className="text-[#ffdea5]" />
              <span className="font-headline text-lg lg:text-2xl italic text-white leading-none">{displayId}</span>
            </div>
            <p className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-white/40">
              {pedidoExistente ? 'En Servicio' : 'Nueva Orden'}
            </p>
          </div>
        </nav>

        {/* REGISTRO DE CLIENTE */}
        {!mesaId && (
          <div className="px-4 lg:px-10 py-3 lg:py-5 bg-[#f6f3ee] border-b border-[#1a241d]/10 flex items-center gap-4">
            <User size={16} className="text-[#1a241d]/30" />
            <input 
              type="text" 
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              className="flex-1 bg-transparent border-none font-headline text-lg lg:text-2xl text-[#1a241d] italic outline-none placeholder:opacity-30"
              placeholder="Nombre..."
            />
          </div>
        )}

        {/* BARRA MIXTA: CATEGORÍAS + BÚSQUEDA (Layout Adaptable) */}
        <div className="flex flex-col sm:flex-row bg-white border-b border-[#1a241d]/10 flex-shrink-0">
          <div className="flex flex-1 overflow-x-auto no-scrollbar border-b sm:border-b-0 sm:border-r border-[#1a241d]/10">
            {categorias.map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategoriaSeleccionada(cat)}
                className={`px-6 lg:px-8 py-3 lg:py-5 text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] border-r border-[#1a241d]/10 transition-all flex-shrink-0
                  ${categoriaSeleccionada === cat 
                    ? 'bg-[#1a241d] text-white' 
                    : 'bg-white text-[#1a241d]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64 lg:w-80 px-4 lg:px-6 flex items-center gap-3 bg-[#fcf9f4]/50 py-3 lg:py-4">
            <Search size={14} className="text-[#1a241d]/30" />
            <input 
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="BUSCAR..."
              className="flex-1 bg-transparent border-none text-[9px] lg:text-[10px] font-black uppercase tracking-widest outline-none"
            />
          </div>
        </div>

        {/* GRID DE PRODUCTOS (Ajustado para móvil) */}
        <div className="flex-1 p-4 lg:p-10 overflow-y-auto bg-[#f0ede8] custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 lg:gap-8 max-w-6xl mx-auto">
            {productosFiltrados.map(prod => (
              <ProductCard key={prod.id} producto={prod} onAdd={agregarProducto} />
            ))}
          </div>
        </div>

        {/* BARRA FLOTANTE MÓVIL (Solo Celulares) */}
        <div className="lg:hidden p-4 bg-white border-t border-[#1a241d]/10 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
          <button 
            onClick={() => setShowMobileTicket(true)}
            className="flex items-center gap-3 bg-[#1a241d] text-white px-6 py-3 rounded-none font-black text-[10px] uppercase tracking-widest flex-1"
          >
            <ShoppingBag size={16} />
            Ver Comanda ({detalles.length})
            <ChevronUp size={16} className="ml-auto" />
          </button>
        </div>
      </div>

      {/* SECCIÓN DERECHA: TICKET (Ajustado para pantalla completa en móvil) */}
      <div className={`
        fixed inset-0 lg:relative lg:inset-auto z-[70] lg:z-20
        w-full lg:w-[30%] flex flex-col bg-[#fcf9f4] border-l border-[#1a241d]/10
        transition-transform duration-300 transform
        ${showMobileTicket ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
      `}>
        {/* Cabecera Ticket Móvil */}
        <div className="lg:hidden h-16 bg-[#1a241d] flex items-center px-6 justify-between text-white">
          <span className="font-headline italic text-xl">Tu Comanda</span>
          <button onClick={() => setShowMobileTicket(false)} className="p-2">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <PedidoList 
            detalles={detalles} 
            onRemoveItem={eliminarProducto} 
            onUpdateQty={actualizarCantidad} 
            onUpdateNota={actualizarNota} 
          />
        </div>
        
        <OrderSummary 
          total={total} 
          onConfirm={() => {
            handleConfirmEnvio();
            setShowMobileTicket(false);
          }} 
          onCancel={handleBackWithGuard} 
          disabled={detalles.length === 0} 
        />
      </div>

      {/* MODALES */}
      <ConfirmModal isOpen={modalOpen === 'CONFIRM_ENVIO'} title="Enviar a Cocina" message="¿Enviar pedido?" onConfirm={handleConfirmEnvio} onCancel={() => setModalOpen('NONE')} />
      <ConfirmModal isOpen={modalOpen === 'CONFIRM_ANULAR'} title="Descartar" message="¿Deseas salir?" confirmText="Salir" onConfirm={() => { anularPedido(); onBack(); }} onCancel={() => setModalOpen('NONE')} />
      <ConfirmModal isOpen={modalOpen === 'SUCCESS'} title="¡Éxito!" message="Orden enviada." onConfirm={() => { setModalOpen('NONE'); onBack(); }} />
    </div>
  );
};