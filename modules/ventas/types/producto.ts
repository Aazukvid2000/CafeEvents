export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number; // Usamos number para facilitar cálculos en UI
  categoria: string;
  disponible: boolean;
  imagenUrl?: string;
}