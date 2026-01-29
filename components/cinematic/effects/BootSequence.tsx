"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  children: ReactNode;
  duration?: number;
  onComplete?: () => void;
}

export default function BootSequence({ 
  children, 
  duration = 2500,
  onComplete,
}: BootSequenceProps) {
  const [phase, setPhase] = useState<"scanning" | "constructing" | "complete">("scanning");
  const [scanPosition, setScanPosition] = useState(0);

  useEffect(() => {
    // Scanning phase
    const scanDuration = duration * 0.4;
    const scanInterval = setInterval(() => {
      setScanPosition((prev) => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setPhase("constructing");
          return 100;
        }
        return prev + 2;
      });
    }, scanDuration / 50);

    // Constructing phase
    const constructTimer = setTimeout(() => {
      setPhase("complete");
      onComplete?.();
    }, duration);

    return () => {
      clearInterval(scanInterval);
      clearTimeout(constructTimer);
    };
  }, [duration, onComplete]);

  return (
    <div className="relative">
      <AnimatePresence>
        {phase === "scanning" && (
          <>
            {/* Black overlay that reveals */}
            <motion.div
              className="absolute inset-0 bg-[#020617] z-30"
              initial={{ opacity: 1 }}
              style={{
                maskImage: `linear-gradient(to bottom, transparent ${scanPosition}%, black ${scanPosition}%)`,
                WebkitMaskImage: `linear-gradient(to bottom, transparent ${scanPosition}%, black ${scanPosition}%)`,
              }}
            />
            
            {/* Laser scan line */}
            <motion.div
              className="absolute left-0 right-0 h-1 z-40 pointer-events-none"
              style={{ top: `${scanPosition}%` }}
            >
              {/* Main line */}
              <div className="absolute inset-0 bg-primary shadow-[0_0_20px_rgba(0,217,255,0.8),0_0_40px_rgba(0,217,255,0.4)]" />
              {/* Glow trail */}
              <div 
                className="absolute inset-x-0 bottom-0 h-20"
                style={{
                  background: "linear-gradient(to top, transparent, rgba(0, 217, 255, 0.1))",
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content with wireframe -> solid transition */}
      <motion.div
        initial={{ opacity: 0, filter: "brightness(0.3) contrast(2)" }}
        animate={
          phase === "complete" 
            ? { opacity: 1, filter: "brightness(1) contrast(1)" }
            : phase === "constructing"
            ? { opacity: 0.8, filter: "brightness(0.7) contrast(1.2)" }
            : { opacity: 0.3, filter: "brightness(0.3) contrast(2)" }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Glitch text effect for headlines
interface GlitchTextProps {
  children: string;
  className?: string;
}

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onHoverStart={() => setIsGlitching(true)}
      onHoverEnd={() => setIsGlitching(false)}
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>
      
      {/* Glitch layers */}
      <AnimatePresence>
        {isGlitching && (
          <>
            <motion.span
              className="absolute inset-0 text-red-500/70"
              initial={{ x: 0 }}
              animate={{ x: [0, -3, 2, -1, 0] }}
              transition={{ duration: 0.2, repeat: Infinity }}
              style={{ clipPath: "inset(20% 0 30% 0)" }}
            >
              {children}
            </motion.span>
            <motion.span
              className="absolute inset-0 text-cyan-500/70"
              initial={{ x: 0 }}
              animate={{ x: [0, 2, -3, 1, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, delay: 0.05 }}
              style={{ clipPath: "inset(60% 0 10% 0)" }}
            >
              {children}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </motion.span>
  );
}
