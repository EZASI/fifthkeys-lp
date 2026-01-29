"use client";

import { useEffect, useState } from "react";
import CinematicHeader from "@/components/cinematic/CinematicHeader";
import CinematicBackground from "@/components/cinematic/effects/CinematicBackground";
import Scene1Portal from "@/components/cinematic/Scene1Portal";
import Scene2ChaosToOrder from "@/components/cinematic/Scene2ChaosToOrder";
import Scene3NeuralNetwork from "@/components/cinematic/Scene3NeuralNetwork";
import Scene4Revenue from "@/components/cinematic/Scene4Revenue";
import CinematicCTA from "@/components/cinematic/CinematicCTA";
import CinematicFooter from "@/components/cinematic/CinematicFooter";

export default function CinematicPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Loading state - black screen
    return <div className="min-h-screen bg-[#020617]" />;
  }

  return (
    <main className="relative bg-[#020617] text-white overflow-x-hidden">
      {/* Global Cinematic Background */}
      <CinematicBackground />
      
      {/* Header */}
      <CinematicHeader />
      
      {/* Scene 1: Portal Entry - System Boot-Up */}
      <Scene1Portal />
      
      {/* Scene 2: Chaos to Order - Legacy tools absorbed */}
      <Scene2ChaosToOrder />
      
      {/* Scene 3: Neural Network - AI connections */}
      <Scene3NeuralNetwork />
      
      {/* Scene 4: Revenue Rise - The climax */}
      <Scene4Revenue />
      
      {/* Final CTA */}
      <CinematicCTA />
      
      {/* Footer */}
      <CinematicFooter />
    </main>
  );
}
