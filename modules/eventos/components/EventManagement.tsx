'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, Calendar, Clock, User, 
  CheckCircle2, XCircle, AlertCircle, 
  Receipt, ChefHat, Send, Loader2, Wallet, AlertTriangle
} from 'lucide-react';
import { Reservacion } from '../types/gerente';

interface EventManagementProps {
  reservation: Reservacion;
  onBack: () => void;
  onUpdateStatus: (id: string, newStatus: Reservacion['estado']) => void;
}

type ManagementModal = 'NONE' | 'CONFIRM_PAYMENT' | 'SUCCESS_PAYMENT' | 'CONFIRM_CANCEL' | 'SUCCESS_CANCEL';

export const EventManagement = ({ reservation, onBack, onUpdateStatus }: EventManagementProps) => {
  const [modal, setModal] = useState<ManagementModal>('NONE');
  const [isProcessing, setIsProcessing] = useState(false);

  // Lógica de Liquidación
  const handleFinalPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onUpdateStatus(reservation.id, 'PAGADA_TOTAL');
      setIsProcessing(false);
      setModal('SUCCESS_PAYMENT');
    }, 1500);
  };

  // Lógica de Cancelación
  const handleCancelAction = () => {
    onUpdateStatus(reservation.id, 'CANCELADA');
    setModal('SUCCESS_CANCEL');
  };

  return (
    <div className="relative min-h-screen pb-20">
      <div className="space-y-10 animate-in fade-in duration-700">
        <header className="flex items-center gap-6">
          <button onClick={onBack} className="p-4 bg-white border border-[#1a3d2e]/10 rounded-full text-[#1a3d2e] hover:bg-[#1a3d2e] hover:text-white transition-all shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <span className="label-caps text-[#C5A059] mb-1 block uppercase tracking-widest text-[10px] font-black">Control de Ejecución</span>
            <h1 className="serif-display text-5xl text-[#1a3d2e]">Gestionar Evento</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* INFO DEL EVENTO */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white p-10 rounded-[3rem] border border-[#1a3d2e]/5 shadow-sm space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="font-headline text-4xl italic text-[#1a3d2e]">{reservation.cliente.nombre}</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#434843]/40">ID: {reservation.id}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  reservation.estado === 'PAGADA_TOTAL' ? 'bg-[#d3e8d5] text-[#1a3d2e]' : 'bg-[#f6f3ee] text-[#C5A059]'
                }`}>
                  {reservation.estado === 'PAGADA_TOTAL' ? '✓ Totalmente Pagado' : 'Pendiente de Saldo'}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-[#1a3d2e]/5">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-[#C5A059]" />
                  <span className="text-sm font-bold text-[#1a3d2e]">{reservation.fechaEvento}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#C5A059]" />
                  <span className="text-sm font-bold text-[#1a3d2e]">{reservation.horaEvento}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User size={18} className="text-[#C5A059]" />
                  <span className="text-sm font-bold text-[#1a3d2e]">{reservation.pax} Personas</span>
                </div>
              </div>
            </section>

            <section className="bg-[#fcf9f4] p-8 rounded-[2.5rem] border border-[#1a3d2e]/10 flex items-start gap-4">
              <AlertCircle className="text-[#1a3d2e]/40 shrink-0" size={24} />
              <div className="space-y-1">
                <p className="font-bold text-[#1a3d2e] text-sm uppercase">Flujo de Saldo (50%)</p>
                <p className="text-xs text-[#434843]/70 italic leading-relaxed">
                  Al registrar el saldo, el sistema marca el evento como <strong>Listo para Ejecución</strong>, enviando las órdenes de servicio finales a cocina y personal.
                </p>
              </div>
            </section>
          </div>

          {/* PANEL DE PAGO */}
          <aside className="bg-[#1a3d2e] text-white p-10 rounded-[3rem] shadow-2xl space-y-10 sticky top-24">
            <div className="space-y-6">
              <div className="pb-6 border-b border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">Saldo Pendiente</p>
                <p className="font-headline text-5xl italic text-[#C5A059]">${reservation.saldoPendiente.toLocaleString()}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[11px] uppercase tracking-widest opacity-50">
                  <span>Costo Total</span>
                  <span>${reservation.costoTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-widest opacity-50">
                  <span>Anticipo Pagado</span>
                  <span>${reservation.anticipoPagado.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <button 
                onClick={() => setModal('CONFIRM_PAYMENT')}
                disabled={reservation.estado === 'PAGADA_TOTAL' || reservation.estado === 'CANCELADA'}
                className="w-full py-5 bg-[#C5A059] text-[#1a3d2e] rounded-full font-label text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-[#d4b57a] transition-all flex items-center justify-center gap-3 disabled:opacity-20 grayscale-0 disabled:grayscale"
              >
                <Receipt size={18} /> Registrar Liquidación
              </button>
              
              <button 
                onClick={() => setModal('CONFIRM_CANCEL')}
                disabled={reservation.estado === 'PAGADA_TOTAL' || reservation.estado === 'CANCELADA'}
                className="w-full py-4 text-[#ffdad6]/40 font-black text-[9px] uppercase tracking-widest hover:text-[#ffdad6] transition-colors flex items-center justify-center gap-2"
              >
                <XCircle size={14} /> Cancelar por Falta de Pago
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* --- SISTEMA DE MODALES DE ESTADO --- */}
      {modal !== 'NONE' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#1c1c19]/80 backdrop-blur-sm animate-in fade-in" onClick={() => !isProcessing && setModal('NONE')} />
          
          {/* Modal Content */}
          <div className="relative bg-[#fcf9f4] rounded-[3rem] p-10 max-w-sm w-full text-center shadow-2xl border border-[#1a3d2e]/10 animate-in zoom-in-95 duration-300">
            
            {/* 1. Confirmar Pago */}
            {modal === 'CONFIRM_PAYMENT' && (
              <>
                <div className="w-20 h-20 bg-[#1a3d2e]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1a3d2e]">
                  <Wallet size={40} />
                </div>
                <h4 className="font-headline text-3xl italic text-[#1a3d2e] mb-2">¿Confirmar Pago?</h4>
                <p className="text-xs text-[#434843]/70 mb-8 italic">Se registrará la liquidación total de <strong>${reservation.saldoPendiente.toLocaleString()}</strong>.</p>
                <div className="space-y-3">
                  <button onClick={handleFinalPayment} disabled={isProcessing} className="w-full py-4 bg-[#1a3d2e] text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    {isProcessing ? <Loader2 className="animate-spin" size={16} /> : 'Sí, Liquidar Cuenta'}
                  </button>
                  <button onClick={() => setModal('NONE')} className="text-[10px] font-black uppercase opacity-40">Ahora no</button>
                </div>
              </>
            )}

            {/* 2. Éxito Pago */}
            {modal === 'SUCCESS_PAYMENT' && (
              <>
                <div className="w-20 h-20 bg-[#d3e8d5] rounded-full flex items-center justify-center mx-auto mb-6 text-[#1a3d2e]">
                  <CheckCircle2 size={40} />
                </div>
                <h4 className="font-headline text-3xl italic text-[#1a3d2e] mb-2">¡Pago Exitoso!</h4>
                <p className="text-xs text-[#434843]/70 mb-8 italic">La cuenta está liquidada. Se han generado las <strong>órdenes de cocina</strong> y asignación de personal.</p>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#1a3d2e]/5 text-left">
                        <ChefHat size={16} className="text-[#C5A059]" />
                        <span className="text-[9px] font-black uppercase tracking-tighter opacity-60">Notificación enviada a cocina</span>
                    </div>
                    <button onClick={onBack} className="w-full py-4 bg-[#1a3d2e] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Regresar a Agenda</button>
                </div>
              </>
            )}

            {/* 3. Confirmar Cancelación */}
            {modal === 'CONFIRM_CANCEL' && (
              <>
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                  <AlertTriangle size={40} />
                </div>
                <h4 className="font-headline text-3xl italic text-[#ba1a1a] mb-2">¿Cancelar Evento?</h4>
                <p className="text-xs text-[#434843]/70 mb-8 italic">Esta acción liberará la fecha y el <strong>anticipo del 50%</strong> quedará retenido por incumplimiento de contrato.</p>
                <div className="space-y-3">
                  <button onClick={handleCancelAction} className="w-full py-4 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Confirmar Cancelación</button>
                  <button onClick={() => setModal('NONE')} className="text-[10px] font-black uppercase opacity-40">Volver</button>
                </div>
              </>
            )}

            {/* 4. Éxito Cancelación */}
            {modal === 'SUCCESS_CANCEL' && (
              <>
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                  <XCircle size={40} />
                </div>
                <h4 className="font-headline text-3xl italic text-[#1a3d2e] mb-2">Evento Cancelado</h4>
                <p className="text-xs text-[#434843]/70 mb-8 italic">La fecha ha sido liberada en el calendario y se notificó al cliente vía correo.</p>
                <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#1a3d2e]/5 text-left mb-6">
                        <Send size={16} className="text-[#1a3d2e]/40" />
                        <span className="text-[9px] font-black uppercase tracking-tighter opacity-60">Correo de cancelación enviado</span>
                </div>
                <button onClick={onBack} className="w-full py-4 bg-[#1a3d2e] text-white rounded-full text-[10px] font-black uppercase tracking-widest">Finalizar Gestión</button>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
};