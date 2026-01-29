"use client";

import { Check, X, ArrowUpRight } from "lucide-react";

const beforeItems = [
  { name: "PMS", cost: "月額5万円〜" },
  { name: "サイトコントローラー", cost: "月額2万円〜" },
  { name: "レベニュー管理", cost: "月額3万円〜" },
  { name: "チャットボット", cost: "月額2万円〜" },
  { name: "ゲストメッセージング", cost: "月額1万円〜" },
];

const afterItems = [
  "スマートPMS",
  "チャネルマネージャー",
  "AIコンシェルジュ",
  "レベニューマネジメント",
  "ゲストエクスペリエンス",
  "レポート&分析",
];

export default function Solution() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          <span className="text-brown-light text-sm font-medium">
            なぜFifthKeysなのか
          </span>
        </div>

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          <div>
            <h2 className="text-3xl lg:text-5xl font-medium text-brown leading-tight">
              すべてを、
              <span className="relative inline-block">
                <span className="relative z-10">ひとつに。</span>
                <span className="absolute bottom-1 left-0 right-0 h-4 bg-highlight -z-0"></span>
              </span>
            </h2>
          </div>
          <div>
            <p className="text-lg text-brown-light leading-relaxed">
              バラバラだったツールを統合し、運営コストを劇的に削減。
              成功報酬型だからリスクゼロで始められます。
            </p>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Before */}
          <div className="bg-white rounded-2xl p-8 border border-brown/10">
            <p className="text-brown-muted text-sm font-medium mb-6">
              従来のシステム構成
            </p>

            <div className="space-y-4 mb-8">
              {beforeItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-brown/5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-50 rounded-full flex items-center justify-center">
                      <X className="w-3 h-3 text-red-400" />
                    </div>
                    <span className="text-brown-light">{item.name}</span>
                  </div>
                  <span className="text-sm text-brown-muted">{item.cost}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-brown/10">
              <div className="flex justify-between items-center">
                <span className="text-brown-muted">合計コスト</span>
                <div className="text-right">
                  <p className="text-2xl font-medium text-red-500">月額13万円〜</p>
                  <p className="text-sm text-brown-muted">+ 初期費用 30万円〜</p>
                </div>
              </div>
            </div>
          </div>

          {/* After - FifthKeys */}
          <div className="bg-primary rounded-2xl p-8 text-white">
            <p className="text-white/60 text-sm font-medium mb-6">
              FifthKeys オールインワン
            </p>

            <div className="space-y-4 mb-8">
              {afterItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0"
                >
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/20">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-white/60 text-sm">初期費用</p>
                  <p className="text-2xl font-medium">¥0</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-white/60 text-sm">月額費用</p>
                  <p className="text-2xl font-medium">¥0</p>
                </div>
              </div>
              <p className="text-white/70 text-sm text-center">
                お支払いは予約コミッション <span className="font-medium text-highlight">1〜2%</span> のみ
              </p>
            </div>
          </div>
        </div>

        {/* Savings Banner */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 bg-blue-light px-8 py-5 rounded-2xl">
            <span className="text-3xl">🎉</span>
            <div className="text-left">
              <p className="text-sm text-brown-muted">年間の削減効果</p>
              <p className="text-xl font-medium text-primary">100万円以上のコスト削減</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-medium transition-colors"
          >
            無料で試してみる
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
