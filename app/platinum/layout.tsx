import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FifthKeys | 重荷を、光へ。",
  description: "日本のホテル・旅館のための次世代収益最適化プラットフォーム。固定費ゼロ、契約期間なし。成果報酬モデルで、あなたが成功した時だけ、私たちも成功する。",
  openGraph: {
    title: "FifthKeys | 重荷を、光へ。",
    description: "日本のホテル・旅館のための次世代収益最適化プラットフォーム",
    locale: "ja_JP",
  },
};

export default function PlatinumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
