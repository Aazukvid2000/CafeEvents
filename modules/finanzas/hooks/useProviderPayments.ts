'use client';
import { useState } from 'react';
import { MOCK_PAGOS_PROVEEDORES } from '../mocks/contador.mock';
import { ProviderPayment, PaymentStatus } from '../types/contador';

export const useProviderPayments = () => {
  const [payments, setPayments] = useState<ProviderPayment[]>(MOCK_PAGOS_PROVEEDORES);
  const [filter, setFilter] = useState<PaymentStatus | 'Todos'>('Todos');

  const filteredPayments = payments.filter(p => 
    filter === 'Todos' ? true : p.estado === filter
  );

  const updatePaymentStatus = (id: string, newStatus: PaymentStatus) => {
    setPayments(prev => prev.map(p => 
      p.id === id ? { ...p, estado: newStatus } : p
    ));
  };

  return { filteredPayments, filter, setFilter, updatePaymentStatus };
};