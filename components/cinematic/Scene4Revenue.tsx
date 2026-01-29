"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ScrambleCounter } from "./effects/ScrambleText";

// Particle component for champagne bubbles
function Particle({ delay }: { delay: number }) {
  const x = Math.random() * 100;
  const duration = 3 + Math.random() * 2;
  const size = 2 + Math.random() * 4;
  
  return (
    <motion.div
      className="absolute rounded-full bg-amber-400/60"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: -20,
      }}
      animate={{
        y: [0, -window.innerHeight - 100],
        x: [0, (Math.random() - 0.5) * 100],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

export default function Scene4Revenue() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Counter animation
  const rawValue = useTransform(scrollYProgress, [0.1, 0.6], [0, 4280000]);
  const springValue = useSpring(rawValue, { stiffness: 100, damping: 30 });
  const displayValue = useMotionValue("¥0");
  
  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = springValue.on("change", (latest) => {
      displayValue.set(`¥${Math.floor(latest).toLocaleString("ja-JP")}`);
    });
    
    return () => unsubscribe();
  }, [springValue, displayValue]);

  // Background gradient shift
  const bgOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  
  // Text animations
  const subtitleOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.5, 0.65], [20, 0]);
  
  // Particles activation
  const particlesOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Animated Gold Gradient Overlay */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            opacity: bgOpacity,
            background: "radial-gradient(ellipse at center, rgba(251, 191, 36, 0.15) 0%, rgba(217, 119, 6, 0.1) 30%, transparent 70%)",
          }}
        />
        

        {/* Champagne Bubbles / Particles */}
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ opacity: particlesOpacity }}
        >
          {mounted && Array.from({ length: 30 }).map((_, i) => (
            <Particle key={i} delay={i * 0.2} />
          ))}
        </motion.div>

        {/* Main Revenue Display */}
        <div className="relative z-10 text-center">
          {/* Top Label */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 mb-8"
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.15], [0, 1]),
            }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
              Monthly Revenue Generated
            </span>
          </motion.div>

          {/* The Big Number */}
          <motion.div 
            className="relative"
            style={{ 
              scale: useTransform(scrollYProgress, [0.1, 0.4, 0.6], [0.8, 1, 1.1]),
            }}
          >
            {/* Glow behind text */}
            <motion.div 
              className="absolute inset-0 blur-3xl"
              style={{ 
                opacity: useTransform(scrollYProgress, [0.3, 0.6], [0, 0.8]),
                background: "linear-gradient(to right, rgba(251, 191, 36, 0.3), rgba(0, 217, 255, 0.2))",
              }}
            />
            
            <motion.h2 
              className="relative text-7xl md:text-[12rem] font-bold font-mono tracking-tighter"
              style={{
                background: useTransform(
                  scrollYProgress,
                  [0, 0.4, 0.7],
                  [
                    "linear-gradient(to bottom, #ffffff, #64748b)",
                    "linear-gradient(to bottom, #ffffff, #fbbf24)",
                    "linear-gradient(to bottom, #fbbf24, #f59e0b)",
                  ]
                ),
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {displayValue}
            </motion.h2>
          </motion.div>

          {/* Subtitle */}
          <motion.div 
            style={{ opacity: subtitleOpacity, y: subtitleY }}
            className="mt-8"
          >
            <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-4">
              This could be your hotel.
            </p>
            <p className="text-lg text-white/50 font-mono">
              Average revenue increase in 90 days
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            className="flex justify-center gap-8 mt-12"
            style={{ 
              opacity: useTransform(scrollYProgress, [0.6, 0.75], [0, 1]),
              y: useTransform(scrollYProgress, [0.6, 0.75], [30, 0]),
            }}
          >
            {[
              { value: "+58%", label: "Direct Bookings" },
              { value: "-85%", label: "OTA Commission" },
              { value: "3x", label: "ROI" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold font-mono text-primary">{stat.value}</div>
                <div className="text-xs font-mono text-white/40 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* HUD Frame */}
        <div className="absolute inset-8 border border-white/5 rounded-2xl pointer-events-none">
          <div className="absolute top-0 left-4 w-20 h-px bg-gradient-to-r from-primary/50 to-transparent" />
          <div className="absolute top-0 right-4 w-20 h-px bg-gradient-to-l from-amber-500/50 to-transparent" />
          <div className="absolute bottom-0 left-4 w-20 h-px bg-gradient-to-r from-primary/50 to-transparent" />
          <div className="absolute bottom-0 right-4 w-20 h-px bg-gradient-to-l from-amber-500/50 to-transparent" />
        </div>

        {/* Corner HUD Labels */}
        <div className="absolute bottom-12 left-12 text-xs font-mono text-white/20 uppercase tracking-wider">
          <span>PROJECTION.MODE</span>
        </div>
        <div className="absolute bottom-12 right-12 text-xs font-mono text-white/20 uppercase tracking-wider">
          <span>FIFTHKEYS.ANALYTICS</span>
        </div>
      </div>
    </section>
  );
}
