/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ["172.20.10.5"],
  // serverExternalPackages: ["surrealdb"],
};

export default nextConfig;
