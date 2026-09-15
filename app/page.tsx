"use client";

import { useEffect, useState } from "react";
import IntroOverlay from "./components/IntroOverlay";
import InviteSection from "./components/InviteSection";
import RsvpSection from "./components/RsvpSection";
import Footer from "./components/Footer";

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);

  // Lock body scroll while the intro overlay is up.
  useEffect(() => {
    document.body.style.overflow = introVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introVisible]);

  function handleContinue() {
    setIntroVisible(false);
    // After the overlay fades, glide to the invite section.
    window.setTimeout(() => {
      document
        .getElementById("invite")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  }

  return (
    <>
      <IntroOverlay show={introVisible} onContinue={handleContinue} />
      <main className="relative">
        <InviteSection />
        <RsvpSection />
        <Footer />
      </main>
    </>
  );
}
