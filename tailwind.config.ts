import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background System
        bg: {
          primary: "#0A0E27",   // Deep Navy
          secondary: "#12172E", // Lighter Navy
          tertiary: "#1A1F3A",  // Elevated Surface
          hover: "#252D4A",
          elevated: "#2A3250",
        },
        // Text System
        text: {
          primary: "#FFFFFF",
          secondary: "#B3BAC4",
          tertiary: "#7D8695",
          inverse: "#0A0E27",
        },
        // Brand Colors
        primary: {
          DEFAULT: "#00D9FF", // Bright Cyan
          dark: "#00A8CC",
          light: "#33E5FF",
        },
        // Functional
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
        
        // Borders
        border: {
          light: "#2A3250",
          medium: "#3A4460",
          dark: "#5A6580",
        },
        
        // === GROWTH ENGINE PALETTE ===
        // Obsidian Spectrum (Depth & Authority)
        obsidian: {
          void: "#000000",
          core: "#020617",
          surface: "#0a0f1c",
          glass: "#0f172a",
          mist: "#1e293b",
        },
        // Biolume Spectrum (Life & Energy)
        biolume: {
          cyan: "#00D9FF",
          teal: "#14B8A6",
          emerald: "#10B981",
          amber: "#F59E0B",
          gold: "#FBBF24",
          rose: "#F43F5E",
        },
        // Washi Spectrum (Japanese Craft)
        washi: {
          warm: "#faf8f5",
          cool: "#f1f5f9",
          ink: "#1a1a2e",
        },
        // Prism Spectrum (Channel Distribution)
        prism: {
          source: "#FFFFFF",
          agoda: "#E31C5F",
          expedia: "#FFCC00",
          booking: "#003580",
          google: "#4285F4",
          direct: "#00D9FF",
        },
        
        // === JAPAN EDITION PALETTE ===
        // Ceramic Spectrum (陶磁器の白)
        ceramic: {
          pure: "#FFFFFF",
          mist: "#F8FAFC",
          cloud: "#F1F5F9",
          silk: "#E2E8F0",
          pearl: "#CBD5E1",
        },
        // Indigo Ink Spectrum (藍墨)
        indigo: {
          deep: "#0F172A",
          rich: "#1E293B",
          medium: "#334155",
          light: "#64748B",
          pale: "#94A3B8",
        },
        // Kintsugi Gold (金継ぎ)
        kintsugi: {
          pure: "#D4AF37",
          light: "#E8C547",
          glow: "#F4D03F",
          subtle: "#FEF3C7",
          muted: "#D97706",
        },
        // Functional Accents
        accent: {
          direct: "#2563EB",
          ota: "#DC2626",
          success: "#059669",
          info: "#0891B2",
        },
        
        // === PLATINUM KINETIC OS PALETTE ===
        // Platinum Spectrum (Main Surfaces)
        platinum: {
          pure: "#FAFBFC",
          frost: "#F8FAFC",
          cloud: "#F1F5F9",
          mist: "#E2E8F0",
          vapor: "#CBD5E1",
        },
        // Depth Spectrum (Text + Tech)
        depth: {
          abyss: "#0F172A",
          deep: "#1E293B",
          medium: "#334155",
          light: "#64748B",
          faint: "#94A3B8",
        },
        // Champagne Gold (Revenue + Success)
        champagne: {
          pure: "#D4AF37",
          bright: "#E8C547",
          glow: "#F4D03F",
          tint: "#FFFBEB",
          muted: "#B8860B",
        },
        // Tech Indigo (Innovation + Platform)
        techIndigo: {
          pure: "#4F46E5",
          bright: "#6366F1",
          glow: "#818CF8",
          tint: "#EEF2FF",
          muted: "#3730A3",
        },
        // === PRODUCTION BRANDING ===
        brand: {
          navy: "#0A192F",      // Midnight Navy (Primary)
          gold: "#D4AF37",      // Champagne Gold (Accent)
          goldLight: "#F4D03F", // Gold Highlight
          slate: "#8892B0",     // Muted Text
          white: "#E6F1FF",     // Bright Text
        },
        
        // === JAPAN KINETIC BLUE (AEROSPACE) PALETTE ===
        // Stratosphere Spectrum (Sky-like backgrounds)
        strato: {
          pure: "#FFFFFF",       // Pure white
          mist: "#F8FAFC",       // Slate-50
          cloud: "#F1F5F9",      // Slate-100
          vapor: "#E0F2FE",      // Sky-100 (blue tint)
          horizon: "#BAE6FD",    // Sky-200
        },
        // Deep Ink Spectrum (Typography)
        ink: {
          abyss: "#0F172A",      // Slate-900 (headlines)
          deep: "#1E293B",       // Slate-800
          medium: "#334155",     // Slate-700
          body: "#64748B",       // Slate-500 (body text)
          light: "#94A3B8",      // Slate-400
        },
        // Royal Blue Spectrum (Trust & Technology)
        royal: {
          pure: "#2563EB",       // Blue-600 (primary accent)
          bright: "#3B82F6",     // Blue-500
          glow: "#60A5FA",       // Blue-400
          tint: "#DBEAFE",       // Blue-100
          muted: "#1D4ED8",      // Blue-700
        },
        // Oxygen Blue (Shadows & Depth)
        oxygen: {
          shadow: "rgba(37, 99, 235, 0.1)",   // Blue shadow base
          glow: "rgba(37, 99, 235, 0.15)",    // Blue glow
          border: "rgba(37, 99, 235, 0.2)",   // Blue border
          light: "#E0F2FE",                   // Light blue fill
        },
        
        // === DASHBOARD (JAPAN BLUE DARK) PALETTE ===
        // Background System
        dashboard: {
          primary: "#001229",     // Deep Japan Blue (main bg)
          surface: "#001B3D",     // Card/Surface Blue
          elevated: "#002A5A",    // Hover/Active states
          border: "rgba(255, 255, 255, 0.1)",
        },
        // Accent Colors
        dash: {
          action: "#00CCFF",      // Interactive elements
          success: "#00F59B",     // Available/Clean
          warning: "#FFAB00",     // Late Checkout/Maintenance
          danger: "#FF4D4D",      // Overbooked/Payment Issue
        },
        // Dashboard Typography
        dashText: {
          heading: "#FFFFFF",
          body: "#E2E8F0",        // High-readability grey-white
          muted: "#94A3B8",       // Low-priority metadata
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-jp)", "sans-serif"],
        heading: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
        jp: ["var(--font-noto-jp)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        gradient: "gradient 3s ease infinite",
        "spin-slow": "spin 8s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 217, 255, 0.3)",
        "glow-lg": "0 0 40px rgba(0, 217, 255, 0.4)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
        "elevation-1": "0 1px 2px rgba(0, 0, 0, 0.3)",
        "elevation-2": "0 4px 6px rgba(0, 0, 0, 0.4)",
        "elevation-3": "0 10px 15px rgba(0, 0, 0, 0.5)",
        // Japan Edition Shadows (Indigo-tinted)
        "ceramic-sm": "0 1px 2px rgba(15, 23, 42, 0.05)",
        "ceramic-md": "0 4px 6px rgba(15, 23, 42, 0.07)",
        "ceramic-lg": "0 10px 15px rgba(15, 23, 42, 0.1)",
        "ceramic-xl": "0 20px 25px rgba(15, 23, 42, 0.1)",
        "kintsugi-glow": "0 0 40px rgba(212, 175, 55, 0.15)",
        "float": "0 20px 40px rgba(15, 23, 42, 0.08), 0 0 1px rgba(15, 23, 42, 0.1)",
        // Platinum Colored Shadows
        "tech-sm": "0 1px 2px rgba(79, 70, 229, 0.05)",
        "tech-md": "0 4px 12px rgba(79, 70, 229, 0.08)",
        "tech-lg": "0 8px 30px rgba(79, 70, 229, 0.12)",
        "gold-sm": "0 1px 2px rgba(212, 175, 55, 0.08)",
        "gold-md": "0 4px 12px rgba(212, 175, 55, 0.12)",
        "gold-lg": "0 8px 30px rgba(212, 175, 55, 0.15)",
        "platinum-sm": "0 1px 2px rgba(100, 116, 139, 0.06)",
        "platinum-md": "0 4px 12px rgba(100, 116, 139, 0.08)",
        "platinum-lg": "0 8px 30px rgba(100, 116, 139, 0.1)",
        "platinum-xl": "0 20px 50px rgba(100, 116, 139, 0.12)",
        "platinum-float": "0 20px 50px rgba(100, 116, 139, 0.1), 0 0 1px rgba(100, 116, 139, 0.1)",
        "gold-float": "0 20px 50px rgba(212, 175, 55, 0.15), 0 0 1px rgba(212, 175, 55, 0.1)",
        // Japan Kinetic Blue (Aerospace) Shadows
        "blue-sm": "0 1px 3px rgba(37, 99, 235, 0.06)",
        "blue-md": "0 4px 12px rgba(37, 99, 235, 0.08)",
        "blue-lg": "0 10px 30px rgba(37, 99, 235, 0.1)",
        "blue-xl": "0 20px 40px -15px rgba(37, 99, 235, 0.1)",
        "blue-float": "0 20px 40px -15px rgba(37, 99, 235, 0.12), 0 0 1px rgba(37, 99, 235, 0.1)",
        "blue-glow": "0 0 30px rgba(37, 99, 235, 0.2)",
        "blue-inner": "inset 0 2px 4px rgba(37, 99, 235, 0.05)",
        // Dashboard Shadows
        "dash-card": "0 4px 20px rgba(0, 0, 0, 0.4)",
        "dash-glow-action": "0 0 20px rgba(0, 204, 255, 0.3)",
        "dash-glow-success": "0 0 20px rgba(0, 245, 155, 0.3)",
        "dash-glow-warning": "0 0 20px rgba(255, 171, 0, 0.3)",
        "dash-glow-danger": "0 0 20px rgba(255, 77, 77, 0.3)",
      },
      // Dashboard specific spacing (8px grid)
      spacing: {
        "dash-1": "8px",
        "dash-2": "16px",
        "dash-3": "24px",
        "dash-4": "32px",
        "dash-5": "40px",
        "dash-6": "48px",
        "dash-8": "64px",
      },
    },
  },
  plugins: [],
};

export default config;
