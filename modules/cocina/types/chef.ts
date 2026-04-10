/** * ENTIDADES DE APOYO (Value Objects)
 */
export type ProposalStatus = 'Borrador' | 'Pendiente de Autorización' | 'Autorizado' | 'Rechazado';
export type UnitOfMeasure = 'gr' | 'ml' | 'pza' | 'kg' | 'lt' | 'oz';
export type BaseCategory = 'Comida' | 'Bebida' | 'Postre';
export type EventServiceCategory = 'Entrada' | 'Plato Fuerte' | 'Postre' | 'Bebida' | 'Estación' | 'Catering';

/**
 * Entidad: Insumo (Referencia a Inventario)
 */
export interface Ingredient {
  insumoId: string;
  nombre: string;
  cantidad: number;
  unidad: UnitOfMeasure;
  costoUnitario: number;
  subtotal: number; // cantidad * costoUnitario
}

/**
 * Entidad: Modificador
 */
export interface Modifier {
  id: string;
  nombre: string;
  precioSugerido: number;
  costoExtra: number;
  insumos: Ingredient[]; // RN: Todo modificador debe vincularse a insumos
}

/**
 * CASO DE USO 1: PROPUESTA DE PRODUCTO Y RECETA
 * Representa el objeto Producto en fase de diseño/aprobación.
 */
export interface ProductProposal {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: BaseCategory;
  fotoUrl?: string;
  
  // Receta (Escandallo)
  receta: Ingredient[];
  modificadores: Modifier[];
  
  // Métricas de Negocio (Cálculos automáticos)
  costoProduccion: number;
  margenUtilidadBruto: number; // %
  precioMinimoSugerido: number;
  precioVentaSugerido: number;
  
  // Estado y Auditoría
  estado: ProposalStatus;
  chefId: string;
  fechaCreacion: string;
  comentariosAdmin?: string;
}

/**
 * CASO DE USO 2: PROPUESTA DE MENÚ DE EVENTO
 * Estructura jerárquica que agrupa productos existentes.
 */
export interface EventMenuItem {
  productoId: string; // Solo productos en estado 'Autorizado'
  nombre: string;
  categoriaServicio: EventServiceCategory;
  cantidadPorPersona: number;
  costoUnitarioBase: number;
}

export interface EventMenuProposal {
  id: string;
  nombre: string; // Ej: "Boda Alabaster Verano"
  descripcion: string;
  tipoEvento: string; // Ej: "Boda", "Corporativo"
  paxMinimo: number;
  paxMaximo: number;
  
  items: EventMenuItem[];
  
  // Requerimientos (RN: Equipo, decoración)
  notasEspeciales: string;
  
  // Finanzas del Evento
  costoTotalPorPersona: number;
  precioSugeridoPorPax: number;
  margenUtilidadEstimado: number; // %
  
  estado: ProposalStatus;
  chefId: string;
  fechaCreacion: string;
}

/** * Estados operativos de un producto individual dentro de una comanda
 */
export type OrderItemStatus = 'PENDIENTE' | 'PREPARANDO' | 'LISTO';

/**
 * Estados globales del Pedido (Sincronizado con tu esquema de Base de Datos)
 */
export type OrderStatus = 'PENDIENTE' | 'PREPARANDO' | 'LISTO' | 'ENTREGADO' | 'CANCELADO';

export interface DetallePedido {
  id: number;
  productoNombre: string;
  cantidad: number;
  notas?: string; 
  estado: OrderItemStatus;
}

export interface Pedido {
  id: number;
  mesaId: number;
  nombreCliente?: string;
  usuarioId: number; // ID del Mesero
  estado: OrderStatus;
  total: number;
  observaciones?: string;
  detalles: DetallePedido[];
  fechaCreacion: string;
  tiempoTranscurrido: number; // Calculado en minutos para el Chef
}