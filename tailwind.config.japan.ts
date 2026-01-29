/**
 * FifthKeys: Japan Edition
 * Color Palette Configuration
 * 
 * Philosophy: "Apple × 老舗旅館（Zen）"
 * - Ceramic White (陶磁器の白)
 * - Indigo Ink (藍墨)
 * - Kintsugi Gold (金継ぎ)
 */

export const japanPalette = {
  // === CERAMIC SPECTRUM (陶磁器) ===
  ceramic: {
    pure: '#FFFFFF',        // 純白 - Hero backgrounds
    mist: '#F8FAFC',        // 霧白 - Section backgrounds (slate-50)
    cloud: '#F1F5F9',       // 雲白 - Card backgrounds (slate-100)
    silk: '#E2E8F0',        // 絹白 - Borders, dividers (slate-200)
    pearl: '#CBD5E1',       // 真珠 - Subtle text, disabled (slate-300)
  },

  // === INDIGO INK SPECTRUM (藍墨) ===
  indigo: {
    deep: '#0F172A',        // 深藍 - Primary text (slate-900)
    rich: '#1E293B',        // 濃藍 - Secondary text (slate-800)
    medium: '#334155',      // 中藍 - Tertiary text (slate-700)
    light: '#64748B',       // 淡藍 - Muted text (slate-500)
    pale: '#94A3B8',        // 薄藍 - Placeholder (slate-400)
  },

  // === KINTSUGI GOLD (金継ぎ) ===
  kintsugi: {
    pure: '#D4AF37',        // 純金 - Primary accent
    light: '#E8C547',       // 明金 - Hover state
    glow: '#F4D03F',        // 光金 - Active/Success glow
    subtle: '#FEF3C7',      // 淡金 - Background tint (amber-100)
    muted: '#D97706',       // 渋金 - Text on light (amber-600)
  },

  // === FUNCTIONAL ACCENTS ===
  accent: {
    direct: '#2563EB',      // Direct booking - Blue (blue-600)
    ota: '#DC2626',         // OTA dependency - Red (red-600)
    success: '#059669',     // Growth/Success - Emerald (emerald-600)
    info: '#0891B2',        // Information - Cyan (cyan-600)
  },

  // === SHADOW COLORS (藍影) ===
  // Instead of pure black shadows, use indigo-tinted shadows for warmth
  shadow: {
    sm: '0 1px 2px rgba(15, 23, 42, 0.05)',
    md: '0 4px 6px rgba(15, 23, 42, 0.07)',
    lg: '0 10px 15px rgba(15, 23, 42, 0.1)',
    xl: '0 20px 25px rgba(15, 23, 42, 0.1)',
    glow: '0 0 40px rgba(212, 175, 55, 0.15)',
    float: '0 20px 40px rgba(15, 23, 42, 0.08), 0 0 1px rgba(15, 23, 42, 0.1)',
  },
};

// Tailwind Extend Configuration
export const tailwindJapanExtend = {
  colors: {
    ceramic: japanPalette.ceramic,
    indigo: japanPalette.indigo,
    kintsugi: japanPalette.kintsugi,
    accent: japanPalette.accent,
  },
  
  boxShadow: {
    'ceramic-sm': japanPalette.shadow.sm,
    'ceramic-md': japanPalette.shadow.md,
    'ceramic-lg': japanPalette.shadow.lg,
    'ceramic-xl': japanPalette.shadow.xl,
    'kintsugi-glow': japanPalette.shadow.glow,
    'float': japanPalette.shadow.float,
  },
  
  animation: {
    'breathe': 'breathe 4s ease-in-out infinite',
    'float-up': 'floatUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    'kintsugi-pulse': 'kintsugiPulse 2s ease-in-out infinite',
    'count-up': 'countUp 0.3s ease-out',
  },
  
  keyframes: {
    breathe: {
      '0%, 100%': { opacity: '0.7' },
      '50%': { opacity: '1' },
    },
    floatUp: {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    kintsugiPulse: {
      '0%, 100%': { 
        boxShadow: '0 0 0 0 rgba(212, 175, 55, 0)',
      },
      '50%': { 
        boxShadow: '0 0 20px 5px rgba(212, 175, 55, 0.2)',
      },
    },
    countUp: {
      '0%': { transform: 'translateY(100%)' },
      '100%': { transform: 'translateY(0)' },
    },
  },
};

/**
 * Drop Shadow & Blur Guidelines for White UI
 * 
 * Problem: 白いUIは「間延び」して見えやすい
 * Solution: 適切な影とぼかしで奥行きを作る
 * 
 * === SHADOW VALUES ===
 * 
 * 1. Cards (Floating Elements):
 *    shadow: 0 4px 6px rgba(15, 23, 42, 0.07)
 *    hover:  0 10px 15px rgba(15, 23, 42, 0.1)
 *    Why: 黒(#000)ではなく藍色(#0F172A)ベースで温かみを保つ
 * 
 * 2. Elevated Surfaces:
 *    shadow: 0 20px 40px rgba(15, 23, 42, 0.08), 0 0 1px rgba(15, 23, 42, 0.1)
 *    Why: 二重の影で立体感を強調、1pxのリングで輪郭を明確に
 * 
 * 3. Input Fields:
 *    default: 0 1px 2px rgba(15, 23, 42, 0.05)
 *    focus:   0 0 0 3px rgba(37, 99, 235, 0.1)
 *    Why: フォーカス時はリングで強調（影は控えめ）
 * 
 * === BLUR VALUES ===
 * 
 * 1. Background Elements:
 *    blur(60px) + opacity(0.5)
 *    Why: 柔らかい光のにじみで空気感を演出
 * 
 * 2. Glass Panels:
 *    backdrop-blur(12px) + bg-white/70
 *    Why: 完全な白より透明感を加えて軽さを出す
 * 
 * 3. Ambient Orbs:
 *    blur(100px) + opacity(0.3)
 *    Why: 背景の光源として、存在感は控えめに
 * 
 * === KEY PRINCIPLE ===
 * opacity 0.05-0.1 の範囲で調整
 * 黒(#000)は使わない → 藍色(#0F172A)をベースに
 */
