import React from 'react';

export const Button = React.forwardRef(({
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  children,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-98 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md shadow-primary/20',
    secondary: 'bg-charcoal text-white hover:bg-charcoal-light shadow-sm shadow-charcoal/10',
    outline: 'border border-charcoal-muted/30 bg-transparent text-charcoal hover:bg-cream-dark hover:border-charcoal-muted/50',
    ghost: 'bg-transparent text-charcoal hover:bg-cream-dark',
    link: 'text-primary underline-offset-4 hover:underline bg-transparent p-0'
  };

  const sizes = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-11 px-5 text-sm',
    lg: 'h-13 px-8 text-base'
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
