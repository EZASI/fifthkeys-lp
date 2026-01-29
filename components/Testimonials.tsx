"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "人手不足で悩んでいましたが、AIコンシェルジュのおかげでフロント業務が70%削減。スタッフの働き方が劇的に変わりました。もう以前のやり方には戻れません。",
    author: "田中 健一",
    position: "総支配人",
    company: "箱根 観月旅館",
    rooms: "80室",
    image: "/testimonials/tanaka.jpg",
    metric: { value: "70%", label: "業務削減" },
    hasVideo: true,
  },
  {
    quote:
      "15以上あったツールが1つに統合され、データ入力ミスがゼロになりました。スタッフの残業時間も大幅に減り、離職率が改善しています。",
    author: "山田 太郎",
    position: "オーナー",
    company: "京都プラザホテル",
    rooms: "120室",
    image: "/testimonials/yamada.jpg",
    metric: { value: "50%", label: "残業削減" },
    hasVideo: false,
  },
  {
    quote:
      "初期費用ゼロで始められたのが決め手でした。リスクなく導入できて、6ヶ月で売上は前年比120%を達成。投資対効果は圧倒的です。",
    author: "佐藤 美咲",
    position: "代表取締役",
    company: "沖縄サンセットリゾート",
    rooms: "65室",
    image: "/testimonials/sato.jpg",
    metric: { value: "120%", label: "売上成長" },
    hasVideo: true,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-4">導入事例</p>
          <h2 className="text-3xl lg:text-5xl font-medium text-brown mb-6">
            <span className="relative inline-block">
              <span className="relative z-10">150施設以上</span>
              <span className="absolute bottom-1 left-0 right-0 h-4 bg-highlight -z-0"></span>
            </span>
            が選んだ理由
          </h2>
          <p className="text-lg text-brown-light max-w-xl mx-auto">
            全国のホテル・旅館様から高い評価をいただいています
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative mb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Video/Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-brown rounded-2xl overflow-hidden relative group">
                {/* Placeholder for video/image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40">
                  <div className="text-center">
                    <div className="w-6 h-6 bg-white/20 rounded mb-2 mx-auto"></div>
                    <p className="text-white/60 text-sm">{currentTestimonial.company}</p>
                  </div>
                </div>

                {/* Play button for video */}
                {currentTestimonial.hasVideo && (
                  <button className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
                    </div>
                  </button>
                )}

                {/* Metric Badge */}
                <div className="absolute bottom-4 right-4 bg-white rounded-xl px-4 py-3 shadow-lg">
                  <p className="text-2xl font-medium text-primary">{currentTestimonial.metric.value}</p>
                  <p className="text-xs text-brown-muted">{currentTestimonial.metric.label}</p>
                </div>
              </div>
            </div>

            {/* Right: Quote */}
            <div>
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl lg:text-2xl text-brown leading-relaxed mb-8">
                「{currentTestimonial.quote}」
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-brown/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-brown">
                    {currentTestimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-brown">{currentTestimonial.author}</p>
                  <p className="text-sm text-brown-muted">
                    {currentTestimonial.position} · {currentTestimonial.company} · {currentTestimonial.rooms}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-brown/20 hover:bg-brown/40"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                  setIsAutoPlaying(false);
                }}
                className="w-10 h-10 border border-brown/20 rounded-full flex items-center justify-center text-brown hover:border-brown/40 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev + 1) % testimonials.length);
                  setIsAutoPlaying(false);
                }}
                className="w-10 h-10 border border-brown/20 rounded-full flex items-center justify-center text-brown hover:border-brown/40 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "150+", label: "導入施設" },
            { value: "99%", label: "継続率" },
            { value: "4.9", label: "平均評価", sublabel: "/ 5.0" },
            { value: "24h", label: "平均導入時間" },
          ].map((stat, i) => (
            <div key={i} className="bg-cream rounded-xl p-6 text-center">
              <p className="text-2xl lg:text-3xl font-medium text-brown">
                {stat.value}
                {stat.sublabel && <span className="text-sm text-brown-muted">{stat.sublabel}</span>}
              </p>
              <p className="text-sm text-brown-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
