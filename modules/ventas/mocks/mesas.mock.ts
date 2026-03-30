// src/modules/ventas/mocks/mesas.mock.ts
import { Mesa } from '../types/mesa';

export const MESAS_MOCK: Mesa[] = [
  { id: 1, numero: 1, capacidad: 2, disponible: true },
  { id: 2, numero: 2, capacidad: 4, disponible: false }, // "En servicio" según CU 
  { id: 3, numero: 3, capacidad: 6, disponible: true },
  { id: 4, numero: 4, capacidad: 2, disponible: true },
];