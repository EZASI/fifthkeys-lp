import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FifthKeys | The OS That Runs Your Hotel",
  description: "AI-powered hotel operating system. Maximize direct bookings. Minimize OTA fees.",
};

export default function CinematicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
