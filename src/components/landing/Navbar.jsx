import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Problem", href: "#problem" },
    { label: "Industries", href: "#use-cases" },
    { label: "Solutions", href: "#how-it-works" },
    { label: "Blog", href: "#" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/75 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center flex-shrink-0">
          <img
            src="https://media.base44.com/images/public/69cae07a199d96c3df465260/a1a835598_1.png"
            alt="Kanaung AI"
            className="h-8 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center">
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 h-9 text-sm font-semibold shadow-md shadow-primary/20"
            onClick={() =>
              document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Book Demo
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-white/[0.06] px-6 pb-5 space-y-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
              onClick={() => {
                setMobileOpen(false);
                document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book Demo
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}