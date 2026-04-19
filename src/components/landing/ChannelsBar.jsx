import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

const CHANNELS = [
  {
    name: "Messenger",
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="url(#msg-grad)" />
        <defs>
          <linearGradient id="msg-grad" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00B0FF" /><stop offset="1" stopColor="#006AFF" />
          </linearGradient>
        </defs>
        <path d="M24 8C15.163 8 8 14.716 8 23C8 27.557 10.057 31.627 13.322 34.42V40L18.908 37.147C20.511 37.608 22.224 37.857 24 37.857C32.837 37.857 40 31.141 40 22.857C40 14.573 32.837 8 24 8ZM25.392 27.392L21.837 23.571L14.914 27.392L22.557 19.178L26.163 22.999L33.035 19.178L25.392 27.392Z" fill="white" />
      </svg>
    ),
    label: "Messenger",
    color: "#006AFF",
  },
  {
    name: "WhatsApp",
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#25D366" />
        <path fillRule="evenodd" clipRule="evenodd" d="M34.603 13.365C32.022 10.783 28.614 9.355 24.987 9.354C17.512 9.354 11.433 15.432 11.43 22.908C11.429 25.279 12.048 27.593 13.224 29.627L11.32 36.646L18.503 34.778C20.463 35.849 22.703 36.413 24.98 36.414H24.987C32.46 36.414 38.54 30.335 38.543 22.859C38.544 19.237 37.184 15.947 34.603 13.365ZM31.17 25.773C30.833 25.605 29.157 24.781 28.848 24.67C28.538 24.558 28.314 24.502 28.089 24.839C27.864 25.177 27.208 25.942 27.011 26.167C26.815 26.392 26.618 26.42 26.281 26.252C25.944 26.084 24.868 25.73 23.593 24.59C22.599 23.702 21.914 22.609 21.717 22.271C21.521 21.933 21.697 21.751 21.866 21.584C22.018 21.433 22.203 21.19 22.371 20.993C22.539 20.796 22.596 20.655 22.708 20.43C22.82 20.205 22.764 20.008 22.68 19.84C22.596 19.672 21.915 17.993 21.633 17.31C21.358 16.645 21.08 16.734 20.872 16.723C20.675 16.713 20.451 16.711 20.226 16.711C20.001 16.711 19.636 16.795 19.327 17.132C19.017 17.47 18.138 18.294 18.138 19.973C18.138 21.651 19.355 23.274 19.523 23.499C19.691 23.724 21.91 27.115 25.281 28.594C26.082 28.94 26.709 29.146 27.198 29.299C28.002 29.551 28.734 29.515 29.312 29.429C29.955 29.333 31.395 28.622 31.675 27.84C31.956 27.059 31.956 26.376 31.872 26.236C31.788 26.097 31.563 26.013 31.226 25.845L31.17 25.773Z" fill="white" />
      </svg>
    ),
    label: "WhatsApp",
    color: "#25D366",
  },
  {
    name: "Viber",
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#7360F2" />
        <path d="M35.5 14.5C33.2 12.2 29.6 11 24 11C18.4 11 14.8 12.2 12.5 14.5C10.2 16.8 9 20.4 9 26C9 29.8 9.8 33 11.2 35.2C12.1 36.6 13.3 37.6 14.8 38.1V41.5C14.8 42 15.4 42.3 15.8 42L19.8 39.1C21.2 39.3 22.6 39.4 24 39.4C29.6 39.4 33.2 38.2 35.5 35.9C37.8 33.6 39 30 39 26C39 22 37.8 16.8 35.5 14.5ZM31.2 32.4L29.8 31C27.5 31.8 25 32 22.7 31.5L19.5 34.7C19.2 35 18.8 34.8 18.8 34.4V31.1C17.5 30.6 16.4 29.8 15.6 28.7C14.5 27.2 14 25.2 14 22.8C14 20.4 14.6 18.5 15.7 17.1C16.8 15.7 18.7 15 21.5 15H26.5C29.3 15 31.2 15.7 32.3 17.1C33.4 18.5 34 20.4 34 22.8C34 25.2 33.4 27.1 32.3 28.5C32 28.9 31.6 29.3 31.2 29.6V32.4Z" fill="white" />
      </svg>
    ),
    label: "Viber",
    color: "#7360F2",
  },
  {
    name: "Telegram",
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#26A5E4" />
        <path d="M10.388 23.21L33.648 14.227C34.743 13.843 35.695 14.5 35.343 16.107L31.437 34.578C31.15 35.883 30.367 36.207 29.278 35.594L23.278 31.195L20.382 33.98C20.068 34.294 19.804 34.558 19.191 34.558L19.613 28.454L30.726 18.374C31.204 17.952 30.622 17.716 29.989 18.137L16.265 26.843L10.337 24.969C9.059 24.559 9.031 23.68 10.388 23.21Z" fill="white" />
      </svg>
    ),
    label: "Telegram",
    color: "#26A5E4",
  },
  {
    name: "Facebook",
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#1877F2" />
        <path d="M33 24C33 19.029 28.971 15 24 15C19.029 15 15 19.029 15 24C15 28.496 18.291 32.212 22.594 32.892V26.656H20.309V24H22.594V22.019C22.594 19.766 23.932 18.524 25.983 18.524C26.964 18.524 27.991 18.7 27.991 18.7V20.913H26.858C25.741 20.913 25.406 21.584 25.406 22.273V24H27.886L27.499 26.656H25.406V32.892C29.709 32.212 33 28.496 33 24Z" fill="white" />
      </svg>
    ),
    label: "Facebook",
    color: "#1877F2",
  },
  {
    name: "Instagram",
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ig-g2" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" /><stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" /><stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <circle cx="24" cy="24" r="24" fill="url(#ig-g2)" />
        <rect x="14" y="14" width="20" height="20" rx="6" stroke="white" strokeWidth="2.2" fill="none" />
        <circle cx="24" cy="24" r="5.2" stroke="white" strokeWidth="2.2" fill="none" />
        <circle cx="30.5" cy="17.5" r="1.5" fill="white" />
      </svg>
    ),
    label: "Instagram",
    color: "#E1306C",
  },
  {
    name: "Web Chat",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" />
        <path d="M8 12C8 9.791 9.791 8 12 8H16C17.105 8 18 8.895 18 10V14C18 15.105 17.105 16 16 16H13L10 18V16C8.895 16 8 15.105 8 14V12Z" fill="rgba(255,255,255,0.55)" />
        <circle cx="11" cy="12" r="0.8" fill="rgba(15,15,20,0.8)" />
        <circle cx="13.5" cy="12" r="0.8" fill="rgba(15,15,20,0.8)" />
      </svg>
    ),
    label: "Web Chat",
    color: "rgba(255,255,255,0.5)",
  },
];

// Triple for seamless loop
const ALL = [...CHANNELS, ...CHANNELS, ...CHANNELS];

export default function ChannelsBar() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref, inView } = useScrollReveal({ margin: "-60px" });

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "hsl(222 28% 5%)" }}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }}
      />

      <div className="max-w-[1200px] mx-auto px-8">

        {/* Section header */}
        <motion.div
          ref={ref}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
          initial={{ opacity: 0, y: 16 }}
          transition={REVEAL.primary}
          className="text-center mb-14 md:mb-16"
        >
          <p
            className="font-sora font-extrabold tracking-[-0.04em] leading-[1.1] mb-4"
            style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "rgba(255,255,255,0.82)" }}
          >
            {tx.channels_heading ?? "Works across every channel your customers already use."}
          </p>
          <p className="text-[14px] font-inter max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.28)" }}>
            {tx.channels_label}
          </p>
        </motion.div>

        {/* Channel rail */}
        <motion.div
          animate={{ opacity: inView ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.2 }}
          className="relative max-w-3xl mx-auto overflow-hidden"
        >
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, hsl(222 28% 5%) 0%, transparent 100%)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, hsl(222 28% 5%) 0%, transparent 100%)" }}
          />

          <div className="flex">
            <div
              className="flex items-center gap-8"
              style={{ animation: "channels-marquee 40s linear infinite", width: "max-content" }}
            >
              {ALL.map((ch, i) => (
                <div key={i} className="flex items-center gap-2.5 flex-shrink-0 select-none">
                  {ch.icon}
                  <span
                    className="text-[14px] font-semibold font-inter tracking-[-0.01em]"
                    style={{ color: ch.color }}
                  >
                    {ch.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent)" }}
      />

      <style>{`
        @keyframes channels-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  );
}