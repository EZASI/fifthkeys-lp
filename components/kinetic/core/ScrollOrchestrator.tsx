"use client";

import { createContext, useContext, useRef, useEffect, useState, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "framer-motion";

interface OrchestratorContextType {
  scrollProgress: MotionValue<number>;
  scrollVelocity: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  tiltX: MotionValue<number>;
  tiltY: MotionValue<number>;
  gridSpeed: MotionValue<number>;
  isScrolling: boolean;
}

const OrchestratorContext = createContext<OrchestratorContextType | null>(null);

export const useOrchestrator = () => {
  const context = useContext(OrchestratorContext);
  if (!context) throw new Error("useOrchestrator must be used within ScrollOrchestrator");
  return context;
};

interface ScrollOrchestratorProps {
  children: ReactNode;
}

export default function ScrollOrchestrator({ children }: ScrollOrchestratorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const { scrollYProgress } = useScroll();
  
  // Mouse tracking for lens tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Damped tilt values (max ±2deg)
  const springConfig = { damping: 50, stiffness: 100 };
  const rawTiltX = useTransform(mouseY, [0, 1], [2, -2]);
  const rawTiltY = useTransform(mouseX, [0, 1], [-2, 2]);
  const tiltX = useSpring(rawTiltX, springConfig);
  const tiltY = useSpring(rawTiltY, springConfig);
  
  // Scroll velocity for grid warp speed
  const scrollVelocity = useMotionValue(0);
  const gridSpeed = useSpring(scrollVelocity, { damping: 30, stiffness: 100 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Track scroll velocity
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const currentTime = Date.now();
      const deltaTime = Math.max(currentTime - lastTime, 1);
      const deltaScroll = Math.abs(window.scrollY - lastScrollY);
      const velocity = Math.min((deltaScroll / deltaTime) * 50, 10);
      
      scrollVelocity.set(velocity);
      setIsScrolling(true);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        // Don't go to zero - maintain ambient drift
        scrollVelocity.set(0.5);
      }, 150);
      
      lastScrollY = window.scrollY;
      lastTime = currentTime;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [scrollVelocity]);

  const contextValue: OrchestratorContextType = {
    scrollProgress: scrollYProgress,
    scrollVelocity,
    mouseX,
    mouseY,
    tiltX,
    tiltY,
    gridSpeed,
    isScrolling,
  };

  return (
    <OrchestratorContext.Provider value={contextValue}>
      <div 
        ref={containerRef}
        className="relative min-h-screen"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            rotateX: tiltX,
            rotateY: tiltY,
          }}
        >
          {children}
        </motion.div>
      </div>
    </OrchestratorContext.Provider>
  );
}
