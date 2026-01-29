import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | FifthKeys Hotel OS",
  description: "Hotel management dashboard",
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
