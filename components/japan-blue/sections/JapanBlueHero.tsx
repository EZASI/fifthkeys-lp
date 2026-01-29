"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Play, BarChart3, Users, Zap, Globe } from "lucide-react";

// ==============================================================================
// FIFTHKEYS HERO: SCROLL-TRIGGERED SLIDE SEQUENCE
// Framework: Framer Motion + Tailwind
// ==============================================================================

const TOKENS = {
  deepVoid: "#000B18",
  navySurface: "#001B3D",
  cyan: "#00E5FF",
  electricBlue: "#1E50FF",
  mintStatus: "#00F59B",
  textPrimary: "#FFFFFF",
  textSecondary: "#94A3B8",
};

// Satellite nodes with scatter positions
const SATELLITE_NODES = [
  { id: "pms", icon: "📊", label: "PMS", scatterX: -250, scatterY: -200 },
  { id: "cm", icon: "🔗", label: "CM", scatterX: 280, scatterY: -180 },
  { id: "ota", icon: "🌐", label: "OTA", scatterX: 320, scatterY: 50 },
  { id: "rms", icon: "💹", label: "RMS", scatterX: 260, scatterY: 220 },
  { id: "ai", icon: "🤖", label: "AI", scatterX: 80, scatterY: 280 },
  { id: "crm", icon: "📧", label: "CRM", scatterX: -150, scatterY: 260 },
  { id: "lock", icon: "🔐", label: "Lock", scatterX: -300, scatterY: 100 },
  { id: "analytics", icon: "📈", label: "分析", scatterX: -280, scatterY: -80 },
];

const ITEM_COUNT = SATELLITE_NODES.length;
const RADIUS = 180;

// Mini Dashboard Preview Component
function DashboardPreview({ opacity }: { opacity: number }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity }}
    >
      <div 
        className="w-full max-w-lg p-6 rounded-2xl"
        style={{
          background: "rgba(0, 27, 61, 0.8)",
          border: "1px solid rgba(0, 229, 255, 0.2)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Mini KPI Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { icon: BarChart3, label: "稼働率", value: "87%" },
            { icon: Users, label: "予約数", value: "142" },
            { icon: Zap, label: "RevPAR", value: "¥18,500" },
          ].map((kpi, i) => (
            <div 
              key={i}
              className="p-3 rounded-xl text-center"
              style={{ background: "rgba(0, 229, 255, 0.1)" }}
            >
              <kpi.icon className="w-5 h-5 mx-auto mb-1" style={{ color: TOKENS.cyan }} />
              <div className="text-lg font-bold text-white">{kpi.value}</div>
              <div className="text-[9px] text-white/50">{kpi.label}</div>
            </div>
          ))}
        </div>
        
        {/* Mini Chart */}
        <div 
          className="h-20 rounded-lg flex items-end justify-around px-2 pb-2"
          style={{ background: "rgba(0, 11, 24, 0.5)" }}
        >
          {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
            <motion.div
              key={i}
              className="w-6 rounded-t"
              style={{ 
                height: `${h}%`, 
                background: `linear-gradient(to top, ${TOKENS.electricBlue}, ${TOKENS.cyan})`,
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
          ))}
        </div>
        
        {/* Status Bar */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/60">リアルタイム更新中</span>
          </div>
          <span className="text-xs text-cyan-400">FifthKeys Dashboard →</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function JapanBlueHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Phase 1 (0-33%): Scattered → Starting convergence
  // Phase 2 (33-66%): Converging → Settled
  // Phase 3 (66-100%): Fade out → Dashboard fade in
  
  // Hub scale: grows slightly during convergence
  const hubScale = useTransform(smoothProgress, [0, 0.33, 0.66, 1], [0.8, 1, 1.1, 0.9]);
  const hubOpacity = useTransform(smoothProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0.3]);
  const hubGlow = useTransform(smoothProgress, [0.3, 0.5, 0.66], [0.3, 0.8, 1]);
  
  // Text opacity: fades based on scroll
  const textOpacity1 = useTransform(smoothProgress, [0, 0.15, 0.6, 0.75], [0, 1, 1, 0]);
  const textOpacity2 = useTransform(smoothProgress, [0.1, 0.25, 0.55, 0.7], [0, 1, 1, 0]);
  const textOpacity3 = useTransform(smoothProgress, [0.15, 0.3, 0.5, 0.65], [0, 1, 1, 0]);
  
  // Dashboard preview opacity
  const dashboardOpacity = useTransform(smoothProgress, [0.7, 0.85, 1], [0, 1, 1]);
  
  // Connection lines opacity
  const linesOpacity = useTransform(smoothProgress, [0.33, 0.5, 0.7, 0.85], [0, 0.3, 0.3, 0]);

  // Get satellite position based on scroll progress
  const getSatelliteTransform = (index: number) => {
    const node = SATELLITE_NODES[index];
    const angleDeg = (360 / ITEM_COUNT) * index - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    
    // Final orbital position
    const finalX = Math.cos(angleRad) * RADIUS;
    const finalY = Math.sin(angleRad) * RADIUS;
    
    // X position: scatter → orbit → fade position
    const x = useTransform(
      smoothProgress,
      [0, 0.33, 0.66, 1],
      [node.scatterX, finalX, finalX, finalX * 0.5]
    );
    
    // Y position: scatter → orbit → fade position  
    const y = useTransform(
      smoothProgress,
      [0, 0.33, 0.66, 1],
      [node.scatterY, finalY, finalY, finalY * 0.5]
    );
    
    // Opacity: invisible → visible → fade out
    const opacity = useTransform(
      smoothProgress,
      [0, 0.1, 0.33, 0.75, 0.9],
      [0, 0.5, 1, 1, 0]
    );
    
    // Scale: small → normal → shrink
    const scale = useTransform(
      smoothProgress,
      [0, 0.33, 0.66, 1],
      [0.5, 1, 1, 0.3]
    );
    
    return { x, y, opacity, scale };
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-[300vh]"
      style={{ background: TOKENS.deepVoid }}
    >
      {/* Sticky Container */}
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden"
      >
        {/* Background Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${TOKENS.navySurface} 0%, ${TOKENS.deepVoid} 70%)`,
          }}
        />
        
        {/* Grid */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 229, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 229, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.5, 0.2]),
          }}
        />

        {/* Main Content Area */}
        <div className="relative h-full flex items-center justify-center">
          {/* Left: Text Content */}
          <div className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-lg z-20">
            {/* Tag */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                opacity: textOpacity1,
                background: "rgba(0, 229, 255, 0.1)",
                border: "1px solid rgba(0, 229, 255, 0.3)",
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: TOKENS.mintStatus }} />
              <span className="text-[11px] font-mono tracking-widest" style={{ color: TOKENS.cyan }}>
                FIFTHKEYS HOTEL OS
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4"
              style={{ 
                opacity: textOpacity1,
                fontFamily: "'Noto Sans JP', sans-serif",
                fontFeatureSettings: "'palt'",
                background: "linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              完全成果報酬型
              <br />
              ホテルOS
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-xl md:text-2xl mb-8 font-medium"
              style={{ 
                opacity: textOpacity2,
                color: TOKENS.cyan,
                fontFeatureSettings: "'palt'",
              }}
            >
              リスクゼロで、直接予約を最大化
            </motion.p>

            {/* Value Props */}
            <motion.div
              className="flex gap-6 mb-8"
              style={{ opacity: textOpacity3 }}
            >
              {[
                { label: "初期費用", value: "¥0" },
                { label: "固定費", value: "¥0" },
                { label: "成功報酬", value: "3%" },
              ].map((prop, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold font-mono" style={{ color: TOKENS.mintStatus }}>
                    {prop.value}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                    {prop.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex gap-4"
              style={{ opacity: textOpacity3 }}
            >
              <motion.button
                className="group px-6 py-3 font-semibold rounded-xl flex items-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${TOKENS.electricBlue} 0%, ${TOKENS.cyan} 100%)`,
                  color: "white",
                  boxShadow: `0 8px 32px ${TOKENS.electricBlue}60`,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                無料で始める
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                className="px-6 py-3 font-medium rounded-xl flex items-center gap-2"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "white",
                }}
                whileHover={{ background: "rgba(255, 255, 255, 0.1)" }}
              >
                <Play className="w-4 h-4" style={{ color: TOKENS.cyan }} />
                デモを見る
              </motion.button>
            </motion.div>
          </div>

          {/* Center: Animated Hub + Satellites */}
          <div className="absolute right-8 md:right-16 lg:right-32 top-1/2 -translate-y-1/2 w-[400px] h-[400px]">
            {/* Connection Lines */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 400"
            >
              <motion.g style={{ opacity: linesOpacity }}>
                {SATELLITE_NODES.map((_, i) => {
                  const angleDeg = (360 / ITEM_COUNT) * i - 90;
                  const angleRad = (angleDeg * Math.PI) / 180;
                  const endX = 200 + Math.cos(angleRad) * RADIUS;
                  const endY = 200 + Math.sin(angleRad) * RADIUS;
                  
                  return (
                    <line
                      key={`line-${i}`}
                      x1={200}
                      y1={200}
                      x2={endX}
                      y2={endY}
                      stroke={TOKENS.cyan}
                      strokeWidth={1.5}
                      strokeOpacity={0.3}
                    />
                  );
                })}
              </motion.g>
            </svg>

            {/* Satellites */}
            {SATELLITE_NODES.map((node, i) => {
              const { x, y, opacity, scale } = getSatelliteTransform(i);
              
              return (
                <motion.div
                  key={node.id}
                  className="absolute w-14 h-14 rounded-xl flex flex-col items-center justify-center"
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: -28,
                    marginTop: -28,
                    x,
                    y,
                    opacity,
                    scale,
                    background: "rgba(0, 27, 61, 0.8)",
                    border: `1px solid ${TOKENS.cyan}40`,
                    backdropFilter: "blur(10px)",
                    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3)`,
                  }}
                >
                  <span className="text-xl">{node.icon}</span>
                  <span className="text-[8px] font-semibold text-white/80">{node.label}</span>
                </motion.div>
              );
            })}

            {/* Central F Hub */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                scale: hubScale,
                opacity: hubOpacity,
                background: `radial-gradient(circle at 40% 35%, rgba(30, 80, 255, 0.9) 0%, rgba(0, 27, 61, 0.95) 100%)`,
                border: "2px solid rgba(255, 255, 255, 0.15)",
                boxShadow: useTransform(
                  hubGlow,
                  [0.3, 0.8, 1],
                  [
                    `0 0 20px ${TOKENS.cyan}40, 0 0 60px ${TOKENS.electricBlue}30`,
                    `0 0 40px ${TOKENS.cyan}60, 0 0 100px ${TOKENS.electricBlue}50`,
                    `0 0 60px ${TOKENS.cyan}80, 0 0 150px ${TOKENS.electricBlue}60`,
                  ]
                ),
              }}
            >
              <span 
                className="text-5xl font-bold"
                style={{ 
                  color: TOKENS.textPrimary,
                  textShadow: `0 0 30px ${TOKENS.cyan}60`,
                }}
              >
                F
              </span>
              
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: `2px solid ${TOKENS.cyan}` }}
                animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Dashboard Preview - fades in at 66-100% */}
            <DashboardPreview opacity={dashboardOpacity.get()} />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: useTransform(smoothProgress, [0, 0.1, 0.3], [1, 1, 0]) }}
        >
          <span className="text-[10px] font-mono tracking-widest text-white/40">
            スクロールして体験
          </span>
          <motion.div
            className="w-px h-8"
            style={{ background: `linear-gradient(to bottom, ${TOKENS.cyan}, transparent)` }}
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          className="fixed top-1/2 right-4 -translate-y-1/2 flex flex-col gap-2 z-50"
          style={{ opacity: useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]) }}
        >
          {["散開", "収束", "統合"].map((label, i) => {
            const isActive = useTransform(
              smoothProgress,
              [i * 0.33, (i + 1) * 0.33],
              [0, 1]
            );
            
            return (
              <div key={i} className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: useTransform(isActive, [0, 1], ["rgba(255,255,255,0.2)", TOKENS.cyan]),
                  }}
                />
                <motion.span
                  className="text-[10px] font-mono"
                  style={{
                    color: useTransform(isActive, [0, 1], ["rgba(255,255,255,0.3)", TOKENS.cyan]),
                  }}
                >
                  {label}
                </motion.span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
