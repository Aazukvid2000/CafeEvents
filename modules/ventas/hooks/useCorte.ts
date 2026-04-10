// src/modules/ventas/hooks/useCorte.ts
import { useState } from 'react';
import { CorteCaja } from '../types/corte';
import { CORTE_ACTUAL_MOCK } from '../mocks/corte.mock';
import { MESAS_MOCK } from '../mocks/mesas.mock'; // Para validar E2

export const useCorte = () => {
  const [corte] = useState<CorteCaja>(CORTE_ACTUAL_MOCK);
  const [efectivoReal, setEfectivoReal] = useState(0);

  const validarCorte = () => {
    // E2: Intento de corte con cuentas pendientes
    const mesasOcupadas = MESAS_MOCK.filter(m => !m.disponible);
    if (mesasOcupadas.length > 0) {
      return { error: 'CUENTAS_PENDIENTES', data: mesasOcupadas.length };
    }

    // E1: Diferencia significativa (Ej: Mayor a $50.00)
    const diferencia = efectivoReal - corte.ventasEfectivo;
    if (Math.abs(diferencia) > 50) {
      return { error: 'DIFERENCIA_CRITICA', data: diferencia };
    }

    return { error: null };
  };

  const ejecutarCierre = () => {
    // Simulación E3: Falla del sistema (Random 10%)
    if (Math.random() < 0.1) throw new Error("DATABASE_OFFLINE");
    
    return { ...corte, efectivoReal, estado: 'CERRADO' };
  };

  return { corte, efectivoReal, setEfectivoReal, validarCorte, ejecutarCierre };
};