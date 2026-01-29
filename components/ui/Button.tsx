"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: `
        bg-gradient-to-b from-primary to-[#00B8D9] text-bg-primary 
        shadow-[0_0_20px_rgba(0,217,255,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]
        hover:shadow-[0_0_30px_rgba(0,217,255,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]
        hover:scale-[1.02] active:scale-[0.98]
        border-t border-white/20
      `,
      secondary: `
        bg-bg-tertiary text-text-primary border border-border-light 
        hover:border-primary/50 hover:bg-bg-elevated
        hover:shadow-[0_0_20px_rgba(0,217,255,0.1)]
        hover:scale-[1.02] active:scale-[0.98]
      `,
      ghost: `
        bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5
        active:scale-[0.98]
      `,
      glass: `
        bg-white/5 backdrop-blur-xl border border-white/10 text-white 
        hover:bg-white/10 hover:border-white/20
        shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
        hover:scale-[1.02] active:scale-[0.98]
      `,
      outline: `
        bg-transparent border border-primary text-primary 
        hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,217,255,0.2)]
        hover:scale-[1.02] active:scale-[0.98]
      `,
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Inner shine overlay */}
        <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </span>
        
        <span className="relative flex items-center justify-center">
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
