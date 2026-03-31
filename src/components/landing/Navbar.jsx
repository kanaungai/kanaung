import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { openCalendly } from "./CalendlyPopup";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";

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
  { label: tx.nav_how, id: "how-it-works" },
  { label: tx.nav_industries, id: "industries" },
  { label: tx.nav_pricing, id: "pricing" },
  { label: tx.nav_demo, id: "demo" }];


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ?
      "bg-background/80 backdrop-blur-3xl border-b border-foreground/[0.05] shadow-sm" :
      "bg-transparent"}`
      }>
      
      <div className="max-w-6xl mx-auto px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 flex-shrink-0 group">
          <img
            src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
            alt="Kanaung"
            className="h-6 w-6 object-contain"
            style={{ filter: "brightness(0) saturate(100%) invert(16%) sepia(80%) saturate(900%) hue-rotate(330deg) brightness(80%)" }} />
          
          <span className="font-sora font-semibold text-[15px] tracking-[-0.01em] text-foreground">
            kanaung<span className="text-primary font-bold">.</span>
          </span>
        </a>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((link) =>
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-foreground/[0.04] tracking-[-0.01em]">
            
              {link.label}
            </button>
          )}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 h-[34px] rounded-full border border-foreground/12 hover:bg-foreground/[0.04] transition-all duration-200 text-[12px] font-semibold text-muted-foreground hover:text-foreground tracking-wide"
            title="Switch language">
            
            
            <span>{lang === "en" ? "မြန်မာ" : "EN"}</span>
          </button>
          <a
            href="#"
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors tracking-[-0.01em]">
            
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
          onClick={() => {scrollTo(link.id);setMobileOpen(false);}}
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