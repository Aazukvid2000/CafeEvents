// src/modules/ventas/types/mesa.ts

export interface Mesa {
  id: number;           // idMesa en UML
  numero: number;       // Identificador visual para el mesero 
  capacidad: number;    // capacidad en UML
  disponible: boolean;  // Derivado del 'estado' en UML
}