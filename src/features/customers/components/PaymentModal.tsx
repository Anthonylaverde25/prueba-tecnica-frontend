import type { Invoice } from "../domain/Invoice";
import { useState } from "react";
import { useNotification } from "../../../core/contexts/NotificationContext";
import { BaseModal } from "../../../components/ui/BaseModal";
import { Button } from "../../../components/ui/Button";

interface Props {
  invoice: Invoice;
  onClose: () => void;
  onConfirm: (invoiceId: string) => Promise<void>;
}

const methodTranslations: Record<string, string> = {
  credit_card: "Tarjeta de Crédito",
  bank_transfer: "Transferencia",
  digital_wallet: "Billetera Digital",
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

  const footer = (
    <>
      <Button variant="ghost" onClick={onClose} disabled={isProcessing} className="flex-1">
        Cancelar
      </Button>
      <Button 
        variant="primary" 
        onClick={handlePayment} 
        isLoading={isProcessing} 
        className="flex-[2]"
      >
        Proceder al Pago
      </Button>
    </>
  );

  return (
    <BaseModal 
      isOpen={true} 
      onClose={onClose} 
      title="Confirmar Pago" 
      footer={footer}
      isLoading={isProcessing}
    >
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
                {isSelected && <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>
    </BaseModal>
  );
};
