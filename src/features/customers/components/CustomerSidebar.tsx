import { useNavigate } from 'react-router-dom';
import { CustomerProfile } from './CustomerProfile';
import type { Client } from '../domain/Client';
import { useState } from 'react';
import { Button } from '../../../components/ui/Button';

interface Props {
  client: Client | null;
}

export const CustomerSidebar = ({ client }: Props) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden sticky top-16 z-30 w-full bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/search')}
          className="text-slate-500"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </Button>
        
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-slate-900 uppercase truncate max-w-[150px]">
            {client?.name || 'Cargando...'}
          </span>
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsDrawerOpen(false)}
          />
          <aside className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-6 animate-in slide-in-from-right duration-500 overflow-y-auto">
            <div className="flex justify-end mb-8">
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {client && <CustomerProfile client={client} />}
          </aside>
        </div>
      )}

      <aside className="hidden lg:block w-80 bg-slate-50 border-r border-slate-200 p-8 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="space-y-12">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/search')}
            className="group text-slate-400 hover:text-slate-900 px-0"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-slate-200 mr-3 group-hover:border-slate-900 transition-colors">
              <svg className="w-2.5 h-2.5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            Volver a Búsqueda
          </Button>

          {client ? (
            <CustomerProfile client={client} />
          ) : (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-8 bg-slate-200 rounded w-full" />
              <div className="space-y-8 pt-10">
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
