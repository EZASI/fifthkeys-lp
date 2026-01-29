"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { Counter } from "./ui/Counter";

export default function Pricing() {
  return (
    <section id="economics" className="py-24 lg:py-32 relative bg-bg-primary overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 tech-grid tech-grid-mask opacity-40 pointer-events-none" />
      {/* Background Glow - Animated */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tighter text-white mb-4">
              リスクゼロの料金体系
            </h2>
            <p className="text-xl text-text-secondary">
              予約が入った時だけ、少額の手数料をいただくだけ。<br/>
              固定費も初期費用も、もう必要ありません。
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional Model */}
          <RevealOnScroll delay={0.1} direction="right">
            <motion.div
              className="p-8 bg-bg-tertiary/50 border border-border-light rounded-xl h-full"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold tracking-tight text-text-secondary mb-2">従来のシステム</h3>
              <p className="text-sm text-text-tertiary mb-8">固定費型 PMS + サイトコントローラー</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-border-light">
                  <span className="text-text-secondary">月額固定費</span>
                  <span className="font-bold text-text-secondary text-lg font-mono">¥50,000〜</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border-light">
                  <span className="text-text-secondary">初期導入費</span>
                  <span className="font-bold text-text-secondary text-lg font-mono">¥300,000〜</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border-light">
                  <span className="text-text-secondary">サポート費用</span>
                  <span className="font-bold text-text-secondary text-lg">別途見積</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border-light">
                  <span className="text-text-secondary">契約期間縛り</span>
                  <div className="flex items-center text-error font-medium">
                    <X className="w-4 h-4 mr-1" />
                    あり (1年〜)
                  </div>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>

          {/* FifthKeys Model */}
          <RevealOnScroll delay={0.2} direction="left">
            <motion.div
              className="relative p-8 bg-bg-secondary border-2 border-primary/50 rounded-xl shadow-glow"
              whileHover={{ 
                y: -8,
                boxShadow: "0 0 60px rgba(0, 217, 255, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="absolute top-0 right-0 bg-primary text-bg-primary text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                RECOMMENDED
              </motion.div>
              
              <h3 className="text-2xl font-bold tracking-tight text-primary mb-2">FifthKeys</h3>
              <p className="text-sm text-text-secondary mb-8">完全成果報酬型 ホテルOS</p>
              
              <div className="space-y-4 mb-8">
                <motion.div 
                  className="flex justify-between items-center py-3 border-b border-primary/20"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-white">月額固定費</span>
                  <span className="font-bold text-primary text-2xl font-mono">¥0</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center py-3 border-b border-primary/20"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-white">初期導入費</span>
                  <span className="font-bold text-primary text-2xl font-mono">¥0</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center py-3 border-b border-primary/20"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-white">予約手数料</span>
                  <span className="font-bold text-white text-lg font-mono">1 〜 2%</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center py-3 border-b border-primary/20"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-white">契約期間縛り</span>
                  <div className="flex items-center text-success font-medium">
                    <Check className="w-4 h-4 mr-1" />
                    なし (いつでも解約可)
                  </div>
                </motion.div>
              </div>

              <Button variant="primary" size="lg" className="w-full group">
                30日間無料で試す
              </Button>
              <p className="text-center text-xs text-text-tertiary mt-4">クレジットカード登録は不要です</p>
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
