'use client';
import { useState } from 'react';
import { CUENTA_ACTIVA_MOCK } from '../mocks/cuenta.mock';
import { AccountSummary } from '../components/AccountSummary';
import { PaymentMethods } from '../components/PaymentMethods';
import { CFDIDialog } from '../components/CFDIDialog';
import { ConfirmModal } from '../components/ConfirmModal';
import { usePago } from '../hooks/usePago';
import { DatosFiscales } from '../types/pago';
import { ArrowLeft, FileText, CheckCircle2, AlertCircle, Banknote, ListChecks } from 'lucide-react';

interface Props {
  onBack: () => void;
  onFinish: () => void;
}

export const PagoView = ({ onBack, onFinish }: Props) => {
  const { cuenta, aplicarDescuentoLealtad, registrarPago, procesarFacturacion, finalizarCierre } = usePago(CUENTA_ACTIVA_MOCK);

  const [isCFDIOpen, setIsCFDIOpen] = useState(false);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState<'EFECTIVO' | 'TARJETA' | undefined>();
  const [montoAAbonar, setMontoAAbonar] = useState<string>(cuenta.saldoPendiente.toString());
  const [modalType, setModalType] = useState<'NONE' | 'SUCCESS_PAGO' | 'SUCCESS_CIERRE' | 'SUCCESS_FACTURA' | 'ERROR_MONTO'>('NONE');
  
  // ESTADO PARA SELECCIÓN DE ITEMS (Usamos el ID del producto o un índice)
  const [itemsSeleccionados, setItemsSeleccionados] = useState<number[]>([]);

  // Función para seleccionar/deseleccionar items y calcular monto automáticamente
  const toggleItem = (productoId: number, subtotal: number) => {
    let nuevosSeleccionados;
    if (itemsSeleccionados.includes(productoId)) {
      nuevosSeleccionados = itemsSeleccionados.filter(id => id !== productoId);
    } else {
      nuevosSeleccionados = [...itemsSeleccionados, productoId];
    }
    setItemsSeleccionados(nuevosSeleccionados);

    // Si hay selección, sumamos subtotales; si no, volvemos al saldo pendiente
    if (nuevosSeleccionados.length > 0) {
      const suma = cuenta.pedido?.detalles
        .filter(d => nuevosSeleccionados.includes(d.productoId))
        .reduce((acc, curr) => acc + curr.subtotal, 0);
      setMontoAAbonar(suma?.toFixed(2) || "0.00");
    } else {
      setMontoAAbonar(cuenta.saldoPendiente.toString());
    }
  };

  const handleSelectMethod = (metodo: 'EFECTIVO' | 'TARJETA') => {
    setMetodoSeleccionado(metodo);
  };

  const handleProcessPayment = () => {
    const monto = parseFloat(montoAAbonar);
    if (isNaN(monto) || monto <= 0 || monto > cuenta.saldoPendiente) {
      setModalType('ERROR_MONTO');
      return;
    }

    if (metodoSeleccionado) {
      registrarPago(metodoSeleccionado, monto);
      setModalType('SUCCESS_PAGO');
      setMetodoSeleccionado(undefined);
      setItemsSeleccionados([]);
      setMontoAAbonar("0"); 
    }
  };

  const handleFinishAction = () => {
    if (cuenta.saldoPendiente === 0) {
      finalizarCierre();
      setModalType('SUCCESS_CIERRE');
    }
  };

  const handleConfirmFactura = (data: DatosFiscales) => {
    procesarFacturacion(data);
    setIsCFDIOpen(false);
    setModalType('SUCCESS_FACTURA');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#fcf9f4] font-body animate-in fade-in duration-700">
      
      {/* COLUMNA IZQUIERDA: RESUMEN Y SELECCIÓN DE ITEMS */}
      <div className="w-full lg:w-1/2 bg-white border-r border-[#334537]/10 p-6 lg:p-10 flex flex-col overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="font-headline text-4xl text-[#1a3d2e] italic tracking-tight">Liquidación</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#434843]/40 mt-1">Mesa 02 — Folio #{cuenta.id}</p>
          </div>
          <button onClick={onBack} className="text-[10px] font-black text-[#1a3d2e] border border-[#1a3d2e]/20 px-5 py-2.5 rounded-full uppercase hover:bg-[#1a3d2e] hover:text-white transition-all">
            <ArrowLeft size={14} className="inline mr-1" /> Volver
          </button>
        </header>

        <div className="space-y-6">
          <AccountSummary cuenta={cuenta} />

          {/* LISTA DE ITEMS PARA SELECCIÓN (REQUERIMIENTO S1) */}
          {cuenta.saldoPendiente > 0 && (
            <div className="mt-6 animate-in slide-in-from-left duration-500">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-[#1a3d2e]/60 mb-4 flex items-center gap-2">
                <ListChecks size={16} /> Seleccionar platillos para abonar
              </h3>
              <div className="space-y-2">
                {cuenta.pedido?.detalles.map((item) => (
                  <button
                    key={item.productoId}
                    onClick={() => toggleItem(item.productoId, item.subtotal)}
                    className={`w-full flex justify-between items-center p-4 rounded-2xl border-2 transition-all duration-300
                      ${itemsSeleccionados.includes(item.productoId) 
                        ? 'border-[#1a3d2e] bg-[#1a3d2e]/5' 
                        : 'border-transparent bg-[#f6f3ee] hover:bg-[#f0ede6]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors
                        ${itemsSeleccionados.includes(item.productoId) ? 'bg-[#1a3d2e] border-[#1a3d2e]' : 'border-gray-300'}`}>
                        {itemsSeleccionados.includes(item.productoId) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <span className="font-bold text-sm text-[#1a3d2e] uppercase">
                        {item.cantidad}x {item.producto?.nombre ?? 'Cargando...'}
                      </span>
                    </div>
                    <span className="font-headline text-lg text-[#1a3d2e]">${item.subtotal.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* COLUMNA DERECHA: COBRO */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 lg:p-12 justify-between bg-[#fcf9f4]">
        <div className="space-y-8">
          <PaymentMethods 
            onSelectMethod={handleSelectMethod} 
            onApplyLoyalty={aplicarDescuentoLealtad} 
            hasLoyaltyApplied={cuenta.descuento > 0}
            selectedMethod={metodoSeleccionado}
          />

          {metodoSeleccionado && (
            <div className="bg-white p-8 rounded-[2rem] border-2 border-[#1a3d2e] shadow-2xl animate-in zoom-in-95">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h4 className="font-headline text-xl text-[#1a3d2e]">Monto del Abono</h4>
                  <p className="text-[10px] font-bold text-[#434843]/40 uppercase tracking-widest">Ajuste manual o basado en selección</p>
                </div>
                <Banknote className="text-[#1a3d2e]/20" size={32} />
              </div>
              
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-headline text-3xl text-[#1a3d2e]/30">$</span>
                <input 
                  type="number"
                  value={montoAAbonar}
                  onChange={(e) => setMontoAAbonar(e.target.value)}
                  className="w-full bg-[#f6f3ee] border-none rounded-2xl py-6 pl-12 pr-6 font-headline text-4xl text-[#1a3d2e] focus:ring-2 focus:ring-[#1a3d2e]/10 outline-none"
                />
              </div>

              <button 
                onClick={handleProcessPayment}
                className="w-full mt-6 bg-[#1a3d2e] text-white py-5 rounded-xl font-label text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#263329] transition-all"
              >
                Confirmar Pago ({metodoSeleccionado})
              </button>
            </div>
          )}
          
          <button onClick={() => setIsCFDIOpen(true)} className="w-full py-5 bg-white border border-[#1a3d2e]/10 rounded-[2rem] font-label text-[11px] font-bold text-[#1a3d2e] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:shadow-xl transition-all">
            <FileText size={18} className="opacity-40" /> Emitir Factura CFDI
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a3d2e]/5">
          <div className="flex justify-between items-center mb-6">
             <span className="text-[10px] font-black uppercase tracking-widest text-[#1a3d2e]/40">Saldo Restante en Caja</span>
             <span className="font-headline text-3xl text-[#1a3d2e]">${cuenta.saldoPendiente.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleFinishAction}
            disabled={cuenta.saldoPendiente > 0}
            className={`w-full py-6 rounded-full font-label text-sm font-bold uppercase tracking-[0.3em] shadow-2xl transition-all
              ${cuenta.saldoPendiente > 0 ? 'bg-[#ebe8e3] text-[#434843]/30 cursor-not-allowed' : 'bg-[#1a3d2e] text-white'}`}
          >
            {cuenta.saldoPendiente > 0 ? "Liquidación Pendiente" : "Finalizar y Liberar Mesa"}
          </button>
        </div>
      </div>

      <CFDIDialog isOpen={isCFDIOpen} onClose={() => setIsCFDIOpen(false)} onConfirm={handleConfirmFactura} />
      
      <ConfirmModal isOpen={modalType === 'SUCCESS_PAGO'} title="Pago Registrado" message="Abono procesado exitosamente." confirmText="Aceptar" onConfirm={() => setModalType('NONE')} />
      <ConfirmModal isOpen={modalType === 'ERROR_MONTO'} title="Error" message="El monto excede el saldo o es inválido." confirmText="Corregir" onConfirm={() => setModalType('NONE')} />
      <ConfirmModal isOpen={modalType === 'SUCCESS_CIERRE'} title="Operación Exitosa" message="Mesa disponible." confirmText="Ok" onConfirm={onFinish} />
    </div>
  );
};