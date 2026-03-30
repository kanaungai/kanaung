import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import LiveCallPanel from "./LiveCallPanel";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/[0.06] text-[11px] font-semibold text-primary tracking-widest uppercase mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Enterprise AI, built for Myanmar
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.08] text-foreground">
              Never miss a{" "}
              <br className="hidden sm:block" />
              customer message{" "}
              <span className="text-primary">again.</span>
            </h1>

            {/* Supporting copy */}
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
              Kanaung handles customer conversations in Burmese — across web,
              Messenger, and Viber — using your own business data. 24/7.
              Instant. Intelligent.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-7 text-sm font-semibold shadow-lg shadow-primary/25 h-11"
                onClick={() =>
                  document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Book Demo
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-7 text-sm font-semibold border-border hover:bg-secondary h-11"
                onClick={() =>
                  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Play className="w-3.5 h-3.5 mr-1.5 fill-current" />
                Try Demo
              </Button>
            </div>

            {/* Trust stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12 flex items-center gap-8"
            >
              {[
                { value: "< 2s", label: "Response time" },
                { value: "24/7", label: "Always on" },
                { value: "Burmese", label: "Native language" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN — Live Call Panel */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          >
            <LiveCallPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}