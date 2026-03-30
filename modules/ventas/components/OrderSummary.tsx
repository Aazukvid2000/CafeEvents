// src/modules/ventas/components/OrderSummary.tsx
interface Props {
  total: number;
  onConfirm: () => void;
  onCancel: () => void; // Prop para S2
  disabled: boolean;
}

export const OrderSummary = ({ total, onConfirm, onCancel, disabled }: Props) => {
  return (
    <div className="bg-gray-100 p-4 border-t-4 border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold">TOTAL:</span>
        <span className="text-2xl font-mono font-black">${total}</span>
      </div>
      
      <div className="flex flex-col gap-2">
        <button 
          onClick={onConfirm}
          disabled={disabled}
          className={`w-full py-4 font-black uppercase tracking-tighter border-2 border-gray-800
            ${disabled ? 'bg-gray-300 text-gray-500 border-gray-300' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
        >
          Confirmar Pedido (S1)
        </button>

        {/* Botón para Flujo S2 */}
        <button 
          onClick={onCancel}
          className="w-full py-2 font-bold uppercase text-[10px] text-gray-600 hover:text-black underline decoration-2 underline-offset-4"
        >
          Anular pedido (S2)
        </button>
      </div>
    </div>
  );
};