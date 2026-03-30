// src/modules/ventas/components/CorteForm.tsx
import { CorteCaja } from '../types/corte';

interface Props {
  corte: CorteCaja;
  efectivoReal: number;
  onChangeEfectivo: (val: number) => void;
  onConfirm: () => void;
}

export const CorteForm = ({ corte, efectivoReal, onChangeEfectivo, onConfirm }: Props) => {
  const diferencia = efectivoReal - corte.ventasEfectivo;

  return (
    <div className="bg-gray-100 border-4 border-gray-900 p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto">
      <header className="mb-6 border-b-4 border-gray-900 pb-4">
        <h2 className="text-3xl font-black uppercase italic">Reporte de Arqueo</h2>
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Resumen de Ventas del Turno</p>
      </header>
      
      {/* SECCIÓN DE TOTALES DEL SISTEMA (Grises visibles) */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <div className="flex justify-between items-center p-4 bg-gray-300 border-2 border-gray-900">
          <span className="text-xs font-black uppercase">Ventas en Efectivo:</span>
          <span className="text-xl font-mono font-black">${corte.ventasEfectivo.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-300 border-2 border-gray-900">
          <span className="text-xs font-black uppercase">Ventas con Tarjeta:</span>
          <span className="text-xl font-mono font-black">${corte.ventasTarjeta.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white border-2 border-gray-900">
          <span className="text-sm font-black uppercase italic text-yellow-400">Total Ventas Brutas:</span>
          <span className="text-2xl font-mono font-black">${corte.totalVentas.toFixed(2)}</span>
        </div>
      </div>

      {/* INPUT DE CONTEO FÍSICO */}
      <div className="bg-white p-6 border-4 border-gray-900 mb-6 shadow-inner">
        <label className="text-xs font-black uppercase block mb-2 text-gray-700 italic">
          Ingrese cantidad de Efectivo en Caja (Conteo Físico):
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-black">$</span>
          <input 
            type="number" 
            value={efectivoReal || ''}
            onChange={(e) => onChangeEfectivo(Number(e.target.value))}
            className="w-full pl-12 p-4 border-4 border-gray-900 text-4xl font-mono font-black focus:bg-gray-100 outline-none transition-colors"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* RESULTADO DE DIFERENCIA */}
      <div className={`p-4 border-4 border-gray-900 mb-8 flex justify-between items-center transition-colors
        ${diferencia < 0 ? 'bg-red-200' : diferencia > 0 ? 'bg-blue-200' : 'bg-gray-400'}`}>
        <div>
          <span className="font-black uppercase text-[10px] block leading-none">Diferencia / Descuadre:</span>
          <p className="text-[9px] font-bold text-gray-700 uppercase italic">
            {diferencia === 0 ? "Caja Cuadrada" : diferencia < 0 ? "Faltante en Caja" : "Sobrante en Caja"}
          </p>
        </div>
        <span className="text-2xl font-black font-mono">
          {diferencia >= 0 ? '+' : ''}{diferencia.toFixed(2)}
        </span>
      </div>

      <button 
        onClick={onConfirm}
        className="w-full py-6 bg-gray-900 text-white font-black text-2xl uppercase hover:bg-black transition-all shadow-[6px_6px_0px_0px_rgba(100,100,100,1)] active:shadow-none border-2 border-white"
      >
        Cerrar Turno Definitivamente
      </button>
    </div>
  );
};