const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

export interface VehicleImage {
  id: number;
  image: string;
  image_url: string;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}

export interface Vehicle {
  id: number;
  stock_number: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  condition: string;
  status: string;
  price: string;
  previous_price: string | null;
  mileage: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  drive_type: string;
  engine_size: string;
  exterior_color: string;
  interior_color: string;
  doors: number | null;
  seats: number | null;
  vin: string;
  description: string;
  features: string[];
  is_featured: boolean;
  slug: string;
  images: VehicleImage[];
  primary_image: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Get all vehicles
 */
export async function getVehicles(): Promise<Vehicle[]> {
  const response = await fetch(`${API_URL}/vehicles/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vehicles");
  }

  return response.json();
}

/**
 * Get a single vehicle using its SEO-friendly slug
 *
 * Example:
 * /inventory/2020-toyota-highlander
 */
export async function getVehicle(
  slug: string
): Promise<Vehicle> {
  const response = await fetch(
    `${API_URL}/vehicles/?slug=${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Vehicle not found");
  }

  const vehicles: Vehicle[] = await response.json();

  const vehicle = vehicles.find(
    (item) => item.slug === slug
  );

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  return vehicle;
}