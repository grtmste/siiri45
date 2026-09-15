import { EVENT, googleMapsUrl, wazeUrl } from "@/lib/event-config";
import { Diamond, Item, OrnamentDivider, Stagger } from "./Motion";
import { CalendarIcon, MapPinIcon, NavigationIcon } from "./icons";

// The invitation card: date, location, invite text, and directions buttons.
// Every value comes from lib/event-config.ts.
export default function InviteSection() {
  return (
    <section
      id="invite"
      className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-20 sm:pt-28"
    >
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

      <Stagger className="mt-10">
        <Item>
          <div className="card card-ornate rounded-2xl p-7 sm:p-10">
            <Stagger className="flex flex-col items-center gap-6 text-center">
              {/* Invitation text lifted to the top. */}
              <Item>
                <p className="max-w-xl font-body text-lg font-light leading-relaxed tracking-wide text-cream/90 sm:text-xl">
                  {EVENT.inviteText}
                </p>
              </Item>

              <OrnamentDivider className="w-40" />

              <Item>
                <div className="flex items-center gap-3 text-cream">
                  <CalendarIcon className="h-5 w-5 text-gold" />
                  <span className="font-body text-lg tracking-wide sm:text-xl">
                    {EVENT.dateTime}
                  </span>
                </div>
              </Item>

              <OrnamentDivider className="w-40" />

              <Item>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2 font-display text-xl tracking-wide text-gold-bright sm:text-2xl">
                    <MapPinIcon className="h-5 w-5 text-gold" />
                    {EVENT.locationName}
                  </div>
                  <p className="font-body tracking-wide text-cream/80">
                    {EVENT.address}
                  </p>
                </div>
              </Item>

              <Item className="w-full">
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
              </Item>
            </Stagger>
          </div>
        </Item>
      </Stagger>
    </section>
  );
}
