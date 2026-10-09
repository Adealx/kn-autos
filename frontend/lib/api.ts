
const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://sam-a-autos-api.onrender.com/api"
).replace(/\/+$/, "");

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

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed (${response.status}): ${url}`
    );
  }

  return response.json() as Promise<T>;
}

/**
 * Get all vehicles from the Django REST API.
 */
export async function getVehicles(): Promise<Vehicle[]> {
  const data = await fetchJSON<
    Vehicle[] | { results?: Vehicle[] }
  >(`${API_URL}/vehicles/`);

  if (Array.isArray(data)) {
    return data;
  }

  return Array.isArray(data.results) ? data.results : [];
}

/**
 * Get a vehicle by its SEO-friendly slug.
 */
export async function getVehicle(
  slug: string
): Promise<Vehicle> {
  const vehicles = await getVehicles();

  const vehicle = vehicles.find(
    (item) => item.slug === slug
  );

  if (!vehicle) {
    throw new Error(`Vehicle not found: ${slug}`);
  }

  return vehicle;
}
