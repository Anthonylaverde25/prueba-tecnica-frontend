import type { Invoice } from "../domain/Invoice";
import { useState } from "react";
import { useNotification } from "../../../core/contexts/NotificationContext";

interface Props {
  invoice: Invoice;
  onClose: () => void;
  onConfirm: (invoiceId: string) => Promise<void>;
}

const methodTranslations: Record<string, string> = {
  credit_card: "Tarjeta de Crédito",
  bank_transfer: "Transferencia",
  nexus_wallet: "Billetera Nexus",
};

export const PaymentModal = ({ invoice, onClose, onConfirm }: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const { showNotification } = useNotification();

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await onConfirm(invoice.id);
      showNotification(`Pago de ${invoice.service} procesado exitosamente`, "success");
      onClose();
    } catch (error) {
      showNotification("Error en el procesamiento del pago. Intente de nuevo.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={!isProcessing ? onClose : undefined}
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 space-y-8">
          <header className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
              Confirmar Pago
            </h3>
            {!isProcessing && (
              <button onClick={onClose} className="text-slate-300 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </header>

          <div className="bg-slate-50 rounded-xl p-6 text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monto Total</span>
            <div className="text-4xl font-black text-slate-900 tracking-tighter tabular-nums">
              <span className="text-xl mr-1 text-slate-300">$</span>
              {invoice.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] font-medium text-slate-500 pt-2 border-t border-slate-200/60 mt-4">
              {invoice.service} — {invoice.period}
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Método de Pago</span>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(methodTranslations).map(([method, label]) => {
                const isSelected = paymentMethod === method;
                return (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    disabled={isProcessing}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                      isSelected 
                        ? "bg-blue-50 border-blue-200 ring-1 ring-blue-100" 
                        : "bg-white border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <span className={`text-xs font-bold uppercase tracking-wide ${isSelected ? "text-blue-700" : "text-slate-600"}`}>
                      {label}
                    </span>
                    {isSelected && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <footer className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-[2] py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all active:scale-[0.98] disabled:bg-slate-200"
          >
            {isProcessing ? "Procesando..." : "Proceder al Pago"}
          </button>
        </footer>
      </div>
    </div>
  );
};
