// src/modules/ventas/types/pago.ts

export interface Pago {
  id?: number;
  cuentaId: number;
  monto: number;
  metodo: 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA';
  confirmado: boolean;
  fechaPago: Date;
  requiereFactura: boolean;
  datosFiscales?: DatosFiscales;
}

// Actualizado para coincidir con el formulario del diálogo
export interface DatosFiscales {
  rfc: string;
  razonSocial: string;
  codigoPostal: string;
  email: string;      // Cambiado de correoElectronico para coincidir con CFDIFormData
  usoCFDI: string;
}