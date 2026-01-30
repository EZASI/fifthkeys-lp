"use client";

import { useEffect, useState } from "react";
import SmoothScroll from "@/components/japan-blue/core/SmoothScroll";
import StratosphereBackground from "@/components/japan-blue/core/StratosphereBackground";
import JapanBlueNav from "@/components/japan-blue/core/JapanBlueNav";
import JapanBlueHero from "@/components/japan-blue/sections/JapanBlueHero";
import BluePrismSync from "@/components/japan-blue/effects/BluePrismSync";
import BlueZeroRiskSimulator from "@/components/japan-blue/effects/BlueZeroRiskSimulator";
import BlueTractorBeam from "@/components/japan-blue/effects/BlueTractorBeam";
import BlueLightPathBorder, { BlueGlassPanel } from "@/components/japan-blue/effects/BlueLightPathBorder";
import BlueFooter from "@/components/japan-blue/sections/BlueFooter";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Globe, Bot, RefreshCw } from "lucide-react";

const TOKENS = {
  deepVoid: "#000B18",
  navySurface: "#001B3D",
  electricCyan: "#00E5FF",
  royalBlue: "#1E50FF",
  mintStatus: "#00F59B",
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen" style={{ backgroundColor: TOKENS.deepVoid }} />;
  }

  return (
    <SmoothScroll>
      {/* Deep Ocean Background */}
      <StratosphereBackground />
      
      {/* Glassmorphism Navigation */}
      <JapanBlueNav />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <JapanBlueHero />
        
        {/* Prism Sync Section */}
        <section className="py-32 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div 
                className="text-[10px] font-mono uppercase tracking-widest mb-4"
                style={{ color: TOKENS.electricCyan }}
              >
                配信エンジン // プリズム同期
              </div>
              <h2 
                className="text-4xl font-semibold tracking-tight mb-4"
                style={{ 
                  color: "white",
                  fontFeatureSettings: "'palt'",
                }}
              >
                在庫更新、もう手動でやらない。
              </h2>
              <p 
                className="max-w-xl mx-auto"
                style={{ 
                  color: "rgba(255, 255, 255, 0.6)",
                  fontFeatureSettings: "'palt'",
                }}
              >
                5つのOTAに、0.3秒で同期。オーバーブッキングなし。
              </p>
            </div>
            
            <div 
              className="rounded-2xl p-8"
              style={{
                background: "rgba(0, 27, 61, 0.4)",
                border: "1px solid rgba(0, 229, 255, 0.15)",
                backdropFilter: "blur(20px)",
              }}
            >
              <BluePrismSync />
            </div>
          </div>
        </section>

        {/* Zero Risk Simulator */}
        <section className="py-16 px-8">
          <div className="max-w-5xl mx-auto">
            <BlueZeroRiskSimulator />
          </div>
        </section>

        {/* Tractor Beam Section */}
        <section className="py-32 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div 
                className="text-[10px] font-mono uppercase tracking-widest mb-4"
                style={{ color: TOKENS.electricCyan }}
              >
                獲得エンジン // 直接予約
              </div>
              <h2 
                className="text-4xl font-semibold tracking-tight mb-4"
                style={{ 
                  color: "white",
                  fontFeatureSettings: "'palt'",
                }}
              >
                OTAの25%手数料を、3%に。
              </h2>
              <p 
                className="max-w-xl mx-auto"
                style={{ 
                  color: "rgba(255, 255, 255, 0.6)",
                  fontFeatureSettings: "'palt'",
                }}
              >
                22%の利益増加。直接予約を自動獲得。
              </p>
            </div>
            
            <BlueTractorBeam />
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 
                className="text-4xl font-semibold tracking-tight mb-4"
                style={{ 
                  color: "white",
                  fontFeatureSettings: "'palt'",
                }}
              >
                完全統合インフラ
              </h2>
              <p 
                style={{ 
                  color: "rgba(255, 255, 255, 0.6)",
                  fontFeatureSettings: "'palt'",
                }}
              >
                直接収益を最大化するために必要なすべて。
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: RefreshCw, title: "チャネルマネージャー", desc: "リアルタイムOTA同期", stat: "週11時間節約" },
                { icon: Globe, title: "予約エンジン", desc: "モバイル最適化", stat: "成約率 4.2%" },
                { icon: Zap, title: "レベニューAI", desc: "ダイナミックプライシング", stat: "客室単価 +18%" },
                { icon: Bot, title: "AIコンシェルジュ", desc: "24時間多言語対応", stat: "追加販売 +25%" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div 
                    className="h-full rounded-xl p-6"
                    style={{
                      background: "rgba(0, 27, 61, 0.5)",
                      border: "1px solid rgba(0, 229, 255, 0.15)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <feature.icon 
                      className="w-8 h-8 mb-4"
                      style={{ color: TOKENS.electricCyan }}
                    />
                    <h3 
                      className="text-lg font-semibold mb-2"
                      style={{ color: "white" }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="text-sm mb-4"
                      style={{ color: "rgba(255, 255, 255, 0.6)" }}
                    >
                      {feature.desc}
                    </p>
                    <div 
                      className="text-sm font-mono"
                      style={{ color: TOKENS.mintStatus }}
                    >
                      {feature.stat}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div 
                className="text-[10px] font-mono uppercase tracking-widest mb-6"
                style={{ color: TOKENS.mintStatus }}
              >
                成長準備完了
              </div>
              
              <h2 
                className="text-5xl font-semibold tracking-tight mb-6"
                style={{ 
                  color: "white",
                  fontFeatureSettings: "'palt'",
                }}
              >
                リスクゼロで、今すぐ始める。
              </h2>
              
              <p 
                className="text-lg mb-10"
                style={{ 
                  color: "rgba(255, 255, 255, 0.6)",
                  fontFeatureSettings: "'palt'",
                }}
              >
                30日間、完全無料。クレジットカード不要。
                <br />
                あなたが稼ぐまで、私たちは1円もいただきません。
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  className="group px-10 py-5 font-semibold text-lg rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${TOKENS.royalBlue} 0%, ${TOKENS.electricCyan} 100%)`,
                    color: "white",
                    boxShadow: `0 8px 32px ${TOKENS.royalBlue}60`,
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: `0 12px 40px ${TOKENS.royalBlue}80`,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    無料で始める
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </div>
              
              <div 
                className="flex justify-center gap-8 mt-10 text-[10px] font-mono uppercase tracking-widest"
                style={{ color: "rgba(255, 255, 255, 0.4)" }}
              >
                <span>初期費用 ¥0</span>
                <span>•</span>
                <span>30日間無料</span>
                <span>•</span>
                <span>成果が出たら 3%だけ</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <BlueFooter />
    </SmoothScroll>
  );
}
