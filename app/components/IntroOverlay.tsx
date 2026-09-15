"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import HeroImage from "./HeroImage";

// Downward double chevron (lucide "ChevronsDown" shape), inline to avoid an
// extra dependency. The gentle bob + opacity pulse lives in the `animate-bob`
// CSS class so it also respects prefers-reduced-motion.
function ChevronsDown() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m7 6 5 5 5-5" />
      <path d="m7 13 5 5 5-5" />
    </svg>
  );
}

// Full-screen intro. The hero image blurs + scales + fades in; a one-time gold
// shine sweeps across it; then "JÄTKA" fades in with an expanding tracking and
// a bobbing chevron invites the guest onward.
export default function IntroOverlay({
  show,
  onContinue,
}: {
  show: boolean;
  onContinue: () => void;
}) {
  const reduce = useReducedMotion();

  const imageInitial = reduce
    ? { opacity: 0 }
    : { opacity: 0, scale: 1.06, filter: "blur(16px)" };
  const imageAnimate = reduce
    ? { opacity: 1 }
    : { opacity: 1, scale: 1, filter: "blur(0px)" };

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
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl">
            <motion.div
              initial={imageInitial}
              animate={imageAnimate}
              transition={{ duration: 1.4, ease: "easeOut" }}
            >
              <HeroImage />
            </motion.div>

            {/* One-time diagonal gold shine passing across the image. */}
            {!reduce && (
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 35%, rgba(231,200,116,0.35) 50%, transparent 65%)",
                  mixBlendMode: "screen",
                }}
                initial={{ x: "-140%" }}
                animate={{ x: "140%" }}
                transition={{ duration: 1.1, ease: "easeInOut", delay: 1.5 }}
              />
            )}
          </div>

          <motion.button
            type="button"
            onClick={onContinue}
            aria-label="Jätka"
            className="group mt-8 flex flex-col items-center outline-none"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: reduce ? 0.3 : 2.3 }}
          >
            <motion.span
              className="font-display text-2xl uppercase text-gold transition-colors duration-300 group-hover:text-gold-bright"
              initial={{ letterSpacing: reduce ? "0.4em" : "0.12em" }}
              animate={{ letterSpacing: "0.4em" }}
              whileHover={{ letterSpacing: "0.52em" }}
              transition={{ duration: 1, ease: "easeOut", delay: reduce ? 0.3 : 2.3 }}
            >
              Jätka
            </motion.span>
            <span className="animate-bob mt-3 text-gold transition-colors duration-300 group-hover:text-gold-bright">
              <ChevronsDown />
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
