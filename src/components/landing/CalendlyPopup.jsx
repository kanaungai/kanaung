import { useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/aungkaung855/kanaung-enquires";

export function openCalendly() {
  const calendly = window["Calendly"];
  if (calendly) {
    calendly.initPopupWidget({ url: CALENDLY_URL });
  }
}

export default function CalendlyPopup() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    // Load Calendly CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  return null;
}
