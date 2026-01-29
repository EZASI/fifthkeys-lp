"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useGrowthScroll } from "../core/SmoothScroll";

interface Node {
  lat: number;
  lng: number;
  size: number;
  pulse: number;
  label?: string;
}

// Hotel network nodes (simulated global distribution)
const NODES: Node[] = [
  { lat: 35.6762, lng: 139.6503, size: 8, pulse: 0, label: "Tokyo" },
  { lat: 34.6937, lng: 135.5023, size: 6, pulse: 0.2, label: "Osaka" },
  { lat: 35.0116, lng: 135.7681, size: 5, pulse: 0.4, label: "Kyoto" },
  { lat: 43.0618, lng: 141.3545, size: 4, pulse: 0.6, label: "Sapporo" },
  { lat: 26.2124, lng: 127.6809, size: 4, pulse: 0.8, label: "Okinawa" },
  { lat: 33.5904, lng: 130.4017, size: 5, pulse: 1.0 },
  { lat: 34.3853, lng: 132.4553, size: 4, pulse: 1.2 },
  { lat: 38.2682, lng: 140.8694, size: 4, pulse: 1.4 },
];

export default function HolographicGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  let scrollContext: ReturnType<typeof useGrowthScroll> | null = null;
  try {
    scrollContext = useGrowthScroll();
  } catch {
    // Not in scroll context
  }
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const smoothRotation = useSpring(rotation, { damping: 50, stiffness: 100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationId: number;
    let time = 0;
    
    const resize = () => {
      const size = Math.min(500, window.innerWidth - 64);
      canvas.width = size;
      canvas.height = size;
    };
    
    resize();
    window.addEventListener("resize", resize);
    
    const draw = () => {
      time += 0.01;
      
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.4;
      
      // Clear
      ctx.clearRect(0, 0, width, height);
      
      // Get rotation from scroll
      const rot = (smoothRotation.get() * Math.PI) / 180;
      
      // === GLOBE WIREFRAME ===
      ctx.strokeStyle = "rgba(0, 217, 255, 0.15)";
      ctx.lineWidth = 1;
      
      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 20) {
        const latRad = (lat * Math.PI) / 180;
        const r = radius * Math.cos(latRad);
        const y = centerY - radius * Math.sin(latRad);
        
        ctx.beginPath();
        ctx.ellipse(centerX, y, r, r * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Longitude lines
      for (let lng = 0; lng < 180; lng += 30) {
        const lngRad = ((lng + rot * 30) * Math.PI) / 180;
        
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const latRad = (lat * Math.PI) / 180;
          const x = centerX + radius * Math.cos(latRad) * Math.sin(lngRad);
          const y = centerY - radius * Math.sin(latRad);
          const z = Math.cos(latRad) * Math.cos(lngRad);
          
          if (z > 0) {
            if (lat === -90) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      
      // === NODES ===
      NODES.forEach((node, i) => {
        const latRad = (node.lat * Math.PI) / 180;
        const lngRad = ((node.lng + rot * 30) * Math.PI) / 180;
        
        const x = centerX + radius * Math.cos(latRad) * Math.sin(lngRad);
        const y = centerY - radius * Math.sin(latRad);
        const z = Math.cos(latRad) * Math.cos(lngRad);
        
        // Only draw if on visible side
        if (z > 0) {
          // Pulse animation
          const pulseSize = node.size + Math.sin(time * 2 + node.pulse * Math.PI) * 2;
          
          // Node glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize * 3);
          gradient.addColorStop(0, "rgba(0, 217, 255, 0.6)");
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.fillRect(x - pulseSize * 3, y - pulseSize * 3, pulseSize * 6, pulseSize * 6);
          
          // Node core
          ctx.beginPath();
          ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = "#00D9FF";
          ctx.fill();
          
          // Connection lines to nearby nodes (visible ones)
          ctx.strokeStyle = "rgba(0, 217, 255, 0.1)";
          ctx.lineWidth = 1;
          
          NODES.slice(i + 1).forEach(other => {
            const otherLatRad = (other.lat * Math.PI) / 180;
            const otherLngRad = ((other.lng + rot * 30) * Math.PI) / 180;
            const otherZ = Math.cos(otherLatRad) * Math.cos(otherLngRad);
            
            if (otherZ > 0) {
              const otherX = centerX + radius * Math.cos(otherLatRad) * Math.sin(otherLngRad);
              const otherY = centerY - radius * Math.sin(otherLatRad);
              
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(otherX, otherY);
              ctx.stroke();
            }
          });
        }
      });
      
      // === OUTER RING ===
      ctx.strokeStyle = "rgba(0, 217, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.15, 0, Math.PI * 2);
      ctx.stroke();
      
      // Tick marks
      for (let a = 0; a < 360; a += 15) {
        const aRad = (a * Math.PI) / 180;
        const inner = radius * 1.12;
        const outer = radius * 1.18;
        
        ctx.strokeStyle = a % 90 === 0 
          ? "rgba(0, 217, 255, 0.5)" 
          : "rgba(0, 217, 255, 0.15)";
        ctx.lineWidth = a % 90 === 0 ? 2 : 1;
        
        ctx.beginPath();
        ctx.moveTo(centerX + inner * Math.cos(aRad), centerY + inner * Math.sin(aRad));
        ctx.lineTo(centerX + outer * Math.cos(aRad), centerY + outer * Math.sin(aRad));
        ctx.stroke();
      }
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [smoothRotation]);

  return (
    <div ref={containerRef} className="relative">
      {/* Globe Container */}
      <div className="relative flex items-center justify-center">
        <canvas ref={canvasRef} className="max-w-full" />
        
        {/* Center Logo */}
        <motion.div
          className="absolute w-16 h-16 flex items-center justify-center"
          animate={{ 
            boxShadow: [
              "0 0 30px rgba(0, 217, 255, 0.3)",
              "0 0 60px rgba(0, 217, 255, 0.5)",
              "0 0 30px rgba(0, 217, 255, 0.3)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-full h-full rounded-full bg-obsidian-core/80 backdrop-blur-xl border border-biolume-cyan/30 flex items-center justify-center">
            <span className="text-2xl font-bold text-biolume-cyan">F</span>
          </div>
        </motion.div>
      </div>
      
      {/* Stats Ring */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-center pb-4">
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">NETWORK_STATUS</div>
          <div className="text-sm font-mono text-biolume-cyan">547 ACTIVE</div>
        </div>
        
        {/* Right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full text-left pl-4">
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">LATENCY</div>
          <div className="text-sm font-mono text-biolume-emerald">0.3ms AVG</div>
        </div>
        
        {/* Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full text-center pt-4">
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">COVERAGE</div>
          <div className="text-sm font-mono text-biolume-amber">47 PREFECTURES</div>
        </div>
        
        {/* Left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full text-right pr-4">
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">UPTIME</div>
          <div className="text-sm font-mono text-biolume-cyan">99.99%</div>
        </div>
      </div>
    </div>
  );
}
