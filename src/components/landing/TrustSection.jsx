import React from "react";
import { motion } from "framer-motion";
import {
  Languages,
  Database,
  ArrowRightLeft,
  Globe,
  Shield,
  Zap,
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: Languages,
    title: "Burmese-first AI",
    description: "Purpose-built for natural Burmese conversation, not a translated English bot.",
  },
  {
    icon: Database,
    title: "Your business data",
    description: "Trained on your specific products, services, pricing, and policies.",
  },
  {
    icon: ArrowRightLeft,
    title: "Human handoff",
    description: "Seamlessly routes complex or sensitive queries to your human team.",
  },
  {
    icon: Globe,
    title: "Multi-channel",
    description: "Deploy on your website, Facebook Messenger, and Viber — all from one place.",
  },
  {
    icon: Zap,
    title: "Instant replies",
    description: "Responds in seconds, 24/7. No more missed messages or delayed replies.",
  },
  {
    icon: Shield,
    title: "Built for Myanmar",
    description: "Designed for how Myanmar businesses actually communicate with customers.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-sora text-3xl md:text-4xl font-bold tracking-[-0.025em] text-foreground">
            Why Kanaung
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Practical AI built for how Myanmar businesses actually work.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                <cap.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {cap.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}