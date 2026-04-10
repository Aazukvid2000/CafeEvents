// src/modules/ventas/types/cuenta.ts
import { Pedido } from './pedido';

export interface Cuenta {
  id: number;               // idCuenta en UML
  pedidoId: number;         // Relación 1:1 con Pedido
  pedido?: Pedido;          // Para mostrar la lista detallada (Paso 2) 
  usuarioId: number;        // ID del Cajero que procesa
  subtotal: number;         // Método calcularSubtotal()
  impuesto: number;         // Método calcularImpuestos() (IVA)
  total: number;            // Monto final a liquidar 
  saldoPendiente: number;   // Para Flujo S1: Cuentas divididas 
  pagada: boolean;          // Estado de cierre (Paso 10) 
  descuento: number;        // Para Flujo S2: Lealtad 
  fechaCreacion: Date;
}

/**
 * Métodos del Modelo de Dominio a implementar en el Hook:
 * - generarResumen()
 * - aplicarDescuentoLealtad(tarjeta)
 * - cerrarCuenta()
 */