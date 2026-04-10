// src/modules/ventas/components/CorteForm.tsx
import { CorteCaja } from '../types/corte';
import { Banknote, CreditCard, Calculator, ArrowRight, AlertCircle } from 'lucide-react';

interface Props {
  corte: CorteCaja;
  efectivoReal: number;
  onChangeEfectivo: (val: number) => void;
  onConfirm: () => void;
}

export const CorteForm = ({ corte, efectivoReal, onChangeEfectivo, onConfirm }: Props) => {
  const diferencia = efectivoReal - corte.ventasEfectivo;

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-700">
      
{/* SECCIÓN DE TOTALES DEL SISTEMA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* CARD: MONTO INICIAL (FONDO DE CAJA) */}
        <div className="bg-white p-6 rounded-2xl border-2 border-[#C5A059]/20 flex flex-col justify-between shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1.5 bg-[#C5A059]/10 rounded-lg">
              <Banknote className="text-[#C5A059]" size={18} />
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest text-[#C5A059]">Fondo Inicial</span>
          </div>
          <span className="font-headline text-3xl text-[#1a3d2e]">
            $3,000
          </span>
        </div>

        {/* CARD: VENTAS EFECTIVO */}
        <div className="bg-[#f6f3ee] p-6 rounded-2xl border border-[#1a3d2e]/5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1.5 bg-[#1a3d2e]/5 rounded-lg">
              <Banknote className="text-[#1a3d2e]/40" size={18} />
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest opacity-60 text-[#1a3d2e]">Ventas Efectivo</span>
          </div>
          <span className="font-headline text-3xl text-[#1a3d2e]">
            ${corte.ventasEfectivo.toFixed(2)}
          </span>
        </div>

        {/* CARD: VENTAS TARJETA */}
        <div className="bg-[#f6f3ee] p-6 rounded-2xl border border-[#1a3d2e]/5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1.5 bg-[#1a3d2e]/5 rounded-lg">
              <CreditCard className="text-[#1a3d2e]/40" size={18} />
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest opacity-60 text-[#1a3d2e]">Ventas Tarjeta</span>
          </div>
          <span className="font-headline text-3xl text-[#1a3d2e]">
            ${corte.ventasTarjeta.toFixed(2)}
          </span>
        </div>

        {/* CARD GRANDE: TOTAL VENTAS BRUTAS */}
        <div className="md:col-span-3 bg-[#1a3d2e] p-8 rounded-[2.5rem] flex justify-between items-end shadow-xl shadow-[#1a3d2e]/10 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2 text-balance">
              Total Ingresos Brutos (Turno Actual)
            </p>
            <h3 className="font-headline text-5xl text-white tracking-tighter italic">
              ${corte.totalVentas.toFixed(2)}
            </h3>
          </div>
          
          <Calculator className="absolute -bottom-6 -right-6 text-white opacity-[0.03]" size={150} />
          
          <div className="relative z-10 bg-white/5 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-md">
            <p className="text-[8px] font-black text-white/50 uppercase mb-1 tracking-widest">
              Efectivo Esperado (Inicial + Ventas)
            </p>
            <span className="font-headline text-2xl text-white">
              ${( corte.ventasEfectivo).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* INPUT DE CONTEO FÍSICO */}
      <div className="bg-white p-8 rounded-[2rem] border-2 border-[#1a3d2e] shadow-xl relative">
        <label className="label-caps text-[#C5A059] block mb-6 text-center tracking-[0.3em]">
          Conteo Físico de Efectivo
        </label>
        <div className="relative max-w-xs mx-auto">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 font-headline text-4xl text-[#1a3d2e]/20">$</span>
          <input 
            type="number" 
            value={efectivoReal || ''}
            onChange={(e) => onChangeEfectivo(Number(e.target.value))}
            className="w-full bg-transparent border-b-2 border-[#1a3d2e]/10 focus:border-[#1a3d2e] transition-colors py-4 px-8 text-center font-headline text-6xl text-[#1a3d2e] outline-none placeholder:opacity-10"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* RESULTADO DE DIFERENCIA (Dinamismo de color suave) */}
      <div className={`p-6 rounded-2xl flex justify-between items-center transition-all duration-500 border
        ${diferencia === 0 
          ? 'bg-[#d3e8d5] border-[#1a3d2e]/10 text-[#1a3d2e]' 
          : 'bg-[#ffdad6] border-[#ba1a1a]/10 text-[#ba1a1a]'}`}>
        <div className="flex items-center gap-4">
          <AlertCircle size={20} className="opacity-60" />
          <div>
            <span className="label-caps opacity-70 leading-none">Diferencia / Descuadre</span>
            <p className="font-headline text-lg italic leading-none mt-1">
              {diferencia === 0 ? "Caja Cuadrada con éxito" : diferencia < 0 ? "Faltante detectado" : "Sobrante detectado"}
            </p>
          </div>
        </div>
        <span className="font-headline text-3xl">
          {diferencia >= 0 ? '+' : ''}{diferencia.toFixed(2)}
        </span>
      </div>

      {/* ACCIÓN FINAL */}
      <button 
        onClick={onConfirm}
        className="w-full py-6 bg-gradient-to-br from-[#1a3d2e] to-[#263329] text-white rounded-full font-label text-sm font-bold uppercase tracking-[0.3em] shadow-2xl shadow-[#1a3d2e]/20 hover:scale-[1.01] transition-all active:scale-95 flex items-center justify-center gap-3"
      >
        <span>Finalizar y Cerrar Turno</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};