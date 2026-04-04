import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";
import { BookOpen, CheckCircle2 } from "lucide-react";

// Burmese-first, Myanmar-specific scenarios
const INDUSTRY_DATA = {
  en: [
    {
      id: "showrooms",
      name: "Car Showrooms",
      tag: "Inventory · Pricing · Financing",
      inquiry: "Hilux 2024 အနက်ရောင် ရှိသေးလား? Installment နဲ့ ဈေးနှုန်း ပြောပြပါ",
      response: "Hilux 2024 Jet Black stock ရှိပါတယ်။ ကျပ် ၆၅ သိန်းကနေ စတင်ပြီး 36 လ 0% installment option ရှိပါတယ်။ Test drive ချိန်းဆိုပေးရမလား?",
      knowledge: ["Vehicle Inventory", "Price List", "Financing Terms"],
    },
    {
      id: "clinics",
      name: "Clinics",
      tag: "Appointments · Doctors · Hours",
      inquiry: "ဆရာဝန် ကျင်းဇင်ဦး ဆီ ဒီစနေ ချိန်းလို့ ရမလား? နံနက်ပိုင်း ဦးစားပေးချင်တယ်",
      response: "ဒီစနေ မနက် ၁၀ နာရီ နဲ့ မွန်းလွဲ ၂ နာရီ slot ရှိပါသေးတယ်။ ၁၀ နာရီ slot နောက်ဆုံး ကျန်ပါတယ် — ယခုချင်း ချိန်းပေးရမလား?",
      knowledge: ["Doctor Schedule", "Service List", "Appointment Rules"],
    },
    {
      id: "restaurants",
      name: "Restaurants",
      tag: "Reservations · Menu · Hours",
      inquiry: "ဒီသောကြာ ညနေ ၇ နာရီ ၄ ယောက်စားပွဲ ဘွတ်ကင်လုပ်လို့ ရမလား?",
      response: "သောကြာ ညနေ ၇ နာရီ ၄ ယောက် ဘွတ်ကင်လုပ်နိုင်ပါတယ်။ Vegetarian ဟင်း ၆ မျိုးလည်း ရှိပါတယ်။ ဘွတ်ကင် အတည်ပြုပေးရမလား?",
      knowledge: ["Reservation Calendar", "Menu", "Dietary Options"],
    },
    {
      id: "hotels",
      name: "Hotels",
      tag: "Room Rates · Availability · Policy",
      inquiry: "မတ် ၁၅–၁၈ Deluxe room ဘယ်လောက်ကျမလဲ? မနက်စာ ပါသလား?",
      response: "ထိုရက်များ Deluxe room တစ်ညလျှင် ကျပ် ၁၂ သောင်း ဖြစ်ပြီး မနက်စာ ပါဝင်ပါတယ်။ နံနက် ၁၀ နာရီ early check-in အပိုကြေး မကောက်ဘဲ ရရှိနိုင်ပါတယ်။",
      knowledge: ["Room Availability", "Rate Sheet", "Hotel Policy"],
    },
    {
      id: "realestate",
      name: "Real Estate",
      tag: "Listings · Viewings · Area Guides",
      inquiry: "စမ်းချောင်းမှာ ကျပ် ၅ သိန်းအောက် အခန်း ၂ ခန်း တိုက်ခန်း ငှားမလားရှိသလား?",
      response: "စမ်းချောင်းတွင် ၅ သိန်းအောက် ၃ ခု ရှိပါတယ် — Inya Road (၄.၈)၊ ရွှေတိဂုံ (၄.၅)နဲ့ garden unit (၄.၉)။ ကြည့်ချင်တဲ့ တစ်ခု ရွေးပါ — ချိန်းပေးပါမယ်။",
      knowledge: ["Property Listings", "Rental Rates", "Area Guide"],
    },
    {
      id: "education",
      name: "Education Centers",
      tag: "Courses · Schedules · Enrollment",
      inquiry: "IELTS သင်တန်း နောက်ကြိမ် ဘယ်တော့ စမလဲ? ကြေးငွေ ဘယ်လောက်ကျမလဲ?",
      response: "နောက် IELTS သင်တန်း ဧပြီ ၈ ရက်မှ စတင်ပါမည်။ ၈ ပတ်ကြာ ညနေပိုင်း တစ်ရက်ခြားသင်ကြားမည်။ ကြေးငွေ ၁၈ သောင်း — နေရာ ၄ ခုသာ ကျန်ပါသည်။",
      knowledge: ["Course Schedule", "Fee Structure", "Enrollment Rules"],
    },
    {
      id: "retail",
      name: "Retail Stores",
      tag: "Stock · Pricing · Installments",
      inquiry: "Xiaomi Redmi Note 13 256GB stock ရှိသေးလား? အရစ်ကျ option ရှိသလား?",
      response: "Redmi Note 13 256GB Midnight Black နဲ့ Arctic White ရှိပါတယ်။ ကျပ် ၅.၂ သိန်း ဖြစ်ပြီး ၁၂ လ အရစ်ကျ option ရှိပါတယ်။ တစ်လုံး သိမ်းဆည်းပေးရမလား?",
      knowledge: ["Product Inventory", "Price List", "Installment Plans"],
    },
    {
      id: "travel",
      name: "Travel & Ticketing",
      tag: "Schedules · Prices · Booking",
      inquiry: "သောကြာ ညနေ ရန်ကုန်ကနေ မန္တလေး bus ရှိသလား? ဈေးနှုန်းပြောပြပါ",
      response: "သောကြာ ၃ ကြိမ် ရှိပါတယ် — ၇ နာရီ VIP (၂.၂ သောင်း)၊ ၈ နာရီ Express (၁.၈ သောင်း)နဲ့ ၉:၃၀ Standard (၁.၄ သောင်း)။ VIP မှာ နေရာ ၆ ကျန်ပါတယ်။",
      knowledge: ["Route Schedule", "Ticket Prices", "Seat Availability"],
    },
  ],
  my: [
    {
      id: "showrooms",
      name: "ကားရောင်းဆိုင်",
      tag: "ကားစာရင်း · ဈေးနှုန်း · Financing",
      inquiry: "Hilux 2024 အနက်ရောင် ရှိသေးလား? Installment နဲ့ ဈေးနှုန်း ပြောပြပါ",
      response: "Hilux 2024 Jet Black stock ရှိပါတယ်။ ကျပ် ၆၅ သိန်းကနေ စတင်ပြီး 36 လ 0% installment option ရှိပါတယ်။ Test drive ချိန်းဆိုပေးရမလား?",
      knowledge: ["ကားစာရင်း", "ဈေးနှုန်းစာရင်း", "Financing စည်းမျဉ်း"],
    },
    {
      id: "clinics",
      name: "ဆေးခန်း",
      tag: "ချိန်းဆိုမှု · ဆရာဝန် · ဖွင့်ချိန်",
      inquiry: "ဆရာဝန် ကျင်းဇင်ဦး ဆီ ဒီစနေ ချိန်းလို့ ရမလား? နံနက်ပိုင်း ဦးစားပေးချင်တယ်",
      response: "ဒီစနေ မနက် ၁၀ နာရီ နဲ့ မွန်းလွဲ ၂ နာရီ slot ရှိပါသေးတယ်။ ၁၀ နာရီ slot နောက်ဆုံး ကျန်ပါတယ် — ယခုချင်း ချိန်းပေးရမလား?",
      knowledge: ["ဆရာဝန်အချိန်ဇယား", "ဝန်ဆောင်မှုများ", "ချိန်းဆိုမှုစည်းမျဉ်း"],
    },
    {
      id: "restaurants",
      name: "စားသောက်ဆိုင်",
      tag: "ဘွတ်ကင် · မီနူး · ဖွင့်ချိန်",
      inquiry: "ဒီသောကြာ ညနေ ၇ နာရီ ၄ ယောက်စားပွဲ ဘွတ်ကင်လုပ်လို့ ရမလား?",
      response: "သောကြာ ညနေ ၇ နာရီ ၄ ယောက် ဘွတ်ကင်လုပ်နိုင်ပါတယ်။ Vegetarian ဟင်း ၆ မျိုးလည်း ရှိပါတယ်။ ဘွတ်ကင် အတည်ပြုပေးရမလား?",
      knowledge: ["ဘွတ်ကင်ဇယားကွက်", "မီနူး", "အစားအသောက်ရွေးချယ်မှု"],
    },
    {
      id: "hotels",
      name: "ဟိုတယ်",
      tag: "အခန်းနှုန်း · ရရှိနိုင်မှု · မူဝါဒ",
      inquiry: "မတ် ၁၅–၁၈ Deluxe room ဘယ်လောက်ကျမလဲ? မနက်စာ ပါသလား?",
      response: "ထိုရက်များ Deluxe room တစ်ညလျှင် ကျပ် ၁၂ သောင်း ဖြစ်ပြီး မနက်စာ ပါဝင်ပါတယ်။ နံနက် ၁၀ နာရီ early check-in အပိုကြေး မကောက်ဘဲ ရရှိနိုင်ပါတယ်။",
      knowledge: ["အခန်းရရှိနိုင်မှု", "နှုန်းထားစာရင်း", "ဟိုတယ်မူဝါဒ"],
    },
    {
      id: "realestate",
      name: "အိမ်ခြံမြေ",
      tag: "ပိုင်ဆိုင်မှုစာရင်း · ကြည့်ရှုမှု · ဧရိယာ",
      inquiry: "စမ်းချောင်းမှာ ကျပ် ၅ သိန်းအောက် အခန်း ၂ ခန်း တိုက်ခန်း ငှားမလားရှိသလား?",
      response: "စမ်းချောင်းတွင် ၅ သိန်းအောက် ၃ ခု ရှိပါတယ် — Inya Road (၄.၈)၊ ရွှေတိဂုံ (၄.၅)နဲ့ garden unit (၄.၉)။ ကြည့်ချင်တဲ့ တစ်ခု ရွေးပါ — ချိန်းပေးပါမယ်။",
      knowledge: ["ပိုင်ဆိုင်မှုစာရင်း", "ငှားရမ်းနှုန်း", "ဧရိယာလမ်းညွှန်"],
    },
    {
      id: "education",
      name: "ပညာရေးဌာန",
      tag: "သင်တန်း · ဇယားကွက် · ဝင်ခွင့်",
      inquiry: "IELTS သင်တန်း နောက်ကြိမ် ဘယ်တော့ စမလဲ? ကြေးငွေ ဘယ်လောက်ကျမလဲ?",
      response: "နောက် IELTS သင်တန်း ဧပြီ ၈ ရက်မှ စတင်ပါမည်။ ၈ ပတ်ကြာ ညနေပိုင်း တစ်ရက်ခြားသင်ကြားမည်။ ကြေးငွေ ၁၈ သောင်း — နေရာ ၄ ခုသာ ကျန်ပါသည်။",
      knowledge: ["သင်တန်းဇယား", "ကြေးငွေ", "ဝင်ခွင့်စည်းမျဉ်း"],
    },
    {
      id: "retail",
      name: "လက်လီဆိုင်",
      tag: "ကုန်ပစ္စည်း · ဈေးနှုန်း · အရစ်ကျ",
      inquiry: "Xiaomi Redmi Note 13 256GB stock ရှိသေးလား? အရစ်ကျ option ရှိသလား?",
      response: "Redmi Note 13 256GB Midnight Black နဲ့ Arctic White ရှိပါတယ်။ ကျပ် ၅.၂ သိန်း ဖြစ်ပြီး ၁၂ လ အရစ်ကျ option ရှိပါတယ်။ တစ်လုံး သိမ်းဆည်းပေးရမလား?",
      knowledge: ["ကုန်ပစ္စည်းစာရင်း", "ဈေးနှုန်းစာရင်း", "အရစ်ကျစနစ်"],
    },
    {
      id: "travel",
      name: "ခရီးသွား & လက်မှတ်",
      tag: "ဇယားကွက် · ဈေးနှုန်း · ဘွတ်ကင်",
      inquiry: "သောကြာ ညနေ ရန်ကုန်ကနေ မန္တလေး bus ရှိသလား? ဈေးနှုန်းပြောပြပါ",
      response: "သောကြာ ၃ ကြိမ် ရှိပါတယ် — ၇ နာရီ VIP (၂.၂ သောင်း)၊ ၈ နာရီ Express (၁.၈ သောင်း)နဲ့ ၉:၃၀ Standard (၁.၄ သောင်း)။ VIP မှာ နေရာ ၆ ကျန်ပါတယ်။",
      knowledge: ["လမ်းကြောင်းဇယား", "လက်မှတ်ဈေးနှုန်း", "နေရာပြင်ဆင်မှု"],
    },
  ],
};

// AI avatar — matches LiveCallPanel
function AIAvatar() {
  return (
    <div
      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <img
        src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
        alt="AI"
        className="w-3.5 h-3.5 object-contain"
        style={{ filter: "brightness(0) invert(1) opacity(0.7)" }}
      />
    </div>
  );
}

export default function Industries() {
  const { lang } = useLang();
  const tx = t[lang];
  const industries = INDUSTRY_DATA[lang] || INDUSTRY_DATA.en;
  const [selectedId, setSelectedId] = useState(industries[0].id);
  const { ref: headerRef, inView: headerVisible } = useScrollReveal();
  const { ref: bodyRef, inView: bodyVisible } = useScrollReveal({ margin: "-40px" });

  const selected = industries.find((i) => i.id === selectedId) || industries[0];

  return (
    <section id="industries" className="py-24 md:py-32 bg-[hsl(220_25%_6%)] relative">
      <div className="max-w-[1200px] mx-auto px-8">

        {/* Header — unchanged */}
        <motion.div
          ref={headerRef}
          animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 18 }}
          initial={{ opacity: 0, y: 18 }}
          transition={REVEAL.primary}
          className="mb-16 md:mb-20"
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-white/25 mb-6 font-inter">
            {tx.ind_eyebrow}
          </p>
          <div className="w-full h-px bg-white/8 mb-10" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[30px] md:text-[48px] xl:text-[56px] font-extrabold tracking-[-0.05em] leading-[0.97] text-white">
              {tx.ind_h2}
            </h2>
            <motion.p
              animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 12 }}
              initial={{ opacity: 0, y: 12 }}
              transition={{ ...REVEAL.primary, delay: 0.12 }}
              className="text-[15px] text-white/45 leading-[1.8] md:pt-2 max-w-md font-inter tracking-[-0.005em]"
            >
              {tx.ind_sub}
            </motion.p>
          </div>
        </motion.div>

        {/* Interactive body */}
        <motion.div
          ref={bodyRef}
          animate={{ opacity: bodyVisible ? 1 : 0, y: bodyVisible ? 0 : 20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={REVEAL.card}
          className="grid md:grid-cols-[256px_1fr] gap-3 items-start"
        >
          {/* ── Left selector — light panel ── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "hsl(220 18% 97%)",
              border: "1px solid hsl(220 16% 88%)",
              boxShadow: "0 4px 24px hsl(220 25% 5% / 0.25)",
            }}
          >
            {/* Mobile: horizontal scroll */}
            <div className="md:hidden flex overflow-x-auto gap-2 p-3" style={{ scrollbarWidth: "none" }}>
              {industries.map((ind) => {
                const isActive = ind.id === selectedId;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedId(ind.id)}
                    className="flex-shrink-0 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-150"
                    style={{
                      background: isActive ? "hsl(352 72% 38%)" : "transparent",
                      color: isActive ? "white" : "hsl(220 18% 40%)",
                      border: `1px solid ${isActive ? "hsl(352 72% 38%)" : "hsl(220 16% 86%)"}`,
                    }}
                  >
                    {ind.name}
                  </button>
                );
              })}
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden md:flex flex-col py-1.5">
              {industries.map((ind, i) => {
                const isActive = ind.id === selectedId;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedId(ind.id)}
                    className="relative w-full text-left px-5 py-3.5 transition-all duration-150"
                    style={{ background: isActive ? "hsl(352 72% 38% / 0.06)" : "transparent" }}
                  >
                    {/* Active left bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        className="absolute left-0 top-1.5 bottom-1.5 w-[2.5px] rounded-r-full"
                        style={{ background: "hsl(352 72% 42%)" }}
                        transition={{ type: "spring", stiffness: 500, damping: 32 }}
                      />
                    )}
                    {/* Divider */}
                    {i > 0 && (
                      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "hsl(220 16% 90%)" }} />
                    )}
                    <p
                      className="text-[13px] font-semibold tracking-[-0.01em] leading-snug transition-colors duration-150"
                      style={{ color: isActive ? "hsl(352 65% 34%)" : "hsl(220 14% 52%)" }}
                    >
                      {ind.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right preview panel — light ── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "hsl(220 18% 97%)",
              border: "1px solid hsl(220 16% 88%)",
              boxShadow: "0 4px 24px hsl(220 25% 5% / 0.25)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2, ease: [0.25, 1, 0.4, 1] }}
              >
                {/* Panel header */}
                <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: "hsl(220 16% 90%)" }}>
                  <p className="font-sora text-[18px] font-extrabold tracking-[-0.03em] leading-tight" style={{ color: "hsl(220 25% 10%)" }}>
                    {selected.name}
                  </p>
                  <p className="text-[11px] mt-1 font-inter" style={{ color: "hsl(220 12% 52%)" }}>
                    {selected.tag}
                  </p>
                </div>

                {/* Conversation area */}
                <div className="px-6 py-5 flex flex-col gap-3">

                  {/* Customer bubble */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9.5px] font-semibold tracking-[0.06em] uppercase ml-1" style={{ color: "hsl(220 12% 58%)" }}>
                      Customer
                    </span>
                    <div
                      className="self-start px-4 py-3 rounded-2xl rounded-tl-sm text-[13px] leading-[1.7] font-inter max-w-[90%]"
                      style={{
                        background: "hsl(220 16% 92%)",
                        color: "hsl(220 18% 18%)",
                        border: "1px solid hsl(220 16% 87%)",
                      }}
                    >
                      {selected.inquiry}
                    </div>
                  </div>

                  {/* AI response bubble */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9.5px] font-semibold tracking-[0.06em] uppercase ml-1" style={{ color: "hsl(352 65% 42%)" }}>
                      Kanaung AI
                    </span>
                    <div
                      className="self-start px-4 py-3.5 rounded-2xl rounded-tl-sm text-[13px] leading-[1.75] font-inter max-w-[92%]"
                      style={{
                        background: "white",
                        color: "hsl(220 18% 15%)",
                        border: "1px solid hsl(220 16% 88%)",
                        boxShadow: "0 2px 8px hsl(220 20% 12% / 0.06)",
                      }}
                    >
                      {selected.response}
                    </div>
                  </div>

                </div>

                {/* Knowledge source row */}
                <div
                  className="flex items-center gap-2.5 px-6 py-3.5 border-t"
                  style={{ borderColor: "hsl(220 16% 90%)", background: "hsl(220 18% 96%)" }}
                >
                  <BookOpen className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(220 12% 58%)" }} />
                  <span className="text-[10.5px] font-inter" style={{ color: "hsl(220 12% 46%)" }}>
                    {selected.knowledge.join(" · ")}
                  </span>
                  <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3" style={{ color: "hsl(142 50% 40%)" }} />
                    <span className="text-[9.5px] font-semibold" style={{ color: "hsl(220 12% 46%)" }}>AI resolved</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: bodyVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.4 }}
          className="w-full h-px bg-white/8 mt-16 md:mt-20"
        />
      </div>
    </section>
  );
}