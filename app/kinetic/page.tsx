"use client";

import { useEffect, useState } from "react";
import ScrollOrchestrator from "@/components/kinetic/core/ScrollOrchestrator";
import LivingGrid from "@/components/kinetic/core/LivingGrid";
import SentientCursor from "@/components/kinetic/core/SentientCursor";
import KineticHero from "@/components/kinetic/sections/KineticHero";
import KineticFeatures from "@/components/kinetic/sections/KineticFeatures";
import KineticCTA from "@/components/kinetic/sections/KineticCTA";
import NeuralStream from "@/components/kinetic/effects/NeuralStream";
import CinematicFooter from "@/components/cinematic/CinematicFooter";

export default function KineticPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#020617]" />;
  }

  return (
    <ScrollOrchestrator>
      {/* Living Grid Background */}
      <LivingGrid />
      
      {/* Sentient Cursor */}
      <SentientCursor />
      
      {/* Neural Stream (Right Side) */}
      <NeuralStream />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" data-cursor="pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-primary/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-10 h-10 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-lg flex items-center justify-center text-primary font-bold text-xl">
                F
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight">FIFTHKEYS</span>
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">KINETIC_OS // V4.2</span>
            </div>
          </a>
          
          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["SYSTEMS", "ECONOMICS", "CASES", "DOCS"].map((item) => (
              <a 
                key={item}
                href="#"
                className="text-[11px] font-mono text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                data-cursor="pointer"
              >
                {item}
              </a>
            ))}
          </nav>
          
          {/* CTA */}
          <button 
            className="px-6 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 text-[11px] font-mono text-white uppercase tracking-widest rounded-lg hover:border-primary/50 transition-colors"
            data-cursor="pointer"
          >
            INITIALIZE
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <KineticHero />
        <KineticFeatures />
        <KineticCTA />
      </main>
      
      {/* Footer */}
      <CinematicFooter />
    </ScrollOrchestrator>
  );
}
