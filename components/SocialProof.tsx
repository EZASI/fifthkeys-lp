"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "FifthKeysを導入してから、スタッフがゲストの目を見て接客できるようになりました。ソフトウェアのことはソフトウェアに任せる。私たちは人に集中できます。",
    author: "田中 健一",
    role: "総支配人",
    company: "箱根観月旅館",
    stats: [
      { value: "10%", label: "直接予約の増加" },
      { value: "+53K", label: "セルフチェックイン数" },
      { value: "0週間", label: "新人研修期間" },
    ],
  },
  {
    quote: "15以上のツールを使い分けていたのが1つに統合されました。データ入力ミスがなくなり、残業も半減。経営判断のスピードが格段に上がりました。",
    author: "山田 美咲",
    role: "代表取締役",
    company: "京都プラザホテル",
    stats: [
      { value: "50%", label: "残業時間削減" },
      { value: "¥0", label: "初期費用" },
      { value: "24h", label: "導入完了まで" },
    ],
  },
];

export default function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = testimonials[activeIndex];

  return (
    <section id="case-studies" className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex justify-end gap-2 mb-8">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 border border-brown/20 rounded-full flex items-center justify-center hover:border-brown/40 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-brown" />
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
            className="w-10 h-10 border border-brown/20 rounded-full flex items-center justify-center hover:border-brown/40 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-brown" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Quote */}
          <div>
            {/* Profile placeholder */}
            <div className="w-16 h-16 bg-brown/10 rounded-full mb-8"></div>

            <blockquote className="text-xl lg:text-2xl text-brown leading-relaxed mb-8">
              "{testimonial.quote}"
            </blockquote>

            <div>
              <p className="font-semibold text-brown">{testimonial.author}</p>
              <p className="text-brown-muted text-sm">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-blue-light rounded-2xl p-8 lg:p-10">
            <div className="space-y-8">
              {testimonial.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-4xl lg:text-5xl font-medium text-brown mb-1">
                    {stat.value}
                  </p>
                  <p className="text-brown-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
