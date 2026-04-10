'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface CFDIFormData {
  rfc: string;
  razonSocial: string;
  codigoPostal: string;
  email: string;
  usoCFDI: string;
  regimenFiscal: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: CFDIFormData) => void;
}

export const CFDIDialog = ({ isOpen, onClose, onConfirm }: Props) => {
  const [formData, setFormData] = useState<CFDIFormData>({
    rfc: '',
    razonSocial: '',
    codigoPostal: '',
    email: '',
    usoCFDI: 'G03',
    regimenFiscal: '601'
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setShowSuccess(false);
      setError(null);
    }, 300); 
  };

  if (!isOpen) return null;

  const validate = () => {
    const { rfc, razonSocial, codigoPostal, email, regimenFiscal, usoCFDI } = formData;
    if (!rfc || !razonSocial || !codigoPostal || !email || !regimenFiscal || !usoCFDI) {
      setError("Todos los campos marcados son obligatorios.");
      return false;
    }
    return true;
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onConfirm(formData);
      setShowSuccess(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      {/* OVERLAY */}
      <div 
        className="absolute inset-0 bg-[#1c1c19]/60 backdrop-blur-[6px] animate-in fade-in duration-300"
        onClick={showSuccess ? undefined : handleClose}
      />
      
      {/* DIÁLOGO PRINCIPAL: Responsivo con max-h-[90vh] y scroll interno */}
      <div className="relative w-full max-w-2xl bg-[#fcf9f4] rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-[#c3c8c1]/30 animate-in zoom-in-95 duration-300">
        
        {!showSuccess ? (
          <>
            {/* Header Fijo */}
            <div className="px-6 sm:px-10 pt-8 sm:pt-10 pb-4 sm:pb-6 flex justify-between items-start shrink-0">
              <div className="space-y-1">
                <h2 className="font-headline text-3xl sm:text-4xl italic text-[#1a3d2e] tracking-tight">Facturación Fiscal</h2>
                <p className="font-body text-[10px] sm:text-[11px] uppercase tracking-widest text-[#434843]/60 font-bold">Datos CFDI 4.0 Obligatorios</p>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-[#1a3d2e]/5 rounded-full text-[#1a3d2e]/40 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Formulario con Scroll Interno */}
            <form onSubmit={handleConfirm} className="px-6 sm:px-10 pb-8 sm:pb-10 space-y-5 sm:space-y-6 overflow-y-auto custom-scrollbar">
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl text-[#ba1a1a] text-xs font-bold border border-red-100">
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#434843]/50 ml-1">RFC Receptor *</label>
                  <input 
                    type="text" 
                    value={formData.rfc}
                    onChange={(e) => setFormData({...formData, rfc: e.target.value.toUpperCase()})}
                    className="w-full bg-[#f6f3ee] border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10 outline-none uppercase font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#434843]/50 ml-1">Código Postal *</label>
                  <input 
                    type="text" 
                    maxLength={5}
                    value={formData.codigoPostal}
                    onChange={(e) => setFormData({...formData, codigoPostal: e.target.value.replace(/\D/g,'')})}
                    className="w-full bg-[#f6f3ee] border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10 outline-none font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#434843]/50 ml-1">Nombre o Razón Social *</label>
                <input 
                  type="text" 
                  value={formData.razonSocial}
                  onChange={(e) => setFormData({...formData, razonSocial: e.target.value.toUpperCase()})}
                  className="w-full bg-[#f6f3ee] border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10 outline-none font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#434843]/50 ml-1">Régimen Fiscal *</label>
                  <div className="relative">
                    <select 
                      value={formData.regimenFiscal}
                      onChange={(e) => setFormData({...formData, regimenFiscal: e.target.value})}
                      className="w-full appearance-none bg-[#f6f3ee] border-none rounded-xl px-5 py-4 text-xs focus:ring-2 focus:ring-[#1a3d2e]/10 outline-none font-bold pr-10"
                    >
                      <option value="601">601 - Personas Morales</option>
                      <option value="605">605 - Sueldos y Salarios</option>
                      <option value="612">612 - Act. Empresariales</option>
                      <option value="626">626 - RESICO</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#434843]/30" size={16} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#434843]/50 ml-1">Uso de CFDI *</label>
                  <div className="relative">
                    <select 
                      value={formData.usoCFDI}
                      onChange={(e) => setFormData({...formData, usoCFDI: e.target.value})}
                      className="w-full appearance-none bg-[#f6f3ee] border-none rounded-xl px-5 py-4 text-xs focus:ring-2 focus:ring-[#1a3d2e]/10 outline-none font-bold pr-10"
                    >
                      <option value="G03">G03 - Gastos en general</option>
                      <option value="S01">S01 - Sin efectos fiscales</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#434843]/30" size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pb-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#434843]/50 ml-1">Email del Solicitante *</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#f6f3ee] border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10 outline-none font-medium"
                />
              </div>

              {/* Botones de acción fijos al pie del contenido con scroll */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4">
                <button type="button" onClick={handleClose} className="w-full sm:w-auto px-10 py-4 text-[10px] font-black uppercase tracking-widest text-[#434843]/40 hover:text-[#1a3d2e] transition-colors order-2 sm:order-1">
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-12 py-4 text-[10px] font-black uppercase tracking-widest text-white bg-[#1a3d2e] shadow-xl shadow-[#1a3d2e]/20 hover:scale-[1.02] active:scale-95 transition-all rounded-full order-1 sm:order-2"
                >
                  Generar Factura
                </button>
              </div>
            </form>
          </>
        ) : (
          /* MODAL DE ÉXITO RESPONSIVO */
          <div className="p-8 sm:p-16 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 overflow-y-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#d3e8d5] rounded-full flex items-center justify-center text-[#1a3d2e] shrink-0">
              <CheckCircle2 size={36} className="sm:w-11 sm:h-11" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h3 className="font-headline text-3xl sm:text-4xl italic text-[#1a3d2e]">Factura en Camino</h3>
              <p className="text-xs sm:text-sm text-[#434843]/60 max-w-xs mx-auto leading-relaxed">
                El comprobante fiscal ha sido enviado correctamente a:
                <br />
                <span className="font-bold text-[#1a3d2e] mt-2 block break-all">{formData.email}</span>
              </p>
            </div>
            <button 
              onClick={handleClose}
              className="w-full sm:w-auto px-12 py-4 bg-[#1a3d2e] text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:shadow-lg transition-all active:scale-95"
            >
              Entendido
            </button>
          </div>
        )}

        {/* Decoración inferior */}
        <div className="h-1.5 w-full bg-[#1a3d2e]/10 shrink-0" />
      </div>
    </div>
  );
};