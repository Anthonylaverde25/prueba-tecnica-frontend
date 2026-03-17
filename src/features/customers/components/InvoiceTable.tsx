// src/features/customers/components/InvoiceTable.tsx
import type { Invoice } from '../domain/Invoice';

interface Props {
  invoices: Invoice[];
  onPayRequest: (invoice: Invoice) => void;
}

const statusBadgeStyles = {
  Paid: 'text-emerald-600',
  Pending: 'text-amber-600',
};

const statusTranslations = {
  Paid: 'Pagado',
  Pending: 'Pendiente',
};

export const InvoiceTable = ({ invoices, onPayRequest }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-slate-900 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">
            <th className="py-4 pr-6">Tipo de Servicio</th>
            <th className="py-4 px-6">Periodo de Facturación</th>
            <th className="py-4 px-6">Monto</th>
            <th className="py-4 px-6">Estado</th>
            <th className="py-4 pl-6 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {invoices.map((invoice, index) => (
            <tr 
              key={invoice.id} 
              className={`group transition-colors duration-75 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-slate-100/50`}
            >
              <td className="py-5 pr-6">
                <span className="text-sm font-bold text-slate-900">{invoice.service}</span>
              </td>
              <td className="py-5 px-6">
                <span className="text-sm font-medium text-slate-500">{invoice.period}</span>
              </td>
              <td className="py-5 px-6">
                <span className="text-sm font-bold text-slate-900 tabular-nums">${invoice.amount.toFixed(2)}</span>
              </td>
              <td className="py-5 px-6">
                {invoice.status === 'Paid' ? (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                    Pagado
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                    Pendiente
                  </span>
                )}
              </td>
              <td className="py-5 pl-6 text-right">
                {invoice.status !== 'Paid' ? (
                  <button
                    onClick={() => onPayRequest(invoice)}
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 hover:text-blue-800 hover:underline underline-offset-4 transition-all"
                  >
                    Procesar Pago
                  </button>
                ) : (
                  <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 cursor-default">
                    Descargado
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
