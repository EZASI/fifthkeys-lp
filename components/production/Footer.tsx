import Link from "next/link";

const FOOTER_LINKS = {
  legal: [
    { label: "Privacy", link: "/privacy" },
    { label: "Terms", link: "/terms" },
    { label: "Security", link: "/security" },
    { label: "Compliance", link: "/compliance" },
  ],
  product: [
    { label: "Features", link: "/features" },
    { label: "Pricing", link: "/pricing" },
    { label: "Integrations", link: "/integrations" },
    { label: "Changelog", link: "/changelog" },
  ],
  company: [
    { label: "About", link: "/about" },
    { label: "Careers", link: "/careers" },
    { label: "Press", link: "/press" },
    { label: "Partners", link: "/partners" },
  ],
  resources: [
    { label: "Documentation", link: "/docs" },
    { label: "API Reference", link: "/api" },
    { label: "Status", link: "/status" },
    { label: "Support", link: "/support" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#020C1B] border-t border-brand-gold/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-brand-gold rounded flex items-center justify-center text-[#0A192F] font-heading font-bold">
                F
              </div>
              <span className="font-heading font-bold text-lg tracking-wide text-brand-white">
                FIFTHKEYS
              </span>
            </Link>
            <p className="text-brand-slate text-sm leading-relaxed max-w-xs mb-6">
              The AI-powered operating system for modern hotels. Maximize direct bookings. Minimize OTA fees.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 rounded bg-brand-white/5 hover:bg-brand-gold/20 transition-colors" />
              <div className="w-8 h-8 rounded bg-brand-white/5 hover:bg-brand-gold/20 transition-colors" />
              <div className="w-8 h-8 rounded bg-brand-white/5 hover:bg-brand-gold/20 transition-colors" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-brand-white mb-6">Product</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.product.map((item) => (
                <li key={item.label}>
                  <Link href={item.link} className="text-sm text-brand-slate hover:text-brand-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-white mb-6">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((item) => (
                <li key={item.label}>
                  <Link href={item.link} className="text-sm text-brand-slate hover:text-brand-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-white mb-6">Resources</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((item) => (
                <li key={item.label}>
                  <Link href={item.link} className="text-sm text-brand-slate hover:text-brand-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-white mb-6">Legal</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((item) => (
                <li key={item.label}>
                  <Link href={item.link} className="text-sm text-brand-slate hover:text-brand-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-slate">
            © 2026 FifthKeys Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-brand-slate">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
