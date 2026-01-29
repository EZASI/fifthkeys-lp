"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

/**
 * PrismStream (プリズムの統合)
 * 
 * Fragmentation -> Consolidation
 * 
 * 左から「OTA」「PMS」「Metasearch」という3色の乱れた線が入ってくる。
 * 中央のFifthKeysレンズを通過すると、一本の太く純粋な
 * 「Direct Booking（ゴールドの光）」に整列し、加速する。
 */

interface StreamLine {
  id: string;
  label: string;
  color: string;
  delay: number;
  waveAmplitude: number;
}

const SOURCE_STREAMS: StreamLine[] = [
  { id: 'ota', label: 'OTA', color: '#DC2626', delay: 0, waveAmplitude: 20 },
  { id: 'pms', label: 'PMS', color: '#7C3AED', delay: 0.15, waveAmplitude: 15 },
  { id: 'meta', label: 'Metasearch', color: '#0891B2', delay: 0.3, waveAmplitude: 25 },
];

export default function PrismStream() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [phase, setPhase] = useState<'idle' | 'converging' | 'unified' | 'accelerating'>('idle');

  useEffect(() => {
    if (!isInView) return;
    
    const timeline = [
      { phase: 'converging' as const, at: 300 },
      { phase: 'unified' as const, at: 1500 },
      { phase: 'accelerating' as const, at: 2200 },
    ];
    
    const timeouts = timeline.map(({ phase: p, at }) => 
      setTimeout(() => setPhase(p), at)
    );
    
    return () => timeouts.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[300px] overflow-hidden rounded-2xl bg-ceramic-cloud/50"
    >
      {/* Source Labels (Left) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-8">
        {SOURCE_STREAMS.map((stream, i) => (
          <motion.div
            key={stream.id}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: stream.delay + 0.2 }}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: stream.color }}
            />
            <span className="text-sm font-medium text-indigo-medium">
              {stream.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Stream Lines SVG */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Kintsugi Gold Gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="1" />
            <stop offset="100%" stopColor="#F4D03F" stopOpacity="1" />
          </linearGradient>
          
          {/* Glow Filter */}
          <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Source Streams (Chaotic) */}
        {SOURCE_STREAMS.map((stream, i) => {
          const startY = 80 + i * 70;
          const endY = 150;
          const convergeX = 400;
          
          // Create wavy path
          const wavePath = phase === 'idle' 
            ? `M 120,${startY} 
               Q 200,${startY + stream.waveAmplitude} 280,${startY} 
               Q 360,${startY - stream.waveAmplitude} 400,${startY}`
            : `M 120,${startY} 
               Q 200,${startY + stream.waveAmplitude * 0.5} 280,${(startY + endY) / 2} 
               Q 360,${endY} 400,${endY}`;

          return (
            <motion.path
              key={stream.id}
              d={wavePath}
              fill="none"
              stroke={stream.color}
              strokeWidth={phase === 'unified' || phase === 'accelerating' ? 0 : 3}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { 
                pathLength: 1, 
                opacity: phase === 'unified' || phase === 'accelerating' ? 0 : 0.7,
                d: wavePath,
              } : {}}
              transition={{ 
                pathLength: { duration: 0.8, delay: stream.delay },
                opacity: { duration: 0.3 },
                d: { duration: 0.6 },
              }}
            />
          );
        })}

        {/* Prism/Lens (Center) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { 
            opacity: 1, 
            scale: phase === 'unified' || phase === 'accelerating' ? 1.1 : 1,
          } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Lens Body */}
          <motion.ellipse
            cx="400"
            cy="150"
            rx="40"
            ry="60"
            fill="none"
            stroke="#0F172A"
            strokeWidth="2"
            animate={{
              fill: phase === 'unified' || phase === 'accelerating' 
                ? 'rgba(212, 175, 55, 0.1)' 
                : 'rgba(241, 245, 249, 0.8)',
            }}
          />
          
          {/* Lens Highlight */}
          <ellipse
            cx="390"
            cy="130"
            rx="15"
            ry="20"
            fill="rgba(255, 255, 255, 0.6)"
          />
          
          {/* F Logo */}
          <text
            x="400"
            y="158"
            textAnchor="middle"
            className="text-2xl font-bold"
            fill={phase === 'unified' || phase === 'accelerating' ? '#D4AF37' : '#0F172A'}
          >
            F
          </text>
        </motion.g>

        {/* Unified Gold Stream (Output) */}
        <motion.path
          d="M 440,150 Q 520,150 600,150 L 750,150"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth={phase === 'accelerating' ? 8 : 6}
          strokeLinecap="round"
          filter="url(#goldGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            phase === 'unified' || phase === 'accelerating'
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ 
            pathLength: { duration: 0.6 },
            opacity: { duration: 0.3 },
          }}
        />

        {/* Acceleration Particles */}
        {phase === 'accelerating' && [0, 1, 2, 3, 4].map(i => (
          <motion.circle
            key={i}
            r="4"
            fill="#D4AF37"
            initial={{ cx: 440, cy: 150, opacity: 0 }}
            animate={{ 
              cx: [440, 750],
              cy: 150,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          />
        ))}
      </svg>

      {/* Output Label (Right) */}
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 text-right"
        initial={{ opacity: 0, x: 20 }}
        animate={
          phase === 'unified' || phase === 'accelerating'
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: 20 }
        }
      >
        <div className="text-lg font-bold text-kintsugi-pure">
          Direct Booking
        </div>
        <div className="text-sm text-indigo-light">
          手数料ゼロ・利益最大化
        </div>
      </motion.div>

      {/* Phase Label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <motion.div
          className="text-xs text-indigo-pale"
          animate={{ opacity: phase === 'idle' ? 0 : 1 }}
        >
          {phase === 'converging' && '統合中...'}
          {phase === 'unified' && '最適化完了'}
          {phase === 'accelerating' && '収益加速中'}
        </motion.div>
      </div>
    </div>
  );
}
