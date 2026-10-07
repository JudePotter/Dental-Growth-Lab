import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server be reached from another device on the same network
  // (a phone or an iPad on the same Wi-Fi), whatever address the router hands
  // this Mac. Only private network ranges and .local names, never the open
  // internet. Restart `npm run dev` after changing this.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "*.local"],
};

export default nextConfig;
