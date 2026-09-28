import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kn-autos-api.onrender.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;