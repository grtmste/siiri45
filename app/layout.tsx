import type { Metadata, Viewport } from "next";
import { Cinzel, Jost } from "next/font/google";
import { EVENT } from "@/lib/event-config";
import NoZoom from "./components/NoZoom";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${EVENT.honoree} ${EVENT.age}`,
  description: `Kutse — ${EVENT.honoree} ${EVENT.age}`,
  manifest: "/manifest.webmanifest",
  // Launched from the home screen, iOS opens this chromeless (no browser bars).
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: `${EVENT.honoree} ${EVENT.age}`,
  },
  // iOS still reads the legacy tag for a chromeless home-screen launch.
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

// Block zoom (pinch + double-tap) and use the full screen incl. safe areas.
// user-scalable=no / maximum-scale=1 stops pinch-zoom on Android; touch-action
// and the NoZoom guard cover double-tap and iOS pinch.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0A0B09",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="et" className={`${cinzel.variable} ${jost.variable}`}>
      <body className="app-backdrop grain font-body">
        <NoZoom />
        {children}
      </body>
    </html>
  );
}
