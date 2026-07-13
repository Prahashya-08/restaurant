import React from 'react';

export const Badge = ({
  className = '',
  variant = 'default',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full select-none transition-colors border';
  
  const variants = {
    default: 'bg-charcoal text-white border-transparent',
    secondary: 'bg-charcoal-muted/10 text-charcoal border-transparent',
    outline: 'border-charcoal-muted/30 text-charcoal bg-transparent',
    primary: 'bg-primary/10 text-primary border-primary/25',
    veg: 'bg-green-50 text-green-700 border-green-200/50',
    nonveg: 'bg-red-50 text-red-700 border-red-200/50',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/50'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
