"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

/**
 * PrismSync Animation
 * 
 * Framer Motion Pseudo-code:
 * 
 * 1. Initial State:
 *    - Single white beam (Hotel Inventory) positioned at left
 *    - Prism (FifthKeys logo) at center, opacity 0.5
 *    - 5 channel beams at right, scaleX: 0, opacity: 0
 * 
 * 2. Animation Sequence (when in view):
 *    - T+0ms: White beam shoots from left -> center (x: -200 -> 0, duration: 0.6s)
 *    - T+400ms: Prism glows (opacity: 1, scale: 1.1, boxShadow: glow)
 *    - T+600ms: Prism pulses (scale: 1.0)
 *    - T+700ms: Each channel beam animates sequentially:
 *      - scaleX: 0 -> 1 (origin: left)
 *      - stagger: 100ms between each
 *    - T+1500ms: All beams reach edges, badges appear with counts
 * 
 * 3. Performance:
 *    - Use CSS transforms only (GPU accelerated)
 *    - Batch animations with Framer's orchestration
 *    - Use will-change: transform on beam elements
 */

const CHANNELS = [
  { name: "AGODA", color: "#E31C5F", angle: -30, delay: 0 },
  { name: "EXPEDIA", color: "#FFCC00", angle: -15, delay: 0.1 },
  { name: "DIRECT", color: "#00D9FF", angle: 0, delay: 0.2 },
  { name: "BOOKING", color: "#003580", angle: 15, delay: 0.3 },
  { name: "GOOGLE", color: "#4285F4", angle: 30, delay: 0.4 },
];

export default function PrismSync() {
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
      className="relative w-full h-[400px] flex items-center justify-center overflow-hidden"
    >
      {/* Source Beam (Hotel Inventory) */}
      <motion.div
        className="absolute left-0 h-1 bg-gradient-to-r from-transparent via-white to-white"
        style={{ 
          width: "45%",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
        }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      {/* Source Label */}
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-8 text-[10px] font-mono text-white/50 uppercase tracking-widest"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        HOTEL_INVENTORY
      </motion.div>

      {/* The Prism (FifthKeys Core) */}
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
          className="w-20 h-20 rotate-45 bg-gradient-to-br from-biolume-cyan/30 to-transparent backdrop-blur-xl border border-white/20"
          style={{
            boxShadow: isInView 
              ? "0 0 40px rgba(0, 217, 255, 0.5), inset 0 0 20px rgba(0, 217, 255, 0.2)"
              : "none",
          }}
        />
        
        {/* Prism Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-biolume-cyan uppercase tracking-widest whitespace-nowrap">
          FIFTHKEYS_CORE
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
            background: `linear-gradient(to right, ${channel.color}, ${channel.color}80, transparent)`,
            boxShadow: `0 0 15px ${channel.color}80`,
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
              className="text-[10px] font-mono uppercase tracking-wider"
              style={{ color: channel.color }}
            >
              {channel.name}
            </div>
            <div className="text-xs font-mono text-white/50">
              SYNC: <span className="text-biolume-emerald">ACTIVE</span>
            </div>
          </motion.div>
        );
      })}

      {/* Central Message */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={showStats ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        <div className="text-lg font-semibold text-white tracking-tight">
          One Click → Global Distribution
        </div>
        <div className="text-xs font-mono text-white/40 mt-1">
          LATENCY: 0.3ms // CHANNELS: 5 // STATUS: OPTIMAL
        </div>
      </motion.div>
    </div>
  );
}
