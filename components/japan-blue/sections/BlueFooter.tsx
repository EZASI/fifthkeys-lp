"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, BookOpen, Lock, Shield, Globe, ExternalLink } from "lucide-react";

// ==============================================================================
// FIFTHKEYS FOOTER: "THE TRUST DOCK"
// Theme: Japan Blue (Deepest Ocean / Reliable Bedrock)
// ==============================================================================

const TOKENS = {
  deepestOcean: "#00050A",
  navySurface: "#001B3D",
  cyan: "#00E5FF",
  mintStatus: "#00F59B",
  electricBlue: "#1E50FF",
  textPrimary: "#FFFFFF",
  textSecondary: "#94A3B8",
  textMuted: "rgba(255, 255, 255, 0.5)",
};

// News/Update items
const NEWS_ITEMS = [
  { 
    date: "2026.01.29", 
    tag: "New Feature", 
    text: "AIコンシェルジュの自動応答精度が向上しました",
    tagColor: TOKENS.cyan,
  },
  { 
    date: "2026.01.15", 
    tag: "Maintenance", 
    text: "定期セキュリティアップデート完了",
    tagColor: TOKENS.textSecondary,
  },
  { 
    date: "2026.01.02", 
    tag: "Update", 
    text: "チャネルマネージャーv2.5リリース",
    tagColor: TOKENS.mintStatus,
  },
];

// Security badges
const SECURITY_BADGES = [
  { label: "ISO 27001", icon: Lock },
  { label: "PCI DSS", icon: Shield },
  { label: "GDPR Ready", icon: Globe },
];

// Live Status Pill Component
function LiveStatusPill() {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <motion.div 
      className="relative inline-flex items-center gap-3 px-4 py-2.5 rounded-full cursor-pointer"
      style={{
        background: "rgba(0, 245, 155, 0.08)",
        border: "1px solid rgba(0, 245, 155, 0.2)",
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Pulsing indicator */}
      <div className="relative">
        <span 
          className="block w-2 h-2 rounded-full"
          style={{ background: TOKENS.mintStatus }}
        />
        {/* Ping/Radar pulse effect */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: TOKENS.mintStatus }}
          animate={{ 
            scale: [1, 2.5, 2.5], 
            opacity: [0.8, 0, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </div>
      
      <div>
        <div className="text-xs font-medium" style={{ color: TOKENS.mintStatus }}>
          All Systems Operational
        </div>
        <div className="text-[10px] font-mono" style={{ color: TOKENS.textMuted }}>
          Uptime: 99.99%
        </div>
      </div>
      
      {/* Latency Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute left-full ml-3 px-3 py-2 rounded-lg whitespace-nowrap"
            style={{
              background: TOKENS.navySurface,
              border: `1px solid ${TOKENS.cyan}30`,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <div className="text-[10px] font-mono" style={{ color: TOKENS.textSecondary }}>
              Avg Response
            </div>
            <div className="text-sm font-bold font-mono" style={{ color: TOKENS.cyan }}>
              32ms
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// News Item Component
function NewsItem({ date, tag, text, tagColor }: { 
  date: string; tag: string; text: string; tagColor: string;
}) {
  return (
    <motion.div 
      className="py-3 border-b"
      style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
      whileHover={{ x: 4 }}
    >
      <div className="flex items-center gap-3 mb-1">
        <span 
          className="text-[10px] font-mono"
          style={{ color: TOKENS.textMuted, fontFamily: "'Roboto Mono', monospace" }}
        >
          {date}
        </span>
        <span 
          className="text-[9px] font-medium px-2 py-0.5 rounded"
          style={{ 
            color: tagColor,
            background: `${tagColor}15`,
            boxShadow: tag === "New Feature" ? `0 0 10px ${tagColor}30` : "none",
          }}
        >
          {tag}
        </span>
      </div>
      <p 
        className="text-sm"
        style={{ color: TOKENS.textSecondary, fontFeatureSettings: "'palt'" }}
      >
        {text}
      </p>
    </motion.div>
  );
}

// Security Badge Component
function SecurityBadge({ label, icon: Icon }: { label: string; icon: typeof Lock }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-default"
      style={{
        border: `1px solid ${hovered ? TOKENS.cyan : "rgba(255, 255, 255, 0.15)"}`,
        opacity: hovered ? 1 : 0.5,
        transition: "all 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -2 }}
    >
      <Icon 
        className="w-4 h-4" 
        style={{ color: hovered ? TOKENS.cyan : TOKENS.textSecondary }}
      />
      <span 
        className="text-xs font-medium"
        style={{ color: hovered ? TOKENS.textPrimary : TOKENS.textSecondary }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function BlueFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative py-16 px-8"
      style={{
        background: TOKENS.deepestOcean,
        borderTop: `1px solid rgba(0, 229, 255, 0.1)`,
      }}
    >
      {/* Top glow line */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${TOKENS.cyan}40, transparent)`,
        }}
      />
      
      <div className="max-w-6xl mx-auto">
        {/* Main 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          {/* COL 1: Brand & Status (The Pulse) */}
          <div>
            {/* Logo */}
            <motion.a 
              href="/"
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl"
                style={{
                  background: `linear-gradient(135deg, ${TOKENS.electricBlue} 0%, ${TOKENS.cyan} 100%)`,
                  color: "white",
                  boxShadow: `0 0 20px ${TOKENS.electricBlue}50`,
                }}
              >
                F
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-tight">FIFTHKEYS</span>
                <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: TOKENS.cyan }}>
                  ホテルOS
                </span>
              </div>
            </motion.a>
            
            {/* Narrative */}
            <p 
              className="text-sm mb-6 leading-relaxed"
              style={{ color: TOKENS.textSecondary, fontFeatureSettings: "'palt'" }}
            >
              常に、動いている。
              <br />
              24時間365日、あなたのホテルを支える。
            </p>
            
            {/* Live Status */}
            <div className="mb-6">
              <div 
                className="text-[10px] font-mono uppercase tracking-widest mb-3"
                style={{ color: TOKENS.textMuted }}
              >
                システム稼働状況
              </div>
              <LiveStatusPill />
            </div>
          </div>
          
          {/* COL 2: Navigation & News (The Map) */}
          <div>
            {/* Navigation Links */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-white mb-4">ナビゲーション</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "プロダクト", href: "/product" },
                  { label: "機能一覧", href: "/features" },
                  { label: "料金プラン", href: "/pricing" },
                  { label: "導入事例", href: "/cases" },
                  { label: "会社情報", href: "/company" },
                  { label: "採用情報", href: "/careers" },
                ].map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="text-sm py-1"
                    style={{ color: TOKENS.textSecondary }}
                    whileHover={{ color: TOKENS.cyan, x: 4 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* News / Update Log */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                Update Log
                <span 
                  className="text-[9px] font-mono px-2 py-0.5 rounded"
                  style={{ background: `${TOKENS.cyan}15`, color: TOKENS.cyan }}
                >
                  お知らせ
                </span>
              </h4>
              <div>
                {NEWS_ITEMS.map((item, i) => (
                  <NewsItem key={i} {...item} />
                ))}
              </div>
            </div>
          </div>
          
          {/* COL 3: Support & Security (The Shield) */}
          <div>
            {/* Support Actions */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-white mb-4">サポート</h4>
              <div className="space-y-2">
                <motion.a
                  href="/contact"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${TOKENS.electricBlue} 0%, ${TOKENS.cyan} 100%)`,
                    color: "white",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">テクニカルサポートへ連絡</span>
                </motion.a>
                
                <motion.a
                  href="/docs"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: TOKENS.textSecondary,
                  }}
                  whileHover={{ 
                    background: "rgba(255, 255, 255, 0.08)",
                    color: TOKENS.textPrimary,
                  }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>ヘルプセンター</span>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
                </motion.a>
              </div>
            </div>
            
            {/* Security Badges */}
            <div>
              <h4 
                className="text-sm font-semibold text-white mb-3"
                style={{ fontFeatureSettings: "'palt'" }}
              >
                セキュリティ基準
              </h4>
              <p 
                className="text-xs mb-4"
                style={{ color: TOKENS.textMuted, fontFeatureSettings: "'palt'" }}
              >
                鉄壁の守り。国際基準のセキュリティ認証を取得。
              </p>
              <div className="flex flex-wrap gap-2">
                {SECURITY_BADGES.map((badge) => (
                  <SecurityBadge key={badge.label} {...badge} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div 
          className="h-px mb-8"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)`,
          }}
        />
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs" style={{ color: TOKENS.textMuted }}>
            © {currentYear} FifthKeys Inc. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            {[
              { label: "プライバシーポリシー", href: "/privacy" },
              { label: "利用規約", href: "/terms" },
              { label: "特定商取引法", href: "/legal" },
            ].map((item) => (
              <motion.a 
                key={item.href}
                href={item.href}
                className="text-xs"
                style={{ color: TOKENS.textMuted }}
                whileHover={{ color: TOKENS.cyan }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
