"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

// Replace with your LINE Official Account ID
const LINE_ID = process.env.NEXT_PUBLIC_LINE_ID || "@fifthkeys";

export default function LineChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* LINE Chat Button */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 z-40">
        {isOpen && (
          <div className="mb-3 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-72 animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#06C755] rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-text-primary text-sm">FifthKeys</p>
                  <p className="text-xs text-text-muted">LINEでお問い合わせ</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              LINEで気軽にご相談ください。担当者がすぐにお返事します。
            </p>
            <a
              href={`https://line.me/R/ti/p/${LINE_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#06C755] hover:bg-[#05b04c] text-white text-center py-3 rounded-xl font-medium transition-colors"
            >
              LINEで友だち追加
            </a>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-[#06C755] hover:bg-[#05b04c] rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
          aria-label="LINEでお問い合わせ"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
