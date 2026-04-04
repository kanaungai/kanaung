import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { openCalendly } from "./CalendlyPopup";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";

export function openDemoOverlay() {
  window.dispatchEvent(new CustomEvent("kanaung:open-demo"));
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggle } = useLang();
  const tx = t[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
  { label: tx.nav_how, id: "how-it-works", scroll: true },
  { label: tx.nav_industries, id: "industries", scroll: true },
  { label: tx.nav_pricing, id: "pricing", scroll: true },
  { label: tx.nav_demo, id: "demo", scroll: false, isDemo: true }];

  const handleLink = (link) => {
    if (link.isDemo) {
      openDemoOverlay();
    } else if (link.scroll) {
      scrollTo(link.id);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(251, 250, 249, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(30, 25, 20, 0.08)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(30,25,20,0.04), 0 4px 16px -4px rgba(30,25,20,0.06)" : "none",
      }}
    >
      
      <div className="max-w-6xl mx-auto px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <img
            src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
            alt="Kanaung"
            className="h-6 w-6 object-contain"
            style={{ filter: "brightness(0) saturate(100%) invert(16%) sepia(80%) saturate(900%) hue-rotate(330deg) brightness(80%)" }} />
          
          <span className="font-sora font-semibold text-[15px] tracking-[-0.01em] text-foreground">
            kanaung<span className="text-primary font-bold">.</span>
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((link) =>
          <button
            key={link.id}
            onClick={() => handleLink(link)}
            className="px-4 py-2 text-[13px] font-medium transition-colors duration-200 rounded-lg hover:bg-foreground/[0.05] tracking-[-0.01em]"
            style={{ color: "hsl(220 18% 28%)" }}
            onMouseEnter={e => e.currentTarget.style.color = "hsl(220 25% 8%)"}
            onMouseLeave={e => e.currentTarget.style.color = "hsl(220 18% 28%)"}>
            
              {link.label}
            </button>
          )}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 h-[34px] rounded-full transition-all duration-200 text-[12px] font-semibold tracking-wide"
            style={{ border: "1px solid rgba(30,25,20,0.12)", color: "hsl(220 18% 32%)" }}
            title="Switch language">
            
            
            <span>{lang === "en" ? "မြန်မာ" : "EN"}</span>
          </button>
          <a href="#" className="text-[13px] font-medium transition-colors tracking-[-0.01em]" style={{ color: "hsl(220 18% 32%)" }}>
            {tx.nav_signin}
          </a>
          <button
            onClick={openCalendly}
            className="inline-flex items-center gap-2 bg-foreground text-background text-[13px] font-semibold px-5 h-[38px] rounded-full hover:bg-foreground/90 transition-all duration-200 tracking-[-0.01em] shadow-sm">
            
            {tx.nav_book}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="flex items-center gap-1 px-2.5 h-[32px] rounded-full border border-foreground/12 text-[11px] font-semibold text-muted-foreground">
            
            <span>{lang === "en" ? "🇲🇲" : "🇬🇧"}</span>
            <span>{lang === "en" ? "မြန်မာ" : "EN"}</span>
          </button>
          <button
            className="text-foreground p-1.5 rounded-lg hover:bg-foreground/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}>
            
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen &&
      <div className="md:hidden bg-background/98 backdrop-blur-3xl border-b border-foreground/[0.06] px-6 pb-6 space-y-1">
          {links.map((link) =>
        <button
          key={link.id}
          onClick={() => {handleLink(link);setMobileOpen(false);}}
          className="w-full text-left text-[13px] font-medium text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-lg hover:bg-foreground/[0.04] transition-colors">
          
              {link.label}
            </button>
        )}
          <div className="pt-4">
            <button
            className="w-full bg-foreground text-background text-sm font-semibold py-2.5 rounded-full hover:bg-foreground/90 transition-colors"
            onClick={() => {setMobileOpen(false);openCalendly();}}>
            
              {tx.nav_book}
            </button>
          </div>
        </div>
      }
    </nav>);

}