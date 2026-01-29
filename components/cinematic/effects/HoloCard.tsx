"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface HoloCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export default function HoloCard({ 
  children, 
  className = "",
  glowColor = "rgba(0, 217, 255, 0.1)",
}: HoloCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(cardRef.current?.offsetWidth ? cardRef.current.offsetWidth / 2 : 0);
    mouseY.set(cardRef.current?.offsetHeight ? cardRef.current.offsetHeight / 2 : 0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "rgba(10, 14, 30, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: `inset 0 0 30px ${glowColor}`,
      }}
    >
      {/* Gradient Border */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          padding: "1px",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.02))",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* Corner Brackets - Viewfinder Style */}
      <svg className="absolute top-2 left-2 w-4 h-4 text-primary/50" viewBox="0 0 16 16">
        <path d="M0 6V0h6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="absolute top-2 right-2 w-4 h-4 text-primary/50" viewBox="0 0 16 16">
        <path d="M16 6V0h-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-2 left-2 w-4 h-4 text-primary/50" viewBox="0 0 16 16">
        <path d="M0 10v6h6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-2 right-2 w-4 h-4 text-primary/50" viewBox="0 0 16 16">
        <path d="M16 10v6h-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Spotlight that follows cursor */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: useTransform(
            [x, y],
            ([latestX, latestY]) => 
              `radial-gradient(600px circle at ${latestX}px ${latestY}px, ${glowColor}, transparent 40%)`
          ),
        }}
      />

      {/* Top edge shine */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Holographic 3D Card with tilt and reflection
interface Hologram3DProps {
  children: ReactNode;
  className?: string;
}

export function Hologram3D({ children, className = "" }: Hologram3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Limit rotation to ±12 degrees
    rotateY.set((mouseX / rect.width) * 12);
    rotateX.set(-(mouseY / rect.height) * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className={`relative ${className}`} style={{ perspective: "1000px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
      
      {/* Reflection */}
      <motion.div
        className="absolute top-full left-0 right-0 h-32 mt-4 overflow-hidden opacity-20"
        style={{
          rotateX: useTransform(springRotateX, (v) => -v),
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          transform: "rotateX(180deg)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
