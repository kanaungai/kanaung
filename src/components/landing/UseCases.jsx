import React from "react";
import { motion } from "framer-motion";
import {
  Car,
  Wrench,
  Stethoscope,
  GraduationCap,
  Building2,
  Hotel,
  ShoppingBag,
} from "lucide-react";

const CASES = [
  { icon: Car, label: "Car dealerships", description: "Model availability, pricing, test drives" },
  { icon: Wrench, label: "Machinery & equipment", description: "Specs, stock, delivery, spare parts" },
  { icon: Stethoscope, label: "Clinics & hospitals", description: "Services, hours, appointment booking" },
  { icon: GraduationCap, label: "Education centers", description: "Courses, schedules, enrollment" },
  { icon: Building2, label: "Real estate", description: "Listings, pricing, viewing requests" },
  { icon: Hotel, label: "Hotels & travel", description: "Room availability, rates, amenities" },
  { icon: ShoppingBag, label: "Retail & distribution", description: "Product catalog, orders, delivery" },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-20 md:py-28 bg-secondary/40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Built for Myanmar businesses
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Any business that answers customer questions can use Kanaung.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CASES.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/20 transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/8 group-hover:bg-primary/12 flex items-center justify-center mb-3 transition-colors">
                <c.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">
                {c.label}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {c.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}