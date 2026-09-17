import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server be reached from another device on the same network
  // (e.g. testing on a phone), not just from localhost.
  allowedDevOrigins: ["192.168.4.30"],
};

export default nextConfig;
