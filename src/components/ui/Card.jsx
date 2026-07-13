import React from 'react';

export const Card = ({ className = '', children, ...props }) => {
  return (
    <div className={`bg-white rounded-2xl border border-charcoal-muted/10 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-5 flex flex-col space-y-1.5 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className = '', children, ...props }) => {
  return (
    <h3 className={`text-lg font-bold leading-none tracking-tight text-charcoal font-sans ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ className = '', children, ...props }) => {
  return (
    <p className={`text-xs text-charcoal-muted font-sans ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-5 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-5 pt-0 flex items-center ${className}`} {...props}>
      {children}
    </div>
  );
};
