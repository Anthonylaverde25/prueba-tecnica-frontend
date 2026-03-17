// src/components/ui/Button.tsx
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const variants = {
  primary: 'bg-slate-900 text-white hover:bg-blue-600 active:scale-[0.98]',
  secondary: 'bg-slate-50 text-slate-900 border border-slate-200 hover:border-slate-300',
  ghost: 'text-slate-400 hover:text-slate-900 bg-transparent',
  danger: 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200',
};

const sizes = {
  sm: 'py-2 px-4 text-[10px]',
  md: 'py-3 px-6 text-[10px]',
  lg: 'py-4 px-8 text-xs',
  full: 'w-full py-3 text-[10px]',
};

export const Button = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  size = 'md',
  className = '',
  disabled,
  ...props 
}: Props) => {
  const baseClasses = "font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2";
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Procesando...
        </span>
      ) : children}
    </button>
  );
};
