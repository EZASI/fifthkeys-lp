"use client";

const partners = [
  "Booking.com",
  "Expedia",
  "楽天トラベル",
  "じゃらん",
  "一休.com",
  "Agoda",
  "Airbnb",
  "Trip.com",
];

export default function LogoBar() {
  return (
    <section className="py-8 bg-white border-y border-brown/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-sm text-brown-muted whitespace-nowrap">
            主要OTAとシームレス連携
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {partners.map((partner, index) => (
              <span
                key={index}
                className="text-brown/40 font-medium text-sm hover:text-brown/60 transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
