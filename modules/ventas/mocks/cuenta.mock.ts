// src/modules/ventas/mocks/cuenta.mock.ts
import { Cuenta } from '../types/cuenta';
import { PEDIDO_ACTIVO_MOCK } from './pedido.mock';

/**
 * Simulación de cuenta para la Mesa 2 (Ocupada)
 * Refleja el Paso 2: Lista detallada, subtotal, impuestos y total 
 */
export const CUENTA_ACTIVA_MOCK: Cuenta = {
  id: 501,
  pedidoId: 101, // Vinculado al PEDIDO_ACTIVO_MOCK 
  pedido: PEDIDO_ACTIVO_MOCK,
  usuarioId: 20, // ID del Cajero autenticado [cite: 26]
  
  // Valores calculados basados en el pedido de $35.00 
  subtotal: 30.17, 
  impuesto: 4.83,  // IVA 16% aproximado 
  total: 35.00,
  
  saldoPendiente: 35.00, // Inicialmente el saldo es igual al total 
  pagada: false,         // Precondición: No debe estar en estado "Pagada" [cite: 26]
  descuento: 0,          // Sin descuento aplicado aún (S2) 
  fechaCreacion: new Date('2026-03-30T08:00:00Z')
};

/**
 * Simulación de una cuenta con Pago Parcial (S1)
 * Para probar que la mesa sigue "En servicio" si el saldo > 0 
 */
export const CUENTA_PARCIAL_MOCK: Cuenta = {
  id: 502,
  pedidoId: 102,
  usuarioId: 20,
  subtotal: 517.24,
  impuesto: 82.76,
  total: 600.00,
  saldoPendiente: 200.00, // Ya se pagaron 400 
  pagada: false,
  descuento: 0,
  fechaCreacion: new Date('2026-03-30T07:30:00Z')
};