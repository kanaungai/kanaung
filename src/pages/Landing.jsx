import React from "react";
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
    <div className="min-h-screen bg-background font-inter antialiased">
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
  );
}