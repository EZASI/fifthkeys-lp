"use client";

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface BlueLightPathBorderProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  duration?: number;
}

/**
 * BlueLightPathBorder
 * 
 * "Neon Glow" → "Blue Oxygen Shadows":
 * - White/translucent glass with blue-tinted shadows
 * - Cards float on a cushion of air (blue shadow depth)
 * - Light path travels in Royal Blue
 */
export default function BlueLightPathBorder({ 
  children, 
  className = "",
  glowColor = "rgba(37, 99, 235, 0.6)",
  duration = 2.5,
}: BlueLightPathBorderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base glass container - White Glassmorphism */}
      <div 
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(37, 99, 235, 0.1)",
          boxShadow: `
            0 20px 40px -15px rgba(37, 99, 235, 0.1),
            0 0 1px rgba(37, 99, 235, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8)
          `,
        }}
      >
        {/* Subtle paper texture */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Inner blue glow (top edge) */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-royal-tint/30 to-transparent" />
      </div>

      {/* Animated light path border */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="blueLightPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor={glowColor} />
            <stop offset="60%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          <filter id="blueLightGlow">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* The traveling light */}
        <motion.rect
          x="1"
          y="1"
          rx="16"
          ry="16"
          fill="none"
          stroke="url(#blueLightPathGradient)"
          strokeWidth="2"
          filter="url(#blueLightGlow)"
          style={{
            width: "calc(100% - 2px)",
            height: "calc(100% - 2px)",
          }}
          initial={{ strokeDasharray: "0 1000", strokeDashoffset: 0 }}
          animate={isHovered ? {
            strokeDasharray: "80 1000",
            strokeDashoffset: [0, -1200],
          } : {
            strokeDasharray: "0 1000",
            strokeDashoffset: 0,
          }}
          transition={{
            duration: isHovered ? duration : 0.3,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />
      </svg>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

/**
 * BlueGlassPanel
 * Frosted White Glassmorphism with blue oxygen shadows
 */
export function BlueGlassPanel({ 
  children, 
  className = "",
  withLightPath = false,
}: {
  children: ReactNode;
  className?: string;
  withLightPath?: boolean;
}) {
  if (withLightPath) {
    return (
      <BlueLightPathBorder className={className}>
        {children}
      </BlueLightPathBorder>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(37, 99, 235, 0.08)",
          boxShadow: `
            0 10px 30px -10px rgba(37, 99, 235, 0.08),
            0 0 1px rgba(37, 99, 235, 0.05)
          `,
        }}
      >
        {/* Paper texture */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none rounded-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Top edge highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
