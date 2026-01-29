"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { RevealOnScroll } from "./ui/RevealOnScroll";

export default function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-bg-secondary">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[150px] rounded-full mix-blend-screen"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <RevealOnScroll>
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 bg-bg-tertiary border border-primary/20 rounded-2xl mb-8 shadow-glow"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={0.1}>
          <h2 className="text-5xl lg:text-7xl font-semibold text-white mb-8 leading-tight tracking-tighter">
            次世代のホテル運営へ、
            <br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-white via-text-secondary to-white bg-[length:200%_auto]"
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              ようこそ。
            </motion.span>
          </h2>
        </RevealOnScroll>
        
        <RevealOnScroll delay={0.2}>
          <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
            リスクはありません。<br/>
            まずは30日間、FifthKeysの威力を体験してください。
          </p>
        </RevealOnScroll>
        
        <RevealOnScroll delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="primary" 
                size="lg" 
                className="h-16 px-10 text-lg group"
                rightIcon={
                  <motion.div
                    className="inline-block"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                }
              >
                無料でアカウント作成
              </Button>
            </motion.div>
            <motion.button 
              className="text-text-secondary hover:text-white font-medium underline underline-offset-4 decoration-border-light hover:decoration-white transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              デモを予約する
            </motion.button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
