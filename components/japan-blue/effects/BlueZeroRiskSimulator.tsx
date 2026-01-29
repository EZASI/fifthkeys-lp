"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BlueGlassPanel } from "./BlueLightPathBorder";
import { Check, X, Zap } from "lucide-react";

// Color tokens
const TOKENS = {
  electricBlue: "#1E50FF",
  navySurface: "#001B3D",
  mintStatus: "#00F59B",
  goldAccent: "#D4AF37",
  dangerRed: "#EF4444",
  muted: "#94A3B8",
};

// Grouped competitor costs
const COMPETITOR_FRAGMENTS = [
  { 
    name: "PMS + Booking Engine", 
    cost: 60000, 
    painPoint: "Data Silos",
    items: ["PMS ¥45,000", "予約エンジン ¥15,000"],
  },
  { 
    name: "Channel Manager + API Fees", 
    cost: 54000, 
    painPoint: "Overbooking Risk",
    items: ["CM ¥25,000", "楽天 ¥8,000", "じゃらん ¥8,000", "Booking ¥5,000", "Expedia ¥5,000", "Agoda ¥3,000"],
  },
  { 
    name: "Operations (Lock/Cleaning)", 
    cost: 35000, 
    painPoint: "Manual Coordination",
    items: ["清掃管理 ¥12,000", "スマートロック ¥8,000", "自動チェックイン ¥15,000"],
  },
  { 
    name: "Marketing/CRM/BI", 
    cost: 60000, 
    painPoint: "Complex Analysis",
    items: ["CRM ¥18,000", "メール配信 ¥5,000", "口コミ管理 ¥8,000", "BI分析 ¥20,000", "会計連携 ¥9,000"],
  },
];

// All 23 individual items (muted display)
const ALL_LEGACY_ITEMS = [
  "PMS", "予約エンジン", "CM", "RMS", "楽天", "じゃらん", "Booking", "Expedia", "Agoda",
  "清掃管理", "スマートロック", "自動チェックイン", "決済", "CRM", "メール配信",
  "口コミ管理", "SNS連携", "BI分析", "会計連携", "レポート", "サポート", "保守費", "研修費"
];

const TOTAL_LEGACY_COST = COMPETITOR_FRAGMENTS.reduce((sum, f) => sum + f.cost, 0);

export default function BlueZeroRiskSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [showStrikethrough, setShowStrikethrough] = useState(false);
  const [hoveredFragment, setHoveredFragment] = useState<number | null>(null);

  // Trigger strikethrough animation when FifthKeys card is hovered
  const handleFifthKeysHover = (hovered: boolean) => {
    setShowStrikethrough(hovered);
  };

  return (
    <div ref={containerRef} className="relative py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{ 
            background: `${TOKENS.dangerRed}15`,
            border: `1px solid ${TOKENS.dangerRed}30`,
          }}
        >
          <X className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-red-600">
            Stop Paying the "Fragmented Tech Tax"
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: TOKENS.navySurface }}
        >
          23 Invoices vs. 1 Partnership.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg"
          style={{ color: TOKENS.muted, fontFeatureSettings: "'palt'" }}
        >
          コストの断片化を、利益の最大化へ。
        </motion.p>
      </div>

      {/* Comparison Cards */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* LEFT: Legacy Fragmented Costs (Muted) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
            transition={{ delay: 0.3 }}
            className="relative rounded-2xl p-6 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
              border: "1px solid #E2E8F0",
            }}
          >
            {/* Strikethrough Overlay */}
            <AnimatePresence>
              {showStrikethrough && (
                <motion.div
                  className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="absolute w-[150%] h-1.5 rounded-full"
                    style={{ 
                      background: `linear-gradient(90deg, ${TOKENS.dangerRed}, ${TOKENS.goldAccent})`,
                      transform: "rotate(-5deg)",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold" style={{ color: TOKENS.muted }}>
                  Legacy Stack
                </h3>
                <p className="text-sm" style={{ color: "#CBD5E1" }}>
                  従来のホテルシステム
                </p>
              </div>
              <div 
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: "#FEE2E2", color: TOKENS.dangerRed }}
              >
                23 Contracts
              </div>
            </div>

            {/* Fragment Cards */}
            <div className="space-y-3 mb-6">
              {COMPETITOR_FRAGMENTS.map((fragment, i) => (
                <motion.div
                  key={i}
                  className="relative p-4 rounded-xl transition-all cursor-default"
                  style={{
                    background: hoveredFragment === i ? "#F1F5F9" : "white",
                    border: "1px solid #E2E8F0",
                    opacity: showStrikethrough ? 0.5 : 1,
                  }}
                  onMouseEnter={() => setHoveredFragment(i)}
                  onMouseLeave={() => setHoveredFragment(null)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm" style={{ color: TOKENS.navySurface }}>
                        {fragment.name}
                      </div>
                      <div className="text-xs mt-1" style={{ color: TOKENS.dangerRed }}>
                        ⚠ {fragment.painPoint}
                      </div>
                      
                      {/* Expanded items on hover */}
                      <AnimatePresence>
                        {hoveredFragment === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-2 flex flex-wrap gap-1 overflow-hidden"
                          >
                            {fragment.items.map((item, j) => (
                              <span 
                                key={j}
                                className="text-[10px] px-2 py-0.5 rounded-full"
                                style={{ background: "#F1F5F9", color: TOKENS.muted }}
                              >
                                {item}
                              </span>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="text-right">
                      <div 
                        className="font-bold font-mono"
                        style={{ color: showStrikethrough ? TOKENS.muted : TOKENS.navySurface }}
                      >
                        ¥{fragment.cost.toLocaleString()}
                      </div>
                      <div className="text-[10px]" style={{ color: TOKENS.muted }}>/月</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* All 23 items (muted grid) */}
            <div className="mb-4">
              <div className="text-xs font-medium mb-2" style={{ color: TOKENS.muted }}>
                All {ALL_LEGACY_ITEMS.length} separate contracts:
              </div>
              <div className="flex flex-wrap gap-1">
                {ALL_LEGACY_ITEMS.map((item, i) => (
                  <motion.span
                    key={i}
                    className="text-[9px] px-1.5 py-0.5 rounded"
                    style={{ 
                      background: "#F1F5F9", 
                      color: TOKENS.muted,
                      opacity: showStrikethrough ? 0.3 : 0.7,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInView ? (showStrikethrough ? 0.3 : 0.7) : 0 }}
                    transition={{ delay: 0.8 + i * 0.02 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Total */}
            <div 
              className="p-4 rounded-xl text-center"
              style={{ 
                background: "#FEE2E2",
                opacity: showStrikethrough ? 0.5 : 1,
              }}
            >
              <div className="text-sm" style={{ color: TOKENS.dangerRed }}>Total Monthly Cost</div>
              <div 
                className="text-3xl font-bold font-mono"
                style={{ 
                  color: TOKENS.dangerRed,
                  textDecoration: showStrikethrough ? "line-through" : "none",
                }}
              >
                ¥{TOTAL_LEGACY_COST.toLocaleString()}
              </div>
              <div className="text-xs mt-1" style={{ color: TOKENS.dangerRed }}>
                年間 ¥{(TOTAL_LEGACY_COST * 12).toLocaleString()}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: FifthKeys Unified Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
            transition={{ delay: 0.5 }}
            onMouseEnter={() => handleFifthKeysHover(true)}
            onMouseLeave={() => handleFifthKeysHover(false)}
          >
            <BlueGlassPanel 
              className="h-full rounded-2xl relative overflow-hidden"
              withLightPath
            >
              <div className="p-6 h-full flex flex-col">
                {/* Glow effect */}
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                  style={{ background: TOKENS.electricBlue }}
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      FifthKeys
                    </h3>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      統合ホテルOS
                    </p>
                  </div>
                  <motion.div 
                    className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
                    style={{ 
                      background: `linear-gradient(135deg, ${TOKENS.electricBlue}, ${TOKENS.mintStatus})`,
                      color: "white",
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-3 h-3" />
                    UNIFIED
                  </motion.div>
                </div>

                {/* Value Props */}
                <div className="space-y-3 mb-6 flex-1 relative z-10">
                  {[
                    { label: "All 23 Tools in One Platform", icon: "✓" },
                    { label: "Single Dashboard", icon: "✓" },
                    { label: "One Support Contact", icon: "✓" },
                    { label: "Unified Data & Analytics", icon: "✓" },
                    { label: "Auto-sync All Channels", icon: "✓" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.1)" }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                        style={{ background: TOKENS.mintStatus, color: TOKENS.navySurface }}
                      >
                        {item.icon}
                      </div>
                      <span className="text-sm text-white">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Pricing */}
                <div 
                  className="p-6 rounded-xl text-center relative z-10"
                  style={{ 
                    background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <div className="text-sm text-white/70 mb-2">Fixed Cost</div>
                  <motion.div 
                    className="text-5xl font-black font-mono text-white mb-2"
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(0, 245, 155, 0.3)",
                        "0 0 40px rgba(0, 245, 155, 0.5)",
                        "0 0 20px rgba(0, 245, 155, 0.3)",
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ¥0
                  </motion.div>
                  <div className="text-white/70 text-sm mb-4">
                    Performance-based: <span className="font-bold text-white">3%</span> of bookings only
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <Check className="w-4 h-4" style={{ color: TOKENS.mintStatus }} />
                    <span style={{ color: TOKENS.mintStatus }}>
                      Save ¥{TOTAL_LEGACY_COST.toLocaleString()}/month
                    </span>
                  </div>
                </div>

                {/* Bottom badge */}
                <motion.div
                  className="mt-4 text-center relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    1 Partnership. Infinite Possibilities.
                  </span>
                </motion.div>
              </div>
            </BlueGlassPanel>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
