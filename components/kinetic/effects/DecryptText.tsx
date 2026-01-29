"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

interface DecryptTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  trigger?: "inView" | "immediate" | "hover";
}

export default function DecryptText({ 
  children, 
  className = "",
  delay = 0,
  duration = 800,
  trigger = "inView",
}: DecryptTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayText, setDisplayText] = useState(
    trigger === "immediate" ? children : children.replace(/[A-Za-z0-9]/g, "█")
  );
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const decrypt = () => {
    if (isDecrypting) return;
    setIsDecrypting(true);
    
    const original = children;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime - delay;
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }
      
      const progress = Math.min(elapsed / duration, 1);
      const revealCount = Math.floor(progress * original.length);
      
      let result = "";
      for (let i = 0; i < original.length; i++) {
        if (original[i] === " " || original[i] === "\n") {
          result += original[i];
        } else if (i < revealCount) {
          result += original[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      
      setDisplayText(result);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayText(original);
        setIsDecrypting(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (trigger === "immediate") {
      decrypt();
    } else if (trigger === "inView" && isInView) {
      decrypt();
    }
  }, [isInView, trigger]);

  useEffect(() => {
    if (trigger === "hover" && isHovering) {
      decrypt();
    }
  }, [isHovering, trigger]);

  return (
    <span 
      ref={ref} 
      className={`font-mono ${className}`}
      onMouseEnter={() => trigger === "hover" && setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ 
        fontFeatureSettings: '"tnum"',
        letterSpacing: isDecrypting ? "0.05em" : undefined,
      }}
    >
      {displayText}
    </span>
  );
}

// Chromatic aberration text for high-energy data
interface ChromaticTextProps {
  children: string;
  className?: string;
  intensity?: number;
}

export function ChromaticText({ 
  children, 
  className = "",
  intensity = 2,
}: ChromaticTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base text */}
      <span className="relative z-10">{children}</span>
      
      {/* Chromatic layers on hover */}
      {isHovered && (
        <>
          <span 
            className="absolute inset-0 text-red-500/70 z-0"
            style={{ transform: `translateX(-${intensity}px)` }}
            aria-hidden
          >
            {children}
          </span>
          <span 
            className="absolute inset-0 text-cyan-500/70 z-0"
            style={{ transform: `translateX(${intensity}px)` }}
            aria-hidden
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}
