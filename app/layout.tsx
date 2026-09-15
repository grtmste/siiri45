import type { Metadata } from "next";
import { Cinzel, Jost } from "next/font/google";
import { EVENT } from "@/lib/event-config";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="et" className={`${cinzel.variable} ${jost.variable}`}>
      <body className="app-backdrop grain font-body">{children}</body>
    </html>
  );
}
