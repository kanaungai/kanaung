import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";
import { BookOpen, User, Zap, ChevronRight } from "lucide-react";

// Industry data — bilingual, with real inquiry scenarios
const INDUSTRY_DATA = {
  en: [
    {
      id: "showrooms",
      name: "Car Showrooms",
      tag: "Sales & Enquiry",
      inquiry: "Do you have the Toyota Hilux 2024 in black? And what's the price with financing?",
      response: "Yes, the Hilux 2024 is in stock in Jet Black. Price starts from 65 lakh MMK. We offer 0% financing over 36 months with approved credit. Want me to book a test drive?",
      knowledge: "Vehicle Inventory · Price List · Financing Terms",
    },
    {
      id: "clinics",
      name: "Clinics",
      tag: "Appointments & Services",
      inquiry: "I need to see a dermatologist. Is Dr. Khin available this Saturday?",
      response: "Dr. Khin Zin Oo is available this Saturday at 10am and 2pm. You can book the 10am slot now — it's the last one. Shall I confirm it for you?",
      knowledge: "Doctor Schedule · Service List · Appointment Rules",
    },
    {
      id: "restaurants",
      name: "Restaurants",
      tag: "Reservations & Menu",
      inquiry: "Can I book a table for 4 this Friday at 7pm? Do you have vegetarian options?",
      response: "A table for 4 on Friday at 7pm is available. We have 6 vegetarian dishes including our popular mushroom curry and tofu stir fry. Shall I confirm the reservation?",
      knowledge: "Reservation Calendar · Menu · Dietary Options",
    },
    {
      id: "hotels",
      name: "Hotels",
      tag: "Bookings & Rates",
      inquiry: "What's the rate for a deluxe room from March 15–18? Is breakfast included?",
      response: "Deluxe rooms are available for those dates at 120,000 MMK/night. Breakfast is included for all room types. Early check-in from 10am is available at no extra charge.",
      knowledge: "Room Availability · Rate Sheet · Hotel Policy",
    },
    {
      id: "realestate",
      name: "Real Estate",
      tag: "Listings & Viewings",
      inquiry: "Do you have any 2-bedroom apartments for rent in Sanchaung under 500k?",
      response: "We have 3 listings in Sanchaung under 500k: 2BR on Inya Road (480k), 2BR near Inya Lake (450k), and a garden unit at 490k. All are immediately available. Which would you like to view?",
      knowledge: "Property Listings · Rental Rates · Area Guide",
    },
    {
      id: "education",
      name: "Education Centers",
      tag: "Courses & Enrollment",
      inquiry: "When does the next IELTS preparation course start? What's the fee?",
      response: "The next IELTS prep course starts April 8th — 8 weeks, Mon/Wed/Fri evenings. Fee is 180,000 MMK, includes all materials. Only 4 seats left. Want to register now?",
      knowledge: "Course Schedule · Fee Structure · Enrollment Rules",
    },
    {
      id: "retail",
      name: "Retail Stores",
      tag: "Stock & Availability",
      inquiry: "Is the Xiaomi Redmi Note 13 in stock? Do you have the 256GB version?",
      response: "Yes, the Redmi Note 13 256GB is in stock in Midnight Black and Arctic White. Price is 520,000 MMK. We also have a 12-month installment option. Want me to reserve one?",
      knowledge: "Product Inventory · Price List · Installment Plans",
    },
    {
      id: "travel",
      name: "Travel & Ticketing",
      tag: "Schedules & Booking",
      inquiry: "Is there a bus from Yangon to Mandalay on Friday evening? How much?",
      response: "There are 3 departures Friday evening: 7pm (VIP, 22,000 MMK), 8pm (Express, 18,000 MMK), and 9:30pm (Standard, 14,000 MMK). The 7pm VIP has 6 seats left. Shall I book?",
      knowledge: "Route Schedule · Ticket Prices · Seat Availability",
    },
  ],
  my: [
    {
      id: "showrooms",
      name: "ကားရောင်းဆိုင်",
      tag: "ရောင်းချမှု & မေးမြန်းချက်",
      inquiry: "Toyota Hilux 2024 အနက်ရောင် ရှိသေးလား? Financing နဲ့ ဈေးနှုန်းပြောပြပါ",
      response: "Hilux 2024 Jet Black stock ရှိပါတယ်။ ကျပ် ၆၅ သိန်းကနေ စတင်ပါတယ်။ 36 လ 0% financing option ရှိပါတယ်။ Test drive ချိန်းဆိုပေးရမလား?",
      knowledge: "ကားစာရင်း · ဈေးနှုန်းစာရင်း · Financing စည်းမျဉ်း",
    },
    {
      id: "clinics",
      name: "ဆေးခန်း",
      tag: "ချိန်းဆိုမှု & ဝန်ဆောင်မှု",
      inquiry: "ဆရာဝန် ကျိန်းဇင်ဦး ဆီ ဒီသောကြာ ချိန်းလို့ ရမလား?",
      response: "ဒီသောကြာ မနက် ၁၀ နာရီ နဲ့ မွန်းလွဲ ၂ နာရီ နေရာ ရှိပါသေးတယ်။ ၁၀ နာရီ slot နောက်ဆုံးကျန်ပါပြီ — ယခုချင်း ချိန်းပေးရမလား?",
      knowledge: "ဆရာဝန်အချိန်ဇယား · ဝန်ဆောင်မှုများ · ချိန်းဆိုမှုစည်းမျဉ်း",
    },
    {
      id: "restaurants",
      name: "စားသောက်ဆိုင်",
      tag: "ဘွတ်ကင် & မီနူး",
      inquiry: "ဒီသောကြာ ညနေ ၇ နာရီ ၄ ယောက်စားပွဲ ဘွတ်ကင်လုပ်လို့ ရမလား? Vegetarian အစားအစာ ရှိသလား?",
      response: "သောကြာ ညနေ ၇ နာရီ ၄ ယောက်အတွက် မှာကြိုနိုင်ပါတယ်။ Mushroom curry နဲ့ tofu stir fry အပါအဝင် vegetarian ဟင်း ၆ မျိုး ရှိပါတယ်။ ဘွတ်ကင်အတည်ပြုပေးရမလား?",
      knowledge: "ဘွတ်ကင်ဇယားကွက် · မီနူး · အစားအသောက်ရွေးချယ်မှု",
    },
    {
      id: "hotels",
      name: "ဟိုတယ်",
      tag: "ဘွတ်ကင် & နှုန်းထား",
      inquiry: "မတ် ၁၅–၁၈ Deluxe room ဘယ်လောက်ကျမလဲ? မနက်စာ ပါသလား?",
      response: "ထိုရက်များတွင် Deluxe room တစ်ညလျှင် ကျပ် ၁၂ သောင်း ရရှိနိုင်ပါတယ်။ မနက်စာ အားလုံးပါဝင်ပါတယ်။ နံနက် ၁၀ နာရီ early check-in အပိုကြေး မကောက်ဘဲ ရရှိနိုင်ပါတယ်။",
      knowledge: "အခန်းရရှိနိုင်မှု · နှုန်းထားစာရင်း · ဟိုတယ်မူဝါဒ",
    },
    {
      id: "realestate",
      name: "အိမ်ခြံမြေ",
      tag: "ပိုင်ဆိုင်မှုနှင့် ကြည့်ရှုမှု",
      inquiry: "စမ်းချောင်းမှာ ကျပ် ၅ သိန်းအောက် အခန်း ၂ ခန်း တိုက်ခန်း ငှားမလားရှိသလား?",
      response: "စမ်းချောင်းတွင် ၅ သိန်းအောက် ၃ ခု ရှိပါတယ်: Inya Road (၄.၈ သိန်း)၊ ရွှေတိဂုံ (၄.၅ သိန်း)နဲ့ ဥယျာဉ် unit (၄.၉ သိန်း)။ သွားကြည့်ချင်တဲ့ တစ်ခု ပြောပြပါ။",
      knowledge: "ပိုင်ဆိုင်မှုစာရင်း · ငှားရမ်းနှုန်း · ဧရိယာလမ်းညွှန်",
    },
    {
      id: "education",
      name: "ပညာရေးဌာန",
      tag: "သင်တန်း & ဝင်ခွင့်",
      inquiry: "IELTS သင်တန်း နောက်တစ်ကြိမ် ဘယ်တော့ စမလဲ? ကြေးငွေ ဘယ်လောက်ကျမလဲ?",
      response: "နောက် IELTS သင်တန်း ဧပြီ ၈ ရက်မှ စတင်ပါမည်။ ၈ ပတ်ကြာ ညနေပိုင်း တစ်ရက်ခြားသင်ကြားမည်။ ကြေးငွေ ၁၈ သောင်း၊ ပစ္စည်းများ အားလုံးပါ၀င်ပြီ နေရာ ၄ ခုသာ ကျန်ပါသည်။ ယခုမှတ်ပုံတင်မလား?",
      knowledge: "သင်တန်းဇယား · ကြေးငွေ · ဝင်ခွင့်စည်းမျဉ်း",
    },
    {
      id: "retail",
      name: "လက်လီဆိုင်",
      tag: "ကုန်ပစ္စည်း & ရရှိနိုင်မှု",
      inquiry: "Xiaomi Redmi Note 13 256GB stock ရှိသေးလား?",
      response: "Redmi Note 13 256GB Midnight Black နဲ့ Arctic White ရှိပါတယ်။ ကျပ် ၅.၂ သိန်း ဖြစ်ပြီး ၁၂ လ အရစ်ကျ option ရှိပါတယ်။ တစ်လုံး သိမ်းဆည်းပေးရမလား?",
      knowledge: "ကုန်ပစ္စည်းစာရင်း · ဈေးနှုန်းစာရင်း · အရစ်ကျစနစ်",
    },
    {
      id: "travel",
      name: "ခရီးသွား & လက်မှတ်",
      tag: "ဇယားကွက် & ဘွတ်ကင်",
      inquiry: "သောကြာ ညနေ ရန်ကုန်ကနေ မန္တလေး bus ရှိသလား? ဈေးနှုန်းပြောပြပါ",
      response: "သောကြာ ညနေ ၃ ကြိမ် ရှိပါတယ်: ၇ နာရီ VIP (၂.၂ သောင်း)၊ ၈ နာရီ Express (၁.၈ သောင်း)နဲ့ ၉:၃၀ Standard (၁.၄ သောင်း)။ ၇ နာရီ VIP မှာ နေရာ ၆ ကျန်ပါတယ်။ ဘွတ်ကင်လုပ်ပေးရမလား?",
      knowledge: "လမ်းကြောင်းဇယား · လက်မှတ်ဈေးနှုန်း · နေရာပြင်ဆင်မှု",
    },
  ],
};

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

        {/* Header */}
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
          className="grid md:grid-cols-[280px_1fr] gap-4 md:gap-6 items-start"
        >
          {/* ── Left: industry selector ── */}
          <div
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "hsl(220 22% 9%)",
              border: "1px solid rgba(255,255,255,0.07)",
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
                      background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                      color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                      border: `1px solid ${isActive ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    {ind.name}
                  </button>
                );
              })}
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden md:flex flex-col py-3">
              {industries.map((ind, i) => {
                const isActive = ind.id === selectedId;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedId(ind.id)}
                    className="relative flex items-center justify-between px-5 py-3.5 text-left transition-all duration-150 group"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                      borderBottom: i < industries.length - 1 ? "1px solid rgba(255,255,255,0.045)" : "none",
                    }}
                  >
                    {/* Active accent bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        className="absolute left-0 top-0 bottom-0 w-[2.5px] rounded-r-full"
                        style={{ background: "hsl(352 72% 52%)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <div>
                      <p
                        className="text-[13px] font-semibold tracking-[-0.01em] leading-snug"
                        style={{ color: isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.38)" }}
                      >
                        {ind.name}
                      </p>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[10px] mt-0.5 font-inter"
                          style={{ color: "rgba(255,255,255,0.28)" }}
                        >
                          {ind.tag}
                        </motion.p>
                      )}
                    </div>
                    <ChevronRight
                      className="w-3.5 h-3.5 flex-shrink-0 transition-opacity duration-150"
                      style={{ color: isActive ? "rgba(255,255,255,0.35)" : "transparent" }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right: preview panel ── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "hsl(220 22% 9%)",
              border: "1px solid rgba(255,255,255,0.07)",
              minHeight: 340,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.25, 1, 0.4, 1] }}
                className="flex flex-col h-full p-6 md:p-8"
              >
                {/* Industry label */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-sora text-[18px] md:text-[22px] font-extrabold tracking-[-0.03em] text-white leading-tight">
                      {selected.name}
                    </p>
                    <p className="text-[10.5px] text-white/30 mt-1 font-inter tracking-[0.03em]">
                      {selected.tag}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full flex-shrink-0"
                    style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.16)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[9px] font-bold text-green-400 tracking-[0.1em] uppercase">Live</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

                {/* Conversation preview */}
                <div className="flex flex-col gap-4 flex-1">

                  {/* Customer inquiry */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <User className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.45)" }} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9.5px] font-semibold tracking-[0.06em] uppercase" style={{ color: "rgba(255,255,255,0.22)" }}>
                        Customer
                      </span>
                      <div
                        className="px-4 py-3 rounded-2xl rounded-tl-sm text-[13px] leading-[1.7] font-inter"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.78)",
                          maxWidth: 480,
                        }}
                      >
                        {selected.inquiry}
                      </div>
                    </div>
                  </div>

                  {/* AI response */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "hsl(352 72% 38% / 0.2)", border: "1px solid hsl(352 72% 44% / 0.25)" }}
                    >
                      <Zap className="w-3 h-3" style={{ color: "hsl(352 60% 62%)" }} />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <span className="text-[9.5px] font-semibold tracking-[0.06em] uppercase" style={{ color: "hsl(352 60% 55% / 0.7)" }}>
                        Kanaung AI
                      </span>
                      <div
                        className="px-4 py-3 rounded-2xl rounded-tl-sm text-[13px] leading-[1.7] font-inter"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.68)",
                          maxWidth: 520,
                        }}
                      >
                        {selected.response}
                      </div>

                      {/* Knowledge footer */}
                      <div
                        className="flex items-center gap-2 mt-1.5 px-3 py-2 rounded-xl self-start"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <BookOpen className="w-3 h-3 flex-shrink-0" style={{ color: "rgba(255,255,255,0.22)" }} />
                        <span className="text-[9.5px] font-inter" style={{ color: "rgba(255,255,255,0.28)" }}>
                          {selected.knowledge}
                        </span>
                      </div>
                    </div>
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