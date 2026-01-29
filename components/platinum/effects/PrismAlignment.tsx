"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/**
 * PrismAlignment (プリズムの統合)
 * Scene 3: Fragmentation → Platform Consolidation
 * 
 * Visual Metaphor:
 * 5 chaotic light beams (PMS, OTA, Meta) crossing and clashing.
 * They pass through the Crystal Lens (FifthKeys).
 * Emerge as a SINGLE, powerful Indigo Laser Beam.
 * 
 * Meaning: "Turning chaos into focused revenue."
 */

interface LightBeam {
  id: string;
  label: string;
  color: string;
  startY: number;
  amplitude: number;
  phase: number;
}

const CHAOTIC_BEAMS: LightBeam[] = [
  { id: 'pms', label: 'PMS', color: '#EF4444', startY: 80, amplitude: 30, phase: 0 },
  { id: 'ota', label: 'OTA', color: '#3B82F6', startY: 150, amplitude: 25, phase: Math.PI / 3 },
  { id: 'meta', label: 'Meta', color: '#10B981', startY: 220, amplitude: 35, phase: Math.PI / 2 },
  { id: 'crm', label: 'CRM', color: '#F59E0B', startY: 290, amplitude: 20, phase: Math.PI },
  { id: 'rev', label: 'Revenue', color: '#8B5CF6', startY: 360, amplitude: 28, phase: Math.PI * 1.5 },
];

export default function PrismAlignment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [phase, setPhase] = useState<'chaos' | 'converging' | 'unified' | 'laser'>('chaos');

  useEffect(() => {
    if (!isInView) return;
    
    const timeline = [
      { phase: 'converging' as const, at: 800 },
      { phase: 'unified' as const, at: 2000 },
      { phase: 'laser' as const, at: 3000 },
    ];
    
    timeline.forEach(({ phase: p, at }) => {
      setTimeout(() => setPhase(p), at);
    });
  }, [isInView]);

  // Canvas animation for chaotic beams
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 800;
    canvas.height = 450;
    
    let animationId: number;
    let time = 0;
    
    const draw = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = 400;
      const centerY = 225;
      
      // Draw chaotic beams (left side)
      if (phase === 'chaos' || phase === 'converging') {
        CHAOTIC_BEAMS.forEach((beam, i) => {
          ctx.beginPath();
          ctx.strokeStyle = beam.color;
          ctx.lineWidth = 4;
          ctx.globalAlpha = phase === 'converging' ? 0.5 : 0.8;
          
          // Calculate end point (converging to center)
          const endY = phase === 'converging' 
            ? centerY + (beam.startY - centerY) * 0.3
            : beam.startY;
          
          // Wavy path
          ctx.moveTo(0, beam.startY);
          
          for (let x = 0; x < centerX - 50; x += 5) {
            const progress = x / (centerX - 50);
            const wave = Math.sin(time * 2 + beam.phase + x * 0.02) * beam.amplitude * (1 - progress);
            const y = beam.startY + (endY - beam.startY) * progress + wave;
            ctx.lineTo(x, y);
          }
          
          ctx.stroke();
        });
      }
      
      // Draw unified indigo laser (right side)
      if (phase === 'unified' || phase === 'laser') {
        const laserWidth = phase === 'laser' ? 12 : 8;
        
        // Glow effect
        ctx.beginPath();
        ctx.strokeStyle = '#4F46E5';
        ctx.lineWidth = laserWidth + 20;
        ctx.globalAlpha = 0.1;
        ctx.moveTo(centerX + 50, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();
        
        // Main beam
        ctx.beginPath();
        ctx.strokeStyle = '#4F46E5';
        ctx.lineWidth = laserWidth;
        ctx.globalAlpha = 1;
        ctx.moveTo(centerX + 50, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();
        
        // Core bright line
        ctx.beginPath();
        ctx.strokeStyle = '#818CF8';
        ctx.lineWidth = laserWidth / 2;
        ctx.moveTo(centerX + 50, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();
        
        // Traveling particles
        if (phase === 'laser') {
          for (let i = 0; i < 5; i++) {
            const particleX = ((time * 200 + i * 100) % (canvas.width - centerX - 50)) + centerX + 50;
            ctx.beginPath();
            ctx.fillStyle = '#C7D2FE';
            ctx.globalAlpha = 0.8;
            ctx.arc(particleX, centerY, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => cancelAnimationFrame(animationId);
  }, [phase]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 50%, #F8FAFC 100%)',
      }}
    >
      {/* Labels */}
      <div className="absolute top-8 left-8 z-20">
        <div className="text-xs font-mono text-depth-light tracking-widest mb-2">
          SCENE_03 // PLATFORM_CONSOLIDATION
        </div>
        <div className="text-lg font-bold text-depth-deep">
          プリズムの統合
        </div>
      </div>

      {/* Canvas for beam animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* Source Labels (Left) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-6">
        {CHAOTIC_BEAMS.map((beam, i) => (
          <motion.div
            key={beam.id}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: phase === 'chaos' || phase === 'converging' ? 1 : 0,
              x: phase === 'chaos' || phase === 'converging' ? 0 : -20,
            }}
            transition={{ delay: i * 0.1 }}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: beam.color }}
            />
            <span className="text-xs font-mono text-depth-light">{beam.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Crystal Lens (Center) */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        animate={{
          scale: phase === 'unified' || phase === 'laser' ? 1.1 : 1,
        }}
      >
        {/* Lens Glow */}
        <motion.div
          className="absolute inset-0 w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            scale: phase === 'laser' ? [1, 1.5, 1] : 1,
            opacity: phase === 'laser' ? [0.5, 1, 0.5] : 0.5,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Crystal Shape */}
        <div 
          className="relative w-24 h-24 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(238, 242, 255, 0.9) 100%)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            boxShadow: phase === 'laser'
              ? '0 0 40px rgba(79, 70, 229, 0.4), inset 0 0 20px rgba(79, 70, 229, 0.1)'
              : '0 10px 30px rgba(100, 116, 139, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.5)',
          }}
        >
          {/* Inner Highlight */}
          <div 
            className="absolute top-3 left-3 w-8 h-8"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, transparent 100%)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            }}
          />
          
          {/* F Logo */}
          <motion.span 
            className="text-2xl font-bold relative z-10"
            style={{ 
              color: phase === 'laser' ? '#4F46E5' : '#64748B',
            }}
            animate={{
              textShadow: phase === 'laser' 
                ? '0 0 20px rgba(79, 70, 229, 0.5)'
                : 'none',
            }}
          >
            F
          </motion.span>
        </div>

        {/* Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs font-mono text-techIndigo-muted">FIFTHKEYS_CORE</span>
        </div>
      </motion.div>

      {/* Output Label (Right) */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 text-right"
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: phase === 'laser' ? 1 : 0,
          x: phase === 'laser' ? 0 : 20,
        }}
      >
        <div className="text-lg font-bold text-techIndigo-pure">
          統合レーザー
        </div>
        <div className="text-sm text-depth-light">
          一本の収益ビームへ
        </div>
        <motion.div 
          className="mt-2 text-xs font-mono text-techIndigo-muted"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          POWER: MAXIMUM
        </motion.div>
      </motion.div>

      {/* Bottom Message */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: phase === 'laser' ? 1 : 0,
          y: phase === 'laser' ? 0 : 20,
        }}
        transition={{ delay: 0.3 }}
      >
        <div className="px-6 py-3 bg-white/70 backdrop-blur-xl rounded-full border border-techIndigo-pure/20 shadow-tech-md">
          <span className="text-sm font-medium text-depth-deep">
            混沌を、集中した収益力へ。
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
