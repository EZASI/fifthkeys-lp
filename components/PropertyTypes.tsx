"use client";

import { useState } from "react";
import { Building2, Hotel, Home, Warehouse, ArrowUpRight, Check } from "lucide-react";

const propertyTypes = [
  {
    id: "hotel",
    icon: Hotel,
    title: "ホテル",
    description: "ビジネスホテルからシティホテルまで、効率的な運営をサポート",
    features: ["自動チェックイン", "多言語対応", "レベニュー管理"],
    stats: { time: "24時間", users: "500+" },
  },
  {
    id: "ryokan",
    icon: Home,
    title: "旅館・民宿",
    description: "日本の伝統的なおもてなしをデジタルで強化",
    features: ["予約一元管理", "食事プラン管理", "顧客管理"],
    stats: { time: "48時間", users: "200+" },
  },
  {
    id: "guesthouse",
    icon: Building2,
    title: "ゲストハウス",
    description: "小規模施設でも大手並みの運営効率を実現",
    features: ["ドミトリー管理", "OTA連携", "清掃管理"],
    stats: { time: "12時間", users: "300+" },
  },
  {
    id: "vacation",
    icon: Warehouse,
    title: "民泊・バケーションレンタル",
    description: "複数物件の一括管理で運営コストを削減",
    features: ["スマートロック連携", "自動メッセージ", "収益分析"],
    stats: { time: "6時間", users: "150+" },
  },
];

export default function PropertyTypes() {
  const [activeType, setActiveType] = useState("hotel");
  const activeProperty = propertyTypes.find((p) => p.id === activeType);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          <span className="text-brown-light text-sm font-medium">
            施設タイプ別ソリューション
          </span>
        </div>

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          <div>
            <h2 className="text-3xl lg:text-5xl font-medium text-brown leading-tight">
              あなたの施設に
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">最適な機能を</span>
                <span className="absolute bottom-1 left-0 right-0 h-4 bg-highlight -z-0"></span>
              </span>
            </h2>
          </div>
          <div>
            <p className="text-lg text-brown-light leading-relaxed">
              ホテルから旅館、民泊まで。施設タイプに合わせた最適な機能をご提供します。
            </p>
          </div>
        </div>

        {/* Property Type Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            const isActive = activeType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`p-6 rounded-2xl border transition-all text-left ${
                  isActive
                    ? "border-primary bg-primary/5"
                    : "border-brown/10 bg-cream hover:border-brown/20"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-brown/5 text-brown"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className={`font-medium ${isActive ? "text-primary" : "text-brown"}`}>
                  {type.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Active Property Details */}
        {activeProperty && (
          <div className="bg-cream rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-primary font-medium text-sm mb-4">
                  {activeProperty.title}向け
                </p>
                <h3 className="text-2xl lg:text-3xl font-medium text-brown mb-4">
                  {activeProperty.title}向けソリューション
                </h3>
                <p className="text-brown-light text-lg mb-8">{activeProperty.description}</p>
                <ul className="space-y-4 mb-8">
                  {activeProperty.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-brown">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                  詳しい資料を見る
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-primary rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <activeProperty.icon className="w-24 h-24 text-white/20" />
                  </div>
                  <div className="absolute inset-4 top-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="p-4">
                      <div className="h-3 w-20 bg-white/30 rounded mb-3" />
                      <div className="grid grid-cols-3 gap-3">
                        <div className="h-12 bg-white/20 rounded-lg" />
                        <div className="h-12 bg-white/20 rounded-lg" />
                        <div className="h-12 bg-white/20 rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-brown/10">
                  <p className="text-sm text-brown-muted">導入施設数</p>
                  <p className="text-xl font-medium text-primary">{activeProperty.stats.users}</p>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-brown/10">
                  <p className="text-sm text-brown-muted">平均導入期間</p>
                  <p className="text-xl font-medium text-brown">{activeProperty.stats.time}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
