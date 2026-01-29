"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

/**
 * MeltingIce (融解)
 * Scene 1: Cost Rigidity → Cost Flexibility
 * 
 * Visual Metaphor:
 * A heavy, frozen glass cube labeled '固定費 (Fixed Costs)'.
 * FifthKeys light hits it → cracks → melts into gold particles.
 * Particles flow into '成果報酬 (Commission)' container.
 * 
 * Physics: Solid Body → Fluid Simulation
 */

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function MeltingIce() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [phase, setPhase] = useState<'frozen' | 'cracking' | 'melting' | 'flowing' | 'collected'>('frozen');
  const [particles, setParticles] = useState<Particle[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Ice cube transforms
  const iceOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);
  const iceCracks = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);

  useEffect(() => {
    if (!isInView) return;
    
    const timeline = [
      { phase: 'cracking' as const, at: 500 },
      { phase: 'melting' as const, at: 1500 },
      { phase: 'flowing' as const, at: 2500 },
      { phase: 'collected' as const, at: 4000 },
    ];
    
    const timeouts = timeline.map(({ phase: p, at }) => 
      setTimeout(() => setPhase(p), at)
    );
    
    // Generate particles when melting starts
    setTimeout(() => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 40; i++) {
        newParticles.push({
          id: i,
          x: 150 + Math.random() * 100,
          y: 100 + Math.random() * 100,
          size: 4 + Math.random() * 8,
          delay: Math.random() * 1,
          duration: 1.5 + Math.random() * 1,
        });
      }
      setParticles(newParticles);
    }, 1500);
    
    return () => timeouts.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
      }}
    >
      {/* FifthKeys Light Source */}
      <motion.div
        className="absolute top-0 right-0 w-[400px] h-[400px]"
        style={{
          background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
        }}
        animate={{
          opacity: phase === 'cracking' || phase === 'melting' ? [0.3, 0.8, 0.3] : 0.3,
          scale: phase === 'cracking' || phase === 'melting' ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 2, repeat: phase === 'cracking' || phase === 'melting' ? Infinity : 0 }}
      />

      {/* Labels */}
      <div className="absolute top-8 left-8">
        <div className="text-xs font-mono text-depth-light tracking-widest mb-2">
          SCENE_01 // COST_TRANSFORMATION
        </div>
        <div className="text-lg font-bold text-depth-deep">
          固定費の融解
        </div>
      </div>

      {/* ICE CUBE (Left Side) */}
      <motion.div
        className="absolute left-[100px] top-1/2 -translate-y-1/2"
        style={{ opacity: iceOpacity }}
      >
        {/* Ice Cube Container */}
        <motion.div
          className="relative w-[200px] h-[200px]"
          animate={{
            rotate: phase === 'cracking' ? [0, -2, 2, -1, 0] : 0,
          }}
          transition={{ duration: 0.5, repeat: phase === 'cracking' ? 3 : 0 }}
        >
          {/* Main Cube Body */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.4) 0%, rgba(148, 163, 184, 0.2) 100%)',
              backdropFilter: 'blur(8px)',
              border: '2px solid rgba(148, 163, 184, 0.3)',
              boxShadow: '0 20px 50px rgba(100, 116, 139, 0.2), inset 0 0 30px rgba(255, 255, 255, 0.3)',
            }}
          >
            {/* Ice Texture */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence baseFrequency='0.05' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E")`,
              }}
            />
            
            {/* Highlight */}
            <div 
              className="absolute top-4 left-4 w-16 h-16 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Cracks (SVG) */}
          <AnimatePresence>
            {(phase === 'cracking' || phase === 'melting') && (
              <motion.svg
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Crack Lines */}
                {[
                  "M 100,50 L 120,80 L 150,100",
                  "M 80,100 L 100,120 L 90,150",
                  "M 120,60 L 140,90 L 160,85",
                  "M 60,80 L 80,110 L 70,140",
                ].map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="rgba(100, 116, 139, 0.5)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                  />
                ))}
              </motion.svg>
            )}
          </AnimatePresence>

          {/* Label */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
            <div className="text-sm font-bold text-depth-medium">固定費</div>
            <div className="text-xs text-depth-faint">¥95,000/月</div>
          </div>
        </motion.div>
      </motion.div>

      {/* GOLD PARTICLES (Flowing) */}
      <AnimatePresence>
        {(phase === 'melting' || phase === 'flowing' || phase === 'collected') && 
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                background: 'radial-gradient(circle, #F4D03F 0%, #D4AF37 100%)',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
              }}
              initial={{ 
                x: particle.x, 
                y: particle.y + 50,
                opacity: 0,
                scale: 0,
              }}
              animate={
                phase === 'collected'
                  ? {
                      x: 550 + (particle.id % 5) * 15,
                      y: 250 + Math.floor(particle.id / 5) * 10,
                      opacity: 1,
                      scale: 0.6,
                    }
                  : {
                      x: [particle.x, particle.x + 100, particle.x + 250, 500],
                      y: [particle.y + 50, particle.y + 100, particle.y + 80, 280],
                      opacity: [0, 1, 1, 1],
                      scale: [0, 1, 1, 0.8],
                    }
              }
              transition={{
                duration: phase === 'collected' ? 0.5 : particle.duration,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))
        }
      </AnimatePresence>

      {/* COLLECTION CONTAINER (Right Side) */}
      <motion.div
        className="absolute right-[100px] top-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: phase === 'flowing' || phase === 'collected' ? 1 : 0.3,
          scale: phase === 'collected' ? 1 : 0.95,
        }}
        transition={{ duration: 0.5 }}
      >
        <div 
          className="relative w-[180px] h-[180px] rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 251, 235, 0.8) 0%, rgba(254, 243, 199, 0.6) 100%)',
            backdropFilter: 'blur(12px)',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            boxShadow: phase === 'collected' 
              ? '0 20px 50px rgba(212, 175, 55, 0.25), inset 0 0 30px rgba(212, 175, 55, 0.1)'
              : '0 10px 30px rgba(100, 116, 139, 0.1)',
          }}
        >
          {/* Inner Glow */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: phase === 'collected'
                ? 'radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, transparent 70%)'
                : 'transparent',
            }}
          />
          
          {/* Gold Fill Level */}
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            style={{
              background: 'linear-gradient(to top, rgba(212, 175, 55, 0.4) 0%, rgba(244, 208, 63, 0.2) 100%)',
            }}
            initial={{ height: '0%' }}
            animate={{ 
              height: phase === 'collected' ? '60%' : phase === 'flowing' ? '30%' : '0%',
            }}
            transition={{ duration: 1 }}
          />

          {/* FifthKeys Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span 
              className="text-4xl font-bold"
              style={{ color: '#D4AF37' }}
              animate={{
                textShadow: phase === 'collected' 
                  ? '0 0 30px rgba(212, 175, 55, 0.5)'
                  : 'none',
              }}
            >
              F
            </motion.span>
          </div>
        </div>

        {/* Label */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
          <div className="text-sm font-bold text-champagne-muted">成果報酬</div>
          <motion.div 
            className="text-xs text-depth-faint"
            animate={{ opacity: phase === 'collected' ? 1 : 0.5 }}
          >
            売上の3%のみ
          </motion.div>
        </div>
      </motion.div>

      {/* Flow Arrow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'flowing' || phase === 'collected' ? 1 : 0 }}
      >
        <motion.svg width="100" height="40" viewBox="0 0 100 40">
          <motion.path
            d="M 0,20 L 70,20 L 60,10 M 70,20 L 60,30"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: phase === 'flowing' || phase === 'collected' ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
        </motion.svg>
      </motion.div>

      {/* Bottom Message */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: phase === 'collected' ? 1 : 0,
          y: phase === 'collected' ? 0 : 20,
        }}
      >
        <div className="px-6 py-3 bg-white/60 backdrop-blur-xl rounded-full border border-champagne-pure/20 shadow-gold-md">
          <span className="text-sm font-medium text-depth-deep">
            固定費から解放。成果だけに集中。
          </span>
        </div>
      </motion.div>

      {/* Phase Indicator */}
      <div className="absolute bottom-8 right-8 text-xs font-mono text-depth-faint">
        PHASE: {phase.toUpperCase()}
      </div>
    </div>
  );
}
