// src/modules/cocina/types/receta.ts

export type EstadoPropuesta = 'BORRADOR' | 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';

export interface Ingrediente {
  id?: number;
  nombre: string;
  cantidad: number;
  unidadMedida: 'GR' | 'ML' | 'PZA' | 'KG' | 'LT';
}

export interface PropuestaProducto {
  id: number;
  nombre: string;
  categoria: 'BEBIDA' | 'COMIDA' | 'POSTRE';
  descripcion: string;
  precioSugerido: number;
  costoAproximado: number;
  ingredientes: Ingrediente[];
  instrucciones: string;
  estado: EstadoPropuesta;
  fechaCreacion: string;
}