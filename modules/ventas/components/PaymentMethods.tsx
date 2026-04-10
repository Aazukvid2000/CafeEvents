// src/modules/ventas/components/PaymentMethods.tsx
import { Banknote, CreditCard, Star, Check } from 'lucide-react';

interface Props {
  onSelectMethod: (method: 'EFECTIVO' | 'TARJETA') => void;
  onApplyLoyalty: () => void;
  hasLoyaltyApplied: boolean;
  selectedMethod?: 'EFECTIVO' | 'TARJETA';
}

export const PaymentMethods = ({ 
  onSelectMethod, 
  onApplyLoyalty, 
  hasLoyaltyApplied, 
  selectedMethod 
}: Props) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* SECCIÓN LEALTAD (Bordes extra redondeados) */}
      <div className="bg-[#ebe8e3] rounded-[2.5rem] p-10 border border-[#c3c8c1]/10">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-headline text-2xl tracking-tight text-[#1a3d2e]"> {/* Verde Fuerte Aplicado */}
            Programa de Lealtad
          </h4>
          {/* Icono de estrella dentro de un círculo sólido verde oscuro */}
          <div className="w-8 h-8 bg-[#1a3d2e] rounded-full flex items-center justify-center"> {/* Verde Fuerte Aplicado */}
            <Star size={14} className="fill-white text-white" />
          </div>
        </div>
        <p className="text-base text-[#434843]/80 leading-relaxed mb-8 font-body">
          El cliente tiene puntos acumulados. ¿Desea aplicar una recompensa o validar tarjeta?
        </p>
        <button 
          onClick={onApplyLoyalty}
          disabled={hasLoyaltyApplied}
          className={`w-full py-4 rounded-full border transition-all duration-300 font-label text-xs font-bold uppercase tracking-[0.2em] shadow-sm
            ${hasLoyaltyApplied 
              ? 'bg-[#d3e8d5] border-[#1a3d2e]/20 text-[#1a3d2e]' // Verde Fuerte Aplicado en Badge
              : 'bg-white border-[#c3c8c1]/30 text-[#1a3d2e]/60 hover:text-[#1a3d2e]'}`} // Verde Fuerte Aplicado en Texto y Hover
        >
          {hasLoyaltyApplied ? '✓ RECOMPENSA APLICADA' : 'VALIDAR TARJETA'}
        </button>
      </div>

      {/* MÉTODOS DE PAGO */}
      <div className="bg-[#f6f3ee] rounded-[2.5rem] p-10">
        <h4 className="font-headline text-2xl tracking-tight text-[#1a3d2e] mb-8"> {/* Verde Fuerte Aplicado */}
          Método de Pago
        </h4>
        <div className="grid grid-cols-2 gap-6">
          {/* Opción Efectivo */}
          <button 
            onClick={() => onSelectMethod('EFECTIVO')}
            className={`flex flex-col items-center gap-4 p-8 rounded-[2rem] transition-all duration-300 border-2
              ${selectedMethod === 'EFECTIVO' 
                ? 'bg-white border-[#1a3d2e] shadow-lg' // Verde Fuerte Aplicado en Borde
                : 'bg-white border-transparent opacity-60 hover:opacity-100 shadow-sm'}`}
          >
            {/* Contenedor de icono circular sutil */}
            <div className={`p-3 rounded-full ${selectedMethod === 'EFECTIVO' ? 'bg-[#1a3d2e]/5' : ''}`}> {/* Verde Fuerte Aplicado en Fondo Sutil */}
              <Banknote size={32} className={selectedMethod === 'EFECTIVO' ? 'text-[#1a3d2e]' : 'text-[#5f5e5e]'} /> {/* Verde Fuerte Aplicado en Icono */}
            </div>
            <span className={`font-label text-[10px] font-black uppercase tracking-[0.15em]
              ${selectedMethod === 'EFECTIVO' ? 'text-[#1a3d2e]' : 'text-[#5f5e5e]'}`}> {/* Verde Fuerte Aplicado en Texto */}
              Efectivo
            </span>
          </button>

          {/* Opción Tarjeta */}
          <button 
            onClick={() => onSelectMethod('TARJETA')}
            className={`flex flex-col items-center gap-4 p-8 rounded-[2rem] transition-all duration-300 border-2
              ${selectedMethod === 'TARJETA' 
                ? 'bg-white border-[#1a3d2e] shadow-lg' // Verde Fuerte Aplicado en Borde
                : 'bg-white border-transparent opacity-60 hover:opacity-100 shadow-sm'}`}
          >
            <div className={`p-3 rounded-full ${selectedMethod === 'TARJETA' ? 'bg-[#1a3d2e]/5' : ''}`}> {/* Verde Fuerte Aplicado en Fondo Sutil */}
              <CreditCard size={32} className={selectedMethod === 'TARJETA' ? 'text-[#1a3d2e]' : 'text-[#5f5e5e]'} /> {/* Verde Fuerte Aplicado en Icono */}
            </div>
            <span className={`font-label text-[10px] font-black uppercase tracking-[0.15em]
              ${selectedMethod === 'TARJETA' ? 'text-[#1a3d2e]' : 'text-[#5f5e5e]'}`}> {/* Verde Fuerte Aplicado en Texto */}
              Tarjeta
            </span>
          </button>
        </div>
      </div>

    </div>
  );
};