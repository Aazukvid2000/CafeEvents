'use client';

import React, { useState } from 'react';
import { ProviderPaymentCard } from '../components/ProviderPaymentCard';
import { ProviderPaymentForm } from '../components/ProviderPaymentForm';
import { useProviderPayments } from '../hooks/useProviderPayments';
import { Plus, AlertCircle, CheckCircle2, Clock, ArrowLeft } from 'lucide-react';
import { PaymentStatus, ProviderPayment } from '../types/contador'; // Ajustado según tu exportación

// Definimos el tipo para el filtro extendiendo los estados de pago definidos
type ProviderFilter = 'Todos' | PaymentStatus;

export const ProviderPaymentsView = () => {
  const { filteredPayments, filter, setFilter } = useProviderPayments();
  
  // --- ESTADOS DE NAVEGACIÓN ---
  const [view, setView] = useState<'LIST' | 'FORM'>('LIST');
  const [selectedPayment, setSelectedPayment] = useState<ProviderPayment | null>(null);

  // Opciones de filtro estrictamente tipadas
  const FILTER_OPTIONS: ProviderFilter[] = ['Todos', 'Pagado', 'Factura Recibida', 'Sin Factura', 'Pendiente'];

  // --- ESTADÍSTICAS ---
  const STATS = [
    { 
      label: 'Pendientes Pago', 
      value: filteredPayments.filter(p => p.estado === 'Pendiente').length.toString().padStart(2, '0'), 
      icon: Clock, 
      color: 'text-amber-600' 
    },
    { 
      label: 'Sin Factura', 
      value: filteredPayments.filter(p => p.estado === 'Sin Factura').length.toString().padStart(2, '0'), 
      icon: AlertCircle, 
      color: 'text-red-600' 
    },
    { 
      label: 'Completados', 
      value: filteredPayments.filter(p => p.estado === 'Pagado').length.toString().padStart(2, '0'), 
      icon: CheckCircle2, 
      color: 'text-emerald-600' 
    }
  ];

  // --- MANEJADORES ---
  const handleOpenCreate = () => {
    setSelectedPayment(null);
    setView('FORM');
  };

  const handleEdit = (payment: ProviderPayment) => {
    setSelectedPayment(payment);
    setView('FORM');
  };

  const handleSave = (data: Partial<ProviderPayment>) => {
    console.log("Datos de pago procesados:", data);
    // Aquí se conectaría con la lógica de persistencia
    setView('LIST');
    setSelectedPayment(null);
  };

  const handleBack = () => {
    setView('LIST');
    setSelectedPayment(null);
  };

  // --- VISTA DE FORMULARIO ---
  if (view === 'FORM') {
    return (
      <div className="space-y-8 animate-in slide-in-from-right duration-500">
        <header className="flex items-center gap-6">
          <button 
            onClick={handleBack}
            className="p-4 bg-white border border-[#1a3d2e]/10 rounded-full text-[#1a3d2e] hover:bg-[#1a3d2e] hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <span className="label-caps text-[#C5A059] mb-1 block">Egreso a Proveedor</span>
            <h1 className="serif-display text-4xl text-[#1a3d2e]">
              {selectedPayment ? `Editando: ${selectedPayment.proveedorNombre}` : 'Nuevo Registro de Pago'}
            </h1>
          </div>
        </header>

        <div className="bg-white rounded-[2.5rem] p-10 border border-[#1a3d2e]/5 shadow-sm">
          <ProviderPaymentForm 
            initialData={selectedPayment} 
            onBack={handleBack}
            onSave={handleSave}
          />
        </div>
      </div>
    );
  }

  // --- VISTA DE LISTADO ---
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="label-caps text-[#C5A059] mb-2 block uppercase tracking-widest text-[10px] font-black">
            Gestión de Egresos
          </span>
          <h1 className="serif-display text-5xl md:text-6xl text-[#1a3d2e]">Proveedores</h1>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="bg-[#1a3d2e] text-white px-8 py-4 rounded-full font-label text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#263329] transition-all shadow-xl flex items-center gap-2 active:scale-95"
        >
          <Plus size={16} /> Registrar Nuevo Pago
        </button>
      </header>

      {/* Dashboard de Egresos */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-[#334537]/5 flex items-center gap-5 shadow-sm">
            <div className={`p-4 rounded-2xl bg-[#f6f3ee] ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-[#434843]/40">{stat.label}</p>
              <p className="font-headline italic text-3xl text-[#1a3d2e]">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-[#334537]/10 pb-6">
        <div className="flex gap-8 overflow-x-auto no-scrollbar w-full md:w-auto">
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-label text-[10px] uppercase tracking-widest pb-2 transition-all relative whitespace-nowrap ${
                filter === f ? "text-[#1a3d2e] font-black" : "text-[#434843]/40 hover:text-[#1a3d2e]"
              }`}
            >
              {f}
              {filter === f && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1a3d2e] animate-in slide-in-from-left duration-300" />
              )}
            </button>
          ))}
        </div>
        <div className="text-[9px] text-[#434843]/40 font-bold uppercase tracking-widest italic">
          Mostrando {filteredPayments.length} registros de egresos
        </div>
      </div>

      {/* Grid de Pagos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment) => (
            <ProviderPaymentCard 
              key={payment.id} 
              payment={payment} 
              onEdit={() => handleEdit(payment)} 
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-[#c3c8c1] rounded-[3rem]">
            <p className="font-headline italic text-2xl text-[#c3c8c1]">No se encontraron registros</p>
          </div>
        )}
      </div>
    </div>
  );
};