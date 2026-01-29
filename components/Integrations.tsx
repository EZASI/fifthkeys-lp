"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const integrations = [
  { name: "Booking.com", color: "bg-blue-500" },
  { name: "Expedia", color: "bg-yellow-500" },
  { name: "楽天トラベル", color: "bg-red-600" },
  { name: "じゃらん", color: "bg-orange-500" },
  { name: "一休.com", color: "bg-purple-500" },
  { name: "Agoda", color: "bg-red-400" },
  { name: "Airbnb", color: "bg-rose-500" },
  { name: "Trip.com", color: "bg-blue-600" },
  { name: "Stripe", color: "bg-indigo-500" },
  { name: "PayPay", color: "bg-red-500" },
  { name: "LINE", color: "bg-green-500" },
  { name: "Slack", color: "bg-purple-600" },
];

export default function Integrations() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 0.5);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-medium mb-4">連携サービス</p>
            <h2 className="text-3xl lg:text-4xl font-medium text-brown mb-4">
              お使いのツールと
              <span className="relative inline-block mx-1">
                <span className="relative z-10">シームレス連携</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-highlight -z-0"></span>
              </span>
            </h2>
          </div>
          <div>
            <p className="text-brown-light">
              100以上のOTA、決済サービス、スマートロックと連携。
              既存のワークフローを壊さず、段階的に導入できます。
            </p>
          </div>
        </div>
      </div>

      {/* Scrolling logos - Row 1 */}
      <div className="relative mb-4">
        <div
          className="flex gap-4 whitespace-nowrap"
          style={{
            transform: `translateX(-${offset % 1200}px)`,
          }}
        >
          {[...integrations, ...integrations, ...integrations].map((integration, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white rounded-xl px-5 py-4 flex items-center gap-3 min-w-[160px]"
            >
              <div className={`w-10 h-10 ${integration.color} rounded-lg flex items-center justify-center`}>
                <span className="text-sm font-bold text-white">
                  {integration.name.charAt(0)}
                </span>
              </div>
              <p className="font-medium text-brown text-sm">{integration.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling logos - Row 2 (reverse) */}
      <div className="relative">
        <div
          className="flex gap-4 whitespace-nowrap"
          style={{
            transform: `translateX(-${1200 - (offset % 1200)}px)`,
          }}
        >
          {[...integrations.slice().reverse(), ...integrations.slice().reverse(), ...integrations.slice().reverse()].map(
            (integration, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white rounded-xl px-5 py-4 flex items-center gap-3 min-w-[160px]"
              >
                <div className={`w-10 h-10 ${integration.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-sm font-bold text-white">
                    {integration.name.charAt(0)}
                  </span>
                </div>
                <p className="font-medium text-brown text-sm">{integration.name}</p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 text-center">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 border border-brown/20 hover:border-brown/40 text-brown px-6 py-3 rounded-full font-medium transition-colors"
        >
          すべての連携サービスを見る
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
