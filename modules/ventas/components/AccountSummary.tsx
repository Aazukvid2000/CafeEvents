// src/modules/ventas/components/AccountSummary.tsx
import { Cuenta } from '../types/cuenta';

interface Props {
  cuenta: Cuenta;
}

export const AccountSummary = ({ cuenta }: Props) => {
  return (
    <div className="flex flex-col bg-white border-2 border-gray-800 p-4 font-mono">
      <h3 className="text-sm font-black uppercase border-b-2 border-gray-800 mb-4 pb-1">
        Resumen de Consumo [Paso 2]
      </h3>
      
      {/* Lista detallada de productos (Paso 2) */}
      <div className="flex-1 space-y-2 mb-6">
        {cuenta.pedido?.detalles.map((detalle) => (
          <div key={detalle.productoId} className="flex justify-between text-xs uppercase">
            <span>{detalle.cantidad}x {detalle.producto?.nombre}</span>
            <span>${detalle.subtotal.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Desglose Financiero (Paso 2: Subtotal, IVA, Total) */}
      <div className="border-t border-gray-400 pt-4 space-y-1">
        <div className="flex justify-between text-xs italic">
          <span>Subtotal:</span>
          <span>${cuenta.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs italic">
          <span>Impuestos (IVA 16%):</span>
          <span>${cuenta.impuesto.toFixed(2)}</span>
        </div>
        {cuenta.descuento > 0 && (
          <div className="flex justify-between text-xs font-bold text-gray-600 uppercase">
            <span>Descuento Lealtad (S2):</span>
            <span>-${cuenta.descuento.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-black border-t-2 border-gray-800 mt-2 pt-2">
          <span>TOTAL:</span>
          <span>${cuenta.total.toFixed(2)}</span>
        </div>
        {cuenta.saldoPendiente < cuenta.total && (
          <div className="flex justify-between text-sm font-bold bg-gray-200 px-1 mt-1">
            <span>SALDO PENDIENTE (S1):</span>
            <span>${cuenta.saldoPendiente.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
};