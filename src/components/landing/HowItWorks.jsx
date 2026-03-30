import React from "react";
import { motion } from "framer-motion";
import { Upload, MessageCircle, Users } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    number: "01",
    title: "Upload your business info",
    description:
      "Share your product catalog, FAQs, pricing, and policies. Kanaung learns everything about your business.",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "AI answers in Burmese",
    description:
      "Customers ask questions in Burmese on your website, Messenger, or Viber. Kanaung replies instantly and accurately.",
  },
  {
    icon: Users,
    number: "03",
    title: "Complex queries go to your team",
    description:
      "When the AI isn't sure, it smoothly hands off to your human team — so no customer ever hits a dead end.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-sora text-3xl md:text-4xl font-bold tracking-[-0.025em] text-foreground">
            How Kanaung works
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Get up and running in three simple steps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+40px)] right-[-calc(50%-40px)] h-px border-t border-dashed border-border" style={{ width: "calc(100% - 80px)", left: "calc(50% + 40px)" }} />
              )}

              <div className="text-center">
                <div className="inline-flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center mb-5">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary tracking-widest uppercase mb-3">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}