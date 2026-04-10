'use client';
import React from 'react';
import { ReportSelector } from '../components/ReportSelector';
import { useFinancialReport } from '../hooks/useFinancialReport';
import { CheckCircle, FileText, Download, TrendingUp } from 'lucide-react';

export const FinancialReportsView = () => {
  const { generateReport, isGenerating, generatedReport } = useFinancialReport();

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header>
        <span className="label-caps text-[#C5A059] mb-2 block uppercase tracking-widest text-[10px] font-black">
          Módulo de Auditoría
        </span>
        <h1 className="serif-display text-5xl md:text-6xl text-[#1a3d2e]">Estados Financieros</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Columna Izquierda: Configuración */}
        <div className="lg:col-span-1">
          <ReportSelector onGenerate={(tipo, inicio, fin, formato) => 
            generateReport({ tipo, fechaInicio: inicio, fechaFin: fin, formato })
          } />
        </div>

        {/* Columna Derecha: Resultado/Previsualización */}
        <div className="lg:col-span-2 space-y-6">
          {isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-dashed border-[#c3c8c1]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a3d2e] mb-4" />
              <p className="font-headline italic text-xl text-[#1a3d2e]">Procesando balances y transacciones...</p>
            </div>
          ) : generatedReport ? (
            <div className="bg-[#1a3d2e] text-white p-10 rounded-[3rem] shadow-2xl space-y-8 animate-in zoom-in-95 duration-500">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline italic text-3xl mb-2">{generatedReport.tipo}</h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold">
                    Período: {generatedReport.periodoInicio} al {generatedReport.periodoFin}
                  </p>
                </div>
                <CheckCircle className="text-[#C5A059]" size={32} />
              </div>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
                <div>
                  <p className="text-[9px] uppercase opacity-50 font-black mb-1">Ingresos Totales (Consolidados)</p>
                  <p className="text-3xl font-headline italic">
                    ${(generatedReport.metricas.ingresosCafeteria + generatedReport.metricas.ingresosEventos).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] uppercase opacity-50 font-black mb-1">Utilidad Neta</p>
                  <p className="text-3xl font-headline text-[#C5A059] italic">
                    ${generatedReport.metricas.utilidadNeta.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-[#C5A059] text-[#1a3d2e] rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                  <Download size={16} /> Descargar {generatedReport.tipo}
                </button>
                <button className="px-8 py-4 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                  Imprimir Comprobante
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20 bg-[#f6f3ee]/50 rounded-[2.5rem] border border-[#334537]/10 text-[#434843]/40">
              <TrendingUp size={48} strokeWidth={1} className="mb-4" />
              <p className="font-headline italic text-xl">Seleccione un período para visualizar el rendimiento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};