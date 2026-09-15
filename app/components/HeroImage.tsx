"use client";

import { useState } from "react";
import { EVENT } from "@/lib/event-config";

// Renders /hero.png. The host drops the real party photo (with the "SIIRI 45"
// sign) into public/hero.png. If the file is missing we degrade gracefully to a
// tasteful emerald/gold placeholder so nothing ever looks broken.
export default function HeroImage({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex aspect-[2/3] w-full items-center justify-center rounded-2xl border border-gold/40 bg-gradient-to-b from-emerald-light to-night shadow-glow ${className}`}
        role="img"
        aria-label={`${EVENT.honoree} ${EVENT.age}`}
      >
        <div className="text-center">
          <div className="font-display text-5xl tracking-[0.15em] text-gold-bright sm:text-6xl">
            {EVENT.honoree.toUpperCase()}
          </div>
          <div className="mt-2 font-display text-6xl tracking-[0.2em] text-gold sm:text-7xl">
            {EVENT.age}
          </div>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/hero.png"
      alt={`${EVENT.honoree} ${EVENT.age}`}
      onError={() => setFailed(true)}
      className={`w-full rounded-2xl border border-gold/30 object-cover shadow-glow-lg ${className}`}
    />
  );
}
