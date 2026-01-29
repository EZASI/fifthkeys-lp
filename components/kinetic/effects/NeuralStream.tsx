"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrchestrator } from "../core/ScrollOrchestrator";

interface StreamEntry {
  id: number;
  type: "info" | "success" | "warning" | "ai";
  room?: string;
  action: string;
  timestamp: string;
}

const STREAM_TEMPLATES = [
  { type: "ai" as const, room: "ROOM 204", action: "TEMP_ADJUST // 23°C → 22°C" },
  { type: "success" as const, room: "ROOM 118", action: "GUEST_CHECKIN // VIP_STATUS" },
  { type: "info" as const, room: "ROOM 305", action: "HOUSEKEEPING // REQ_TOWELS" },
  { type: "ai" as const, action: "REVENUE_OPT // ADR_INCREASE +¥2,400" },
  { type: "warning" as const, room: "ROOM 412", action: "MINIBAR_RESTOCK // LOW_INVENTORY" },
  { type: "success" as const, action: "BOOKING_DIRECT // ¥28,500 // 2_NIGHTS" },
  { type: "ai" as const, room: "ROOM 201", action: "UPSELL_TRIGGERED // SPA_PACKAGE" },
  { type: "info" as const, action: "CHANNEL_SYNC // EXPEDIA // 47_ROOMS_UPDATED" },
  { type: "success" as const, room: "ROOM 509", action: "CHECKOUT_COMPLETE // REVIEW_REQ_SENT" },
  { type: "ai" as const, action: "FORECAST_UPDATE // OCCUPANCY_92% // +7D" },
  { type: "info" as const, room: "ROOM 102", action: "GUEST_REQ // LATE_CHECKOUT" },
  { type: "warning" as const, action: "OTA_COMMISSION // ¥12,400 // BLOCKED" },
];

function generateEntry(id: number): StreamEntry {
  const template = STREAM_TEMPLATES[Math.floor(Math.random() * STREAM_TEMPLATES.length)];
  const now = new Date();
  const timestamp = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  
  return {
    id,
    ...template,
    timestamp,
  };
}

export default function NeuralStream() {
  const [entries, setEntries] = useState<StreamEntry[]>([]);
  const [counter, setCounter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  let orchestrator: ReturnType<typeof useOrchestrator> | null = null;
  try {
    orchestrator = useOrchestrator();
  } catch {
    // Not in orchestrator context, use default speed
  }

  useEffect(() => {
    // Initialize with some entries
    const initial = Array.from({ length: 8 }, (_, i) => generateEntry(i));
    setEntries(initial);
    setCounter(8);
  }, []);

  useEffect(() => {
    // Add new entries based on scroll speed
    const baseInterval = 2000;
    const speed = orchestrator?.gridSpeed?.get() || 1;
    const interval = Math.max(baseInterval / speed, 500);
    
    const timer = setInterval(() => {
      setCounter((c) => c + 1);
      setEntries((prev) => {
        const newEntry = generateEntry(counter);
        return [newEntry, ...prev].slice(0, 15);
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, [counter, orchestrator]);

  const typeColors = {
    info: "text-blue-400",
    success: "text-green-400",
    warning: "text-amber-400",
    ai: "text-primary",
  };

  const typeIndicators = {
    info: "●",
    success: "✓",
    warning: "⚠",
    ai: "◆",
  };

  return (
    <div 
      ref={containerRef}
      className="fixed right-4 top-24 bottom-24 w-80 pointer-events-none z-40 overflow-hidden"
      style={{ 
        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div className="absolute inset-0 flex flex-col gap-1">
        <AnimatePresence mode="popLayout">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, x: 50, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-950/60 backdrop-blur-sm border border-white/5 rounded px-3 py-2 font-mono text-xs"
            >
              <div className="flex items-center gap-2">
                <span className={`${typeColors[entry.type]} text-[10px]`}>
                  {typeIndicators[entry.type]}
                </span>
                <span className="text-white/30">{entry.timestamp}</span>
                {entry.room && (
                  <span className="text-white/50">{entry.room}</span>
                )}
              </div>
              <div className={`mt-1 ${typeColors[entry.type]} opacity-80`}>
                {entry.action}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Header */}
      <div className="absolute -top-6 left-0 right-0 text-[10px] font-mono text-white/30 uppercase tracking-widest">
        ▸ NEURAL_STREAM // LIVE
      </div>
    </div>
  );
}

// Compact inline stream for embedding
export function InlineNeuralStream({ className = "" }: { className?: string }) {
  const [currentEntry, setCurrentEntry] = useState<StreamEntry | null>(null);

  useEffect(() => {
    const update = () => {
      setCurrentEntry(generateEntry(Date.now()));
    };
    
    update();
    const timer = setInterval(update, 3000);
    return () => clearInterval(timer);
  }, []);

  if (!currentEntry) return null;

  const typeColors = {
    info: "text-blue-400",
    success: "text-green-400",
    warning: "text-amber-400",
    ai: "text-primary",
  };

  return (
    <motion.div
      key={currentEntry.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`font-mono text-xs ${className}`}
    >
      <span className="text-white/30">[{currentEntry.timestamp}]</span>
      <span className={`ml-2 ${typeColors[currentEntry.type]}`}>
        {currentEntry.action}
      </span>
    </motion.div>
  );
}
