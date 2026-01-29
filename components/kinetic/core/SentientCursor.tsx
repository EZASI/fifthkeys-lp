"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type CursorState = "idle" | "hover" | "click" | "text";

export default function SentientCursor() {
  const [cursorState, setCursorState] = useState<CursorState>("idle");
  const [isVisible, setIsVisible] = useState(false);
  const rippleRef = useRef<HTMLDivElement>(null);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    const handleMouseDown = () => {
      setCursorState("click");
      // Ripple effect
      setTimeout(() => setCursorState("idle"), 150);
    };
    
    // Track hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.dataset.cursor === "pointer";
      
      const isText = 
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.contentEditable === "true";
      
      if (isText) {
        setCursorState("text");
      } else if (isInteractive) {
        setCursorState("hover");
      } else {
        setCursorState("idle");
      }
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseover", handleElementHover);
    
    // Hide default cursor
    document.body.style.cursor = "none";
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseover", handleElementHover);
      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY]);

  const cursorVariants = {
    idle: {
      width: 20,
      height: 20,
      borderRadius: "0%",
      rotate: 45,
    },
    hover: {
      width: 50,
      height: 50,
      borderRadius: "4px",
      rotate: 0,
    },
    click: {
      width: 16,
      height: 16,
      borderRadius: "0%",
      rotate: 45,
    },
    text: {
      width: 4,
      height: 30,
      borderRadius: "2px",
      rotate: 0,
    },
  };

  return (
    <>
      {/* Main Cursor Reticle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y }}
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
      >
        <motion.div
          className="absolute border-2 border-white"
          style={{ 
            translateX: "-50%", 
            translateY: "-50%",
          }}
          variants={cursorVariants}
          animate={cursorState}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
        
        {/* Crosshair lines for idle state */}
        {cursorState === "idle" && (
          <>
            <motion.div
              className="absolute w-px h-2 bg-white"
              style={{ left: -0.5, top: -16, translateX: "-50%" }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
            />
            <motion.div
              className="absolute w-px h-2 bg-white"
              style={{ left: -0.5, bottom: -16, translateX: "-50%" }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
            />
            <motion.div
              className="absolute h-px w-2 bg-white"
              style={{ top: -0.5, left: -16, translateY: "-50%" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
            />
            <motion.div
              className="absolute h-px w-2 bg-white"
              style={{ top: -0.5, right: -16, translateY: "-50%" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
            />
          </>
        )}
        
        {/* Bracket corners for hover state */}
        {cursorState === "hover" && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-white"
              style={{ translateX: "-50%", translateY: "-50%", left: -20, top: -20 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            />
            <motion.div
              className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-white"
              style={{ translateX: "50%", translateY: "-50%", right: -20, top: -20 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-white"
              style={{ translateX: "-50%", translateY: "50%", left: -20, bottom: -20 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-white"
              style={{ translateX: "50%", translateY: "50%", right: -20, bottom: -20 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            />
          </>
        )}
      </motion.div>

      {/* Click Ripple Effect */}
      {cursorState === "click" && (
        <motion.div
          ref={rippleRef}
          className="fixed pointer-events-none z-[9998] rounded-full border border-white/50"
          style={{ 
            x, 
            y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ width: 20, height: 20, opacity: 1 }}
          animate={{ width: 80, height: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
    </>
  );
}
