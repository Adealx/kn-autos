"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Vehicle } from "@/lib/api";

interface InventoryClientProps {
  vehicles: Vehicle[];

  initialFilters?: {
    make?: string;
    model?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

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

export default function InventoryClient({
  vehicles,
  initialFilters,
}: InventoryClientProps) {
  const [search, setSearch] = useState("");

  const [make, setMake] = useState(
    initialFilters?.make || ""
  );

  const [model, setModel] = useState(
    initialFilters?.model || ""
  );

  const [bodyType, setBodyType] = useState("");

  const [fuelType, setFuelType] = useState("");

  const [transmission, setTransmission] = useState("");

  const [year, setYear] = useState("");

  const [minPrice, setMinPrice] = useState(
    initialFilters?.minPrice || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    initialFilters?.maxPrice || ""
  );

  // Mobile filter visibility
  const [filtersOpen, setFiltersOpen] = useState(false);

  const availableVehicles = useMemo(() => {
    return vehicles.filter(
      (vehicle) => vehicle.status === "available"
    );
  }, [vehicles]);

  const makes = useMemo(() => {
    return Array.from(
      new Set(
        availableVehicles.map(
          (vehicle) => vehicle.make
        )
      )
    ).sort();
  }, [availableVehicles]);

  const models = useMemo(() => {
    const filteredByMake = make
      ? availableVehicles.filter(
          (vehicle) => vehicle.make === make
        )
      : availableVehicles;

    return Array.from(
      new Set(
        filteredByMake.map(
          (vehicle) => vehicle.model
        )
      )
    ).sort();
  }, [availableVehicles, make]);

  const years = useMemo(() => {
    return Array.from(
      new Set(
        availableVehicles.map(
          (vehicle) => vehicle.year
        )
      )
    ).sort((a, b) => b - a);
  }, [availableVehicles]);

  const filteredVehicles = useMemo(() => {
    const searchTerm = search
      .trim()
      .toLowerCase();

    return availableVehicles.filter(
      (vehicle) => {
        const matchesSearch =
          !searchTerm ||
          `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}`
            .toLowerCase()
            .includes(searchTerm);

        const matchesMake =
          !make ||
          vehicle.make === make;

        const matchesModel =
          !model ||
          vehicle.model === model;

        const matchesBody =
          !bodyType ||
          vehicle.body_type === bodyType;

        const matchesFuel =
          !fuelType ||
          vehicle.fuel_type === fuelType;

        const matchesTransmission =
          !transmission ||
          vehicle.transmission === transmission;

        const matchesYear =
          !year ||
          vehicle.year === Number(year);

        const numericPrice =
          Number(vehicle.price);

        const matchesMinPrice =
          !minPrice ||
          numericPrice >= Number(minPrice);

        const matchesMaxPrice =
          !maxPrice ||
          numericPrice <= Number(maxPrice);

        return (
          matchesSearch &&
          matchesMake &&
          matchesModel &&
          matchesBody &&
          matchesFuel &&
          matchesTransmission &&
          matchesYear &&
          matchesMinPrice &&
          matchesMaxPrice
        );
      }
    );
  }, [
    availableVehicles,
    search,
    make,
    model,
    bodyType,
    fuelType,
    transmission,
    year,
    minPrice,
    maxPrice,
  ]);

  function resetFilters() {
    setSearch("");
    setMake("");
    setModel("");
    setBodyType("");
    setFuelType("");
    setTransmission("");
    setYear("");
    setMinPrice("");
    setMaxPrice("");
  }

  const activeFilterCount = [
    make,
    model,
    bodyType,
    fuelType,
    transmission,
    year,
    minPrice,
    maxPrice,
  ].filter(Boolean).length;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

      {/* =====================================================
          FILTER BOX
      ====================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* FILTER HEADER */}

        <div className="p-4 sm:p-6">

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 sm:text-sm">
                Search Inventory
              </p>

              <h2 className="mt-1 text-xl font-black sm:text-2xl">
                Find your vehicle
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                setFiltersOpen(!filtersOpen)
              }
              className="flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-600 lg:hidden"
              aria-expanded={filtersOpen}
            >
              <span>
                {filtersOpen
                  ? "Hide Filters"
                  : "Filters"}
              </span>

              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs">
                  {activeFilterCount}
                </span>
              )}

              <span className="text-base">
                {filtersOpen ? "−" : "+"}
              </span>
            </button>

          </div>

          {/* SEARCH */}

          <div className="mt-5">

            <label
              htmlFor="inventory-search"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Search
            </label>

            <input
              id="inventory-search"
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Toyota, Highlander, Lexus..."
              className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />

          </div>

        </div>

        {/* =====================================================
            FILTER CONTROLS

            Mobile: collapsible
            Desktop: always visible
        ====================================================== */}

        <div
          className={`${
            filtersOpen
              ? "block"
              : "hidden lg:block"
          } border-t border-slate-100 p-4 sm:p-6`}
        >

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* MAKE */}

            <div>
              <label
                htmlFor="make"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Make
              </label>

              <select
                id="make"
                value={make}
                onChange={(event) => {
                  setMake(event.target.value);
                  setModel("");
                }}
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option value="">
                  All Makes
                </option>

                {makes.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* MODEL */}

            <div>
              <label
                htmlFor="model"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Model
              </label>

              <select
                id="model"
                value={model}
                onChange={(event) =>
                  setModel(event.target.value)
                }
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option value="">
                  All Models
                </option>

                {models.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* YEAR */}

            <div>
              <label
                htmlFor="year"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Year
              </label>

              <select
                id="year"
                value={year}
                onChange={(event) =>
                  setYear(event.target.value)
                }
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option value="">
                  Any Year
                </option>

                {years.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* BODY */}

            <div>
              <label
                htmlFor="body-type"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Body Type
              </label>

              <select
                id="body-type"
                value={bodyType}
                onChange={(event) =>
                  setBodyType(event.target.value)
                }
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option value="">
                  All Body Types
                </option>
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="saloon">Saloon</option>
                <option value="coupe">Coupe</option>
                <option value="convertible">
                  Convertible
                </option>
                <option value="hatchback">
                  Hatchback
                </option>
                <option value="wagon">Wagon</option>
                <option value="pickup">Pickup</option>
                <option value="van">Van</option>
                <option value="bus">Bus</option>
              </select>
            </div>

            {/* FUEL */}

            <div>
              <label
                htmlFor="fuel"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Fuel
              </label>

              <select
                id="fuel"
                value={fuelType}
                onChange={(event) =>
                  setFuelType(event.target.value)
                }
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option value="">
                  All Fuel Types
                </option>
                <option value="petrol">
                  Petrol
                </option>
                <option value="diesel">
                  Diesel
                </option>
                <option value="hybrid">
                  Hybrid
                </option>
                <option value="electric">
                  Electric
                </option>
              </select>
            </div>

            {/* TRANSMISSION */}

            <div>
              <label
                htmlFor="transmission"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Transmission
              </label>

              <select
                id="transmission"
                value={transmission}
                onChange={(event) =>
                  setTransmission(
                    event.target.value
                  )
                }
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option value="">
                  All Transmissions
                </option>
                <option value="automatic">
                  Automatic
                </option>
                <option value="manual">
                  Manual
                </option>
              </select>
            </div>

            {/* MIN PRICE */}

            <div>
              <label
                htmlFor="min-price"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Minimum Price
              </label>

              <input
                id="min-price"
                type="number"
                inputMode="numeric"
                value={minPrice}
                onChange={(event) =>
                  setMinPrice(
                    event.target.value
                  )
                }
                placeholder="₦ Minimum"
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* MAX PRICE */}

            <div>
              <label
                htmlFor="max-price"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Maximum Price
              </label>

              <input
                id="max-price"
                type="number"
                inputMode="numeric"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(
                    event.target.value
                  )
                }
                placeholder="₦ Maximum"
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

          </div>

          {/* FILTER ACTIONS */}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-slate-500">
              {activeFilterCount > 0
                ? `${activeFilterCount} filter${
                    activeFilterCount === 1
                      ? ""
                      : "s"
                  } applied`
                : "Showing all available vehicles"}
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="min-h-11 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-red-500 hover:text-red-600"
            >
              Reset Filters
            </button>

          </div>

        </div>
      </div>

      {/* =====================================================
          RESULTS
      ====================================================== */}

      <div className="mt-10 sm:mt-12">

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h2 className="text-2xl font-black sm:text-3xl">
              Available Vehicles
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-700">
                {filteredVehicles.length}
              </span>{" "}
              of{" "}
              {availableVehicles.length}{" "}
              vehicles
            </p>
          </div>

        </div>

        {/* =====================================================
            NO RESULTS
        ====================================================== */}

        {filteredVehicles.length === 0 ? (

          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-12">

            <div className="text-4xl">
              🚗
            </div>

            <h3 className="mt-4 text-xl font-black">
              No vehicles found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try changing your search or filter
              options to find available vehicles.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 min-h-11 rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Clear Filters
            </button>

          </div>

        ) : (

          /* =====================================================
             VEHICLE GRID
          ====================================================== */

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">

            {filteredVehicles.map(
              (vehicle) => (

                <article
                  key={vehicle.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  <Link
                    href={`/inventory/${vehicle.slug}`}
                    className="block"
                  >

                    {/* IMAGE */}

                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 sm:aspect-[4/3]">

                      {vehicle.primary_image ? (

                        <img
                          src={vehicle.primary_image}
                          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                          No image available
                        </div>

                      )}

                      {/* AVAILABLE */}

                      <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white sm:left-4 sm:top-4 sm:text-xs">
                        Available
                      </div>

                    </div>

                    {/* CARD CONTENT */}

                    <div className="p-5 sm:p-6">

                      <p className="text-sm font-medium text-slate-500">
                        {vehicle.variant ||
                          vehicle.body_type ||
                          "Vehicle"}
                      </p>

                      <h3 className="mt-1 text-xl font-black leading-tight text-slate-950 sm:text-2xl">
                        {vehicle.year}{" "}
                        {vehicle.make}{" "}
                        {vehicle.model}
                      </h3>

                      {/* SPECS */}

                      <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-sm text-slate-500">

                        <span className="truncate">
                          {formatMileage(
                            vehicle.mileage
                          )}{" "}
                          km
                        </span>

                        <span className="truncate capitalize">
                          {vehicle.transmission ||
                            "N/A"}
                        </span>

                        <span className="truncate capitalize">
                          {vehicle.fuel_type ||
                            "N/A"}
                        </span>

                        <span className="truncate uppercase">
                          {vehicle.body_type ||
                            "N/A"}
                        </span>

                      </div>

                      {/* PRICE */}

                      <div className="mt-5 border-t border-slate-100 pt-5">

                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                          Price
                        </p>

                        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                          <p className="text-2xl font-black leading-none text-slate-950">
                            {formatPrice(
                              vehicle.price
                            )}
                          </p>

                          <span className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition group-hover:bg-red-600">
                            View Vehicle →
                          </span>

                        </div>

                      </div>

                    </div>

                  </Link>

                </article>

              )
            )}

          </div>
        )}

      </div>
    </section>
  );
}