"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useGrowthScroll } from "./SmoothScroll";

export default function LivingHorizon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { velocity, zDepth, phase } = useGrowthScroll();
  
  // Cursor velocity tracking
  const cursorVelocity = useMotionValue(0);
  const lastCursor = useRef({ x: 0, y: 0, time: Date.now() });
  
  // Grid color based on velocity (Slate -> Amber)
  const gridHue = useSpring(cursorVelocity, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(now - lastCursor.current.time, 1);
      const dx = e.clientX - lastCursor.current.x;
      const dy = e.clientY - lastCursor.current.y;
      const v = Math.sqrt(dx * dx + dy * dy) / dt;
      
      cursorVelocity.set(Math.min(v * 10, 1));
      
      lastCursor.current = { x: e.clientX, y: e.clientY, time: now };
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorVelocity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationId: number;
    let time = 0;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener("resize", resize);
    
    const draw = () => {
      time += 0.01;
      
      const width = canvas.width;
      const height = canvas.height;
      const horizonY = height * 0.4; // Horizon line at 40%
      
      // Clear with obsidian gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#000000");
      bgGrad.addColorStop(0.4, "#020617");
      bgGrad.addColorStop(1, "#0a0f1c");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
      
      // Get dynamic values
      const v = gridHue.get();
      const z = zDepth.get();
      const scrollVel = velocity.get();
      
      // Color interpolation: Slate (#64748b) -> Amber (#f59e0b)
      const r = Math.floor(100 + v * 145);
      const g = Math.floor(116 + v * 42);
      const b = Math.floor(139 - v * 128);
      const baseColor = `rgb(${r}, ${g}, ${b})`;
      
      // Pulse opacity based on activity
      const pulseOpacity = 0.15 + Math.sin(time * 2) * 0.05 + scrollVel * 0.1;
      
      // === CURVED HORIZON GRID ===
      ctx.save();
      
      // Perspective parameters
      const perspective = 600 + z * 0.5;
      const gridLines = 40;
      const gridSpacing = 60;
      
      // Draw horizontal curved lines
      for (let i = 0; i < gridLines; i++) {
        const zPos = i * gridSpacing - (time * 100 + z * 0.5) % gridSpacing;
        if (zPos < 0) continue;
        
        const scale = perspective / (perspective + zPos);
        const y = horizonY + (height - horizonY) * scale;
        const alpha = Math.max(0, 1 - zPos / (gridLines * gridSpacing)) * pulseOpacity;
        
        // Curve the line using quadratic bezier
        const curvature = (1 - scale) * 100;
        
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = scale * 2;
        ctx.beginPath();
        ctx.moveTo(0, y + curvature);
        ctx.quadraticCurveTo(width / 2, y - curvature * 0.5, width, y + curvature);
        ctx.stroke();
      }
      
      // Draw vertical lines converging to horizon
      const numVerticals = 30;
      for (let i = -numVerticals / 2; i <= numVerticals / 2; i++) {
        const x = width / 2 + i * (width / numVerticals) * 1.5;
        const alpha = (1 - Math.abs(i) / (numVerticals / 2)) * pulseOpacity * 0.5;
        
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(width / 2, horizonY * 0.7);
        ctx.stroke();
      }
      
      ctx.restore();
      
      // === HORIZON GLOW ===
      const horizonGlow = ctx.createRadialGradient(
        width / 2, horizonY, 0,
        width / 2, horizonY, width * 0.6
      );
      
      if (v > 0.5) {
        // Amber glow for high velocity
        horizonGlow.addColorStop(0, `rgba(245, 158, 11, ${0.2 * v})`);
        horizonGlow.addColorStop(0.5, `rgba(245, 158, 11, ${0.1 * v})`);
      } else {
        // Cyan glow for idle
        horizonGlow.addColorStop(0, `rgba(0, 217, 255, ${0.15 - v * 0.1})`);
        horizonGlow.addColorStop(0.5, `rgba(0, 217, 255, ${0.05})`);
      }
      horizonGlow.addColorStop(1, "transparent");
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, 0, width, height);
      
      // === WASHI PAPER TEXTURE (Optimized) ===
      // Only render every 3rd frame for performance
      if (Math.floor(time * 60) % 3 === 0) {
        ctx.globalAlpha = 0.02;
        ctx.fillStyle = "#faf8f5";
        
        // Sparse noise pattern instead of full coverage
        for (let i = 0; i < 500; i++) {
          const nx = Math.random() * width;
          const ny = Math.random() * height;
          const size = Math.random() * 2;
          ctx.fillRect(nx, ny, size, size);
        }
        ctx.globalAlpha = 1;
      }
      
      // === VIGNETTE ===
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.3,
        width / 2, height / 2, height
      );
      vignette.addColorStop(0, "transparent");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.7)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [gridHue, zDepth, velocity]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Phase indicator overlay */}
      <motion.div
        className="absolute bottom-8 left-8 text-[10px] font-mono uppercase tracking-widest"
        animate={{
          color: phase === "chaos" ? "#f43f5e" : phase === "alignment" ? "#00D9FF" : "#10B981",
        }}
      >
        PHASE: {phase.toUpperCase()}
      </motion.div>
    </div>
  );
}
