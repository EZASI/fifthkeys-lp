"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WireframeConstruct, { BreathingBorder } from "../effects/WireframeConstruct";
import DecryptText from "../effects/DecryptText";
import { ScrambleCounter } from "@/components/cinematic/effects/ScrambleText";
import DriftContainer from "../effects/DriftContainer";
import { RefreshCw, Globe, Search, Bot, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: RefreshCw,
    code: "SYNC_ENGINE",
    title: "Channel Manager",
    description: "Real-time OTA synchronization. Zero overbooking.",
    stat: { value: 11, suffix: "h", label: "WEEKLY_SAVED" },
    color: "rgba(59, 130, 246, 0.5)",
  },
  {
    icon: Globe,
    code: "DIRECT_CORE",
    title: "Booking Engine",
    description: "Mobile-optimized. Conversion maximized.",
    stat: { value: 4.2, suffix: "%", label: "CVR_RATE", decimals: 1 },
    color: "rgba(20, 184, 166, 0.5)",
  },
  {
    icon: Search,
    code: "META_LINK",
    title: "Metasearch",
    description: "Google Hotels integration. High-intent traffic.",
    stat: { value: 30, suffix: "%", label: "BOOKING_SHARE" },
    color: "rgba(168, 85, 247, 0.5)",
  },
  {
    icon: Bot,
    code: "AI_CONCIERGE",
    title: "AI Assistant",
    description: "24/7 multilingual. Automated upsell.",
    stat: { value: 25, suffix: "%", label: "REV_INCREASE", prefix: "+" },
    color: "rgba(249, 115, 22, 0.5)",
  },
];

export default function KineticFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative py-32">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-8 mb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
            MODULE_REGISTRY // CORE_SYSTEMS
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-center text-white">
          <DecryptText delay={200}>ALL-IN-ONE PLATFORM</DecryptText>
        </h2>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            
            return (
              <DriftContainer 
                key={i} 
                amplitude={5} 
                duration={8 + i} 
                delay={i * 0.5}
              >
                <WireframeConstruct 
                  className="h-full"
                  delay={0.2 + i * 0.15}
                  glowColor={feature.color}
                >
                  <div className="p-8 h-full">
                    {/* Module Header */}
                    <div className="flex items-start justify-between mb-6">
                      <BreathingBorder color={feature.color} className="p-3 rounded-xl">
                        <Icon className="w-8 h-8 text-white" />
                      </BreathingBorder>
                      
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
                        {feature.code}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-semibold tracking-tight text-white mb-3">
                      <DecryptText delay={400 + i * 100}>{feature.title}</DecryptText>
                    </h3>
                    
                    <p className="text-white/50 mb-8 font-mono text-sm">
                      {feature.description}
                    </p>
                    
                    {/* Stat */}
                    <div className="flex items-end justify-between pt-6 border-t border-white/10">
                      <div>
                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">
                          {feature.stat.label}
                        </div>
                        <ScrambleCounter
                          value={feature.stat.value}
                          prefix={feature.stat.prefix}
                          suffix={feature.stat.suffix}
                          className="text-3xl font-bold text-white"
                          duration={2000}
                        />
                      </div>
                      
                      <motion.div
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center cursor-pointer"
                        whileHover={{ 
                          borderColor: feature.color,
                          boxShadow: `0 0 20px ${feature.color}`,
                        }}
                        data-cursor="pointer"
                      >
                        <Zap className="w-4 h-4 text-white/50" />
                      </motion.div>
                    </div>
                  </div>
                </WireframeConstruct>
              </DriftContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
}
