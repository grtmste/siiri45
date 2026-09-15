import type { MetadataRoute } from "next";
import { EVENT } from "@/lib/event-config";

// PWA manifest. `display: "standalone"` makes the site open chromeless (no
// address bar or nav buttons) once a guest adds it to their home screen.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${EVENT.honoree} ${EVENT.age}`,
    short_name: `${EVENT.honoree} ${EVENT.age}`,
    description: `Kutse — ${EVENT.honoree} ${EVENT.age}`,
    start_url: "/",
    display: "standalone",
    background_color: "#0A0B09",
    theme_color: "#0A0B09",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
