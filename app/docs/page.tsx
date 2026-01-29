import Header from "@/components/production/Header";
import Footer from "@/components/production/Footer";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0A192F] text-brand-white font-sans">
      <Header />
      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="w-64 fixed left-0 top-20 bottom-0 bg-[#020C1B] border-r border-brand-white/5 p-6 hidden lg:block">
          <div className="space-y-1">
            {["Quick Start", "Authentication", "Webhooks"].map((item) => (
              <div
                key={item}
                className="px-4 py-2 text-sm text-brand-slate hover:text-brand-white cursor-pointer hover:bg-brand-white/5 rounded-lg transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 lg:ml-64 p-12 min-h-screen">
          <div className="max-w-3xl">
            <h1 className="font-heading font-bold text-4xl mb-8">Documentation</h1>
            <div className="prose prose-invert prose-gold max-w-none">
              <h3>Quick Start</h3>
              <p className="text-brand-slate">
                Get started with the FifthKeys API by obtaining your API keys from the dashboard.
              </p>
              
              <div className="bg-[#020C1B] p-6 rounded-lg font-mono text-sm my-6 border border-brand-white/5">
                <span className="text-purple-400">curl</span> https://api.fifthkeys.com/v1/hotels \<br/>
                &nbsp;&nbsp;<span className="text-blue-400">-H</span> "Authorization: Bearer YOUR_API_KEY"
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
