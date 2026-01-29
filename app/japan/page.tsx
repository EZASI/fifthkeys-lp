"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CeramicBackground from "@/components/japan/core/CeramicBackground";
import PrismStream from "@/components/japan/effects/PrismStream";
import Unshackling from "@/components/japan/effects/Unshackling";
import RevenueSimulator from "@/components/japan/effects/RevenueSimulator";
import BeforeAfterSlider from "@/components/japan/effects/BeforeAfterSlider";
import { ArrowRight, CheckCircle2, Building2, Users, TrendingUp, Shield } from "lucide-react";

/**
 * FifthKeys Japan Edition
 * 
 * "従来のSaaSサイトを破壊し、信頼と革新が融合した『無重力の成長エンジン』を構築せよ。"
 */

export default function JapanPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-ceramic-mist" />;
  }

  return (
    <div className="relative min-h-screen bg-ceramic-mist">
      {/* Ceramic Background */}
      <CeramicBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-ceramic-silk">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-kintsugi-pure to-kintsugi-light rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-kintsugi-glow">
              F
            </div>
            <span className="text-lg font-bold text-indigo-deep tracking-tight">FifthKeys</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            {['機能', '料金', '導入事例', 'お知らせ'].map((item) => (
              <a 
                key={item}
                href="#"
                className="text-sm text-indigo-medium hover:text-indigo-deep transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-indigo-medium hover:text-indigo-deep">
              ログイン
            </a>
            <motion.button
              className="px-5 py-2.5 bg-indigo-deep text-white text-sm font-medium rounded-xl shadow-ceramic-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              無料で始める
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-20">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Copy */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-kintsugi-subtle rounded-full mb-6"
                >
                  <span className="text-sm text-kintsugi-muted font-medium">
                    🇯🇵 日本のホテル・旅館専用
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-deep tracking-tight leading-tight mb-6"
                >
                  固定費ゼロ。
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-kintsugi-pure to-kintsugi-light">
                    成長だけが、残る。
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-indigo-medium leading-relaxed mb-8 max-w-lg"
                >
                  従来のPMSは毎月固定費が発生します。
                  FifthKeysは成果報酬モデル。
                  売上がない時期のコストはゼロ、
                  成長した分だけをシェアするパートナーです。
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    className="group px-8 py-4 bg-indigo-deep text-white font-medium rounded-xl shadow-ceramic-lg flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    無料トライアルを始める
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <motion.button
                    className="px-8 py-4 bg-white text-indigo-deep font-medium rounded-xl border border-ceramic-silk shadow-ceramic-sm"
                    whileHover={{ borderColor: '#D4AF37' }}
                  >
                    資料をダウンロード
                  </motion.button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-10 flex items-center gap-6 text-sm text-indigo-light"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    クレジットカード不要
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    30日間無料
                  </div>
                </motion.div>
              </div>

              {/* Right: Before/After */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <BeforeAfterSlider />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problem Section: Unshackling */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="text-sm text-kintsugi-muted font-medium mb-4">
                なぜFifthKeysなのか
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-deep tracking-tight mb-4">
                固定費という「重力」から、解放される
              </h2>
              <p className="text-indigo-medium max-w-2xl mx-auto">
                閑散期でも毎月同じ金額が引き落とされる。
                その重圧から、私たちは解放します。
              </p>
            </div>

            <Unshackling />
          </div>
        </section>

        {/* Integration Section: Prism Stream */}
        <section className="py-24 bg-white/50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="text-sm text-kintsugi-muted font-medium mb-4">
                チャネル統合
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-deep tracking-tight mb-4">
                バラバラを、ひとつに。
              </h2>
              <p className="text-indigo-medium max-w-2xl mx-auto">
                OTA、PMS、メタサーチ...複数のツールを
                一つの美しいシステムに統合します。
              </p>
            </div>

            <PrismStream />
          </div>
        </section>

        {/* Simulator Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="text-sm text-kintsugi-muted font-medium mb-4">
                収益シミュレーション
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-deep tracking-tight mb-4">
                あなたの施設の可能性を計算する
              </h2>
            </div>

            <RevenueSimulator />
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-deep tracking-tight mb-4">
                すべてが、ひとつの場所に
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Building2, title: 'チャネル管理', desc: '全OTAを一括同期' },
                { icon: Users, title: '予約管理', desc: 'ゲスト情報を一元化' },
                { icon: TrendingUp, title: '収益最適化', desc: 'AIが価格を自動調整' },
                { icon: Shield, title: 'セキュリティ', desc: '万全のデータ保護' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-ceramic-md border border-ceramic-silk hover:shadow-float transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-kintsugi-subtle rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-kintsugi-pure" />
                  </div>
                  <h3 className="text-lg font-bold text-indigo-deep mb-2">{feature.title}</h3>
                  <p className="text-sm text-indigo-light">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-deep tracking-tight mb-6">
                リスクゼロで、始めませんか。
              </h2>
              <p className="text-lg text-indigo-medium mb-10">
                クレジットカード不要。30日間の無料トライアル。
                <br />
                お気に召さなければ、いつでも解約できます。
              </p>
              
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-kintsugi-pure to-kintsugi-light text-white font-bold text-lg rounded-xl shadow-kintsugi-glow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                無料で始める
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-deep text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-kintsugi-pure font-bold text-xl">
                  F
                </div>
                <span className="text-lg font-bold">FifthKeys</span>
              </div>
              <p className="text-sm text-white/60">
                日本のホテル・旅館のための
                次世代収益最適化プラットフォーム
              </p>
            </div>
            
            {[
              { title: 'プロダクト', links: ['機能一覧', '料金', 'セキュリティ', 'API'] },
              { title: '会社情報', links: ['会社概要', 'お知らせ', '採用情報', 'お問い合わせ'] },
              { title: 'リソース', links: ['ヘルプセンター', 'ブログ', '導入事例', 'パートナー'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © 2026 FifthKeys Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/40">
              <a href="#" className="hover:text-white">プライバシーポリシー</a>
              <a href="#" className="hover:text-white">利用規約</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
