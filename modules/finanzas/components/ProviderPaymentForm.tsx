'use client';
import React, { useState } from 'react';
import { Save, X, AlertCircle, Info } from 'lucide-react';
import { ProviderPayment } from '../types/contador';

interface ProviderPaymentFormProps {
  initialData: ProviderPayment | null;
  onBack: () => void;
  onSave: (data: Partial<ProviderPayment>) => void;
}

export const ProviderPaymentForm = ({ initialData, onBack, onSave }: ProviderPaymentFormProps) => {
  const [form, setForm] = useState<Partial<ProviderPayment>>(initialData || {
    proveedorNombre: '',
    monto: 0,
    descripcion: '',
    numeroCuenta: '',
    formatoEntrega: '',
    estado: 'Pendiente'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validación de datos obligatorios (Excepción E1) [cite: 118]
    if (!form.proveedorNombre || !form.monto || !form.numeroCuenta) {
      alert("Error E1: Por favor complete los campos obligatorios (*)");
      return;
    }
    onSave(form);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-10 border border-[#1a3d2e]/5 shadow-xl space-y-8">
        <div className="flex justify-between items-center border-b border-[#f6f3ee] pb-6">
          <h3 className="font-headline italic text-3xl text-[#1a3d2e]">
            {initialData ? 'Editar Registro de Pago' : 'Nuevo Pago a Proveedor'}
          </h3>
          <button type="button" onClick={onBack} className="p-2 hover:bg-[#f6f3ee] rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60 px-2">Nombre del Proveedor *</label>
            <input 
              type="text" 
              required
              value={form.proveedorNombre}
              onChange={e => setForm({...form, proveedorNombre: e.target.value})}
              className="w-full bg-[#f6f3ee]/50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10"
              placeholder="Ej. Cafés Especiales del Sur"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60 px-2">Monto a Pagar ($) *</label>
            <input 
              type="number" 
              required
              value={form.monto || ''}
              onChange={e => setForm({...form, monto: Number(e.target.value)})}
              className="w-full bg-[#f6f3ee]/50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10 font-bold"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60 px-2">Número de Cuenta / CLABE *</label>
            <input 
              type="text" 
              required
              value={form.numeroCuenta}
              onChange={e => setForm({...form, numeroCuenta: e.target.value})}
              className="w-full bg-[#f6f3ee]/50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10"
              placeholder="0000 0000 0000 0000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60 px-2">Formato de Entrega</label>
            <input 
              type="text" 
              value={form.formatoEntrega}
              onChange={e => setForm({...form, formatoEntrega: e.target.value})}
              className="w-full bg-[#f6f3ee]/50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10"
              placeholder="Ej. Almacén Central"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60 px-2">Descripción del Pago</label>
          <textarea 
            value={form.descripcion}
            onChange={e => setForm({...form, descripcion: e.target.value})}
            className="w-full bg-[#f6f3ee]/50 border-none rounded-3xl p-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10"
            rows={3}
            placeholder="Detalle de los insumos recibidos..."
          />
        </div>

        {/* Nota sobre factura (Excepción S2) [cite: 115] */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3 items-start">
          <Info size={18} className="text-blue-600 mt-0.5" />
          <p className="text-[10px] text-blue-800 leading-relaxed font-medium">
            Una vez realizado el pago, el sistema solicitará en un plazo de 48 horas la entrega de la factura electrónica CFDI para su registro final.
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit"
            className="flex-1 py-5 bg-[#1a3d2e] text-white rounded-full font-label text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-[#263329] transition-all"
          >
            <Save size={16} className="inline mr-2" /> Confirmar y Enviar Comprobante
          </button>
        </div>
      </form>
    </div>
  );
};