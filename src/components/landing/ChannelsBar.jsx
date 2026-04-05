import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

const CHANNELS = [
  {
    name: "Messenger",
    textColor: "#0084FF",
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="url(#msg-grad)"/>
        <defs>
          <linearGradient id="msg-grad" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00B0FF"/>
            <stop offset="1" stopColor="#006AFF"/>
          </linearGradient>
        </defs>
        <path d="M24 8C15.163 8 8 14.716 8 23C8 27.557 10.057 31.627 13.322 34.42V40L18.908 37.147C20.511 37.608 22.224 37.857 24 37.857C32.837 37.857 40 31.141 40 22.857C40 14.573 32.837 8 24 8ZM25.392 27.392L21.837 23.571L14.914 27.392L22.557 19.178L26.163 22.999L33.035 19.178L25.392 27.392Z" fill="white"/>
      </svg>
    ),
    label: (
      <span style={{ background: "linear-gradient(90deg, #00B0FF, #006AFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} className="font-semibold text-[15px] tracking-[-0.01em]">
        Messenger
      </span>
    ),
  },
  {
    name: "WhatsApp",
    textColor: "#25D366",
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#25D366"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M34.603 13.365C32.022 10.783 28.614 9.355 24.987 9.354C17.512 9.354 11.433 15.432 11.43 22.908C11.429 25.279 12.048 27.593 13.224 29.627L11.32 36.646L18.503 34.778C20.463 35.849 22.703 36.413 24.98 36.414H24.987C32.46 36.414 38.54 30.335 38.543 22.859C38.544 19.237 37.184 15.947 34.603 13.365ZM24.987 34.116H24.981C22.952 34.115 20.961 33.577 19.22 32.562L18.807 32.316L14.558 33.418L15.679 29.274L15.41 28.847C14.296 27.043 13.707 24.954 13.708 22.909C13.71 16.698 18.778 11.632 24.992 11.632C27.999 11.633 30.824 12.804 32.954 14.936C35.083 17.068 36.252 19.894 36.251 22.858C36.248 29.07 31.2 34.116 24.987 34.116ZM31.17 25.773C30.833 25.605 29.157 24.781 28.848 24.67C28.538 24.558 28.314 24.502 28.089 24.839C27.864 25.177 27.208 25.942 27.011 26.167C26.815 26.392 26.618 26.42 26.281 26.252C25.944 26.084 24.868 25.73 23.593 24.59C22.599 23.702 21.914 22.609 21.717 22.271C21.521 21.933 21.697 21.751 21.866 21.584C22.018 21.433 22.203 21.19 22.371 20.993C22.539 20.796 22.596 20.655 22.708 20.43C22.82 20.205 22.764 20.008 22.68 19.84C22.596 19.672 21.915 17.993 21.633 17.31C21.358 16.645 21.08 16.734 20.872 16.723C20.675 16.713 20.451 16.711 20.226 16.711C20.001 16.711 19.636 16.795 19.327 17.132C19.017 17.47 18.138 18.294 18.138 19.973C18.138 21.651 19.355 23.274 19.523 23.499C19.691 23.724 21.91 27.115 25.281 28.594C26.082 28.94 26.709 29.146 27.198 29.299C28.002 29.551 28.734 29.515 29.312 29.429C29.955 29.333 31.395 28.622 31.675 27.84C31.956 27.059 31.956 26.376 31.872 26.236C31.788 26.097 31.563 26.013 31.226 25.845L31.17 25.773Z" fill="white"/>
      </svg>
    ),
    label: (
      <span style={{ color: "#25D366" }} className="font-semibold text-[15px] tracking-[-0.01em]">
        WhatsApp
      </span>
    ),
  },
  {
    name: "Web Chat",
    textColor: "#1a1a2e",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12C2 14.196 2.716 16.225 3.929 17.868L2.293 21.414C2.116 21.813 2.31 22.278 2.707 22.414L6.5 23.757C8.175 24.568 10.037 25 12 25C17.523 25 22 20.523 22 15C22 8.925 17.523 4.448 12 4.448V2Z" fill="none"/>
        <circle cx="12" cy="12" r="10" stroke="#64748b" strokeWidth="1.5" fill="none"/>
        <path d="M8 12C8 9.791 9.791 8 12 8H16C17.105 8 18 8.895 18 10V14C18 15.105 17.105 16 16 16H13L10 18V16C8.895 16 8 15.105 8 14V12Z" fill="#64748b"/>
        <circle cx="11" cy="12" r="1" fill="white"/>
        <circle cx="13.5" cy="12" r="1" fill="white"/>
      </svg>
    ),
    label: (
      <span style={{ color: "#475569" }} className="font-semibold text-[15px] tracking-[-0.01em]">
        Web Chat
      </span>
    ),
  },
  {
    name: "Telegram",
    textColor: "#26A5E4",
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#26A5E4"/>
        <path d="M10.388 23.21L33.648 14.227C34.743 13.843 35.695 14.5 35.343 16.107L31.437 34.578C31.15 35.883 30.367 36.207 29.278 35.594L23.278 31.195L20.382 33.98C20.068 34.294 19.804 34.558 19.191 34.558L19.613 28.454L30.726 18.374C31.204 17.952 30.622 17.716 29.989 18.137L16.265 26.843L10.337 24.969C9.059 24.559 9.031 23.68 10.388 23.21Z" fill="white"/>
      </svg>
    ),
    label: (
      <span style={{ color: "#26A5E4" }} className="font-semibold text-[15px] tracking-[-0.01em]">
        Telegram
      </span>
    ),
  },
  {
    name: "Facebook",
    textColor: "#1877F2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#1877F2"/>
        <path d="M33 24C33 19.029 28.971 15 24 15C19.029 15 15 19.029 15 24C15 28.496 18.291 32.212 22.594 32.892V26.656H20.309V24H22.594V22.019C22.594 19.766 23.932 18.524 25.983 18.524C26.964 18.524 27.991 18.7 27.991 18.7V20.913H26.858C25.741 20.913 25.406 21.584 25.406 22.273V24H27.886L27.499 26.656H25.406V32.892C29.709 32.212 33 28.496 33 24Z" fill="white"/>
      </svg>
    ),
    label: (
      <span style={{ color: "#1877F2" }} className="font-semibold text-[15px] tracking-[-0.01em]">
        Facebook
      </span>
    ),
  },
  {
    name: "Instagram",
    textColor: "#E1306C",
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ig-g1" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497"/>
            <stop offset="5%" stopColor="#fdf497"/>
            <stop offset="45%" stopColor="#fd5949"/>
            <stop offset="60%" stopColor="#d6249f"/>
            <stop offset="90%" stopColor="#285AEB"/>
          </radialGradient>
        </defs>
        <circle cx="24" cy="24" r="24" fill="url(#ig-g1)"/>
        <rect x="14" y="14" width="20" height="20" rx="6" stroke="white" strokeWidth="2.2" fill="none"/>
        <circle cx="24" cy="24" r="5.2" stroke="white" strokeWidth="2.2" fill="none"/>
        <circle cx="30.5" cy="17.5" r="1.5" fill="white"/>
      </svg>
    ),
    label: (
      <span style={{ background: "linear-gradient(90deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} className="font-semibold text-[15px] tracking-[-0.01em]">
        Instagram
      </span>
    ),
  },
];

// Triple for extra seamless loop
const ALL = [...CHANNELS, ...CHANNELS, ...CHANNELS];

function Pill({ channel }) {
  return (
    <div className="flex items-center gap-2.5 flex-shrink-0 select-none">
      {channel.icon}
      {channel.label}
    </div>
  );
}

export default function ChannelsBar() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref, inView } = useScrollReveal({ margin: "-60px" });

  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">

        {/* Overline */}
        <motion.p
          ref={ref}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
          initial={{ opacity: 0, y: 12 }}
          transition={REVEAL.primary}
          className="text-center text-[10px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/40 mb-10"
        >
          {tx.channels_label}
        </motion.p>

        {/* Constrained logo rail */}
        <motion.div
          animate={{ opacity: inView ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.15 }}
          className="relative max-w-2xl mx-auto overflow-hidden"
        >
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%)" }} />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)" }} />

          <div className="flex">
            <div
              className="flex items-center gap-10"
              style={{
                animation: "channels-marquee 36s linear infinite",
                width: "max-content",
              }}
            >
              {ALL.map((channel, i) => (
                <Pill key={i} channel={channel} />
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      <style>{`
        @keyframes channels-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  );
}