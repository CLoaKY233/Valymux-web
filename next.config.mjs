/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ["192.168.29.202"],
  serverExternalPackages: ["surrealdb"],
};

export default nextConfig;
