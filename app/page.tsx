// src/app/page.tsx
'use client';
import { useState } from 'react';
import { MesasView } from '@/modules/ventas/views/MesasView';
import { PedidoView } from '@/modules/ventas/views/PedidoView';

export default function VentasPage() {
  const [viewState, setViewState] = useState<{ mesaId: number | null, active: boolean }>({
    mesaId: null,
    active: false
  });

  if (!viewState.active) {
    return (
      <MesasView 
        onSelectMesa={(id) => setViewState({ mesaId: id, active: true })} 
        onParaLlevar={() => setViewState({ mesaId: null, active: true })} // Acción S3 
      />
    );
  }

  return (
    <PedidoView 
      mesaId={viewState.mesaId} 
      onBack={() => setViewState({ mesaId: null, active: false })} 
    />
  );
}