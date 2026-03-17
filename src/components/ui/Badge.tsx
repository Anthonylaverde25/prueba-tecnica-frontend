// src/components/ui/Badge.tsx
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'neutral';
}

const variants = {
  success: 'text-emerald-600 border-emerald-100 bg-emerald-50/30',
  warning: 'text-amber-600 border-amber-100 bg-amber-50/30',
  info: 'text-blue-600 border-blue-100 bg-blue-50/30',
  neutral: 'text-slate-400 border-slate-100 bg-slate-50/30',
};

export const Badge = ({ children, variant = 'neutral' }: Props) => {
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border rounded-lg ${variants[variant]}`}>
      {children}
    </span>
  );
};
