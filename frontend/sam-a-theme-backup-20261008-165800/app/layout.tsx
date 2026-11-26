
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3001"
).replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "SAM-A AUTOS | Quality Cars for Sale in Lagos, Nigeria",
    template: "%s | SAM-A AUTOS",
  },

  description:
    "Discover quality cars, SUVs and luxury vehicles for sale in Lagos, Nigeria, at SAM-A AUTOS. Explore available inventory, compare vehicle specifications and contact our sales team on WhatsApp.",

  keywords: [
    "SAM-A AUTOS",
    "cars for sale in Lagos",
    "cars for sale in Nigeria",
    "used cars in Lagos",
    "Tokunbo cars in Lagos",
    "SUVs for sale in Lagos",
    "luxury cars in Lagos",
    "Toyota Highlander for sale in Lagos",
    "Lexus for sale in Lagos",
    "car dealership in Lagos",
  ],

  authors: [{ name: "SAM-A AUTOS" }],
  creator: "SAM-A AUTOS",
  publisher: "SAM-A AUTOS",
  applicationName: "SAM-A AUTOS",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "SAM-A AUTOS",
    title: "SAM-A AUTOS | Quality Cars for Sale in Lagos",
    description:
      "Explore available vehicles at SAM-A AUTOS in Lagos, Nigeria. View vehicle details and contact our sales team.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SAM-A AUTOS — Quality Cars for Sale in Lagos, Nigeria",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SAM-A AUTOS | Quality Cars for Sale in Lagos",
    description:
      "Explore quality vehicles for sale in Lagos, Nigeria, at SAM-A AUTOS.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "automotive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-NG"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white">
        {children}
      </body>
    </html>
  );
}
