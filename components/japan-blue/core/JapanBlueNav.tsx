"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const MOTION_CURVE = [0.22, 1, 0.36, 1] as const;

const NAV_ITEMS = {
  primary: [
    { label: "プロダクト", href: "/product" },
    { label: "機能一覧", href: "/features" },
    { label: "料金プラン", href: "/pricing" },
  ],
  secondary: [
    { label: "導入事例", href: "/cases" },
    { label: "会社情報", href: "/company" },
  ],
  resources: [
    { label: "ドキュメント", href: "/docs" },
    { label: "API リファレンス", href: "/api" },
    { label: "セキュリティ", href: "/security" },
  ],
};

// Animated underline link component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="relative text-sm text-white/80 hover:text-white transition-colors py-2"
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-1/2 h-px bg-[#00E5FF]"
        initial={{ width: 0, x: "-50%" }}
        variants={{
          hover: { width: "100%", x: "-50%" },
        }}
        transition={{ duration: 0.3, ease: MOTION_CURVE }}
      />
    </motion.a>
  );
}

// Resources dropdown
function ResourcesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors py-2"
        whileHover="hover"
      >
        Resources
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 py-2 min-w-[180px] rounded-xl backdrop-blur-xl"
            style={{
              background: "rgba(0, 27, 61, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: MOTION_CURVE }}
          >
            {NAV_ITEMS.resources.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile menu
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const allItems = [...NAV_ITEMS.primary, ...NAV_ITEMS.secondary, ...NAV_ITEMS.resources];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#000B18]/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Content */}
          <div className="relative h-full flex flex-col p-8">
            {/* Close button */}
            <motion.button
              className="self-end p-2 text-white/80 hover:text-white"
              onClick={onClose}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            {/* Nav items with staggered reveal */}
            <nav className="flex-1 flex flex-col justify-center gap-6">
              {allItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-3xl font-medium text-white/90 hover:text-[#00E5FF] transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ease: MOTION_CURVE }}
                  onClick={onClose}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            
            {/* CTA */}
            <motion.a
              href="/contact"
              className="mt-8 py-4 text-center font-semibold rounded-xl"
              style={{
                background: "linear-gradient(135deg, #1E50FF 0%, #00E5FF 100%)",
                color: "white",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ease: MOTION_CURVE }}
              whileTap={{ scale: 0.98 }}
            >
              お問い合わせ
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function JapanBlueNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: MOTION_CURVE }}
      >
        <nav
          className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl backdrop-blur-xl"
          style={{
            background: "rgba(0, 27, 61, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl"
              style={{
                background: "linear-gradient(135deg, #1E50FF 0%, #00E5FF 100%)",
                color: "white",
                boxShadow: "0 0 20px rgba(30, 80, 255, 0.4)",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              F
            </motion.div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight">FIFTHKEYS</span>
              <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">ホテルOS</span>
            </div>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {/* Primary links */}
            {NAV_ITEMS.primary.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
            
            {/* Separator */}
            <div className="w-px h-4 bg-white/20" />
            
            {/* Secondary links */}
            {NAV_ITEMS.secondary.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
            
            {/* Resources dropdown */}
            <ResourcesDropdown />
          </div>
          
          {/* CTA Button - Highest Contrast */}
          <div className="flex items-center gap-4">
            <motion.a
              href="/contact"
              className="hidden md:block px-6 py-2.5 font-semibold text-sm rounded-xl"
              style={{
                background: "linear-gradient(135deg, #1E50FF 0%, #0066FF 100%)",
                color: "white",
                boxShadow: "0 4px 20px rgba(30, 80, 255, 0.4)",
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 6px 30px rgba(30, 80, 255, 0.6)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              お問い合わせ
            </motion.a>
            
            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 text-white/80 hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </nav>
      </motion.header>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
