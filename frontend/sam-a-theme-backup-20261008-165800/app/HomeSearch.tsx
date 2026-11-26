"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Vehicle } from "@/lib/api";

interface HomeSearchProps {
  vehicles: Vehicle[];
}

export default function HomeSearch({
  vehicles,
}: HomeSearchProps) {
  const router = useRouter();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [priceRange, setPriceRange] = useState("");

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
    const filteredVehicles = make
      ? availableVehicles.filter(
          (vehicle) => vehicle.make === make
        )
      : availableVehicles;

    return Array.from(
      new Set(
        filteredVehicles.map(
          (vehicle) => vehicle.model
        )
      )
    ).sort();
  }, [availableVehicles, make]);

  function handleSearch(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (make) {
      params.set("make", make);
    }

    if (model) {
      params.set("model", model);
    }

    if (priceRange === "under20") {
      params.set("maxPrice", "20000000");
    }

    if (priceRange === "20to40") {
      params.set("minPrice", "20000000");
      params.set("maxPrice", "40000000");
    }

    if (priceRange === "40to60") {
      params.set("minPrice", "40000000");
      params.set("maxPrice", "60000000");
    }

    if (priceRange === "over60") {
      params.set("minPrice", "60000000");
    }

    const query = params.toString();

    router.push(
      query
        ? `/inventory?${query}`
        : "/inventory"
    );
  }

  return (
    <section className="relative z-10 mx-auto -mt-16 max-w-6xl px-6">
      <form
        onSubmit={handleSearch}
        className="rounded-2xl bg-white p-6 shadow-2xl md:p-8"
      >
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-wider text-red-600">
            Vehicle Search
          </p>

          <h2 className="mt-2 text-2xl font-black md:text-3xl">
            Find the right vehicle
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Search our available vehicles by make, model
            and price.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {/* Make */}
          <select
            value={make}
            onChange={(event) => {
              setMake(event.target.value);
              setModel("");
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-red-500"
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

          {/* Model */}
          <select
            value={model}
            onChange={(event) =>
              setModel(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-red-500"
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

          {/* Price */}
          <select
            value={priceRange}
            onChange={(event) =>
              setPriceRange(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-red-500"
          >
            <option value="">
              Any Price
            </option>

            <option value="under20">
              Under ₦20m
            </option>

            <option value="20to40">
              ₦20m - ₦40m
            </option>

            <option value="40to60">
              ₦40m - ₦60m
            </option>

            <option value="over60">
              ₦60m+
            </option>
          </select>

          {/* Search */}
          <button
            type="submit"
            className="rounded-xl bg-slate-950 px-5 py-4 font-bold text-white transition hover:bg-red-600"
          >
            Search Vehicles
          </button>
        </div>
      </form>
    </section>
  );
}