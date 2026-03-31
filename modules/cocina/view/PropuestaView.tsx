// src/modules/cocina/views/PropuestaView.tsx
import { useState } from 'react';
import { RecetaForm } from '../components/RecetaForm';
import { ConfirmModal } from '../../ventas/components/ConfirmModal';
import { usePropuesta } from '../hooks/usePropuesta';

export const PropuestaView = ({ onBack }: { onBack: () => void }) => {
  const { propuesta, updatePropuesta, addIngrediente, removeIngrediente, enviarPropuesta } = usePropuesta();
  const [modalType, setModalType] = useState<'NONE' | 'CONFIRM' | 'SUCCESS' | 'ERROR'>('NONE');

  const handleEnviar = () => {
    try {
      enviarPropuesta();
      setModalType('SUCCESS');
    } catch (e) {
      setModalType('ERROR');
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <button onClick={onBack} className="bg-white border-4 border-gray-900 px-4 py-2 font-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          ← Regresar al Tablero
        </button>

        <RecetaForm 
          propuesta={propuesta}
          onUpdate={updatePropuesta}
          onAddIngrediente={addIngrediente}
          onRemoveIngrediente={removeIngrediente}
        />

        <button 
          onClick={() => setModalType('CONFIRM')}
          className="w-full bg-gray-900 text-white py-6 font-black text-xl uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-white"
        >
          Enviar Propuesta al Administrador
        </button>
      </div>

      <ConfirmModal 
        isOpen={modalType === 'CONFIRM'}
        title="¿Confirmar Propuesta?"
        message="Se enviará la receta y el costo sugerido para aprobación del administrador."
        onConfirm={handleEnviar}
        onCancel={() => setModalType('NONE')}
      />

      <ConfirmModal 
        isOpen={modalType === 'SUCCESS'}
        title="Propuesta Enviada"
        message="La propuesta ha sido registrada. Podrá ver el estado en su tablero de cocina."
        confirmText="Aceptar"
        onConfirm={onBack}
      />

      <ConfirmModal 
        isOpen={modalType === 'ERROR'}
        title="Faltan Datos"
        message="La receta debe tener al menos un ingrediente para ser válida."
        type="danger"
        onConfirm={() => setModalType('NONE')}
      />
    </div>
  );
};