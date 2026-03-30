// src/modules/ventas/views/PagoView.tsx
import { useState } from 'react';
import { CUENTA_ACTIVA_MOCK } from '../mocks/cuenta.mock';
import { AccountSummary } from '../components/AccountSummary';
import { PaymentMethods } from '../components/PaymentMethods';
import { CFDIDialog } from '../components/CFDIDialog';
import { ConfirmModal } from '../components/ConfirmModal';
import { usePago } from '../hooks/usePago';
import { DatosFiscales } from '../types/pago';

interface Props {
  onBack: () => void;
  onFinish: () => void;
}

export const PagoView = ({ onBack, onFinish }: Props) => {
  const { cuenta, aplicarDescuentoLealtad, registrarPago, procesarFacturacion, finalizarCierre } = usePago(CUENTA_ACTIVA_MOCK);

  const [isCFDIOpen, setIsCFDIOpen] = useState(false);
  const [modalType, setModalType] = useState<'NONE' | 'SUCCESS_PAGO' | 'SUCCESS_CIERRE' | 'SUCCESS_FACTURA'>('NONE');

  const handlePayment = (metodo: 'EFECTIVO' | 'TARJETA') => {
    registrarPago(metodo, cuenta.saldoPendiente);
    setModalType('SUCCESS_PAGO');
  };

  const handleFinish = () => {
    finalizarCierre();
    setModalType('SUCCESS_CIERRE');
  };

  const handleConfirmFactura = (data: DatosFiscales) => {
    procesarFacturacion(data);
    setIsCFDIOpen(false);
    setModalType('SUCCESS_FACTURA');
  };

  return (
    <div className="flex h-screen bg-gray-300 overflow-hidden font-sans border-4 border-black text-black">
      <div className="w-1/2 flex flex-col border-r-4 border-black bg-white p-6">
        <header className="mb-6 flex justify-between items-center border-b-4 border-black pb-4">
          <h1 className="text-2xl font-black uppercase italic leading-none text-gray-900">Liquidación</h1>
          <button onClick={onBack} className="text-[10px] font-black border-2 border-black px-4 py-2 uppercase hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            ← Volver
          </button>
        </header>

        <AccountSummary cuenta={cuenta} />

        <div className={`mt-6 p-4 border-4 border-black ${cuenta.saldoPendiente === 0 ? 'bg-green-100' : 'bg-yellow-50'}`}>
          <p className="text-[10px] font-black uppercase mb-1">Estatus del Saldo:</p>
          <p className="text-2xl font-mono font-black italic">
            {cuenta.saldoPendiente === 0 ? "✓ PAGADA" : `$${cuenta.saldoPendiente.toFixed(2)}`}
          </p>
        </div>
      </div>

      <div className="w-1/2 flex flex-col bg-gray-100 p-8 justify-between">
        <div className="space-y-6">
          <PaymentMethods 
            onSelectMethod={handlePayment} 
            onApplyLoyalty={aplicarDescuentoLealtad} 
            hasLoyaltyApplied={cuenta.descuento > 0} 
          />
          <button 
            onClick={() => setIsCFDIOpen(true)}
            className="w-full py-4 border-4 border-black bg-white font-black uppercase text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:shadow-none transition-all"
          >
            Emitir Factura CFDI (S3)
          </button>
        </div>

        <button 
          onClick={handleFinish}
          disabled={cuenta.saldoPendiente > 0}
          className={`w-full py-6 font-black text-2xl uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            ${cuenta.saldoPendiente > 0 ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed shadow-none' : 'bg-black text-white hover:bg-gray-800'}`}
        >
          {cuenta.saldoPendiente > 0 ? "Saldo Pendiente" : "Cerrar Mesa (Paso 10)"}
        </button>
      </div>

      <CFDIDialog isOpen={isCFDIOpen} onClose={() => setIsCFDIOpen(false)} onConfirm={handleConfirmFactura} />

      {/* MODALES PERSONALIZADOS */}
      <ConfirmModal 
        isOpen={modalType === 'SUCCESS_PAGO'} 
        title="Pago Exitoso" 
        message="Se ha registrado el pago correctamente. El saldo ha sido actualizado."
        onConfirm={() => setModalType('NONE')} 
        onCancel={() => setModalType('NONE')} 
      />

      <ConfirmModal 
        isOpen={modalType === 'SUCCESS_FACTURA'} 
        title="Factura Generada" 
        message="El CFDI ha sido timbrado y enviado al correo del cliente exitosamente."
        onConfirm={() => setModalType('NONE')} 
      />

      <ConfirmModal 
        isOpen={modalType === 'SUCCESS_CIERRE'} 
        title="Mesa Liberada" 
        message="La cuenta se ha cerrado y la mesa está lista para el siguiente cliente."
        onConfirm={onFinish} 
        onCancel={onFinish} 
      />
    </div>
  );
};