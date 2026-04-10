'use client';

import React, { useState } from 'react';
import { Plus, LayoutGrid, Clock, TrendingUp, Utensils, ArrowLeft } from 'lucide-react';

// Componentes del módulo
import { StatCard } from '../components/StatCard';
import { ProposalCard } from '../components/ProposalCard';
import { ProductProposalForm } from '../components/ProductProposalForm';

// Mocks y Tipos
import { MOCK_PRODUCT_PROPOSALS } from '../mocks/chef.mock';
import { ProductProposal, ProposalStatus } from '../types/chef';

type FilterStatus = 'Todas' | Extract<ProposalStatus, 'Pendiente de Autorización' | 'Borrador'>;

export const ChefProposalsView = () => {
  // --- ESTADOS DE NAVEGACIÓN ---
  const [isCreating, setIsCreating] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<ProductProposal | null>(null);

  // --- ESTADOS DE LISTADO ---
  const [filterRecetas, setFilterRecetas] = useState<FilterStatus>('Todas');
  const FILTER_OPTIONS: FilterStatus[] = ['Todas', 'Pendiente de Autorización', 'Borrador'];

  // --- LÓGICA DE FILTRADO ---
  const filteredProposals = MOCK_PRODUCT_PROPOSALS.filter(prop => 
    filterRecetas === 'Todas' ? true : prop.estado === filterRecetas
  );

  // --- MANEJADORES DE FLUJO ---
  const handleOpenCreate = () => {
    setSelectedProposal(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (proposal: ProductProposal) => {
    setSelectedProposal(proposal);
    setIsCreating(false); // No es "nuevo", es edición
  };

  const handleCloseForm = () => {
    setIsCreating(false);
    setSelectedProposal(null);
  };

  const handleSaveProposal = (data: ProductProposal, isDraft: boolean) => {
    // Aquí se conectaría con el servicio de API (Postconditions del caso de uso)
    console.log(`Propuesta guardada como ${isDraft ? 'Borrador' : 'Pendiente'}:`, data);
    handleCloseForm();
  };

  // --- VISTA: FORMULARIO (CREAR O EDITAR) ---
  if (isCreating || selectedProposal) {
    return (
      <div className="space-y-10 pb-20 animate-in slide-in-from-right duration-500">
        <header className="flex items-center gap-6 border-b border-[#334537]/5 pb-8">
          <button 
            onClick={handleCloseForm}
            className="p-3 bg-white border border-[#1a3d2e]/10 rounded-full hover:bg-[#1a3d2e] hover:text-white transition-all shadow-sm active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <span className="label-caps text-[#C5A059] mb-1 block uppercase tracking-widest text-[10px] font-black">
              Ficha Técnica
            </span>
            <h1 className="serif-display text-4xl text-[#1a3d2e]">
              {selectedProposal ? `Editando: ${selectedProposal.nombre}` : 'Nueva Propuesta Culinaria'}
            </h1>
          </div>
        </header>

        <ProductProposalForm 
          initialData={selectedProposal}
          onBack={handleCloseForm}
          onSave={handleSaveProposal}
        />
      </div>
    );
  }

  // --- VISTA: LISTADO (DASHBOARD) ---
  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      <header className="border-b border-[#334537]/5 pb-8">
        <span className="label-caps text-[#C5A059] mb-2 block uppercase tracking-widest text-[10px] font-black">
          Planeación Culinaria
        </span>
        <h1 className="serif-display text-5xl md:text-6xl text-[#1a3d2e]">
          Mis Propuestas
        </h1>
      </header>

      {/* Grid de Estadísticas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard 
          label="Total Propuestas" 
          value={MOCK_PRODUCT_PROPOSALS.length} 
          icon={LayoutGrid} 
        />
        <StatCard 
          label="En Revisión" 
          value={MOCK_PRODUCT_PROPOSALS.filter(p => p.estado === 'Pendiente de Autorización').length} 
          icon={Clock} 
          trend="Acción requerida" 
        />
        <StatCard 
          label="Margen Promedio" 
          value="78%" 
          icon={TrendingUp} 
        />
        <StatCard 
          label="Menús de Eventos" 
          value="03" 
          icon={Utensils} 
        />
      </section>

      <div className="space-y-8">
        {/* Filtros y Botón Nueva Propuesta */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#334537]/10 pb-4 gap-4">
          <div className="flex gap-8">
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setFilterRecetas(f)}
                className={`font-label text-[10px] uppercase tracking-widest pb-4 transition-all relative ${
                  filterRecetas === f ? "text-[#1a3d2e] font-black" : "text-[#434843]/40 hover:text-[#1a3d2e]"
                }`}
              >
                {f}
                {filterRecetas === f && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1a3d2e] animate-in slide-in-from-left duration-300" />
                )}
              </button>
            ))}
          </div>
          <button 
            onClick={handleOpenCreate}
            className="bg-[#1a3d2e] text-white px-6 py-3 rounded-full font-label text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 hover:bg-[#263329] transition-all shadow-lg active:scale-95"
          >
            <Plus size={14} /> Nueva Propuesta
          </button>
        </div>

        {/* Listado de Propuestas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProposals.map((proposal: ProductProposal) => (
            <div key={proposal.id} onClick={() => handleOpenEdit(proposal)} className="cursor-pointer">
              <ProposalCard
                nombre={proposal.nombre}
                categoria={proposal.categoria}
                costo={proposal.costoProduccion}
                precioSugerido={proposal.precioVentaSugerido}
                estado={proposal.estado}
                fecha={proposal.fechaCreacion}
              />
            </div>
          ))}

          {/* Card Especial de Creación */}
          <button 
            onClick={handleOpenCreate}
            className="border-2 border-dashed border-[#c3c8c1]/50 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-[#c3c8c1] hover:border-[#1a3d2e] hover:text-[#1a3d2e] transition-all min-h-[320px] group bg-[#f6f3ee]/30"
          >
            <Plus size={24} className="mb-4 group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-label text-[10px] uppercase tracking-[0.3em] font-black">Crear nueva propuesta</span>
          </button>
        </div>
      </div>
    </div>
  );
};