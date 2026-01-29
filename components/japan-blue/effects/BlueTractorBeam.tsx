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
 * BlueTractorBeam
 * 
 * SAME PHYSICS as Growth version:
 * - Particles drift in OTA zone
 * - Magnet activates and pulls "direct" particles
 * - Commission saved counter increases
 * 
 * VISUAL TRANSFORMATION:
 * - Dark background → Light transparent background
 * - Cyan magnet → Royal Blue magnet
 * - Rose OTA → Red-600 OTA
 * - Cyan direct → Royal Blue direct
 */

export default function BlueTractorBeam() {
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
      // Clear with light background
      ctx.fillStyle = "rgba(248, 250, 252, 0.95)"; // slate-50
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw beam effect when activated (Royal Blue)
      if (activated) {
        const gradient = ctx.createRadialGradient(magnetX, magnetY, 0, magnetX, magnetY, pullRadius);
        gradient.addColorStop(0, "rgba(37, 99, 235, 0.2)");
        gradient.addColorStop(0.5, "rgba(37, 99, 235, 0.08)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Spiral lines (Royal Blue)
        ctx.strokeStyle = "rgba(37, 99, 235, 0.15)";
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
            const dx = magnetX - particle.x;
            const dy = magnetY - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < pullRadius && particle.type === "direct") {
              const force = (1 - dist / pullRadius) * 3;
              particle.x += (dx / dist) * force;
              particle.y += (dy / dist) * force;
              
              if (dist < captureRadius) {
                particle.captured = true;
                newCaptured++;
              }
            } else {
              particle.x += Math.cos(particle.angle) * particle.speed;
              particle.y += Math.sin(particle.angle) * particle.speed;
              particle.angle += (Math.random() - 0.5) * 0.1;
            }
          } else {
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
          // OTA = Red, Direct = Royal Blue
          const color = particle.type === "direct" 
            ? "rgba(37, 99, 235, 0.8)" 
            : "rgba(220, 38, 38, 0.5)";
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
          
          // Glow for direct particles
          if (particle.type === "direct") {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(37, 99, 235, 0.1)";
            ctx.fill();
          }
        }
      });
      
      // Draw magnet
      ctx.beginPath();
      ctx.arc(magnetX, magnetY, 30, 0, Math.PI * 2);
      ctx.fillStyle = activated 
        ? "rgba(37, 99, 235, 0.2)" 
        : "rgba(100, 116, 139, 0.1)";
      ctx.fill();
      ctx.strokeStyle = activated ? "#2563EB" : "rgba(100, 116, 139, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw "F" logo
      ctx.fillStyle = activated ? "#2563EB" : "rgba(100, 116, 139, 0.5)";
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
      {/* Canvas Container */}
      <div 
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(37, 99, 235, 0.1)",
          boxShadow: "0 10px 30px -10px rgba(37, 99, 235, 0.1)",
        }}
      >
        <canvas ref={canvasRef} className="w-full h-auto" />
        
        {/* OTA Zone Label - Shows the 25% pain */}
        <div className="absolute top-4 left-4 text-[10px] font-mono text-red-600/70 uppercase tracking-widest">
          OTAゾーン // 手数料: 25%
        </div>
        
        {/* Direct Zone Label - Shows the 3% solution */}
        <div className="absolute top-4 right-4 text-[10px] font-mono text-royal-pure uppercase tracking-widest">
          直接予約 // 手数料: 3%
        </div>
        
        {/* HUD Overlay */}
        <AnimatePresence>
          {activated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 right-4 rounded-lg px-4 py-3"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.1)",
              }}
            >
              <div className="text-[10px] font-mono text-ink-light uppercase tracking-widest mb-1">
                節約手数料
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-600">
                +{commission}%
              </div>
              <div className="text-[10px] font-mono text-ink-light">
                獲得ゲスト: {capturedCount}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Activation Status */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor: activated ? "#2563EB" : "#64748b",
              boxShadow: activated ? "0 0 10px #2563EB" : "none",
            }}
          />
          <span className="text-[10px] font-mono text-ink-light uppercase tracking-widest">
            {activated ? "ビーム稼働中" : "待機中"}
          </span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-8 mt-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <span className="text-ink-body">OTAゲスト</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-royal-pure" />
          <span className="text-ink-body">直接獲得可能</span>
        </div>
      </div>
    </div>
  );
}
