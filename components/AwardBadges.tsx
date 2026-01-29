"use client";

export default function AwardBadges() {
  return (
    <section className="py-6 bg-white border-y border-brown/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-brown-muted">
          <span>導入実績:</span>
          <span className="font-medium text-brown">50+ 施設</span>
          <span className="hidden sm:inline text-brown/20">|</span>
          <span className="font-medium text-brown">継続率 99%</span>
          <span className="hidden sm:inline text-brown/20">|</span>
          <span className="font-medium text-brown">ISO 27001 認証</span>
          <span className="hidden sm:inline text-brown/20">|</span>
          <span className="font-medium text-brown">SOC2 Type II</span>
        </div>
      </div>
    </section>
  );
}
