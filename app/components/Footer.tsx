import Link from "next/link";
import { EVENT } from "@/lib/event-config";

export default function Footer() {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-2xl px-6 pb-10 pt-4 text-center">
      <div className="hairline mx-auto mb-6 w-16" />
      <p className="font-body text-sm tracking-wide text-cream/40">
        {EVENT.honoree} {EVENT.age}
      </p>
      <Link
        href="/admin"
        className="mt-2 inline-block font-body text-xs tracking-wide text-cream/25 transition-colors hover:text-gold/60"
      >
        Admin
      </Link>
    </footer>
  );
}
