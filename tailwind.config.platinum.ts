/**
 * FifthKeys: Platinum Kinetic OS (Japan)
 * Color Palette Configuration
 * 
 * Philosophy: "Daylight Cockpit" - Heavy, Expensive, Light Mode
 * - Pure white (#FFFFFF) is FORBIDDEN
 * - Volumetric gradients for depth
 * - Colored shadows for floating effect
 */

export const platinumPalette = {
  // === PLATINUM SPECTRUM (Main Surfaces) ===
  platinum: {
    pure: '#FAFBFC',        // 99% white - Hero center only
    frost: '#F8FAFC',       // Frosted platinum - Primary bg
    cloud: '#F1F5F9',       // Cloud white - Card bg
    mist: '#E2E8F0',        // Mist - Borders
    vapor: '#CBD5E1',       // Vapor - Subtle elements
  },

  // === INDIGO DEPTH (Text + Tech Elements) ===
  depth: {
    abyss: '#0F172A',       // Deepest - Primary text
    deep: '#1E293B',        // Deep - Secondary text
    medium: '#334155',      // Medium - Body text
    light: '#64748B',       // Light - Muted
    faint: '#94A3B8',       // Faint - Placeholder
  },

  // === CHAMPAGNE GOLD (Revenue + Success) ===
  champagne: {
    pure: '#D4AF37',        // Pure gold - Primary accent
    bright: '#E8C547',      // Bright gold - Hover
    glow: '#F4D03F',        // Glow gold - Active
    tint: '#FFFBEB',        // Tint - Background
    muted: '#B8860B',       // Muted - Text on light
  },

  // === TECH INDIGO (Innovation + Platform) ===
  techIndigo: {
    pure: '#4F46E5',        // Primary tech accent
    bright: '#6366F1',      // Hover
    glow: '#818CF8',        // Active/Glow
    tint: '#EEF2FF',        // Background tint
    muted: '#3730A3',       // Text
  },

  // === COLORED SHADOWS (The Secret Sauce) ===
  shadows: {
    // Indigo-tinted shadows for tech elements
    techSm: '0 1px 2px rgba(79, 70, 229, 0.05)',
    techMd: '0 4px 12px rgba(79, 70, 229, 0.08)',
    techLg: '0 8px 30px rgba(79, 70, 229, 0.12)',
    
    // Gold-tinted shadows for revenue elements
    goldSm: '0 1px 2px rgba(212, 175, 55, 0.08)',
    goldMd: '0 4px 12px rgba(212, 175, 55, 0.12)',
    goldLg: '0 8px 30px rgba(212, 175, 55, 0.15)',
    
    // Neutral platinum shadows (NOT black)
    platinumSm: '0 1px 2px rgba(100, 116, 139, 0.06)',
    platinumMd: '0 4px 12px rgba(100, 116, 139, 0.08)',
    platinumLg: '0 8px 30px rgba(100, 116, 139, 0.1)',
    platinumXl: '0 20px 50px rgba(100, 116, 139, 0.12)',
    
    // Float effect (dual shadow for depth)
    float: '0 20px 50px rgba(100, 116, 139, 0.1), 0 0 1px rgba(100, 116, 139, 0.1)',
    floatGold: '0 20px 50px rgba(212, 175, 55, 0.15), 0 0 1px rgba(212, 175, 55, 0.1)',
  },
};

// Tailwind Extend Configuration
export const tailwindPlatinumExtend = {
  colors: {
    platinum: platinumPalette.platinum,
    depth: platinumPalette.depth,
    champagne: platinumPalette.champagne,
    techIndigo: platinumPalette.techIndigo,
  },
  
  boxShadow: {
    'tech-sm': platinumPalette.shadows.techSm,
    'tech-md': platinumPalette.shadows.techMd,
    'tech-lg': platinumPalette.shadows.techLg,
    'gold-sm': platinumPalette.shadows.goldSm,
    'gold-md': platinumPalette.shadows.goldMd,
    'gold-lg': platinumPalette.shadows.goldLg,
    'platinum-sm': platinumPalette.shadows.platinumSm,
    'platinum-md': platinumPalette.shadows.platinumMd,
    'platinum-lg': platinumPalette.shadows.platinumLg,
    'platinum-xl': platinumPalette.shadows.platinumXl,
    'platinum-float': platinumPalette.shadows.float,
    'gold-float': platinumPalette.shadows.floatGold,
  },
  
  backgroundImage: {
    'platinum-vignette': 'radial-gradient(ellipse at center, #FAFBFC 0%, #F1F5F9 100%)',
    'gold-radial': 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
    'indigo-radial': 'radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, transparent 70%)',
  },
};

/**
 * Glassmorphism 3.0 Recipe:
 * 
 * .glass-platinum {
 *   background: rgba(255, 255, 255, 0.6);
 *   backdrop-filter: blur(20px);
 *   border: 1px solid rgba(255, 255, 255, 0.8);
 *   box-shadow: 0 8px 30px rgba(100, 116, 139, 0.08);
 * }
 * 
 * .glass-gold {
 *   background: rgba(255, 251, 235, 0.7);
 *   backdrop-filter: blur(20px);
 *   border: 1px solid rgba(212, 175, 55, 0.2);
 *   box-shadow: 0 8px 30px rgba(212, 175, 55, 0.12);
 * }
 */
