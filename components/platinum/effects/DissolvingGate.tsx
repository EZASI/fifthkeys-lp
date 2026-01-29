"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/**
 * DissolvingGate (門の消失)
 * Scene 2: Vendor Lock-in → Performance Accountability
 * 
 * Visual Metaphor:
 * A grey metal gate bars the user's path.
 * FifthKeys approaches → gate dissolves pixel-by-pixel.
 * An infinite, clear horizon is revealed.
 * 
 * Text: "契約期間なし。完全自由。"
 */

export default function DissolvingGate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [phase, setPhase] = useState<'locked' | 'approaching' | 'dissolving' | 'free'>('locked');
  const [dissolveProgress, setDissolveProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const timeline = [
      { phase: 'approaching' as const, at: 500 },
      { phase: 'dissolving' as const, at: 1500 },
      { phase: 'free' as const, at: 3500 },
    ];
    
    timeline.forEach(({ phase: p, at }) => {
      setTimeout(() => setPhase(p), at);
    });

    // Animate dissolve progress
    setTimeout(() => {
      const interval = setInterval(() => {
        setDissolveProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 2;
        });
      }, 40);
    }, 1500);
  }, [isInView]);

  // Generate noise pattern for dissolve mask
  const generateNoiseMask = (progress: number) => {
    const threshold = progress / 100;
    return `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='3' seed='${Math.random()}'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='${threshold > 0.5 ? '0 1' : '1 0'}'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F8FAFC 0%, #E2E8F0 100%)',
      }}
    >
      {/* Labels */}
      <div className="absolute top-8 left-8 z-20">
        <div className="text-xs font-mono text-depth-light tracking-widest mb-2">
          SCENE_02 // FREEDOM_FROM_CONTRACTS
        </div>
        <div className="text-lg font-bold text-depth-deep">
          門の消失
        </div>
      </div>

      {/* Horizon (Revealed at end) */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #DBEAFE 0%, #BFDBFE 30%, #93C5FD 60%, #60A5FA 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'dissolving' || phase === 'free' ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* Sun Glow */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(253, 224, 71, 0.6) 0%, rgba(251, 191, 36, 0.3) 30%, transparent 70%)',
          }}
          animate={{
            scale: phase === 'free' ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Infinite Path */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(241, 245, 249, 0.8) 100%)',
            }}
          />
          {/* Path Lines */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <motion.path
              d="M 0,100 Q 50%,0 100%,100"
              fill="none"
              stroke="rgba(212, 175, 55, 0.4)"
              strokeWidth="2"
              strokeDasharray="10 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: phase === 'free' ? 1 : 0 }}
              transition={{ duration: 1.5 }}
            />
          </svg>
        </div>
      </motion.div>

      {/* THE GATE */}
      <AnimatePresence>
        {phase !== 'free' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            exit={{ opacity: 0 }}
            style={{
              maskImage: dissolveProgress > 0 ? generateNoiseMask(dissolveProgress) : 'none',
              WebkitMaskImage: dissolveProgress > 0 ? generateNoiseMask(dissolveProgress) : 'none',
            }}
          >
            {/* Gate Structure */}
            <div className="relative w-[400px] h-[350px]">
              {/* Gate Frame */}
              <div 
                className="absolute inset-0 rounded-t-3xl"
                style={{
                  background: 'linear-gradient(180deg, #64748B 0%, #475569 50%, #334155 100%)',
                  boxShadow: '0 20px 60px rgba(51, 65, 85, 0.4)',
                }}
              >
                {/* Bars */}
                <div className="absolute inset-4 flex justify-between">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-full rounded"
                      style={{
                        background: 'linear-gradient(180deg, #475569 0%, #334155 100%)',
                        boxShadow: 'inset 2px 0 4px rgba(255,255,255,0.1), inset -2px 0 4px rgba(0,0,0,0.2)',
                      }}
                    />
                  ))}
                </div>

                {/* Lock */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                  animate={{
                    scale: phase === 'dissolving' ? [1, 0.8, 0] : 1,
                    rotate: phase === 'dissolving' ? [0, 180, 360] : 0,
                  }}
                  transition={{ duration: 1 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C9.24 2 7 4.24 7 7V10H6C4.9 10 4 10.9 4 12V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V12C20 10.9 19.1 10 18 10H17V7C17 4.24 14.76 2 12 2ZM12 4C13.66 4 15 5.34 15 7V10H9V7C9 5.34 10.34 4 12 4Z"
                      fill="#64748B"
                    />
                  </svg>
                </motion.div>

                {/* Gate Label */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="px-4 py-2 bg-depth-abyss/80 rounded-lg text-white text-sm font-medium">
                    従来の契約 // 解約不可
                  </div>
                </div>
              </div>

              {/* Dissolving Particles */}
              {phase === 'dissolving' && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-slate-500 rounded-sm"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{
                        opacity: 0,
                        scale: 0,
                        y: -50 - Math.random() * 100,
                        x: (Math.random() - 0.5) * 100,
                      }}
                      transition={{
                        duration: 1 + Math.random(),
                        delay: Math.random() * 1.5,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FifthKeys Light Approach */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 z-5"
        initial={{ x: -200, opacity: 0 }}
        animate={{
          x: phase === 'locked' ? -200 : phase === 'approaching' ? 50 : 150,
          opacity: phase === 'locked' ? 0 : 1,
        }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-gold-lg"
          >
            <span className="text-2xl font-bold text-champagne-pure">F</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Freedom Message */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: phase === 'free' ? 1 : 0,
          y: phase === 'free' ? 0 : 30,
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div 
          className="px-8 py-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-champagne-pure/20 shadow-gold-lg"
          animate={{
            boxShadow: phase === 'free' 
              ? ['0 8px 30px rgba(212, 175, 55, 0.15)', '0 8px 50px rgba(212, 175, 55, 0.25)', '0 8px 30px rgba(212, 175, 55, 0.15)']
              : '0 8px 30px rgba(212, 175, 55, 0.15)',
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-2xl font-bold text-depth-deep mb-1">
            契約期間なし。完全自由。
          </div>
          <div className="text-sm text-depth-light">
            いつでも解約可能。あなたの成長だけにコミット。
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
