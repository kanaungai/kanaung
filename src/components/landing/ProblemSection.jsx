import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Clock, RotateCcw, Smartphone } from "lucide-react";

const PROBLEMS = [
  {
    icon: MessageSquare,
    title: "Repetitive questions",
    description:
      "Customers ask the same questions about price, location, and availability — over and over, every day.",
  },
  {
    icon: Clock,
    title: "Slow replies, lost leads",
    description:
      "When replies take hours, customers leave. In Myanmar's fast-moving chat culture, speed wins.",
  },
  {
    icon: RotateCcw,
    title: "Staff stuck on FAQ duty",
    description:
      "Your team spends hours answering basic questions instead of closing deals and serving customers.",
  },
  {
    icon: Smartphone,
    title: "Chat-first customers",
    description:
      "Myanmar customers message businesses on Facebook, Viber, and chat apps — they expect instant replies.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-sora text-[32px] md:text-[40px] font-bold tracking-[-0.04em] leading-[1.05] text-foreground">
            The problem every Myanmar business faces
          </h2>
          <p className="mt-4 text-[14px] text-muted-foreground max-w-lg mx-auto leading-[1.7] tracking-[-0.005em] font-inter">
            Customer communication shouldn't be a bottleneck.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROBLEMS.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-md hover:border-border/80 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                <problem.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-sora font-semibold text-[14px] tracking-[-0.02em] text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-[13px] text-muted-foreground leading-[1.75] font-inter">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}