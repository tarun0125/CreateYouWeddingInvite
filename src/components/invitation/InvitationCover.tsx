"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { weddingConfig } from "@/config/wedding";

interface InvitationCoverProps {
  onOpen: () => void;
}

export default function InvitationCover({ onOpen }: InvitationCoverProps) {
  const shouldReduceMotion = useReducedMotion();

  const floatVariants: Variants = {
    rest: { y: 0 },
    float: shouldReduceMotion
      ? { y: 0 }
      : { y: [0, -10, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const } },
  };

  return (
    <motion.div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--color-burgundy)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient background texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C7A45D' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Floating particles — client-only to avoid hydration mismatch */}
      {!shouldReduceMotion && <ParticleField />}

      {/* Main invitation card container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center">
        {/* Outer ornamental border */}
        <div
          className="relative w-full rounded-sm p-1"
          style={{ background: "linear-gradient(135deg, var(--color-gold), #8B6914, var(--color-gold))" }}
        >
          {/* Inner card */}
          <div
            className="relative w-full rounded-sm py-10 px-6 flex flex-col items-center"
            style={{ background: "var(--color-ivory)" }}
          >
            <CornerOrnament position="top-left" />
            <CornerOrnament position="top-right" />
            <CornerOrnament position="bottom-left" />
            <CornerOrnament position="bottom-right" />

            {/* Royal emblem */}
            <motion.div className="mb-4" variants={floatVariants} initial="rest" animate="float">
              <RoyalEmblem size={72} />
            </motion.div>

            <GoldDivider />

            <motion.h1
              className="font-serif text-2xl sm:text-3xl text-center mt-4 mb-1 tracking-widest uppercase"
              style={{ color: "var(--color-maroon)", fontFamily: "var(--font-cormorant)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              A Royal Invitation
            </motion.h1>

            <motion.p
              className="text-xs sm:text-sm text-center tracking-widest mb-6"
              style={{ color: "var(--color-gold)", fontFamily: "var(--font-cormorant)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              A new chapter, a timeless promise
            </motion.p>

            <GoldDivider />

            {/* Envelope illustration */}
            <motion.div className="relative my-8 w-full flex justify-center" variants={floatVariants} initial="rest" animate="float">
              <EnvelopeIllustration />
            </motion.div>

            {/* CTA Button */}
            <motion.button
              id="open-invitation-btn"
              onClick={onOpen}
              className="relative group mt-2 px-10 py-4 text-sm tracking-[0.3em] uppercase font-semibold overflow-hidden rounded-sm cursor-pointer transition-all duration-300"
              style={{
                background: "var(--color-maroon)",
                color: "var(--color-gold)",
                border: "1px solid var(--color-gold)",
                fontFamily: "var(--font-cormorant)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              aria-label="Open your royal wedding invitation"
            >
              <span className="relative z-10">Open Your Invitation</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #7A2640, #541D2B)" }}
              />
            </motion.button>

            {/* Names teaser */}
            <motion.p
              className="mt-6 text-xs text-center tracking-[0.2em] uppercase"
              style={{ color: "var(--color-maroon)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              {weddingConfig.groomName} &amp; {weddingConfig.brideName}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Particle field — generated client-side only ──────────────────────────────

interface Particle {
  id: number;
  size: number;
  left: number;
  top: number;
  yEnd: number;
  duration: number;
  delay: number;
}

function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        size: Math.random() * 6 + 3,
        left: Math.random() * 100,
        top: Math.random() * 100,
        yEnd: -30 - Math.random() * 50,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <>
      {particles.map(({ id, size, left, top, yEnd, duration, delay }) => (
        <motion.div
          key={id}
          className="absolute rounded-full pointer-events-none"
          style={{ width: size, height: size, background: "var(--color-gold)", left: `${left}%`, top: `${top}%` }}
          animate={{ y: [0, yEnd, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

// ─── Static sub-components ────────────────────────────────────────────────────

function CornerOrnament({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const transforms: Record<string, string> = {
    "top-left": "rotate(0deg)", "top-right": "rotate(90deg)", "bottom-right": "rotate(180deg)", "bottom-left": "rotate(270deg)",
  };
  const positions: Record<string, string> = {
    "top-left": "top-2 left-2", "top-right": "top-2 right-2", "bottom-right": "bottom-2 right-2", "bottom-left": "bottom-2 left-2",
  };
  return (
    <div className={`absolute ${positions[position]} w-8 h-8 pointer-events-none`}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: transforms[position] }}>
        <path d="M2 2 L2 14 M2 2 L14 2" stroke="#C7A45D" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="2" cy="2" r="1.5" fill="#C7A45D" />
        <path d="M6 2 Q8 6 2 8" stroke="#C7A45D" strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-2 w-full max-w-xs my-1">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, var(--color-gold))" }} />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1 L9.5 6 L14 7 L10.5 11 L11 15 L8 13 L5 15 L5.5 11 L2 7 L6.5 6 Z" fill="#C7A45D" opacity="0.8" />
      </svg>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, var(--color-gold))" }} />
    </div>
  );
}

function RoyalEmblem({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="#C7A45D" strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx="50" cy="50" r="40" stroke="#C7A45D" strokeWidth="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse key={angle} cx="50" cy="50" rx="6" ry="18" fill="#C7A45D" opacity="0.6"
          transform={`rotate(${angle} 50 50) translate(0 -22)`} />
      ))}
      <circle cx="50" cy="50" r="18" fill="#541D2B" stroke="#C7A45D" strokeWidth="1" />
      <path d="M38 55 L38 47 L42 51 L50 43 L58 51 L62 47 L62 55 Z" fill="#C7A45D" />
      <rect x="37" y="55" width="26" height="3" rx="1" fill="#C7A45D" />
      <circle cx="50" cy="50" r="2" fill="#F5E9D2" />
      <circle cx="44" cy="52" r="1" fill="#C7A45D" />
      <circle cx="56" cy="52" r="1" fill="#C7A45D" />
    </svg>
  );
}

function EnvelopeIllustration() {
  return (
    <div className="relative w-64 h-44 sm:w-72 sm:h-52">
      <svg viewBox="0 0 288 208" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
        <rect x="8" y="40" width="272" height="160" rx="4" fill="#F5E9D2" stroke="#C7A45D" strokeWidth="2" />
        <path d="M8 40 L144 120 L280 40 Z" fill="#E9D7B5" stroke="#C7A45D" strokeWidth="1.5" />
        <path d="M8 200 L120 120" stroke="#C7A45D" strokeWidth="1" opacity="0.5" />
        <path d="M280 200 L168 120" stroke="#C7A45D" strokeWidth="1" opacity="0.5" />
        <circle cx="144" cy="128" r="28" fill="#541D2B" />
        <circle cx="144" cy="128" r="24" stroke="#C7A45D" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M133 132 L133 124 L137 128 L144 120 L151 128 L155 124 L155 132 Z" fill="#C7A45D" />
        <rect x="132" y="132" width="24" height="2.5" rx="1" fill="#C7A45D" />
        <rect x="14" y="46" width="260" height="148" rx="2" stroke="#C7A45D" strokeWidth="0.5" strokeDasharray="6 4" />
        <text x="20" y="70" fontSize="12" fill="#C7A45D" opacity="0.6">✿</text>
        <text x="256" y="70" fontSize="12" fill="#C7A45D" opacity="0.6">✿</text>
        <text x="20" y="192" fontSize="12" fill="#C7A45D" opacity="0.6">✿</text>
        <text x="256" y="192" fontSize="12" fill="#C7A45D" opacity="0.6">✿</text>
      </svg>
    </div>
  );
}
