// src/features/customers/components/InvoiceTable.tsx
import type { Invoice } from '../domain/Invoice';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

interface Props {
  invoices: Invoice[];
  onPayRequest: (invoice: Invoice) => void;
}

const InvoiceRow = ({ invoice, onPayRequest }: { invoice: Invoice, onPayRequest: (i: Invoice) => void }) => {
  const isPaid = invoice.status === 'Paid';

  return (
    <tr className="group transition-colors duration-75 hover:bg-slate-50/80 border-b border-slate-50 last:border-0">
      <td className="py-5 pr-6">
        <span className="text-sm font-bold text-slate-900">{invoice.service}</span>
      </td>
      <td className="py-5 px-6">
        <span className="text-sm font-medium text-slate-500">{invoice.period}</span>
      </td>
      <td className="py-5 px-6">
        <span className="text-sm font-bold text-slate-900 tabular-nums">
          ${invoice.amount.toFixed(2)}
        </span>
      </td>
      <td className="py-5 px-6">
        <Badge variant={isPaid ? 'success' : 'warning'}>
          {isPaid ? 'Pagado' : 'Pendiente'}
        </Badge>
      </td>
      <td className="py-5 pl-6 text-right whitespace-nowrap">
        {!isPaid ? (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onPayRequest(invoice)}
            className="text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline"
          >
            Procesar Pago
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            disabled 
            className="text-slate-300 pointer-events-none"
          >
            Procesado
          </Button>
        )}
      </td>
    </tr>
  );
};

export const InvoiceTable = ({ invoices, onPayRequest }: Props) => {
  if (invoices.length === 0) {
    return (
      <div className="py-20 text-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">
          No se encontraron facturas
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-slate-900 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">
            <th className="py-4 pr-6 text-slate-400">Servicio</th>
            <th className="py-4 px-6 text-slate-400">Periodo</th>
            <th className="py-4 px-6 text-slate-400">Monto</th>
            <th className="py-4 px-6 text-slate-400">Estado</th>
            <th className="py-4 pl-6 text-right text-slate-400">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {invoices.map((invoice) => (
            <InvoiceRow 
              key={invoice.id} 
              invoice={invoice} 
              onPayRequest={onPayRequest} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
