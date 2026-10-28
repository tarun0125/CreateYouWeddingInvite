"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic imports for code-splitting and client-only safety
const InvitationCover = dynamic(
  () => import("@/components/invitation/InvitationCover"),
  { ssr: false }
);
const EnvelopeAnimation = dynamic(
  () => import("@/components/invitation/EnvelopeAnimation"),
  { ssr: false }
);
const CinematicReveal = dynamic(
  () => import("@/components/invitation/CinematicReveal"),
  { ssr: false }
);
const FinalInvitation = dynamic(
  () => import("@/components/invitation/FinalInvitation"),
  { ssr: false }
);
const MusicToggle = dynamic(
  () => import("@/components/invitation/MusicToggle"),
  { ssr: false }
);

type Scene = "cover" | "opening" | "cinematic" | "final";

export default function InvitationPage() {
  const [scene, setScene] = useState<Scene>("cover");
  const [musicStarted, setMusicStarted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure hydration before rendering interactive components
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleOpenInvitation = useCallback(() => {
    setScene("opening");
    setMusicStarted(true);
  }, []);

  const handleOpeningComplete = useCallback(() => {
    setScene("cinematic");
  }, []);

  const handleSkipIntro = useCallback(() => {
    setScene("final");
    // Scroll to final section
    setTimeout(() => {
      const el = document.getElementById("final-invitation");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  if (!isHydrated) {
    // Loading placeholder while hydrating
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{ background: "var(--color-burgundy)" }}
        aria-busy="true"
        aria-label="Loading invitation"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="#C7A45D" strokeWidth="1.5" strokeDasharray="8 4" />
            <circle cx="24" cy="24" r="8" fill="#C7A45D" opacity="0.4" />
          </svg>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative">
      {/* Music toggle — always visible after interaction */}
      <MusicToggle shouldPlay={musicStarted} />

      {/* Scene A: Cover */}
      <AnimatePresence mode="wait">
        {scene === "cover" && (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InvitationCover onOpen={handleOpenInvitation} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene B: Envelope opening (overlay) */}
      <AnimatePresence>
        {scene === "opening" && (
          <EnvelopeAnimation onComplete={handleOpeningComplete} />
        )}
      </AnimatePresence>

      {/* Scenes C + E: Cinematic + Final (shown after opening) */}
      <AnimatePresence>
        {(scene === "cinematic" || scene === "final") && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Scene C: Cinematic reveal */}
            <CinematicReveal onSkip={handleSkipIntro} />

            {/* Scene E: Final invitation card */}
            <FinalInvitation />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
