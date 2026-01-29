"use client";

import Header from "@/components/production/Header";
import Footer from "@/components/production/Footer";
import { Check } from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
  const [revenue, setRevenue] = useState(1000000);
  const savings = Math.round(revenue * 0.18); // Assume 18% savings

  const tiers = [
    {
      name: "Essential",
      target: "Boutique Hotels",
      price: "Custom",
      features: ["Direct Booking Engine", "Basic AI Chat", "Email Support"],
    },
    {
      name: "Growth",
      target: "Hotel Chains",
      price: "Contact Us",
      badge: "Most Popular",
      features: ["Dynamic Pricing", "CRM Integration", "Priority Support"],
    },
    {
      name: "Enterprise",
      target: "Global Groups",
      price: "Custom",
      features: ["Custom API Access", "Dedicated Account Manager", "SLA"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A192F] text-brand-white font-sans">
      <Header />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Calculator */}
          <div className="mb-24 bg-[#112240] rounded-3xl p-12 border border-brand-gold/20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading font-bold text-3xl mb-6">Calculate Your Savings</h2>
                <div className="space-y-4">
                  <label className="text-sm font-mono text-brand-slate">ANNUAL REVENUE</label>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="100000"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-[#0A192F] rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
                  <div className="text-2xl font-mono text-brand-gold">
                    ${revenue.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-sm font-mono text-brand-slate mb-2">POTENTIAL SAVINGS</div>
                <div className="text-5xl font-bold text-brand-white mb-2">
                  ${savings.toLocaleString()}
                </div>
                <div className="text-sm text-green-400">per year</div>
              </div>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-[#112240] p-8 rounded-2xl border ${
                  tier.badge ? "border-brand-gold" : "border-brand-white/5"
                }`}
              >
                {tier.badge && (
                  <div className="absolute top-0 right-0 bg-brand-gold text-[#0A192F] text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    {tier.badge}
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="font-heading font-bold text-2xl mb-2">{tier.name}</h3>
                  <p className="text-brand-slate text-sm">{tier.target}</p>
                </div>
                <div className="mb-8">
                  <div className="text-3xl font-bold text-brand-white">{tier.price}</div>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-brand-slate">
                      <Check className="w-4 h-4 text-brand-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-bold transition-colors ${
                  tier.badge 
                    ? "bg-brand-gold text-[#0A192F] hover:bg-brand-goldLight" 
                    : "bg-[#0A192F] text-brand-white hover:bg-[#0A192F]/80 border border-brand-white/10"
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
