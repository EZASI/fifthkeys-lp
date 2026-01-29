"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

/**
 * BluePrismSync Animation
 * 
 * SAME PHYSICS as Growth version:
 * - Single beam → Prism → 5 channel beams
 * 
 * VISUAL TRANSFORMATION (Dark → Light):
 * - White beam becomes Deep Ink beam
 * - Neon colors become muted professional tones
 * - Cyan glow becomes Royal Blue glow
 */

const CHANNELS = [
  { name: "アゴダ", color: "#DC2626", angle: -30, delay: 0 },      // Red-600
  { name: "エクスペディア", color: "#D97706", angle: -15, delay: 0.1 },  // Amber-600
  { name: "直接予約", color: "#2563EB", angle: 0, delay: 0.2 },     // Royal Blue (emphasized)
  { name: "ブッキング", color: "#1E40AF", angle: 15, delay: 0.3 },   // Blue-800
  { name: "グーグル", color: "#2563EB", angle: 30, delay: 0.4 },    // Blue-600
];

export default function BluePrismSync() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const controls = useAnimation();
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("animate");
      setTimeout(() => setShowStats(true), 1500);
    }
  }, [isInView, controls]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] flex items-center justify-center overflow-hidden rounded-2xl"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(241,245,249,0.9) 100%)",
        border: "1px solid rgba(37, 99, 235, 0.1)",
      }}
    >
      {/* Source Beam (Hotel Inventory - Deep Ink) */}
      <motion.div
        className="absolute left-0 h-1 bg-gradient-to-r from-transparent via-ink-deep to-ink-deep"
        style={{ 
          width: "45%",
          boxShadow: "0 0 20px rgba(15, 23, 42, 0.3)",
        }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      {/* Source Label */}
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-8 text-[10px] font-mono text-ink-body tracking-widest"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        ホテル在庫
      </motion.div>

      {/* The Prism (FifthKeys Core) - Royal Blue */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0.3, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: [0.9, 1.15, 1] } : {}}
        transition={{ 
          delay: 0.4, 
          duration: 0.4,
          scale: { times: [0, 0.6, 1] }
        }}
      >
        {/* Prism Shape */}
        <div 
          className="w-20 h-20 rotate-45"
          style={{
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(255,255,255,0.8))",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(37, 99, 235, 0.3)",
            boxShadow: isInView 
              ? "0 0 40px rgba(37, 99, 235, 0.3), inset 0 0 20px rgba(37, 99, 235, 0.1)"
              : "none",
          }}
        />
        
        {/* Prism Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-royal-pure uppercase tracking-widest whitespace-nowrap">
          FifthKeys コア
        </div>
      </motion.div>

      {/* Output Beams (Channels) */}
      {CHANNELS.map((channel, i) => (
        <motion.div
          key={channel.name}
          className="absolute right-0 h-0.5 origin-left"
          style={{
            width: "45%",
            left: "55%",
            background: channel.name === "DIRECT" 
              ? `linear-gradient(to right, ${channel.color}, ${channel.color}80, transparent)`
              : `linear-gradient(to right, ${channel.color}80, ${channel.color}40, transparent)`,
            boxShadow: channel.name === "DIRECT" 
              ? `0 0 20px ${channel.color}40`
              : `0 0 10px ${channel.color}20`,
            transform: `rotate(${channel.angle}deg)`,
            transformOrigin: "left center",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ 
            delay: 0.7 + channel.delay,
            duration: 0.4,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Channel End Labels */}
      {CHANNELS.map((channel, i) => {
        const yOffset = (channel.angle / 30) * 120;
        return (
          <motion.div
            key={`label-${channel.name}`}
            className="absolute right-4 text-right"
            style={{
              top: `calc(50% + ${yOffset}px)`,
              transform: "translateY(-50%)",
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={showStats ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.1 }}
          >
            <div 
              className="text-[10px] font-mono uppercase tracking-wider font-medium"
              style={{ color: channel.color }}
            >
              {channel.name}
            </div>
            <div className="text-xs font-mono text-ink-light">
              同期: <span className="text-emerald-600">完了</span>
            </div>
          </motion.div>
        );
      })}

      {/* Central Message - Conversion Optimized: Pain-focused */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={showStats ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        <div className="text-lg font-semibold text-ink-deep tracking-tight">
          在庫更新、もう手動でやらない。
        </div>
        <div className="text-xs font-mono text-ink-light mt-1">
          5つのOTAに、0.3秒で同期
        </div>
      </motion.div>
    </div>
  );
}
