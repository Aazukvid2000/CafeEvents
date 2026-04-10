'use client';
import { useSearchParams } from 'next/navigation';
import { MesasView } from '@/modules/ventas/views/MesasView';
import { PedidoView } from '@/modules/ventas/views/PedidoView';
import { PEDIDOS_MOSTRADOR_MOCK } from '@/modules/ventas/mocks/pedido.mock';
import { LayoutDashboard, Map as MapIcon, Utensils } from 'lucide-react';
import { MESAS_MOCK } from '@/modules/ventas/mocks/mesas.mock';

export default function MeseroDashboard() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'mapa'; // 'turno' es la vista por defecto

  // Estadísticas para la vista "Mi Turno"
  const totalMesas = MESAS_MOCK.length;
  const disponibles = MESAS_MOCK.filter(m => m.disponible).length;
  const enServicio = totalMesas - disponibles;

  // RENDERIZADO CONDICIONAL BASADO EN LA URL

  // 1. VISTA: MI TURNO (Estadísticas y Resumen)

  if (view === 'turno') {
    // Datos calculados (Simulados basados en tus mocks)
    const totalMesas = MESAS_MOCK.length;
    const disponibles = MESAS_MOCK.filter(m => m.disponible).length;
    const enServicio = totalMesas - disponibles;
    const ocupacion = Math.round((enServicio / totalMesas) * 100);
    const pedidosLlevarPendientes = PEDIDOS_MOSTRADOR_MOCK.length;

    return (
      <div className="space-y-12 animate-in fade-in duration-700">
        {/* HEADER EDITORIAL */}
        <header className="max-w-2xl">
          <h1 className="font-headline text-5xl text-[#334537] italic font-light tracking-wide">
            Mi Turno
          </h1>
          <p className="text-[#434843] font-body mt-3 leading-relaxed">
            Resumen de actividad en tiempo real. Gestiona la disponibilidad de salón y el flujo de órdenes de mostrador.
          </p>
        </header>

        {/* MÉTRICAS PRINCIPALES (El diseño de la imagen) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Capacidad Total */}
          <div className="bg-[#f6f3ee] rounded-[2rem] p-8 border border-[#c3c8c1]/10 shadow-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#434843]/60 mb-4 font-bold">
              Capacidad Total
            </p>
            <p className="font-headline text-6xl text-[#334537] italic">{totalMesas}</p>
          </div>

          {/* Disponibles */}
          <div className="bg-[#f6f3ee] rounded-[2rem] p-8 border border-[#c3c8c1]/10 shadow-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#434843]/60 mb-4 font-bold">
              Disponibles
            </p>
            <p className="font-headline text-6xl text-[#334537] italic">{disponibles}</p>
          </div>

          {/* En Servicio */}
          <div className="bg-[#ebe8e3] rounded-[2rem] p-8 border border-[#334537]/10 shadow-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#334537]/60 mb-4 font-bold">
              En Servicio
            </p>
            <p className="font-headline text-6xl text-[#334537] italic">{enServicio}</p>
          </div>

          {/* Ocupación */}
          <div className="bg-[#ffdea5]/30 rounded-[2rem] p-8 border border-[#ffdea5]/50 shadow-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#5d4201]/60 mb-4 font-bold">
              Ocupación
            </p>
            <p className="font-headline text-6xl text-[#5d4201] italic">{ocupacion}%</p>
          </div>
        </div>

        {/* ESTADÍSTICAS OPERATIVAS ADICIONALES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#c3c8c1]/20">

          {/* Card: Pedidos para Llevar */}
          <div className="flex items-center justify-between p-10 bg-white rounded-[2rem] border border-[#c3c8c1]/20 shadow-sm group hover:border-[#334537] transition-all cursor-pointer">
            <div className="space-y-2">
              <h4 className="font-headline text-3xl text-[#334537] italic">Órdenes de Mostrador</h4>
              <p className="text-xs text-[#434843]/60 font-body uppercase tracking-widest font-bold">Pendientes de entrega</p>
            </div>
            <div className="text-right">
              <p className="font-headline text-5xl text-[#334537]">{pedidosLlevarPendientes}</p>
              <span className="text-[10px] text-[#334537]/40 font-bold uppercase tracking-widest">Activas</span>
            </div>
          </div>

          {/* Card: Tiempo Promedio (Ayuda al mesero a saber cuándo se liberarán mesas) */}
          <div className="flex items-center justify-between p-10 bg-white rounded-[2rem] border border-[#c3c8c1]/20 shadow-sm">
            <div className="space-y-2">
              <h4 className="font-headline text-3xl text-[#334537] italic">Tiempo de Mesa</h4>
              <p className="text-xs text-[#434843]/60 font-body uppercase tracking-widest font-bold">Promedio de estancia</p>
            </div>
            <div className="text-right">
              <p className="font-headline text-5xl text-[#334537]">45</p>
              <span className="text-[10px] text-[#334537]/40 font-bold uppercase tracking-widest">Minutos</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 2. VISTA: MAPA DE MESAS (Solo el grid)
  if (view === 'mapa') {
    return (
      <div className="animate-in slide-in-from-bottom-4 duration-500">
        <MesasView
          onSelectMesa={(id) => window.location.href = `/dashboard/mesero?view=pedido&mesaId=${id}`}
          onParaLlevar={() => window.location.href = `/dashboard/mesero?view=pedido`}
        />
      </div>
    );
  }

  // 3. VISTA: PEDIDOS EN ESPERA (Solo la lista de mostrador)
  if (view === 'espera') {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <header>
          <h2 className="font-headline text-4xl text-[#334537] italic">Pedidos en Espera</h2>
          <p className="text-sm text-[#434843]/60 font-body">Órdenes de mostrador pendientes de entrega.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PEDIDOS_MOSTRADOR_MOCK.map((pedido) => (
            <button
              key={pedido.id}
              onClick={() => window.location.href = `/dashboard/mesero?view=pedido&pedidoId=${pedido.id}`}
              className="group bg-white border border-[#c3c8c1]/30 p-6 rounded-2xl hover:border-[#334537] hover:shadow-lg transition-all text-left"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="bg-[#f6f3ee] text-[#334537] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                  #{pedido.id}
                </span>
                <span className="text-[10px] text-[#434843]/40 font-bold uppercase tracking-widest">Hace 15 min</span>
              </div>
              <p className="font-headline text-2xl text-[#334537] italic group-hover:translate-x-1 transition-transform">
                {pedido.nombreCliente}
              </p>
              <p className="text-[10px] font-bold text-[#434843]/60 uppercase tracking-widest mt-2">Click para editar pedido →</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 4. VISTA: TOMA DE PEDIDO (Cuando ya se seleccionó mesa o pedido)
  if (view === 'pedido') {
    return (
      <PedidoView
        mesaId={Number(searchParams.get('mesaId')) || null}
        pedidoId={Number(searchParams.get('pedidoId')) || null}
        onBack={() => window.location.href = '/dashboard/mesero?view=mapa'}
      />
    );
  }

  return null;
}