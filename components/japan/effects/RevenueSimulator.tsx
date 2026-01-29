"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Interactive Revenue Simulator (収益シミュレーター)
 * 
 * 「もしOTA依存度が70%から50%になったら？」
 * スライダーを動かすと、リアルタイムで「節約できる手数料（円）」が計算される。
 * 数値が上がると同時に、背景の光量が増し、画面全体が明るくなる演出を入れる。
 */

interface SimulatorInputs {
  monthlyRevenue: number;      // 月間売上（万円）
  currentOtaRatio: number;     // 現在のOTA比率（%）
  targetDirectRatio: number;   // 目標の直接予約比率（%）
  avgOtaCommission: number;    // 平均OTA手数料（%）
}

const DEFAULT_INPUTS: SimulatorInputs = {
  monthlyRevenue: 1000,        // 1000万円
  currentOtaRatio: 70,         // 70%
  targetDirectRatio: 50,       // 50%→直接予約
  avgOtaCommission: 15,        // 15%
};

function formatJPY(value: number): string {
  return new Intl.NumberFormat('ja-JP').format(value);
}

export default function RevenueSimulator() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevSavingsRef = useRef(0);

  // Calculate savings
  const currentOtaRevenue = inputs.monthlyRevenue * 10000 * (inputs.currentOtaRatio / 100);
  const currentCommission = currentOtaRevenue * (inputs.avgOtaCommission / 100);
  
  const newOtaRatio = 100 - inputs.targetDirectRatio;
  const newOtaRevenue = inputs.monthlyRevenue * 10000 * (newOtaRatio / 100);
  const newCommission = newOtaRevenue * (inputs.avgOtaCommission / 100);
  
  const monthlySavings = currentCommission - newCommission;
  const yearlySavings = monthlySavings * 12;
  
  // Light intensity based on savings
  const lightIntensity = Math.min(monthlySavings / 2000000, 1); // Max at 200万

  // Trigger animation on savings change
  useEffect(() => {
    if (monthlySavings !== prevSavingsRef.current) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      prevSavingsRef.current = monthlySavings;
      return () => clearTimeout(timer);
    }
  }, [monthlySavings]);

  const handleSliderChange = (key: keyof SimulatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden">
      {/* Dynamic Background Light */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse at 50% 50%, 
            rgba(212, 175, 55, ${0.05 + lightIntensity * 0.15}) 0%, 
            transparent 70%
          )`,
        }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="relative bg-white/80 backdrop-blur-sm border border-ceramic-silk rounded-3xl shadow-float p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-kintsugi-subtle rounded-full mb-4">
            <span className="w-2 h-2 bg-kintsugi-pure rounded-full animate-pulse" />
            <span className="text-sm font-medium text-kintsugi-muted">
              リアルタイム計算
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-indigo-deep tracking-tight">
            収益改善シミュレーター
          </h3>
          <p className="text-indigo-light mt-2">
            スライダーを動かして、節約できる手数料を確認しましょう
          </p>
        </div>

        {/* Input Sliders */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Monthly Revenue */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-indigo-rich">
                月間売上
              </label>
              <span className="text-lg font-bold text-indigo-deep">
                {formatJPY(inputs.monthlyRevenue)}万円
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="5000"
              step="100"
              value={inputs.monthlyRevenue}
              onChange={(e) => handleSliderChange('monthlyRevenue', Number(e.target.value))}
              className="w-full h-2 bg-ceramic-silk rounded-lg appearance-none cursor-pointer slider-gold"
            />
          </div>

          {/* Current OTA Ratio */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-indigo-rich">
                現在のOTA比率
              </label>
              <span className="text-lg font-bold text-ota">
                {inputs.currentOtaRatio}%
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="90"
              step="5"
              value={inputs.currentOtaRatio}
              onChange={(e) => handleSliderChange('currentOtaRatio', Number(e.target.value))}
              className="w-full h-2 bg-ceramic-silk rounded-lg appearance-none cursor-pointer slider-red"
            />
          </div>

          {/* Target Direct Ratio */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-indigo-rich">
                目標の直接予約比率
              </label>
              <span className="text-lg font-bold text-success">
                {inputs.targetDirectRatio}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="70"
              step="5"
              value={inputs.targetDirectRatio}
              onChange={(e) => handleSliderChange('targetDirectRatio', Number(e.target.value))}
              className="w-full h-2 bg-ceramic-silk rounded-lg appearance-none cursor-pointer slider-green"
            />
          </div>

          {/* OTA Commission Rate */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-indigo-rich">
                平均OTA手数料率
              </label>
              <span className="text-lg font-bold text-indigo-medium">
                {inputs.avgOtaCommission}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="25"
              step="1"
              value={inputs.avgOtaCommission}
              onChange={(e) => handleSliderChange('avgOtaCommission', Number(e.target.value))}
              className="w-full h-2 bg-ceramic-silk rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-kintsugi-subtle/50 to-white rounded-2xl p-8 border border-kintsugi-pure/20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {/* Current Commission */}
            <div>
              <div className="text-sm text-indigo-light mb-2">現在の手数料支出</div>
              <div className="text-2xl font-bold text-ota">
                ¥{formatJPY(Math.round(currentCommission))}
                <span className="text-sm font-normal text-indigo-light">/月</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-3xl text-kintsugi-pure"
              >
                →
              </motion.div>
            </div>

            {/* New Commission */}
            <div>
              <div className="text-sm text-indigo-light mb-2">改善後の手数料支出</div>
              <div className="text-2xl font-bold text-success">
                ¥{formatJPY(Math.round(newCommission))}
                <span className="text-sm font-normal text-indigo-light">/月</span>
              </div>
            </div>
          </div>

          {/* Savings Highlight */}
          <motion.div 
            className="mt-8 pt-8 border-t border-kintsugi-pure/20 text-center"
            animate={isAnimating ? { scale: [1, 1.02, 1] } : {}}
          >
            <div className="text-sm text-indigo-light mb-2">
              節約できる手数料
            </div>
            <motion.div 
              className="text-5xl md:text-6xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
              animate={isAnimating ? { 
                textShadow: ['0 0 20px rgba(212, 175, 55, 0)', '0 0 40px rgba(212, 175, 55, 0.5)', '0 0 20px rgba(212, 175, 55, 0)']
              } : {}}
            >
              ¥{formatJPY(Math.round(monthlySavings))}
              <span className="text-xl font-normal text-indigo-light">/月</span>
            </motion.div>
            
            <div className="mt-4 text-lg text-indigo-medium">
              年間 <span className="font-bold text-kintsugi-pure">¥{formatJPY(Math.round(yearlySavings))}</span> の収益改善
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <motion.button
            className="px-8 py-4 bg-indigo-deep text-white font-medium rounded-xl shadow-ceramic-lg"
            whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(15, 23, 42, 0.15)' }}
            whileTap={{ scale: 0.98 }}
          >
            無料でシミュレーション詳細を見る
          </motion.button>
          <p className="mt-3 text-sm text-indigo-pale">
            ※ 実際の効果は施設の状況により異なります
          </p>
        </div>
      </div>

      {/* Slider Styles */}
      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0F172A;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.2);
        }
        .slider-gold::-webkit-slider-thumb {
          background: #D4AF37;
        }
        .slider-red::-webkit-slider-thumb {
          background: #DC2626;
        }
        .slider-green::-webkit-slider-thumb {
          background: #059669;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
