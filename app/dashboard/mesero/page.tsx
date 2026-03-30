// src/app/dashboard/mesero/page.tsx
'use client';
import { useState } from 'react';
import { MesasView } from '@/modules/ventas/views/MesasView';
import { PedidoView } from '@/modules/ventas/views/PedidoView';

export default function MeseroDashboard() {
  const [mesaId, setMesaId] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  if (!isActive) {
    return (
      <MesasView 
        onSelectMesa={(id) => { setMesaId(id); setIsActive(true); }} 
        onParaLlevar={() => { setMesaId(null); setIsActive(true); }} 
      />
    );
  }

  return (
    <PedidoView 
      mesaId={mesaId} 
      onBack={() => { setMesaId(null); setIsActive(false); }} 
    />
  );
}