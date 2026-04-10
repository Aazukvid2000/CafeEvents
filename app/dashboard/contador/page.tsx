'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { FinancialReportsView } from "@/modules/finanzas/view/FinancialReportsView";
import { ProviderPaymentsView } from "@/modules/finanzas/view/ProviderPaymentsView";
import { ExpenseLogView } from "@/modules/finanzas/view/ExpenseLogView";
import { SalesAuditView } from "@/modules/finanzas/view/SalesAuditView";

// Placeholders temporales para mantener la UI funcional mientras desarrollas los módulos
const FinancialReportsPlaceholder = () => (
  <div className="py-20 text-center border-2 border-dashed border-[#c3c8c1] rounded-[3rem] animate-in fade-in duration-500">
    <h2 className="font-headline italic text-4xl text-[#1a3d2e]">Reportes Financieros</h2>
    <p className="text-[#434843]/60 mt-4 uppercase tracking-[0.2em] text-[10px] font-black">
      Estado de Resultados • Balance General • Flujo de Efectivo
    </p>
  </div>
);


function ContadorContent() {
  const searchParams = useSearchParams();

  const view = searchParams.get('view') || 'reportes';

  switch (view) {
    case 'reportes':;
      return <FinancialReportsView />;

    case 'pagos':
      return <ProviderPaymentsView />;

    case 'gastos':
      return <ExpenseLogView />;

    case 'auditoria':
      return <SalesAuditView />;

    default:
      return <FinancialReportsPlaceholder />;
  }
}

export default function ContadorPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse font-headline italic text-[#1a3d2e]/40">Cargando Módulo Financiero...</div>
      </div>
    }>
      <ContadorContent />
    </Suspense>
  );
}