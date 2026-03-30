// src/modules/ventas/components/OrderSummary.tsx
interface Props {
  total: number;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
}

export const OrderSummary = ({ total, onConfirm, onCancel, disabled }: Props) => {
  return (
    <div className="bg-gray-100 p-4 border-t-4 border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-black uppercase">Monto Total:</span>
        <span className="text-2xl font-mono font-black">${total.toFixed(2)}</span>
      </div>
      
      <div className="flex flex-col gap-2">
        <button 
          onClick={onConfirm}
          disabled={disabled}
          className={`w-full py-4 font-black uppercase tracking-tighter border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all
            ${disabled ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed shadow-none' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
        >
          Confirmar y Enviar (S1)
        </button>

        <button 
          onClick={onCancel}
          className="w-full py-2 font-bold uppercase text-[9px] text-gray-500 hover:text-red-600 transition-colors"
        >
          Anular Pedido Actual (S2)
        </button>
      </div>
    </div>
  );
};