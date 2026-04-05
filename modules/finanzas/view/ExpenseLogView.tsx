'use client';
import React, { useState } from 'react';
import { FileText, Download, Filter, Search, FileWarning, CheckCircle } from 'lucide-react';
import { MOCK_LIBRO_GASTOS } from '../mocks/contador.mock';

export const ExpenseLogView = () => {
  const [filter, setFilter] = useState('Todos');

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <span className="label-caps text-[#C5A059] mb-2 block uppercase tracking-widest text-[10px] font-black">
            Control de Egresos
          </span>
          <h1 className="serif-display text-5xl md:text-6xl text-[#1a3d2e]">Libro de Gastos</h1>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border border-[#1a3d2e]/20 rounded-full text-[10px] font-black uppercase tracking-widest text-[#1a3d2e] hover:bg-[#1a3d2e] hover:text-white transition-all">
          <Download size={14} /> Exportar XML/PDF
        </button>
      </header>

      {/* Buscador y Filtros Rápidos */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-[2rem] border border-[#334537]/5 shadow-sm">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#434843]/30" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por proveedor o folio..." 
            className="w-full pl-12 pr-4 py-3 bg-[#f6f3ee]/50 rounded-full border-none text-sm focus:ring-2 focus:ring-[#1a3d2e]/10"
          />
        </div>
        <div className="flex gap-4">
          {['Todos', 'Cargada', 'Pendiente'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-[#1a3d2e] text-white' : 'text-[#434843]/40 hover:text-[#1a3d2e]'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de Gastos Estilo Editorial */}
      <div className="bg-white rounded-[2.5rem] border border-[#334537]/5 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#f6f3ee]/50 border-b border-[#334537]/10">
            <tr>
              <th className="py-5 pl-8 text-[9px] uppercase font-black text-[#434843]/60 tracking-widest">Fecha / ID</th>
              <th className="py-5 text-[9px] uppercase font-black text-[#434843]/60 tracking-widest">Proveedor</th>
              <th className="py-5 text-[9px] uppercase font-black text-[#434843]/60 tracking-widest">Categoría</th>
              <th className="py-5 text-[9px] uppercase font-black text-[#434843]/60 tracking-widest text-right">Total</th>
              <th className="py-5 pr-8 text-[9px] uppercase font-black text-[#434843]/60 tracking-widest text-right">CFDI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0ede8]">
            {MOCK_LIBRO_GASTOS.map((expense) => (
              <tr key={expense.id} className="group hover:bg-[#f6f3ee]/30 transition-colors">
                <td className="py-6 pl-8">
                  <p className="text-sm font-bold text-[#1a3d2e]">{expense.fecha}</p>
                  <p className="text-[10px] text-[#434843]/40 font-mono">{expense.id}</p>
                </td>
                <td className="py-6 font-headline italic text-lg text-[#1a3d2e]">{expense.proveedor}</td>
                <td className="py-6">
                  <span className="text-[10px] px-3 py-1 bg-[#f6f3ee] text-[#4a5d4e] rounded-full font-bold uppercase tracking-tighter">
                    {expense.categoria}
                  </span>
                </td>
                <td className="py-6 text-right font-body font-bold text-[#1a3d2e]">
                  ${expense.total.toLocaleString()}
                </td>
                <td className="py-6 pr-8 text-right">
                  <div className="flex justify-end items-center gap-2">
                    {expense.estadoFactura === 'Cargada' ? (
                      <div className="flex items-center gap-1 text-emerald-600 font-bold text-[9px] uppercase tracking-tighter">
                        <CheckCircle size={14} /> Listo
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-orange-600 font-bold text-[9px] uppercase tracking-tighter animate-pulse">
                        <FileWarning size={14} /> Pendiente
                      </div>
                    )}
                    <button className="p-2 text-[#434843]/30 hover:text-[#1a3d2e] transition-colors">
                      <FileText size={18} />
                    </button>
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