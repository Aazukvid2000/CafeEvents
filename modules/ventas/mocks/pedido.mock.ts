// src/modules/ventas/mocks/pedido.mock.ts
import { Pedido } from '../types/pedido';
import { PRODUCTOS_MOCK } from './productos.mock';

export const PEDIDO_ACTIVO_MOCK: Pedido = {
  id: 101,
  mesaId: 2, // Mesa ocupada 
  usuarioId: 10, // ID del Mesero autenticado 
  estado: 'PENDIENTE', // Estado inicial según CU 
  total: 35.00,
  detalles: [
    {
      productoId: 1,
      producto: PRODUCTOS_MOCK[0],
      cantidad: 1,
      precioUnitario: 35.00,
      subtotal: 35.00,
      observaciones: 'Sin azúcar' // Campo "Notas especiales" 
    }
  ],
};