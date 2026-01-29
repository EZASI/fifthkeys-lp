import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FifthKeys | Growth Engine - Zero Cost. Pure Growth.",
  description: "Performance infrastructure for hotels. We only earn when you earn. Zero fixed costs, zero setup fees, zero risk.",
};

export default function GrowthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
