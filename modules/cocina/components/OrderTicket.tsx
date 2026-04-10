'use client';

import React from 'react';
import { Clock, CheckCircle2, PlayCircle, ChefHat, User } from 'lucide-react';
import { Pedido, OrderStatus } from '../types/chef';


interface OrderTicketProps {
  pedido: Pedido;
  onUpdateStatus: (id: number, nextStatus: OrderStatus) => void;
}

export const OrderTicket = ({ pedido, onUpdateStatus }: OrderTicketProps) => {
  // Configuración de flujo de estados para el Chef
  const statusFlow: Record<OrderStatus, { color: string; label: string; next: OrderStatus | null }> = {
    'PENDIENTE': { color: 'bg-orange-50 border-orange-200 text-orange-700', label: 'Recibir Orden', next: 'PREPARANDO' },
    'PREPARANDO': { color: 'bg-blue-50 border-blue-200 text-blue-700', label: 'Marcar como Listo', next: 'LISTO' },
    'LISTO': { color: 'bg-green-50 border-green-200 text-green-700', label: 'Entregar a Mesero', next: 'ENTREGADO' },
    'ENTREGADO': { color: 'bg-gray-50 border-gray-100 text-gray-400', label: 'Entregado', next: null },
    'CANCELADO': { color: 'bg-red-50 border-red-100 text-red-400', label: 'Cancelado', next: null }
  };

  const config = statusFlow[pedido.estado];

  return (
    <div className={`p-6 rounded-[2.5rem] border-2 transition-all duration-500 shadow-sm flex flex-col h-full ${config.color} ${pedido.estado === 'PENDIENTE' ? 'animate-pulse' : ''}`}>
      
      {/* Header del Ticket */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Mesa {pedido.mesaId}</span>
          <h4 className="font-headline italic text-2xl tracking-tight">#{pedido.id}</h4>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-white/50 px-2 py-1 rounded-full">
            <Clock size={12} />
            {pedido.tiempoTranscurrido} min
          </div>
        { /* {pedido.nombreCliente && (
            <div className="flex items-center gap-1 text-[9px] opacity-60 italic">
              <User size={10} /> {pedido.nombreCliente}
            </div>
          )}*/}
        </div>
      </div>

      {/* Cuerpo: Items de la Comanda */}
      <div className="flex-grow space-y-4 mb-8">
        {pedido.detalles.map((item) => (
          <div key={item.id} className="flex justify-between items-start group">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{item.cantidad}x</span>
                <span className="font-body text-sm font-medium">{item.productoNombre}</span>
                {item.estado === 'LISTO' && <CheckCircle2 size={14} className="text-green-600" />}
              </div>
              {item.notas && (
                <p className="text-[10px] mt-1 text-orange-800/70 italic font-medium bg-orange-100/50 px-2 py-0.5 rounded-lg w-fit">
                  Nota: {item.notas}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Botón de Acción Operativa */}
      {config.next && (
        <button
          onClick={() => onUpdateStatus(pedido.id, config.next!)}
          className={`w-full py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-md ${
            pedido.estado === 'PENDIENTE' 
            ? "bg-[#1a3d2e] text-white hover:bg-[#263329]" 
            : "bg-white text-[#1a3d2e] border border-[#1a3d2e]/20 hover:bg-[#1a3d2e] hover:text-white"
          }`}
        >
          {pedido.estado === 'PENDIENTE' ? <ChefHat size={14} /> : <CheckCircle2 size={14} />}
          {config.label}
        </button>
      )}
    </div>
  );
};