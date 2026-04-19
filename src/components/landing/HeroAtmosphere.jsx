import React, { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Cinematic atmospheric background.
 * No stacked blurred circles. Composed of:
 *  - SVG turbulence-warped bloom masses (irregular, non-circular)
 *  - Volumetric light shafts (soft beams through haze)
 *  - Drifting haze / fog layers
 *  - Floating dust particles
 *  - Dense, randomised film grain
 *  - Vignette + falloff
 */

// ── Film grain canvas — randomised noise ──
function FilmGrain({ opacity = 0.12 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const imageData = ctx.createImageData(W, H);
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      // Clustered grain — mostly mid values with occasional bright/dark specks
      const r = Math.random();
      const v = r < 0.02 ? 255 : r > 0.98 ? 0 : 128 + (Math.random() - 0.5) * 60;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = Math.random() * 70;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={380}
      height={380}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        opacity,
        mixBlendMode: "overlay",
        backgroundSize: "380px 380px",
        zIndex: 8,
      }}
    />
  );
}

// ── SVG turbulence filter — warps the bloom into non-circular, organic shapes ──
function TurbulenceDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0 }}
      aria-hidden="true"
    >
      <defs>
        {/* Heavy warp for the main bloom — breaks circular look */}
        <filter id="cinematic-warp" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="120"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="40" />
        </filter>

        {/* Softer warp for outer haze — wispy, fog-like */}
        <filter id="haze-warp" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.004 0.006"
            numOctaves="3"
            seed="14"
            result="haze"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="haze"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="60" />
        </filter>

        {/* Inner bloom — slight irregularity, keeps warmth concentrated */}
        <filter id="inner-bloom" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.018"
            numOctaves="2"
            seed="3"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="35"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="18" />
        </filter>

        {/* Radial gradients used as SVG fills (warped) */}
        <radialGradient id="bloom-warm" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(42, 100%, 82%)" stopOpacity="0.55" />
          <stop offset="25%" stopColor="hsl(36, 90%, 68%)" stopOpacity="0.32" />
          <stop offset="55%" stopColor="hsl(28, 70%, 44%)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="hsl(20, 40%, 20%)" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="bloom-outer" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(38, 80%, 58%)" stopOpacity="0.18" />
          <stop offset="50%" stopColor="hsl(30, 50%, 30%)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="hsl(220, 30%, 5%)" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="bloom-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(48, 100%, 92%)" stopOpacity="0.38" />
          <stop offset="40%" stopColor="hsl(38, 95%, 70%)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="hsl(28, 60%, 35%)" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// ── Warped atmospheric bloom layers (SVG) ──
function WarpedBloom() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    >
      {/* Outer wispy haze — very slow drift */}
      <motion.svg
        className="absolute left-1/2 top-1/2"
        width="1800"
        height="1400"
        viewBox="0 0 1800 1400"
        style={{ transform: "translate(-50%, -50%)" }}
        animate={{ x: ["-52%", "-48%", "-52%"], y: ["-50%", "-52%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse
          cx="900"
          cy="700"
          rx="700"
          ry="480"
          fill="url(#bloom-outer)"
          filter="url(#haze-warp)"
          opacity="0.85"
        />
      </motion.svg>

      {/* Mid warm bloom — the main cinematic glow mass */}
      <motion.svg
        className="absolute left-1/2 top-1/2"
        width="1400"
        height="1100"
        viewBox="0 0 1400 1100"
        style={{ transform: "translate(-50%, -50%)" }}
        animate={{ opacity: [0.82, 1, 0.82], scale: [1, 1.015, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse
          cx="700"
          cy="550"
          rx="440"
          ry="360"
          fill="url(#bloom-warm)"
          filter="url(#cinematic-warp)"
        />
      </motion.svg>

      {/* Inner concentrated warmth — the heart of the light */}
      <motion.svg
        className="absolute left-1/2 top-1/2"
        width="900"
        height="700"
        viewBox="0 0 900 700"
        style={{ transform: "translate(-50%, -50%)" }}
        animate={{ opacity: [0.9, 1, 0.9], scale: [1, 1.008, 1] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <ellipse
          cx="450"
          cy="350"
          rx="260"
          ry="220"
          fill="url(#bloom-core)"
          filter="url(#inner-bloom)"
        />
      </motion.svg>

      {/* Off-center asymmetric warm patch — breaks symmetry */}
      <motion.svg
        className="absolute top-1/2"
        width="900"
        height="700"
        viewBox="0 0 900 700"
        style={{ left: "58%", transform: "translate(-50%, -50%)" }}
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <ellipse
          cx="450"
          cy="350"
          rx="220"
          ry="180"
          fill="url(#bloom-warm)"
          filter="url(#haze-warp)"
          opacity="0.6"
        />
      </motion.svg>
    </div>
  );
}

// ── Volumetric light shafts — soft vertical beams through atmosphere ──
function LightShafts() {
  const shafts = useMemo(
    () => [
      { x: 38, rot: -8, w: 180, delay: 0, dur: 14, op: 0.06 },
      { x: 50, rot: 2, w: 240, delay: 1.2, dur: 17, op: 0.08 },
      { x: 62, rot: 10, w: 200, delay: 2.4, dur: 13, op: 0.05 },
      { x: 46, rot: -3, w: 140, delay: 3.1, dur: 19, op: 0.04 },
    ],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {shafts.map((s, i) => (
        <motion.div
          key={i}
          className="absolute top-[-20%] h-[140%]"
          style={{
            left: `${s.x}%`,
            width: s.w,
            transform: `translateX(-50%) rotate(${s.rot}deg)`,
            transformOrigin: "center",
            background: `linear-gradient(180deg,
              transparent 0%,
              hsla(40, 80%, 65%, ${s.op}) 30%,
              hsla(36, 70%, 55%, ${s.op * 0.7}) 55%,
              transparent 100%)`,
            filter: "blur(42px)",
            mixBlendMode: "screen",
          }}
          animate={{ opacity: [0.5, 1, 0.5], x: ["-50%", "-48%", "-50%"] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        />
      ))}
    </div>
  );
}

// ── Drifting haze overlay ──
function HazeLayer() {
  return (
    <>
      {/* SVG turbulence fog */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 3, mixBlendMode: "screen", opacity: 0.4 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="fog-texture">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="3"
              seed="22"
            />
            <feColorMatrix
              values="0 0 0 0 0.95
                      0 0 0 0 0.78
                      0 0 0 0 0.52
                      0 0 0 0.28 0"
            />
            <feGaussianBlur stdDeviation="25" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#fog-texture)" />
      </svg>

      {/* Slow horizontal drift haze */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            "radial-gradient(ellipse 80% 50% at 40% 55%, hsla(32, 60%, 50%, 0.06) 0%, transparent 60%)",
          mixBlendMode: "screen",
        }}
        animate={{ x: [-30, 30, -30] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

// ── Floating dust particles ──
function DustParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.8 + Math.random() * 1.8,
        dur: 18 + Math.random() * 22,
        delay: Math.random() * 10,
        op: 0.12 + Math.random() * 0.28,
        drift: (Math.random() - 0.5) * 60,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 4 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "hsl(42, 80%, 82%)",
            boxShadow: `0 0 ${p.size * 3}px hsla(40, 80%, 70%, 0.5)`,
            opacity: p.op,
          }}
          animate={{
            y: [0, -80 - p.drift, 0],
            x: [0, p.drift, 0],
            opacity: [p.op * 0.3, p.op, p.op * 0.3],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroAtmosphere() {
  return (
    <>
      <TurbulenceDefs />

      {/* Deep environment base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 110% 75% at 50% 52%, hsl(225, 24%, 10%) 0%, hsl(222, 26%, 5%) 55%, hsl(222, 28%, 3%) 100%)",
          zIndex: 0,
        }}
      />

      {/* Warm ambient underglow — huge, very diffuse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 55%, hsla(32, 70%, 35%, 0.14) 0%, transparent 65%)",
          zIndex: 0,
        }}
      />

      <WarpedBloom />
      <LightShafts />
      <HazeLayer />
      <DustParticles />

      {/* Subtle color-lift gradient — warms the center, cools the edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          background:
            "radial-gradient(ellipse 60% 45% at 50% 52%, hsla(38, 70%, 55%, 0.05) 0%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Edge vignette — strong falloff on corners */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 6,
          background:
            "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 45%, hsla(222, 28%, 3%, 0.55) 85%, hsla(222, 28%, 2%, 0.9) 100%)",
        }}
      />

      {/* Film grain — densest layer on top */}
      <FilmGrain opacity={0.14} />
    </>
  );
}