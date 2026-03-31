// src/modules/ventas/views/CorteView.tsx
import { useState } from 'react';
import { CorteForm } from '../components/CorteForm';
import { ConfirmModal } from '../components/ConfirmModal';
import { useCorte } from '../hooks/useCorte';

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
    <div className="min-h-screen bg-gray-400 p-12 font-sans text-gray-900">
      
      {/* BOTÓN DE RETORNO AL PANEL (Agregado) */}
      <div className="max-w-2xl mx-auto mb-6">
        <button 
          onClick={onBack}
          className="bg-gray-100 border-4 border-gray-900 px-6 py-2 font-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-200 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
        >
          ← CANCELAR Y VOLVER AL PANEL
        </button>
      </div>

      <CorteForm 
        corte={corte} 
        efectivoReal={efectivoReal} 
        onChangeEfectivo={setEfectivoReal} 
        onConfirm={handleIntentarCierre} 
      />

      {/* --- MODALES DE EXCEPCIONES --- */}

      <ConfirmModal 
        isOpen={modalState === 'E1_DIFERENCIA'}
        title="⚠️ Diferencia Crítica"
        message={`Se detectó un descuadre mayor al permitido ($${(efectivoReal - corte.ventasEfectivo).toFixed(2)}). El supervisor debe autorizar con su clave.`}
        type="danger"
        confirmText="Solicitar Autorización"
        onConfirm={() => setModalState('CONFIRM')} 
        onCancel={() => setModalState('NONE')}
      />

      <ConfirmModal 
        isOpen={modalState === 'E2_PENDIENTES'}
        title="🚫 Cierre Bloqueado"
        message="No se puede realizar el corte porque aún hay mesas con consumos activos o sin liquidar. Cierre todas las cuentas primero."
        type="danger"
        confirmText="Ir a Mesas"
        onConfirm={onBack}
      />

      <ConfirmModal 
        isOpen={modalState === 'E3_FALLA'}
        title="❌ Error de Red"
        message="No se pudo comunicar con el servidor para guardar el folio de corte. Verifique su conexión y reintente."
        type="danger"
        confirmText="Reintentar"
        onConfirm={finalizarTodo}
        onCancel={() => setModalState('NONE')}
      />

      <ConfirmModal 
        isOpen={modalState === 'SUCCESS'}
        title="Turno Finalizado"
        message="Corte guardado correctamente. Imprimiendo ticket de arqueo..."
        onConfirm={onFinish}
      />

      <ConfirmModal 
        isOpen={modalState === 'CONFIRM'}
        title="Confirmar Cierre"
        message="¿Desea finalizar el turno con el conteo actual?"
        onConfirm={finalizarTodo}
        onCancel={() => setModalState('NONE')}
      />
    </div>
  );
};