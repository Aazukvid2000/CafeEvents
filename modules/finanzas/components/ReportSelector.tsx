'use client';
import React from 'react';
import { FileText, Calendar, Download, ChevronRight,FileBarChart  } from 'lucide-react';
import { FinancialReportType, ExportFormat } from '../types/contador';

interface ReportSelectorProps {
  onGenerate: (type: FinancialReportType, start: string, end: string, format: ExportFormat) => void;
}

export const ReportSelector = ({ onGenerate }: ReportSelectorProps) => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-[#334537]/5 shadow-sm space-y-8">
      <div className="flex items-center gap-3 border-b border-[#f0ede8] pb-4">
        <FileBarChart className="text-[#334537]" size={20} />
        <h3 className="font-headline italic text-2xl text-[#334537]">Configuración de Reporte</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60">Tipo de Documento</label>
          <select className="w-full bg-[#f6f3ee]/50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1a3d2e]/10">
            <option>Estado de Resultados</option>
            <option>Balance General</option>
            <option>Flujo de Efectivo</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60">Formato de Salida</label>
          <div className="flex gap-4">
            {['PDF', 'Excel'].map((fmt) => (
              <button key={fmt} className="flex-1 py-3 rounded-xl border border-[#1a3d2e]/10 text-xs font-bold hover:bg-[#1a3d2e] hover:text-white transition-all uppercase tracking-widest">
                {fmt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60">Fecha Inicio</label>
          <input type="date" className="w-full bg-[#f6f3ee]/50 border-none rounded-xl p-4 text-sm" />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-black tracking-widest text-[#434843]/60">Fecha Fin</label>
          <input type="date" className="w-full bg-[#f6f3ee]/50 border-none rounded-xl p-4 text-sm" />
        </div>
      </div>

      <button className="w-full py-5 bg-[#1a3d2e] text-white rounded-full font-label text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#263329] transition-all shadow-xl shadow-[#1a3d2e]/20">
        <Download size={16} /> Generar Reporte Final
      </button>
    </div>
  );
};