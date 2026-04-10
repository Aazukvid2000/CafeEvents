'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { AuthorizationsView } from '@/modules/admin/view/AuthorizationsView';
// Placeholders con contexto basado en los Casos de Uso del Administrador
const AdminResumenPlaceholder = () => (
  <div className="py-20 text-center border-2 border-dashed border-[#c3c8c1] rounded-[3rem] animate-in fade-in duration-500">
    <h2 className="font-headline italic text-4xl text-[#1a3d2e]">Panel de Control General</h2>
    <p className="text-[#434843]/60 mt-4 uppercase tracking-[0.2em] text-[10px] font-black">
      Estado de Resultados • Balance General • Flujo de Efectivo [cite: 176]
    </p>
  </div>
);

const AuthorizationsPlaceholder = () => (
  <div className="py-20 text-center border-2 border-dashed border-[#c3c8c1] rounded-[3rem] animate-in fade-in duration-500">
    <h2 className="font-headline italic text-4xl text-[#1a3d2e]">Autorizaciones Pendientes</h2>
    <p className="text-[#434843]/60 mt-4 uppercase tracking-[0.2em] text-[10px] font-black">
      Revisión de Recetas • Márgenes de Utilidad • Menús de Eventos [cite: 84, 87]
    </p>
  </div>
);

const MenuManagementPlaceholder = () => (
  <div className="py-20 text-center border-2 border-dashed border-[#c3c8c1] rounded-[3rem] animate-in fade-in duration-500">
    <h2 className="font-headline italic text-4xl text-[#1a3d2e]">Gestión de Menú Operativo</h2>
    <p className="text-[#434843]/60 mt-4 uppercase tracking-[0.2em] text-[10px] font-black">
      Activación de Productos • Precios Finales • Vinculación con Inventario [cite: 87, 91]
    </p>
  </div>
);

const AuditLogPlaceholder = () => (
  <div className="py-20 text-center border-2 border-dashed border-[#c3c8c1] rounded-[3rem] animate-in fade-in duration-500">
    <h2 className="font-headline italic text-4xl text-[#1a3d2e]">Incidencias y Log de Auditoría</h2>
    <p className="text-[#434843]/60 mt-4 uppercase tracking-[0.2em] text-[10px] font-black">
      Anulaciones de Pedidos • Discrepancias en Caja • Registro de Operaciones [cite: 18, 51, 185]
    </p>
  </div>
);

const AlertsConfigPlaceholder = () => (
  <div className="py-20 text-center border-2 border-dashed border-[#c3c8c1] rounded-[3rem] animate-in fade-in duration-500">
    <h2 className="font-headline italic text-4xl text-[#1a3d2e]">Configuración de Alertas</h2>
    <p className="text-[#434843]/60 mt-4 uppercase tracking-[0.2em] text-[10px] font-black">
      Umbrales de Venta • Inventario Crítico • Notificaciones Automáticas [cite: 209, 222]
    </p>
  </div>
);

function AdministradorContent() {
  const searchParams = useSearchParams();
  
  /**
   * Mapeo de vistas según el rol Administrador:
   * resumen       -> Consulta de reportes financieros [cite: 172, 199]
   * autorizaciones -> Revisar y autorizar propuestas de Chef [cite: 85]
   * catalogo      -> Gestión de productos activos y precios 
   * auditoria     -> Supervisión de incidencias y logs [cite: 21, 35]
   * alertas       -> Configurar alertas automáticas [cite: 209]
   */
  const view = searchParams.get('view') || 'resumen';

  switch (view) {
    case 'resumen':
      return <AdminResumenPlaceholder />;
    case 'autorizaciones':
      return <AuthorizationsView />;
    case 'catalogo':
      return <MenuManagementPlaceholder />;
    case 'auditoria':
      return <AuditLogPlaceholder />;
    case 'alertas':
      return <AlertsConfigPlaceholder />;
    default:
      return <AdminResumenPlaceholder />;
  }
}

export default function AdministradorPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse font-headline italic text-[#ba1a1a]/40 text-xl">
          Cargando Módulo de Dirección...
        </div>
      </div>
    }>
      <AdministradorContent />
    </Suspense>
  );
}