"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface WireframeConstructProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  glowColor?: string;
}

export default function WireframeConstruct({ 
  children, 
  className = "",
  delay = 0,
  duration = 1.2,
  glowColor = "rgba(0, 217, 255, 0.5)",
}: WireframeConstructProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [phase, setPhase] = useState<"hidden" | "wireframe" | "filling" | "complete">("hidden");

  useEffect(() => {
    if (!isInView) return;
    
    const timeline = [
      { phase: "wireframe" as const, at: delay * 1000 },
      { phase: "filling" as const, at: (delay + duration * 0.6) * 1000 },
      { phase: "complete" as const, at: (delay + duration) * 1000 },
    ];
    
    const timeouts = timeline.map(({ phase, at }) => 
      setTimeout(() => setPhase(phase), at)
    );
    
    return () => timeouts.forEach(clearTimeout);
  }, [isInView, delay, duration]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* SVG Border that traces itself */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Border path */}
        <motion.rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="16"
          fill="none"
          stroke={glowColor}
          strokeWidth="1"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            phase === "hidden" 
              ? { pathLength: 0, opacity: 0 }
              : { pathLength: 1, opacity: phase === "complete" ? 0.3 : 1 }
          }
          transition={{ duration: duration * 0.6, ease: "easeInOut", delay }}
        />
        
        {/* Corner accents */}
        {["0 0", "100% 0", "0 100%", "100% 100%"].map((pos, i) => (
          <motion.g
            key={i}
            style={{ transformOrigin: pos }}
            initial={{ opacity: 0, scale: 0 }}
            animate={phase !== "hidden" ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: delay + 0.1 * i, duration: 0.3 }}
          >
            <rect
              x={i % 2 === 0 ? 4 : "calc(100% - 16px)"}
              y={i < 2 ? 4 : "calc(100% - 16px)"}
              width="12"
              height="1"
              fill={glowColor}
            />
            <rect
              x={i % 2 === 0 ? 4 : "calc(100% - 5px)"}
              y={i < 2 ? 4 : "calc(100% - 16px)"}
              width="1"
              height="12"
              fill={glowColor}
            />
          </motion.g>
        ))}
      </svg>

      {/* Background fill that floods in */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={
          phase === "filling" || phase === "complete"
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        transition={{ duration: duration * 0.4 }}
        style={{
          background: "rgba(10, 14, 30, 0.8)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Inner glow */}
        <div 
          className="absolute inset-0"
          style={{
            boxShadow: `inset 0 0 40px ${glowColor.replace("0.5", "0.1")}`,
          }}
        />
        
        {/* Noise texture */}
        <div 
          className="absolute inset-0 opacity-5 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Top edge shine */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>

      {/* Content with staggered reveal */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={phase === "complete" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Breathing border component
interface BreathingBorderProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function BreathingBorder({ 
  children, 
  className = "",
  color = "rgba(0, 217, 255, 0.5)",
}: BreathingBorderProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ border: `1px solid ${color}` }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {children}
    </div>
  );
}
