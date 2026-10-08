import Link from "next/link";
import type { ReactNode } from "react";
import { getVehicles, type Vehicle } from "@/lib/api";
import HomeSearch from "./HomeSearch";
import MobileMenu from "./MobileMenu";

export const dynamic = "force-dynamic";

const WHATSAPP_NUMBER = "2348067491717";
const BUSINESS_EMAIL = "samsonadedeji177@gmail.com";

function formatPrice(price: string): string {
  const amount = Number(price);

  if (!Number.isFinite(amount)) {
    return "Contact us for price";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatMileage(mileage: number): string {
  return new Intl.NumberFormat("en-NG").format(mileage || 0);
}

function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="SAM-A AUTOS homepage"
      className={`inline-flex items-center gap-1 bg-transparent font-extrabold tracking-tight no-underline ${
        footer ? "text-xl" : "text-xl sm:text-2xl"
      }`}
    >
      <span className="bg-transparent text-white">SAM-A</span>
      <span className="bg-transparent text-[#D7B779]">AUTOS</span>
    </Link>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#98763B] sm:text-sm">
      {children}
    </p>
  );
}

const navyButton =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-[#0B1830] px-7 py-3 text-sm font-bold !text-white no-underline transition-colors hover:bg-[#172B4D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B779] focus-visible:ring-offset-2";

const goldButton =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-[#D7B779] px-7 py-3 text-sm font-bold !text-[#08101F] no-underline transition-colors hover:bg-[#EAD7AD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B779] focus-visible:ring-offset-2";

export default async function Home() {
  let vehicles: Vehicle[] = [];

  try {
    vehicles = await getVehicles();
  } catch (error) {
    console.error("SAM-A AUTOS homepage vehicle error:", error);
  }

  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.status?.toLowerCase() === "available"
  );

  const featuredVehicles = availableVehicles.filter(
    (vehicle) => vehicle.is_featured
  );

  const heroVehicle = featuredVehicles[0] ?? availableVehicles[0];
  const heroImage = heroVehicle?.primary_image;

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-slate-900">
      {/* HEADER */}
      <header className="relative z-50 border-b border-white/10 bg-[#08101F] shadow-lg">
        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
          <BrandLogo />

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 md:flex"
          >
            <Link
              href="/"
              className="bg-transparent text-sm font-semibold text-white hover:!text-[#D7B779]"
            >
              Home
            </Link>

            <Link
              href="/inventory"
              className="bg-transparent text-sm font-semibold text-white hover:!text-[#D7B779]"
            >
              Inventory
            </Link>

            <Link
              href="/#about"
              className="bg-transparent text-sm font-semibold text-white hover:!text-[#D7B779]"
            >
              About
            </Link>

            <Link href="/#contact" className={goldButton}>
              Contact Us
            </Link>
          </nav>

          <MobileMenu />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative flex min-h-[680px] items-center overflow-hidden bg-[#0B1830] sm:min-h-[740px] lg:min-h-[780px]">
        {heroImage ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${heroImage}")`,
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-[#0B1830] via-[#142744] to-[#08101F]"
          />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#08101F]/90 via-[#08101F]/70 to-[#08101F]/35"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#08101F]/85 via-transparent to-[#08101F]/25"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#D7B779]/50 bg-[#08101F]/90 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#D7B779]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#EAD7AD] sm:text-xs">
                Premium Automotive Dealership
              </span>
            </div>

            <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Your next car.
              <span className="mt-2 block text-[#E4C17F]">
                Your next chapter.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white sm:mt-8 sm:text-lg sm:leading-8">
              Discover quality vehicles selected for drivers who value
              comfort, style, performance, and confidence. Find your next
              vehicle with SAM-A AUTOS.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link
                href="/inventory"
                className={`${goldButton} px-7 py-4 shadow-lg hover:-translate-y-0.5 sm:px-8 sm:text-base`}
              >
                Explore Our Inventory
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>

              <a
                href={whatsappLink(
                  "Hello SAM-A AUTOS, I would like to enquire about your available vehicles."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white bg-white px-7 py-4 text-sm font-bold text-[#0B1830] no-underline hover:border-[#D7B779] hover:bg-[#EAD7AD] sm:px-8 sm:text-base"
              >
                Enquire on WhatsApp
              </a>
            </div>

            {heroVehicle ? (
              <div className="mt-10 max-w-3xl rounded-2xl border border-white/20 bg-[#08101F]/95 p-4 shadow-2xl sm:mt-12 sm:p-5">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E4C17F]">
                  Featured vehicle
                </p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
                  <div className="min-w-0">
                    <p className="text-xs text-slate-300">Vehicle</p>
                    <p className="mt-1 truncate text-sm font-semibold text-white">
                      {heroVehicle.year} {heroVehicle.make} {heroVehicle.model}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-300">Mileage</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {formatMileage(heroVehicle.mileage)} km
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-300">Transmission</p>
                    <p className="mt-1 text-sm font-semibold capitalize text-white">
                      {heroVehicle.transmission || "Contact us"}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-300">Price</p>
                    <p className="mt-1 break-words text-sm font-bold text-[#EAD7AD]">
                      {formatPrice(heroVehicle.price)}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/inventory/${heroVehicle.slug}`}
                  className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#E4C17F] no-underline hover:text-white"
                >
                  View vehicle details →
                </Link>
              </div>
            ) : (
              <p className="mt-8 max-w-xl rounded-xl border border-white/15 bg-[#08101F]/90 p-4 text-sm leading-6 text-white">
                New vehicles are being added to our inventory. Contact us for
                current availability.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* VEHICLE SEARCH */}
      <section className="relative z-10 bg-white">
        <HomeSearch vehicles={vehicles} />
      </section>

      {/* FEATURED INVENTORY */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Eyebrow>Discover your next vehicle</Eyebrow>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B1830] sm:text-4xl md:text-5xl">
              Featured Vehicles
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Explore vehicles currently available at SAM-A AUTOS and find
              the right match for your needs.
            </p>
          </div>

          <Link
            href="/inventory"
            className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-[#0B1830] no-underline hover:text-[#98763B] sm:text-base md:self-auto"
          >
            View all vehicles →
          </Link>
        </div>

        {featuredVehicles.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-[#F8FAFC] px-6 py-12 text-center sm:px-12 sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B1830] text-3xl text-[#D7B779]">
              ◇
            </div>

            <h3 className="mt-5 text-xl font-black text-[#0B1830] sm:text-2xl">
              Our Next Arrivals
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
              Our featured selection will appear here as vehicles are added
              and marked as featured. You can also browse all available
              vehicles.
            </p>

            <Link href="/inventory" className={`${navyButton} mt-7`}>
              Browse Inventory
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {featuredVehicles.map((vehicle) => (
              <article
                key={vehicle.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link
                  href={`/inventory/${vehicle.slug}`}
                  aria-label={`View ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="block bg-transparent text-inherit no-underline"
                >
                  <div className="relative h-56 overflow-hidden bg-[#F1F4F8] sm:h-64">
                    {vehicle.primary_image ? (
                      <img
                        src={vehicle.primary_image}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-500">
                        Image coming soon
                      </div>
                    )}

                    <div className="absolute left-4 top-4 rounded-full bg-[#08101F] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      Available
                    </div>

                    {vehicle.is_featured && (
                      <div className="absolute right-4 top-4 rounded-full bg-[#D7B779] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#08101F]">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#98763B]">
                      {vehicle.variant || vehicle.body_type || "Vehicle"}
                    </p>

                    <h3 className="mt-2 text-lg font-black text-[#0B1830] sm:text-xl">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>

                    <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4 border-b border-slate-100 pb-5 text-sm text-slate-600">
                      <div>
                        <p className="text-xs text-slate-500">Mileage</p>
                        <p className="mt-1 font-medium">
                          {formatMileage(vehicle.mileage)} km
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Transmission</p>
                        <p className="mt-1 font-medium capitalize">
                          {vehicle.transmission || "Contact us"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Fuel type</p>
                        <p className="mt-1 font-medium capitalize">
                          {vehicle.fuel_type || "Contact us"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Exterior colour
                        </p>
                        <p className="mt-1 font-medium">
                          {vehicle.exterior_color || "Contact us"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-end justify-between gap-3 pt-5">
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Asking price
                        </p>

                        <p className="mt-1 break-words text-lg font-black text-[#0B1830] sm:text-xl">
                          {formatPrice(vehicle.price)}
                        </p>
                      </div>

                      <span className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-[#0B1830] px-4 py-3 text-xs font-bold text-white transition-colors group-hover:bg-[#D7B779] group-hover:text-[#08101F]">
                        View details →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ABOUT SAM-A AUTOS */}
      <section
        id="about"
        className="scroll-mt-24 bg-[#0B1830] py-16 text-white sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D7B779] sm:text-sm">
                The SAM-A AUTOS difference
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
                More than a car.
                <span className="mt-2 block text-[#E4C17F]">
                  A confident choice.
                </span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">
                We make vehicle discovery simpler by bringing vehicle
                information, available inventory and direct customer
                communication together in one convenient experience.
              </p>

              <a
                href={whatsappLink(
                  "Hello SAM-A AUTOS, I would like to speak with your sales team."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`${goldButton} mt-7`}
              >
                Speak to our team
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 sm:col-span-2 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D7B779] text-xl font-black text-[#0B1830]">
                  ✓
                </div>

                <h3 className="mt-5 text-lg font-bold sm:text-xl">
                  Quality-focused selection
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-200">
                  Explore vehicle listings with useful specifications to help
                  you make a more informed choice.
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D7B779] text-xl font-black text-[#0B1830]">
                  ◇
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Clear communication
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-200">
                  Ask questions and request more information directly from our
                  sales team.
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D7B779] text-xl font-black text-[#0B1830]">
                  ★
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Convenient enquiries
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-200">
                  Connect with us through WhatsApp or email to discuss your
                  vehicle requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="scroll-mt-24 bg-[#F8FAFC] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
          <Eyebrow>SAM-A AUTOS</Eyebrow>

          <h2 className="mt-4 text-3xl font-black leading-tight text-[#0B1830] sm:text-4xl md:text-5xl">
            Ready to find your next vehicle?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Browse our available inventory or contact our team for help with
            your vehicle enquiry.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/inventory" className={navyButton}>
              Browse Inventory
            </Link>

            <a
              href={whatsappLink(
                "Hello SAM-A AUTOS, I am interested in your vehicles."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={goldButton}
            >
              Chat on WhatsApp
            </a>

            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-bold text-[#0B1830] no-underline transition-colors hover:border-[#D7B779] hover:bg-slate-50"
            >
              Email Us
            </a>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-slate-600 sm:flex-row sm:gap-7">
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="hover:text-[#98763B]"
            >
              +234 806 749 1717
            </a>

            <span className="hidden text-slate-300 sm:inline">•</span>

            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="break-all hover:text-[#98763B]"
            >
              {BUSINESS_EMAIL}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#08101F] px-5 py-9 text-slate-300 sm:px-6 sm:py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <BrandLogo footer />

            <p className="mt-2 text-sm text-slate-300">
              Quality vehicles. Confident choices.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-5 gap-y-3 text-sm"
          >
            <Link href="/" className="text-slate-200 hover:text-[#D7B779]">
              Home
            </Link>

            <Link
              href="/inventory"
              className="text-slate-200 hover:text-[#D7B779]"
            >
              Inventory
            </Link>

            <Link
              href="/#about"
              className="text-slate-200 hover:text-[#D7B779]"
            >
              About
            </Link>

            <Link
              href="/#contact"
              className="text-slate-200 hover:text-[#D7B779]"
            >
              Contact
            </Link>
          </nav>

          <div className="text-sm">
            <p>
              © {new Date().getFullYear()} SAM-A AUTOS. All rights reserved.
            </p>

            <p className="mt-2">
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="hover:text-[#D7B779]"
              >
                {BUSINESS_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}