import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { openCalendly } from "./CalendlyPopup";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

export default function FinalCTA() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref, inView } = useScrollReveal({ margin: "-100px" });

  return (
    <section id="final-cta" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={REVEAL.primary}
          className="relative rounded-3xl bg-foreground overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="font-sora text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-background max-w-2xl mx-auto leading-[1.06]">
              {tx.cta_h2}
            </h2>
            <p className="mt-5 text-background/70 max-w-lg mx-auto text-lg">
              {tx.cta_sub}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={openCalendly}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/30"
              >
                {tx.cta_btn1}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={openCalendly}
                className="rounded-full px-8 text-base font-semibold border-background/20 text-background hover:bg-background/10 hover:text-background"
              >
                {tx.cta_btn2}
              </Button>
            </div>
            <p className="mt-8 text-xs text-background/40">
              {tx.cta_note}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}