import Link from "next/link";
import { getVehicles, Vehicle } from "@/lib/api";
import HomeSearch from "./HomeSearch";
import MobileMenu from "./MobileMenu";

const WHATSAPP_NUMBER = "2349012773916";

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

export default async function Home() {
  let vehicles: Vehicle[] = [];

  try {
    vehicles = await getVehicles();
  } catch (error) {
    console.error("Homepage vehicle error:", error);
  }

  // Only available vehicles marked as featured
  const featuredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.status === "available" &&
      vehicle.is_featured === true
  );

  // First featured vehicle powers the hero
  const heroVehicle = featuredVehicles[0];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900">

      {/* =====================================================
          NAVIGATION
      ====================================================== */}
      <header className="absolute left-0 right-0 top-0 z-50">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 sm:py-6 lg:px-8">

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-black tracking-tight text-white sm:text-2xl"
          >
            KN<span className="text-red-500">AUTOS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-white transition hover:text-red-400"
            >
              Home
            </Link>

            <Link
              href="/inventory"
              className="text-sm font-medium text-white transition hover:text-red-400"
            >
              Inventory
            </Link>

            <a
              href="#about"
              className="text-sm font-medium text-white transition hover:text-red-400"
            >
              About
            </a>

            <a
              href="#contact"
              className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Contact Us
            </a>
          </nav>

          {/* Functional Mobile Menu */}
          <MobileMenu />

        </div>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative flex min-h-[700px] items-center overflow-hidden bg-slate-950 sm:min-h-[720px]">

        {/* Dynamic featured vehicle image */}
        {heroVehicle?.primary_image ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(
                rgba(2, 6, 23, 0.68),
                rgba(2, 6, 23, 0.94)
              ), url("${heroVehicle.primary_image}")`,
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-slate-950" />
        )}

        {/* Extra mobile overlay for readability */}
        <div className="absolute inset-0 bg-slate-950/10" />

        {/* Hero content */}
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8">

          <div className="max-w-3xl">

            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-red-400 sm:mb-5 sm:text-sm sm:tracking-[0.3em]">
              Premium Automotive Dealership
            </p>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl">
              Find Your
              <span className="block text-red-500">
                Next Car.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:mt-7 sm:text-lg sm:leading-8 md:text-xl">
              Discover quality vehicles carefully selected for
              drivers who value style, performance and confidence.
            </p>

            {/* Hero buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4">

              <Link
                href="/inventory"
                className="w-full rounded-full bg-red-600 px-7 py-4 text-center text-sm font-bold text-white transition hover:bg-red-700 sm:w-auto sm:px-8 sm:text-base"
              >
                Browse Inventory
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full border border-white/40 px-7 py-4 text-center text-sm font-bold text-white transition hover:bg-white hover:text-slate-900 sm:w-auto sm:px-8 sm:text-base"
              >
                Chat on WhatsApp
              </a>

            </div>

            {/* Hero vehicle information */}
            {heroVehicle && (
              <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-slate-200 sm:mt-10 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-3 sm:text-sm">

                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400 sm:hidden">
                    Vehicle
                  </p>
                  <span className="block truncate">
                    {heroVehicle.year} {heroVehicle.make}{" "}
                    {heroVehicle.model}
                  </span>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400 sm:hidden">
                    Mileage
                  </p>
                  <span>
                    {formatMileage(heroVehicle.mileage)} km
                  </span>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400 sm:hidden">
                    Transmission
                  </p>
                  <span className="capitalize">
                    {heroVehicle.transmission}
                  </span>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400 sm:hidden">
                    Price
                  </p>
                  <span className="font-semibold text-white">
                    {formatPrice(heroVehicle.price)}
                  </span>
                </div>

              </div>
            )}

          </div>
        </div>
      </section>

      {/* =====================================================
          HOMEPAGE SEARCH
      ====================================================== */}
      <HomeSearch vehicles={vehicles} />

      {/* =====================================================
          FEATURED VEHICLES
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* Section heading */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-red-600 sm:text-sm">
              Our Inventory
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Featured Vehicles
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base">
              Explore some of the quality vehicles currently
              available at KN AUTOS.
            </p>
          </div>

          <Link
            href="/inventory"
            className="text-sm font-bold text-red-600 transition hover:text-red-700 sm:text-base"
          >
            View All Vehicles →
          </Link>

        </div>

        {/* No featured vehicles */}
        {featuredVehicles.length === 0 ? (

          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center sm:mt-12 sm:p-12">

            <div className="text-4xl sm:text-5xl">
              🚗
            </div>

            <h3 className="mt-4 text-xl font-black sm:mt-5 sm:text-2xl">
              Vehicles Coming Soon
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
              Our latest vehicles will appear here once they
              are added to the KN AUTOS inventory and marked
              as featured.
            </p>

            <Link
              href="/inventory"
              className="mt-6 inline-block rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-600 sm:mt-7 sm:px-7"
            >
              Browse Inventory
            </Link>

          </div>

        ) : (

          /* Featured vehicle cards */
          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">

            {featuredVehicles.map((vehicle) => (

              <article
                key={vehicle.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <Link href={`/inventory/${vehicle.slug}`}>

                  {/* Vehicle image */}
                  <div className="relative h-56 overflow-hidden bg-slate-100 sm:h-64">

                    {vehicle.primary_image ? (

                      <img
                        src={vehicle.primary_image}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center text-sm text-slate-400">
                        No image available
                      </div>

                    )}

                    {/* Availability */}
                    <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase text-white sm:left-4 sm:top-4 sm:text-xs">
                      Available
                    </div>

                    {/* Featured badge */}
                    <div className="absolute right-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-bold uppercase text-white backdrop-blur sm:right-4 sm:top-4 sm:text-xs">
                      Featured
                    </div>

                  </div>

                  {/* Vehicle details */}
                  <div className="p-5 sm:p-6">

                    <p className="text-sm font-medium text-slate-500">
                      {vehicle.variant || vehicle.body_type}
                    </p>

                    <h3 className="mt-1 text-lg font-black text-slate-950 sm:text-xl">
                      {vehicle.year} {vehicle.make}{" "}
                      {vehicle.model}
                    </h3>

                    {/* Specifications */}
                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-500 sm:text-sm">

                      <span>
                        {formatMileage(vehicle.mileage)} km
                      </span>

                      <span className="capitalize">
                        {vehicle.transmission}
                      </span>

                      <span className="capitalize">
                        {vehicle.fuel_type}
                      </span>

                      <span className="uppercase">
                        {vehicle.body_type}
                      </span>

                    </div>

                    {/* Price */}
                    <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-5 sm:mt-6">

                      <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
                          Price
                        </p>

                        <p className="mt-1 truncate text-lg font-black text-slate-950 sm:text-xl">
                          {formatPrice(vehicle.price)}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white transition group-hover:bg-red-600 sm:px-5 sm:py-2.5 sm:text-sm">
                        View →
                      </span>

                    </div>

                  </div>

                </Link>

              </article>

            ))}

          </div>

        )}

      </section>

      {/* =====================================================
          WHY KN AUTOS
      ====================================================== */}
      <section
        id="about"
        className="bg-slate-950 py-16 text-white sm:py-20 lg:py-24"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-wider text-red-400 sm:text-sm">
              Why KN AUTOS
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl md:text-5xl">
              More than a car.
              <span className="block text-red-500">
                A confident choice.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
              We make vehicle discovery simple by bringing
              quality inventory, useful vehicle information and
              direct customer communication together in one
              modern experience.
            </p>

          </div>

          {/* Benefits */}
          <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-3 md:gap-6">

            {/* Quality */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10 sm:p-7">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-xl font-black">
                ✓
              </div>

              <h3 className="mt-5 text-lg font-bold sm:text-xl">
                Quality Vehicles
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                Carefully selected vehicles for customers who
                expect quality, value and confidence.
              </p>

            </div>

            {/* Transparency */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10 sm:p-7">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-xl font-black">
                ◆
              </div>

              <h3 className="mt-5 text-lg font-bold sm:text-xl">
                Transparent Deals
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                Clear vehicle information and straightforward
                communication throughout the buying process.
              </p>

            </div>

            {/* Customer focus */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10 sm:p-7">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-xl font-black">
                ★
              </div>

              <h3 className="mt-5 text-lg font-bold sm:text-xl">
                Customer Focus
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                A modern buying experience built around
                convenience, responsiveness and trust.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTACT CTA
      ====================================================== */}
      <section
        id="contact"
        className="bg-red-600 py-16 sm:py-20"
      >

        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-100 sm:text-sm">
            KN AUTOS
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            Ready to find your next vehicle?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-red-100 sm:mt-5 sm:text-lg">
            Browse our available vehicles or speak directly
            with the KN AUTOS sales team.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">

            <Link
              href="/inventory"
              className="w-full rounded-full bg-white px-8 py-4 text-sm font-bold text-red-600 transition hover:bg-slate-100 sm:w-auto sm:text-base"
            >
              Browse Inventory
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border border-white/40 px-8 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-red-600 sm:w-auto sm:text-base"
            >
              WhatsApp Us
            </a>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="bg-slate-950 px-5 py-8 text-slate-400 sm:px-6 sm:py-10">

        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="text-xl font-black text-white">
              KN<span className="text-red-500">AUTOS</span>
            </div>

            <p className="mt-2 text-sm">
              Quality vehicles. Confident choices.
            </p>

          </div>

          <div className="flex flex-wrap gap-5 text-sm">

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
              href="#about"
              className="transition hover:text-white"
            >
              About
            </a>

            <a
              href="#contact"
              className="transition hover:text-white"
            >
              Contact
            </a>

          </div>

          <div className="text-sm">
            © {new Date().getFullYear()} KN AUTOS.
            All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  );
}