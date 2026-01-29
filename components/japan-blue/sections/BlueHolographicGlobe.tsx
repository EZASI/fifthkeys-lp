"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useBlueScroll } from "../core/SmoothScroll";

interface Node {
  lat: number;
  lng: number;
  size: number;
  pulse: number;
  label: string;
  hotels: number; // Number of hotels in this city
}

interface DataParticle {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

// Hotel network nodes (Japanese distribution) - All have labels and hotel counts
const NODES: Node[] = [
  { lat: 35.6762, lng: 139.6503, size: 10, pulse: 0, label: "東京", hotels: 187 },
  { lat: 34.6937, lng: 135.5023, size: 8, pulse: 0.2, label: "大阪", hotels: 124 },
  { lat: 35.0116, lng: 135.7681, size: 7, pulse: 0.4, label: "京都", hotels: 89 },
  { lat: 43.0618, lng: 141.3545, size: 6, pulse: 0.6, label: "札幌", hotels: 56 },
  { lat: 26.2124, lng: 127.6809, size: 6, pulse: 0.8, label: "沖縄", hotels: 42 },
  { lat: 33.5904, lng: 130.4017, size: 5, pulse: 1.0, label: "福岡", hotels: 38 },
  { lat: 34.3853, lng: 132.4553, size: 5, pulse: 1.2, label: "広島", hotels: 27 },
  { lat: 38.2682, lng: 140.8694, size: 5, pulse: 1.4, label: "仙台", hotels: 31 },
];

export default function BlueHolographicGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visibleLabels, setVisibleLabels] = useState<{x: number; y: number; label: string; hotels: number}[]>([]);
  const particlesRef = useRef<DataParticle[]>([]);
  
  let scrollContext: ReturnType<typeof useBlueScroll> | null = null;
  try {
    scrollContext = useBlueScroll();
  } catch {
    // Not in scroll context
  }
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const smoothRotation = useSpring(rotation, { damping: 50, stiffness: 100 });

  // Initialize data particles
  useEffect(() => {
    const createParticles = () => {
      const particles: DataParticle[] = [];
      for (let i = 0; i < 12; i++) {
        particles.push({
          fromNode: Math.floor(Math.random() * NODES.length),
          toNode: Math.floor(Math.random() * NODES.length),
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.005,
        });
      }
      particlesRef.current = particles;
    };
    createParticles();
  }, []);

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
      time += 0.016;
      
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.38;
      
      // Clear with transparent
      ctx.clearRect(0, 0, width, height);
      
      // Get rotation from scroll
      const rot = (smoothRotation.get() * Math.PI) / 180;
      
      // === GLOBE WIREFRAME (Royal Blue) ===
      ctx.strokeStyle = "rgba(37, 99, 235, 0.15)";
      ctx.lineWidth = 1;
      
      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const r = radius * Math.cos(latRad);
        const y = centerY - radius * Math.sin(latRad);
        
        ctx.beginPath();
        ctx.ellipse(centerX, y, r, r * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Longitude lines
      for (let lng = 0; lng < 180; lng += 45) {
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
      
      // Calculate node positions
      const nodePositions: {x: number; y: number; z: number; visible: boolean; node: Node}[] = [];
      
      NODES.forEach((node) => {
        const latRad = (node.lat * Math.PI) / 180;
        const lngRad = ((node.lng + rot * 30) * Math.PI) / 180;
        
        const x = centerX + radius * Math.cos(latRad) * Math.sin(lngRad);
        const y = centerY - radius * Math.sin(latRad);
        const z = Math.cos(latRad) * Math.cos(lngRad);
        
        nodePositions.push({ x, y, z, visible: z > 0, node });
      });
      
      // === CONNECTION LINES (Draw first, below nodes) ===
      nodePositions.forEach((pos, i) => {
        if (!pos.visible) return;
        
        nodePositions.slice(i + 1).forEach((otherPos) => {
          if (!otherPos.visible) return;
          
          // Only connect nearby nodes (creates a network effect)
          const dist = Math.sqrt(Math.pow(pos.x - otherPos.x, 2) + Math.pow(pos.y - otherPos.y, 2));
          if (dist < radius * 1.2) {
            // Gradient line
            const gradient = ctx.createLinearGradient(pos.x, pos.y, otherPos.x, otherPos.y);
            gradient.addColorStop(0, `rgba(37, 99, 235, ${0.3 * pos.z})`);
            gradient.addColorStop(0.5, `rgba(37, 99, 235, ${0.15 * Math.min(pos.z, otherPos.z)})`);
            gradient.addColorStop(1, `rgba(37, 99, 235, ${0.3 * otherPos.z})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(otherPos.x, otherPos.y);
            ctx.stroke();
          }
        });
      });
      
      // === DATA FLOW PARTICLES ===
      particlesRef.current.forEach((particle) => {
        const fromPos = nodePositions[particle.fromNode];
        const toPos = nodePositions[particle.toNode];
        
        if (fromPos?.visible && toPos?.visible) {
          // Interpolate position
          const px = fromPos.x + (toPos.x - fromPos.x) * particle.progress;
          const py = fromPos.y + (toPos.y - fromPos.y) * particle.progress;
          
          // Draw particle with glow
          const glow = ctx.createRadialGradient(px, py, 0, px, py, 8);
          glow.addColorStop(0, "rgba(59, 130, 246, 0.9)");
          glow.addColorStop(0.5, "rgba(59, 130, 246, 0.4)");
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fill();
          
          // Core
          ctx.fillStyle = "#3B82F6";
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Update progress
        particle.progress += particle.speed;
        if (particle.progress > 1) {
          particle.progress = 0;
          particle.fromNode = particle.toNode;
          particle.toNode = Math.floor(Math.random() * NODES.length);
        }
      });
      
      // === NODES (Royal Blue dots with labels) ===
      const newLabels: {x: number; y: number; label: string; hotels: number}[] = [];
      
      nodePositions.forEach((pos, i) => {
        if (!pos.visible) return;
        
        const node = pos.node;
        const pulsePhase = Math.sin(time * 2 + node.pulse * Math.PI);
        const pulseSize = node.size + pulsePhase * 3;
        
        // Outer pulse ring (expanding)
        const ringPhase = (time * 0.5 + node.pulse) % 1;
        const ringRadius = pulseSize + ringPhase * 25;
        const ringAlpha = 0.4 * (1 - ringPhase) * pos.z;
        ctx.strokeStyle = `rgba(37, 99, 235, ${ringAlpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Node glow (Royal Blue) - larger and more prominent
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pulseSize * 4);
        gradient.addColorStop(0, `rgba(37, 99, 235, ${0.6 * pos.z})`);
        gradient.addColorStop(0.5, `rgba(37, 99, 235, ${0.2 * pos.z})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulseSize * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Node outer ring
        ctx.strokeStyle = `rgba(37, 99, 235, ${0.8 * pos.z})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulseSize + 2, 0, Math.PI * 2);
        ctx.stroke();
        
        // Node core (Royal Blue)
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${pos.z})`;
        ctx.fill();
        
        // White center dot
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulseSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * pos.z})`;
        ctx.fill();
        
        // Add label position for overlay
        if (node.label && pos.z > 0.3) {
          newLabels.push({ 
            x: pos.x, 
            y: pos.y, 
            label: node.label, 
            hotels: node.hotels 
          });
        }
      });
      
      // Update labels (throttled)
      if (Math.floor(time * 10) % 5 === 0) {
        setVisibleLabels(newLabels);
      }
      
      // === OUTER RING (Royal Blue) ===
      ctx.strokeStyle = "rgba(37, 99, 235, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
      ctx.stroke();
      
      // Animated scan line
      const scanAngle = time * 0.5;
      ctx.strokeStyle = "rgba(37, 99, 235, 0.6)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.2, scanAngle, scanAngle + 0.3);
      ctx.stroke();
      
      // Tick marks
      for (let a = 0; a < 360; a += 15) {
        const aRad = (a * Math.PI) / 180;
        const inner = radius * 1.15;
        const outer = radius * 1.22;
        
        ctx.strokeStyle = a % 90 === 0 
          ? "rgba(37, 99, 235, 0.6)" 
          : "rgba(37, 99, 235, 0.2)";
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
        
        {/* City Labels Overlay */}
        <AnimatePresence>
          {visibleLabels.map((label, i) => (
            <motion.div
              key={`${label.label}-${i}`}
              className="absolute pointer-events-none"
              style={{ 
                left: label.x + 15, 
                top: label.y - 10,
                transform: "translateY(-50%)",
              }}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className="px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(37, 99, 235, 0.2)",
                  boxShadow: "0 2px 8px rgba(37, 99, 235, 0.15)",
                }}
              >
                <span className="text-royal-pure font-bold">{label.label}</span>
                <span className="text-ink-light ml-1.5 text-[10px]">{label.hotels}施設</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Center Logo */}
        <motion.div
          className="absolute w-20 h-20 flex items-center justify-center"
          animate={{ 
            boxShadow: [
              "0 0 30px rgba(37, 99, 235, 0.15)",
              "0 0 60px rgba(37, 99, 235, 0.3)",
              "0 0 30px rgba(37, 99, 235, 0.15)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div 
            className="w-full h-full rounded-full flex flex-col items-center justify-center"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(37, 99, 235, 0.25)",
            }}
          >
            <span className="text-3xl font-bold text-royal-pure">F</span>
            <span className="text-[8px] font-medium text-ink-light -mt-1">NETWORK</span>
          </div>
        </motion.div>
      </div>
      
      {/* Stats Ring (Japanese labels) - Improved with pulsing effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-center pb-4">
          <div className="text-[10px] font-mono text-ink-light uppercase tracking-widest mb-1">接続ホテル数</div>
          <motion.div 
            className="text-lg font-bold font-mono text-royal-pure"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            594 施設
          </motion.div>
          <div className="text-[10px] text-emerald-600 font-medium">● LIVE</div>
        </div>
        
        {/* Right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full text-left pl-6">
          <div className="text-[10px] font-mono text-ink-light uppercase tracking-widest mb-1">同期速度</div>
          <div className="text-lg font-bold font-mono text-emerald-600">0.3ms</div>
          <div className="text-[10px] text-ink-body">リアルタイム更新</div>
        </div>
        
        {/* Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full text-center pt-4">
          <div className="text-[10px] font-mono text-ink-light uppercase tracking-widest mb-1">日本ネットワーク</div>
          <div className="text-lg font-bold font-mono text-amber-600">47都道府県</div>
          <div className="text-[10px] text-ink-body">全国対応</div>
        </div>
        
        {/* Left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full text-right pr-6">
          <div className="text-[10px] font-mono text-ink-light uppercase tracking-widest mb-1">稼働率</div>
          <div className="text-lg font-bold font-mono text-royal-pure">99.99%</div>
          <div className="text-[10px] text-ink-body">24/7 監視</div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+60px)]">
        <div className="flex items-center gap-6 text-xs text-ink-body">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-royal-pure animate-pulse"></span>
            <span>ホテル接続</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-0.5 bg-gradient-to-r from-royal-pure to-royal-pure/30"></span>
            <span>データ同期</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            <span>通信中</span>
          </div>
        </div>
      </div>
    </div>
  );
}
