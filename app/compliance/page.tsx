import Header from "@/components/production/Header";
import Footer from "@/components/production/Footer";
import { ShieldCheck } from "lucide-react";

export default function CompliancePage() {
  const certifications = ["SOC2 Type II", "GDPR Ready", "PCI DSS Level 1"];

  return (
    <div className="min-h-screen bg-[#0A192F] text-brand-white font-sans">
      <Header />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-4xl mb-12">Compliance & Security</h1>
          
          <div className="space-y-6">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-4 bg-[#112240] p-6 rounded-xl border border-brand-white/5"
              >
                <ShieldCheck className="w-6 h-6 text-green-400" />
                <span className="font-bold text-lg">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
