"use client";

import { motion } from "framer-motion";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "./ui/RevealOnScroll";
import { Counter } from "./ui/Counter";

const caseStudies = [
  {
    icon: "🏯",
    name: "箱根ビラ",
    location: "京都・45室",
    quote: "「FifthKeysで顧客関係を取り戻しました。OTAのアルゴリズム変動に一喜一憂せず、自分たちのゲストを育成できます。」",
    results: [
      { label: "導入前（月平均）", value: "OTA 80%" },
      { label: "3ヶ月後", value: "OTA 52%" },
      { label: "コンバージョン", value: "2.8% → 4.2%" },
      { label: "年間節減", value: "¥680,000", numValue: 680000, prefix: "¥" },
    ],
    gradient: "from-primary/20 to-blue-500/20"
  },
  {
    icon: "🏢",
    name: "セントラルプラザ",
    location: "大阪・80室",
    quote: "「6つの別々のツール管理から解放されました。レベニューマネージャーが戦略に集中できるようになり、チームの効率が2倍に。」",
    results: [
      { label: "管理時間削減", value: "14h → 2.5h/週" },
      { label: "直接予約率", value: "18% → 58%" },
      { label: "コンバージョン", value: "1.9% → 4.1%" },
      { label: "年間削減", value: "¥720,000", numValue: 720000, prefix: "¥" },
    ],
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: "🏨",
    name: "ステイ エコノミー",
    location: "東京・120室",
    quote: "「ゼロ円で始められたのが決め手。AIアップセリングで客室外収益が¥180,000増加。投資回収は3ヶ月。」",
    results: [
      { label: "初期投資", value: "¥0" },
      { label: "アップセル収益", value: "+¥180,000", numValue: 180000, prefix: "+¥" },
      { label: "直接予約シェア", value: "12% → 45%" },
      { label: "初年度純効果", value: "+¥528,000", numValue: 528000, prefix: "+¥" },
    ],
    gradient: "from-cyan-500/20 to-primary/20"
  }
];

export default function CaseStudies() {
  return (
    <section id="cases" className="py-24 lg:py-32 bg-bg-secondary relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">
              実際の事例：500+ホテルが導入
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              実際にFifthKeysを導入いただいたホテル様の成果をご紹介
            </p>
          </div>
        </RevealOnScroll>

        <StaggerContainer className="grid lg:grid-cols-3 gap-8" staggerDelay={0.15}>
          {caseStudies.map((study, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="relative bg-bg-tertiary border border-border-light rounded-xl overflow-hidden h-full group"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Hover border glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none"
                  whileHover={{ borderColor: "rgba(0, 217, 255, 0.2)" }}
                />

                {/* Header with gradient */}
                <div className={`bg-gradient-to-br ${study.gradient} p-8 relative overflow-hidden border-b border-border-light`}>
                  <div className="relative flex gap-4 items-center z-10">
                    <motion.div 
                      className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-lg border border-white/10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {study.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-xl tracking-tight text-white mb-1">{study.name}</h3>
                      <p className="text-sm text-white/80">{study.location}</p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 bg-bg-tertiary">
                  <p className="text-sm italic text-text-secondary mb-8 pl-4 border-l-2 border-primary leading-relaxed min-h-[80px]">
                    {study.quote}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {study.results.map((result, i) => (
                      <motion.div
                        key={i}
                        className="bg-bg-elevated p-4 rounded-xl border border-border-light hover:border-primary/30 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-[10px] text-text-tertiary mb-2 font-medium uppercase tracking-wider">{result.label}</p>
                        {result.numValue ? (
                          <Counter 
                            value={result.numValue}
                            prefix={result.prefix}
                            className="text-base font-bold text-white font-mono"
                          />
                        ) : (
                          <p className="text-base font-bold text-white font-mono">{result.value}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
