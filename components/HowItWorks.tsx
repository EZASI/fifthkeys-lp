"use client";

import { UserPlus, Settings, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "./ui/RevealOnScroll";

const steps = [
  {
    number: "1",
    icon: UserPlus,
    title: "サインアップ（5分）",
    description: "メール・パスワード登録。クレジットカード不要。すぐにダッシュボードにアクセス。",
    color: "text-primary",
    bg: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    number: "2",
    icon: Settings,
    title: "システム連携（7日）",
    description: "PMS連携、予約エンジン設定、メタサーチ統合。専任オンボーディングスタッフがサポート。",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
  },
  {
    number: "3",
    icon: TrendingUp,
    title: "最適化 & 収益（8日目〜）",
    description: "AIが学習。リアルタイム分析。14日以内に最初の直接予約。90日で投資回収。",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    borderColor: "border-cyan-400/30",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">
              3つのステップで今すぐ開始
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              シンプルなプロセスで、最短24時間で運用開始
            </p>
          </div>
        </RevealOnScroll>

        <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative" staggerDelay={0.2}>
          {/* Connecting line (desktop only) */}
          <motion.div 
            className="hidden md:block absolute top-24 left-0 right-0 h-0.5 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary/40 via-blue-500/40 to-cyan-500/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={index}>
                <motion.div 
                  className="relative group"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Number Circle */}
                  <motion.div 
                    className={`w-20 h-20 bg-bg-tertiary border border-border-light rounded-2xl flex items-center justify-center text-white text-3xl font-bold font-mono mx-auto mb-8 shadow-lg group-hover:shadow-glow transition-all duration-300 relative z-10`}
                    whileHover={{ borderColor: "rgba(0, 217, 255, 0.5)" }}
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.2, type: "spring" }}
                    >
                      {step.number}
                    </motion.span>
                  </motion.div>

                  <div className="text-center space-y-4">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${step.bg} ${step.color}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>

                    <h3 className="text-xl font-bold tracking-tight text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed max-w-sm mx-auto text-sm">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (hidden on mobile and last item) */}
                  {index < steps.length - 1 && (
                    <motion.div 
                      className="hidden md:block absolute top-10 left-full w-full pointer-events-none"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.2 }}
                    >
                      <div className="flex justify-center">
                        <ArrowRight className="w-6 h-6 text-border-medium" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
