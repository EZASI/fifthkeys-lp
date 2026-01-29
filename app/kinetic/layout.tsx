import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FifthKeys | Kinetic OS - The Flight Deck",
  description: "Kill the website. Build a flight deck. The OS that runs your hotel.",
};

export default function KineticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
