import React from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import CostSection from "../components/landing/CostSection";
import ChatDemo from "../components/landing/ChatDemo";
import ProblemSection from "../components/landing/ProblemSection";
import HowItWorks from "../components/landing/HowItWorks";
import WhyDifferent from "../components/landing/WhyDifferent";
import UseCases from "../components/landing/UseCases";
import TrustSection from "../components/landing/TrustSection";
import FinalCTA from "../components/landing/FinalCTA";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background font-inter antialiased">
      <Navbar />
      <Hero />
      <CostSection />
      <HowItWorks />
      <WhyDifferent />
      <ChatDemo />
      <ProblemSection />
      <UseCases />
      <TrustSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}