// src/modules/ventas/mocks/productos.mock.ts
import { Producto } from '../types/producto';

export const PRODUCTOS_MOCK: Producto[] = [
  { 
    id: 1, 
    nombre: 'Café Americano', 
    descripcion: 'Café de grano recién molido', 
    precio: 35.00, 
    categoria: 'Bebida', 
    disponible: true 
  },
  { 
    id: 2, 
    nombre: 'Bagel de Lujo', 
    descripcion: 'Con queso crema y especias', 
    precio: 75.00, 
    categoria: 'Comida', 
    disponible: true 
  },
  { 
    id: 3, 
    nombre: 'Pay de Limón', 
    descripcion: 'Receta artesanal de la casa', 
    precio: 50.00, 
    categoria: 'Postre', 
    disponible: false // Para probar la excepción E1: Producto sin stock [cite: 24]
  },
];