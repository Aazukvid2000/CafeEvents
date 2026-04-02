'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Plus, Trash2, Save, Send, AlertTriangle, Search, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProductProposal, Ingredient, BaseCategory, UnitOfMeasure } from '../types/chef';
import { MOCK_INSUMOS } from '../mocks/chef.mock';

interface ProductProposalFormProps {
  initialData: ProductProposal | null;
  onBack: () => void;
  onSave: (data: ProductProposal, isDraft: boolean) => void;
}

export const ProductProposalForm = ({ initialData, onBack, onSave }: ProductProposalFormProps) => {
  // --- ESTADOS DEL FORMULARIO ---
  const [form, setForm] = useState<Partial<ProductProposal>>(initialData || {
    nombre: '',
    descripcion: '',
    categoria: 'Comida',
    receta: [],
    modificadores: [],
    precioVentaSugerido: 0,
    estado: 'Borrador'
  });

  // --- ESTADOS DE UI (BUSCADOR E INTERFAZ) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState<'NONE' | 'SUCCESS_SENT' | 'SUCCESS_DRAFT' | 'ERROR_VALIDATION'>('NONE');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredInsumos = MOCK_INSUMOS.filter(i => 
    i.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- CÁLCULOS EN TIEMPO REAL ---
  const metrics = useMemo(() => {
    const costoProd = form.receta?.reduce((acc, curr) => acc + curr.subtotal, 0) || 0;
    const precio = form.precioVentaSugerido || 0;
    const margen = precio > 0 ? ((precio - costoProd) / precio) * 100 : 0;
    return { costoProd, margen };
  }, [form.receta, form.precioVentaSugerido]);

  // --- MANEJADORES DE RECETA ---
  const handleAddIngredient = (insumo: typeof MOCK_INSUMOS[0]) => {
    const newIng: Ingredient = {
      insumoId: insumo.id,
      nombre: insumo.nombre,
      cantidad: 1,
      unidad: insumo.unidad as UnitOfMeasure, // Corregido: Uso de tipo estricto
      costoUnitario: insumo.costoUnitario,
      subtotal: insumo.costoUnitario
    };
    setForm({ ...form, receta: [...(form.receta || []), newIng] });
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const updateQuantity = (index: number, qty: number) => {
    const newReceta = [...(form.receta || [])];
    newReceta[index].cantidad = qty;
    newReceta[index].subtotal = qty * newReceta[index].costoUnitario;
    setForm({ ...form, receta: newReceta });
  };

  const handleAction = (isDraft: boolean) => {
    if (!form.nombre || !form.categoria || (form.receta?.length ?? 0) === 0) {
      setModalType('ERROR_VALIDATION');
      return;
    }
    onSave({ 
      ...form, 
      costoProduccion: metrics.costoProd, 
      margenUtilidadBruto: metrics.margen,
      estado: isDraft ? 'Borrador' : 'Pendiente de Autorización'
    } as ProductProposal, isDraft);
    
    setModalType(isDraft ? 'SUCCESS_DRAFT' : 'SUCCESS_SENT');
  };

  return (
    <div className="relative animate-in slide-in-from-right duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          
          {/* PASO 5: DATOS BÁSICOS */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-[#1a3d2e]/5 shadow-sm space-y-8">
            <h3 className="font-headline italic text-3xl text-[#1a3d2e] border-b border-[#1a3d2e]/5 pb-4">Información del Producto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60">Nombre del Producto *</label>
                <input 
                  type="text" 
                  value={form.nombre}
                  onChange={e => setForm({...form, nombre: e.target.value})}
                  className="w-full bg-[#f6f3ee]/50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10 outline-none font-body"
                  placeholder="Ej. Croissant de Pistacho"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60">Categoría *</label>
                <select 
                  value={form.categoria}
                  onChange={e => setForm({...form, categoria: e.target.value as BaseCategory})}
                  className="w-full bg-[#f6f3ee]/50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10 outline-none cursor-pointer"
                >
                  <option value="Comida">Comida</option>
                  <option value="Bebida">Bebida</option>
                  <option value="Postre">Postre</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60">Descripción Breve</label>
              <textarea 
                value={form.descripcion}
                onChange={e => setForm({...form, descripcion: e.target.value})}
                className="w-full bg-[#f6f3ee]/50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10 outline-none font-body"
                rows={3}
                placeholder="Notas sobre el sabor, presentación o técnica..."
              />
            </div>
          </section>

          {/* PASO 6: ESCANDALLO CON BUSCADOR */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-[#1a3d2e]/5 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h3 className="font-headline italic text-3xl text-[#1a3d2e]">Escandallo (Receta)</h3>
              
              <div className="relative w-full md:w-80" ref={dropdownRef}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a3d2e]/30" size={16} />
                  <input 
                    type="text"
                    placeholder="Buscar insumo de inventario..."
                    value={searchTerm}
                    onFocus={() => setIsDropdownOpen(true)}
                    onChange={(e) => { setSearchTerm(e.target.value); setIsDropdownOpen(true); }}
                    className="w-full pl-11 pr-10 py-3 bg-[#1a3d2e] text-white rounded-full text-[11px] placeholder:text-white/40 focus:ring-2 focus:ring-[#C5A059] outline-none"
                  />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#1a3d2e]/10 rounded-2xl shadow-2xl z-50 max-h-60 overflow-y-auto animate-in zoom-in-95">
                    {filteredInsumos.map(i => (
                      <button key={i.id} onClick={() => handleAddIngredient(i)} className="w-full text-left px-6 py-4 hover:bg-[#f6f3ee] border-b border-[#f6f3ee] last:border-none flex flex-col">
                        <span className="text-xs font-bold text-[#1a3d2e] uppercase">{i.nombre}</span>
                        <span className="text-[9px] text-[#C5A059] font-black uppercase mt-1">Costo: ${i.costoUnitario} / {i.unidad}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 min-h-[150px]">
              {form.receta?.length === 0 && (
                <div className="py-20 text-center text-[#c3c8c1] italic font-headline text-xl">Sin ingredientes añadidos</div>
              )}
              {form.receta?.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-6 p-5 bg-[#fcf9f4]/50 hover:bg-[#f6f3ee] rounded-[1.5rem] transition-all border border-transparent hover:border-[#1a3d2e]/5">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#1a3d2e] uppercase">{ing.nombre}</p>
                    <p className="text-[9px] text-[#434843]/40 font-black uppercase tracking-tighter">${ing.costoUnitario} por {ing.unidad}</p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] uppercase font-black text-[#C5A059]">Cantidad</span>
                      <input 
                        type="number" 
                        value={ing.cantidad}
                        onChange={e => updateQuantity(idx, Number(e.target.value))}
                        className="w-20 text-right font-black bg-transparent border-none text-sm outline-none text-[#1a3d2e]"
                      />
                    </div>
                    <div className="w-20 text-right font-headline text-lg text-[#1a3d2e]">${ing.subtotal.toFixed(2)}</div>
                    <button onClick={() => setForm({...form, receta: form.receta?.filter((_, i) => i !== idx)})} className="text-[#ba1a1a]/30 hover:text-[#ba1a1a] transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* COLUMNA DERECHA: FINANZAS Y ACCIONES */}
        <div className="space-y-6">
          <section className="bg-[#1a3d2e] text-white p-10 rounded-[2.5rem] shadow-2xl space-y-10 sticky top-24">
            <div className="space-y-1">
              <span className="text-[10px] uppercase opacity-40 font-black tracking-widest">Costo de Producción</span>
              <p className="font-headline text-5xl italic text-[#d3e8d5]">${metrics.costoProd.toFixed(2)}</p>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase opacity-40 font-black tracking-widest block">Precio de Venta Sugerido *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">$</span>
                <input 
                  type="number" 
                  value={form.precioVentaSugerido}
                  onChange={e => setForm({...form, precioVentaSugerido: Number(e.target.value)})}
                  className="w-full bg-white/10 border-none rounded-xl p-5 text-3xl font-headline focus:ring-2 focus:ring-[#C5A059] outline-none"
                />
              </div>
            </div>

            <div className={`p-6 rounded-[2rem] border transition-colors ${metrics.margen < 60 ? 'bg-orange-500/20 border-orange-500/50' : 'bg-white/5 border-white/10'}`}>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-black tracking-widest">Margen Bruto</span>
                <span className="font-headline text-4xl italic">{metrics.margen.toFixed(1)}%</span>
              </div>
              {metrics.margen < 60 && metrics.margen > 0 && (
                <p className="text-[9px] mt-3 italic text-orange-200">Margen por debajo del objetivo de rentabilidad.</p>
              )}
            </div>

            <div className="pt-6 space-y-4">
              <button onClick={() => handleAction(false)} className="w-full py-5 bg-[#C5A059] text-[#1a3d2e] rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                <Send size={16} className="inline mr-2" /> Enviar para Autorización
              </button>
              <button onClick={() => handleAction(true)} className="w-full py-5 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/5 transition-all active:scale-95">
                <Save size={16} className="inline mr-2" /> Guardar Borrador
              </button>
            </div>
          </section>

          <button onClick={onBack} className="w-full py-4 text-[#1a3d2e]/40 font-black text-[9px] uppercase tracking-[0.3em] hover:text-[#ba1a1a] transition-colors">
            Cancelar Propuesta
          </button>
        </div>
      </div>

      {/* --- MODALES DE ÉXITO Y ERROR --- */}
      {modalType !== 'NONE' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1c1c19]/60 backdrop-blur-sm animate-in fade-in" onClick={() => modalType === 'ERROR_VALIDATION' && setModalType('NONE')} />
          <div className="relative bg-[#fcf9f4] rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl border border-[#1a3d2e]/10 animate-in zoom-in-95">
            {modalType === 'ERROR_VALIDATION' ? (
              <>
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"><AlertTriangle size={40} className="text-orange-600" /></div>
                <h4 className="font-headline text-2xl text-[#1a3d2e] italic mb-2">Datos Requeridos</h4>
                <p className="text-xs text-[#434843]/70 mb-8 leading-relaxed">Debe asignar un nombre, categoría y al menos un ingrediente a la receta.</p>
                <button onClick={() => setModalType('NONE')} className="w-full py-4 bg-[#1a3d2e] text-white rounded-full text-[10px] font-black uppercase tracking-widest">Corregir</button>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-[#d3e8d5] rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} className="text-[#1a3d2e]" /></div>
                <h4 className="font-headline text-3xl text-[#1a3d2e] italic mb-2">{modalType === 'SUCCESS_SENT' ? 'Enviada' : 'Guardada'}</h4>
                <p className="text-xs text-[#434843]/70 mb-8 leading-relaxed">{modalType === 'SUCCESS_SENT' ? 'Su propuesta de receta ha sido enviada al administrador para revisión.' : 'La receta se ha guardado en sus borradores personales.'}</p>
                <button onClick={onBack} className="w-full py-5 bg-[#1a3d2e] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#263329] transition-all">Ir al Panel <ArrowRight size={14} /></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};