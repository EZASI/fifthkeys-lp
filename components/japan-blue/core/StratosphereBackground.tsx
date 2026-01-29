"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useBlueScroll } from "./SmoothScroll";

/**
 * StratosphereBackground - Deep Ocean / Digital Dawn Theme
 * 
 * - Base: #000B18 (Deep Void)
 * - Gradient: radial from #002A5A to #000B18
 * - Animated perspective grid with cyan lines
 * - Slow forward march animation (infinite scroll)
 */

const TOKENS = {
  deepVoid: "#000B18",
  oceanBlue: "#002A5A",
  electricCyan: "#00E5FF",
  royalBlue: "#1E50FF",
};

export default function StratosphereBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Try to get scroll context, fallback to defaults if not available
  let scrollContext: ReturnType<typeof useBlueScroll> | null = null;
  try {
    scrollContext = useBlueScroll();
  } catch {
    // Not in scroll context, use defaults
  }
  
  const velocity = scrollContext?.velocity ?? useMotionValue(0);
  const zDepth = scrollContext?.zDepth ?? useMotionValue(0);
  const phase = scrollContext?.phase ?? "ascent";
  
  // Cursor velocity tracking
  const cursorVelocity = useMotionValue(0);
  const lastCursor = useRef({ x: 0, y: 0, time: Date.now() });
  
  // Grid intensity based on velocity
  const gridIntensity = useSpring(cursorVelocity, { damping: 30, stiffness: 100 });

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
      time += 0.008; // Slow forward march
      
      const width = canvas.width;
      const height = canvas.height;
      const horizonY = height * 0.25; // Horizon line at 25%
      
      // === DEEP OCEAN GRADIENT ===
      const bgGrad = ctx.createRadialGradient(
        width / 2, -height * 0.2, 0,
        width / 2, -height * 0.2, Math.max(width, height) * 1.2
      );
      bgGrad.addColorStop(0, TOKENS.oceanBlue);
      bgGrad.addColorStop(0.5, "#001529");
      bgGrad.addColorStop(1, TOKENS.deepVoid);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
      
      // Get dynamic values
      const v = gridIntensity.get();
      const z = zDepth.get();
      const scrollVel = velocity.get();
      
      // === PERSPECTIVE GRID (Retro-futurism) ===
      const baseAlpha = 0.03 + v * 0.04;
      
      ctx.save();
      
      // Perspective parameters
      const perspective = 500 + z * 0.3;
      const gridLines = 50;
      const gridSpacing = 50;
      
      // Draw horizontal lines (perspective grid floor)
      for (let i = 0; i < gridLines; i++) {
        const zPos = i * gridSpacing - (time * 60 + z * 0.3) % gridSpacing;
        if (zPos < 0) continue;
        
        const scale = perspective / (perspective + zPos);
        const y = horizonY + (height - horizonY) * scale;
        const alpha = Math.max(0, 1 - zPos / (gridLines * gridSpacing)) * baseAlpha;
        
        // Electric Cyan lines
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.lineWidth = scale * 1.2;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Draw vertical lines converging to horizon center
      const numVerticals = 40;
      for (let i = -numVerticals / 2; i <= numVerticals / 2; i++) {
        const xBottom = width / 2 + i * (width / numVerticals) * 2;
        const alpha = (1 - Math.abs(i) / (numVerticals / 2)) * baseAlpha * 0.8;
        
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(xBottom, height);
        ctx.lineTo(width / 2, horizonY);
        ctx.stroke();
      }
      
      ctx.restore();
      
      // === HORIZON GLOW ===
      const horizonGlow = ctx.createRadialGradient(
        width / 2, horizonY, 0,
        width / 2, horizonY, width * 0.6
      );
      
      const glowIntensity = 0.15 + scrollVel * 0.05 + v * 0.1;
      horizonGlow.addColorStop(0, `rgba(30, 80, 255, ${glowIntensity})`);
      horizonGlow.addColorStop(0.3, `rgba(0, 229, 255, ${glowIntensity * 0.3})`);
      horizonGlow.addColorStop(1, "transparent");
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, 0, width, height);
      
      // === AMBIENT PARTICLES ===
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < 50; i++) {
        const px = (Math.sin(time * 0.5 + i * 0.5) * 0.5 + 0.5) * width;
        const py = (Math.cos(time * 0.3 + i * 0.7) * 0.5 + 0.5) * height;
        const size = 1 + Math.sin(time + i) * 0.5;
        
        ctx.fillStyle = `rgba(0, 229, 255, ${0.2 + Math.sin(time + i) * 0.1})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      
      // === EDGE VIGNETTE (darker at corners) ===
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.3,
        width / 2, height / 2, height
      );
      vignette.addColorStop(0, "transparent");
      vignette.addColorStop(1, "rgba(0, 11, 24, 0.6)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [gridIntensity, zDepth, velocity]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Phase indicator overlay */}
      <motion.div
        className="absolute bottom-8 left-8 text-[10px] font-mono uppercase tracking-widest"
        animate={{
          color: phase === "ascent" ? TOKENS.electricCyan : phase === "cruise" ? TOKENS.royalBlue : "#00F59B",
        }}
      >
        フェーズ: {phase === "ascent" ? "上昇" : phase === "cruise" ? "巡航" : "軌道"}
      </motion.div>
    </div>
  );
}
