import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PageTransitionProvider } from "@/components/marketing/page-transition";
import { CookieConsent } from "@/components/privacy/cookie-consent";

const tomatoGrotesk = localFont({
  src: [
    { path: "../public/fonts/TomatoGrotesk-Regular.63ff49eb.otf", weight: "400" },
    { path: "../public/fonts/TomatoGrotesk-Medium.8b894f94.otf", weight: "500" },
    { path: "../public/fonts/TomatoGrotesk-SemiBold.1183d758.otf", weight: "600" },
  ],
  variable: "--font-tomato-grotesk",
  display: "swap",
});

const seasonSans = localFont({
  src: "../public/fonts/SeasonCollectionVF-TRIAL.ttf",
  variable: "--font-season-sans",
  weight: "300 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ovaal — The restaurant platform for growth, built on great guest experiences",
  description:
    "Ovaal puts ordering, kitchen, payments, stock and insight on one platform, so guests get a smoother experience and your restaurant gets the numbers to grow. Cash orders keep flowing when the network drops. Launching in Ghana, built for restaurants everywhere. Join the beta.",
  icons: {
    icon: [
      { url: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${tomatoGrotesk.variable} ${seasonSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col"><PageTransitionProvider>{children}</PageTransitionProvider><CookieConsent /></body>
    </html>
  );
}
