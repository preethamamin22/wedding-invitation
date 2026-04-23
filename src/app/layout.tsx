import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sunil & Keerthana | Wedding Invitation",
  description: "With the blessings of God and elders, we sincerely request you to attend our wedding.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Tenor+Sans&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
