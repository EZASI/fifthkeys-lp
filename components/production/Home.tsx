import Header from "../Header";
import Footer from "../Footer";
import Hero from "./sections/Hero";
import ComparisonSection from "./sections/ComparisonSection";
import LogoTicker from "./sections/LogoTicker";

export default function ProductionHome() {
  return (
    <div className="min-h-screen bg-[#0A192F] text-brand-white font-sans">
      <Header />
      <main>
        <Hero />
        <LogoTicker />
        <ComparisonSection />
      </main>
      <Footer />
    </div>
  );
}
