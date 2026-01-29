import Header from "@/components/production/Header";
import Footer from "@/components/production/Footer";
import { Bot, TrendingUp, Shield } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "AI Guest Agent",
      description: "Automated concierge that handles requests and upsells room upgrades.",
      icon: Bot,
    },
    {
      title: "Dynamic Yield Engine",
      description: "Real-time pricing adjustments based on local event data.",
      icon: TrendingUp,
    },
    {
      title: "OTA Blocker",
      description: "Identify serial cancel-rebookers from external sites.",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A192F] text-brand-white font-sans">
      <Header />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="font-heading font-bold text-5xl mb-6">
              A Command Center for Hospitality
            </h1>
            <p className="text-xl text-brand-slate max-w-2xl mx-auto">
              Everything you need to run a modern, profitable hotel operation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-[#112240] p-8 rounded-2xl border border-brand-white/5 hover:border-brand-gold/30 transition-colors"
              >
                <div className="w-12 h-12 bg-brand-gold/10 rounded-lg flex items-center justify-center text-brand-gold mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-4 text-brand-white">
                  {feature.title}
                </h3>
                <p className="text-brand-slate leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
