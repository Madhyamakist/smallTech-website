import type { NextConfig } from "next";


const nextConfig: NextConfig = {
    async rewrites() {
    return [
      {
        source: "/api/:path*",   // frontend calls /api/chat
        destination: "http://127.0.0.1:5000/:path*", // Flask backend
      },
    ];
  },
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
