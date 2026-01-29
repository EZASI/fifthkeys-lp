"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DriftContainerProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export default function DriftContainer({ 
  children, 
  className = "",
  amplitude = 10,
  duration = 6,
  delay = 0,
}: DriftContainerProps) {
  return (
    <motion.div
      className={className}
      animate={{ 
        y: [0, -amplitude, 0, amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// Orbital rotation for satellite elements
interface OrbitalProps {
  children: ReactNode;
  radius: number;
  duration?: number;
  startAngle?: number;
  className?: string;
}

export function Orbital({ 
  children, 
  radius, 
  duration = 20, 
  startAngle = 0,
  className = "",
}: OrbitalProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: "50%",
        top: "50%",
        marginLeft: -radius,
        marginTop: -radius,
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      initial={{ rotate: startAngle }}
    >
      <div 
        className="absolute"
        style={{
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
        }}
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
