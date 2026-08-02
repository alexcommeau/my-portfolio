import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["macbook-dev.local", "192.168.1.58"],
};

export default nextConfig;
