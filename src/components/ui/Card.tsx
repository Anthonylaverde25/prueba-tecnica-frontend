// src/components/ui/Card.tsx
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: Props) => {
  return (
    <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
