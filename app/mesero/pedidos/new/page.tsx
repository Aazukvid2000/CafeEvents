import { Suspense } from "react";
import NuevoPedidoContent from "./content";

export default function NuevoPedidoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8 flex items-center justify-center"><p className="text-white">Cargando...</p></div>}>
      <NuevoPedidoContent />
    </Suspense>
  );
}
