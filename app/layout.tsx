import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { EVENT } from "@/lib/event-config";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${EVENT.honoree} ${EVENT.age}`,
  description: `Kutse — ${EVENT.honoree} ${EVENT.age}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="et" className={`${cinzel.variable} ${cormorant.variable}`}>
      <body className="app-backdrop grain font-body">{children}</body>
    </html>
  );
}
