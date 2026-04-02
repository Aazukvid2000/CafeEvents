//chef.mock.ts
import { ProductProposal, EventMenuProposal } from "../types/chef";
import { Pedido } from "../types/chef";

export const MOCK_PEDIDOS_COCINA: Pedido[] = [
  {
    id: 1204,
    mesaId: 2,
    nombreCliente: "Familia Ruiz",
    usuarioId: 10,
    estado: 'PREPARANDO',
    total: 850.00,
    tiempoTranscurrido: 12,
    fechaCreacion: '2026-04-02T12:30:00Z',
    detalles: [
      { id: 1, productoNombre: 'Croissant de Pistacho', cantidad: 2, estado: 'PREPARANDO', notas: 'Calentar un poco' },
      { id: 2, productoNombre: 'V60 Geisha Panameño', cantidad: 1, estado: 'LISTO' }
    ]
  },
  {
    id: 1205,
    mesaId: 5,
    nombreCliente: "Mesa Ejecutiva",
    usuarioId: 12,
    estado: 'PENDIENTE',
    total: 420.00,
    tiempoTranscurrido: 3,
    fechaCreacion: '2026-04-02T12:40:00Z',
    detalles: [
      { id: 3, productoNombre: 'Tostada de Aguacate & Eneldo', cantidad: 2, estado: 'PENDIENTE' }
    ]
  }
];
/**
 * Mocks de Insumos (Simulando lo que vendría de Inventario)
 * Necesarios para calcular el costo de las recetas.
 */
export const MOCK_INSUMOS = [
  { id: 'ins-01', nombre: 'Grano Geisha Panameño', costoUnitario: 1.2, unidad: 'gr' },
  { id: 'ins-02', nombre: 'Leche Orgánica', costoUnitario: 0.025, unidad: 'ml' },
  { id: 'ins-03', nombre: 'Mantequilla de Pastoreo', costoUnitario: 0.15, unidad: 'gr' },
  { id: 'ins-04', nombre: 'Harina Gran Fuerza', costoUnitario: 0.05, unidad: 'gr' },
  { id: 'ins-05', nombre: 'Salmón Chileno', costoUnitario: 0.8, unidad: 'gr' },
];

/**
 * Mock de Propuestas de Productos (Caso de Uso 1)
 */
export const MOCK_PRODUCT_PROPOSALS: ProductProposal[] = [
  {
    id: 'prop-001',
    nombre: 'Croissant de Pistacho Sicilia',
    descripcion: 'Masa madre de 72 horas, relleno de crema pura de pistacho de Bronte.',
    categoria: 'Postre',
    receta: [
      { insumoId: 'ins-03', nombre: 'Mantequilla', cantidad: 80, unidad: 'gr', costoUnitario: 0.15, subtotal: 12 },
      { insumoId: 'ins-04', nombre: 'Harina', cantidad: 200, unidad: 'gr', costoUnitario: 0.05, subtotal: 10 },
    ],
    modificadores: [
      {
        id: 'mod-01',
        nombre: 'Extra Crema de Pistacho',
        precioSugerido: 25,
        costoExtra: 10,
        insumos: [{ insumoId: 'ins-09', nombre: 'Pistacho', cantidad: 30, unidad: 'gr', costoUnitario: 0.33, subtotal: 10 }]
      }
    ],
    costoProduccion: 22,
    margenUtilidadBruto: 75,
    precioMinimoSugerido: 88,
    precioVentaSugerido: 115,
    estado: 'Pendiente de Autorización',
    chefId: 'chef-laura',
    fechaCreacion: '2026-04-01T10:00:00Z'
  },
  {
    id: 'prop-002',
    nombre: 'V60 Geisha Especial',
    descripcion: 'Café de especialidad con notas a jazmín y durazno blanco.',
    categoria: 'Bebida',
    receta: [
      { insumoId: 'ins-01', nombre: 'Grano Geisha', cantidad: 18, unidad: 'gr', costoUnitario: 1.2, subtotal: 21.6 },
    ],
    modificadores: [],
    costoProduccion: 21.6,
    margenUtilidadBruto: 85,
    precioMinimoSugerido: 144,
    precioVentaSugerido: 165,
    estado: 'Borrador',
    chefId: 'chef-laura',
    fechaCreacion: '2026-04-02T08:30:00Z'
  }
];

/**
 * Mock de Propuestas de Menú de Eventos (Caso de Uso 2)
 */
export const MOCK_EVENT_PROPOSALS: EventMenuProposal[] = [
  {
    id: 'ev-prop-001',
    nombre: 'Boda Alabaster Verano',
    descripcion: 'Menú refinado de 3 tiempos con enfoque en frescura cítrica.',
    tipoEvento: 'Boda',
    paxMinimo: 50,
    paxMaximo: 200,
    items: [
      { productoId: 'prod-act-01', nombre: 'Tostada de Aguacate & Eneldo', categoriaServicio: 'Entrada', cantidadPorPersona: 1, costoUnitarioBase: 45 },
      { productoId: 'prod-act-02', nombre: 'Salmón al Sellado Térmico', categoriaServicio: 'Plato Fuerte', cantidadPorPersona: 1, costoUnitarioBase: 120 },
      { productoId: 'prop-001', nombre: 'Croissant de Pistacho', categoriaServicio: 'Postre', cantidadPorPersona: 1, costoUnitarioBase: 22 }
    ],
    notasEspeciales: 'Requiere cristalería de Murano y montajes de tiempos sincronizados.',
    costoTotalPorPersona: 187,
    precioSugeridoPorPax: 850,
    margenUtilidadEstimado: 78,
    estado: 'Pendiente de Autorización',
    chefId: 'chef-laura',
    fechaCreacion: '2026-04-02T09:00:00Z'
  },
  {
    id: 'ev-prop-002',
    nombre: 'Boda Alabaster Verano',
    descripcion: 'Menú refinado de 3 tiempos con enfoque en frescura cítrica.',
    tipoEvento: 'Boda',
    paxMinimo: 50,
    paxMaximo: 200,
    items: [
      { productoId: 'prod-act-01', nombre: 'Tostada de Aguacate & Eneldo', categoriaServicio: 'Entrada', cantidadPorPersona: 1, costoUnitarioBase: 45 },
      { productoId: 'prod-act-02', nombre: 'Salmón al Sellado Térmico', categoriaServicio: 'Plato Fuerte', cantidadPorPersona: 1, costoUnitarioBase: 120 },
      { productoId: 'prop-001', nombre: 'Croissant de Pistacho', categoriaServicio: 'Postre', cantidadPorPersona: 1, costoUnitarioBase: 22 }
    ],
    notasEspeciales: 'Requiere cristalería de Murano y montajes de tiempos sincronizados.',
    costoTotalPorPersona: 187,
    precioSugeridoPorPax: 850,
    margenUtilidadEstimado: 78,
    estado: 'Borrador',
    chefId: 'chef-laura',
    fechaCreacion: '2026-04-02T09:00:00Z'
  }
];