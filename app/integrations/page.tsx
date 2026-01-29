import Header from "@/components/production/Header";
import Footer from "@/components/production/Footer";

export default function IntegrationsPage() {
  const partners = ["Oracle Opera", "Mews", "Stripe", "Assa Abloy"];
  const categories = ["PMS", "Payment Gateways", "Keyless Entry"];

  return (
    <div className="min-h-screen bg-[#0A192F] text-brand-white font-sans">
      <Header />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-heading font-bold text-5xl mb-12">Integrations</h1>
          
          <div className="flex gap-4 mb-12">
            {categories.map(cat => (
              <span key={cat} className="px-4 py-2 rounded-full border border-brand-white/10 text-sm hover:border-brand-gold/50 cursor-pointer transition-colors">
                {cat}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div
                key={partner}
                className="aspect-square bg-[#112240] rounded-xl flex items-center justify-center border border-brand-white/5 hover:border-brand-gold/30 transition-all p-8"
              >
                <div className="text-xl font-bold text-brand-slate/50">{partner}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
