import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: process.env.DEV_TUNNEL_ORIGIN
    ? [process.env.DEV_TUNNEL_ORIGIN]
    : [],
};

export default nextConfig;
