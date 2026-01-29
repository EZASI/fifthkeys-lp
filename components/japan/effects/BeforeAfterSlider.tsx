"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, Printer, Monitor, MonitorSmartphone, CheckCircle2 } from "lucide-react";

/**
 * BeforeAfterSlider (Ryokan Hero Visualizer)
 * 
 * 「伝統」と「革新」の対比。
 * 画面をスライダーで分割（Before/After）。
 * Before: 散乱した書類、FAX、複数の管理画面（モノクロ）。
 * After: 整理されたたった一つのダッシュボード（カラー、光）。
 */

export default function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-float select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* BEFORE Side (Full Width, Clipped) */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {/* Grayscale Filter */}
        <div className="absolute inset-0 grayscale">
          {/* Scattered Elements */}
          <div className="absolute inset-0 p-8">
            {/* Messy Papers */}
            <div className="absolute top-12 left-8 w-32 h-40 bg-white rounded shadow-md transform rotate-[-5deg] opacity-80">
              <div className="p-3">
                <div className="h-2 w-20 bg-gray-300 mb-2" />
                <div className="h-2 w-16 bg-gray-300 mb-2" />
                <div className="h-2 w-24 bg-gray-300 mb-2" />
                <div className="h-2 w-12 bg-gray-300" />
              </div>
            </div>
            
            <div className="absolute top-20 left-24 w-28 h-36 bg-white rounded shadow-md transform rotate-[8deg] opacity-70">
              <div className="p-3">
                <div className="h-2 w-16 bg-gray-300 mb-2" />
                <div className="h-2 w-20 bg-gray-300" />
              </div>
            </div>

            {/* Old FAX */}
            <div className="absolute top-8 right-1/4 flex items-center gap-2 bg-gray-100 px-3 py-2 rounded border border-gray-300">
              <Printer className="w-5 h-5 text-gray-500" />
              <span className="text-xs text-gray-500">FAX受信中...</span>
            </div>

            {/* Multiple Screens */}
            <div className="absolute bottom-12 left-12 flex gap-2">
              <div className="w-24 h-16 bg-gray-800 rounded-t border-2 border-gray-600 flex items-center justify-center">
                <Monitor className="w-6 h-6 text-gray-500" />
              </div>
              <div className="w-20 h-14 bg-gray-800 rounded-t border-2 border-gray-600 flex items-center justify-center transform rotate-[-3deg]">
                <Monitor className="w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* Spreadsheet Icon */}
            <div className="absolute bottom-16 right-16 w-16 h-20 bg-green-800/30 rounded flex items-center justify-center">
              <FileSpreadsheet className="w-8 h-8 text-gray-500" />
            </div>

            {/* Stress Indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-4xl mb-2">😰</div>
              <div className="text-sm text-gray-600 font-medium">
                管理に追われる毎日
              </div>
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-gray-800/80 text-white text-sm font-medium rounded-full">
          BEFORE
        </div>
      </div>

      {/* AFTER Side (Full Width, Clipped Inverse) */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-ceramic-pure to-ceramic-mist"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        {/* Golden Ambient Light */}
        <div 
          className="absolute top-0 right-0 w-96 h-96"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
          }}
        />

        {/* Clean Dashboard UI */}
        <div className="absolute inset-0 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Dashboard Card */}
            <motion.div 
              className="bg-white rounded-2xl shadow-float p-6 border border-ceramic-silk"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-kintsugi-pure to-kintsugi-light rounded-xl flex items-center justify-center text-white font-bold">
                    F
                  </div>
                  <div>
                    <div className="font-bold text-indigo-deep">FifthKeys</div>
                    <div className="text-xs text-indigo-light">統合ダッシュボード</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-success">
                  <span className="w-2 h-2 bg-success rounded-full" />
                  稼働中
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-ceramic-mist rounded-xl p-4">
                  <div className="text-xs text-indigo-light mb-1">本日の予約</div>
                  <div className="text-2xl font-bold text-indigo-deep">12<span className="text-sm font-normal">件</span></div>
                </div>
                <div className="bg-kintsugi-subtle rounded-xl p-4">
                  <div className="text-xs text-kintsugi-muted mb-1">直接予約率</div>
                  <div className="text-2xl font-bold text-kintsugi-pure">58<span className="text-sm font-normal">%</span></div>
                </div>
              </div>

              {/* Status Items */}
              <div className="space-y-3">
                {['全チャネル同期完了', 'AI最適化稼働中', 'レポート自動生成'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="text-indigo-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Unified Device */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2 text-indigo-light">
                <MonitorSmartphone className="w-5 h-5" />
                <span className="text-sm">どこからでもアクセス</span>
              </div>
            </div>
          </div>
        </div>

        {/* Happy Indicator */}
        <div className="absolute bottom-8 right-8 text-center">
          <div className="text-3xl mb-1">😊</div>
          <div className="text-xs text-indigo-light">
            本業に集中できる
          </div>
        </div>

        {/* Label */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-kintsugi-pure text-white text-sm font-medium rounded-full shadow-kintsugi-glow">
          AFTER
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-float flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-indigo-pale rounded-full" />
            <div className="w-0.5 h-4 bg-indigo-pale rounded-full" />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-sm text-indigo-medium shadow-ceramic-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        ← スライドして比較 →
      </motion.div>
    </div>
  );
}
