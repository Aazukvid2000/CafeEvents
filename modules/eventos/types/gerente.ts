/**
 * TIPOS DE SALONES Y CAPACIDADES (Regla de Negocio 2 y 4)
 * Cafetería: 20-50 personas 
 * Salón de Eventos: 100-250 personas 
 */
export type VenueType = 'CAFETERIA' | 'SALON_EVENTOS';

/**
 * ESTADOS LÓGICOS DE LA RESERVACIÓN
 * Pendiente: Creada pero sin el 50% de anticipo 
 * Confirmada: Con anticipo pagado 
 * Cancelada: Por falta de pago o solicitud del cliente [cite: 101, 159]
 */
export type ReservationStatus = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'PAGADA_TOTAL';

/**
 * DATOS DEL CLIENTE (Requerimiento Funcional 4)
 * Todos los campos marcados con (*) son obligatorios 
 */
export interface ClienteEvento {
  nombre: string;     // (*) 
  direccion: string;  // (*) 
  telefono: string;   // (*) 
  correo: string;     // (*) Para envío de confirmación PDF [cite: 101, 102]
}

/**
 * ENTIDAD DE RESERVACIÓN
 * Cumple con los requerimientos de los pasos 2, 4 y 7 del flujo normal 
 */
export interface Reservacion {
  id: string;
  fechaEvento: string;       // Validación: > 15 días de antelación 
  horaEvento: string;        // 
  salon: VenueType;          // 
  pax: number;               // Número de personas 
  cliente: ClienteEvento;    // 
  platillosIds: string[];    // Exclusivamente menú de cafetería 
  serviciosAdicionales: {
    meseros: boolean;        // Opcional 
  };
  
  // Gestión Financiera (Regla de Negocio 3 y 7) 
  costoTotal: number;        // 
  anticipoPagado: number;    // Debe ser el 50% para confirmar 
  saldoPendiente: number;    // El otro 50% se paga 1 día antes 
  
  estado: ReservationStatus; // 
  fechaCreacion: string;
}