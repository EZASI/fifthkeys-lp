"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "./ui/RevealOnScroll";

const faqs = [
  {
    question: "Q: 既存のOTA接続は必要ですか？",
    answer: "A: もちろんです。FifthKeysは全OTA（Booking.com、Expedia、楽天など）を一元管理します。直接予約だけで手数料を取ります。OTA経由の予約は100%ホテルの収益。",
  },
  {
    question: "Q: 他のチャネルマネージャーを既に使っていますが？",
    answer: "A: FifthKeysはチャネルマネージャー + 予約エンジン + AI を統合。現在のツールを置き換えて、月々¥3,000-5,000を削減できます。移行は7日で完了。",
  },
  {
    question: "Q: AIが予約プロセスを壊さないか心配",
    answer: "A: 最初の90日は「人間確認」モード。AIの推奨が合っているか、スタッフが確認してから本番。モデルが学習したら、自動化。完全なコントロール下でリスクなし。",
  },
  {
    question: "Q: ゲストデータのセキュリティは？",
    answer: "A: GDPR / CCPA / APPI 準拠。データはSSL暗号化、保存時も暗号化。年間セキュリティ監査。ホテルがデータ所有権を100%持つ。退出時は24時間でエクスポート。",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-bg-primary">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <HelpCircle className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">
              よくある質問
            </h2>
            <p className="text-xl text-text-secondary">
              よくいただくご質問にお答えします
            </p>
          </div>
        </RevealOnScroll>

        <StaggerContainer className="space-y-4" staggerDelay={0.1}>
          {faqs.map((faq, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="bg-bg-tertiary border border-border-light rounded-xl overflow-hidden"
                whileHover={{ borderColor: "rgba(0, 217, 255, 0.2)" }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-bg-hover transition-colors"
                  whileTap={{ scale: 0.995 }}
                >
                  <span className="font-bold text-lg tracking-tight text-white pr-8 flex-1">{faq.question}</span>
                  <motion.div 
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${openIndex === index ? 'bg-primary/20 text-primary' : 'bg-bg-elevated text-text-secondary'}`}
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                      className="overflow-hidden border-t border-border-light"
                    >
                      <motion.div 
                        className="p-6 pt-4 text-text-secondary leading-relaxed text-sm"
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {faq.answer}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
