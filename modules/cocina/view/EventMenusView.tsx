'use client';

import React, { useState } from 'react';
import { Plus, Search, Sparkles, ArrowLeft } from 'lucide-react';
import { EventMenuCard } from '../components/EventMenuCard';
import { EventMenuForm } from '../components/EventMenuForm';
import { MOCK_EVENT_PROPOSALS } from '../mocks/chef.mock';
import { EventMenuProposal } from '../types/chef';

type EventFilter = 'TODOS' | 'AUTORIZADOS' | 'PENDIENTES' | 'BORRADOR';

export const EventMenusView = () => {
  // --- ESTADOS DE NAVEGACIÓN ---
  const [view, setView] = useState<'LIST' | 'FORM'>('LIST');
  const [selectedProposal, setSelectedProposal] = useState<EventMenuProposal | null>(null);

  // --- ESTADOS DE FILTRADO ---
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<EventFilter>('TODOS');

  // --- LÓGICA DE FLUJO ---
  const handleCreateNew = () => {
    setSelectedProposal(null);
    setView('FORM');
  };

  const handleEdit = (menu: EventMenuProposal) => {
    setSelectedProposal(menu);
    setView('FORM');
  };

  const handleBack = () => {
    setView('LIST');
    setSelectedProposal(null);
  };

  // --- FILTRADO ---
  const filteredMenus = MOCK_EVENT_PROPOSALS.filter(menu => {
    const matchesSearch = menu.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeFilter === 'TODOS') return matchesSearch;
    const statusMap: Record<EventFilter, string> = {
      TODOS: '',
      AUTORIZADOS: 'Autorizado',
      PENDIENTES: 'Pendiente de Autorización',
      BORRADOR: 'Borrador'
    };
    return matchesSearch && menu.estado === statusMap[activeFilter];
  });

  // --- RENDERIZADO CONDICIONAL ---

  // VISTA 2: FORMULARIO DE PROPUESTA (CREAR / EDITAR)
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
            <span className="label-caps text-[#C5A059] mb-1 block">Configuración de Banquete</span>
            <h1 className="serif-display text-4xl text-[#1a3d2e]">
              {selectedProposal ? `Editando: ${selectedProposal.nombre}` : 'Nueva Propuesta de Menú'}
            </h1>
          </div>
        </header>

        {/* El contenedor principal ya tiene el estilo, no necesitamos anidar más */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-[#1a3d2e]/5 shadow-sm">
          <EventMenuForm 
            initialData={selectedProposal} 
            onBack={handleBack} // <--- Propiedad faltante agregada
            onSave={(data, sendToAuth) => {
              console.log("Guardando datos:", data, "Enviar?", sendToAuth);
              // La navegación de regreso ahora la maneja el botón dentro del modal de éxito en el Form
            }} 
          />
        </div>
      </div>
    );
  }

  // VISTA 1: LISTADO
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#C5A059]">
            <Sparkles size={16} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Planificación Estratégica</span>
          </div>
          <h1 className="serif-display text-5xl md:text-6xl text-[#1a3d2e]">Menús de Eventos</h1>
          <p className="text-[#5f5e5e] text-sm max-w-xl font-body italic">
            Diseña experiencias gastronómicas. Recuerda que toda modificación genera una nueva propuesta para revisión.
          </p>
        </div>
        <button 
          onClick={handleCreateNew}
          className="bg-[#1a3d2e] text-white px-10 py-5 rounded-full font-label text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#263329] transition-all shadow-xl shadow-[#1a3d2e]/20 flex items-center gap-2 active:scale-95"
        >
          <Plus size={16} /> Proponer Nuevo Menú
        </button>
      </header>

      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-white p-4 rounded-[2.5rem] border border-[#334537]/5 shadow-sm">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#434843]/30" size={18} />
            <input 
              type="text"
              placeholder="Buscar banquete por nombre..."
              className="w-full pl-14 pr-6 py-4 bg-[#f6f3ee]/50 rounded-full border-none focus:ring-2 focus:ring-[#1a3d2e]/10 outline-none text-sm font-body"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 p-1 bg-[#f6f3ee]/80 rounded-full w-full lg:w-auto overflow-x-auto no-scrollbar shadow-inner">
            {(['TODOS', 'AUTORIZADOS', 'PENDIENTES', 'BORRADOR'] as EventFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === f 
                  ? "bg-[#1a3d2e] text-white shadow-lg" 
                  : "text-[#1a3d2e]/40 hover:text-[#1a3d2e]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
        {filteredMenus.map((menu) => (
          <EventMenuCard 
            key={menu.id} 
            menu={menu} 
            onView={handleEdit} 
          />
        ))}    
      </div>
    </div>
  );
};