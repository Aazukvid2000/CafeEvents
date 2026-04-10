'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Plus, Trash2, Info, Save, Send, AlertTriangle, 
  CheckCircle2, ArrowRight, Search, ChevronDown 
} from 'lucide-react';
import { EventMenuProposal, EventMenuItem, EventServiceCategory } from '../types/chef';
import { MOCK_PRODUCT_PROPOSALS } from '../mocks/chef.mock';

interface EventMenuFormProps {
  initialData: EventMenuProposal | null;
  onSave: (data: EventMenuProposal, sendToAuth: boolean) => void;
  onBack: () => void;
}

const CATEGORIES: EventServiceCategory[] = ['Entrada', 'Plato Fuerte', 'Postre', 'Bebida', 'Estación', 'Catering'];

export const EventMenuForm = ({ initialData, onSave, onBack }: EventMenuFormProps) => {
  // --- ESTADO DEL FORMULARIO ---
  const [formData, setFormData] = useState<Partial<EventMenuProposal>>(
    initialData || { 
      nombre: '', 
      descripcion: '', 
      tipoEvento: '', 
      paxMinimo: 10, 
      paxMaximo: 50, 
      precioSugeridoPorPax: 0, 
      items: [], 
      notasEspeciales: '', 
      estado: 'Borrador' 
    }
  );

  // --- ESTADOS DE UI Y VALIDACIÓN ---
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [modalType, setModalType] = useState<'NONE' | 'SUCCESS_SENT' | 'SUCCESS_DRAFT' | 'ERROR_VALIDATION'>('NONE');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Lógica de detección de edición de autorizados (RN: E2)
  const isEditingAuthorized = initialData?.estado === 'Autorizado' || initialData?.estado === 'Pendiente de Autorización';

  // --- LÓGICA DE NEGOCIO (BUSCADOR) ---
  const activeProducts = MOCK_PRODUCT_PROPOSALS.filter(p => p.estado === 'Pendiente de Autorización'); 
  const filteredSuggestions = activeProducts.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- CÁLCULOS MÉTRICOS ---
  const metrics = useMemo(() => {
    const costoPorPax = formData.items?.reduce((sum, item) => 
      sum + (item.costoUnitarioBase * item.cantidadPorPersona), 0) || 0;
    const precioPax = formData.precioSugeridoPorPax || 0;
    const margen = precioPax > 0 ? ((precioPax - costoPorPax) / precioPax) * 100 : 0;
    return { costoPorPax, margen };
  }, [formData.items, formData.precioSugeridoPorPax]);

  // --- MANEJADORES ---
  const handleAddItem = (prod: typeof activeProducts[0]) => {
    const newItem: EventMenuItem = {
      productoId: prod.id,
      nombre: prod.nombre,
      categoriaServicio: 'Plato Fuerte',
      cantidadPorPersona: 1,
      costoUnitarioBase: prod.costoProduccion
    };
    setFormData(prev => ({ ...prev, items: [...(prev.items || []), newItem] }));
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({ ...prev, items: prev.items?.filter((_, i) => i !== index) }));
  };

  const handleAction = (sendToAuth: boolean) => {
    // Regla de Negocio E2: Validar nombre duplicado en edición de autorizados
    if (isEditingAuthorized && formData.nombre === initialData?.nombre) {
      setNameError(true);
      return;
    }

    // Regla de Negocio E3: Validar campos obligatorios
    if (!formData.nombre || !formData.tipoEvento || (formData.items?.length ?? 0) === 0) {
      setModalType('ERROR_VALIDATION');
      return;
    }
    
    onSave(formData as EventMenuProposal, sendToAuth);
    setModalType(sendToAuth ? 'SUCCESS_SENT' : 'SUCCESS_DRAFT');
  };

  return (
    <div className="relative animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* COLUMNA IZQUIERDA: CONFIGURACIÓN */}
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-6">
            <h3 className="font-headline italic text-2xl text-[#1a3d2e] border-b border-[#1a3d2e]/10 pb-2">Información del Evento</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CAMPO NOMBRE CON VALIDACIÓN E2 */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60">
                  Nombre del Menú * {isEditingAuthorized && <span className="text-[#C5A059] ml-1">(Versión Nueva Req.)</span>}
                </label>
                <input 
                  type="text" 
                  value={formData.nombre} 
                  onChange={e => { setFormData({...formData, nombre: e.target.value}); setNameError(false); }} 
                  placeholder="Ej. Boda Alabaster Verano" 
                  className={`bg-[#f6f3ee]/50 border-none rounded-xl p-4 text-sm focus:ring-2 outline-none transition-all
                    ${nameError ? 'ring-2 ring-[#ba1a1a] bg-red-50' : 'focus:ring-[#1a3d2e]/10'}`} 
                />
                {nameError && (
                  <p className="text-[9px] text-[#ba1a1a] font-bold uppercase italic">E2: El nombre debe ser diferente al original para la nueva revisión.</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60">Tipo de Evento *</label>
                <select value={formData.tipoEvento} onChange={e => setFormData({...formData, tipoEvento: e.target.value})} className="bg-[#f6f3ee]/50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10 outline-none">
                  <option value="">Seleccionar...</option>
                  <option value="Boda">Boda</option>
                  <option value="Corporativo">Corporativo</option>
                  <option value="Gala">Gala</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60">Descripción y Notas Especiales</label>
              <textarea rows={3} value={formData.notasEspeciales} onChange={e => setFormData({...formData, notasEspeciales: e.target.value})} className="bg-[#f6f3ee]/50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10 outline-none" placeholder="Detalles sobre equipo, decoración o tiempos..." />
            </div>
          </section>

          {/* SECCIÓN 2: COMPOSICIÓN (BUSCADOR PREDICTIVO) */}
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1a3d2e]/10 pb-4">
              <h3 className="font-headline italic text-2xl text-[#1a3d2e]">Composición del Menú</h3>
              
              <div className="relative w-full md:w-80" ref={dropdownRef}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a3d2e]/30" size={14} />
                  <input 
                    type="text"
                    placeholder="Buscar producto autorizado..."
                    value={searchTerm}
                    onFocus={() => setIsDropdownOpen(true)}
                    onChange={(e) => { setSearchTerm(e.target.value); setIsDropdownOpen(true); }}
                    className="w-full pl-9 pr-8 py-2.5 bg-[#1a3d2e] text-white rounded-full text-[11px] placeholder:text-white/40 focus:ring-2 focus:ring-[#C5A059] outline-none"
                  />
                  <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={14} />
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#1a3d2e]/10 rounded-2xl shadow-2xl z-[50] max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map(p => (
                        <button key={p.id} onClick={() => handleAddItem(p)} className="w-full text-left px-5 py-3 hover:bg-[#f6f3ee] border-b border-[#f6f3ee] last:border-none flex flex-col transition-colors">
                          <span className="text-xs font-bold text-[#1a3d2e] uppercase">{p.nombre}</span>
                          <span className="text-[9px] text-[#434843]/40 font-bold uppercase tracking-tighter">Costo Base: ${p.costoProduccion.toFixed(2)}</span>
                        </button>
                      ))
                    ) : (
                      <div className="p-5 text-center text-[10px] text-[#434843]/40 italic">No se encontraron productos autorizados</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 min-h-[250px]">
              {formData.items?.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 opacity-20 italic">
                  <Plus size={48} strokeWidth={1} />
                  <p className="text-sm font-headline">Use el buscador superior para añadir productos</p>
                </div>
              )}
              {formData.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-white border border-[#1a3d2e]/5 p-5 rounded-2xl group shadow-sm animate-in slide-in-from-left duration-300">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#1a3d2e] uppercase">{item.nombre}</p>
                    <select value={item.categoriaServicio} onChange={(e) => {
                      const newItems = [...(formData.items || [])];
                      newItems[index].categoriaServicio = e.target.value as EventServiceCategory;
                      setFormData({...formData, items: newItems});
                    }} className="text-[9px] uppercase tracking-widest font-black text-[#C5A059] bg-transparent border-none p-0 focus:ring-0 cursor-pointer">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] opacity-40 uppercase font-bold tracking-tighter">Porción/Pax</span>
                      <input type="number" step="0.1" value={item.cantidadPorPersona} onChange={e => {
                        const newItems = [...(formData.items || [])];
                        newItems[index].cantidadPorPersona = Number(e.target.value);
                        setFormData({...formData, items: newItems});
                      }} className="w-16 text-right font-body font-bold text-sm bg-transparent border-none focus:ring-0 outline-none" />
                    </div>
                    <button onClick={() => removeItem(index)} className="text-[#ba1a1a]/30 hover:text-[#ba1a1a] transition-all hover:scale-110"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* COLUMNA DERECHA: FINANZAS Y ACCIONES */}
        <div className="space-y-8">
          <div className="bg-[#1a3d2e] text-white rounded-[2.5rem] p-8 space-y-8 shadow-2xl sticky top-24">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <Info size={16} className="text-[#C5A059]" />
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-black">Resumen Financiero PAX</h4>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] uppercase opacity-60 font-bold">Costo Producción</span>
                <span className="font-headline text-2xl">${metrics.costoPorPax.toFixed(2)}</span>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] uppercase opacity-60 font-bold block">Precio de Venta Sugerido *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">$</span>
                  <input type="number" value={formData.precioSugeridoPorPax} onChange={e => setFormData({...formData, precioSugeridoPorPax: Number(e.target.value)})} className="w-full bg-white/10 border-none rounded-xl pl-8 pr-4 py-4 text-xl font-headline focus:ring-2 focus:ring-[#C5A059] outline-none" />
                </div>
              </div>

              <div className={`p-5 rounded-2xl flex justify-between items-center transition-colors ${metrics.margen < 70 ? 'bg-orange-500/20 border border-orange-500/50' : 'bg-white/10'}`}>
                <span className="text-[10px] uppercase font-bold">Margen Bruto</span>
                <span className="font-headline text-3xl italic">{metrics.margen.toFixed(1)}%</span>
              </div>
              
              {metrics.margen < 70 && metrics.margen > 0 && (
                <div className="flex gap-2 text-orange-200 animate-in fade-in">
                  <AlertTriangle size={14} className="shrink-0" />
                  <p className="text-[9px] leading-tight italic opacity-80">Margen por debajo del objetivo (70%). Se notificará como advertencia al Administrador.</p>
                </div>
              )}
            </div>

            <div className="pt-8 space-y-4">
              <button onClick={() => handleAction(true)} className="w-full py-5 bg-[#C5A059] text-[#1a3d2e] rounded-full font-label text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-lg"><Send size={16} /> Enviar Propuesta</button>
              <button onClick={() => handleAction(false)} className="w-full py-5 border border-white/20 rounded-full font-label text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white/5 transition-all active:scale-95"><Save size={16} /> Guardar Borrador</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALES DE ESTADO --- */}
      {modalType !== 'NONE' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1c1c19]/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => modalType === 'ERROR_VALIDATION' && setModalType('NONE')} />
          <div className="relative bg-[#fcf9f4] rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl border border-[#1a3d2e]/10 animate-in zoom-in-95 duration-300">
            {modalType === 'ERROR_VALIDATION' ? (
              <>
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"><AlertTriangle size={40} className="text-orange-600" /></div>
                <h4 className="font-headline text-2xl text-[#1a3d2e] italic mb-2">Datos Incompletos</h4>
                <p className="text-xs text-[#434843]/70 mb-8">E3: Nombre, tipo de evento y productos autorizados son obligatorios.</p>
                <button onClick={() => setModalType('NONE')} className="w-full py-4 bg-[#1a3d2e] text-white rounded-full text-[10px] font-black uppercase tracking-widest">Revisar Campos</button>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-[#d3e8d5] rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} className="text-[#1a3d2e]" /></div>
                <h4 className="font-headline text-3xl text-[#1a3d2e] italic mb-2">{modalType === 'SUCCESS_SENT' ? 'Enviado' : 'Guardado'}</h4>
                <p className="text-xs text-[#434843]/70 mb-8 leading-relaxed">{modalType === 'SUCCESS_SENT' ? 'Propuesta enviada al administrador para revisión financiera.' : 'Borrador guardado correctamente en sus propuestas.'}</p>
                <button onClick={onBack} className="w-full py-5 bg-[#1a3d2e] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#263329] transition-all">Regresar al Panel <ArrowRight size={14} /></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};