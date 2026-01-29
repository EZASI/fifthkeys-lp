"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export default function CinematicCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div 
          className="inline-flex items-center justify-center w-16 h-16 bg-[#0A0E1A] border border-primary/30 rounded-2xl mb-8 shadow-[0_0_40px_rgba(0,217,255,0.3)]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* HUD corners */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/50" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-primary/50" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-primary/50" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-primary/50" />
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>
        
        <h2 className="text-5xl lg:text-7xl font-semibold text-white mb-8 leading-tight tracking-tighter">
          Ready to upgrade
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#33E5FF] to-primary">
            your hotel?
          </span>
        </h2>
        
        <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto font-mono">
          Join 500+ hotels already running on the future.
          <br />
          Zero risk. Zero setup fees.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button 
            variant="primary" 
            size="lg" 
            className="h-16 px-10 text-lg font-mono uppercase tracking-wider group"
            rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          >
            Start Free Trial
          </Button>
          <motion.button 
            className="text-white/60 hover:text-white font-mono uppercase tracking-wider text-sm underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all"
            whileHover={{ scale: 1.02 }}
          >
            Schedule Demo
          </motion.button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-xs font-mono text-white/30 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            SOC 2 Compliant
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            GDPR Ready
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            99.9% Uptime
          </div>
        </div>
      </div>
    </section>
  );
}
