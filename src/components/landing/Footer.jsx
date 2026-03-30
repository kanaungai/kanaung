import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="https://media.base44.com/images/public/69cae07a199d96c3df465260/a1a835598_1.png"
            alt="Kanaung AI"
            className="h-6 w-auto opacity-60"
          />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kanaung. Burmese AI customer service for Myanmar businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}