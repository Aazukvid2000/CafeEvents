//RecipeDatailDrawer
'use client';

import React from 'react';
import { X, Scale, DollarSign, Image as ImageIcon, Tag } from 'lucide-react';
import { ProductProposal } from '../types/chef';

interface RecipeDetailDrawerProps {
  product: ProductProposal | null;
  onClose: () => void;
}

export const RecipeDetailDrawer = ({ product, onClose }: RecipeDetailDrawerProps) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#334537]/20 backdrop-blur-sm" onClick={onClose} />
      
      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-[#fcf9f4] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* Header */}
        <div className="p-8 border-b border-[#e5e2dd] flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold mb-2 block">Ficha Técnica de Producto</span>
            <h2 className="font-headline italic text-4xl text-[#1a3d2e]">{product.nombre}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#f6f3ee] rounded-full text-[#334537] transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Contenido Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          
          {/* Información Básica */}
          <section className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#5f5e5e]">
                <Tag size={16} />
                <span className="text-xs uppercase tracking-widest font-bold">Categoría: {product.categoria}</span>
              </div>
              <p className="text-sm text-[#5f5e5e] leading-relaxed">
                {product.descripcion || "Sin descripción proporcionada."}
              </p>
            </div>
            <div className="aspect-video bg-[#f0ede8] rounded-2xl flex items-center justify-center border-2 border-dashed border-[#c3c8c1]">
              {product.fotoUrl ? (
                <img src={product.fotoUrl} alt={product.nombre} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <div className="flex flex-col items-center text-[#c3c8c1]">
                  <ImageIcon size={32} />
                  <span className="text-[9px] uppercase mt-2 font-bold tracking-widest">Referencia Visual</span>
                </div>
              )}
            </div>
          </section>

          {/* Desglose de Receta (Escandallo) */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#334537]/10 pb-2">
              <Scale size={18} className="text-[#334537]" />
              <h3 className="font-headline italic text-2xl text-[#334537]">Ingredientes e Insumos</h3>
            </div>
            <div className="bg-white rounded-3xl border border-[#e5e2dd] overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#f6f3ee]/50 text-[9px] uppercase tracking-widest font-bold text-[#5f5e5e]">
                  <tr>
                    <th className="px-6 py-4">Insumo</th>
                    <th className="px-6 py-4">Cantidad</th>
                    <th className="px-6 py-4 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ede8]">
                  {product.receta.map((ing, idx) => (
                    <tr key={idx} className="text-sm">
                      <td className="px-6 py-4 font-medium text-[#1a3d2e]">{ing.nombre}</td>
                      <td className="px-6 py-4 text-[#5f5e5e]">{ing.cantidad} {ing.unidad}</td>
                      <td className="px-6 py-4 text-right font-bold text-[#1a3d2e]">${ing.subtotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Análisis Financiero */}
          <section className="grid grid-cols-3 gap-4">
            <div className="bg-[#f6f3ee] p-6 rounded-3xl border border-[#e5e2dd]">
              <span className="text-[9px] uppercase tracking-widest text-[#5f5e5e] block mb-2 font-bold">Costo de Producción</span>
              <p className="font-headline text-3xl text-[#1a3d2e]">${product.costoProduccion.toFixed(2)}</p>
            </div>
            <div className="bg-[#334537] p-6 rounded-3xl text-white shadow-xl">
              <span className="text-[9px] uppercase tracking-widest opacity-60 block mb-2 font-bold">Precio de Venta</span>
              <p className="font-headline text-3xl text-white">${product.precioVentaSugerido.toFixed(2)}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#e5e2dd]">
              <span className="text-[9px] uppercase tracking-widest text-[#5f5e5e] block mb-2 font-bold">Margen Bruto</span>
              <p className="font-headline text-3xl text-[#4a5d4e]">{product.margenUtilidadBruto}%</p>
            </div>
          </section>
        </div>

        {/* Footer Acciones */}
        <div className="p-8 border-t border-[#e5e2dd] bg-white flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 rounded-full border border-[#334537] text-[#334537] font-label text-[10px] uppercase tracking-widest font-bold hover:bg-[#f6f3ee] transition-colors"
          >
            Cerrar Vista
          </button>
          
        </div>
      </div>
    </div>
  );
};