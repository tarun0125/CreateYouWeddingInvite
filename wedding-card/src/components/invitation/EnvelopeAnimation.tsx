"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface EnvelopeAnimationProps {
  onComplete: () => void;
}

export default function EnvelopeAnimation({ onComplete }: EnvelopeAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"seal-break" | "flap-open" | "glow" | "done">("seal-break");

  useEffect(() => {
    if (shouldReduceMotion) {
      // Skip straight through for reduced-motion
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }

    const timings = [
      { phase: "flap-open" as const, delay: 800 },
      { phase: "glow" as const, delay: 1800 },
      { phase: "done" as const, delay: 3000 },
    ];

    const timeouts = timings.map(({ phase, delay }) =>
      setTimeout(() => setPhase(phase), delay)
    );

    const completeTimeout = setTimeout(onComplete, 3400);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: "var(--color-burgundy)" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "var(--color-burgundy)" }}
    >
      {/* Background ambient */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--color-gold) 0%, transparent 70%)" }} />

      {/* Golden glow that expands */}
      <AnimatePresence>
        {phase === "glow" || phase === "done" ? (
          <motion.div
            className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(199,164,93,0.4) 0%, transparent 70%)" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 2 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        ) : null}
      </AnimatePresence>

      {/* Envelope container */}
      <div className="relative w-72 h-64 sm:w-96 sm:h-80 flex items-center justify-center">
        <EnvelopeSVG phase={phase} />
      </div>

      {/* Particle burst on seal break */}
      <AnimatePresence>
        {(phase === "flap-open" || phase === "glow") && (
          <>
            {[...Array(16)].map((_, i) => {
              const angle = (i / 16) * 360;
              const dist = 60 + Math.random() * 80;
              const rad = (angle * Math.PI) / 180;
              const tx = Math.cos(rad) * dist;
              const ty = Math.sin(rad) * dist;
              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: 4 + Math.random() * 4,
                    height: 4 + Math.random() * 4,
                    background: "var(--color-gold)",
                    top: "50%",
                    left: "50%",
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: tx, y: ty, opacity: 0, scale: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Fade out overlay */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            className="absolute inset-0"
            style={{ background: "var(--color-ivory)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Envelope SVG with animated flap ─────────────────────────────────────────

function EnvelopeSVG({ phase }: { phase: string }) {
  return (
    <svg viewBox="0 0 288 208" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      {/* Envelope body */}
      <rect x="8" y="40" width="272" height="160" rx="4" fill="#F5E9D2" stroke="#C7A45D" strokeWidth="2" />
      <rect x="14" y="46" width="260" height="148" rx="2" stroke="#C7A45D" strokeWidth="0.5" strokeDasharray="6 4" />

      {/* Bottom envelope fold lines */}
      <path d="M8 200 L120 120" stroke="#C7A45D" strokeWidth="1" opacity="0.5" />
      <path d="M280 200 L168 120" stroke="#C7A45D" strokeWidth="1" opacity="0.5" />

      {/* Gold interior glow (visible when open) */}
      {(phase === "flap-open" || phase === "glow" || phase === "done") && (
        <motion.rect
          x="8" y="40" width="272" height="160" rx="4"
          fill="url(#goldGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8 }}
        />
      )}

      <defs>
        <linearGradient id="goldGlow" x1="144" y1="40" x2="144" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#C7A45D" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Animated envelope flap */}
      <motion.path
        d="M8 40 L144 120 L280 40 Z"
        fill="#E9D7B5"
        stroke="#C7A45D"
        strokeWidth="1.5"
        initial={{ rotateX: 0, originX: "50%", originY: "0%" }}
        animate={
          phase === "flap-open" || phase === "glow" || phase === "done"
            ? { rotateX: -150, scaleY: -1 }
            : { rotateX: 0 }
        }
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: "144px 40px" }}
      />

      {/* Wax seal */}
      <motion.g
        animate={
          phase === "seal-break"
            ? { scale: [1, 1.08, 0.95, 1], rotate: [0, -3, 3, 0] }
            : phase === "flap-open" || phase === "glow" || phase === "done"
            ? { scale: 0, opacity: 0 }
            : {}
        }
        transition={
          phase === "seal-break"
            ? { duration: 0.6, times: [0, 0.2, 0.6, 1] }
            : { duration: 0.3 }
        }
        style={{ transformOrigin: "144px 128px" }}
      >
        <circle cx="144" cy="128" r="28" fill="#541D2B" />
        <circle cx="144" cy="128" r="24" stroke="#C7A45D" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Crown */}
        <path d="M133 132 L133 124 L137 128 L144 120 L151 128 L155 124 L155 132 Z" fill="#C7A45D" />
        <rect x="132" y="132" width="24" height="2.5" rx="1" fill="#C7A45D" />
        {/* Seal crack lines appear on seal-break */}
        {phase !== "seal-break" ? null : (
          <>
            <line x1="144" y1="100" x2="148" y2="128" stroke="#F5E9D2" strokeWidth="0.8" opacity="0.5" />
            <line x1="130" y1="115" x2="158" y2="141" stroke="#F5E9D2" strokeWidth="0.8" opacity="0.5" />
          </>
        )}
      </motion.g>

      {/* Corner florals */}
      <text x="20" y="70" fontSize="12" fill="#C7A45D" opacity="0.6">✿</text>
      <text x="256" y="70" fontSize="12" fill="#C7A45D" opacity="0.6">✿</text>
      <text x="20" y="192" fontSize="12" fill="#C7A45D" opacity="0.6">✿</text>
      <text x="256" y="192" fontSize="12" fill="#C7A45D" opacity="0.6">✿</text>
    </svg>
  );
}
