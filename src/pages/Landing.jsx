import React from "react";
import { LanguageProvider } from "../lib/LanguageContext";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import CostSection from "../components/landing/CostSection";
import ChatDemo from "../components/landing/ChatDemo";
import ProblemSection from "../components/landing/ProblemSection";
import HowItWorks from "../components/landing/HowItWorks";
import WhyDifferent from "../components/landing/WhyDifferent";
import ControlLayer from "../components/landing/ControlLayer";
import Industries from "../components/landing/Industries";
import Pricing from "../components/landing/Pricing";
import FinalCTA from "../components/landing/FinalCTA";
import Footer from "../components/landing/Footer";
import CalendlyPopup from "../components/landing/CalendlyPopup";
import ChannelsBar from "../components/landing/ChannelsBar";

export default function Landing() {
  return (
    <LanguageProvider>
    <div className="min-h-screen bg-background font-inter antialiased" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M 0 0 L 0 40' stroke='%23090d18' stroke-width='0.4' stroke-opacity='0.04'/%3E%3Ccircle cx='0' cy='0' r='0.9' fill='%23090d18' fill-opacity='0.07'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "40px 40px",
      }}>
      <Navbar />
      <Hero />
      <ChannelsBar />
      <ControlLayer />
      <CostSection />
      <HowItWorks />
      <WhyDifferent />
      <Industries />
      <Pricing />
      <FinalCTA />
      <Footer />
      <CalendlyPopup />
    </div>
    </LanguageProvider>
  );
}