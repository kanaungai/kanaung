import React from "react";

export default function Footer() {
  return (
    <footer style={{ background: "hsl(220 25% 5%)" }}>
      <div className="max-w-[1200px] mx-auto px-8">
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 py-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <img
            src="/kanaung-logo.png"
            alt="Kanaung"
            className="h-5 w-auto"
            style={{ filter: "brightness(0) invert(1) opacity(0.22)" }}
          />
          <p className="text-[11.5px] font-inter" style={{ color: "rgba(255,255,255,0.20)" }}>
            © {new Date().getFullYear()} Kanaung. Burmese AI customer service for Myanmar businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}
