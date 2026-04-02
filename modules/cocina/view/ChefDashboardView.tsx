// src/modules/cocina/view/ChefDashboardView.tsx
'use client';

import React, { useState } from 'react';
import { Clock, TrendingUp, Utensils, ChefHat, CheckCircle2, ListFilter } from 'lucide-react';
import { OrderTicket } from '../components/OrderTicket';
import { StatCard } from '../components/StatCard';
import { MOCK_PEDIDOS_COCINA } from '../mocks/chef.mock';
import { OrderStatus, Pedido } from '../types/chef';

type DashboardFilter = 'COLA' | 'PREPARANDO' | 'LISTOS';

export const ChefDashboardView = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>(MOCK_PEDIDOS_COCINA);
  const [activeFilter, setActiveFilter] = useState<DashboardFilter>('COLA');

  const handleUpdateOrderStatus = (id: number, nextStatus: OrderStatus) => {
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: nextStatus } : p));
  };

  // Filtrado dinámico basado en la pestaña seleccionada
  const filteredPedidos = pedidos.filter(p => {
    if (activeFilter === 'COLA') return p.estado === 'PENDIENTE';
    if (activeFilter === 'PREPARANDO') return p.estado === 'PREPARANDO';
    if (activeFilter === 'LISTOS') return p.estado === 'LISTO';
    return false;
  });

  // Estadísticas globales (independientes del filtro)
  const stats = {
    cola: pedidos.filter(p => p.estado === 'PENDIENTE').length,
    preparando: pedidos.filter(p => p.estado === 'PREPARANDO').length,
    listos: pedidos.filter(p => p.estado === 'LISTO').length,
    entregados: pedidos.filter(p => p.estado === 'ENTREGADO').length
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-[#334537]/5 pb-8">
        <div>
          <span className="label-caps text-[#C5A059] mb-2 block uppercase tracking-widest text-[10px] font-black">
            Operación en Vivo
          </span>
          <h1 className="serif-display text-5xl md:text-6xl text-[#1a3d2e]">
            Panel de Control
          </h1>
        </div>

        {/* SELECTOR DE FLUJO (Tipo Pastilla) */}
        <div className="bg-[#f6f3ee] p-1.5 rounded-full flex gap-1 border border-[#334537]/10 shadow-inner overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveFilter('COLA')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
              activeFilter === 'COLA' ? 'bg-[#1a3d2e] text-white shadow-lg' : 'text-[#1a3d2e]/40 hover:text-[#1a3d2e]'
            }`}
          >
            <ListFilter size={14} />
            En Cola ({stats.cola})
          </button>
          <button 
            onClick={() => setActiveFilter('PREPARANDO')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
              activeFilter === 'PREPARANDO' ? 'bg-[#1a3d2e] text-white shadow-lg' : 'text-[#1a3d2e]/40 hover:text-[#1a3d2e]'
            }`}
          >
            <ChefHat size={14} />
            Cocina ({stats.preparando})
          </button>
          <button 
            onClick={() => setActiveFilter('LISTOS')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
              activeFilter === 'LISTOS' ? 'bg-[#1a3d2e] text-white shadow-lg' : 'text-[#1a3d2e]/40 hover:text-[#1a3d2e]'
            }`}
          >
            <CheckCircle2 size={14} />
            Listos ({stats.listos})
          </button>
        </div>
      </header>

      {/* MÉTRICAS RÁPIDAS */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Cola Actual" value={stats.cola} icon={Clock} />
        <StatCard label="En Fuego" value={stats.preparando} icon={ChefHat} />
        <StatCard label="Tiempo Promedio" value="14 min" icon={TrendingUp} trend="Óptimo" />
        <StatCard label="Total Hoy" value={stats.entregados} icon={Utensils} />
      </section>

      {/* GRID DINÁMICO DE TICKETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
        {filteredPedidos.length > 0 ? (
          filteredPedidos.map(p => (
            <div key={p.id} className="animate-in slide-in-from-bottom-4 duration-500">
              <OrderTicket 
                pedido={p} 
                onUpdateStatus={handleUpdateOrderStatus} 
              />
              
              {/* Botón especial para 'LISTOS': Marcar como recogido por mesero */}
              {activeFilter === 'LISTOS' && (
                <button 
                  onClick={() => handleUpdateOrderStatus(p.id, 'ENTREGADO')}
                  className="w-full mt-4 py-3 bg-[#d3e8d5] hover:bg-[#1a3d2e] hover:text-white text-[#1a3d2e] rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <CheckCircle2 size={14} />
                  Confirmar Entrega a Mesero
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center border-2 border-dashed border-[#c3c8c1] rounded-[3rem] bg-white/30">
            <p className="font-headline italic text-2xl text-[#c3c8c1]">
              {activeFilter === 'COLA' && "No hay pedidos nuevos"}
              {activeFilter === 'PREPARANDO' && "Cocina despejada"}
              {activeFilter === 'LISTOS' && "Todo ha sido recogido"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};