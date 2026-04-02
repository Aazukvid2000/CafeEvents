// src/app/dashboard/chef/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { ChefDashboardView } from "@/modules/cocina/view/ChefDashboardView";
import { CatalogView } from "@/modules/cocina/view/CatalogView";
import { EventMenusView } from "@/modules/cocina/view/EventMenusView";
import { ChefProposalsView } from "@/modules/cocina/view/ChefProposalsView"; // Nuevo import

export default function ChefPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'resumen';

  switch (view) {
    case 'resumen':
      return <ChefDashboardView />; // Solo el panel de control (cocina)

    case 'recetas':
      return <CatalogView />;

    case 'eventos':
      return <EventMenusView />;

    case 'propuestas':
      return <ChefProposalsView />; // Solo las propuestas de recetas

    case 'insumos':
      // Aquí iría la vista de insumos cuando la crees
      return <div className="p-20 border-2 border-dashed border-[#c3c8c1] rounded-[3rem] text-center italic text-[#c3c8c1]">Vista de Insumos en construcción</div>;

    default:
      return <ChefDashboardView />;
  }
}