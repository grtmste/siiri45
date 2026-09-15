"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

// Staggered fade + slide-up: children animate in sequence as the group enters
// the viewport. Falls back to a simple fade when reduced motion is requested.
export function Stagger({
  children,
  className = "",
  amount = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: 0.05,
      },
    },
  };
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function Item({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

// Gold hairline that "draws in" horizontally (scaleX 0 → 1) as it appears.
// Works both inside a Stagger (as a variant child) and standalone.
export function GoldDivider({
  className = "",
  origin = "center",
}: {
  className?: string;
  origin?: "center" | "left";
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { scaleX: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    show: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div
      className={`hairline ${className}`}
      style={{ transformOrigin: origin }}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    />
  );
}
