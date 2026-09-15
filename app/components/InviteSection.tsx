import { EVENT, googleMapsUrl, wazeUrl } from "@/lib/event-config";
import Reveal from "./Reveal";
import { CalendarIcon, MapPinIcon, NavigationIcon } from "./icons";

// The invitation card: date, location, invite text, and directions buttons.
// Every value comes from lib/event-config.ts.
export default function InviteSection() {
  return (
    <section
      id="invite"
      className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-20 sm:pt-28"
    >
      <Reveal className="text-center">
        <p className="font-body text-lg tracking-[0.35em] text-gold/80">
          KUTSE
        </p>
        <h1 className="mt-3 font-display text-5xl leading-tight tracking-wide text-gold-bright sm:text-6xl">
          {EVENT.honoree}
        </h1>
        <p className="mt-1 font-display text-2xl tracking-[0.3em] text-gold sm:text-3xl">
          {EVENT.age}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <div className="card rounded-2xl p-7 sm:p-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-3 text-cream">
              <CalendarIcon className="h-5 w-5 text-gold" />
              <span className="font-body text-xl sm:text-2xl">
                {EVENT.dateTime}
              </span>
            </div>

            <div className="hairline w-24" />

            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 font-display text-xl tracking-wide text-gold-bright sm:text-2xl">
                <MapPinIcon className="h-5 w-5 text-gold" />
                {EVENT.locationName}
              </div>
              <p className="font-body text-lg text-cream/80">{EVENT.address}</p>
            </div>

            <div className="hairline w-24" />

            <p className="max-w-xl font-body text-xl leading-relaxed text-cream/90 sm:text-2xl">
              {EVENT.inviteText}
            </p>

            <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:flex-row">
              <a
                href={googleMapsUrl(EVENT.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <MapPinIcon className="h-5 w-5" />
                Google Maps
              </a>
              <a
                href={wazeUrl(EVENT.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <NavigationIcon className="h-5 w-5" />
                Waze
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
