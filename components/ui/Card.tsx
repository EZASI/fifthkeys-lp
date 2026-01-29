"use client";

import React, { useRef, useState } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  spotlight?: boolean;
  glowBorder?: boolean;
}

export const Card = ({ 
  children, 
  className = "", 
  hover = false, 
  spotlight = false,
  glowBorder = false,
  ...props 
}: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotlight) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`
        relative overflow-hidden
        bg-bg-tertiary/80 backdrop-blur-xl 
        border border-border-light/60 rounded-2xl
        transition-all duration-300
        ${hover ? "hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(0,217,255,0.2)] cursor-pointer" : ""}
        ${glowBorder ? "glow-border" : ""}
        ${className}
      `}
      style={spotlight ? {
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`,
      } as React.CSSProperties : undefined}
      {...props}
    >
      {/* Spotlight gradient overlay */}
      {spotlight && (
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 217, 255, 0.08), transparent 40%)`
          }}
        />
      )}
      
      {/* Top edge highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Specialized Bento Card for feature grids
interface BentoCardProps extends CardProps {
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

export const BentoCard = ({
  children,
  className = "",
  colSpan = 1,
  rowSpan = 1,
  ...props
}: BentoCardProps) => {
  const spanClasses = {
    col: colSpan === 2 ? "md:col-span-2" : "col-span-1",
    row: rowSpan === 2 ? "md:row-span-2" : "row-span-1",
  };

  return (
    <Card 
      hover 
      spotlight 
      glowBorder
      className={`${spanClasses.col} ${spanClasses.row} ${className}`}
      {...props}
    >
      {children}
    </Card>
  );
};
