"use client";

import { Shield, MapPin, Building2, Users, Calendar, Coins, ExternalLink } from "lucide-react";

const companyInfo = [
  { label: "会社名", value: "FifthKeys株式会社", icon: Building2 },
  { label: "設立", value: "2020年4月", icon: Calendar },
  { label: "資本金", value: "1億円", icon: Coins },
  { label: "従業員数", value: "50名", icon: Users },
  { label: "所在地", value: "東京都千代田区丸の内1-1-1", icon: MapPin },
  { label: "事業内容", value: "ホテル向けクラウドシステムの開発・運営", icon: Building2 },
];

const certifications = [
  { name: "SOC2 Type II", description: "情報セキュリティ" },
  { name: "ISO 27001", description: "ISMS認証取得" },
];

const partners = ["楽天トラベル", "じゃらん", "Booking.com", "Expedia", "一休.com", "Agoda"];

export default function CompanyProfile() {
  return (
    <section id="company" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          <span className="text-brown-light text-sm font-medium">
            会社概要
          </span>
        </div>

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          <div>
            <h2 className="text-3xl lg:text-5xl font-medium text-brown leading-tight">
              FifthKeysについて
            </h2>
          </div>
          <div>
            <p className="text-lg text-brown-light leading-relaxed">
              テクノロジーで、おもてなしを進化させる。
              日本のホテル業界を支えるプラットフォームを構築しています。
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Company Info Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {companyInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-cream rounded-xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-brown-muted mb-1">{item.label}</p>
                      <p className="font-medium text-brown">{item.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certifications & Partners */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Certifications */}
            <div className="bg-blue-light rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-brown">セキュリティ認証</h3>
                  <p className="text-sm text-brown-muted">安心・安全なシステム運用</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-white border border-primary/10 px-4 py-3 rounded-xl"
                  >
                    <p className="font-medium text-primary text-sm">{cert.name}</p>
                    <p className="text-xs text-brown-muted">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Partners */}
            <div className="bg-cream rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-brown">連携パートナー</h3>
                  <p className="text-sm text-brown-muted">主要OTAとシームレス連携</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {partners.map((partner, index) => (
                  <span
                    key={index}
                    className="bg-white text-brown-light text-sm px-4 py-2 rounded-lg"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-brown rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">本社所在地</h3>
                <p className="text-white/80">
                  〒100-0001 東京都千代田区丸の内1-1-1 パレスビル5F
                </p>
                <p className="text-white/60 text-sm mt-1">
                  JR東京駅 丸の内北口より徒歩3分
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
