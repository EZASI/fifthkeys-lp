"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PlatinumBackground from "@/components/platinum/core/PlatinumBackground";
import MeltingIce from "@/components/platinum/effects/MeltingIce";
import DissolvingGate from "@/components/platinum/effects/DissolvingGate";
import PrismAlignment from "@/components/platinum/effects/PrismAlignment";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

/**
 * FifthKeys: Platinum Kinetic OS (Japan)
 * 
 * "Daylight Cockpit" - Heavy, Expensive, Light Mode
 * Uses colored shadows and volumetric gradients for depth
 */

export default function PlatinumPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen" style={{ background: '#F8FAFC' }} />;
  }

  return (
    <div className="relative min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Platinum Background */}
      <PlatinumBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div 
          className="mx-auto max-w-7xl px-6 py-4"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
          }}
        >
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3">
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(212, 175, 55, 0.25)',
                }}
              >
                F
              </div>
              <div>
                <span className="text-lg font-bold" style={{ color: '#0F172A' }}>FifthKeys</span>
                <div className="text-[10px] font-mono" style={{ color: '#94A3B8' }}>PLATINUM // JP</div>
              </div>
            </a>
            
            <nav className="hidden md:flex items-center gap-8">
              {['機能', '料金', '事例', 'お知らせ'].map((item) => (
                <a 
                  key={item}
                  href="#"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: '#334155' }}
                >
                  {item}
                </a>
              ))}
            </nav>
            
            <motion.button
              className="px-6 py-2.5 text-sm font-medium rounded-xl"
              style={{
                background: '#0F172A',
                color: 'white',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
              }}
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
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{
                  background: 'rgba(255, 251, 235, 0.8)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: '#D4AF37' }} />
                <span className="text-sm font-medium" style={{ color: '#B8860B' }}>
                  日本のホテル・旅館のための革新
                </span>
              </motion.div>

              {/* Headline - Apple Japan Style */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8"
                style={{ color: '#0F172A' }}
              >
                重荷を、光へ。
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
                style={{ color: '#334155' }}
              >
                毎月の固定費という重荷を、
                成長という光に変える。
                FifthKeysは成果報酬モデル。
                あなたが成功した時だけ、私たちも成功する。
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.button
                  className="group px-8 py-4 text-white font-medium rounded-xl flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #E8C547 100%)',
                    boxShadow: '0 8px 30px rgba(212, 175, 55, 0.3)',
                  }}
                  whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(212, 175, 55, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  無料トライアルを始める
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 font-medium rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    color: '#0F172A',
                    boxShadow: '0 4px 12px rgba(100, 116, 139, 0.08)',
                  }}
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
                className="mt-12 flex items-center justify-center gap-8 text-sm"
                style={{ color: '#64748B' }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" style={{ color: '#059669' }} />
                  クレジットカード不要
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" style={{ color: '#059669' }} />
                  契約期間なし
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" style={{ color: '#059669' }} />
                  いつでも解約可能
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Scene 1: Melting Ice */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: '#94A3B8' }}>
                MARKET_FAILURE_01
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: '#0F172A' }}>
                固定費の融解
              </h2>
              <p className="max-w-xl mx-auto" style={{ color: '#64748B' }}>
                毎月の重い固定費を、軽やかな成果報酬へ。
                売上ゼロの月は、コストもゼロ。
              </p>
            </div>
            
            <MeltingIce />
          </div>
        </section>

        {/* Scene 2: Dissolving Gate */}
        <section className="py-24" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(238, 242, 255, 0.3) 50%, transparent 100%)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: '#94A3B8' }}>
                MARKET_FAILURE_02
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: '#0F172A' }}>
                契約という檻からの解放
              </h2>
              <p className="max-w-xl mx-auto" style={{ color: '#64748B' }}>
                長期契約の縛りは、もう必要ありません。
                いつでも自由に。
              </p>
            </div>
            
            <DissolvingGate />
          </div>
        </section>

        {/* Scene 3: Prism Alignment */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: '#94A3B8' }}>
                MARKET_FAILURE_03
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: '#0F172A' }}>
                散らばった力を、一つに。
              </h2>
              <p className="max-w-xl mx-auto" style={{ color: '#64748B' }}>
                バラバラのシステムを統合し、
                収益を最大化する一本の光へ。
              </p>
            </div>
            
            <PrismAlignment />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                style={{ color: '#0F172A' }}
              >
                始めるリスクは、ゼロ。
              </h2>
              <p 
                className="text-lg mb-10 max-w-xl mx-auto"
                style={{ color: '#64748B' }}
              >
                固定費なし。契約期間なし。
                うまくいかなければ、いつでも離れられる。
                でも、きっと離れたくなくなる。
              </p>
              
              <motion.button
                className="px-12 py-5 text-white font-bold text-lg rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #E8C547 100%)',
                  boxShadow: '0 8px 30px rgba(212, 175, 55, 0.35)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 12px 50px rgba(212, 175, 55, 0.45)' }}
                whileTap={{ scale: 0.98 }}
              >
                無料で始める
              </motion.button>
              
              <div 
                className="mt-8 text-sm font-mono"
                style={{ color: '#94A3B8' }}
              >
                ¥0 SETUP // NO_CONTRACT // FULL_ACCESS
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: '#0F172A', color: 'white' }} className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl"
                  style={{ background: '#D4AF37', color: 'white' }}
                >
                  F
                </div>
                <span className="text-lg font-bold">FifthKeys</span>
              </div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                日本のホテル・旅館のための
                次世代収益最適化プラットフォーム
              </p>
            </div>
            
            {[
              { title: 'プロダクト', links: ['機能一覧', '料金', 'セキュリティ', 'API'] },
              { title: '会社情報', links: ['会社概要', 'お知らせ', '採用情報', 'お問い合わせ'] },
              { title: 'リソース', links: ['ヘルプ', 'ブログ', '導入事例', 'パートナー'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a 
                        href="#" 
                        className="text-sm hover:text-white transition-colors"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div 
            className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          >
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              © 2026 FifthKeys Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <a href="#" className="hover:text-white">プライバシー</a>
              <a href="#" className="hover:text-white">利用規約</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
