"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileSpreadsheet, Database, Calendar, Mail, CreditCard, Users, Building2, BarChart3 } from "lucide-react";
import HoloCard from "./effects/HoloCard";

const legacyTools = [
  { icon: FileSpreadsheet, label: "Excel", angle: 0 },
  { icon: Database, label: "Legacy PMS", angle: 45 },
  { icon: Calendar, label: "Booking.com", angle: 90 },
  { icon: Mail, label: "Email", angle: 135 },
  { icon: CreditCard, label: "Payment", angle: 180 },
  { icon: Users, label: "CRM", angle: 225 },
  { icon: Building2, label: "OTA Manager", angle: 270 },
  { icon: BarChart3, label: "Analytics", angle: 315 },
];

export default function Scene2ChaosToOrder() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Shockwave animation
  const shockwaveScale = useTransform(scrollYProgress, [0.5, 0.8], [0, 3]);
  const shockwaveOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8], [0, 0.8, 0]);
  
  // Logo glow
  const logoGlow = useTransform(scrollYProgress, [0.4, 0.7], [0.3, 1]);
  const logoScale = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [1, 1.2, 1]);
  
  // Text overlay
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.6, 0.75], [30, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* Floating Legacy Tool Icons */}
        {legacyTools.map((tool, index) => {
          const Icon = tool.icon;
          const baseAngle = tool.angle;
          const baseRadius = 280;
          
          // Calculate spiral-in animation
          const radius = useTransform(scrollYProgress, [0, 0.5], [baseRadius, 0]);
          const rotation = useTransform(scrollYProgress, [0, 0.5], [0, 720]);
          const opacity = useTransform(scrollYProgress, [0.35, 0.5], [1, 0]);
          const scale = useTransform(scrollYProgress, [0.35, 0.5], [1, 0]);
          
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                x: useTransform(
                  [radius, rotation],
                  ([r, rot]) => Math.cos(((baseAngle + (rot as number)) * Math.PI) / 180) * (r as number)
                ),
                y: useTransform(
                  [radius, rotation],
                  ([r, rot]) => Math.sin(((baseAngle + (rot as number)) * Math.PI) / 180) * (r as number)
                ),
                opacity,
                scale,
              }}
            >
              <div className="relative group">
                {/* Glow behind icon */}
                <div className="absolute inset-0 bg-red-500/30 blur-xl rounded-full scale-150" />
                
                {/* Icon container */}
                <div className="relative w-16 h-16 bg-[#1a1f35]/90 backdrop-blur-xl border border-red-500/30 rounded-xl flex flex-col items-center justify-center">
                  <Icon className="w-6 h-6 text-red-400" />
                  <span className="text-[8px] font-mono text-red-400/70 mt-1 uppercase tracking-wider">
                    {tool.label}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Center FifthKeys Logo/Orb */}
        <motion.div 
          className="relative z-10"
          style={{ scale: logoScale }}
        >
          {/* Outer glow */}
          <motion.div 
            className="absolute -inset-16 bg-primary/30 rounded-full blur-[60px]"
            style={{ opacity: logoGlow }}
          />
          
          {/* Logo container */}
          <div className="relative w-32 h-32 bg-[#0A0E1A]/90 backdrop-blur-xl border border-primary/50 rounded-2xl flex items-center justify-center shadow-[0_0_60px_rgba(0,217,255,0.3)]">
            {/* HUD corners */}
            <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-primary/70" />
            <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-primary/70" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-primary/70" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-primary/70" />
            
            <div className="text-4xl font-bold text-primary">F</div>
          </div>
        </motion.div>

        {/* Shockwave Ring */}
        <motion.div
          className="absolute w-32 h-32 border-2 border-primary rounded-full"
          style={{
            scale: shockwaveScale,
            opacity: shockwaveOpacity,
          }}
        />
        <motion.div
          className="absolute w-32 h-32 border border-primary/50 rounded-full"
          style={{
            scale: useTransform(scrollYProgress, [0.55, 0.85], [0, 4]),
            opacity: useTransform(scrollYProgress, [0.55, 0.65, 0.85], [0, 0.5, 0]),
          }}
        />

        {/* Text Overlay */}
        <motion.div 
          className="absolute bottom-24 left-0 right-0 text-center z-20"
          style={{ opacity: textOpacity, y: textY }}
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-4">
            One Platform.
          </h2>
          <p className="text-xl text-primary font-mono">
            Replacing the chaos.
          </p>
        </motion.div>

        {/* HUD Side Labels */}
        <motion.div 
          className="absolute left-8 top-1/2 -translate-y-1/2 text-xs font-mono text-white/20 uppercase tracking-wider"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]) }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-white/20" />
            <span>INTEGRATION.PHASE</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute right-8 top-1/2 -translate-y-1/2 text-xs font-mono text-white/20 uppercase tracking-wider"
          style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]) }}
        >
          <div className="flex items-center gap-2">
            <span>SYNC.COMPLETE</span>
            <div className="w-8 h-px bg-primary/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
