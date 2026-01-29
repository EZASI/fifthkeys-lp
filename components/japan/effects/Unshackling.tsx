"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/**
 * Unshackling (鎖からの解放)
 * 
 * 固定費ゼロ・リスクゼロの視覚化
 * 
 * 画面左側：「固定費」を表す重いグレーの岩が鎖で繋がれている。
 * FifthKeysの光が触れると、鎖が弾け飛び、
 * 岩が美しい「クリスタル（収益）」に変化して浮遊する。
 */

interface CostBlock {
  id: string;
  label: string;
  amount: string;
  x: number;
  y: number;
}

const COST_BLOCKS: CostBlock[] = [
  { id: 'pms', label: 'PMS月額', amount: '¥45,000', x: 80, y: 60 },
  { id: 'cm', label: 'チャネル管理', amount: '¥25,000', x: 150, y: 140 },
  { id: 'be', label: '予約エンジン', amount: '¥15,000', x: 60, y: 200 },
  { id: 'support', label: 'サポート費', amount: '¥10,000', x: 170, y: 260 },
];

export default function Unshackling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [phase, setPhase] = useState<'chained' | 'breaking' | 'transformed' | 'floating'>('chained');

  useEffect(() => {
    if (!isInView) return;
    
    const timeline = [
      { phase: 'breaking' as const, at: 1000 },
      { phase: 'transformed' as const, at: 2000 },
      { phase: 'floating' as const, at: 2800 },
    ];
    
    const timeouts = timeline.map(({ phase: p, at }) => 
      setTimeout(() => setPhase(p), at)
    );
    
    return () => timeouts.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-ceramic-mist to-ceramic-cloud"
    >
      {/* Labels */}
      <div className="absolute top-6 left-6">
        <div className="text-sm font-medium text-indigo-light mb-1">BEFORE</div>
        <div className="text-lg font-bold text-indigo-deep">従来のコスト構造</div>
      </div>
      
      <div className="absolute top-6 right-6 text-right">
        <div className="text-sm font-medium text-kintsugi-muted mb-1">AFTER</div>
        <div className="text-lg font-bold text-kintsugi-pure">FifthKeysモデル</div>
      </div>

      {/* Cost Blocks (Left Side - Chained) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-full">
        {/* Chains (SVG) */}
        <svg className="absolute inset-0 w-full h-full">
          {COST_BLOCKS.map((block, i) => {
            const nextBlock = COST_BLOCKS[i + 1];
            if (!nextBlock) return null;
            
            return (
              <motion.line
                key={`chain-${block.id}`}
                x1={block.x + 40}
                y1={block.y + 20}
                x2={nextBlock.x + 40}
                y2={nextBlock.y + 20}
                stroke={phase === 'chained' ? '#94A3B8' : 'transparent'}
                strokeWidth="3"
                strokeDasharray="8 4"
                initial={{ opacity: 1 }}
                animate={{ 
                  opacity: phase === 'breaking' ? [1, 0] : phase === 'chained' ? 1 : 0,
                  pathLength: phase === 'breaking' ? [1, 0] : 1,
                }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            );
          })}
          
          {/* Anchor Line to Ground */}
          <motion.line
            x1="120"
            y1="300"
            x2="120"
            y2="380"
            stroke={phase === 'chained' ? '#64748B' : 'transparent'}
            strokeWidth="4"
            animate={{ 
              opacity: phase === 'breaking' || phase === 'transformed' || phase === 'floating' ? 0 : 1,
            }}
          />
        </svg>

        {/* Cost Blocks */}
        <AnimatePresence mode="wait">
          {(phase === 'chained' || phase === 'breaking') && COST_BLOCKS.map((block, i) => (
            <motion.div
              key={block.id}
              className="absolute w-24 h-12 flex flex-col items-center justify-center rounded-lg bg-indigo-pale/30 border border-indigo-pale shadow-ceramic-md"
              style={{ left: block.x, top: block.y }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: phase === 'breaking' ? [1, 0] : 1, 
                y: phase === 'breaking' ? [0, 50] : 0,
                scale: phase === 'breaking' ? [1, 0.8] : 1,
                rotate: phase === 'breaking' ? [0, Math.random() * 20 - 10] : 0,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ 
                delay: phase === 'breaking' ? i * 0.1 : i * 0.15,
                duration: phase === 'breaking' ? 0.4 : 0.5,
              }}
            >
              <span className="text-[10px] text-indigo-light">{block.label}</span>
              <span className="text-sm font-bold text-indigo-rich">{block.amount}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Breaking Particles */}
        {phase === 'breaking' && (
          <motion.div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-indigo-pale rounded-full"
                style={{ 
                  left: 100 + Math.random() * 100,
                  top: 150 + Math.random() * 100,
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ 
                  opacity: 0,
                  scale: 0,
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100,
                }}
                transition={{ duration: 0.6, delay: Math.random() * 0.3 }}
              />
            ))}
          </motion.div>
        )}

        {/* Total (Chained State) */}
        {phase === 'chained' && (
          <motion.div
            className="absolute bottom-8 left-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-xs text-indigo-light">月額固定費</div>
            <div className="text-2xl font-bold text-ota">¥95,000</div>
          </motion.div>
        )}
      </div>

      {/* Divider / Transformation Zone */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20"
        animate={{
          scale: phase === 'transformed' || phase === 'floating' ? [1, 1.2, 1] : 1,
          opacity: phase === 'breaking' || phase === 'transformed' ? 1 : 0.5,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* FifthKeys Light */}
        <div className="relative w-full h-full">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
            }}
            animate={{
              scale: phase === 'transformed' || phase === 'floating' ? [1, 1.5, 1] : 1,
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-kintsugi-pure">F</span>
          </div>
        </div>
      </motion.div>

      {/* Crystals (Right Side - Transformed) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full">
        <AnimatePresence>
          {(phase === 'transformed' || phase === 'floating') && (
            <>
              {/* Main Crystal */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  y: phase === 'floating' ? [0, -15, 0] : 0,
                }}
                transition={{ 
                  duration: 0.6,
                  y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                {/* Crystal Shape */}
                <div 
                  className="w-32 h-40 relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(244, 208, 63, 0.4) 50%, rgba(212, 175, 55, 0.2) 100%)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)',
                  }}
                >
                  {/* Inner Glow */}
                  <div 
                    className="absolute inset-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%)',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                  />
                </div>
                
                {/* Value Label */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-xs text-kintsugi-muted font-medium">固定費</div>
                  <div className="text-2xl font-bold text-kintsugi-pure">¥0</div>
                </div>
              </motion.div>

              {/* Small Floating Crystals */}
              {[
                { x: 60, y: 80, size: 20, delay: 0.2 },
                { x: 180, y: 100, size: 16, delay: 0.4 },
                { x: 100, y: 250, size: 18, delay: 0.6 },
                { x: 200, y: 220, size: 14, delay: 0.8 },
              ].map((crystal, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ 
                    left: crystal.x, 
                    top: crystal.y,
                    width: crystal.size,
                    height: crystal.size * 1.2,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 0.6, 
                    scale: 1,
                    y: phase === 'floating' ? [0, -10, 0] : 0,
                  }}
                  transition={{ 
                    delay: crystal.delay,
                    y: { duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <div 
                    className="w-full h-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(244, 208, 63, 0.5) 100%)',
                      clipPath: 'polygon(50% 0%, 100% 30%, 100% 70%, 50% 100%, 0% 70%, 0% 30%)',
                    }}
                  />
                </motion.div>
              ))}

              {/* New Cost Structure */}
              <motion.div
                className="absolute bottom-8 right-8 text-right"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-xs text-kintsugi-muted">成果報酬モデル</div>
                <div className="text-2xl font-bold text-success">売上の3%のみ</div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Message */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'floating' ? 1 : 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-sm text-indigo-medium">
          重力から解放された、新しい収益構造
        </div>
      </motion.div>
    </div>
  );
}
