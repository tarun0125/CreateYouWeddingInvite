"use client";

import { motion, useReducedMotion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { weddingConfig } from "@/config/wedding";

export default function FinalInvitation() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: shouldReduceMotion ? 0.1 : 0.9, ease: "easeOut" },
    },
  });

  return (
    <section
      id="final-invitation"
      ref={ref}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 overflow-hidden"
      style={{ background: "var(--color-ivory)" }}
      aria-label="Final wedding invitation card"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C7A45D' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='80' cy='0' r='2'/%3E%3Ccircle cx='0' cy='80' r='2'/%3E%3Ccircle cx='80' cy='80' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20" style={{ background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20" style={{ background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)" }} />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-lg mx-auto">
        <div className="relative p-1 rounded-sm" style={{ background: "linear-gradient(135deg, var(--color-gold), #8B6914 40%, var(--color-gold))" }}>
          <div className="relative rounded-sm px-6 sm:px-10 py-10 sm:py-14 flex flex-col items-center" style={{ background: "var(--color-ivory)" }}>
            {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((pos) => (
              <CardCorner key={pos} position={pos} />
            ))}
            <div className="absolute inset-4 border pointer-events-none" style={{ borderColor: "rgba(199,164,93,0.3)" }} />

            <motion.div variants={fadeUp(0.2)} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mb-4">
              <RoyalCrest />
            </motion.div>

            <motion.div variants={fadeUp(0.4)} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <SectionDivider />
            </motion.div>

            <motion.p variants={fadeUp(0.6)} initial="hidden" animate={isInView ? "visible" : "hidden"}
              className="mt-5 text-xs tracking-[0.25em] uppercase text-center"
              style={{ color: "var(--color-gold)" }}>
              With the blessings of our elders
            </motion.p>

            <motion.p variants={fadeUp(0.8)} initial="hidden" animate={isInView ? "visible" : "hidden"}
              className="mt-4 text-center text-sm sm:text-base leading-relaxed max-w-xs"
              style={{ color: "var(--color-maroon)", fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.05rem" }}>
              &ldquo;{weddingConfig.invitationMessage}&rdquo;
            </motion.p>

            <motion.div variants={fadeUp(1.0)} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mt-6">
              <SectionDivider />
            </motion.div>

            {/* Couple names */}
            <motion.div variants={fadeUp(1.2)} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mt-6 text-center">
              <h2 className="text-4xl sm:text-5xl leading-tight" style={{ fontFamily: "var(--font-cormorant)", color: "var(--color-maroon)" }}>
                {weddingConfig.groomName}
              </h2>
              <div className="my-2 flex items-center justify-center gap-3">
                <div className="h-px w-12" style={{ background: "var(--color-gold)" }} />
                <span className="text-2xl" style={{ color: "var(--color-gold)", fontFamily: "var(--font-cormorant)" }}>&amp;</span>
                <div className="h-px w-12" style={{ background: "var(--color-gold)" }} />
              </div>
              <h2 className="text-4xl sm:text-5xl leading-tight" style={{ fontFamily: "var(--font-cormorant)", color: "var(--color-maroon)" }}>
                {weddingConfig.brideName}
              </h2>
            </motion.div>

            <motion.div variants={fadeUp(1.4)} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mt-6">
              <SectionDivider />
            </motion.div>

            {/* Wedding details */}
            <motion.div variants={fadeUp(1.6)} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mt-6 w-full text-center space-y-5">
              <div>
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-gold)" }}>Wedding Ceremony</p>
                <p className="text-xl sm:text-2xl" style={{ fontFamily: "var(--font-cormorant)", color: "var(--color-maroon)" }}>
                  {weddingConfig.weddingDay}, {weddingConfig.weddingDate}
                </p>
                <p className="text-sm mt-0.5" style={{ color: "rgba(84,29,43,0.7)" }}>{weddingConfig.weddingTime}</p>
              </div>
              <div className="flex justify-center">
                <div className="h-px w-32" style={{ background: "linear-gradient(to right, transparent, var(--color-gold), transparent)" }} />
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-gold)" }}>Venue</p>
                <p className="text-xl sm:text-2xl" style={{ fontFamily: "var(--font-cormorant)", color: "var(--color-maroon)" }}>
                  {weddingConfig.venueName}
                </p>
                <p className="text-sm mt-0.5 leading-relaxed" style={{ color: "rgba(84,29,43,0.7)" }}>{weddingConfig.venueAddress}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp(1.8)} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mt-6">
              <SectionDivider />
            </motion.div>

            <motion.p variants={fadeUp(2.0)} initial="hidden" animate={isInView ? "visible" : "hidden"}
              className="mt-5 text-xs sm:text-sm text-center leading-relaxed"
              style={{ color: "rgba(84,29,43,0.7)", maxWidth: "280px" }}>
              {weddingConfig.familyMessage}
            </motion.p>

            <motion.div variants={fadeUp(2.2)} initial="hidden" animate={isInView ? "visible" : "hidden"}
              className="mt-4 flex flex-col sm:flex-row items-center gap-1 sm:gap-6 text-center">
              <p className="text-sm" style={{ fontFamily: "var(--font-cormorant)", color: "var(--color-maroon)", fontStyle: "italic" }}>{weddingConfig.groomFamily}</p>
              <span className="text-sm" style={{ color: "var(--color-gold)" }}>&amp;</span>
              <p className="text-sm" style={{ fontFamily: "var(--font-cormorant)", color: "var(--color-maroon)", fontStyle: "italic" }}>{weddingConfig.brideFamily}</p>
            </motion.div>

            <motion.div variants={fadeUp(2.4)} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mt-8">
              <FinalFlourish />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.p variants={fadeUp(2.8)} initial="hidden" animate={isInView ? "visible" : "hidden"}
        className="relative z-10 mt-8 text-xs text-center tracking-widest"
        style={{ color: "rgba(84,29,43,0.4)" }}>
        Made with love ♥
      </motion.p>
    </section>
  );
}

function CardCorner({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const transforms: Record<string, string> = { "top-left": "rotate(0deg)", "top-right": "rotate(90deg)", "bottom-right": "rotate(180deg)", "bottom-left": "rotate(270deg)" };
  const positions: Record<string, string> = { "top-left": "top-3 left-3", "top-right": "top-3 right-3", "bottom-right": "bottom-3 right-3", "bottom-left": "bottom-3 left-3" };
  return (
    <div className={`absolute ${positions[position]} w-10 h-10 pointer-events-none`}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: transforms[position] }}>
        <path d="M4 4 L4 18 M4 4 L18 4" stroke="#C7A45D" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 4 Q12 8 4 12" stroke="#C7A45D" strokeWidth="0.8" fill="none" />
        <circle cx="4" cy="4" r="2" fill="#C7A45D" />
      </svg>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center gap-2 w-full max-w-xs">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, var(--color-gold))" }} />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2 Q14 6 10 10 Q6 14 10 18" stroke="#C7A45D" strokeWidth="1" fill="none" />
        <circle cx="10" cy="2" r="1.5" fill="#C7A45D" />
        <circle cx="10" cy="18" r="1.5" fill="#C7A45D" />
      </svg>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, var(--color-gold))" }} />
    </div>
  );
}

function RoyalCrest() {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="#C7A45D" strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx="50" cy="50" r="40" stroke="#C7A45D" strokeWidth="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse key={angle} cx="50" cy="50" rx="6" ry="18" fill="#C7A45D" opacity="0.5" transform={`rotate(${angle} 50 50) translate(0 -22)`} />
      ))}
      <circle cx="50" cy="50" r="20" fill="#541D2B" stroke="#C7A45D" strokeWidth="1.5" />
      <path d="M37 56 L37 46 L42 51 L50 42 L58 51 L63 46 L63 56 Z" fill="#C7A45D" />
      <rect x="36" y="56" width="28" height="3" rx="1" fill="#C7A45D" />
      <circle cx="50" cy="51" r="2.5" fill="#F5E9D2" />
    </svg>
  );
}

function FinalFlourish() {
  return (
    <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20 Q50 5 100 20 Q150 35 190 20" stroke="#C7A45D" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M10 20 Q50 35 100 20 Q150 5 190 20" stroke="#C7A45D" strokeWidth="0.5" fill="none" opacity="0.3" />
      {[20, 50, 100, 150, 180].map((x, i) => (<circle key={i} cx={x} cy="20" r="2" fill="#C7A45D" opacity="0.6" />))}
      <circle cx="100" cy="20" r="4" fill="#C7A45D" opacity="0.8" />
    </svg>
  );
}
