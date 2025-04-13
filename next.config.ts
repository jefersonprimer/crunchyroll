/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["imgsrv.crunchyroll.com"], 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
      {
        protocol: "https",
        hostname: "www.crunchyroll.com",
      },
    ],
  },
};

export default nextConfig;
