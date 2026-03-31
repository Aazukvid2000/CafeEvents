// src/modules/cocina/mocks/propuesta.mock.ts
import { PropuestaProducto } from '../types/receta';

// OBJETO PARA NUEVAS PROPUESTAS (Lo que le faltaba al Hook)
export const PROPUESTA_INICIAL_MOCK: PropuestaProducto = {
  id: 0,
  nombre: '',
  categoria: 'COMIDA',
  descripcion: '',
  precioSugerido: 0,
  costoAproximado: 0,
  ingredientes: [],
  instrucciones: '',
  estado: 'BORRADOR',
  fechaCreacion: new Date().toISOString().split('T')[0]
};

// LISTADO PARA EL DASHBOARD
export const MIS_PROPUESTAS_MOCK: PropuestaProducto[] = [
  {
    id: 1,
    nombre: 'Omelette Especial',
    categoria: 'COMIDA',
    descripcion: 'Omelette relleno de espinacas y queso feta.',
    precioSugerido: 85.00,
    costoAproximado: 32.50,
    ingredientes: [{ nombre: 'Huevo', cantidad: 3, unidadMedida: 'PZA' }],
    instrucciones: 'Saltear y doblar.',
    estado: 'PENDIENTE',
    fechaCreacion: '2026-03-28'
  },
  {
    id: 2,
    nombre: 'Smoothie Verde',
    categoria: 'BEBIDA',
    descripcion: 'Bebida energética de piña y apio.',
    precioSugerido: 45.00,
    costoAproximado: 12.00,
    ingredientes: [{ nombre: 'Piña', cantidad: 100, unidadMedida: 'GR' }],
    instrucciones: 'Licuar a alta velocidad.',
    estado: 'APROBADO',
    fechaCreacion: '2026-03-25'
  }
];