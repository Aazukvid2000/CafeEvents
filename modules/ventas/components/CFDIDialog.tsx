// src/modules/ventas/components/CFDIDialog.tsx
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface CFDIFormData {
  rfc: string;
  razonSocial: string;
  codigoPostal: string;
  email: string;
  usoCFDI: string;
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
    usoCFDI: 'G03'
  });

  // BLOQUEO DE SCROLL: Evita que la barra lateral se mueva mientras el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* OVERLAY: Fondo más nítido y oscuro para centrar la atención */}
      <div 
        className="absolute inset-0 bg-[#1c1c19]/60 backdrop-blur-[4px] transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* DIÁLOGO: Fondo sólido #FCF9F4 (Nítido) */}
      <div className="relative w-full max-w-2xl bg-[#fcf9f4] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#c3c8c1]/30 animate-in zoom-in-95 duration-300">
        
        {/* Header con tipografía Newsreader */}
        <div className="px-10 pt-10 pb-6">
          <h2 className="font-headline text-4xl italic text-[#1a3d2e] tracking-tight">
            Facturación CFDI
          </h2>
          <p className="font-body text-sm text-[#434843] mt-2 opacity-70">
            Complete la información fiscal para generar su comprobante digital.
          </p>
        </div>

        <form onSubmit={handleConfirm} className="px-10 pb-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* RFC */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#434843] px-1">
                RFC
              </label>
              <input 
                autoFocus
                type="text" 
                placeholder="ABCD000000XXX"
                value={formData.rfc}
                onChange={(e) => setFormData({...formData, rfc: e.target.value.toUpperCase()})}
                className="w-full bg-[#f6f3ee] border-none rounded-xl px-6 py-4 text-[#1c1c19] text-sm focus:ring-1 focus:ring-[#1a3d2e] transition-all duration-300 placeholder:text-[#737872]/40 outline-none"
              />
            </div>

            {/* Código Postal */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#434843] px-1">
                Código Postal Fiscal
              </label>
              <input 
                type="text" 
                placeholder="00000"
                value={formData.codigoPostal}
                onChange={(e) => setFormData({...formData, codigoPostal: e.target.value})}
                className="w-full bg-[#f6f3ee] border-none rounded-xl px-6 py-4 text-[#1c1c19] text-sm focus:ring-1 focus:ring-[#1a3d2e] transition-all duration-300 placeholder:text-[#737872]/40 outline-none"
              />
            </div>
          </div>

          {/* Razón Social */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#434843] px-1">
              Razón Social
            </label>
            <input 
              type="text" 
              placeholder="Nombre legal o Denominación social"
              value={formData.razonSocial}
              onChange={(e) => setFormData({...formData, razonSocial: e.target.value})}
              className="w-full bg-[#f6f3ee] border-none rounded-xl px-6 py-4 text-[#1c1c19] text-sm focus:ring-1 focus:ring-[#1a3d2e] transition-all duration-300 placeholder:text-[#737872]/40 outline-none"
            />
          </div>

          {/* Uso de CFDI */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#434843] px-1">
              Uso de CFDI
            </label>
            <div className="relative">
              <select 
                value={formData.usoCFDI}
                onChange={(e) => setFormData({...formData, usoCFDI: e.target.value})}
                className="w-full appearance-none bg-[#f6f3ee] border-none rounded-xl px-6 py-4 text-[#1c1c19] text-sm focus:ring-1 focus:ring-[#1a3d2e] transition-all duration-300 pr-12 cursor-pointer outline-none font-medium"
              >
                <option value="G03">G03 - Gastos en general</option>
                <option value="P01">P01 - Por definir</option>
                <option value="D10">D10 - Pagos por servicios educativos</option>
                <option value="S01">S01 - Sin efectos fiscales</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#737872]">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#434843] px-1">
              Email de Envío
            </label>
            <input 
              type="email" 
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[#f6f3ee] border-none rounded-xl px-6 py-4 text-[#1c1c19] text-sm focus:ring-1 focus:ring-[#1a3d2e] transition-all duration-300 placeholder:text-[#737872]/40 outline-none"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-4 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="w-full md:w-auto px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#434843] hover:bg-[#ebe8e3] transition-all duration-500 rounded-full"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="w-full md:w-auto px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white bg-gradient-to-br from-[#1a3d2e] to-[#263329] shadow-xl shadow-[#1a3d2e]/20 hover:opacity-90 transition-all duration-500 rounded-full"
            >
              Generar Factura
            </button>
          </div>
        </form>

        {/* Acento inferior estético */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1a3d2e]/10 via-[#1a3d2e]/40 to-[#1a3d2e]/10" />
      </div>
    </div>
  );
};