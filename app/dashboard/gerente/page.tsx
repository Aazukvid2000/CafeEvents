'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Importaciones futuras de las vistas reales
import { ReservationsView } from "@/modules/eventos/view/ReservationsView";
import { QuotesView } from "@/modules/eventos/view/QuotesView";
import { MetricsView } from "@/modules/eventos/view/MetricsView";
import { AlertsConfigView } from "@/modules/eventos/view/AlertsConfigView";


// Placeholders con contexto basado en el documento técnico
const ReservationsPlaceholder = () => (
  <div className="py-20 text-center border-2 border-dashed border-[#c3c8c1] rounded-[3rem] animate-in fade-in duration-500">
    <h2 className="font-headline italic text-4xl text-[#1a3d2e]">Gestión de Reservaciones</h2>
    <p className="text-[#434843]/60 mt-4 uppercase tracking-[0.2em] text-[10px] font-black">
      Control de Salones • Anticipos del 50% • Disponibilidad de Fechas
    </p>
  </div>
);

function GerenteContent() {
  const searchParams = useSearchParams();

  const view = searchParams.get('view') || 'reservas';

  switch (view) {
    case 'reservas':
      return <ReservationsView />;
    case 'cotizaciones':
      return <QuotesView />;
    case 'metricas':
      return <MetricsView />;
    case 'facturacion':
      return <AlertsConfigView/>;
    default:
      return <ReservationsPlaceholder />;
  }
}

export default function GerentePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse font-headline italic text-[#1a3d2e]/40 text-xl">
          Cargando Módulo de Gerencia...
        </div>
      </div>
    }>
      <GerenteContent />
    </Suspense>
  );
}