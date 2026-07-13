import React from 'react';

export const Skeleton = ({ className = '', ...props }) => {
  return (
    <div className={`animate-pulse rounded bg-charcoal-muted/10 ${className}`} {...props} />
  );
};
