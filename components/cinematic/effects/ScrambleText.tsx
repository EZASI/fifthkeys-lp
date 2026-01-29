"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleDuration?: number;
  delay?: number;
}

const CHARS = "0123456789¥$€£₿";

export default function ScrambleText({ 
  text, 
  className = "", 
  scrambleDuration = 1500,
  delay = 0,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayText, setDisplayText] = useState(text);
  const [hasScrambled, setHasScrambled] = useState(false);

  useEffect(() => {
    if (!isInView || hasScrambled) return;
    
    setHasScrambled(true);
    
    const timeout = setTimeout(() => {
      const originalText = text;
      const startTime = Date.now();
      
      const scramble = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / scrambleDuration, 1);
        
        // Number of characters to reveal
        const revealCount = Math.floor(progress * originalText.length);
        
        let newText = "";
        for (let i = 0; i < originalText.length; i++) {
          if (i < revealCount) {
            // Revealed character
            newText += originalText[i];
          } else if (originalText[i] === "," || originalText[i] === "." || originalText[i] === " ") {
            // Keep formatting characters
            newText += originalText[i];
          } else {
            // Scrambled character
            newText += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        
        setDisplayText(newText);
        
        if (progress < 1) {
          requestAnimationFrame(scramble);
        } else {
          setDisplayText(originalText);
        }
      };
      
      scramble();
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [isInView, text, scrambleDuration, delay, hasScrambled]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {displayText}
    </span>
  );
}

// Specialized counter with scramble
interface ScrambleCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function ScrambleCounter({
  value,
  prefix = "",
  suffix = "",
  className = "",
  duration = 2000,
}: ScrambleCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);
  const [isScrambling, setIsScrambling] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    
    setHasAnimated(true);
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Eased progress
      const eased = 1 - Math.pow(1 - progress, 3);
      
      if (progress < 0.7) {
        // Scrambling phase - random numbers
        setDisplayValue(Math.floor(Math.random() * value * 1.5));
        setIsScrambling(true);
      } else {
        // Settling phase - approach final value
        const settleProgress = (progress - 0.7) / 0.3;
        const settledValue = Math.floor(value * settleProgress + Math.random() * value * (1 - settleProgress) * 0.1);
        setDisplayValue(Math.min(settledValue, value));
        setIsScrambling(settleProgress < 1);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        setIsScrambling(false);
      }
    };
    
    animate();
  }, [isInView, value, duration, hasAnimated]);

  const formattedValue = displayValue.toLocaleString("ja-JP");

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className} ${isScrambling ? "opacity-90" : ""}`}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}
