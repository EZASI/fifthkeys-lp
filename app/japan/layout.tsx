import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FifthKeys | 固定費ゼロ。成長だけが、残る。",
  description: "日本のホテル・旅館のための次世代収益最適化プラットフォーム。従来のPMSのように毎月固定費が発生しません。成果報酬モデルで、売上がない時期のコストはゼロ。",
  openGraph: {
    title: "FifthKeys | 固定費ゼロ。成長だけが、残る。",
    description: "日本のホテル・旅館のための次世代収益最適化プラットフォーム",
    locale: "ja_JP",
  },
};

export default function JapanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
