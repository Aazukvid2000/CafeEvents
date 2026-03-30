// src/modules/ventas/mocks/pedido.mock.ts
import { Pedido } from '../types/pedido';
import { PRODUCTOS_MOCK } from './productos.mock';

// 1. Pedido para Mesa Física (Mesa 2 - En Servicio)
export const PEDIDO_ACTIVO_MOCK: Pedido = {
  id: 101,
  mesaId: 2,
  usuarioId: 10,
  estado: 'PENDIENTE',
  total: 35.00,
  detalles: [
    {
      productoId: 1,
      producto: PRODUCTOS_MOCK[0], // Café Americano
      cantidad: 1,
      precioUnitario: 35.00,
      subtotal: 35.00,
      observaciones: 'Sin azúcar'
    }
  ],
};

// 2. Lista de Pedidos en Mostrador (Para Llevar - Flujo S3)
// Esto permite al Cajero ver quién está esperando para pagar sin saber el ID
export const PEDIDOS_MOSTRADOR_MOCK: Pedido[] = [
  {
    id: 105,
    mesaId: 0, // Convención: 0 es Para Llevar
    nombreCliente: "JUAN PÉREZ", // Requisito S3
    usuarioId: 10,
    estado: 'PENDIENTE',
    total: 120.00,
    detalles: [
      {
        productoId: 2,
        producto: PRODUCTOS_MOCK[1], // Bagel de Lujo
        cantidad: 2,
        precioUnitario: 60.00,
        subtotal: 120.00,
        observaciones: 'Uno sin cebolla'
      }
    ],
  },
  {
    id: 106,
    mesaId: 0,
    nombreCliente: "MARÍA GARCÍA",
    usuarioId: 10,
    estado: 'PENDIENTE',
    total: 45.00,
    detalles: [
      {
        productoId: 3,
        producto: PRODUCTOS_MOCK[2], // Pay de Limón
        cantidad: 1,
        precioUnitario: 45.00,
        subtotal: 45.00,
      }
    ],
  }
];