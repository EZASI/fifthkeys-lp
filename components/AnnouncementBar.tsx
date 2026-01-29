"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-white py-2 px-4 relative z-[60]">
      <div className="container-custom mx-auto flex items-center justify-center gap-3 text-sm">
        <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-medium">
          キャンペーン
        </span>
        <span>
          導入サポート費用が今なら無料
        </span>
        <a
          href="#contact"
          className="inline-flex items-center gap-1 font-medium hover:underline"
        >
          詳細
          <ArrowRight className="w-3 h-3" />
        </a>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="閉じる"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
