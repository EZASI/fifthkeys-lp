"use client";

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface LightPathBorderProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  duration?: number;
}

/**
 * LightPathBorder
 * Borders are not solid lines; they are 'light paths' that travel around containers on hover.
 */
export default function LightPathBorder({ 
  children, 
  className = "",
  glowColor = "rgba(0, 217, 255, 0.8)",
  duration = 2,
}: LightPathBorderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base glass container */}
      <div className="absolute inset-0 rounded-2xl bg-obsidian-surface/80 backdrop-blur-xl border border-white/5 overflow-hidden">
        {/* Washi paper texture */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Inner glow */}
        <div 
          className="absolute inset-0"
          style={{
            boxShadow: `inset 0 0 60px ${glowColor.replace("0.8", "0.05")}`,
          }}
        />
      </div>

      {/* Animated light path border */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="lightPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor={glowColor} />
            <stop offset="60%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          <filter id="lightGlow">
            <feGaussianBlur stdDeviation="4" result="glow" />
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
          stroke="url(#lightPathGradient)"
          strokeWidth="2"
          filter="url(#lightGlow)"
          style={{
            width: "calc(100% - 2px)",
            height: "calc(100% - 2px)",
          }}
          initial={{ strokeDasharray: "0 1000", strokeDashoffset: 0 }}
          animate={isHovered ? {
            strokeDasharray: "100 1000",
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
 * GlassPanel
 * Frosted Obsidian with optional light path
 */
export function GlassPanel({ 
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
      <LightPathBorder className={className}>
        {children}
      </LightPathBorder>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-obsidian-surface/80 backdrop-blur-xl border border-white/5">
        {/* Washi paper texture */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none rounded-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Top edge highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
