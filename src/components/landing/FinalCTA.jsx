import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="final-cta" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-foreground overflow-hidden"
        >
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-background max-w-2xl mx-auto leading-tight">
              Ready to transform your customer communication?
            </h2>
            <p className="mt-5 text-background/70 max-w-lg mx-auto text-lg">
              We're working with a small group of Myanmar businesses to shape the
              future of AI customer service. Let's talk.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/30"
              >
                Book a pilot
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 text-base font-semibold border-background/20 text-background hover:bg-background/10 hover:text-background"
              >
                Request early access
              </Button>
            </div>
            <p className="mt-8 text-xs text-background/40">
              No commitment required · Founder-led onboarding
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}