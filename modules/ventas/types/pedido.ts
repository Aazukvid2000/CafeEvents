// src/modules/ventas/types/pedido.ts
import { Producto } from './producto';

// Representa la tabla DetallePedido de Prisma
export interface DetallePedido {
  id?: number;
  pedidoId?: number;
  productoId: number;
  producto?: Producto;      // Relación para mostrar nombre/precio en UI 
  cantidad: number;
  precioUnitario: number;
  subtotal: number;         // Calculado: cantidad * precioUnitario
  observaciones?: string;   // Correspondiente a "Notas especiales" 
}

// Representa la tabla Pedido de Prisma
export interface Pedido {
  id?: number;
  mesaId: number;           // Relación con Mesa [cite: 18]
  usuarioId: number;        // ID del Mesero (Actor principal) [cite: 18]
  estado: 'PENDIENTE' | 'PREPARANDO' | 'LISTO' | 'ENTREGADO' | 'CANCELADO'; 
  total: number;
  observaciones?: string;   // Notas generales del pedido
  detalles: DetallePedido[]; // Comanda digital 
  fechaCreacion?: Date;
}

/**
 * Métodos definidos en tu lógica de negocio:
 * - crearPedido(tipoPedido: String)
 * - agregarProducto(producto: Producto, cantidad: int) 
 * - eliminarProducto(idProducto: String)
 * - confirmarPedido() 
 * - enviarACocina() 
 */