"use client";

import { AnimatePresence, motion } from "framer-motion";
import HeroImage from "./HeroImage";

// Full-screen intro. The hero image fades + gently scales in; ~1s later the
// gold "Jätka" button slides up. Clicking it dismisses the overlay so the guest
// can scroll the page freely.
export default function IntroOverlay({
  show,
  onContinue,
}: {
  show: boolean;
  onContinue: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="app-backdrop fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto px-6 py-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroImage />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 2.2 }}
            className="mt-8"
          >
            <button
              type="button"
              onClick={onContinue}
              className="btn-gold shadow-glow"
            >
              Jätka
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
