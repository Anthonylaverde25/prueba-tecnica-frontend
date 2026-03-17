// src/features/customers/components/CustomerSearchForm.tsx
import { useState } from "react";

interface Props {
  onSearch: (id: string) => void;
  isLoading: boolean;
}

export const CustomerSearchForm = ({ onSearch, isLoading }: Props) => {
  const [customerId, setCustomerId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = customerId.trim();
    if (cleanId) {
      onSearch(cleanId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
      <div className="flex flex-col space-y-3">
        <label htmlFor="customerId" className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-left px-1">
          ID de Cuenta o Dirección de Correo
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="customerId"
            type="text"
            value={customerId}
            autoComplete="off"
            spellCheck="false"
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="ej. 1001 o anthony@example.com"
            className="flex-1 px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-800 font-bold placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !customerId.trim()}
            className="group px-10 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all duration-300 disabled:bg-slate-100 disabled:text-slate-300 active:scale-95 shadow-xl shadow-slate-200"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Procesando
              </span>
            ) : (
              "Buscar Registro"
            )}
          </button>
        </div>
      </div>
      <p className="text-[10px] text-slate-400 font-medium text-left px-1 uppercase tracking-widest">
        Presione Enter o haga clic para buscar en nuestra base de datos segura
      </p>
    </form>
  );
};
