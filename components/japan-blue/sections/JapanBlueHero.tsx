"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import UnifiedOSAnimation from "./UnifiedOSAnimation";

// ==============================================================================
// FIFTHKEYS HERO SECTION: JAPAN BLUE (Deep Ocean / Digital Dawn)
// ==============================================================================

const TOKENS = {
  deepVoid: "#000B18",
  navySurface: "#001B3D",
  oceanBlue: "#002A5A",
  electricBlue: "#1E50FF",
  cyan: "#00E5FF",
  mintStatus: "#00F59B",
  textPrimary: "#FFFFFF",
  textSecondary: "#94A3B8",
};

const MOTION_CURVE = [0.22, 1, 0.36, 1];

// Animation presets
const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, delay: 0.2, ease: "easeOut" },
};

const SCALE_IN = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.2, ease: "easeOut" },
};

// Typewriter cursor effect
function TypewriterCursor() {
  return (
    <motion.span
      className="inline-block w-[3px] h-[1.1em] ml-1 align-middle"
      style={{ background: TOKENS.cyan }}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  );
}

// Revenue stream visualization (abstract glowing lines)
function RevenueStream() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px"
          style={{
            left: `${20 + i * 15}%`,
            bottom: 0,
            height: "100%",
            background: `linear-gradient(to top, transparent, ${
              i % 2 === 0 ? TOKENS.electricBlue : TOKENS.mintStatus
            }20, transparent)`,
          }}
          animate={{
            y: [100, -100],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function JapanBlueHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
      style={{ background: TOKENS.deepVoid }}
    >
      {/* Revenue Stream Background Effect */}
      <RevenueStream />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% -20%, ${TOKENS.oceanBlue} 0%, transparent 60%)`,
        }}
      />

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Tag Badge */}
            <motion.div
              initial={FADE_UP.initial}
              animate={isInView ? FADE_UP.animate : {}}
              transition={FADE_UP.transition}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(0, 229, 255, 0.1)",
                border: "1px solid rgba(0, 229, 255, 0.3)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: TOKENS.mintStatus }}
              />
              <span
                className="text-[11px] font-mono tracking-widest uppercase"
                style={{ color: TOKENS.cyan }}
              >
                FIFTHKEYS HOTEL OS ● LIVE
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={SCALE_IN.initial}
              animate={isInView ? SCALE_IN.animate : {}}
              transition={{ ...SCALE_IN.transition, delay: 0.4 }}
              className="mb-4"
            >
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontFeatureSettings: "'palt'",
                  background: "linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                完全成果報酬型
              </h1>
            </motion.div>

            <motion.div
              initial={SCALE_IN.initial}
              animate={isInView ? SCALE_IN.animate : {}}
              transition={{ ...SCALE_IN.transition, delay: 0.5 }}
              className="mb-6"
            >
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  color: TOKENS.textPrimary,
                }}
              >
                ホテルOS
              </h1>
            </motion.div>

            {/* Subheadline with cursor */}
            <motion.p
              initial={FADE_UP.initial}
              animate={isInView ? FADE_UP.animate : {}}
              transition={{ ...FADE_UP.transition, delay: 0.7 }}
              className="text-xl md:text-2xl font-medium"
              style={{
                color: TOKENS.cyan,
                fontFeatureSettings: "'palt'",
              }}
            >
              リスクゼロで、直接予約を最大化
              <TypewriterCursor />
            </motion.p>

            {/* Value Props */}
            <motion.div
              initial={FADE_UP.initial}
              animate={isInView ? FADE_UP.animate : {}}
              transition={{ ...FADE_UP.transition, delay: 0.9 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: CheckCircle2, text: "初期費用 ¥0" },
                { icon: CheckCircle2, text: "固定費 ¥0" },
                { icon: CheckCircle2, text: "成功報酬 3%" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: TOKENS.textSecondary }}
                >
                  <item.icon
                    className="w-4 h-4"
                    style={{ color: TOKENS.mintStatus }}
                  />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={FADE_UP.initial}
              animate={isInView ? FADE_UP.animate : {}}
              transition={{ ...FADE_UP.transition, delay: 1.1 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.a
                href="/contact"
                className="group px-8 py-4 font-semibold rounded-xl flex items-center gap-3 text-white"
                style={{
                  background: `linear-gradient(135deg, ${TOKENS.electricBlue} 0%, ${TOKENS.cyan} 100%)`,
                  boxShadow: `0 8px 32px ${TOKENS.electricBlue}60`,
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                無料で始める
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="/demo"
                className="px-8 py-4 font-medium rounded-xl flex items-center gap-3"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: TOKENS.textPrimary,
                }}
                whileHover={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.25)",
                }}
              >
                <Play className="w-5 h-5" style={{ color: TOKENS.cyan }} />
                デモを見る
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Unified OS Animation */}
          <motion.div
            initial={SCALE_IN.initial}
            animate={isInView ? SCALE_IN.animate : {}}
            transition={{ ...SCALE_IN.transition, delay: 0.6 }}
            className="relative"
          >
            <div
              className="relative rounded-3xl p-1 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(30, 80, 255, 0.1))",
              }}
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(0, 27, 61, 0.6)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <UnifiedOSAnimation />
              </div>
            </div>

            {/* Floating label */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full"
              style={{
                background: "rgba(0, 11, 24, 0.9)",
                border: "1px solid rgba(0, 229, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
              }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span
                className="text-xs font-mono tracking-wider"
                style={{ color: TOKENS.cyan }}
              >
                12ツール → 1プラットフォーム
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={FADE_UP.initial}
        animate={isInView ? FADE_UP.animate : {}}
        transition={{ ...FADE_UP.transition, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] font-mono tracking-widest uppercase"
          style={{ color: TOKENS.textSecondary }}
        >
          スクロール
        </span>
        <motion.div
          className="w-px h-8"
          style={{
            background: `linear-gradient(to bottom, ${TOKENS.cyan}, transparent)`,
          }}
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
