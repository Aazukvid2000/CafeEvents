'use client';

import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { CatalogRow } from '../components/CatalogRow';
import { RecipeDetailDrawer } from '../components/RecipeDetailDrawer';
import { MOCK_PRODUCT_PROPOSALS } from '../mocks/chef.mock';
import { ProductProposal, BaseCategory } from '../types/chef';

// Definimos las opciones de filtro incluyendo 'Todos'
type FilterType = 'Todos' | BaseCategory;

export const CatalogView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<ProductProposal | null>(null);

  // Filtro combinado: Búsqueda por texto + Categoría
  const filteredProducts = MOCK_PRODUCT_PROPOSALS.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === 'Todos' ? true : p.categoria === activeFilter;
    return matchesSearch && matchesCategory;
  });

  const filterOptions: FilterType[] = ['Todos', 'Comida', 'Bebida', 'Postre'];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="font-headline italic text-4xl text-[#1a3d2e]">Catálogo de Recetas</h2>
          <p className="text-[#434843]/60 text-xs uppercase tracking-widest font-bold italic">Base de datos de escandallos activos</p>
        </div>
    
      </header>

      {/* SECCIÓN DE FILTROS Y BÚSQUEDA */}
      <div className="space-y-6">
        {/* Buscador Principal */}
        <div className="flex justify-between items-center bg-white p-4 rounded-[1.5rem] border border-[#334537]/5 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3d2e]/20" size={18} />
            <input 
              type="text"
              placeholder="Buscar por nombre o ingrediente..."
              className="w-full pl-12 pr-4 py-3 bg-[#f6f3ee]/50 rounded-full border-none focus:ring-2 focus:ring-[#1a3d2e]/10 text-sm outline-none font-body"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 px-4 text-[#1a3d2e]/30">
             <Filter size={18} className="cursor-pointer hover:text-[#1a3d2e] transition-colors" />
          </div>
        </div>

        {/* SELECTOR DE CATEGORÍA (NUEVO) */}
        <div className="flex items-center gap-3 animate-in slide-in-from-left duration-500">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1a3d2e]/40 ml-2">Filtrar por:</span>
          <div className="bg-[#f6f3ee]/80 p-1 rounded-full flex gap-1 border border-[#1a3d2e]/5 shadow-inner">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === opt 
                    ? 'bg-[#1a3d2e] text-white shadow-md' 
                    : 'text-[#1a3d2e]/40 hover:text-[#1a3d2e] hover:bg-white/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla Editorial */}
      <div className="bg-white rounded-[2.5rem] border border-[#334537]/5 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f6f3ee]/50 border-b border-[#334537]/10 text-[10px] uppercase tracking-[0.2em] font-black text-[#434843]/60">
              <th className="py-5 pl-8">Producto</th>
              <th className="py-5">Costo Base</th>
              <th className="py-5">Venta Público</th>
              <th className="py-5">Margen Bruto</th>
              <th className="py-5 pr-8 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <CatalogRow 
                key={product.id}
                nombre={product.nombre}
                categoria={product.categoria}
                costo={product.costoProduccion}
                precioVenta={product.precioVentaSugerido}
                margen={product.margenUtilidadBruto}
                onEdit={() => setSelectedProduct(product)} 
              />
            ))}
          </tbody>
        </table>
        
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-headline italic text-2xl text-[#434843]/20">No se encontraron productos en esta categoría</p>
          </div>
        )}
      </div>

      <RecipeDetailDrawer 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};