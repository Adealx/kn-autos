
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Vehicle } from "@/lib/api";

interface VehicleSlideshowProps {
  vehicles: Vehicle[];
}

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

export default function VehicleSlideshow({
  vehicles,
}: VehicleSlideshowProps) {
  const cars = vehicles.filter(
    (vehicle) =>
      vehicle.status?.toLowerCase() === "available" &&
      Boolean(vehicle.primary_image)
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [cars.length]);

  useEffect(() => {
    if (cars.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % cars.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [cars.length]);

  if (cars.length === 0) {
    return (
      <section
        aria-labelledby="available-cars-heading"
        className="bg-[#F8FAFC] px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#98763B]">
            SAM-A AUTOS
          </p>

          <h2
            id="available-cars-heading"
            className="mt-3 text-3xl font-black text-[#0B1830]"
          >
            Available Vehicles
          </h2>

          <p className="mt-4 text-slate-600">
            Our available vehicles will appear here as listings and photographs
            are added.
          </p>

          <Link
            href="/inventory"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#0B1830] px-7 py-3 text-sm font-bold text-white hover:bg-[#172B4D]"
          >
            Browse Inventory
          </Link>
        </div>
      </section>
    );
  }

  const car = cars[activeIndex] ?? cars[0];

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + cars.length) % cars.length);
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % cars.length);
  }

  return (
    <section
      aria-labelledby="available-cars-heading"
      className="bg-[#F8FAFC] px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#98763B] sm:text-sm">
              Find your next car
            </p>

            <h2
              id="available-cars-heading"
              className="mt-3 text-3xl font-black tracking-tight text-[#0B1830] sm:text-4xl md:text-5xl"
            >
              Available Vehicles
            </h2>

            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Explore our latest available cars and their asking prices.
            </p>
          </div>

          <Link
            href="/inventory"
            className="inline-flex min-h-11 items-center font-bold text-[#0B1830] hover:text-[#98763B]"
          >
            View all vehicles →
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[260px] bg-[#0B1830] sm:min-h-[380px] lg:min-h-[480px]">
              <img
                key={car.primary_image}
                src={car.primary_image ?? ""}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute left-4 top-4 rounded-full bg-[#D7B779] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#08101F]">
                Available now
              </div>

              {cars.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Previous vehicle"
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#08101F]/80 text-2xl text-white hover:bg-[#D7B779] hover:text-[#08101F]"
                  >
                    &#8249;
                  </button>

                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Next vehicle"
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#08101F]/80 text-2xl text-white hover:bg-[#D7B779] hover:text-[#08101F]"
                  >
                    &#8250;
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#98763B]">
                {car.condition || "Quality vehicle"}
              </p>

              <h3 className="mt-3 text-3xl font-black leading-tight text-[#0B1830] sm:text-4xl">
                {car.year} {car.make} {car.model}
              </h3>

              {car.variant && (
                <p className="mt-2 text-slate-500">{car.variant}</p>
              )}

              <div className="mt-7 rounded-2xl bg-[#08101F] p-5 text-white sm:p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-[#D7B779]">
                  Asking price
                </p>

                <p className="mt-2 break-words text-2xl font-black sm:text-3xl">
                  {formatPrice(car.price)}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-slate-500">Mileage</p>
                  <p className="mt-1 font-bold text-[#0B1830]">
                    {new Intl.NumberFormat("en-NG").format(car.mileage || 0)} km
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-slate-500">Transmission</p>
                  <p className="mt-1 font-bold capitalize text-[#0B1830]">
                    {car.transmission || "Contact us"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-slate-500">Fuel</p>
                  <p className="mt-1 font-bold capitalize text-[#0B1830]">
                    {car.fuel_type || "Contact us"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-slate-500">Body type</p>
                  <p className="mt-1 font-bold capitalize text-[#0B1830]">
                    {car.body_type || "Contact us"}
                  </p>
                </div>
              </div>

              <Link
                href={`/inventory/${car.slug}`}
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#D7B779] px-6 py-3 text-center text-sm font-bold text-[#08101F] hover:bg-[#EAD7AD]"
              >
                View Vehicle Details →
              </Link>

              {cars.length > 1 && (
                <div className="mt-6 flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-500">
                    Vehicle {activeIndex + 1} of {cars.length}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {cars.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Show ${item.year} ${item.make} ${item.model}`}
                        aria-current={index === activeIndex ? "true" : undefined}
                        className={`h-2.5 rounded-full transition-all ${
                          index === activeIndex
                            ? "w-8 bg-[#D7B779]"
                            : "w-2.5 bg-slate-300 hover:bg-slate-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
