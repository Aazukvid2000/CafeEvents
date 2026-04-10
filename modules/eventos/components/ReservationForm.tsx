'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calendar, ArrowLeft, Save, User, MapPin, 
  Phone, Mail, CheckCircle2, AlertTriangle, 
  Utensils, Users 
} from 'lucide-react';
import { VenueSelector } from './VenueSelector';
import { VenueType, Reservacion } from '../types/gerente';

// Mock de Menú de Cafetería
const CAFE_MENU = [
  { id: 'prod-01', nombre: 'Desayuno Buffet Ejecutivo', precio: 250 },
  { id: 'prod-02', nombre: 'Brunch Gourmet Alabaster', precio: 320 },
  { id: 'prod-03', nombre: 'Cena de Gala Tres Tiempos', precio: 450 },
  { id: 'prod-04', nombre: 'Barra de Repostería Fina', precio: 180 },
];

type ModalType = 'NONE' | 'SUCCESS' | 'ERROR';

interface ReservationFormProps {
  onBack: () => void;
  onSave: (data: Omit<Reservacion, 'id' | 'fechaCreacion' | 'estado' | 'saldoPendiente'>) => Promise<boolean>;
}

export const ReservationForm = ({ onBack, onSave }: ReservationFormProps) => {
  const [activeModal, setActiveModal] = useState<ModalType>('NONE');
  
  const initialForm: Omit<Reservacion, 'id' | 'fechaCreacion' | 'estado' | 'saldoPendiente'> = {
    salon: 'CAFETERIA',
    pax: 20,
    fechaEvento: '',
    horaEvento: '',
    cliente: { nombre: '', direccion: '', telefono: '', correo: '' },
    platillosIds: [],
    serviciosAdicionales: { meseros: false },
    costoTotal: 0,
    anticipoPagado: 0,
  };

  const [formData, setFormData] = useState(initialForm);

  const financialSummary = useMemo(() => {
    const costoPlatillos = formData.platillosIds.reduce((acc, id) => {
      const item = CAFE_MENU.find(m => m.id === id);
      return acc + (item ? item.precio * formData.pax : 0);
    }, 0);

    const costoMeseros = formData.serviciosAdicionales.meseros ? (formData.pax * 50) : 0;
    const total = costoPlatillos + costoMeseros;
    const anticipo = total * 0.5;

    return { total, anticipo };
  }, [formData.platillosIds, formData.pax, formData.serviciosAdicionales.meseros]);

  const handleTogglePlatillo = (id: string) => {
    setFormData(prev => ({
      ...prev,
      platillosIds: prev.platillosIds.includes(id) 
        ? prev.platillosIds.filter(pid => pid !== id)
        : [...prev.platillosIds, id]
    }));
  };

  const validateAndSave = async () => {
    const { cliente, fechaEvento, horaEvento, platillosIds } = formData;
    
    if (!cliente.nombre || !cliente.direccion || !cliente.telefono || !cliente.correo || 
        !fechaEvento || !horaEvento || platillosIds.length === 0) {
      setActiveModal('ERROR');
      return;
    }

    const success = await onSave({
      ...formData,
      costoTotal: financialSummary.total,
      anticipoPagado: financialSummary.anticipo
    });

    if (success) setActiveModal('SUCCESS');
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-right duration-500 pb-20">
      <header className="flex items-center gap-6">
        <button onClick={onBack} className="p-4 bg-white border border-[#1a3d2e]/10 rounded-full text-[#1a3d2e] hover:bg-[#1a3d2e] hover:text-white transition-all shadow-sm active:scale-90">
          <ArrowLeft size={20} />
        </button>
        <div>
          <span className="label-caps text-[#C5A059] mb-1 block uppercase tracking-widest text-[10px] font-black">Planificación de Banquete</span>
          <h1 className="serif-display text-5xl text-[#1a3d2e]">Nueva Reservación</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white rounded-[2.5rem] p-10 border border-[#1a3d2e]/5 shadow-sm">
            <VenueSelector 
              selected={formData.salon as VenueType}
              pax={formData.pax}
              onSelect={(v: VenueType) => setFormData({...formData, salon: v})}
              onPaxChange={(p: number) => setFormData({...formData, pax: p})}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pt-10 border-t border-[#1a3d2e]/5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60 px-2 flex items-center gap-2"><Calendar size={12} /> Fecha del Evento *</label>
                <input type="date" className="w-full bg-[#f6f3ee]/50 border-none rounded-2xl p-4 text-sm outline-none" onChange={(e) => setFormData({...formData, fechaEvento: e.target.value})} />
                <p className="text-[9px] text-[#C5A059] font-bold px-2 italic">Mínimo 15 días de antelación.</p>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60 px-2 flex items-center gap-2"><Users size={12} /> Hora de Inicio *</label>
                <input type="time" className="w-full bg-[#f6f3ee]/50 border-none rounded-2xl p-4 text-sm outline-none" onChange={(e) => setFormData({...formData, horaEvento: e.target.value})} />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[2.5rem] p-10 border border-[#1a3d2e]/5 shadow-sm space-y-8">
            <h3 className="font-headline italic text-3xl text-[#1a3d2e]">Información del Cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a3d2e]/20" size={18} />
                <input placeholder="Nombre Completo *" className="w-full pl-12 pr-4 py-4 bg-[#f6f3ee]/50 rounded-xl text-sm outline-none" onChange={(e) => setFormData({...formData, cliente: {...formData.cliente, nombre: e.target.value}})} />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a3d2e]/20" size={18} />
                <input placeholder="Teléfono *" className="w-full pl-12 pr-4 py-4 bg-[#f6f3ee]/50 rounded-xl text-sm outline-none" onChange={(e) => setFormData({...formData, cliente: {...formData.cliente, telefono: e.target.value}})} />
              </div>
              <div className="relative md:col-span-2">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a3d2e]/20" size={18} />
                <input placeholder="Dirección Fiscal *" className="w-full pl-12 pr-4 py-4 bg-[#f6f3ee]/50 rounded-xl text-sm outline-none" onChange={(e) => setFormData({...formData, cliente: {...formData.cliente, direccion: e.target.value}})} />
              </div>
              <div className="relative md:col-span-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a3d2e]/20" size={18} />
                <input placeholder="Correo Electrónico *" className="w-full pl-12 pr-4 py-4 bg-[#f6f3ee]/50 rounded-xl text-sm outline-none" onChange={(e) => setFormData({...formData, cliente: {...formData.cliente, correo: e.target.value}})} />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[2.5rem] p-10 border border-[#1a3d2e]/5 shadow-sm space-y-6">
            <h3 className="font-headline italic text-3xl text-[#1a3d2e]">Menú y Servicios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAFE_MENU.map(item => (
                <button key={item.id} onClick={() => handleTogglePlatillo(item.id)} className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${formData.platillosIds.includes(item.id) ? 'border-[#1a3d2e] bg-[#f6f3ee]' : 'border-[#f0ede8]'}`}>
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#1a3d2e]">{item.nombre}</p>
                    <p className="text-[10px] text-[#C5A059] font-black">${item.precio}/pp</p>
                  </div>
                  <Utensils size={16} className={formData.platillosIds.includes(item.id) ? 'text-[#1a3d2e]' : 'text-[#c3c8c1]'} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-6 p-4 bg-[#fcf9f4] rounded-2xl border border-[#1a3d2e]/5">
              <input type="checkbox" id="meseros" className="w-5 h-5 accent-[#1a3d2e]" onChange={(e) => setFormData({...formData, serviciosAdicionales: { meseros: e.target.checked }})} />
              <label htmlFor="meseros" className="text-sm font-bold text-[#1a3d2e]">Servicio de meseros (+ $50/pp)</label>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <aside className="bg-[#1a3d2e] text-white p-10 rounded-[3rem] shadow-2xl sticky top-24 space-y-10">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Costo Total</p>
              <p className="font-headline text-5xl italic text-[#C5A059]">${financialSummary.total.toLocaleString()}</p>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase opacity-60">Anticipo (50%)</span>
                <span className="font-headline text-2xl">${financialSummary.anticipo.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={validateAndSave} className="w-full py-5 bg-[#C5A059] text-[#1a3d2e] rounded-full font-label text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
              <Save size={18} /> Registrar Reservación
            </button>
          </aside>
        </div>
      </div>

      {/* MODALES */}
      {activeModal === 'SUCCESS' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#1c1c19]/60 backdrop-blur-md" />
          <div className="relative bg-[#fcf9f4] rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl border border-[#1a3d2e]/10 animate-in zoom-in-95">
            <div className="w-20 h-20 bg-[#d3e8d5] rounded-full flex items-center justify-center mx-auto mb-6 text-[#1a3d2e]"><CheckCircle2 size={40} /></div>
            <h4 className="font-headline text-3xl text-[#1a3d2e] italic mb-4">¡Reservación Creada!</h4>
            <p className="text-xs text-[#434843]/70 mb-8 italic text-balance leading-relaxed">Contrato enviado a: <span className="font-bold text-[#1a3d2e]">{formData.cliente.correo}</span></p>
            <button onClick={onBack} className="w-full py-4 bg-[#1a3d2e] text-white rounded-full text-[10px] font-black uppercase tracking-widest">Volver al Panel</button>
          </div>
        </div>
      )}

      {activeModal === 'ERROR' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#1c1c19]/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600"><AlertTriangle size={32} /></div>
            <h4 className="font-headline text-2xl text-[#1a3d2e] italic mb-2">Datos Incompletos</h4>
            <p className="text-xs text-[#434843]/60 mb-8 italic">Todos los campos son obligatorios para generar el contrato.</p>
            <button onClick={() => setActiveModal('NONE')} className="w-full py-4 border border-[#1a3d2e] text-[#1a3d2e] rounded-full text-[10px] font-black uppercase tracking-widest">Revisar Formulario</button>
          </div>
        </div>
      )}
    </div>
  );
};