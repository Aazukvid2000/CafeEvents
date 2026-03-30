// src/modules/ventas/components/ConfirmModal.tsx
interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void; // Ahora es opcional
  confirmText?: string;
  type?: 'danger' | 'success' | 'info';
}

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirmar", type = 'info' }: Props) => {
  if (!isOpen) return null;

  const buttonStyle = type === 'danger' ? 'bg-red-600 text-white' : 'bg-gray-900 text-white';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white border-4 border-gray-900 p-6 max-w-sm w-full shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-xl font-black uppercase italic mb-2 border-b-2 border-gray-800 pb-1">{title}</h2>
        <p className="text-xs font-bold text-gray-600 mb-6 uppercase tracking-tight">{message}</p>
        <div className="flex gap-3">
          {/* Solo mostramos cancelar si se pasó la función onCancel */}
          {onCancel && (
            <button onClick={onCancel} className="flex-1 py-3 border-2 border-gray-800 font-black text-[10px] uppercase hover:bg-gray-100">
              Cancelar
            </button>
          )}
          <button onClick={onConfirm} className={`flex-1 py-3 font-black text-[10px] uppercase ${buttonStyle} hover:opacity-90`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};