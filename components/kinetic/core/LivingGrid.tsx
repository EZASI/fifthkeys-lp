"use client";

import { useRef, useEffect } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useOrchestrator } from "./ScrollOrchestrator";

export default function LivingGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gridSpeed, scrollProgress, mouseX, mouseY } = useOrchestrator();
  
  // Z-translation for infinite tunnel effect
  const zOffset = useMotionValue(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationId: number;
    let gridZ = 0;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener("resize", resize);
    
    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Clear with deep space color
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);
      
      // Get current speed
      const speed = gridSpeed.get();
      gridZ += speed * 0.5;
      
      // Grid parameters
      const gridSize = 80;
      const perspective = 800;
      const maxZ = 2000;
      
      // Draw perspective grid lines
      ctx.strokeStyle = "rgba(0, 217, 255, 0.08)";
      ctx.lineWidth = 1;
      
      // Horizontal lines (moving towards viewer)
      for (let z = gridZ % gridSize; z < maxZ; z += gridSize) {
        const scale = perspective / (perspective + z);
        const y = centerY + (height * 0.8) * scale;
        const lineWidth = width * scale * 1.5;
        const alpha = Math.max(0, 1 - z / maxZ) * 0.15;
        
        ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(centerX - lineWidth, y);
        ctx.lineTo(centerX + lineWidth, y);
        ctx.stroke();
      }
      
      // Vertical lines (converging to horizon)
      const numVerticals = 30;
      for (let i = -numVerticals; i <= numVerticals; i++) {
        const x = centerX + (i * gridSize);
        ctx.strokeStyle = "rgba(0, 217, 255, 0.05)";
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(centerX, centerY * 0.3);
        ctx.stroke();
      }
      
      // Add glow at horizon
      const gradient = ctx.createRadialGradient(
        centerX, centerY * 0.5, 0,
        centerX, centerY * 0.5, width * 0.4
      );
      gradient.addColorStop(0, "rgba(0, 217, 255, 0.1)");
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.05)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Mouse-influenced light bloom
      const mx = mouseX.get() * width;
      const my = mouseY.get() * height;
      const mouseGradient = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
      mouseGradient.addColorStop(0, "rgba(0, 217, 255, 0.05)");
      mouseGradient.addColorStop(1, "transparent");
      ctx.fillStyle = mouseGradient;
      ctx.fillRect(0, 0, width, height);
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [gridSpeed, mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      
      {/* Scanline sweep (every 10s) */}
      <motion.div
        className="absolute inset-x-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0, 217, 255, 0.03), transparent)",
        }}
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(2, 6, 23, 0.9) 100%)",
        }}
      />
      
      {/* Film grain noise */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
