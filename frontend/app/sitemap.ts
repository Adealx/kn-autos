import type { MetadataRoute } from "next";
import {
  getVehicles,
  type Vehicle,
} from "@/lib/api";

export const dynamic = "force-dynamic";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3001";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /**
   * =====================================================
   * STATIC PAGES
   * =====================================================
   */

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${SITE_URL}/inventory`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  /**
   * =====================================================
   * LOAD VEHICLES
   * =====================================================
   *
   * The sitemap is dynamic, so vehicles are loaded when
   * /sitemap.xml is requested instead of during build.
   */

  let vehicles: Vehicle[] = [];

  try {
    vehicles = await getVehicles();
  } catch (error) {
    console.error(
      "Sitemap vehicle error:",
      error
    );
  }

  /**
   * =====================================================
   * VEHICLE PAGES
   * =====================================================
   */

  const vehiclePages: MetadataRoute.Sitemap =
    vehicles
      .filter(
        (vehicle) =>
          vehicle.status?.toLowerCase() ===
            "available" &&
          Boolean(vehicle.slug)
      )
      .map((vehicle) => ({
        url: `${SITE_URL}/inventory/${vehicle.slug}`,

        lastModified:
          vehicle.updated_at
            ? new Date(vehicle.updated_at)
            : new Date(),

        changeFrequency: "weekly" as const,

        priority: 0.8,
      }));

  /**
   * =====================================================
   * RETURN COMPLETE SITEMAP
   * =====================================================
   */

  return [
    ...staticPages,
    ...vehiclePages,
  ];
}