/**
 * FifthKeys: Kinetic Growth Engine
 * Color Palette Configuration
 * 
 * Philosophy: "Stark Industries meets Traditional Japanese Craftsmanship"
 * - Obsidian depths for authority
 * - Bioluminescent accents for life/growth
 * - Gold for premium hospitality
 */

export const growthPalette = {
  // === OBSIDIAN SPECTRUM (Depth & Authority) ===
  obsidian: {
    void: '#000000',      // Pure black - the abyss
    core: '#020617',      // Slate-950 - primary background
    surface: '#0a0f1c',   // Elevated surfaces
    glass: '#0f172a',     // Glass panels (slate-900)
    mist: '#1e293b',      // Fog layer (slate-800)
  },

  // === BIOLUME SPECTRUM (Life & Energy) ===
  biolume: {
    cyan: '#00D9FF',      // Primary accent - "Neural Activity"
    teal: '#14B8A6',      // Secondary - "Stable Growth"
    emerald: '#10B981',   // Success states - "Revenue Captured"
    amber: '#F59E0B',     // High demand / Alert - "Opportunity"
    gold: '#FBBF24',      // Premium / Hospitality warmth
    rose: '#F43F5E',      // Danger / Cost visualization
  },

  // === WASHI SPECTRUM (Japanese Craft Layer) ===
  washi: {
    warm: '#faf8f5',      // Warm white - paper texture base
    cool: '#f1f5f9',      // Cool white - modern paper
    ink: '#1a1a2e',       // Sumi ink - deep contrast
  },

  // === PRISM SPECTRUM (Channel Distribution) ===
  prism: {
    source: '#FFFFFF',    // Pure white - Hotel Inventory
    agoda: '#E31C5F',     // Agoda brand
    expedia: '#FFCC00',   // Expedia brand  
    booking: '#003580',   // Booking.com brand
    google: '#4285F4',    // Google Hotels
    direct: '#00D9FF',    // Direct bookings (our color)
  },

  // === GRADIENT TOKENS ===
  gradients: {
    voidToSurface: 'linear-gradient(to bottom, #000000, #020617, #0a0f1c)',
    horizonGlow: 'radial-gradient(ellipse at bottom, rgba(0, 217, 255, 0.15), transparent 70%)',
    goldAmbient: 'radial-gradient(circle, rgba(251, 191, 36, 0.1), transparent 60%)',
    dangerPulse: 'radial-gradient(circle, rgba(244, 63, 94, 0.2), transparent 50%)',
  },
};

// Tailwind Extend Configuration
export const tailwindGrowthExtend = {
  colors: {
    obsidian: growthPalette.obsidian,
    biolume: growthPalette.biolume,
    washi: growthPalette.washi,
    prism: growthPalette.prism,
  },
  
  boxShadow: {
    'biolume-glow': '0 0 30px rgba(0, 217, 255, 0.3)',
    'biolume-pulse': '0 0 60px rgba(0, 217, 255, 0.2), inset 0 0 30px rgba(0, 217, 255, 0.1)',
    'gold-ambient': '0 0 40px rgba(251, 191, 36, 0.2)',
    'danger-glow': '0 0 30px rgba(244, 63, 94, 0.3)',
    'glass-inner': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
  
  animation: {
    'horizon-pulse': 'horizonPulse 4s ease-in-out infinite',
    'light-path': 'lightPath 2s linear infinite',
    'levitate': 'levitate 6s ease-in-out infinite',
    'prism-split': 'prismSplit 1.5s ease-out forwards',
  },
  
  keyframes: {
    horizonPulse: {
      '0%, 100%': { opacity: '0.3' },
      '50%': { opacity: '0.8' },
    },
    lightPath: {
      '0%': { backgroundPosition: '0% 0%' },
      '100%': { backgroundPosition: '200% 0%' },
    },
    levitate: {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-20px)' },
    },
    prismSplit: {
      '0%': { transform: 'scaleX(0)', opacity: '0' },
      '50%': { opacity: '1' },
      '100%': { transform: 'scaleX(1)', opacity: '1' },
    },
  },
};
