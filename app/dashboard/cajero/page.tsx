'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PagoView } from '@/modules/ventas/views/PagoView';
import { CorteView } from '@/modules/ventas/views/CorteView';
import { ConfirmModal } from '@/modules/ventas/components/ConfirmModal';
import { PEDIDOS_MOSTRADOR_MOCK } from '@/modules/ventas/mocks/pedido.mock';
import { MESAS_MOCK } from '@/modules/ventas/mocks/mesas.mock';
import { 
  TrendingUp, Users, Timer, Banknote, Utensils, 
  ShoppingBag, ArrowRight, Hash, Clock 
} from 'lucide-react';

export default function CajeroDashboard() {
  const searchParams = useSearchParams();
  const currentView = searchParams.get('view') || 'ventas';

  const [pagoActive, setPagoActive] = useState(false);
  const [mesaSeleccionadaId, setMesaSeleccionadaId] = useState<number | null>(null);
  const [pedidoSeleccionadoId, setPedidoSeleccionadoId] = useState<number | null>(null);

  const mesasActivas = useMemo(() => MESAS_MOCK.filter(mesa => !mesa.disponible), []);

  const handleCobrarMesa = (id: number) => {
    setMesaSeleccionadaId(id);
    setPedidoSeleccionadoId(null);
    setPagoActive(true);
  };

  const handleCobrarMostrador = (id: number) => {
    setPedidoSeleccionadoId(id);
    setMesaSeleccionadaId(null);
    setPagoActive(true);
  };

  const handleResetPago = () => {
    setPagoActive(false);
    setMesaSeleccionadaId(null);
    setPedidoSeleccionadoId(null);
  };

  if (pagoActive) {
    return <PagoView onBack={handleResetPago} onFinish={handleResetPago} />;
  }

  if (currentView === 'corte') {
    return <CorteView onBack={() => window.location.href = '/dashboard/cajero?view=ventas'} onFinish={handleResetPago} />;
  }

  // VISTA: MESAS ACTIVAS (Con ID y Datos de Auditoría)
  if (currentView === 'mesas') {
    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        <header className="flex justify-between items-end border-b border-[#334537]/10 pb-6">
          <div>
            <h2 className="font-headline text-4xl text-[#334537] italic serif-tracking">Mesas Activas</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#434843]/40 mt-1">Sincronizado con comandas en vivo</p>
          </div>
          <div className="flex gap-4">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase text-[#334537]">Total en Local</span>
                <span className="font-headline text-2xl text-[#334537]">$1,420.00</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mesasActivas.map((mesa) => (
            <div 
              key={mesa.id} 
              className="bg-white p-6 rounded-[2.5rem] border border-[#334537]/5 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
            >
              {/* Identificadores Superiores */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                  <span className="font-headline text-5xl text-[#334537]/10 group-hover:text-[#334537]/20 transition-colors leading-none">
                    {mesa.id < 10 ? `0${mesa.id}` : mesa.id}
                  </span>
                  <div className="flex items-center gap-1 mt-1 text-[9px] font-black text-[#334537]/40 uppercase tracking-tighter">
                    <Hash size={10} />
                    <span>Pedido #120{mesa.id}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="bg-[#d3e8d5] text-[#394b3d] px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-tighter">
                    En Servicio
                  </span>
                  <div className="flex items-center gap-1 text-[8px] font-bold text-[#434843]/40">
                    <Clock size={10} />
                    <span>45 min</span>
                  </div>
                </div>
              </div>

              {/* Información de Pago */}
              <div className="space-y-1 mb-8">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#334537]/30">Subtotal al momento</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline text-4xl text-[#334537]">$185.50</span>
                  <span className="text-[10px] font-bold text-[#334537]/40 uppercase italic">MXN</span>
                </div>
              </div>

              {/* Footer de Tarjeta: Staff y Acción */}
              <div className="flex items-center justify-between pt-5 border-t border-[#f6f3ee]">
                <div className="flex flex-col">
                  <span className="text-[7px] font-black uppercase text-[#434843]/30 tracking-widest mb-1">Atiende</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#334537] flex items-center justify-center text-[8px] font-bold text-white italic">
                      {mesa.id % 2 === 0 ? 'PP' : 'LA'}
                    </div>
                    <span className="text-[9px] font-bold text-[#334537]">Pedro P.</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleCobrarMesa(mesa.id)}
                  className="group/btn relative overflow-hidden bg-[#334537] text-white px-5 py-3 rounded-2xl flex items-center gap-3 hover:pr-8 transition-all duration-300 shadow-lg shadow-[#334537]/20 active:scale-95"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">Cobrar</span>
                  <ArrowRight size={14} className="absolute right-[-20px] group-hover/btn:right-3 transition-all duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VISTA: PARA LLEVAR
  if (currentView === 'llevar') {
    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        <header className="flex justify-between items-end border-b border-[#334537]/10 pb-6">
          <h2 className="font-headline text-4xl text-[#334537] italic serif-tracking">Pedidos Mostrador</h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PEDIDOS_MOSTRADOR_MOCK.map((pedido) => (
            <button 
              key={pedido.id} 
              onClick={() => handleCobrarMostrador(pedido.id!)} 
              className="bg-white p-8 rounded-[2.5rem] border border-[#334537]/5 text-left hover:shadow-2xl transition-all group flex flex-col justify-between h-56 relative overflow-hidden"
            >
              <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-col gap-1">
                   <span className="bg-[#f6f3ee] text-[#334537] px-3 py-1 text-[9px] font-black uppercase rounded-full w-fit">Ticket #{pedido.id}</span>
                   <span className="text-[8px] font-bold text-[#434843]/40 uppercase ml-1">Listo para entrega</span>
                </div>
                <ShoppingBag size={24} className="text-[#334537]/10" />
              </div>
              <div className="relative z-10">
                <p className="font-body font-bold text-[#334537] uppercase text-xs tracking-widest mb-1">{pedido.nombreCliente}</p>
                <p className="font-headline text-5xl text-[#334537] tracking-tight">${pedido.total.toFixed(2)}</p>
              </div>
              <ArrowRight size={20} className="absolute bottom-8 right-8 text-[#334537] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // VISTA DEFAULT: VENTAS (ESTADÍSTICAS)
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="font-headline text-5xl text-[#334537] italic serif-tracking mb-2">Panel de Control</h2>
        <p className="font-body text-[#434843]/60 tracking-wide">Bienvenido de nuevo, Pedro Pascal</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#f6f3ee] p-8 rounded-[2rem] relative overflow-hidden group border border-[#334537]/5">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#434843]/60 mb-4">Ventas Brutas</p>
            <h3 className="font-headline text-5xl text-[#334537] tracking-tight">$1,240.50</h3>
            <div className="mt-6 flex items-center gap-2 text-[#334537] font-bold text-xs">
              <TrendingUp size={14} />
              <span className="font-body">+12.5% hoy</span>
            </div>
          </div>
          <Banknote className="absolute -bottom-6 -right-6 text-[#334537] opacity-[0.03] group-hover:opacity-10 transition-opacity" size={180} />
        </div>

        <div className="bg-[#f6f3ee] p-8 rounded-[2rem] relative overflow-hidden group border border-[#334537]/5">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#434843]/60 mb-4">Ocupación en Local</p>
            <h3 className="font-headline text-5xl text-[#334537] tracking-tight">{mesasActivas.length < 10 ? `0${mesasActivas.length}` : mesasActivas.length}</h3>
            <div className="mt-6 flex items-center gap-2 text-[#434843]/60 font-bold text-xs">
              <Users size={14} />
              <span className="font-body">{Math.round((mesasActivas.length / MESAS_MOCK.length) * 100)}% de mesas</span>
            </div>
          </div>
          <Utensils className="absolute -bottom-6 -right-6 text-[#334537] opacity-[0.03] group-hover:opacity-10 transition-opacity" size={180} />
        </div>

        <div className="bg-[#f6f3ee] p-8 rounded-[2rem] relative overflow-hidden group border border-[#334537]/5">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#434843]/60 mb-4">Tickets Mostrador</p>
            <h3 className="font-headline text-5xl text-[#334537] tracking-tight">{PEDIDOS_MOSTRADOR_MOCK.length < 10 ? `0${PEDIDOS_MOSTRADOR_MOCK.length}` : PEDIDOS_MOSTRADOR_MOCK.length}</h3>
            <div className="mt-6 flex items-center gap-2 text-[#563d00] font-bold text-xs">
              <Timer size={14} />
              <span className="font-body italic">Promedio 12m espera</span>
            </div>
          </div>
          <ShoppingBag className="absolute -bottom-6 -right-6 text-[#334537] opacity-[0.03] group-hover:opacity-10 transition-opacity" size={180} />
        </div>
      </section>

      <div className="pt-8 border-t border-[#334537]/5 flex gap-4">
        <button 
          onClick={() => window.location.href = '/dashboard/cajero?view=mesas'}
          className="bg-[#334537] text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#263329] transition-all shadow-xl shadow-[#334537]/10"
        >
          Gestionar Salón
        </button>
      </div>
    </div>
  );
}