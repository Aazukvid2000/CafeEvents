// src/modules/ventas/components/PaymentMethods.tsx
interface Props {
  onSelectMethod: (method: 'EFECTIVO' | 'TARJETA') => void;
  onApplyLoyalty: () => void;
  hasLoyaltyApplied: boolean;
}

export const PaymentMethods = ({ onSelectMethod, onApplyLoyalty, hasLoyaltyApplied }: Props) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 p-4 border-2 border-gray-800">
      <h4 className="text-[10px] font-black uppercase tracking-widest">Método de Pago [Paso 5]</h4>
      
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={() => onSelectMethod('EFECTIVO')}
          className="py-3 border-2 border-gray-800 font-bold text-xs uppercase hover:bg-gray-800 hover:text-white transition-all"
        >
          Efectivo
        </button>
        <button 
          onClick={() => onSelectMethod('TARJETA')}
          className="py-3 border-2 border-gray-800 font-bold text-xs uppercase hover:bg-gray-800 hover:text-white transition-all"
        >
          Tarjeta
        </button>
      </div>

      <div className="border-t border-gray-400 pt-4">
        <p className="text-[9px] font-bold mb-2 uppercase italic text-gray-600">Programa de Lealtad [S2]</p>
        <button 
          onClick={onApplyLoyalty}
          disabled={hasLoyaltyApplied}
          className={`w-full py-2 border border-dashed border-gray-800 text-[10px] font-black uppercase
            ${hasLoyaltyApplied ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-200'}`}
        >
          {hasLoyaltyApplied ? '✓ Descuento Aplicado' : 'Validar Tarjeta (5 Sellos)'}
        </button>
      </div>
    </div>
  );
};