import type { Client } from '../domain/Client';
import { Card } from '../../../components/ui/Card';

interface Props {
  client: Client;
}

export const CustomerProfile = ({ client }: Props) => {
  return (
    <Card className="p-8 border-none bg-transparent shadow-none">
      <div className="space-y-10">
        <div className="space-y-2">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em]">Perfil del Cliente</span>
          <h2 className="text-2xl font-bold text-slate-900 leading-tight tracking-tight">
            {client.name}
          </h2>
        </div>

        <div className="space-y-8">
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Identificación</span>
            <p className="text-xs font-mono font-semibold text-blue-600 bg-blue-50/50 px-2 py-1 rounded inline-block">
              {client.id}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Canal de Contacto</span>
              <p className="text-[13px] font-medium text-slate-600 break-all">{client.email}</p>
            </div>
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Dirección Física</span>
              <p className="text-[13px] font-medium text-slate-600 leading-relaxed">{client.address}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest">Sistema Operativo</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
