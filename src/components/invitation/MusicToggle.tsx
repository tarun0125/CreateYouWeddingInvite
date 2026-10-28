"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/wedding";

interface MusicToggleProps {
  shouldPlay: boolean;
}

export default function MusicToggle({ shouldPlay }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Attempt to play once user has interacted
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !shouldPlay) return;

    const tryPlay = async () => {
      try {
        audio.volume = 0.35;
        await audio.play();
        setIsLoaded(true);
      } catch {
        // Silently fail if autoplay is blocked
      }
    };

    tryPlay();
  }, [shouldPlay]);

  const handleError = useCallback(() => {
    setAudioAvailable(false);
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  }, [isMuted]);

  // Don't render the toggle if audio is not available
  if (!audioAvailable && !isLoaded) return null;

  return (
    <>
      {/* Hidden audio element */}
      {audioAvailable && (
        <audio
          ref={audioRef}
          src={weddingConfig.mediaMusicPath}
          loop
          preload="none"
          onError={handleError}
          aria-hidden="true"
        />
      )}

      {/* Music toggle button */}
      <AnimatePresence>
        {shouldPlay && (
          <motion.button
            id="music-toggle-btn"
            onClick={toggleMute}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
            style={{
              background: "rgba(48,19,25,0.85)",
              border: "1px solid rgba(199,164,93,0.6)",
              backdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, borderColor: "rgba(199,164,93,1)" }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMuted ? "Unmute wedding music" : "Mute wedding music"}
            title={isMuted ? "Unmute music" : "Mute music"}
          >
            {!audioAvailable ? (
              // No audio available indicator
              <MusicOffIcon />
            ) : isMuted ? (
              <MuteIcon />
            ) : (
              <PlayingIcon />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function PlayingIcon() {
  return (
    <div className="flex items-end gap-0.5 h-5">
      {[1, 1.6, 1, 1.8, 1.2].map((h, i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full"
          style={{ background: "#C7A45D", height: `${h * 8}px` }}
          animate={{ scaleY: [1, h * 1.3, 0.7, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function MuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C7A45D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function MusicOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(199,164,93,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
    </svg>
  );
}
