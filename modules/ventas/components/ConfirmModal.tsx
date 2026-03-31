// src/modules/ventas/components/ConfirmModal.tsx
interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  type?: 'danger' | 'success' | 'info';
}

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirmar", type = 'info' }: Props) => {
  if (!isOpen) return null;

  // Definición de colores basados en Olive & Alabaster
  const isDanger = type === 'danger';
  const primaryColor = isDanger ? 'bg-[#912C2C]' : 'bg-[#4A5D4E]'; // Verde Oliva (Primary) o Rojo apagado
  const accentColor = 'bg-[#C5A059]'; // Dorado/Terciario

  return (
    <div className="fixed inset-0 bg-[#2C2C2C]/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 transition-all duration-300">
      <div className="bg-[#F5F2ED] rounded-[40px] p-10 max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 animate-in fade-in zoom-in duration-300">
        
        {/* Icono superior sutil (estilo Label en la imagen) */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto ${isDanger ? 'bg-[#912C2C]/10 text-[#912C2C]' : 'bg-[#4A5D4E]/10 text-[#4A5D4E]'}`}>
          <span className="text-xl italic font-serif">i</span>
        </div>

        {/* Título con fuente Serif para elegancia (Headline en imagen) */}
        <h2 className="text-3xl font-serif text-[#2C2C2C] text-center mb-3 leading-tight tracking-tight">
          {title}
        </h2>
        
        {/* Mensaje con fuente Sans (Body en imagen) */}
        <p className="text-[#2C2C2C]/70 text-center text-sm font-medium leading-relaxed mb-10 px-2">
          {message}
        </p>

        {/* Acciones: Botones redondeados "Pill-shape" (estilo Inverted/Primary en imagen) */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          {onCancel && (
            <button 
              onClick={onCancel} 
              className="flex-1 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest text-[#2C2C2C] hover:bg-[#E8E5E0] transition-colors"
            >
              Cancelar
            </button>
          )}
          <button 
            onClick={onConfirm} 
            className={`flex-[1.5] py-4 rounded-full font-bold text-[11px] uppercase tracking-widest text-white shadow-lg transition-transform active:scale-95 ${primaryColor} hover:opacity-90`}
          >
            {confirmText}
          </button>
        </div>

        {/* Detalle decorativo inferior (opcional) */}
        <div className="mt-8 flex justify-center gap-1 opacity-20">
            <div className="w-1 h-1 rounded-full bg-[#C5A059]"></div>
            <div className="w-1 h-1 rounded-full bg-[#C5A059]"></div>
            <div className="w-1 h-1 rounded-full bg-[#C5A059]"></div>
        </div>
      </div>
    </div>
  );
};