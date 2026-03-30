// src/modules/ventas/types/index.ts (O dentro del mismo archivo si prefieres)
export interface CFDIFormData {
  rfc: string;
  razonSocial: string;
  codigoPostal: string;
  email: string;
  usoCFDI: string;
}

// src/modules/ventas/components/CFDIDialog.tsx
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: CFDIFormData) => void;
}

export const CFDIDialog = ({ isOpen, onClose, onConfirm }: Props) => {
  // Estado local para capturar los datos (opcional, pero recomendado para el flujo)
  const [formData, setFormData] = useState<CFDIFormData>({
    rfc: '',
    razonSocial: '',
    codigoPostal: '',
    email: '',
    usoCFDI: 'G03'
  });

  if (!isOpen) return null;

  const handleConfirm = () => {
    // Aquí podrías validar que no estén vacíos antes de confirmar
    onConfirm(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white border-4 border-gray-900 p-6 w-full max-w-md shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-xl font-black uppercase italic mb-4 border-b-4 border-gray-900 pb-2 bg-gray-900 text-white px-2">
          Facturación CFDI [S3]
        </h2>
        
        <div className="space-y-3">
          <div>
            <label className="text-[9px] font-bold uppercase block mb-1">RFC (*)</label>
            <input 
              type="text" 
              value={formData.rfc}
              onChange={(e) => setFormData({...formData, rfc: e.target.value})}
              className="w-full border-2 border-gray-800 p-2 text-xs font-mono outline-none focus:bg-yellow-50" 
            />
          </div>

          <div>
            <label className="text-[9px] font-bold uppercase block mb-1">Razón Social (*)</label>
            <input 
              type="text" 
              value={formData.razonSocial}
              onChange={(e) => setFormData({...formData, razonSocial: e.target.value})}
              className="w-full border-2 border-gray-800 p-2 text-xs font-mono outline-none focus:bg-yellow-50" 
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] font-bold uppercase block mb-1">CP Fiscal (*)</label>
              <input 
                type="text" 
                value={formData.codigoPostal}
                onChange={(e) => setFormData({...formData, codigoPostal: e.target.value})}
                className="w-full border-2 border-gray-800 p-2 text-xs font-mono outline-none focus:bg-yellow-50" 
              />
            </div>
            <div>
              <label className="text-[9px] font-bold uppercase block mb-1">Uso de CFDI (*)</label>
              <select 
                value={formData.usoCFDI}
                onChange={(e) => setFormData({...formData, usoCFDI: e.target.value})}
                className="w-full border-2 border-gray-800 p-2 text-xs outline-none bg-white font-bold"
              >
                <option value="G03">G03 - Gastos en general</option>
                <option value="P01">P01 - Por definir</option>
                <option value="S01">S01 - Sin efectos fiscales</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[9px] font-bold uppercase block mb-1">Correo Electrónico (*)</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border-2 border-gray-800 p-2 text-xs font-mono outline-none focus:bg-yellow-50" 
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 border-4 border-gray-900 text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleConfirm} 
            className="flex-1 py-3 bg-gray-900 text-white text-[10px] font-black uppercase hover:bg-green-600 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
          >
            Generar Factura
          </button>
        </div>
      </div>
    </div>
  );
};