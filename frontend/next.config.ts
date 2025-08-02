/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgsrv.crunchyroll.com",
      },
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
      {
        protocol: "https",
        hostname: "www.crunchyroll.com",
      },
      {
        protocol: "https",
        hostname: "static.crunchyroll.com",
      },
    ],
  },
};

export default nextConfig;
