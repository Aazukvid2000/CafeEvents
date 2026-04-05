export type ProposalStatus = 'PENDIENTE' | 'AUTORIZADO' | 'AUTORIZADO_MOD' | 'RECHAZADO';

export interface ProposalDetail {
  insumo: string;
  cantidad: number;
  costoUnitario: number;
  subtotal: number;
}

export interface Proposal {
  id: string;
  tipo: 'PRODUCTO' | 'MENU_EVENTO';
  nombre: string;
  chef: string;
  costoProduccion: number;
  precioSugerido: number;
  margenSugerido: number;
  detalles: ProposalDetail[];
  estado: ProposalStatus;
  fechaEnvio: string;
  limiteCapacidad?: number; // Para excepción E3
}