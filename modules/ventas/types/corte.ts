// src/modules/ventas/types/corte.ts

export interface CorteCaja {
  id?: number;
  usuarioId: number;        // Cajero que realiza el corte
  fechaApertura: Date;
  fechaCierre: Date;
  fondoInicial: number;     // Dinero con el que empezó el turno
  
  // Totales registrados por el sistema
  ventasEfectivo: number;
  ventasTarjeta: number;
  totalVentas: number;

  // Ingresado manualmente por el cajero
  efectivoReal: number;     // Conteo físico de billetes/monedas
  diferencia: number;       // Calculado: efectivoReal - ventasEfectivo
  
  estado: 'ABIERTO' | 'CERRADO';
  observaciones?: string;
}