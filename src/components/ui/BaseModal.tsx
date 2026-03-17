// src/components/ui/BaseModal.tsx
import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
}

export const BaseModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  isLoading = false 
}: Props) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 space-y-6">
          <header className="flex justify-between items-center">
            {title && (
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                {title}
              </h3>
            )}
            {!isLoading && (
              <button 
                onClick={onClose} 
                className="text-slate-300 hover:text-slate-900 transition-colors"
                aria-label="Cerrar modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </header>

          <div className="space-y-4">
            {children}
          </div>
        </div>

        {footer && (
          <footer className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};
