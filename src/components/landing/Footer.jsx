import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">K</span>
            </div>
            <span className="font-semibold text-sm text-foreground">Kanaung</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kanaung. Burmese AI customer service for Myanmar businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}