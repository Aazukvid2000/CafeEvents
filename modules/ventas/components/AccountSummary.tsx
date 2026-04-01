// src/modules/ventas/components/AccountSummary.tsx
import { Cuenta } from '../types/cuenta';
import { Utensils } from 'lucide-react';

interface Props {
  cuenta: Cuenta;
}

export const AccountSummary = ({ cuenta }: Props) => {
  return (
    <div className="bg-white rounded-xl p-10 shadow-[0_20px_50px_rgba(44,44,44,0.05)] border border-[#c3c8c1]/20">
      
      {/* HEADER: Detalle del Consumo */}
      <div className="flex justify-between items-center mb-10 pb-8 border-b border-[#c3c8c1]/30">
        <div className="flex items-center gap-4">
          <div className="bg-[#d3e8d5] w-12 h-12 rounded-full flex items-center justify-center">
            <Utensils className="text-[#334537]" size={20} />
          </div>
          <div>
            <h3 className="font-headline text-2xl tracking-[0.05em] text-[#334537]">
              Detalle del Consumo
            </h3>
            <p className="text-[10px] text-[#434843]/60 font-bold uppercase tracking-widest">
              Folio: #88291-AV
            </p>
          </div>
        </div>
        <span className="bg-[#ffdea5] text-[#5d4201] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
          Sesión Activa
        </span>
      </div>

      {/* ITEMS LIST: Con números grandes */}
      <div className="space-y-8 mb-12">
        {cuenta.pedido?.detalles.map((detalle, index) => (
          <div key={detalle.productoId} className="flex justify-between items-start">
            <div className="flex gap-6">
              <span className="font-headline text-3xl text-[#334537]/20">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h4 className="font-headline text-xl tracking-[0.05em] text-[#334537]">
                  {detalle.cantidad}x {detalle.producto?.nombre}
                </h4>
                <p className="text-sm text-[#434843]/60 font-body">
                  Preparación artesanal de especialidad
                </p>
              </div>
            </div>
            <p className="font-headline text-xl text-[#334537]">
              ${detalle.subtotal.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* FINANCIAL BREAKDOWN: Área Grisácea */}
      <div className="bg-[#f6f3ee] rounded-lg p-8 space-y-4">
        <div className="flex justify-between items-center text-[#434843]/60 font-bold text-[11px] uppercase tracking-[0.15em]">
          <span>Subtotal</span>
          <span className="text-[#334537] tracking-normal font-body font-semibold">
            ${cuenta.subtotal.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-[#434843]/60 font-bold text-[11px] uppercase tracking-[0.15em]">
          <span>IVA (16%)</span>
          <span className="text-[#334537] tracking-normal font-body font-semibold">
            ${cuenta.impuesto.toFixed(2)}
          </span>
        </div>

        {cuenta.descuento > 0 && (
          <div className="flex justify-between items-center text-[#434843]/60 font-bold text-[11px] uppercase tracking-[0.15em]">
            <span>Descuento Cortesía</span>
            <span className="text-[#ba1a1a] tracking-normal font-body font-semibold">
              -${cuenta.descuento.toFixed(2)}
            </span>
          </div>
        )}

        <div className="pt-6 mt-4 border-t border-[#c3c8c1]/40 flex justify-between items-baseline">
          <h3 className="font-headline text-2xl uppercase tracking-tighter text-[#334537]">
            Total a Pagar
          </h3>
          <div className="text-right">
            <p className="font-headline text-5xl text-[#334537] leading-none">
              ${cuenta.total.toFixed(2)}
            </p>
            <p className="text-[10px] text-[#434843]/40 font-bold mt-2 uppercase tracking-widest">
              Moneda: MXN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};