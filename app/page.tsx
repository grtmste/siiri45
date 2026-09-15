"use client";

import IntroHero from "./components/IntroHero";
import InviteSection from "./components/InviteSection";
import RsvpSection from "./components/RsvpSection";
import Footer from "./components/Footer";

export default function Home() {
  function handleContinue() {
    document
      .getElementById("invite")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="relative">
      <IntroHero onContinue={handleContinue} />
      <InviteSection />
      <RsvpSection />
      <Footer />
    </main>
  );
}
