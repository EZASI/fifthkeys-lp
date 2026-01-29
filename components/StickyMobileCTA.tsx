"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Phone } from "lucide-react";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-brown/10 p-3 lg:hidden z-50 shadow-lg">
      <div className="flex gap-2">
        <a
          href="#contact"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-full font-medium transition-colors"
        >
          無料で始める
          <ArrowUpRight className="w-4 h-4" />
        </a>
        <a
          href="tel:0120-XXX-XXX"
          className="inline-flex items-center justify-center gap-2 border border-brown/20 text-brown px-4 py-3 rounded-full font-medium transition-colors"
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
