import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [
    "macbook-dev.local",
    "192.168.1.58",
    "desktop-rcbhr76.tail67dc84.ts.net",
    "macbook-pro.tail67dc84.ts.net",
  ],
};

export default nextConfig;
