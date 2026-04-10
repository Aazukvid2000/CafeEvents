// src/modules/ventas/mocks/corte.mock.ts
import { CorteCaja } from '../types/corte';

export const CORTE_ACTUAL_MOCK: CorteCaja = {
  usuarioId: 1,
  fechaApertura: new Date(new Date().setHours(8, 0, 0)),
  fechaCierre: new Date(),
  fondoInicial: 1000.00,
  ventasEfectivo: 4550.00,
  ventasTarjeta: 3200.00,
  totalVentas: 7750.00,
  efectivoReal: 0,
  diferencia: 0,
  estado: 'ABIERTO'
};