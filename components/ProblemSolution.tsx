"use client";

import { AlertCircle, Clock, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "./ui/RevealOnScroll";
import { Counter } from "./ui/Counter";

const problems = [
  {
    icon: AlertCircle,
    title: "OTA手数料の重圧",
    description: "売上の20%近くが手数料として消えていく。利益率を圧迫する最大の要因。",
    stat: "年間 ¥238,000 損失",
    statValue: 238000,
    statPrefix: "年間 ¥",
    statSuffix: " 損失",
    accent: "text-error",
    bg: "bg-error/10",
    borderHover: "hover:border-error/30",
  },
  {
    icon: Clock,
    title: "分散するツール",
    description: "PMS、チャネルマネージャー、予約エンジン... 複数の管理画面を行き来する日々。",
    stat: "週 11時間 の浪費",
    statValue: 11,
    statPrefix: "週 ",
    statSuffix: "時間 の浪費",
    accent: "text-warning",
    bg: "bg-warning/10",
    borderHover: "hover:border-warning/30",
  },
  {
    icon: Coins,
    title: "固定費の無駄",
    description: "稼働率が低い月でも発生する高額なシステム利用料。経営の柔軟性を奪います。",
    stat: "月額 ¥5,000〜",
    statValue: 5000,
    statPrefix: "月額 ¥",
    statSuffix: "〜",
    accent: "text-info",
    bg: "bg-info/10",
    borderHover: "hover:border-info/30",
  },
];

export default function ProblemSolution() {
  return (
    <section className="py-24 lg:py-32 relative bg-bg-primary overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 tech-grid tech-grid-mask opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll direction="right">
            <div className="text-left">
              <h2 className="text-4xl lg:text-5xl font-semibold tracking-tighter text-white mb-6">
                ホテル運営の
                <br />
                <span className="text-primary">「見えない損失」</span>
                <br />
                に気づいていますか？
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed max-w-lg mb-8">
                多くの独立系ホテルが、複雑なシステムと高額な手数料によって、本来得られるはずの利益を失っています。
              </p>
              <motion.div 
                className="h-1 w-20 bg-primary/30 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </RevealOnScroll>

          <StaggerContainer className="space-y-6" staggerDelay={0.15}>
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    className={`flex items-start gap-6 p-6 bg-bg-tertiary border border-border-light rounded-xl transition-all duration-300 ${problem.borderHover}`}
                    whileHover={{ 
                      x: 8, 
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${problem.bg} ${problem.accent}`}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-white mb-2">
                        {problem.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed mb-3 text-sm">
                        {problem.description}
                      </p>
                      <span className={`text-xs font-bold px-2 py-1 rounded bg-bg-secondary border border-border-light text-text-tertiary`}>
                        {problem.stat}
                      </span>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
