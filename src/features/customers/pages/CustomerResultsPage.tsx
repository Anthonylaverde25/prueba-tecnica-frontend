// src/features/customers/pages/CustomerResultsPage.tsx
import { useParams } from "react-router-dom";
import { InvoiceTable } from "../components/InvoiceTable";
import { PaymentModal } from "../components/PaymentModal";
import { CustomerSidebar } from "../components/CustomerSidebar";
import { useInvoices } from "../hooks/useInvoices";
import { useEffect, useState } from "react";
import type { Invoice } from "../domain/Invoice";

export const CustomerResultsPage = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const { invoices, client, isLoading, error, fetchData, payInvoice } =
    useInvoices();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    if (customerId) {
      fetchData(customerId);
    }
  }, [customerId]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
        <h3 className="text-2xl font-light text-slate-900 tracking-tight uppercase">
          Acceso Denegado
        </h3>
        <p className="text-slate-500 font-medium text-sm">{error}</p>
        <button
          onClick={() => (window.location.href = "/search")}
          className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline"
        >
          Volver a Búsqueda
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-white">
      {/* Sidebar: Refined Metadata Panel */}
      <CustomerSidebar client={client} />

      {/* Main Panel: Fluid Data Interface */}
      <main className="flex-1 p-8 lg:p-12 space-y-12 w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-48 space-y-6">
            <div className="relative">
              <div className="w-10 h-10 border-2 border-slate-100 rounded-full" />
              <div className="absolute top-0 w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 animate-pulse">
              Sincronizando Datasets
            </span>
          </div>
        ) : (
          <div className="w-full space-y-8 lg:space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 pb-6 md:pb-8 border-b border-slate-100">
              <div className="space-y-3">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tighter text-slate-900 uppercase">
                  Estado de Cuenta
                </h1>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <span className="text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest md:tracking-[0.2em]">
                    Registros en Tiempo Real
                  </span>
                  <span className="hidden md:block w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="text-slate-900 text-[9px] md:text-[10px] font-bold uppercase tracking-widest md:tracking-[0.2em]">
                    {invoices.length} Activos
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end bg-slate-50/50 md:bg-transparent p-4 md:p-0 rounded-xl w-full md:w-auto">
                <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Saldo Pendiente
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs md:text-sm font-bold text-slate-400">
                    $
                  </span>
                  <span className="text-3xl md:text-4xl font-black text-slate-900 tabular-nums tracking-tighter">
                    {invoices
                      .reduce(
                        (acc, inv) =>
                          inv.status !== "Paid" ? acc + inv.amount : acc,
                        0,
                      )
                      .toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </span>
                </div>
              </div>
            </header>

            <div className="w-full">
              <InvoiceTable
                invoices={invoices}
                onPayRequest={(invoice) => setSelectedInvoice(invoice)}
              />
            </div>
          </div>
        )}
      </main>

      {selectedInvoice && (
        <PaymentModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onConfirm={payInvoice}
        />
      )}
    </div>
  );
};
