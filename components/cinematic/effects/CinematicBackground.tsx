"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function CinematicBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const scrollVelocity = useMotionValue(0);
  
  // Track scroll velocity for warp effect
  useEffect(() => {
    let lastScrollY = 0;
    let lastTime = Date.now();
    
    const handleScroll = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      const deltaScroll = Math.abs(window.scrollY - lastScrollY);
      const velocity = deltaScroll / deltaTime * 10;
      
      scrollVelocity.set(Math.min(velocity, 5));
      
      lastScrollY = window.scrollY;
      lastTime = currentTime;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollVelocity]);

  // Track mouse for sentient cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Breathing gradient animation
  const breatheScale = useSpring(1, { stiffness: 50, damping: 20 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      breatheScale.set(breatheScale.get() === 1 ? 1.2 : 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [breatheScale]);

  // Parallax for grid (moves slower than content)
  const gridY = useTransform(scrollY, [0, 5000], [0, -1000]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Deep Slate Background */}
      <div className="absolute inset-0 bg-[#020617]" />
      
      {/* Breathing Radial Gradient */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmax] h-[150vmax]"
        style={{ scale: breatheScale }}
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,rgba(139,92,246,0.08)_30%,transparent_70%)]" />
      </motion.div>

      {/* Perspective Grid - Infinite Tunnel Effect */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          y: gridY,
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: "rotateX(60deg) translateZ(-100px)",
            transformOrigin: "50% 0%",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Secondary Grid Layer (slower parallax) */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: useTransform(scrollY, [0, 5000], [0, -500]) }}
      >
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
          }}
        />
      </motion.div>

      {/* Sentient Cursor Light - Reveals Hidden Grid */}
      <div 
        className="absolute w-[600px] h-[600px] pointer-events-none transition-transform duration-75"
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          background: `radial-gradient(circle at center, 
            rgba(0, 217, 255, 0.08) 0%, 
            rgba(59, 130, 246, 0.04) 30%,
            transparent 50%
          )`,
        }}
      />
      
      {/* Hidden Grid Lines (revealed by cursor) */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
          opacity: 1,
        }}
      />

      {/* Film Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Scanlines (subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(2, 6, 23, 0.8) 100%)",
        }}
      />
    </div>
  );
}
