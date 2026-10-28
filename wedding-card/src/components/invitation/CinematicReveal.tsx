"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";

interface CinematicRevealProps {
  onSkip: () => void;
}

export default function CinematicReveal({ onSkip }: CinematicRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => setVideoAvailable(false);
    const handleLoaded = () => setVideoLoaded(true);

    video.addEventListener("error", handleError);
    video.addEventListener("loadeddata", handleLoaded);

    return () => {
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadeddata", handleLoaded);
    };
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: shouldReduceMotion ? 0.1 : 1.2, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      aria-label="Cinematic wedding reveal"
    >
      {/* ── Video or fallback background ── */}
      {videoAvailable ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={weddingConfig.mediaVideoPath}
          poster={weddingConfig.mediaPosterPath}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          onError={() => setVideoAvailable(false)}
        />
      ) : (
        <FallbackBackground />
      )}

      {/* Overlay scrim for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(48,19,25,0.7) 0%, rgba(48,19,25,0.5) 50%, rgba(48,19,25,0.85) 100%)",
        }}
      />

      {/* Floating petals */}
      {!shouldReduceMotion && <FloatingPetals />}

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center px-4 py-16 text-center max-w-2xl mx-auto">

        {/* Royal emblem */}
        <motion.div
          custom={0.3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <CinematicEmblem />
        </motion.div>

        {/* Gold decorative line */}
        <motion.div custom={0.6} variants={textVariants} initial="hidden" animate="visible">
          <GoldRule />
        </motion.div>

        {/* Couple names */}
        <motion.h2
          custom={1.0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 text-4xl sm:text-5xl md:text-6xl leading-tight"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--color-ivory)",
            textShadow: "0 2px 20px rgba(199,164,93,0.6)",
          }}
        >
          {weddingConfig.groomName}
        </motion.h2>

        <motion.div
          custom={1.3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="my-2"
        >
          <span
            className="text-xl sm:text-2xl tracking-[0.3em] uppercase"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-cormorant)" }}
          >
            &amp;
          </span>
        </motion.div>

        <motion.h2
          custom={1.5}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl leading-tight"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--color-ivory)",
            textShadow: "0 2px 20px rgba(199,164,93,0.6)",
          }}
        >
          {weddingConfig.brideName}
        </motion.h2>

        <motion.div custom={1.8} variants={textVariants} initial="hidden" animate="visible" className="mt-6">
          <GoldRule />
        </motion.div>

        <motion.p
          custom={2.1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 text-sm sm:text-base tracking-widest uppercase"
          style={{ color: "var(--color-gold)", letterSpacing: "0.2em" }}
        >
          Together with their families
        </motion.p>

        <motion.p
          custom={2.4}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mt-2 text-base sm:text-lg max-w-md mx-auto leading-relaxed"
          style={{ color: "rgba(245,233,210,0.85)" }}
        >
          invite you to celebrate the beginning of their forever.
        </motion.p>

        {/* Date & Location */}
        <motion.div
          custom={2.8}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-8"
        >
          <div className="text-center">
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-gold)" }}>Date</p>
            <p className="text-lg sm:text-xl" style={{ color: "var(--color-ivory)", fontFamily: "var(--font-cormorant)" }}>
              {weddingConfig.weddingDate}
            </p>
          </div>
          <div className="hidden sm:block w-px h-10" style={{ background: "var(--color-gold)", opacity: 0.5 }} />
          <div className="text-center">
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-gold)" }}>Venue</p>
            <p className="text-lg sm:text-xl" style={{ color: "var(--color-ivory)", fontFamily: "var(--font-cormorant)" }}>
              {weddingConfig.venueName}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(245,233,210,0.6)" }}>
              {weddingConfig.venueCity}
            </p>
          </div>
        </motion.div>

        {/* Skip intro */}
        <motion.button
          id="skip-intro-btn"
          onClick={onSkip}
          custom={3.5}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 px-6 py-2 text-xs tracking-widest uppercase border transition-colors duration-300 cursor-pointer"
          style={{
            color: "rgba(245,233,210,0.6)",
            borderColor: "rgba(199,164,93,0.4)",
          }}
          whileHover={{ color: "#F5E9D2", borderColor: "#C7A45D" }}
          aria-label="Skip the cinematic intro"
        >
          Skip Intro ↓
        </motion.button>
      </div>
    </section>
  );
}

// ─── Fallback background (no video) ──────────────────────────────────────────

function FallbackBackground() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(199,164,93,0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(199,164,93,0.12) 0%, transparent 50%),
          linear-gradient(to bottom, #1a0a0f 0%, #301319 40%, #541D2B 100%)
        `,
      }}
      aria-hidden="true"
    >
      {/* Palace arch silhouette */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Main palace structure */}
        <rect x="580" y="100" width="280" height="300" fill="rgba(48,19,25,0.8)" />
        {/* Main arch */}
        <path d="M580 400 L580 220 Q720 120 860 220 L860 400 Z" fill="rgba(60,25,32,0.9)" />
        {/* Central dome */}
        <ellipse cx="720" cy="100" rx="80" ry="70" fill="rgba(48,19,25,0.9)" />
        {/* Side towers */}
        <rect x="460" y="180" width="120" height="220" fill="rgba(42,15,20,0.8)" />
        <path d="M460 200 Q520 140 580 200" fill="rgba(42,15,20,0.9)" />
        <rect x="860" y="180" width="120" height="220" fill="rgba(42,15,20,0.8)" />
        <path d="M860 200 Q920 140 980 200" fill="rgba(42,15,20,0.9)" />
        {/* Side domes */}
        <ellipse cx="520" cy="180" rx="50" ry="44" fill="rgba(35,12,17,0.9)" />
        <ellipse cx="920" cy="180" rx="50" ry="44" fill="rgba(35,12,17,0.9)" />
        {/* Lantern lights */}
        {[480, 560, 640, 720, 800, 880, 960].map((x, i) => (
          <circle key={i} cx={x} cy={220 + (i % 2 === 0 ? 0 : 20)} r="4" fill="#FFD700" opacity="0.8" />
        ))}
        {/* Reflection in water */}
        <rect x="0" y="340" width="1440" height="60" fill="rgba(15,5,8,0.6)" />
        {[480, 560, 640, 720, 800, 880, 960].map((x, i) => (
          <ellipse key={`r-${i}`} cx={x} cy={360} rx="3" ry="8" fill="#FFD700" opacity="0.3" />
        ))}
      </svg>

      {/* Golden lantern glow effects */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(255,200,80,0.08) 0%, transparent 60%)" }} />

      {/* Stars */}
      {[...Array(40)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            background: "white",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 40}%`,
            opacity: 0.3 + Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
}

// ─── Floating petals ──────────────────────────────────────────────────────────

function FloatingPetals() {
  return (
    <>
      {[...Array(14)].map((_, i) => {
        const startLeft = Math.random() * 100;
        const duration = 8 + Math.random() * 10;
        const delay = Math.random() * 8;
        const size = 8 + Math.random() * 12;
        return (
          <motion.div
            key={`petal-${i}`}
            className="absolute pointer-events-none"
            style={{ left: `${startLeft}%`, top: "-5%" }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, (Math.random() - 0.5) * 120],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              opacity: [0, 0.7, 0.5, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg width={size} height={size * 1.4} viewBox="0 0 20 28" fill="none">
              <ellipse cx="10" cy="14" rx="8" ry="12" fill="rgba(255,150,150,0.7)" />
              <ellipse cx="10" cy="14" rx="4" ry="8" fill="rgba(255,180,180,0.5)" />
            </svg>
          </motion.div>
        );
      })}
    </>
  );
}

// ─── Cinematic emblem ────────────────────────────────────────────────────────

function CinematicEmblem() {
  return (
    <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="#C7A45D" strokeWidth="1" strokeDasharray="4 2" opacity="0.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse key={angle} cx="50" cy="50" rx="5" ry="16" fill="#C7A45D" opacity="0.5"
          transform={`rotate(${angle} 50 50) translate(0 -24)`} />
      ))}
      <circle cx="50" cy="50" r="18" fill="#541D2B" stroke="#C7A45D" strokeWidth="1" />
      <path d="M38 55 L38 47 L42 51 L50 43 L58 51 L62 47 L62 55 Z" fill="#C7A45D" />
      <rect x="37" y="55" width="26" height="3" rx="1" fill="#C7A45D" />
      <circle cx="50" cy="50" r="2" fill="#F5E9D2" />
    </svg>
  );
}

function GoldRule() {
  return (
    <div className="flex items-center gap-3 w-64 sm:w-80">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #C7A45D)" }} />
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 0 L7 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z" fill="#C7A45D" opacity="0.8" />
      </svg>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #C7A45D)" }} />
    </div>
  );
}
