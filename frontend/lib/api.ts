
const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api"
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
 * Get all vehicles from Django REST API.
 */
export async function getVehicles(): Promise<Vehicle[]> {
  const data = await fetchJSON<Vehicle[]>(
    `${API_URL}/vehicles/`
  );

  // Support standard arrays and paginated Django REST responses.
  if (Array.isArray(data)) {
    return data;
  }

  const paginated = data as unknown as {
    results?: Vehicle[];
  };

  return Array.isArray(paginated.results)
    ? paginated.results
    : [];
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
