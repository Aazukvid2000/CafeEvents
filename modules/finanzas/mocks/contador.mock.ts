import { ProviderPayment, FinancialTransaction, FinancialReport, ExpenseEntry, SalesAuditEntry } from "../types/contador";


/**
 * MOCK: TRANSACCIONES DETALLADAS
 * Simula el historial de ingresos y egresos (RN-03)
 */
export const MOCK_TRANSACCIONES: FinancialTransaction[] = [
  // Ingresos de Cafetería
  { id: 'tr-001', fecha: '2026-03-01T10:00:00Z', concepto: 'Venta Diaria Turno Mañana', categoria: 'Ingreso Cafetería', monto: 4500.50, metodoPago: 'Tarjeta' },
  { id: 'tr-002', fecha: '2026-03-01T15:00:00Z', concepto: 'Venta Diaria Turno Tarde', categoria: 'Ingreso Cafetería', monto: 3200.00, metodoPago: 'Efectivo' },
  
  // Ingresos de Eventos (Caso de Uso: Registrar pago de saldo 50%)
  { id: 'tr-003', fecha: '2026-03-02T12:00:00Z', concepto: 'Liquidación 50% - Boda Alabaster Verano', categoria: 'Ingreso Eventos', monto: 12500.00, metodoPago: 'Transferencia', referenciaId: 'ev-101' }, 
  { id: 'tr-004', fecha: '2026-03-05T09:00:00Z', concepto: 'Anticipo 50% - Aniversario Corporativo', categoria: 'Ingreso Eventos', monto: 8000.00, metodoPago: 'Transferencia', referenciaId: 'ev-102' }, 

  // Egresos
  { id: 'tr-005', fecha: '2026-03-06T11:00:00Z', concepto: 'Pago Proveedor: Granos de Café Geisha', categoria: 'Costo Inventario', monto: 5200.00, metodoPago: 'Transferencia' },
  { id: 'tr-006', fecha: '2026-03-07T10:00:00Z', concepto: 'Pago Nómina Meseros - Quincena 1', categoria: 'Salario', monto: 15000.00, metodoPago: 'Transferencia' },
];

/**
 * MOCK: PAGOS A PROVEEDORES
 * Según Caso de Uso: Registrar pago a Proveedores
 */
export const MOCK_PAGOS_PROVEEDORES: ProviderPayment[] = [
  {
    id: 'pay-001',
    proveedorNombre: 'Distribuidora Avícola Central',
    monto: 2450.00,
    descripcion: 'Compra de insumos de cocina (huevos y lácteos)',
    fechaPago: '2026-03-25T10:00:00Z',
    numeroCuenta: '**** 8842',
    formatoEntrega: 'Presencial - Almacén Norte', 
    estado: 'Pagado',
    facturaUrl: '/docs/facturas/fac-avicola-01.pdf'
  },
  {
    id: 'pay-002',
    proveedorNombre: 'Cafés Especiales del Sur',
    monto: 8900.00,
    descripcion: 'Lote mensual de café Geisha y variedades locales',
    fechaPago: '2026-03-28T09:30:00Z',
    numeroCuenta: '**** 1123',
    formatoEntrega: 'Envío Logística Externa',
    estado: 'Factura Recibida',
    facturaUrl: '/docs/facturas/fac-cafe-99.pdf'
  },
  {
    id: 'pay-003',
    proveedorNombre: 'Mobiliario & Estilo Eventos',
    monto: 1500.00,
    descripcion: 'Renta de cristalería Murano para evento Boda',
    fechaPago: '2026-03-29T16:00:00Z',
    numeroCuenta: '**** 4455',
    formatoEntrega: 'Recolección en Tienda', 
    estado: 'Sin Factura' // S2: Factura no recibida 
  }
];

/**
 * MOCK: HISTÓRICO DE REPORTES GENERADOS
 * Según Caso de Uso: Generar Reporte Financiero (Paso 6 y 7)
 */
export const MOCK_REPORTES_HISTORICO: FinancialReport[] = [
  {
    id: 'rep-marzo-2026',
    tipo: 'Estado de Resultados', 
    periodoInicio: '2026-03-01',
    periodoFin: '2026-03-31',
    fechaGeneracion: '2026-04-01T08:00:00Z',
    generadoPor: 'Contador General',
    metricas: {
      ingresosCafeteria: 125000.00, 
      ingresosEventos: 85000.00, 
      costosInventario: 45000.00, 
      gastosOperativos: 22000.00, 
      utilidadBruta: 143000.00, 
      utilidadNeta: 121000.00 
    },
    archivoUrl: '/exports/reporte_fin_marzo_2026.pdf'
  }
];

export const MOCK_LIBRO_GASTOS: ExpenseEntry[] = [
  {
    id: 'EXP-101',
    fecha: '2026-03-15',
    proveedor: 'CFE Energía',
    categoria: 'Servicios',
    monto: 4500.00,
    impuesto: 720.00,
    total: 5220.00,
    folioFiscal: 'UUID-550e8400-e29b-41d4',
    estadoFactura: 'Cargada',
    archivoUrl: '#'
  },
  {
    id: 'EXP-102',
    fecha: '2026-03-20',
    proveedor: 'Panificadora El Sol',
    categoria: 'Insumos',
    monto: 1200.00,
    impuesto: 0, // Tasa 0%
    total: 1200.00,
    estadoFactura: 'Pendiente', // S2: Factura no recibida [cite: 115]
  }
];

export const MOCK_AUDITORIA_VENTAS: SalesAuditEntry[] = [
  {
    id: 'CORTE-88',
    fecha: '2026-03-28',
    tipo: 'Corte de Caja',
    responsable: 'Cajero Central',
    montoEsperado: 8500.00,
    montoReal: 8495.00,
    diferencia: -5.00,
    estado: 'Conciliado', // Dentro del margen permitido [cite: 35]
    observaciones: 'Ajuste menor por redondeo.'
  },
  {
    id: 'EV-PAY-101',
    fecha: '2026-03-29',
    tipo: 'Liquidación Evento',
    responsable: 'Gerente de Eventos',
    montoEsperado: 12500.00,
    montoReal: 12500.00,
    diferencia: 0,
    estado: 'Conciliado'
  },
  {
    id: 'CORTE-89',
    fecha: '2026-03-30',
    tipo: 'Corte de Caja',
    responsable: 'Cajero Turno Tarde',
    montoEsperado: 12400.00,
    montoReal: 12350.00,
    diferencia: -50.00,
    estado: 'Discrepancia', // Requiere revisión de Administrador [cite: 50, 67]
    observaciones: 'Faltante en efectivo sin justificar.'
  }
];