"use client";

import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';

// Definir las variantes del botón usando class-variance-authority
const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500',
        secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-500',
        outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
        ghost: 'text-neutral-500 hover:bg-neutral-100 focus:ring-neutral-500',
        accent: 'bg-accent-500 hover:bg-accent-600 text-white focus:ring-accent-500',
      },
      size: {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-6 py-3',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

// Tipos para las props del botón
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  external?: boolean;
  loading?: boolean;
}

/**
 * Componente Button reutilizable con diferentes variantes y tamaños.
 * Puede funcionar como botón o como enlace (si se proporciona href).
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      fullWidth,
      href,
      external,
      disabled,
      loading,
      ...props
    },
    ref
  ) => {
    // Si hay un href, renderizar como Link
    if (href) {
      // Para enlaces externos
      if (external) {
        return (
          <a
            href={href}
            className={buttonVariants({ variant, size, fullWidth, className })}
            target="_blank"
            rel="noopener noreferrer"
          >
            {loading ? <span className="mr-2">⟳</span> : null}
            {children}
          </a>
        );
      }
      
      // Para enlaces internos
      return (
        <Link
          href={href}
          className={buttonVariants({ variant, size, fullWidth, className })}
        >
          {loading ? <span className="mr-2 animate-spin">⟳</span> : null}
          {children}
        </Link>
      );
    }

    // Si no hay href, renderizar como botón
    return (
      <button
        className={buttonVariants({ variant, size, fullWidth, className })}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? <span className="mr-2 animate-spin">⟳</span> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
