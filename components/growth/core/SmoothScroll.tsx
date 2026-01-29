"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import Lenis from "lenis";
import { useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

interface ScrollContextType {
  progress: MotionValue<number>;
  velocity: MotionValue<number>;
  phase: "chaos" | "alignment" | "growth";
  zDepth: MotionValue<number>;
  lenis: Lenis | null;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useGrowthScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) throw new Error("useGrowthScroll must be used within SmoothScroll");
  return context;
};

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [phase, setPhase] = useState<"chaos" | "alignment" | "growth">("chaos");
  
  const progress = useMotionValue(0);
  const velocity = useMotionValue(0);
  
  // Z-axis depth: Scroll = Camera Dolly
  const zDepth = useTransform(progress, [0, 0.5, 1], [0, 500, 1200]);
  const smoothZDepth = useSpring(zDepth, { damping: 50, stiffness: 100 });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });
    
    lenisRef.current = lenis;
    
    const onScroll = ({ scroll, limit, velocity: v }: { scroll: number; limit: number; velocity: number }) => {
      const p = scroll / limit;
      progress.set(p);
      velocity.set(Math.abs(v));
      
      // Phase transitions based on scroll progress
      if (p < 0.2) setPhase("chaos");
      else if (p < 0.5) setPhase("alignment");
      else setPhase("growth");
    };
    
    lenis.on("scroll", onScroll);
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, [progress, velocity]);

  const contextValue: ScrollContextType = {
    progress,
    velocity,
    phase,
    zDepth: smoothZDepth,
    lenis: lenisRef.current,
  };

  return (
    <ScrollContext.Provider value={contextValue}>
      <div className="relative">
        {children}
      </div>
    </ScrollContext.Provider>
  );
}
