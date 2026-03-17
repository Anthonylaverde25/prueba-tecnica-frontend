// src/components/ui/Input.tsx
import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: Props) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-[10px] font-bold text-rose-500 px-1">{error}</p>}
    </div>
  );
};
