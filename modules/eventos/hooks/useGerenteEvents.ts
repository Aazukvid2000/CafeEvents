'use client';
import { useState, useMemo } from 'react';
import { MOCK_RESERVACIONES } from '../mocks/gerente.mock';
import { Reservacion, VenueType, ReservationStatus } from '../types/gerente';

export const useGerenteEvents = () => {
  const [reservations, setReservations] = useState<Reservacion[]>(MOCK_RESERVACIONES);
  const [isProcessing, setIsProcessing] = useState(false);

  // RN-01: Validación de 15 días de antelación 
  const validateLeadTime = (date: string) => {
    const eventDate = new Date(date);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 15);
    return eventDate >= minDate;
  };

  // RN: Validación de capacidad por salón 
  const validatePaxCapacity = (pax: number, venue: VenueType) => {
    if (venue === 'CAFETERIA') return pax >= 20 && pax <= 50;
    if (venue === 'SALON_EVENTOS') return pax >= 100 && pax <= 250;
    return false;
  };

  // Flujo Normal 7: Cálculo de anticipo obligatorio (50%) 
  const calculateAnticipo = (total: number) => {
    return total * 0.5;
  };

  const createReservation = async (data: Partial<Reservacion>) => {
    setIsProcessing(true);
    
    // Validación de Precondición 3 y Regla 1 
    if (data.fechaEvento && !validateLeadTime(data.fechaEvento)) {
      alert("Error: La reservación debe concretarse con un mínimo de 15 días de antelación.");
      setIsProcessing(false);
      return false;
    }

    // Validación de Capacidad (Paso 4) 
    if (data.pax && data.salon && !validatePaxCapacity(data.pax, data.salon as VenueType)) {
      alert("Error: El número de personas no coincide con la capacidad del salón seleccionado.");
      setIsProcessing(false);
      return false;
    }

    // Registro de la reservación (Paso 8) 
    console.log("Registrando reservación y enviando confirmación PDF al cliente.");
    setIsProcessing(false);
    return true;
  };

  const updateReservationStatus = (id: string, newStatus: ReservationStatus) => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, estado: newStatus } : res
    ));
  };

  return { 
    reservations, 
    isProcessing, 
    createReservation, 
    calculateAnticipo, 
    updateReservationStatus 
  };
};