'use client';
import { useState } from 'react';
import { CorteForm } from '../components/CorteForm';
import { ConfirmModal } from '../components/ConfirmModal';
import { useCorte } from '../hooks/useCorte';
import { ArrowLeft, Wallet } from 'lucide-react';

export const CorteView = ({ onBack, onFinish }: { onBack: () => void, onFinish: () => void }) => {
  const { corte, efectivoReal, setEfectivoReal, validarCorte, ejecutarCierre } = useCorte();
  
  const [modalState, setModalState] = useState<'NONE' | 'CONFIRM' | 'E1_DIFERENCIA' | 'E2_PENDIENTES' | 'E3_FALLA' | 'SUCCESS'>('NONE');

  const handleIntentarCierre = () => {
    const validacion = validarCorte();

    if (validacion.error === 'CUENTAS_PENDIENTES') {
      setModalState('E2_PENDIENTES');
    } else if (validacion.error === 'DIFERENCIA_CRITICA') {
      setModalState('E1_DIFERENCIA');
    } else {
      setModalState('CONFIRM');
    }
  };

  const finalizarTodo = () => {
    try {
      ejecutarCierre();
      setModalState('SUCCESS');
    } catch (e) {
      setModalState('E3_FALLA'); 
    }
  };

  return (
    <div className="w-full bg-[#fcf9f4] font-body text-[#1a3d2e] p-4 lg:p-6 animate-in fade-in duration-700">
      
      {/* HEADER DE CIERRE - Reducido margen inferior y padding */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-1.5 bg-[#1a3d2e] rounded-lg text-white">
              <Wallet size={18} />
            </div>
            <span className="label-caps text-[#C5A059] text-[10px]">Auditoría de Turno</span>
          </div>
          <h1 className="serif-display text-4xl lg:text-5xl">Corte de Caja</h1>
          <p className="text-[#434843]/60 text-[11px] font-medium uppercase tracking-widest">
            ID de Sesión: #POS-2026-0042
          </p>
        </div>

        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-[9px] font-black text-[#1a3d2e] border border-[#1a3d2e]/20 px-4 py-2 rounded-full uppercase tracking-widest hover:bg-[#1a3d2e] hover:text-white transition-all duration-300"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          Cancelar y Volver
        </button>
      </div>

      {/* CONTENIDO PRINCIPAL - Max width extendido y padding ajustado */}
      <div className="max-w-5xl mx-auto bg-white rounded-[2rem] border border-[#1a3d2e]/5 shadow-sm p-6 lg:p-8">
        <CorteForm 
          corte={corte} 
          efectivoReal={efectivoReal} 
          onChangeEfectivo={setEfectivoReal} 
          onConfirm={handleIntentarCierre} 
        />
      </div>

      <div className="max-w-5xl mx-auto mt-6 text-center">
        <p className="label-caps opacity-30 text-[8px] tracking-[0.3em]">
          Asegúrese de contar el efectivo físico dos veces antes de confirmar el arqueo
        </p>
      </div>

      {/* --- MODALES --- */}

      <ConfirmModal 
        isOpen={modalState === 'E1_DIFERENCIA'}
        title="Diferencia Crítica"
        message={`Se detectó un descuadre de ($${Math.abs(efectivoReal - corte.ventasEfectivo).toFixed(2)}). Se requiere autorización.`}
        confirmText="Solicitar Autorización"
        onConfirm={() => setModalState('CONFIRM')} 
        onCancel={() => setModalState('NONE')}
      />

      <ConfirmModal 
        isOpen={modalState === 'E2_PENDIENTES'}
        title="Cierre Bloqueado"
        message="Existen mesas activas. Cierre todas las cuentas primero."
        confirmText="Regresar a Mesas"
        onConfirm={onBack}
      />

      <ConfirmModal 
        isOpen={modalState === 'E3_FALLA'}
        title="Falla de Conexión"
        message="Error al sincronizar con el servidor. Verifique su red."
        confirmText="Reintentar"
        onConfirm={finalizarTodo}
        onCancel={() => setModalState('NONE')}
      />

      <ConfirmModal 
        isOpen={modalState === 'SUCCESS'}
        title="Corte Guardado"
        message="Turno finalizado con éxito. Generando ticket de arqueo..."
        confirmText="Finalizar Operación"
        onConfirm={onFinish}
      />

      <ConfirmModal 
        isOpen={modalState === 'CONFIRM'}
        title="Confirmar Arqueo"
        message="¿Los datos son correctos? Esta acción cerrará la terminal definitivamente."
        confirmText="Confirmar Cierre"
        onConfirm={finalizarTodo}
        onCancel={() => setModalState('NONE')}
      />
    </div>
  );
};