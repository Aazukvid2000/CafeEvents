// src/modules/cocina/hooks/usePropuesta.ts
import { useState } from 'react';
import { PropuestaProducto, Ingrediente } from '../types/receta';
import { PROPUESTA_INICIAL_MOCK } from '../mocks/propuesta.mock';

export const usePropuesta = () => {
  const [propuesta, setPropuesta] = useState<PropuestaProducto>(PROPUESTA_INICIAL_MOCK);

  const updatePropuesta = (data: Partial<PropuestaProducto>) => {
    setPropuesta(prev => ({ ...prev, ...data }));
  };

  const addIngrediente = (ing: Ingrediente) => {
    setPropuesta(prev => ({
      ...prev,
      ingredientes: [...prev.ingredientes, ing]
    }));
  };

  const removeIngrediente = (index: number) => {
    setPropuesta(prev => ({
      ...prev,
      ingredientes: prev.ingredientes.filter((_, i) => i !== index)
    }));
  };

  const resetPropuesta = () => setPropuesta(PROPUESTA_INICIAL_MOCK);

  const enviarPropuesta = () => {
    // Excepción E1: Falta de ingredientes
    if (propuesta.ingredientes.length === 0) {
      throw new Error("SIN_INGREDIENTES");
    }
    
    // Simulación de envío
    console.log("Propuesta enviada al administrador:", propuesta);
    // En un caso real aquí haríamos el resetPropuesta()
  };

  return { 
    propuesta, 
    updatePropuesta, 
    addIngrediente, 
    removeIngrediente, 
    enviarPropuesta,
    resetPropuesta 
  };
};