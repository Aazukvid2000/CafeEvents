'use client';
import React from 'react';
import { SearchCheck, AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';
import { MOCK_AUDITORIA_VENTAS } from '../mocks/contador.mock';

export const SalesAuditView = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <span className="label-caps text-[#C5A059] mb-2 block uppercase tracking-widest text-[10px] font-black">
            Validación de Ingresos
          </span>
          <h1 className="serif-display text-5xl md:text-6xl text-[#1a3d2e]">Auditoría de Ventas</h1>
        </div>
      </header>

      {/* Alerta de Discrepancia (Regla de Negocio: Diferencias significativas) */}
      <div className="bg-red-50 border border-red-100 p-6 rounded-[2rem] flex items-center gap-6 shadow-sm">
        <div className="p-4 bg-white rounded-2xl text-red-600 shadow-sm">
          <ShieldAlert size={28} />
        </div>
        <div className="flex-1">
          <h4 className="font-headline italic text-xl text-red-900">Atención: Discrepancia detectada</h4>
          <p className="text-sm text-red-700/70 font-medium">
            El Corte #89 presenta una diferencia mayor al margen permitido. Requiere validación con el Administrador.
          </p>
        </div>
        <button className="px-6 py-3 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all">
          Revisar Incidencia
        </button>
      </div>

      {/* Tabla de Auditoría */}
      <div className="bg-white rounded-[2.5rem] border border-[#334537]/5 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f6f3ee]/50 border-b border-[#334537]/10">
            <tr>
              <th className="py-5 pl-8 text-[9px] uppercase font-black text-[#434843]/60 tracking-widest">ID / Fecha</th>
              <th className="py-5 text-[9px] uppercase font-black text-[#434843]/60 tracking-widest">Tipo de Cierre</th>
              <th className="py-5 text-[9px] uppercase font-black text-[#434843]/60 tracking-widest text-right">Esperado</th>
              <th className="py-5 text-[9px] uppercase font-black text-[#434843]/60 tracking-widest text-right">Real</th>
              <th className="py-5 text-[9px] uppercase font-black text-[#434843]/60 tracking-widest text-right">Diferencia</th>
              <th className="py-5 pr-8 text-[9px] uppercase font-black text-[#434843]/60 tracking-widest text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0ede8]">
            {MOCK_AUDITORIA_VENTAS.map((entry) => (
              <tr key={entry.id} className="group hover:bg-[#f6f3ee]/30 transition-colors">
                <td className="py-6 pl-8">
                  <p className="text-sm font-bold text-[#1a3d2e]">{entry.id}</p>
                  <p className="text-[10px] text-[#434843]/40 uppercase font-bold">{entry.fecha}</p>
                </td>
                <td className="py-6">
                  <p className="font-headline italic text-lg text-[#1a3d2e]">{entry.tipo}</p>
                  <p className="text-[10px] text-[#434843]/60 font-medium">Resp: {entry.responsable}</p>
                </td>
                <td className="py-6 text-right font-body text-sm text-[#1a3d2e]">${entry.montoEsperado.toLocaleString()}</td>
                <td className="py-6 text-right font-body text-sm text-[#1a3d2e]">${entry.montoReal.toLocaleString()}</td>
                <td className={`py-6 text-right font-body font-bold text-sm ${entry.diferencia < 0 ? 'text-red-500' : 'text-[#1a3d2e]'}`}>
                  ${entry.diferencia.toLocaleString()}
                </td>
                <td className="py-6 pr-8 text-right">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm
                    ${entry.estado === 'Conciliado' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    {entry.estado === 'Conciliado' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                    {entry.estado}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};