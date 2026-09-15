"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

type Attending = "yes" | "no" | null;

export default function RsvpSection() {
  const [attending, setAttending] = useState<Attending>(null);
  const [name, setName] = useState("");
  const [plusOne, setPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<null | { attending: boolean; name: string }>(
    null
  );

  const canSubmit = name.trim().length > 0 && attending !== null && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (attending === null || name.trim().length === 0) return;

    setSubmitting(true);
    setError(null);

    const isAttending = attending === "yes";
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          attending: isAttending,
          plusOne: isAttending ? plusOne : false,
          plusOneName: isAttending && plusOne ? plusOneName.trim() : "",
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setDone({ attending: isAttending, name: name.trim() });
    } catch {
      setError("Midagi läks valesti, proovi uuesti.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="rsvp"
      className="relative z-10 mx-auto w-full max-w-xl px-6 py-24 sm:py-28"
    >
      <Reveal>
        <h2 className="text-center font-display text-4xl tracking-wide text-gold-bright sm:text-5xl">
          Kas tuled?
        </h2>
        <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <div className="card rounded-2xl p-7 sm:p-10">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="py-6 text-center"
              >
                <p className="font-body text-2xl leading-relaxed text-cream sm:text-3xl">
                  {done.attending
                    ? `Aitäh, ${done.name}! Rõõm on suur — näeme peol. 🥂`
                    : "Aitäh vastuse eest. Kahju, et seekord ei saa — jääd puudu ühest ilusast õhtust."}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                {/* Attending choice */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <ChoiceButton
                    selected={attending === "yes"}
                    onClick={() => setAttending("yes")}
                    label="Jah, tulen"
                  />
                  <ChoiceButton
                    selected={attending === "no"}
                    onClick={() => setAttending("no")}
                    label="Kahjuks ei saa"
                  />
                </div>

                {/* Name (always shown, required) */}
                <div>
                  <label htmlFor="rsvp-name" className="field-label">
                    Sinu nimi
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="field-input"
                    autoComplete="name"
                  />
                </div>

                {/* +1 options, only when attending */}
                <AnimatePresence initial={false}>
                  {attending === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 pt-1">
                        <label className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            checked={plusOne}
                            onChange={(e) => setPlusOne(e.target.checked)}
                            className="h-5 w-5 shrink-0 accent-gold"
                          />
                          <span className="font-body text-lg text-cream/90">
                            Võtan kaaslase (+1) kaasa
                          </span>
                        </label>

                        <AnimatePresence initial={false}>
                          {plusOne && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <label
                                htmlFor="plus-one-name"
                                className="field-label"
                              >
                                Kaaslase nimi (valikuline)
                              </label>
                              <input
                                id="plus-one-name"
                                type="text"
                                value={plusOneName}
                                onChange={(e) => setPlusOneName(e.target.value)}
                                className="field-input"
                                autoComplete="off"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && (
                  <p
                    role="alert"
                    className="font-body text-lg text-rose/90"
                    style={{ color: "#E7B4A0" }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn-gold w-full"
                >
                  {submitting ? "Saadan…" : "Kinnita vastus"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

function ChoiceButton({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-6 py-3 font-body text-lg tracking-wide transition-all duration-300 ${
        selected
          ? "border-gold-bright bg-gold/20 text-cream shadow-glow"
          : "border-gold/40 bg-transparent text-cream/80 hover:border-gold-bright/70 hover:bg-gold/10"
      }`}
    >
      {label}
    </button>
  );
}
