
import React from 'react';

interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  isDestructive = false
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
      onClick={onCancel}
    >
      <div 
        className="w-full max-w-xs rounded-[2rem] p-6 shadow-2xl animate-in zoom-in-95 duration-300 bg-surface border border-outline-variant/50 text-on-surface cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2 mb-6 text-center sm:text-left">
          <h3 className="text-xl font-black tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            {message}
          </p>
        </div>
        
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-bold rounded-full transition-colors text-primary hover:bg-primary/10 active:scale-95"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2 text-sm font-black rounded-full text-on-primary shadow-lg transition-all active:scale-95 ${
              isDestructive 
              ? 'bg-error shadow-error/20' 
              : 'bg-primary shadow-primary/20'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
