import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"],
  variable: "--font-noto-jp",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FIFTHKEYS | The Hotel OS",
  description: "The AI-powered operating system for modern hotels. Maximize direct bookings. Minimize OTA fees.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${notoSansJP.variable}`}>
      <body className="font-sans antialiased bg-[#0A192F] text-white">
        {children}
      </body>
    </html>
  );
}
