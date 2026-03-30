import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Now accepting pilot partners
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-foreground">
            The AI customer service layer for{" "}
            <span className="text-primary">Myanmar</span> businesses.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Kanaung helps businesses answer customer questions in Burmese — across
            web, Messenger, and Viber — using their own business data. No more
            missed leads. No more repetitive replies.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/20"
              onClick={() =>
                document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Play className="w-4 h-4 mr-2" />
              Try the demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-base font-semibold border-border hover:bg-secondary"
              onClick={() =>
                document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book a pilot
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-16 flex flex-wrap gap-8 md:gap-16"
        >
          {[
            { value: "Burmese-first", label: "Language support" },
            { value: "< 2s", label: "Response time" },
            { value: "24/7", label: "Availability" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}