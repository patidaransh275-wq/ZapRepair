'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Button({
  children,
  variant = 'primary', // primary | secondary | outline | text | dark
  size = 'md', // sm | md | lg
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 focus:ring-amber-500 active:scale-[0.98]',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-md focus:ring-slate-900 active:scale-[0.98]',
    outline: 'border-2 border-slate-200 text-slate-800 hover:border-slate-900 hover:bg-slate-50 focus:ring-slate-400',
    dark: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700 focus:ring-slate-500',
    text: 'text-slate-700 hover:text-amber-600 hover:bg-amber-50/50 focus:ring-amber-400'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3.5 text-base rounded-xl gap-2.5'
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
