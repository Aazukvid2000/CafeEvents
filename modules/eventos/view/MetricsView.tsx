'use client';

import React, { useState } from 'react';
import { 
  BarChart3, PieChart, Download, Calendar, 
  TrendingUp, Users, XCircle, DollarSign, 
  ArrowUpRight, ArrowDownRight, LayoutDashboard
} from 'lucide-react';

type Period = 'MES' | 'TRIMESTRE' | 'AÑO';

export const MetricsView = () => {
  const [period, setPeriod] = useState<Period>('MES');

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* HEADER CON SELECTOR DE PERIODO (Paso 2) */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#334537]/5 pb-8">
        <div>
          <span className="label-caps text-[#C5A059] mb-2 block uppercase tracking-widest text-[10px] font-black italic">Análisis de Desempeño</span>
          <h1 className="serif-display text-5xl md:text-6xl text-[#1a3d2e]">Rentabilidad</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-[#f6f3ee] p-1.5 rounded-full border border-[#1a3d2e]/5">
          {(['MES', 'TRIMESTRE', 'AÑO'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                period === p ? 'bg-[#1a3d2e] text-white shadow-lg' : 'text-[#1a3d2e]/40 hover:text-[#1a3d2e]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </header>

      {/* MÉTRICAS CLAVE (Paso 4) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Ingresos Totales" 
          value="$482,900" 
          trend="+12.5%" 
          trendUp={true} 
          icon={<DollarSign size={20} />} 
        />
        <MetricCard 
          label="Eventos Realizados" 
          value="24" 
          trend="+3" 
          trendUp={true} 
          icon={<Calendar size={20} />} 
        />
        <MetricCard 
          label="Ocupación Promedio" 
          value="78%" 
          trend="-2.4%" 
          trendUp={false} 
          icon={<TrendingUp size={20} />} 
        />
        <MetricCard 
          label="Cancelaciones" 
          value="2" 
          subValue="Anticipos retenidos: $14,000"
          trendUp={false} 
          icon={<XCircle size={20} />} 
          isAlert={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* GRÁFICA DE INGRESOS (Simulada) */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-[#1a3d2e]/5 shadow-sm space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="font-headline italic text-2xl text-[#1a3d2e]">Histórico de Ingresos</h3>
            <BarChart3 className="text-[#1a3d2e]/20" size={24} />
          </div>
          <div className="h-64 w-full bg-[#fcf9f4] rounded-3xl border border-dashed border-[#1a3d2e]/10 flex items-end justify-around p-6 gap-4">
            {/* Barras decorativas simulando una gráfica */}
            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
              <div key={i} className="w-full bg-[#1a3d2e] rounded-t-xl opacity-20 hover:opacity-100 transition-all cursor-pointer" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-[#434843]/40 px-2">
            <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span>
          </div>
        </div>

        {/* OCUPACIÓN POR ESPACIO Y TIPO (Paso 4) */}
        <div className="bg-[#1a3d2e] p-10 rounded-[3rem] shadow-2xl text-white space-y-10">
          <h3 className="font-headline italic text-2xl text-[#d3e8d5]">Ocupación de Espacios</h3>
          
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                <span>Salón de Eventos</span>
                <span>85%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#C5A059] w-[85%]" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                <span>Cafetería</span>
                <span>62%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white/40 w-[62%]" />
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Tipo de Evento Frecuente</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold italic">Corporativos</span>
                <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full font-black">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold italic">Sociales / Bodas</span>
                <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full font-black">35%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER ACCIÓN (Paso 6) */}
      <footer className="flex justify-center pt-10">
        <button className="group bg-white border border-[#1a3d2e]/10 px-10 py-5 rounded-full font-label text-[10px] font-black uppercase tracking-[0.3em] text-[#1a3d2e] flex items-center gap-4 hover:bg-[#1a3d2e] hover:text-white transition-all shadow-xl active:scale-95">
          <Download size={18} />
          Exportar Reporte Rentabilidad (PDF / EXCEL)
        </button>
      </footer>
    </div>
  );
};

// --- SUB-COMPONENTE PARA CARDS DE MÉTRICA ---
interface MetricProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  subValue?: string;
  isAlert?: boolean;
}

const MetricCard = ({ label, value, trend, trendUp, icon, subValue, isAlert }: MetricProps) => (
  <div className={`p-8 rounded-[2.5rem] border shadow-sm space-y-6 transition-all hover:shadow-md ${isAlert ? 'bg-[#ffdad6]/20 border-[#ba1a1a]/10' : 'bg-white border-[#1a3d2e]/5'}`}>
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${isAlert ? 'bg-[#ba1a1a]/10 text-[#ba1a1a]' : 'bg-[#f6f3ee] text-[#1a3d2e]'}`}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trendUp ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
          {trend}
        </div>
      )}
    </div>
    <div>
      <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${isAlert ? 'text-[#ba1a1a]/60' : 'text-[#434843]/40'}`}>{label}</p>
      <h4 className={`font-headline text-4xl italic ${isAlert ? 'text-[#ba1a1a]' : 'text-[#1a3d2e]'}`}>{value}</h4>
      {subValue && <p className="text-[9px] font-bold opacity-60 mt-2 italic">{subValue}</p>}
    </div>
  </div>
);