import { useState, useMemo } from 'react';
import { EventMenuProposal, EventMenuItem } from '../types/chef';

export const useEventProposal = (initialData?: EventMenuProposal) => {
  const [menu, setMenu] = useState<Partial<EventMenuProposal>>(
    initialData || {
      nombre: '',
      items: [],
      paxMinimo: 10,
      paxMaximo: 50,
      estado: 'Borrador'
    }
  );

  // Cálculos automáticos para Eventos (RN: Paso 6 del flujo de eventos)
  const eventMetrics = useMemo(() => {
    const costoPorPax = menu.items?.reduce((sum, item) => 
      sum + (item.costoUnitarioBase * item.cantidadPorPersona), 0) || 0;
    
    const precioPax = menu.precioSugeridoPorPax || 0;
    const margen = precioPax > 0 ? ((precioPax - costoPorPax) / precioPax) * 100 : 0;

    return {
      costoTotalPorPersona: costoPorPax,
      margenUtilidadEstimado: margen
    };
  }, [menu.items, menu.precioSugeridoPorPax]);

  const addItemToMenu = (item: EventMenuItem) => {
    // Aquí se podría validar que el producto esté autorizado antes de añadir
    setMenu(prev => ({
      ...prev,
      items: [...(prev.items || []), item]
    }));
  };

  return {
    menu,
    ...eventMetrics,
    addItemToMenu,
    setMenu
  };
};