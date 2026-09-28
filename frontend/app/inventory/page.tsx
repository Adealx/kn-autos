import Link from "next/link";
import type { Metadata } from "next";
import { getVehicles, type Vehicle } from "@/lib/api";
import InventoryClient from "./InventoryClient";
import MobileMenu from "../MobileMenu";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3001";

/**
 * =====================================================
 * INVENTORY SEO METADATA
 * =====================================================
 *
 * The canonical URL tells search engines that:
 *
 * /inventory
 *
 * is the main version of the inventory page.
 *
 * This is especially important because your inventory
 * page can also receive query parameters such as:
 *
 * /inventory?make=Toyota
 * /inventory?model=Highlander
 * /inventory?minPrice=40000000
 *
 * Those filtered URLs should not become separate
 * competing versions of the main inventory page.
 */

export const metadata: Metadata = {
  title: "Cars for Sale in Lagos | KN AUTOS",

  description:
    "Browse quality cars for sale in Lagos, Nigeria at KN AUTOS. Search available vehicles by make, model, year, price, body type, fuel type and transmission.",

  keywords: [
    "cars for sale in Lagos",
    "cars for sale in Nigeria",
    "used cars in Lagos",
    "Tokunbo cars in Lagos",
    "vehicles for sale Lagos",
    "car dealership Lagos",
    "SUV for sale Lagos",
    "Toyota cars Lagos",
    "Lexus cars Lagos",
    "buy cars in Lagos",
    "KN AUTOS",
  ],

  /**
   * ===================================================
   * CANONICAL URL
   * ===================================================
   */
  alternates: {
    canonical: "/inventory",
  },

  /**
   * ===================================================
   * OPEN GRAPH / FACEBOOK
   * ===================================================
   */
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: `${SITE_URL}/inventory`,
    siteName: "KN AUTOS",

    title:
      "Cars for Sale in Lagos | KN AUTOS",

    description:
      "Browse quality vehicles for sale at KN AUTOS in Lagos, Nigeria. Search our available inventory by make, model, price, year and specifications.",

    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt:
          "KN AUTOS - Cars for Sale in Lagos, Nigeria",
      },
    ],
  },

  /**
   * ===================================================
   * TWITTER / X
   * ===================================================
   */
  twitter: {
    card: "summary_large_image",

    title:
      "Cars for Sale in Lagos | KN AUTOS",

    description:
      "Browse quality vehicles for sale at KN AUTOS in Lagos, Nigeria.",

    images: [
      `${SITE_URL}/og-image.jpg`,
    ],
  },

  /**
   * ===================================================
   * SEARCH ENGINE ROBOTS
   * ===================================================
   */
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
};

interface InventoryPageProps {
  searchParams: Promise<{
    make?: string;
    model?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function InventoryPage({
  searchParams,
}: InventoryPageProps) {
  /**
   * =====================================================
   * LOAD VEHICLES
   * =====================================================
   */

  let vehicles: Vehicle[] = [];

  try {
    vehicles = await getVehicles();
  } catch (error) {
    console.error(
      "Inventory error:",
      error
    );
  }

  /**
   * =====================================================
   * SEARCH PARAMETERS
   * =====================================================
   */

  const params = await searchParams;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950 text-white">

        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO */}

          <Link
            href="/"
            className="text-xl font-black tracking-tight sm:text-2xl"
          >
            KN
            <span className="text-red-500">
              AUTOS
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}

          <nav className="hidden items-center gap-7 md:flex">

            <Link
              href="/"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/inventory"
              className="text-sm font-bold text-white"
            >
              Inventory
            </Link>

            <a
              href="/#about"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              About
            </a>

            <a
              href="/#contact"
              className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Contact Us
            </a>

          </nav>

          {/* MOBILE MENU */}

          <div className="md:hidden">
            <MobileMenu />
          </div>

        </div>

      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="bg-slate-950 text-white">

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400 sm:text-sm">
            KN AUTOS
          </p>

          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Cars for Sale in Lagos
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Browse our selection of quality vehicles
            available for sale in Lagos, Nigeria.
            Search by make, model, year, price and
            vehicle specifications.
          </p>

        </div>

      </section>

      {/* =====================================================
          INVENTORY
      ====================================================== */}

      <InventoryClient
        vehicles={vehicles}
        initialFilters={{
          make: params.make || "",
          model: params.model || "",
          minPrice: params.minPrice || "",
          maxPrice: params.maxPrice || "",
        }}
      />

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-slate-200 bg-slate-950 px-4 py-8 text-slate-400 sm:px-6">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

          <div>

            <div className="text-xl font-black text-white">
              KN
              <span className="text-red-500">
                AUTOS
              </span>
            </div>

            <p className="mt-1 text-sm">
              Quality vehicles. Confident choices.
            </p>

          </div>

          <div className="flex justify-center gap-5 text-sm sm:justify-start">

            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/inventory"
              className="font-semibold text-white"
            >
              Inventory
            </Link>

            <a
              href="/#contact"
              className="transition hover:text-white"
            >
              Contact
            </a>

          </div>

          <p className="text-xs sm:text-sm">
            © {new Date().getFullYear()} KN AUTOS.
            All rights reserved.
          </p>

        </div>

      </footer>

    </main>
  );
}