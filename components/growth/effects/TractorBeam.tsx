"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  captured: boolean;
  type: "ota" | "direct";
}

/**
 * TractorBeam
 * 
 * Visualizes 'Direct Booking Capture':
 * - Particles (Guests) float aimlessly in the "OTA zone"
 * - A 'FifthKeys Magnet' activates
 * - Particles curve elegantly into the 'Direct' bucket
 * - HUD Badge updates: "COMMISSION_SAVED: +18%"
 */

export default function TractorBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });
  const [activated, setActivated] = useState(false);
  const [capturedCount, setCapturedCount] = useState(0);
  const [commission, setCommission] = useState(0);
  
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  // Initialize particles
  useEffect(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        id: i,
        x: Math.random() * 800,
        y: Math.random() * 400,
        size: 3 + Math.random() * 4,
        speed: 0.5 + Math.random() * 1,
        angle: Math.random() * Math.PI * 2,
        captured: false,
        type: Math.random() > 0.3 ? "ota" : "direct",
      });
    }
    particlesRef.current = particles;
  }, []);

  // Activate beam when in view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setActivated(true), 500);
      return () => clearTimeout(timer);
    } else {
      setActivated(false);
      setCapturedCount(0);
      setCommission(0);
      particlesRef.current.forEach(p => p.captured = false);
    }
  }, [isInView]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = 800;
    canvas.height = 400;
    
    const magnetX = 650;
    const magnetY = 200;
    const captureRadius = 40;
    const pullRadius = 300;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw beam effect when activated
      if (activated) {
        const gradient = ctx.createRadialGradient(magnetX, magnetY, 0, magnetX, magnetY, pullRadius);
        gradient.addColorStop(0, "rgba(0, 217, 255, 0.3)");
        gradient.addColorStop(0.5, "rgba(0, 217, 255, 0.1)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Spiral lines
        ctx.strokeStyle = "rgba(0, 217, 255, 0.2)";
        ctx.lineWidth = 1;
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
          ctx.beginPath();
          ctx.moveTo(magnetX, magnetY);
          const endX = magnetX + Math.cos(a) * pullRadius;
          const endY = magnetY + Math.sin(a) * pullRadius;
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
      }
      
      // Update and draw particles
      let newCaptured = 0;
      
      particlesRef.current.forEach(particle => {
        if (!particle.captured) {
          if (activated) {
            // Calculate distance to magnet
            const dx = magnetX - particle.x;
            const dy = magnetY - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < pullRadius && particle.type === "direct") {
              // Pull towards magnet with increasing force
              const force = (1 - dist / pullRadius) * 3;
              particle.x += (dx / dist) * force;
              particle.y += (dy / dist) * force;
              
              // Check if captured
              if (dist < captureRadius) {
                particle.captured = true;
                newCaptured++;
              }
            } else {
              // Random drift
              particle.x += Math.cos(particle.angle) * particle.speed;
              particle.y += Math.sin(particle.angle) * particle.speed;
              particle.angle += (Math.random() - 0.5) * 0.1;
            }
          } else {
            // Random drift
            particle.x += Math.cos(particle.angle) * particle.speed * 0.5;
            particle.y += Math.sin(particle.angle) * particle.speed * 0.5;
            particle.angle += (Math.random() - 0.5) * 0.05;
          }
          
          // Wrap around
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
        }
        
        // Draw particle
        if (!particle.captured) {
          const color = particle.type === "direct" 
            ? "rgba(0, 217, 255, 0.8)" 
            : "rgba(244, 63, 94, 0.5)";
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
          
          // Glow for direct particles
          if (particle.type === "direct") {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 217, 255, 0.1)";
            ctx.fill();
          }
        }
      });
      
      // Draw magnet
      ctx.beginPath();
      ctx.arc(magnetX, magnetY, 30, 0, Math.PI * 2);
      ctx.fillStyle = activated 
        ? "rgba(0, 217, 255, 0.3)" 
        : "rgba(255, 255, 255, 0.1)";
      ctx.fill();
      ctx.strokeStyle = activated ? "#00D9FF" : "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw "F" logo
      ctx.fillStyle = activated ? "#00D9FF" : "rgba(255, 255, 255, 0.5)";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("F", magnetX, magnetY);
      
      // Update counters
      if (newCaptured > 0) {
        const totalCaptured = particlesRef.current.filter(p => p.captured).length;
        setCapturedCount(totalCaptured);
        setCommission(Math.round(totalCaptured * 1.5));
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationRef.current);
  }, [activated]);

  return (
    <div ref={containerRef} className="relative">
      {/* Canvas */}
      <div className="relative rounded-2xl overflow-hidden bg-obsidian-core/50 backdrop-blur">
        <canvas ref={canvasRef} className="w-full h-auto" />
        
        {/* OTA Zone Label */}
        <div className="absolute top-4 left-4 text-[10px] font-mono text-biolume-rose/60 uppercase tracking-widest">
          OTA_ZONE // COMMISSION: 15-25%
        </div>
        
        {/* Direct Zone Label */}
        <div className="absolute top-4 right-4 text-[10px] font-mono text-biolume-cyan uppercase tracking-widest">
          DIRECT_CAPTURE_ZONE
        </div>
        
        {/* HUD Overlay */}
        <AnimatePresence>
          {activated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 right-4 bg-obsidian-surface/80 backdrop-blur-xl border border-biolume-cyan/30 rounded-lg px-4 py-3"
            >
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">
                COMMISSION_SAVED
              </div>
              <div className="text-2xl font-bold font-mono text-biolume-emerald">
                +{commission}%
              </div>
              <div className="text-[10px] font-mono text-white/30">
                GUESTS_CAPTURED: {capturedCount}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Activation Status */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor: activated ? "#00D9FF" : "#64748b",
              boxShadow: activated ? "0 0 10px #00D9FF" : "none",
            }}
          />
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
            {activated ? "BEAM_ACTIVE" : "STANDBY"}
          </span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-8 mt-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-biolume-rose/50" />
          <span className="text-white/40">OTA Guest</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-biolume-cyan" />
          <span className="text-white/40">Direct Potential</span>
        </div>
      </div>
    </div>
  );
}
