'use client';

import React, { useState, useMemo } from 'react';
import { Plus, ListFilter, CalendarCheck, Wallet, CheckCircle2 } from 'lucide-react';
import { ReservationCard } from '../components/ReservationCard';
import { ReservationForm } from '../components/ReservationForm';
import { EventManagement } from '../components/EventManagement';
import { CFDIDialog, CFDIFormData } from '@/modules/ventas/components/CFDIDialog';

import { useGerenteEvents } from '../hooks/useGerenteEvents';
import { Reservacion } from '../types/gerente';

type ViewMode = 'LIST' | 'CREATE' | 'MANAGE';
// Definimos los tipos de filtro posibles
type FilterStatus = 'TODOS' | 'PENDIENTES' | 'CONFIRMADOS' | 'PAGADOS';

export const ReservationsView = () => {
  const { reservations, createReservation, updateReservationStatus } = useGerenteEvents();
  const [view, setView] = useState<ViewMode>('LIST');
  const [selectedRes, setSelectedRes] = useState<Reservacion | null>(null);
  
  // --- ESTADOS DE FILTRADO ---
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('TODOS');
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [resToInvoice, setResToInvoice] = useState<Reservacion | null>(null);

  // --- LÓGICA DE FILTRADO (Memoized para rendimiento) ---
  const filteredReservations = useMemo(() => {
    switch (activeFilter) {
      case 'PENDIENTES':
        return reservations.filter(r => r.estado === 'PENDIENTE');
      case 'CONFIRMADOS':
        return reservations.filter(r => r.estado === 'CONFIRMADA');
      case 'PAGADOS':
        return reservations.filter(r => r.estado === 'PAGADA_TOTAL');
      default:
        return reservations;
    }
  }, [reservations, activeFilter]);

  const handleManageClick = (res: Reservacion) => {
    setSelectedRes(res);
    setView('MANAGE');
  };

  const handleOpenInvoice = (res: Reservacion) => {
    setResToInvoice(res);
    setIsInvoiceOpen(true);
  };

  const handleConfirmInvoice = (data: CFDIFormData) => {
    console.log("Generando factura para:", resToInvoice?.id, data);
    setIsInvoiceOpen(false);
  };

  if (view === 'CREATE') {
    return <ReservationForm onBack={() => setView('LIST')} onSave={createReservation} />;
  }

  if (view === 'MANAGE' && selectedRes) {
    return (
      <EventManagement 
        reservation={selectedRes}
        onBack={() => { setView('LIST'); setSelectedRes(null); }}
        onUpdateStatus={updateReservationStatus}
      />
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* HEADER PRINCIPAL */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#334537]/5 pb-8">
        <div>
          <span className="label-caps text-[#C5A059] mb-2 block uppercase tracking-widest text-[10px] font-black">Gestión de Agenda</span>
          <h1 className="serif-display text-5xl md:text-6xl text-[#1a3d2e]">Agenda de Eventos</h1>
        </div>
        <button 
          onClick={() => setView('CREATE')}
          className="bg-[#1a3d2e] text-white px-8 py-4 rounded-full font-label text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#263329] transition-all flex items-center gap-2 active:scale-95"
        >
          <Plus size={16} /> Generar Reservación 
        </button>
      </header>

      {/* --- BARRA DE FILTROS (TABS) --- */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#f6f3ee] rounded-[2rem] w-fit border border-[#1a3d2e]/5">
        <FilterButton 
          active={activeFilter === 'TODOS'} 
          onClick={() => setActiveFilter('TODOS')} 
          label="Todos" 
          icon={<ListFilter size={14} />} 
          count={reservations.length}
        />
        <FilterButton 
          active={activeFilter === 'PENDIENTES'} 
          onClick={() => setActiveFilter('PENDIENTES')} 
          label="Por Anticipo" 
          icon={<Wallet size={14} />} 
          count={reservations.filter(r => r.estado === 'PENDIENTE').length}
        />
        <FilterButton 
          active={activeFilter === 'CONFIRMADOS'} 
          onClick={() => setActiveFilter('CONFIRMADOS')} 
          label="Confirmados" 
          icon={<CalendarCheck size={14} />} 
          count={reservations.filter(r => r.estado === 'CONFIRMADA').length}
        />
        <FilterButton 
          active={activeFilter === 'PAGADOS'} 
          onClick={() => setActiveFilter('PAGADOS')} 
          label="Pagados (Facturables)" 
          icon={<CheckCircle2 size={14} />} 
          count={reservations.filter(r => r.estado === 'PAGADA_TOTAL').length}
        />
      </div>

      {/* GRID DE CARDS FILTRADAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((res) => (
            <ReservationCard 
              key={res.id} 
              reservation={res} 
              onManage={() => handleManageClick(res)}
              onInvoice={handleOpenInvoice}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-[#1a3d2e]/10">
            <p className="font-headline italic text-2xl text-[#1a3d2e]/30">No hay eventos en esta categoría</p>
          </div>
        )}
        
        {/* Card de Acceso Rápido (Solo se muestra en 'Todos') */}
        {activeFilter === 'TODOS' && (
          <button 
            onClick={() => setView('CREATE')}
            className="border-2 border-dashed border-[#c3c8c1]/50 rounded-[3rem] p-8 flex flex-col items-center justify-center text-[#c3c8c1] hover:border-[#1a3d2e] hover:text-[#1a3d2e] transition-all min-h-[350px] group bg-[#f6f3ee]/30"
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-current flex items-center justify-center mb-4 group-hover:rotate-90 group-hover:scale-110 transition-all duration-500">
              <Plus size={24} />
            </div>
            <span className="font-label text-[10px] uppercase tracking-[0.3em] font-black">Nueva Reservación</span>
          </button>
        )}
      </div>

      <CFDIDialog 
        isOpen={isInvoiceOpen} 
        onClose={() => setIsInvoiceOpen(false)} 
        onConfirm={handleConfirmInvoice} 
      />
    </div>
  );
};

// --- SUB-COMPONENTE PARA LOS BOTONES DE FILTRO ---
interface FilterBtnProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  count: number;
}

const FilterButton = ({ active, onClick, label, icon, count }: FilterBtnProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
      ${active 
        ? 'bg-[#1a3d2e] text-white shadow-lg shadow-[#1a3d2e]/20' 
        : 'text-[#1a3d2e]/40 hover:text-[#1a3d2e] hover:bg-white'}`}
  >
    {icon}
    {label}
    <span className={`ml-1 px-2 py-0.5 rounded-full text-[8px] ${active ? 'bg-white/20' : 'bg-[#1a3d2e]/5'}`}>
      {count}
    </span>
  </button>
);