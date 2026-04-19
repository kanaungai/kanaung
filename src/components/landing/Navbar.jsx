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
        background: scrolled ? "rgba(18, 20, 28, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.2), 0 4px 24px -4px rgba(0,0,0,0.3)" : "none",
      }}
    >
      
      <div className="max-w-6xl mx-auto px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <img
            src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
            alt="Kanaung"
            className="h-6 w-6 object-contain"
            style={{ filter: "brightness(0) invert(1) opacity(0.9)" }} />
          
          <span className="font-sora font-semibold text-[15px] tracking-[-0.01em]" style={{ color: "rgba(255,255,255,0.88)" }}>
            kanaung<span style={{ color: "hsl(352 72% 52%)" }} className="font-bold">.</span>
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((link) =>
          <button
            key={link.id}
            onClick={() => handleLink(link)}
            className="px-4 py-2 text-[13px] font-medium transition-colors duration-200 rounded-lg tracking-[-0.01em]"
            style={{ color: "rgba(255,255,255,0.42)" }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.82)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.42)"}>
            
              {link.label}
            </button>
          )}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 h-[34px] rounded-full transition-all duration-200 text-[12px] font-semibold tracking-wide"
            style={{ border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.45)" }}
            title="Switch language">
            
            
            <span>{lang === "en" ? "မြန်မာ" : "EN"}</span>
          </button>
          <a href="#" className="text-[13px] font-medium transition-colors tracking-[-0.01em]" style={{ color: "rgba(255,255,255,0.32)" }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.32)"}>
            {tx.nav_signin}
          </a>
          <button
            onClick={openCalendly}
            className="inline-flex items-center gap-2 text-[12.5px] font-semibold px-4 h-[36px] rounded-lg transition-all duration-200 tracking-[-0.01em]"
            style={{ background: "rgba(255,255,255,0.92)", color: "hsl(222 28% 6%)", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.80)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.92)"}>
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
      <div className="md:hidden backdrop-blur-3xl px-6 pb-6 space-y-1" style={{ background: "rgba(14,16,22,0.97)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          {links.map((link) =>
        <button
          key={link.id}
          onClick={() => {handleLink(link);setMobileOpen(false);}}
          className="w-full text-left text-[13px] font-medium py-2.5 px-3 rounded-lg transition-colors"
          style={{ color: "rgba(255,255,255,0.45)" }}>
          
              {link.label}
            </button>
        )}
          <div className="pt-4">
            <button
            className="w-full text-sm font-semibold py-2.5 rounded-lg transition-colors"
            style={{ background: "rgba(255,255,255,0.92)", color: "hsl(222 28% 6%)" }}
            onClick={() => {setMobileOpen(false);openCalendly();}}>
            
              {tx.nav_book}
            </button>
          </div>
        </div>
      }
    </nav>);

}