"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

/**
 * PlatinumBackground
 * 
 * "The Laboratory of Light (光の実験室)"
 * Creates atmospheric density in light mode using:
 * - Volumetric vignette (center bright, edges fade)
 * - Subtle grid with perspective
 * - Colored ambient light orbs
 */
export default function PlatinumBackground() {
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Parallax for depth layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  
  // Smooth mouse tracking
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base: Volumetric Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 100% at 50% 0%, 
            #FAFBFC 0%, 
            #F8FAFC 30%, 
            #F1F5F9 70%, 
            #E2E8F0 100%
          )`,
        }}
      />

      {/* Perspective Grid (Subtle) */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(79, 70, 229, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(79, 70, 229, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'center top',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 60%)',
        }}
      />

      {/* Gold Ambient Orb (Revenue) */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: '10%',
          left: '60%',
          x: useTransform(smoothX, [0, 1], [-50, 50]),
          y: y1,
        }}
      />
      
      {/* Indigo Ambient Orb (Tech) */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          bottom: '20%',
          left: '10%',
          x: useTransform(smoothX, [0, 1], [50, -50]),
          y: y2,
        }}
      />

      {/* Top Light Source */}
      <div 
        className="absolute top-0 left-0 right-0 h-[500px]"
        style={{
          background: 'linear-gradient(180deg, rgba(250, 251, 252, 1) 0%, transparent 100%)',
        }}
      />

      {/* Bottom Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[300px]"
        style={{
          background: 'linear-gradient(0deg, #F1F5F9 0%, transparent 100%)',
        }}
      />

      {/* Noise Texture for Premium Feel */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
