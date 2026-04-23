import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A & P | Wedding Invitation",
  description: "You are invited to our wedding celebration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans text-gray-800 bg-[#FCF9F2]">
        {children}
      </body>
    </html>
  );
}
