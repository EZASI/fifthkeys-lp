"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * CeramicBackground
 * 
 * "The Infinite Canvas (無限の白)"
 * Creates atmospheric depth in a white UI using:
 * - Subtle fog gradients
 * - Light grid reflections
 * - Ambient light orbs
 */
export default function CeramicBackground() {
  const { scrollYProgress } = useScroll();
  
  // Subtle parallax for depth
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.2]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base Layer: Mist gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            #FFFFFF 0%, 
            #F8FAFC 30%, 
            #F1F5F9 70%, 
            #F8FAFC 100%
          )`,
        }}
      />
      
      {/* Light Grid (Ma - Negative Space) */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 232, 240, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
        }}
      />

      {/* Ambient Light Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
          y: y1,
          opacity,
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
          y: y2,
          opacity,
        }}
      />

      {/* Top Highlight (Ceiling Light) */}
      <div 
        className="absolute top-0 left-0 right-0 h-[400px]"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, transparent 100%)',
        }}
      />

      {/* Bottom Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[200px]"
        style={{
          background: 'linear-gradient(0deg, #F8FAFC 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
