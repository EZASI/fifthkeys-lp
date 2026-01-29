"use client";

import { Github, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "./ui/RevealOnScroll";

export default function Footer() {
  const linkColumns = [
    {
      title: "製品",
      links: [
        { href: "#features", label: "機能一覧" },
        { href: "#economics", label: "料金プラン" },
        { href: "#cases", label: "導入事例" },
        { href: "#", label: "更新情報", badge: "New" },
      ],
    },
    {
      title: "サポート",
      links: [
        { href: "#", label: "ヘルプセンター" },
        { href: "#", label: "APIドキュメント" },
        { href: "#", label: "システム稼働状況" },
        { href: "#contact", label: "お問い合わせ" },
      ],
    },
    {
      title: "会社",
      links: [
        { href: "#", label: "会社概要" },
        { href: "#", label: "採用情報" },
        { href: "#", label: "ニュース" },
        { href: "#", label: "パートナー" },
      ],
    },
    {
      title: "法的情報",
      links: [
        { href: "#", label: "利用規約" },
        { href: "#", label: "プライバシーポリシー" },
        { href: "#", label: "特定商取引法" },
        { href: "#", label: "セキュリティ" },
      ],
    },
  ];

  return (
    <footer className="bg-bg-primary border-t border-border-light relative overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-secondary/50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <RevealOnScroll className="lg:col-span-2 space-y-8">
            <motion.a 
              href="#" 
              className="flex items-center gap-3 group inline-flex"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg border border-primary/20 group-hover:bg-primary group-hover:text-bg-primary transition-all duration-300"
                whileHover={{ rotate: 5 }}
              >
                F
              </motion.div>
              <span className="text-xl font-bold text-white tracking-tight">
                FifthKeys
              </span>
            </motion.a>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              AI搭載オールインワン・ホテルOS。<br/>
              日本のホテル業界のDXを推進し、<br/>
              収益最大化と業務効率化を実現します。
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
              ].map(({ icon: Icon, href }, index) => (
                <motion.a 
                  key={index}
                  href={href} 
                  className="text-text-tertiary hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </RevealOnScroll>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {linkColumns.map((column, colIndex) => (
              <RevealOnScroll key={column.title} delay={0.1 + colIndex * 0.05}>
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-6">
                  {column.title}
                </h3>
                <ul className="space-y-4">
                  {column.links.map((link, linkIndex) => (
                    <motion.li 
                      key={linkIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + linkIndex * 0.05 }}
                    >
                      <motion.a 
                        href={link.href} 
                        className="text-sm text-text-secondary hover:text-primary transition-colors inline-flex items-center"
                        whileHover={{ x: 4 }}
                      >
                        {link.label}
                        {link.badge && (
                          <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-2">
                            {link.badge}
                          </span>
                        )}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <RevealOnScroll>
          <div className="border-t border-border-light pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-text-tertiary">
              &copy; 2026 FifthKeys Inc. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              {/* System Status Indicator */}
              <motion.div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-tertiary border border-border-light hover:border-success/30 transition-colors cursor-pointer group"
                whileHover={{ scale: 1.02 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                <span className="text-xs font-medium text-text-secondary group-hover:text-white transition-colors">
                  All Systems Operational
                </span>
              </motion.div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </footer>
  );
}
