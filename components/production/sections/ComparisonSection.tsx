export default function ComparisonSection() {
  return (
    <section className="py-24 bg-[#0A192F]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden border border-brand-white/5">
          {/* Left Side: The Old Way */}
          <div className="bg-[#112240] p-12 md:p-16 flex flex-col justify-center border-r border-brand-white/5">
            <h3 className="font-heading text-3xl text-brand-slate mb-6">
              The Old Way
            </h3>
            <p className="text-lg text-brand-slate/60 leading-relaxed">
              High fees (15-25%) paid to Expedia & Booking.com. 
              Fragmented data. Zero guest ownership.
            </p>
          </div>

          {/* Right Side: The FifthKeys Way */}
          <div className="bg-[#0A192F] p-12 md:p-16 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-gold/5" />
            <div className="relative z-10">
              <h3 className="font-heading text-3xl text-brand-gold mb-6">
                The FifthKeys Way
              </h3>
              <p className="text-lg text-brand-white leading-relaxed">
                AI-driven direct marketing that recovers lost revenue. 
                Full data ownership. Zero commissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
