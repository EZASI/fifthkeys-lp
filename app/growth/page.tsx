"use client";

import { useEffect, useState } from "react";
import SmoothScroll from "@/components/growth/core/SmoothScroll";
import LivingHorizon from "@/components/growth/core/LivingHorizon";
import GrowthHero from "@/components/growth/sections/GrowthHero";
import PrismSync from "@/components/growth/effects/PrismSync";
import ZeroRiskSimulator from "@/components/growth/effects/ZeroRiskSimulator";
import TractorBeam from "@/components/growth/effects/TractorBeam";
import LightPathBorder, { GlassPanel } from "@/components/growth/effects/LightPathBorder";
import CinematicFooter from "@/components/cinematic/CinematicFooter";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Globe, Bot, RefreshCw } from "lucide-react";

export default function GrowthPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-obsidian-core" style={{ backgroundColor: "#020617" }} />;
  }

  return (
    <SmoothScroll>
      {/* Living Horizon Background */}
      <LivingHorizon />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-biolume-cyan/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-10 h-10 bg-obsidian-surface/80 backdrop-blur-xl border border-white/10 rounded-lg flex items-center justify-center text-biolume-cyan font-bold text-xl">
                F
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight">FIFTHKEYS</span>
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">GROWTH_ENGINE</span>
            </div>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            {["Platform", "Pricing", "Cases", "Docs"].map((item) => (
              <a 
                key={item}
                href="#"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          
          <button className="px-6 py-2.5 bg-biolume-cyan/10 border border-biolume-cyan/30 text-biolume-cyan text-sm font-medium rounded-lg hover:bg-biolume-cyan/20 transition-colors">
            Get Started
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <GrowthHero />
        
        {/* Prism Sync Section */}
        <section className="py-32 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">
                DISTRIBUTION_ENGINE // PRISM_SYNC
              </div>
              <h2 className="text-4xl font-semibold tracking-tight text-white mb-4">
                One Click. Global Reach.
              </h2>
              <p className="text-white/50 max-w-xl mx-auto">
                Your inventory synchronizes across all channels in milliseconds. No more overbooking. No more manual updates.
              </p>
            </div>
            
            <LightPathBorder className="rounded-2xl">
              <div className="p-8">
                <PrismSync />
              </div>
            </LightPathBorder>
          </div>
        </section>

        {/* Zero Risk Simulator */}
        <section className="py-16 px-8">
          <div className="max-w-5xl mx-auto">
            <ZeroRiskSimulator />
          </div>
        </section>

        {/* Tractor Beam Section */}
        <section className="py-32 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">
                CAPTURE_ENGINE // DIRECT_BOOKING
              </div>
              <h2 className="text-4xl font-semibold tracking-tight text-white mb-4">
                Capture Direct. Save Commission.
              </h2>
              <p className="text-white/50 max-w-xl mx-auto">
                Watch as potential OTA guests are elegantly redirected to your direct channel, eliminating up to 25% commission fees.
              </p>
            </div>
            
            <TractorBeam />
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-semibold tracking-tight text-white mb-4">
                Complete Infrastructure
              </h2>
              <p className="text-white/50">
                Everything you need to maximize direct revenue.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: RefreshCw, title: "Channel Manager", desc: "Real-time OTA sync", stat: "11h/week saved" },
                { icon: Globe, title: "Booking Engine", desc: "Mobile-optimized", stat: "4.2% CVR" },
                { icon: Zap, title: "Revenue AI", desc: "Dynamic pricing", stat: "+18% RevPAR" },
                { icon: Bot, title: "AI Concierge", desc: "24/7 multilingual", stat: "+25% upsell" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassPanel withLightPath className="h-full rounded-xl">
                    <div className="p-6">
                      <feature.icon className="w-8 h-8 text-biolume-cyan mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-white/50 mb-4">{feature.desc}</p>
                      <div className="text-sm font-mono text-biolume-emerald">{feature.stat}</div>
                    </div>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-[10px] font-mono text-biolume-amber uppercase tracking-widest mb-6">
                READY_TO_ACCELERATE
              </div>
              
              <h2 className="text-5xl font-semibold tracking-tight text-white mb-6">
                Start Growing Today
              </h2>
              
              <p className="text-lg text-white/50 mb-10">
                No credit card. No contracts. No risk.<br />
                We succeed when you succeed.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  className="group px-10 py-5 bg-gradient-to-b from-biolume-cyan to-biolume-teal text-obsidian-core font-semibold text-lg rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    Initialize Free Trial
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </div>
              
              <div className="flex justify-center gap-8 mt-10 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                <span>¥0 SETUP</span>
                <span>•</span>
                <span>30 DAY TRIAL</span>
                <span>•</span>
                <span>FULL ACCESS</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <CinematicFooter />
    </SmoothScroll>
  );
}
