/**
 * TIPOS DE REPORTES FINANCIEROS (RN-01)
 * Según Caso de Uso: Generar Reporte Financiero [cite: 176]
 */
export type FinancialReportType = 'Estado de Resultados' | 'Balance General' | 'Flujo de Efectivo';

/**
 * FORMATOS DE SALIDA SOPORTADOS [cite: 176]
 */
export type ExportFormat = 'PDF' | 'Excel';

/**
 * ESTADOS DE PAGO A PROVEEDORES [cite: 117]
 */
export type PaymentStatus = 'Pendiente' | 'Pagado' | 'Factura Recibida' | 'Sin Factura';

/**
 * ENTIDAD: REGISTRO FINANCIERO (INGRESOS/EGRESOS)
 * Clasifica si el origen es Cafetería o Eventos [cite: 201]
 */
export interface FinancialTransaction {
  id: string;
  fecha: string;
  concepto: string;
  categoria: 'Ingreso Cafetería' | 'Ingreso Eventos' | 'Gasto Operativo' | 'Costo Inventario' | 'Salario';
  monto: number;
  metodoPago: 'Efectivo' | 'Tarjeta' | 'Transferencia';
  referenciaId?: string; // ID del Pedido o ID del Evento [cite: 18, 101]
}

/**
 * ENTIDAD: PAGO A PROVEEDOR
 * Caso de Uso: Registrar pago a Proveedores 
 */
export interface ProviderPayment {
  id: string;
  proveedorNombre: string;
  monto: number;
  descripcion: string;
  fechaPago: string;
  numeroCuenta: string;
  formatoEntrega: string; // 
  estado: PaymentStatus;
  facturaUrl?: string; // [cite: 117]
}

/**
 * ESTRUCTURA DE REPORTE GENERADO
 * Procesa la información consolidada [cite: 181]
 */
export interface FinancialReport {
  id: string;
  tipo: FinancialReportType;
  periodoInicio: string;
  periodoFin: string;
  fechaGeneracion: string;
  generadoPor: string; // ID del Contador [cite: 199]
  
  // Métricas Consolidadas [cite: 181, 202]
  metricas: {
    ingresosCafeteria: number;
    ingresosEventos: number;
    costosInventario: number;
    gastosOperativos: number;
    utilidadBruta: number;
    utilidadNeta: number;
  };
  
  archivoUrl: string;
}

/**
 * PARÁMETROS PARA GENERACIÓN DE REPORTES (Paso 2 del Flujo Normal) [cite: 176]
 */
export interface ReportSearchParams {
  tipo: FinancialReportType;
  fechaInicio: string;
  fechaFin: string;
  formato: ExportFormat;
}

export type ExpenseCategory = 'Insumos' | 'Servicios' | 'Nómina' | 'Mantenimiento' | 'Impuestos';

export interface ExpenseEntry {
  id: string;
  fecha: string;
  proveedor: string;
  categoria: ExpenseCategory;
  monto: number;
  impuesto: number; // IVA calculado
  total: number;
  folioFiscal?: string; // UUID del CFDI
  estadoFactura: 'Cargada' | 'Pendiente' | 'Rechazada';
  archivoUrl?: string;
}
export type AuditStatus = 'Conciliado' | 'Discrepancia' | 'Pendiente';

export interface SalesAuditEntry {
  id: string;
  fecha: string;
  tipo: 'Corte de Caja' | 'Liquidación Evento';
  responsable: string; // Cajero o Gerente [cite: 35, 139]
  montoEsperado: number;
  montoReal: number;
  diferencia: number;
  estado: AuditStatus;
  observaciones?: string;
}