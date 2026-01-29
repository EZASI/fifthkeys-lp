"use client";

import { Play, ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { Counter } from "./ui/Counter";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-bg-primary">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 tech-grid tech-grid-mask pointer-events-none" />
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Primary Blob - Breathing animation */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-primary/15 blur-[120px] rounded-full mix-blend-screen"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Secondary Blob - Slower drift */}
        <motion.div
          className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        {/* Tertiary Blob - Accent */}
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 blur-[80px] rounded-full mix-blend-screen"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left: Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Pill Badge with Glow */}
            <RevealOnScroll delay={0}>
              <motion.div 
                className="inline-flex items-center gap-2 bg-bg-tertiary/80 backdrop-blur-xl border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 pill-glow"
                whileHover={{ scale: 1.02, borderColor: "rgba(0, 217, 255, 0.5)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.span 
                  className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/20 rounded-full text-xs"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3" />
                  v2.0
                </motion.span>
                <span className="h-4 w-px bg-primary/30" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                500+ ホテルが導入中
              </motion.div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h1 className="text-5xl lg:text-7xl font-semibold tracking-tighter mb-6 leading-[1.05]">
                <span className="text-electric">
                  ダイレクト予約を
                </span>
                <br />
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#33E5FF] to-primary bg-[length:200%_auto]"
                  animate={{ backgroundPosition: ["0% center", "200% center"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  最大化するAI。
                </motion.span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                OTA依存から脱却し、利益率を改善。
                <br className="hidden lg:block" />
                初期費用ゼロ・成果報酬型で始める次世代ホテルOS。
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />}
                  className="w-full sm:w-auto group"
                >
                  無料トライアル
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  leftIcon={<Play className="w-4 h-4 fill-current" />}
                  onClick={() => setShowVideo(true)}
                  className="w-full sm:w-auto"
                >
                  デモを見る
                </Button>
              </div>
            </RevealOnScroll>

            {/* Metrics Grid with Animated Counters */}
            <RevealOnScroll delay={0.4}>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                <motion.div 
                  className="relative bg-bg-tertiary/50 backdrop-blur-xl p-5 rounded-2xl border border-border-light/60 hover:border-primary/40 transition-all duration-300 overflow-hidden group"
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0, 217, 255, 0.15)" }}
                >
                  {/* Spotlight effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative">
                    <p className="text-sm text-text-secondary mb-1">コンバージョン率</p>
                    <div className="flex items-baseline gap-2">
                      <Counter 
                        value={4.2} 
                        decimals={1} 
                        suffix="%" 
                        className="text-3xl font-bold text-white font-mono"
                        formatNumber={false}
                      />
                      <span className="text-xs text-success font-medium flex items-center bg-success/10 px-1.5 py-0.5 rounded">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        2.1x
                      </span>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  className="relative bg-bg-tertiary/50 backdrop-blur-xl p-5 rounded-2xl border border-border-light/60 hover:border-primary/40 transition-all duration-300 overflow-hidden group"
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0, 217, 255, 0.15)" }}
                >
                  {/* Spotlight effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative">
                    <p className="text-sm text-text-secondary mb-1">手数料削減 / 年</p>
                    <div className="flex items-baseline gap-2">
                      <Counter 
                        value={850000} 
                        prefix="¥" 
                        className="text-3xl font-bold text-white font-mono"
                      />
                      <span className="text-xs text-text-secondary">平均</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Visual */}
          <RevealOnScroll delay={0.2} direction="left" className="flex-1 relative w-full max-w-xl lg:max-w-none">
            <div className="relative">
              {/* Glow effect behind dashboard */}
              <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-3xl scale-90" />
              
              {/* Dashboard Frame */}
              <motion.div 
                className="relative bg-bg-secondary/90 backdrop-blur-xl border border-border-light/60 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Top edge highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                {/* Header */}
                <div className="flex items-center gap-2 p-4 border-b border-border-light/60 bg-bg-tertiary/50">
                  <div className="w-3 h-3 rounded-full bg-error/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>

                {/* Dashboard Content */}
                <div className="p-6 bg-gradient-to-b from-bg-tertiary/20 to-bg-primary">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <div className="text-sm text-text-secondary mb-1">総売上 (今月)</div>
                      <Counter 
                        value={4280000}
                        prefix="¥"
                        className="text-3xl font-bold text-white font-mono"
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-text-secondary mb-1">直接予約比率</div>
                      <Counter 
                        value={58}
                        suffix="%"
                        className="text-xl font-bold text-primary font-mono"
                        formatNumber={false}
                      />
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="h-48 flex items-end justify-between gap-2">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <motion.div 
                        key={i} 
                        className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-sm relative overflow-hidden"
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ 
                          duration: 1, 
                          delay: 0.5 + i * 0.1,
                          ease: [0.25, 0.4, 0.25, 1]
                        }}
                        whileHover={{ filter: "brightness(1.2)" }}
                      >
                        {/* Inner shine on bars */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <p>デモ動画 (YouTube埋め込み予定)</p>
            </div>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
