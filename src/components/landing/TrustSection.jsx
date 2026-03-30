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
    title: "LLM-powered, not scripted",
    description: "Kanaung uses large language models to generate natural Burmese replies — not keyword rules or fixed decision trees.",
  },
  {
    icon: Database,
    title: "Trained on your business",
    description: "Answers are grounded in your products, pricing, policies, and FAQs — not generic responses.",
  },
  {
    icon: ArrowRightLeft,
    title: "Human-in-the-loop",
    description: "Complex or high-value conversations are routed to your team with full context, so nothing important gets missed.",
  },
  {
    icon: Globe,
    title: "Multi-channel deployment",
    description: "Go live on your website, Facebook Messenger, and Viber from a single setup.",
  },
  {
    icon: Zap,
    title: "Burmese-first",
    description: "Purpose-built for natural Burmese conversation — not a translated English bot layered on top.",
  },
  {
    icon: Shield,
    title: "Operationally safe",
    description: "Designed for businesses that need reliability. Your team stays in control of every sensitive or complex interaction.",
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
            Built differently
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            LLM-powered customer service that uses your business knowledge to handle real conversations — not scripted flows.
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