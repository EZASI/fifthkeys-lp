"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Product",
    dropdown: [
      { label: "Features", link: "/features" },
      { label: "Pricing", link: "/pricing" },
      { label: "Integrations", link: "/integrations" },
      { label: "Changelog", link: "/changelog" },
    ],
  },
  {
    label: "Company",
    dropdown: [
      { label: "About", link: "/about" },
      { label: "Careers", link: "/careers" },
      { label: "Press", link: "/press" },
      { label: "Partners", link: "/partners" },
    ],
  },
  {
    label: "Resources",
    dropdown: [
      { label: "Documentation", link: "/docs" },
      { label: "API Reference", link: "/api" },
      { label: "Status", link: "/status" },
      { label: "Support", link: "/support" },
    ],
  },
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/90 backdrop-blur-xl border-b border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center text-[#0A192F] font-heading font-bold text-xl">
            F
          </div>
          <span className="font-heading font-bold text-xl tracking-wide text-brand-white">
            FIFTHKEYS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-brand-slate hover:text-brand-gold transition-colors py-2">
                {item.label}
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-48 pt-2"
                  >
                    <div className="bg-[#112240] border border-brand-gold/20 rounded-lg shadow-xl overflow-hidden py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.link}
                          className="block px-4 py-2 text-sm text-brand-slate hover:text-brand-gold hover:bg-brand-gold/5 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-brand-slate hover:text-brand-white transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/demo"
            className="px-5 py-2.5 bg-transparent border border-brand-gold text-brand-gold text-sm font-medium rounded-lg hover:bg-brand-gold hover:text-[#0A192F] transition-all"
          >
            Get a Demo
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-brand-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A192F] border-b border-brand-gold/10 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-6">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <div className="font-heading font-bold text-brand-gold mb-3">
                    {item.label}
                  </div>
                  <div className="space-y-2 pl-4 border-l border-brand-gold/10">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.link}
                        className="block text-sm text-brand-slate hover:text-brand-white py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t border-brand-gold/10 flex flex-col gap-4">
                <Link
                  href="/login"
                  className="block text-center text-brand-slate hover:text-brand-white font-medium"
                >
                  Log In
                </Link>
                <Link
                  href="/demo"
                  className="block text-center px-5 py-3 bg-brand-gold text-[#0A192F] font-bold rounded-lg"
                >
                  Get a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
