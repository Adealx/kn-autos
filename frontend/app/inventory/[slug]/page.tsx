import Link from "next/link";
import type { Metadata } from "next";
import { getVehicles, Vehicle } from "@/lib/api";

interface VehiclePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3001";

const WHATSAPP_NUMBER = "2349012773916";
const PHONE_NUMBER = "+2349012773916";

function formatPrice(price: string) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

function formatMileage(mileage: number) {
  return new Intl.NumberFormat("en-NG").format(mileage);
}

/**
 * Find vehicle by slug
 */
async function findVehicle(
  slug: string
): Promise<Vehicle | null> {
  try {
    const vehicles = await getVehicles();

    return (
      vehicles.find(
        (vehicle) => vehicle.slug === slug
      ) || null
    );
  } catch (error) {
    console.error(
      "Vehicle detail error:",
      error
    );

    return null;
  }
}

/**
 * Convert an image URL into an absolute URL.
 * Useful for Open Graph, Twitter and JSON-LD.
 */
function getAbsoluteImageUrl(
  imageUrl: string | null | undefined
) {
  if (!imageUrl) {
    return `${SITE_URL}/og-image.jpg`;
  }

  try {
    return new URL(
      imageUrl,
      SITE_URL
    ).toString();
  } catch {
    return imageUrl;
  }
}

/**
 * =====================================================
 * DYNAMIC SEO METADATA
 * =====================================================
 */
export async function generateMetadata({
  params,
}: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;

  const vehicle = await findVehicle(slug);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found",
      description:
        "The requested vehicle could not be found at KN AUTOS.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const vehicleName =
    `${vehicle.year} ${vehicle.make} ${vehicle.model}` +
    (vehicle.variant
      ? ` ${vehicle.variant}`
      : "");

  const seoTitle =
    `${vehicleName} for Sale in Lagos`;

  const description =
    vehicle.description?.trim() ||
    `${vehicleName} for sale at KN AUTOS in Lagos, Nigeria. View price, mileage, specifications and contact our sales team.`;

  const canonicalUrl =
    `${SITE_URL}/inventory/${vehicle.slug}`;

  const primaryImage = getAbsoluteImageUrl(
    vehicle.primary_image
  );

  return {
    title: seoTitle,

    description,

    keywords: [
      vehicleName,
      `${vehicle.make} ${vehicle.model} for sale`,
      `${vehicle.make} cars for sale`,
      `${vehicle.model} for sale in Lagos`,
      `${vehicle.make} ${vehicle.model} Lagos`,
      "cars for sale in Lagos",
      "cars for sale in Nigeria",
      "used cars in Lagos",
      "Tokunbo cars in Lagos",
      "car dealership Lagos",
      "vehicles for sale Lagos",
      "KN AUTOS",
    ],

    alternates: {
      canonical: `/inventory/${vehicle.slug}`,
    },

    /**
     * =================================================
     * FACEBOOK / OPEN GRAPH
     * =================================================
     */
    openGraph: {
      type: "website",
      locale: "en_NG",
      url: canonicalUrl,
      siteName: "KN AUTOS",

      title: `${vehicleName} for Sale in Lagos | KN AUTOS`,

      description,

      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: `${vehicleName} for sale at KN AUTOS`,
        },
      ],
    },

    /**
     * =================================================
     * TWITTER / X
     * =================================================
     */
    twitter: {
      card: "summary_large_image",

      title: `${vehicleName} for Sale in Lagos | KN AUTOS`,

      description,

      images: [primaryImage],

      creator: "@KNAUTOS",
    },

    /**
     * =================================================
     * SEARCH ENGINE ROBOTS
     * =================================================
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
}

/**
 * =====================================================
 * VEHICLE PAGE
 * =====================================================
 */
export default async function VehiclePage({
  params,
}: VehiclePageProps) {
  const { slug } = await params;

  const vehicle = await findVehicle(slug);

  /**
   * ===================================================
   * VEHICLE NOT FOUND
   * ===================================================
   */
  if (!vehicle) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="text-5xl">
            🚗
          </div>

          <h1 className="mt-5 text-3xl font-black text-slate-950">
            Vehicle Not Found
          </h1>

          <p className="mt-3 leading-7 text-slate-500">
            The vehicle you are looking for may have
            been sold, removed or is no longer available.
          </p>

          <Link
            href="/inventory"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-red-600 px-7 py-3 font-bold text-white transition hover:bg-red-700"
          >
            Browse Inventory
          </Link>
        </div>
      </main>
    );
  }

  /**
   * ===================================================
   * VEHICLE NAME
   * ===================================================
   */
  const vehicleName =
    `${vehicle.year} ${vehicle.make} ${vehicle.model}` +
    (vehicle.variant
      ? ` ${vehicle.variant}`
      : "");

  const vehicleUrl =
    `${SITE_URL}/inventory/${vehicle.slug}`;

  /**
   * ===================================================
   * GALLERY
   * ===================================================
   */
  const galleryImages =
    vehicle.images?.length > 0
      ? vehicle.images
      : [];

  /**
   * ===================================================
   * JSON-LD VEHICLE STRUCTURED DATA
   * ===================================================
   */
  const structuredImages =
    galleryImages.length > 0
      ? galleryImages.map((image) =>
          getAbsoluteImageUrl(
            image.image_url || image.image
          )
        )
      : [
          getAbsoluteImageUrl(
            vehicle.primary_image
          ),
        ];

  const vehicleSchema = {
    "@context": "https://schema.org",

    "@type": "Vehicle",

    name: vehicleName,

    url: vehicleUrl,

    image: structuredImages,

    description:
      vehicle.description?.trim() ||
      `${vehicleName} available for sale at KN AUTOS in Lagos, Nigeria.`,

    sku: vehicle.stock_number,

    brand: {
      "@type": "Brand",
      name: vehicle.make,
    },

    model: vehicle.model,

    vehicleModelDate:
      String(vehicle.year),

    vehicleTransmission:
      vehicle.transmission || undefined,

    fuelType:
      vehicle.fuel_type || undefined,

    bodyType:
      vehicle.body_type || undefined,

    color:
      vehicle.exterior_color || undefined,

    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },

    offers: {
      "@type": "Offer",

      url: vehicleUrl,

      priceCurrency: "NGN",

      price: Number(vehicle.price),

      availability:
        vehicle.status?.toLowerCase() ===
        "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",

      itemCondition:
        vehicle.condition?.toLowerCase() ===
        "new"
          ? "https://schema.org/NewCondition"
          : "https://schema.org/UsedCondition",

      seller: {
        "@type": "AutoDealer",

        name: "KN AUTOS",

        url: SITE_URL,

        address: {
          "@type": "PostalAddress",
          addressLocality: "Lagos",
          addressCountry: "NG",
        },
      },
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* =====================================================
          JSON-LD STRUCTURED DATA
      ====================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            vehicleSchema
          ).replace(/</g, "\\u003c"),
        }}
      />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <Link
            href="/"
            className="text-xl font-black tracking-tight sm:text-2xl"
          >
            KN
            <span className="text-red-500">
              AUTOS
            </span>
          </Link>

          <nav className="flex items-center gap-6">

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
              className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:block"
            >
              About
            </a>

          </nav>

        </div>
      </header>

      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">

          <Link
            href="/"
            className="transition hover:text-red-600"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/inventory"
            className="transition hover:text-red-600"
          >
            Inventory
          </Link>

          <span>/</span>

          <span className="font-medium text-slate-900">
            {vehicle.make} {vehicle.model}
          </span>

        </div>

      </div>

      {/* =====================================================
          MAIN VEHICLE SECTION
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">

          {/* =================================================
              IMAGE SECTION
          ================================================== */}

          <div>

            {/* MAIN IMAGE */}

            <div className="relative overflow-hidden rounded-2xl bg-slate-200 shadow-sm sm:rounded-3xl">

              {vehicle.primary_image ? (
                <img
                  src={vehicle.primary_image}
                  alt={vehicleName}
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center text-slate-400">
                  No image available
                </div>
              )}

              {/* STATUS */}

              <div className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                {vehicle.status}
              </div>

            </div>

            {/* GALLERY */}

            {galleryImages.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3">

                {galleryImages.map(
                  (image, index) => (
                    <div
                      key={image.id}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                    >
                      <img
                        src={
                          image.image_url ||
                          image.image
                        }
                        alt={`${vehicleName} - image ${
                          index + 1
                        }`}
                        className="aspect-square w-full object-cover"
                      />
                    </div>
                  )
                )}

              </div>
            )}

          </div>

          {/* =================================================
              VEHICLE INFORMATION
          ================================================== */}

          <div className="lg:pt-2">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 sm:text-sm">
              {vehicle.condition || "Vehicle"}
            </p>

            <h1 className="mt-2 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {vehicleName}
            </h1>

            {vehicle.variant && (
              <p className="mt-2 text-base text-slate-500">
                {vehicle.variant}
              </p>
            )}

            {/* PRICE */}

            <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white sm:p-6">

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Asking Price
              </p>

              <p className="mt-2 text-3xl font-black sm:text-4xl">
                {formatPrice(vehicle.price)}
              </p>

              {vehicle.previous_price && (
                <p className="mt-2 text-sm text-slate-400 line-through">
                  {formatPrice(
                    vehicle.previous_price
                  )}
                </p>
              )}

            </div>

            {/* QUICK SPECS */}

            <div className="mt-6 grid grid-cols-2 gap-3">

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Mileage
                </p>

                <p className="mt-1 font-bold">
                  {formatMileage(
                    vehicle.mileage
                  )}{" "}
                  km
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Transmission
                </p>

                <p className="mt-1 font-bold capitalize">
                  {vehicle.transmission ||
                    "N/A"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Fuel
                </p>

                <p className="mt-1 font-bold capitalize">
                  {vehicle.fuel_type ||
                    "N/A"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Body
                </p>

                <p className="mt-1 font-bold uppercase">
                  {vehicle.body_type ||
                    "N/A"}
                </p>
              </div>

            </div>

            {/* CONTACT BUTTONS */}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hello KN AUTOS, I am interested in the ${vehicleName}. Please provide more information.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-13 items-center justify-center rounded-full bg-red-600 px-6 py-3 text-center font-bold text-white transition hover:bg-red-700"
              >
                Chat on WhatsApp
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex min-h-13 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-center font-bold text-slate-950 transition hover:border-slate-950"
              >
                Call KN AUTOS
              </a>

            </div>

            {/* STOCK */}

            <div className="mt-5 text-center text-sm text-slate-500 sm:text-left">

              Stock Number:

              <span className="ml-1 font-bold text-slate-700">
                {vehicle.stock_number}
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          DESCRIPTION + DETAILS
      ====================================================== */}

      <section className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">

            {/* DESCRIPTION */}

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 sm:text-sm">
                Vehicle Details
              </p>

              <h2 className="mt-2 text-3xl font-black">
                About this vehicle
              </h2>

              <div className="mt-5 text-base leading-8 text-slate-600">

                {vehicle.description ? (
                  <p className="whitespace-pre-line">
                    {vehicle.description}
                  </p>
                ) : (
                  <p>
                    Contact KN AUTOS for more
                    information about this vehicle.
                  </p>
                )}

              </div>

            </div>

            {/* SPECIFICATIONS */}

            <div>

              <h2 className="text-2xl font-black">
                Specifications
              </h2>

              <div className="mt-5 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-slate-50">

                <div className="flex justify-between gap-5 p-4">
                  <span className="text-slate-500">
                    Year
                  </span>

                  <span className="font-bold">
                    {vehicle.year}
                  </span>
                </div>

                <div className="flex justify-between gap-5 p-4">
                  <span className="text-slate-500">
                    Make
                  </span>

                  <span className="font-bold">
                    {vehicle.make}
                  </span>
                </div>

                <div className="flex justify-between gap-5 p-4">
                  <span className="text-slate-500">
                    Model
                  </span>

                  <span className="font-bold">
                    {vehicle.model}
                  </span>
                </div>

                <div className="flex justify-between gap-5 p-4">
                  <span className="text-slate-500">
                    Engine
                  </span>

                  <span className="font-bold">
                    {vehicle.engine_size ||
                      "N/A"}
                  </span>
                </div>

                <div className="flex justify-between gap-5 p-4">
                  <span className="text-slate-500">
                    Exterior
                  </span>

                  <span className="font-bold">
                    {vehicle.exterior_color ||
                      "N/A"}
                  </span>
                </div>

                <div className="flex justify-between gap-5 p-4">
                  <span className="text-slate-500">
                    Interior
                  </span>

                  <span className="font-bold">
                    {vehicle.interior_color ||
                      "N/A"}
                  </span>
                </div>

                <div className="flex justify-between gap-5 p-4">
                  <span className="text-slate-500">
                    Drive Type
                  </span>

                  <span className="font-bold uppercase">
                    {vehicle.drive_type ||
                      "N/A"}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}

      {vehicle.features &&
        vehicle.features.length > 0 && (
          <section className="bg-slate-50">

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 sm:text-sm">
                Features
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Vehicle Features
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {vehicle.features.map(
                  (feature, index) => (
                    <div
                      key={`${feature}-${index}`}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                    >

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
                        ✓
                      </span>

                      <span className="text-sm font-medium text-slate-700">
                        {feature}
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>

          </section>
        )}

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-red-600">

        <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-20">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-100 sm:text-sm">
            KN AUTOS
          </p>

          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl md:text-5xl">
            Interested in this vehicle?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-red-100">
            Speak directly with the KN AUTOS sales
            team for availability, inspection and
            purchase information.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hello KN AUTOS, I am interested in the ${vehicleName}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-13 items-center justify-center rounded-full bg-white px-7 py-3 font-bold text-red-600 transition hover:bg-slate-100"
            >
              WhatsApp Us
            </a>

            <Link
              href="/inventory"
              className="flex min-h-13 items-center justify-center rounded-full border border-white/40 px-7 py-3 font-bold text-white transition hover:bg-white hover:text-red-600"
            >
              Browse More Vehicles
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-slate-950 px-4 py-8 text-slate-400 sm:px-6">

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

          <div className="flex justify-center gap-5 text-sm">

            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/inventory"
              className="transition hover:text-white"
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