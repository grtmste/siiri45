import { EVENT, googleMapsUrl, wazeUrl } from "@/lib/event-config";
import { Diamond, Item, OrnamentDivider, Reveal, Stagger } from "./Motion";
import { CalendarIcon, MapPinIcon, NavigationIcon } from "./icons";

// The invitation card: invite text, date, location, and directions buttons.
// Every value comes from lib/event-config.ts.
export default function InviteSection() {
  return (
    <section
      id="invite"
      className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-20 sm:pt-28"
    >
      {/* Short header — staggered reveal is safe here. */}
      <Stagger className="flex flex-col items-center text-center">
        <Item>
          <Diamond className="mb-5" />
        </Item>
        <Item>
          <p className="font-body text-sm uppercase tracking-[0.4em] text-gold/80">
            Kutse
          </p>
        </Item>
        <Item>
          <h1 className="mt-4 animate-flicker font-display text-5xl leading-tight tracking-wide text-gold-bright sm:text-6xl">
            {EVENT.honoree}
          </h1>
        </Item>
        <Item>
          <p className="mt-1 font-display text-2xl tracking-[0.3em] text-gold sm:text-3xl">
            {EVENT.age}
          </p>
        </Item>
      </Stagger>

      {/* The card is taller than the screen, so reveal it as one reliable
          block that triggers as its top edge enters the viewport. */}
      <Reveal className="mt-10" amount={0.05}>
        <div className="card card-ornate rounded-2xl p-7 sm:p-10">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Invitation text: paragraphs left-aligned, gold subheadings. */}
            <div className="mx-auto flex max-w-xl flex-col gap-5 text-left">
              {EVENT.inviteText.map((block, i) => (
                <div key={i}>
                  {block.heading && (
                    <h3 className="mb-2 font-body text-sm uppercase tracking-[0.2em] text-gold-bright">
                      {block.heading}
                    </h3>
                  )}
                  <p className="font-body text-base font-light leading-relaxed tracking-wide text-cream/90 sm:text-lg">
                    {block.text}
                  </p>
                </div>
              ))}
            </div>

            <OrnamentDivider className="w-40" />

            <div className="flex items-center gap-3 text-cream">
              <CalendarIcon className="h-5 w-5 text-gold" />
              <span className="font-body text-lg tracking-wide sm:text-xl">
                {EVENT.dateTime}
              </span>
            </div>

            <OrnamentDivider className="w-40" />

            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 font-display text-xl tracking-wide text-gold-bright sm:text-2xl">
                <MapPinIcon className="h-5 w-5 text-gold" />
                {EVENT.locationName}
              </div>
              <p className="font-body tracking-wide text-cream/80">
                {EVENT.address}
              </p>
            </div>

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
