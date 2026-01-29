"use client";

import { useState, useEffect } from "react";
import { X, Download, Gift, Clock } from "lucide-react";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem("exitPopupShown");
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves toward top of page
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("exitPopupShown", "true");

        // Track event
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "exit_intent_shown", {
            event_category: "Engagement",
          });
        }
      }
    };

    // Only on desktop
    if (window.innerWidth > 768) {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track conversion
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "exit_intent_conversion", {
        event_category: "Form",
        event_label: "Exit Intent Popup",
      });
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitted(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsVisible(false)}
      />

      {/* Popup */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-popup">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="bg-gradient-to-br from-primary to-primary-dark p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">
            ちょっと待って！
          </h3>
          <p className="text-white/80">
            無料の導入ガイドをプレゼント
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6 text-success" />
              </div>
              <p className="font-bold text-text-primary mb-2">
                ありがとうございます！
              </p>
              <p className="text-sm text-text-muted">
                メールをご確認ください
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>今だけ限定特典</span>
                </div>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>PMS移行完全ガイド（PDF）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>ホテルDX成功事例集</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>コスト削減シミュレーター</span>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="メールアドレスを入力"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-accent-orange hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  無料でダウンロード
                </button>
              </form>

              <button
                onClick={() => setIsVisible(false)}
                className="w-full text-center text-sm text-text-muted mt-3 hover:underline"
              >
                今回はスキップ
              </button>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes popup {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-popup {
          animation: popup 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
