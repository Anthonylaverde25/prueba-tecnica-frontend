// src/features/customers/pages/CustomerSearchPage.tsx
import { useNavigate } from "react-router-dom";
import { CustomerSearchForm } from "../components/CustomerSearchForm";
import { useState } from "react";

export const CustomerSearchPage = () => {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSearch = (id: string) => {
    setIsRedirecting(true);
    setTimeout(() => {
      navigate(`/results/${id}`);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] max-w-2xl mx-auto px-4">
      <div className="w-full space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="text-center space-y-4">
          <h1 className="text-7xl font-bold tracking-tighter text-slate-900 uppercase leading-none">
            Prueba <span className="text-blue-600">Tecnica</span>
          </h1>
        </div>

        <div className="w-full py-12 border-y border-slate-100 relative">
          {isRedirecting && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] z-10 flex items-center justify-center animate-in fade-in duration-300">
              <span className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">
                Solicitando Acceso
              </span>
            </div>
          )}
          <CustomerSearchForm
            onSearch={handleSearch}
            isLoading={isRedirecting}
          />
        </div>
      </div>
    </div>
  );
};
