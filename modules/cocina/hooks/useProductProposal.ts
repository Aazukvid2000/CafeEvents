import { useState, useMemo } from 'react';
import { ProductProposal, Ingredient, Modifier, ProposalStatus } from '../types/chef';

export const useProductProposal = (initialData?: ProductProposal) => {
  const [proposal, setProposal] = useState<Partial<ProductProposal>>(
    initialData || {
      nombre: '',
      descripcion: '',
      categoria: 'Comida',
      receta: [],
      modificadores: [],
      estado: 'Borrador',
      precioVentaSugerido: 0,
    }
  );

  // Cálculos automáticos basados en la receta (RN: Paso 7 del Flujo Normal)
  const financialMetrics = useMemo(() => {
    const costoReceta = proposal.receta?.reduce((sum, ing) => sum + ing.subtotal, 0) || 0;
    const costoModificadores = proposal.modificadores?.reduce((sum, mod) => sum + mod.costoExtra, 0) || 0;
    
    const costoTotal = costoReceta; // El costo base es la receta
    const precioVenta = proposal.precioVentaSugerido || 0;
    
    // Margen Bruto = ((Precio - Costo) / Precio) * 100
    const margen = precioVenta > 0 ? ((precioVenta - costoTotal) / precioVenta) * 100 : 0;

    return {
      costoProduccion: costoTotal,
      margenUtilidadBruto: margen,
      precioMinimoSugerido: costoTotal * 2.5, // Ejemplo: multiplicador base de la casa
    };
  }, [proposal.receta, proposal.precioVentaSugerido]);

  const addIngredient = (newIng: Ingredient) => {
    setProposal(prev => ({
      ...prev,
      receta: [...(prev.receta || []), newIng]
    }));
  };

  const removeIngredient = (insumoId: string) => {
    setProposal(prev => ({
      ...prev,
      receta: prev.receta?.filter(ing => ing.insumoId !== insumoId)
    }));
  };

  const updateStatus = (newStatus: ProposalStatus) => {
    setProposal(prev => ({ ...prev, estado: newStatus }));
  };

  return {
    proposal,
    ...financialMetrics,
    addIngredient,
    removeIngredient,
    updateStatus,
    setProposal
  };
};