import { Reservacion } from "../types/gerente";

/**
 * MOCK: RESERVACIONES ACTIVAS
 * Refleja eventos en distintos estados para validar la UI
 */
export const MOCK_RESERVACIONES: Reservacion[] = [
  {
    id: 'RES-2026-001',
    fechaEvento: '2026-04-20', // Cumple > 15 días 
    horaEvento: '14:00',
    salon: 'CAFETERIA',
    pax: 35, // Rango válido: 20-50 
    cliente: {
      nombre: 'Ana Martínez',
      direccion: 'Calle Pino Suarez #12, Centro',
      telefono: '9531234567',
      correo: 'ana.mtz@email.com'
    },
    platillosIds: ['prod-01', 'prod-05'], // Menú cafetería 
    serviciosAdicionales: {
      meseros: true
    },
    costoTotal: 12000.00,
    anticipoPagado: 6000.00, // 50% exacto 
    saldoPendiente: 6000.00,
    estado: 'PAGADA_TOTAL',
    fechaCreacion: '2026-03-25T10:00:00Z'
  },
  {
    id: 'RES-2026-002',
    fechaEvento: '2026-05-10',
    horaEvento: '19:00',
    salon: 'SALON_EVENTOS',
    pax: 150, // Rango válido: 100-250 
    cliente: {
      nombre: 'Corporativo Mixteca',
      direccion: 'Av. Universitaria #500',
      telefono: '9539876543',
      correo: 'eventos@corpmixteca.com'
    },
    platillosIds: ['prod-10', 'prod-12'],
    serviciosAdicionales: {
      meseros: true
    },
    costoTotal: 85000.00,
    anticipoPagado: 20000.00, // Menos del 50% 
    saldoPendiente: 65000.00,
    estado: 'PENDIENTE',
    fechaCreacion: '2026-03-30T15:30:00Z'
  }
];

/**
 * MOCK: DISPONIBILIDAD (Para validación E1)
 * Simula fechas ya bloqueadas en el calendario 
 */
export const MOCK_OCUPACION_SALONES = [
  { fecha: '2026-04-20', salon: 'CAFETERIA', ocupado: true },
  { fecha: '2026-04-20', salon: 'SALON_EVENTOS', ocupado: false },
];