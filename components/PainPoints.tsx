"use client";

import { Users, Globe2, LayoutGrid } from "lucide-react";

const painPoints = [
  {
    icon: Users,
    title: "深刻な人手不足",
    description:
      "スタッフ不足で「おもてなし」の質を維持できない。フロント業務、予約管理、ゲスト対応...すべてが手一杯。",
    stat: "71%のホテルが人手不足を報告",
  },
  {
    icon: Globe2,
    title: "インバウンド対応の限界",
    description:
      "LINE、WeChat、WhatsApp、Instagram...問い合わせチャネルが増え続け、多言語対応が追いつかない。",
    stat: "24時間365日の対応が求められる時代",
  },
  {
    icon: LayoutGrid,
    title: "ツールの乱立と非効率",
    description:
      "PMS、サイトコントローラー、OTA管理画面、チャットツール...15以上のシステムを使い分け、データ入力ミスも頻発。",
    stat: "平均15種類以上のツールを日々操作",
  },
];

export default function PainPoints() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            ホテル運営で、こんなお悩みはありませんか？
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            多くのホテル・旅館様が抱える共通の課題。
            <br />
            FifthKeysは、これらすべてを解決します。
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-bg-light rounded-2xl p-8 hover:shadow-lg transition-shadow group"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <point.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {point.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary mb-6 leading-relaxed">
                {point.description}
              </p>

              {/* Stat */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-primary">{point.stat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
