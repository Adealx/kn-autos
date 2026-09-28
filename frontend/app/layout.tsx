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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3001";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "KN AUTOS | Cars for Sale in Lagos, Nigeria",
    template: "%s | KN AUTOS",
  },

  description:
    "KN AUTOS is a premium automotive dealership offering quality cars for sale in Lagos, Nigeria. Browse available vehicles, compare specifications and contact our sales team.",

  keywords: [
    "KN AUTOS",
    "cars for sale in Lagos",
    "cars for sale in Nigeria",
    "used cars in Lagos",
    "Tokunbo cars in Lagos",
    "vehicles for sale Lagos",
    "car dealership Lagos",
    "cars Nigeria",
    "Toyota cars Lagos",
    "Lexus cars Lagos",
    "SUV for sale Lagos",
    "buy cars in Lagos",
  ],

  authors: [
    {
      name: "KN AUTOS",
    },
  ],

  creator: "KN AUTOS",
  publisher: "KN AUTOS",

  applicationName: "KN AUTOS",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,

    siteName: "KN AUTOS",

    title:
      "KN AUTOS | Cars for Sale in Lagos, Nigeria",

    description:
      "Browse quality vehicles for sale at KN AUTOS in Lagos, Nigeria. Explore our inventory and contact our sales team.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KN AUTOS - Cars for Sale in Lagos, Nigeria",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "KN AUTOS | Cars for Sale in Lagos, Nigeria",

    description:
      "Browse quality vehicles for sale at KN AUTOS in Lagos, Nigeria.",

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