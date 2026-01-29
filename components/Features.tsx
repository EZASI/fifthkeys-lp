"use client";

import { RefreshCw, Globe, Search, Bot, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "./ui/RevealOnScroll";

const features = [
  {
    icon: RefreshCw,
    title: "チャネルマネージャー",
    description: "すべてのOTAとリアルタイム同期。在庫管理を完全自動化。",
    stat: "11h/週 削減",
    colSpan: 2,
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    icon: Globe,
    title: "直接予約エンジン",
    description: "モバイル最適化された高速な予約体験。コンバージョンを最大化。",
    stat: "CVR 4.2%",
    colSpan: 1,
    gradient: "from-teal-500/20 to-emerald-500/20",
    iconColor: "text-teal-400",
    iconBg: "bg-teal-500/10",
    glowColor: "rgba(20, 184, 166, 0.15)",
  },
  {
    icon: Search,
    title: "メタサーチ連携",
    description: "Google Hotels等から高意欲な顧客を直接集客。",
    stat: "予約の30%",
    colSpan: 1,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
    glowColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    icon: Bot,
    title: "AI コンシェルジュ",
    description: "24時間365日、多言語でゲスト対応とアップセルを自動化。",
    stat: "収益 +25%",
    colSpan: 2,
    gradient: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
    glowColor: "rgba(249, 115, 22, 0.15)",
  },
];

// Spotlight Card Component
function SpotlightCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const Icon = feature.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(cardRef.current?.offsetWidth ? cardRef.current.offsetWidth / 2 : 0);
    mouseY.set(cardRef.current?.offsetHeight ? cardRef.current.offsetHeight / 2 : 0);
  };

  return (
    <StaggerItem className={feature.colSpan === 2 ? "md:col-span-2" : "col-span-1"}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative p-8 bg-bg-tertiary/80 backdrop-blur-xl border border-border-light/60 rounded-2xl overflow-hidden h-full group"
        whileHover={{ 
          y: -8, 
          borderColor: "rgba(0, 217, 255, 0.3)",
        }}
        style={{
          boxShadow: useTransform(
            [x, y],
            () => `0 0 0 rgba(0,0,0,0)`
          ),
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Spotlight gradient that follows cursor */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: useTransform(
              [x, y],
              ([latestX, latestY]) => 
                `radial-gradient(600px circle at ${latestX}px ${latestY}px, ${feature.glowColor}, transparent 40%)`
            ),
          }}
        />

        {/* Top edge highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Glow border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(0, 217, 255, 0.2), transparent 50%, rgba(0, 217, 255, 0.1))`,
            padding: '1px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
          }}
        />

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <motion.div 
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.iconBg} ${feature.iconColor} border border-white/5`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="w-7 h-7" />
            </motion.div>
            
            <h3 className="text-2xl font-semibold tracking-tight text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-text-secondary leading-relaxed mb-8">
              {feature.description}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-border-light/60 pt-6 mt-auto">
            <span className="font-mono font-medium text-primary text-sm bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              {feature.stat}
            </span>
            <motion.div 
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              initial={{ x: -10, opacity: 0 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 217, 255, 0.1)" }}
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Decorative gradient - Animated on hover */}
        <motion.div 
          className={`absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-gradient-to-br ${feature.gradient} blur-3xl rounded-full opacity-20 pointer-events-none`}
          whileHover={{ opacity: 0.4, scale: 1.2 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </StaggerItem>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-bg-secondary relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-20">
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              whileHover={{ scale: 1.02 }}
            >
              オールインワン
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tighter text-white mb-6">
              All-in-One Platform
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              ホテル運営に必要なすべての機能を、
              <br />
              1つの美しいプラットフォームに統合しました。
            </p>
          </div>
        </RevealOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <SpotlightCard key={index} feature={feature} index={index} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
