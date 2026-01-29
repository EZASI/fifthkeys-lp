"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const nodes = [
  { id: "guest", label: "Guest 101", x: 20, y: 30 },
  { id: "ai", label: "AI Engine", x: 50, y: 50 },
  { id: "housekeeping", label: "Housekeeping", x: 80, y: 25 },
  { id: "frontdesk", label: "Front Desk", x: 75, y: 70 },
  { id: "revenue", label: "Revenue Mgmt", x: 25, y: 75 },
];

const connections = [
  { from: "guest", to: "ai", label: "Check-in Signal" },
  { from: "ai", to: "housekeeping", label: "Room Ready Alert" },
  { from: "ai", to: "frontdesk", label: "VIP Notification" },
  { from: "ai", to: "revenue", label: "Rate Optimization" },
];

const stages = [
  "Guest Checks In",
  "AI Processes Data",
  "Staff Notified",
  "Revenue Updated",
];

export default function Scene3NeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Path drawing progress
  const pathProgress = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  
  // Text stage transitions
  const stageIndex = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7], [0, 1, 2, 3]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />

        {/* Network Visualization */}
        <div className="relative w-[800px] h-[500px] max-w-[90vw]">
          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <defs>
              {/* Gradient for animated lines */}
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D9FF" stopOpacity="0" />
                <stop offset="50%" stopColor="#00D9FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
              </linearGradient>
              
              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection Lines */}
            {connections.map((conn, i) => {
              const from = nodes.find(n => n.id === conn.from)!;
              const to = nodes.find(n => n.id === conn.to)!;
              
              const pathD = `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${(from.y + to.y) / 2 - 10} ${to.x} ${to.y}`;
              
              return (
                <g key={i}>
                  {/* Base line (dim) */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="rgba(0, 217, 255, 0.1)"
                    strokeWidth="0.3"
                  />
                  
                  {/* Animated line */}
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="#00D9FF"
                    strokeWidth="0.5"
                    filter="url(#glow)"
                    strokeDasharray="100"
                    style={{
                      strokeDashoffset: useTransform(
                        pathProgress,
                        [i * 0.2, i * 0.2 + 0.3],
                        [100, 0]
                      ),
                    }}
                  />
                  
                  {/* Traveling dot */}
                  <motion.circle
                    r="1"
                    fill="#00D9FF"
                    filter="url(#glow)"
                    style={{
                      offsetPath: `path('${pathD}')`,
                      offsetDistance: useTransform(
                        scrollYProgress,
                        [0.1 + i * 0.15, 0.3 + i * 0.15],
                        ["0%", "100%"]
                      ),
                      opacity: useTransform(
                        scrollYProgress,
                        [0.1 + i * 0.15, 0.15 + i * 0.15, 0.25 + i * 0.15, 0.3 + i * 0.15],
                        [0, 1, 1, 0]
                      ),
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                scale: useTransform(
                  scrollYProgress,
                  [0.05 + i * 0.1, 0.15 + i * 0.1],
                  [0.8, 1]
                ),
                opacity: useTransform(
                  scrollYProgress,
                  [0.05 + i * 0.1, 0.15 + i * 0.1],
                  [0.3, 1]
                ),
              }}
            >
              <div className={`relative ${node.id === 'ai' ? 'scale-125' : ''}`}>
                {/* Glow */}
                <div className={`absolute -inset-4 rounded-full blur-xl ${node.id === 'ai' ? 'bg-primary/40' : 'bg-primary/20'}`} />
                
                {/* Node container */}
                <div className={`relative px-4 py-3 bg-[#0A0E1A]/90 backdrop-blur-xl border rounded-xl ${node.id === 'ai' ? 'border-primary/70' : 'border-white/20'}`}>
                  {/* HUD corners for AI node */}
                  {node.id === 'ai' && (
                    <>
                      <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-primary" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 border-r border-t border-primary" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l border-b border-primary" />
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-primary" />
                    </>
                  )}
                  
                  <div className={`text-xs font-mono uppercase tracking-wider ${node.id === 'ai' ? 'text-primary' : 'text-white/70'}`}>
                    {node.label}
                  </div>
                  
                  {node.id === 'ai' && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-mono text-green-400">ACTIVE</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Stage Text */}
        <div className="absolute bottom-24 left-0 right-0 text-center">
          {stages.map((stage, i) => (
            <motion.div
              key={i}
              className="absolute inset-x-0"
              style={{
                opacity: useTransform(
                  stageIndex,
                  [i - 0.5, i, i + 0.5],
                  [0, 1, 0]
                ),
              }}
            >
              <div className="inline-flex items-center gap-3 bg-[#0A0E1A]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-lg font-mono text-white">{stage}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* HUD Labels */}
        <div className="absolute top-8 left-8 text-xs font-mono text-white/20 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 border border-primary/50 rotate-45" />
            <span>NEURAL.NETWORK.VIEW</span>
          </div>
        </div>
        
        <div className="absolute top-8 right-8 text-xs font-mono text-white/20 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span>DATA.FLOW</span>
            <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
