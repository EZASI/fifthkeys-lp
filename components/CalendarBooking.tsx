"use client";

import { useState } from "react";
import { Calendar, X, Clock, Video } from "lucide-react";

// Replace with your Cal.com username or Calendly link
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || "fifthkeys/demo";

export default function CalendarBooking() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Calendar Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 lg:bottom-6 left-4 z-40 bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105"
        aria-label="無料デモを予約"
      >
        <Calendar className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-medium">無料デモ予約</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">無料デモを予約</h3>
                  <p className="text-sm text-text-muted">30分のオンラインデモ</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-primary p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Benefits */}
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-text-muted">30分</p>
                </div>
                <div>
                  <Video className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-text-muted">オンライン</p>
                </div>
                <div>
                  <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-text-muted">即日予約可</p>
                </div>
              </div>
            </div>

            {/* Cal.com Embed */}
            <div className="h-[500px]">
              <iframe
                src={`https://cal.com/${CAL_LINK}?embed=true&theme=light&hideEventTypeDetails=false`}
                className="w-full h-full border-0"
                title="予約カレンダー"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
